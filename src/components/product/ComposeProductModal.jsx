import { Fragment, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
// import { Modal } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import Rating from "./sub-components/ProductRating";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";

import style from "./ComposeProductModal.module.scss"
import clsx from "clsx";
import { updateCartProduct } from "@/lib/utils/cartHelper";
import CartToast, { useCartToast } from "@/components/cart-toast/CartToast";
import { isStockSufficient, getStockTarget, getCartStockUsage, addStockUsage } from "@/lib/utils/productHelper";


const ComposeProductModal = ({ product, show, onHide, cartProduct, composeBase, quantityCount, updateCompose, nextAction, reviewContent, props}) =>{

  const [cartToastProps, showCartToast] = useCartToast();

  const onCloseModal = () => {
    onHide()
  }

  const [composeValid, setComposeValid] = useState(false)
  const [composeLeft, setComposeLeft] = useState(0)
  const [composeProductData, setComposeProductData] = useState({})

  const dispatch = useAppDispatch();
  const { cartProducts } = useAppSelector((state) => state.cart);
  const customer = useAppSelector((state) => state.customer);
  const targetCartProducts = customer?.uuid ? customer?.cart_products : cartProducts

  // 購物車中已佔用的庫存（依 stock 計算，含一般/規格/組合商品與其他任搭內容）；編輯既有任搭時排除該任搭原本的內容
  const cartStockUsage = getCartStockUsage(targetCartProducts, updateCompose ? cartProduct?.uuid : null)

  const handleQuantityInput = (e, uuid) => {
    const val = e.target.value;
    const newData = {...composeProductData};
    if (val === '') {
      newData[uuid] = 0;
    } else {
      const num = parseInt(val, 10);
      newData[uuid] = (Number.isInteger(num) && num > 0) ? num : 0;
    }
    setComposeProductData(newData);
  };

  useEffect(()=>{
    const data = {};
    (cartProduct?.cart_compose_products||[]).forEach(cartComposeProduct=>{
      const composeProduct = (product?.compose_products||[]).find(composeProduct=>composeProduct?.source_product?.uuid==cartComposeProduct?.source_product?.uuid)
      data[composeProduct?.uuid] = cartComposeProduct?.quantity||0
    })
    setComposeProductData(data)
  },[cartProduct?.cart_compose_products, product?.compose_products])
  
  // 總佔用量 = 購物車已佔用 + 此彈窗內所有搭配商品目前的選取量
  // 不同搭配商品可能共用同一筆 stock（或為包含同一 stock 的組合商品），必須合併計算
  const totalStockUsage = {...cartStockUsage};
  (product?.compose_products||[]).forEach(composeProduct=>{
    addStockUsage(totalStockUsage, getStockTarget(composeProduct?.source_product), composeProductData?.[composeProduct?.uuid]||0)
  })

  // 每一列的庫存狀態（選取量已包含在 totalStockUsage 內，所以 productCartQty 傳 0）
  const getRowStockStatus = (composeProduct)=>{
    const stockTarget = getStockTarget(composeProduct?.source_product)
    const selectedQty = composeProductData?.[composeProduct?.uuid]||0
    const {requireQtySufficient:plusOneSufficient} = isStockSufficient(stockTarget, 1, 0, totalStockUsage)
    const {requireQtySufficient:selectedQtySufficient, inventorySufficient} = isStockSufficient(stockTarget, 0, 0, totalStockUsage)
    // 存貨不足：本身無庫存、目前選取量已超過庫存、或尚未選取且已無法再選
    const outOfStock = !inventorySufficient || !selectedQtySufficient || (selectedQty<=0 && !plusOneSufficient)
    return {plusOneSufficient, selectedQtySufficient, outOfStock}
  }

  // 所有搭配商品的選取數量合計都不超過庫存
  const composeStockValid = (product?.compose_products||[]).filter(composeProduct=>composeProduct?.enable).every(composeProduct=>
    getRowStockStatus(composeProduct).selectedQtySufficient
  )

  useEffect(()=>{
    const totalCount = (composeBase?.base||1) * (quantityCount||1)
    var composeCount = 0
    Object.values(composeProductData).forEach(_quantity=>composeCount+=_quantity)
    setComposeLeft(totalCount - composeCount)
    setComposeValid(totalCount==composeCount)

  },[composeBase?.base, quantityCount, composeProductData])


  // Modal 內容
  const modalContent = show && composeBase && (
    <div className={clsx(style['任搭彈出框'], '任搭彈出框')} style={{'--任搭組數':`"${composeBase?.base}"`}} >
      <div className={clsx(style['彈出框-頭段'], '彈出框-頭段',)}>
        <h3 className={clsx(style['彈出框-標題'], "彈出框-標題")}>任搭商品</h3>
        <button className={clsx(style['關閉彈窗-按鈕'], "關閉彈窗-按鈕")} onClick={()=>{onHide()}}>
          <i className={clsx(style['關閉彈窗-圖標'], "關閉彈窗-圖標")}>x</i>
        </button>
      </div>
      <div className={clsx(style['彈出框-中段'], '彈出框-中段')}>
            <table className={clsx(style['任搭表格'], '任搭表格')}>
                <thead className={clsx(style['表格-頭段'], '表格-頭段')}>
                  <tr className={clsx(style['表格-列'], '表格-列')}>
                    <th className={clsx(style['表格-欄位名稱'], '表格-欄位名稱')}>圖片</th>
                    <th className={clsx(style['表格-欄位名稱'], '表格-欄位名稱')}>產品名稱</th>
                    <th className={clsx(style['表格-欄位名稱'], '表格-欄位名稱')}>數量</th>
                  </tr>
                </thead>
                <tbody className={clsx(style['表格-身體'], '表格-身體')}>
                  {
                    (product?.compose_products||[]).filter(composeProduct=>composeProduct?.enable).map((composeProduct,composeProductIndex)=>{
                      // 以「購物車已佔用 + 此彈窗所有選取」的總量判斷庫存
                      const {plusOneSufficient, outOfStock} = getRowStockStatus(composeProduct)

                      return (<Fragment key={composeProductIndex}>
                          <tr className={clsx(style['表格-列'], '表格-列', outOfStock?'存貨不足':'')}>
                            <td className={clsx(style['表格-圖片框'], "表格-圖片框")}>
                              <img
                                className={clsx(style['表格-圖片'], "表格-圖片")}
                                src={composeProduct?.source_product?.images?.[0]?.image}
                              />
                            </td>
                            <td className={clsx(style['表格-名稱框'], "表格-名稱框")}>
                              <h4 className={clsx(style['表格-名稱'], "表格-名稱")}                     >
                                {composeProduct?.source_product?.name||''}
                              </h4>
                            </td>
                            <td className={clsx(style['表格-數量框'], "表格-數量框")}>
                                  {!reviewContent &&
                                    <button
                                      className={clsx(style['數量減-按鈕'], "數量減-按鈕")}
                                      onClick={() =>{

                                        const newData = {...composeProductData}
                                        newData[composeProduct?.uuid]=(composeProductData?.[composeProduct?.uuid]||1)-1
                                        setComposeProductData(newData)

                                      }}
                                      disabled={(composeProductData?.[composeProduct?.uuid]||0)<=0}
                                    >
                                      -
                                    </button>
                                  }
                                  
                                  <input
                                    className={clsx(style['數量'], "數量")}
                                    type="text"
                                    value={composeProductData?.[composeProduct?.uuid?.toString()]??0}
                                    onChange={(e) => handleQuantityInput(e, composeProduct?.uuid)}
                                    disabled={reviewContent}
                                  />
                                  {
                                    !reviewContent &&
                                    <button
                                      className={clsx(style['數量加-按鈕'], "數量加-按鈕")}
                                      onClick={() =>{
                                        const newData = {...composeProductData}
                                        newData[composeProduct?.uuid]=(composeProductData?.[composeProduct?.uuid]||0)+1
                                        setComposeProductData(newData)

                                      }}
                                      disabled={ !plusOneSufficient || composeLeft<=0
                                      }
                                    >
                                      +
                                    </button>
                                  }
                                  
                            </td>
                          </tr>
                      </Fragment>)

                    })
                  }
                </tbody>
            </table>
        </div>

        <div className={clsx(style['動作框'], "動作框")}>




          {
            !composeValid &&
            <Fragment>
              {
                composeLeft > 0
                ?
                <h4 className={clsx(style['動作-文字'], "動作-文字")}>
                  {`尚可選擇${composeLeft}件`}
                </h4>
                :
                <h4 className={clsx(style['動作-文字'], "動作-文字")}>
                  {`超過可選件數`}
                </h4>
              }
            </Fragment>
          }

          {
            !reviewContent &&
            <button className={clsx(style['動作-按鈕'], "動作-按鈕")}
                onClick={() =>{
                  // console.log(composeProductData)
                  updateCartProduct(product, null, quantityCount, dispatch, composeBase, composeProductData, updateCompose, null, null, updateCompose ? cartProduct?.uuid : null).then(()=>{
                    showCartToast('成功')
                    onHide()
                  }).then(()=>{
                    nextAction?.()
                  }).catch(()=>{
                    showCartToast('失敗')
                  })
                }}
                disabled={!composeValid || !composeStockValid}
              >
                {" "}加入購物車{" "}
            </button>
          }
          

        </div>
    </div>
  );

  // 使用 Portal 將 modal 渲染到 body
  // CartToast 放在 modalContent 之外, modal 關閉後提示仍會顯示
  return (
    <Fragment>
      {modalContent && typeof document !== 'undefined' && createPortal(modalContent, document.body)}
      <CartToast {...cartToastProps}/>
    </Fragment>
  );
}

ComposeProductModal.propTypes = {
};

export default ComposeProductModal;
