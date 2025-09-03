import { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
// import { Modal } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import Rating from "./sub-components/ProductRating";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";

import style from "./ComposeProductModal.module.scss"
import clsx from "clsx";
import { updateCartProduct } from "@/lib/utils/cartHelper";
import { isStockSufficient } from "@/lib/utils/productHelper";


const ComposeProductModal = ({ product, show, onHide, cartProduct, composeBase, quantityCount, updateCompose, nextAction, props}) =>{

  const onCloseModal = () => {
    onHide()
  }

  const [composeValid, setComposeValid] = useState(false)
  const [composeLeft, setComposeLeft] = useState(0)
  const [composeProductData, setComposeProductData] = useState({})

  const dispatch = useAppDispatch();
  
  useEffect(()=>{
    const data = {};
    (cartProduct?.cart_compose_products||[]).forEach(cartComposeProduct=>{
      const composeProduct = (product?.compose_products||[]).find(composeProduct=>composeProduct?.source_product?.uuid==cartComposeProduct?.source_product?.uuid)
      data[composeProduct?.uuid] = cartComposeProduct?.quantity||0
    })
    setComposeProductData(data)
  },[cartProduct?.cart_compose_products, product?.compose_products])
  
  useEffect(()=>{
    const totalCount = (composeBase?.base||1) * (quantityCount||1)
    var composeCount = 0
    Object.values(composeProductData).forEach(_quantity=>composeCount+=_quantity)
    setComposeLeft(totalCount - composeCount)
    setComposeValid(totalCount==composeCount)

  },[composeBase?.base, quantityCount, composeProductData])


  return (

      <Fragment>
        {
          show && composeBase &&
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
                            (product?.compose_products||[]).map((composeProduct,composeProductIndex)=>{
                              const {inventoryControl, requireQtySufficient, inventorySufficient, avaliableForAddToCart, inventory} = isStockSufficient( composeProduct.source_product, (composeBase?.base||1) * (quantityCount||1), cartProduct?.quantity||0)

                              return (<Fragment key={composeProductIndex}>
                                  <tr className={clsx(style['表格-列'], '表格-列', !requireQtySufficient?'存貨不足':'')}> 
                                    <td className={clsx(style['表格-圖片框'], "表格-圖片框")}>
                                      <img
                                        className={clsx(style['表格-圖片'], "表格-圖片")}
                                        src={composeProduct?.source_product.images?.[0]?.image}
                                      />
                                    </td>
                                    <td className={clsx(style['表格-名稱框'], "表格-名稱框")}>
                                      <h4 className={clsx(style['表格-名稱'], "表格-名稱")}                     >
                                        {composeProduct?.source_product?.name||''}
                                      </h4>
                                    </td>
                                    <td className={clsx(style['表格-數量框'], "表格-數量框")}>
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
                                          <input
                                            className={clsx(style['數量'], "數量")}
                                            type="text"
                                            value={composeProductData?.[composeProduct?.uuid?.toString()]||0}
                                            readOnly
                                          />
                                          <button
                                            className={clsx(style['數量加-按鈕'], "數量加-按鈕")}
                                            onClick={() =>{
                                              const newData = {...composeProductData}
                                              newData[composeProduct?.uuid]=(composeProductData?.[composeProduct?.uuid]||0)+1
                                              setComposeProductData(newData)

                                            }}
                                            disabled={ !requireQtySufficient || composeLeft<=0
                                            }
                                          >
                                            +
                                          </button>
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


                  <button className={clsx(style['動作-按鈕'], "動作-按鈕")}
                        onClick={() =>{
                          // console.log(composeProductData)
                          updateCartProduct(product, null, quantityCount, dispatch, composeBase, composeProductData, updateCompose).then(()=>{
                            onHide()                
                          }).then(()=>{
                            nextAction?.()
                          })
                        }}
                        disabled={!composeValid}
                      >
                        {" "}確認{" "}
                  </button>

                </div>
            </div>
        }
      </Fragment>

  );
}

ComposeProductModal.propTypes = {
};

export default ComposeProductModal;
