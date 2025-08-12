
import { Fragment, useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";


// import SEO from "../../components/seo";
// import { getDiscountPrice } from "../../helpers/product";
// import LayoutOne from "../../layouts/LayoutOne";
// import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
// import { addToCart, decreaseQuantity, deleteFromCart, deleteAllFromCart } from "../../store/slices/cart-slice";
// import { setBaseCurrency, setExchangeRates } from "@/redux/slices/estore-slice";
// import { cartItemStock } from "../../helpers/product";
import { setCartProducts } from "@/redux/slices/cart-slice";
// import { customer_delete_cart_product, customer_update_cart_product, customer_clear_cart_product } from "../../api/cart";
// import cogoToast from 'cogo-toast';

import { get_exchange_rates } from "@/api/exchange_rates";
import { 
  isComposeValid, 
  getCartSummarize, 
  deleteAllCartProductV1, 
//   getProductPrice ,
  getCartProductName, 
  deleteCartAddonProductV1,
  isInventorySufficient,
  updateCartProduct,
  deleteCartProductV1,
} from "@/lib/utils/cartHelper";

import {getProductPrice, isStockSufficient} from "@/lib/utils/productHelper"

import style from "./CartDetail.module.scss"
import clsx from "clsx";
import ComposeProductModal from "@/components/product/ComposeProductModal"
// import AddonProductGridKingPork from "@/wrappers/product/AddonProductGridKingPork";

// import {deleteCartProductV1, isInventorySufficient} from "@/lib/utils/cartHelper.js"
// import { getProductPrice } from "@/lib/utils/productHelper";

// import { getRWDStyles} from "@/lib/utils/rwdHelper"

import {getToFixedNumber} from "@/lib/utils/toFixedHelper"

const CartDetail = ({ 
    // node,  
    // mode, 
    // actions, 
    // routingTable, 
    // ...props,

    routingTable,

    element, 
    elementProps,
    mode,
    ...props

}) => {

    const dispatch = useAppDispatch();
  
//   const { cartProducts } = useAppSelector((state) => state.cart);


    const customer = useAppSelector((state) => state.customer);
    const {cartProducts} = useAppSelector((state)=> state.cart)
    const targetCartProducts = customer?.uuid ? customer?.cart_products||[] : cartProducts


    const estore = useAppSelector((state) => state.estore);

    // const [disableIndex, setDisableIndex] = useState(null)
    // const [addonDisableIndex, setAddonDisableIndex] = useState(null)
    const [showComposeModalIndex, setShowComposeModalIndex] = useState(null)

    //   const [addonProductData, setAddonProductData] = useState([])
    const [subtotal, setSubtotal] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const [baseCurrency, setBaseCurrency] = useState('')
    const [exchangeRates, setExchangeRates] = useState(1)
    const now = new Date().toJSON().slice(0, 10);
    const [excludeUUIDs, setExcludeUUIDs] = useState({})
    const [finalExcludeUUIDs, setFinalExcludeUUIDs] = useState({})

    
    useEffect(()=>{
        if(estore?.e_commerce_settings?.base_currency && estore?.e_commerce_settings?.base_currency!=baseCurrency){
            setBaseCurrency(estore?.e_commerce_settings?.base_currency||'TWD')
            get_exchange_rates(estore?.e_commerce_settings?.base_currency).then(res=>{
                setExchangeRates(res?.data?.rates||{})
            })
        }
    }, [estore, baseCurrency])


    //cart products preloader
    useEffect(()=>{
        if(localStorage.getItem("cart_products")){
            const _cartProducts = JSON.parse(localStorage.getItem("cart_products"));
            dispatch(setCartProducts(_cartProducts));
        }
    },[])

    useEffect(()=>{
        const {subtotal, items, final_exclude_uuids} = getCartSummarize(
            {
                'cartProducts':targetCartProducts,
                'exchangeRates':exchangeRates,
                'now':now,
                'excludeUUIDs':excludeUUIDs,
                'baseCurrency':baseCurrency,
            }
        )
        setSubtotal(subtotal)
        setTotalItems(items)
        setFinalExcludeUUIDs(final_exclude_uuids)
    }, [now, targetCartProducts, exchangeRates, excludeUUIDs])


//   useEffect(()=>{
//     const _addonProductData = [];
//     (cartProducts||[]).forEach(cartProduct=>{
//       (cartProduct?.product?.addon_products||[]).forEach((addonProduct)=>{
//         if(_addonProductData.some((data)=>data?.addonProduct.id==addonProduct.id)){
//           //pass
//         }else{
//           _addonProductData.push({'product':cartProduct?.product, 'addonProduct':addonProduct})
//         }
//       })
//     })
//     setAddonProductData(_addonProductData)
    
//   }, [cartProducts])




  // console.log(cartProducts)

const plusOneDisabled = (cartProduct)=>{
    const {requireQtySufficient, } = isStockSufficient( cartProduct?.product, 1, cartProduct?.quantity||0)
    console.log(requireQtySufficient)
    return !requireQtySufficient
}
  return (
        <div  {...elementProps} >
          
            <div className={clsx(style['標題框'], '標題框')}>
                <h3 className={clsx(style['標題'], '標題')}>購物車</h3>
            </div>
                
            {
                (targetCartProducts||[]).length <= 0 &&
                <div className={clsx(style['無商品框'], '無商品框')}>
                    <div className={clsx(style['無商品-圖標框'], '無商品-圖標框')}>
                        <i className={clsx(style['無商品-圖標框'], '無商品-圖標框', 'pe-7s-cart')}></i>
                    </div>
                    <div className={clsx(style['無商品-文字框'], '無商品-文字框')}>
                        <span className={clsx(style['無商品-文字'], '無商品-文字')}>
                            購物車內沒有商品 
                        </span>
                        {   
                            routingTable?.['shop_route'] &&
                            <a href={`/${routingTable?.['shop_route']}`} className={clsx(style['購物去-超連結'], '購物去-超連結')}>
                                購物去 Shop Now
                            </a>
                        }
                        
                    </div>
                </div>
            }
       



            {
            (targetCartProducts||[]).length > 0 && (
                    <div className={clsx(style['購物車-表格框'], '購物車-表格框')}>
                      <table className={clsx(style['購物車-表格'], '購物車-表格')}>
                        <thead className={clsx(style['表格-頭段'], '表格-頭段')}>
                          <tr className={clsx(style['表格-列'], '表格-列')}>
                            <th className={clsx(style['表格-欄位名稱'], '表格-欄位名稱')}>選取</th>
                            <th className={clsx(style['表格-欄位名稱'], '表格-欄位名稱')}>圖片Image</th>
                            <th className={clsx(style['表格-欄位名稱'], '表格-欄位名稱')}>產品名稱Product Name</th>
                            <th className={clsx(style['表格-欄位名稱'], '表格-欄位名稱')}>單價Unit Price</th>
                            <th className={clsx(style['表格-欄位名稱'], '表格-欄位名稱')}>數量Qty</th>
                            <th className={clsx(style['表格-欄位名稱'], '表格-欄位名稱')}>小計Subtotal</th>
                            <th className={clsx(style['表格-欄位名稱'], '表格-欄位名稱')}>動作action</th>
                          </tr>
                        </thead>
                        <tbody className={clsx(style['表格-身體'], '表格-身體')}>


                        {
                          (targetCartProducts||[]).map((cartProduct, key) => {

                            // const targetProduct = getTargetProduct(cartProduct)
                            // const {sufficientStock, left} = isStockSufficient(cartProduct?.quantity, targetProduct)
                            const {composeValid} = isComposeValid(cartProduct)
                            // const applyDiscount = isDiscountApplied(cartProduct?.product, now)

                            const {isDiscountApplied, originalSinglePrice, discountSinglePrice, originalTotalPrice, discountTotalPrice} = getProductPrice(now, cartProduct?.product, cartProduct?.quantity, cartProduct?.variant_product, cartProduct?.compose_base)
                            const {inventoryControl, inventorySufficient, inventory} = isInventorySufficient(cartProduct)
                            const [productName, variantName, composeName] = getCartProductName(cartProduct)
                            
                            return (
                                <tr className={clsx(style['表格-列'], '表格-列', !inventorySufficient?`${style['缺貨']} 缺貨`:'',excludeUUIDs?.[cartProduct?.uuid]?`${style['未選取']} 未選取`:'',!composeValid?`${style['組合不合規']} 組合不合規`:'')} key={key}>


                                    <td className={clsx(style['表格-勾選框'], "表格-勾選框")}>
                                        {
                                        inventorySufficient && composeValid &&
                                        <input className={clsx(style['購物車商品-勾選'], "購物車商品-勾選")} type="checkbox" checked={excludeUUIDs?.[cartProduct?.uuid]?false:true} onChange={
                                            (event)=>{
                                                const _excludeUUIDS = JSON.parse(JSON.stringify(excludeUUIDs))
                                                if(event?.target?.checked){
                                                    delete _excludeUUIDS?.[cartProduct?.uuid]
                                                }else{
                                                    _excludeUUIDS[cartProduct?.uuid] = true
                                                }
                                                setExcludeUUIDs(_excludeUUIDS)

                                        }}/>
                                        }
                                        
                                        {
                                            !composeValid &&
                                            <span className={clsx(style['重新搭配-文字'], "重新搭配-文字")}>
                                                請重新搭選商品
                                            </span>
                                        
                                        }
                                    </td>

                                    <td className={clsx(style['表格-圖片框'], "表格-圖片框")}>
                                        <a href={`/${routingTable?.['product_route']}/${cartProduct?.product?.uuid}`}>
                                        <img
                                            className={clsx(style['購物車商品-圖片'], "購物車商品-圖片")}
                                            src={cartProduct?.variant_product?.image||cartProduct?.product?.images?.[0]?.image}
                                            alt=""
                                        />
                                        </a>
                                    </td>

                                    <td className={clsx(style['表格-名稱框'], "表格-名稱框")}>
                                        <a href={`/${routingTable?.['product_route']}/${cartProduct?.product?.uuid}`}>
                                            <h4 className={clsx(style['購物車商品-名稱'], "購物車商品-名稱")}>{productName}</h4>
                                            <h5 className={clsx(style['購物車商品-變體名稱'], "購物車商品-變體名稱")}>{variantName}</h5>
                                            <h5 className={clsx(style['購物車商品-任搭名稱'], "購物車商品-任搭名稱")}>{composeName}</h5>
                                        </a>
                                    </td>


                                    <td className={clsx(style['表格-價錢框'], "表格-價錢框")}>
                                        {
                                            isDiscountApplied ? 
                                            <Fragment>
                                                <span className={clsx('折扣後價格',style['折扣後價格'])}>
                                                    {`${cartProduct?.product?.currency_sign||'$'}${getToFixedNumber(discountSinglePrice, baseCurrency)}`}
                                                </span>
                                                <span className={clsx('折扣前價格',style['折扣前價格'])}>
                                                    {`${cartProduct?.product?.currency_sign||'$'}${getToFixedNumber(originalSinglePrice, baseCurrency)}`}
                                                </span>
                                            </Fragment>
                                            :
                                            <span className={clsx('商品價格',style['商品價格'])}>
                                                {`${cartProduct?.product?.currency_sign||'$'}${getToFixedNumber(originalSinglePrice, baseCurrency)}`}
                                            </span>
                                        }
                                    </td>


                                    <td className={clsx('表格-商品數量選擇框',style['表格-商品數量選擇框'])}>
                                        <div className={clsx('商品數量選擇框',style['商品數量選擇框'])}>
                                            <button
                                                className={clsx('商品數量減去按鈕',style['商品數量減去按鈕'])}
                                                onClick={() =>{
                                                    
                                                    if(cartProduct?.quantity>1){
                                                        updateCartProduct(
                                                            cartProduct?.product, 
                                                            cartProduct?.variant_product, 
                                                            -1, 
                                                            dispatch, 
                                                            cartProduct?.compose_base, 
                                                            null, 
                                                            false,
                                                            null,
                                                            null,
                                                        )
                                                    }
                                                    
                                                }}
                                            >-</button>
                                            <input
                                                className={clsx('商品數量',style['商品數量'])}
                                                type="text"
                                                value={cartProduct?.quantity}
                                                readOnly
                                            />
                                            <button
                                                className={clsx('商品數量增加按鈕',style['商品數量增加按鈕'])}
                                                onClick={() =>{
                                                    if(!plusOneDisabled(cartProduct)){
                                                        updateCartProduct(
                                                            cartProduct?.product, 
                                                            cartProduct?.variant_product, 
                                                            1, 
                                                            dispatch, 
                                                            cartProduct?.compose_base, 
                                                            null, 
                                                            false,
                                                            null,
                                                            null,
                                                        )
                                                    }

                                                }}
                                                disabled={plusOneDisabled(cartProduct)}
                                            >+</button>
                                        </div>
                                    </td>
                                  

                                    <td className={clsx('表格-小計框',style['表格-小計框'])}>
                                        <span className={clsx('小計',style['小計'])}>
                                            { inventorySufficient?`${cartProduct?.product?.currency_sign||'$'}${getToFixedNumber(isDiscountApplied?discountTotalPrice:originalTotalPrice, baseCurrency)}`:''}
                                        </span>
                                    </td>

                                    <td className={clsx('表格-動作框',style['表格-動作框'])}>
                                        {!inventorySufficient &&
                                            <div className={clsx('缺貨文字框',style['缺貨文字框'])}>
                                                <span className={clsx('缺貨文字',style['缺貨文字'])}>缺貨中</span>
                                            </div>
                                        }
                                        {
                                            cartProduct?.product?.type=='compose' &&
                                            <Fragment>
                                                <ComposeProductModal 
                                                    show={key==showComposeModalIndex} 
                                                    onHide={()=>{setShowComposeModalIndex(null)}}
                                                    product={cartProduct?.product}
                                                    cartProduct={cartProduct}
                                                    composeBase={cartProduct?.compose_base}
                                                    quantityCount={cartProduct?.quantity}
                                                    updateCompose={true}
                                                
                                                />
                                                <div className={clsx('修改搭配框',style['修改搭配框'])}>
                                                    <button className={clsx('修改搭配按鈕',style['修改搭配按鈕'])}
                                                        onClick={() =>{setShowComposeModalIndex(key)}}
                                                    >
                                                    修改
                                                    </button>
                                                </div>
                                            </Fragment>
                                        }
                                        <div className={clsx('刪除商品按鈕框',style['刪除商品按鈕框'])}>
                                            <button className={clsx('刪除商品按鈕',style['刪除商品按鈕'])}
                                            onClick={() =>{
                                                deleteCartProductV1(cartProduct?.uuid, dispatch)
                                            }}
                                            disabled={
                                                // disableIndex==key
                                                false
                                            }
                                            >
                                                <i className="fa fa-times"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )

                                

                                {
                                //   //-----------------------------------------------------Add On Product ---------------------------------
                                //   (cartProduct?.cart_addon_products||[]).length>0 && 
                                //   <Fragment>
                                //     {
                                //       (cartProduct?.cart_addon_products||[]).map((cartAddonProduct, cartAddonProductIndex)=>{


                                //         const targetProduct = cartAddonProduct?.source_product
                                //         const {sufficientStock, left} = isStockSufficient(cartAddonProduct.quantity, targetProduct)
                                //         const applyDiscount = isDiscountApplied(targetProduct, now)

                                //         return (
                                //           <tr key={cartAddonProductIndex} style={{opacity:!sufficientStock||cartProduct?._unselect ? 0.5 : 1}}>


                                //             <div className={style['cart-td']}>{'(加價購)'}</div>

                                //             <div className={clsx(style['cart-td'], "product-thumbnail")}>
                                //                 <img
                                //                   className="img-fluid"
                                //                   src={cartAddonProduct?.source_product?.images?.[0]?.image}
                                //                   alt=""
                                //                 />
                                //             </div>

                                //             <div className={clsx(style['cart-td'], "product-name")}>
                                //               {cartAddonProduct?.source_product?.name}
                                //             </div>


                                //             <div className={clsx(style['cart-td'], "product-price-cart")}>
                                //                 {applyDiscount ? (
                                //                   <Fragment>
                                //                     <span className="amount old">
                                //                       {cartAddonProduct?.source_product?.currency_sign||'$'}
                                //                       {getProductPrice(null, targetProduct, false)}
                                //                     </span>
                                //                     <span className="amount">
                                //                       {cartAddonProduct?.source_product?.currency_sign||'$'}
                                //                       {getProductPrice(null, targetProduct, applyDiscount)}
                                //                     </span>
                                //                   </Fragment>
                                //                 ) : (
                                //                   <span className="amount">
                                //                     {cartAddonProduct?.source_product?.currency_sign||'$'} 
                                //                     {getProductPrice(null, targetProduct, applyDiscount)}
                                //                   </span>
                                //                 )}
                                //               </div>


                                //             <div className={clsx(style['cart-td'], "product-quantity")}>
                                              
                                //               <div className="cart-plus-minus">
                                //                 <button
                                //                   className="dec qtybutton"
                                //                   onClick={() =>{
                                //                     updateCartProduct(cartProduct?.product, null, 0, dispatch, null, null, null, targetProduct, -1)

                                //                   }}
                                //                   disabled={disableIndex==key || addonDisableIndex==cartAddonProductIndex|| cartAddonProduct.quantity<=1}
                                //                 >
                                //                   -
                                //                 </button>
                                //                 <input
                                //                   className="cart-plus-minus-box"
                                //                   type="text"
                                //                   value={cartAddonProduct.quantity}
                                //                   readOnly
                                //                 />
                                //                 <button
                                //                   className="inc qtybutton"
                                //                    onClick={() =>{
                                //                     updateCartProduct(cartProduct?.product, null, 0, dispatch, null, null, null, targetProduct, 1)

                                //                   }}
                                //                   disabled={
                                //                     disableIndex==key || addonDisableIndex==cartAddonProductIndex ||!sufficientStock || !left || (cartAddonProduct?.quantity||0)>=(cartProduct?.quantity||1)
                                //                   }
                                //                 >
                                //                   +
                                //                 </button>
                                //               </div>

                                //             </div>


                                //             {sufficientStock?
                                //               <div className={clsx(style['cart-td'], "product-subtotal")}>
                                //                 { (cartAddonProduct?.source_product?.currency_sign||'$') + (( getProductPrice(null, targetProduct, applyDiscount)) * cartAddonProduct.quantity).toFixed(2)}
                                //               </div>
                                //               :
                                //               <div className={clsx(style['cart-td'], "product-subtotal")}></div>
                                //             }

                                //             <div className={clsx(style['cart-td'], "product-remove")}>
                                //               {!sufficientStock &&
                                //                 '缺貨中'
                                //               }
                                            
                                //               <button
                                //                 onClick={() =>{
                                //                   setAddonDisableIndex(cartAddonProductIndex)
                                //                   deleteCartAddonProductV1(key, cartAddonProductIndex, cartAddonProduct, dispatch)
                                //                   .then(()=>{setAddonDisableIndex(null)}).catch(err=>{setAddonDisableIndex(null)})

                                //                 }}
                                //                 disabled={disableIndex==key || addonDisableIndex==cartAddonProductIndex}
                                //               >
                                //                 <i className="fa fa-times"></i>
                                //               </button>

                                //             </div>

                                //           </tr>




                                //         )
                                //       })


                                //     }

                                //   </Fragment>
                                  
                                }

                            })}

                        </tbody>
                      </table>
                      </div>
                    )}
                
                {
                //   (addonProductData||[]).length > 0 &&
                //   <Fragment>
                //     <h3 className="cart-page-title mt-3">加購商品 Addon Products</h3>
                //     <div className={clsx('mt-3', 'p-5', style['addon-box'])} >
                //       <AddonProductGridKingPork
                //         addonProductData={addonProductData}
                //         props={{'imageHeight':'200px'}}
                //         // component={component}
                //       />


                //     </div>
                //   </Fragment>

                }
                

                <div className={clsx('購物車-動作框',style['購物車-動作框'])}>
                    <div className={clsx('繼續購物框',style['繼續購物框'])}>
                        <a
                            className={clsx('繼續購物超連結',style['繼續購物超連結'])}
                            href={`/${routingTable?.['shop_route']}`}
                            
                        >
                            繼續購物
                        </a>
                    </div>
                    <div className={clsx('清空購物車按鈕框',style['清空購物車按鈕框'])}>
                        <button className={clsx('清空購物車按鈕',style['清空購物車按鈕'])} onClick={() => {
                            deleteAllCartProductV1(dispatch)
                        }}

                        >
                            清空購物車
                        </button>
                    </div>
                </div>

                <div className={clsx('購物車-總計框',style['購物車-總計框'])}>
                    <div className={clsx('總計標題框',style['總計標題框'])}>
                        <h5 className={clsx('總計標題',style['總計標題'])}>
                            總計
                        </h5>
                    </div>

                    <div className={clsx('商品件數框',style['商品件數框'])}>
                        <h5 className={clsx('商品件數-文字',style['商品件數-文字'])}>
                            商品件數:
                        </h5>
                        <span className={clsx('商品件數',style['商品件數'])}>
                            {totalItems}
                        </span>
                    </div>
                      
                    <div className={clsx('總金額框',style['總金額框'])}>
                        <h5 className={clsx('總金額-文字',style['總金額-文字'])}>
                            金額:
                        </h5>
                        <span className={clsx('總金額',style['總金額'])}>
                            {`${estore?.e_commerce_settings?.base_currency_sign||'$'}${getToFixedNumber(subtotal, baseCurrency)}`}
                        </span>
                    </div>
                    
                    <div className={clsx('結帳連結框',style['結帳連結框'])}>
                        <a href={`/${routingTable?.['checkout_route']}?exclude_uuids=${Object.keys(finalExcludeUUIDs).join(',')}`} className={clsx('結帳連結',style['結帳連結'])}>
                            前往結帳
                        </a>
                    </div>
                </div>
        </div>);
};

export default CartDetail;
