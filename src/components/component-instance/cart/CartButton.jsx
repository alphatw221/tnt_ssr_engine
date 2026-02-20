import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useRef } from "react";
import clsx from "clsx";
import style from './CartButton.module.scss'


import { useAppSelector, useAppDispatch } from "@/redux/hooks";         

// import { setBaseCurrency, setExchangeRates } from "../../redux/slices/estore-slice";
// import { get_exchange_rates } from "@/api/exchange_rates";



// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// import route_names from "../../route_names";
// import Cookies from "js-cookie";

import {deleteCartProductV1, isInventorySufficient, getCartProductName, updateCartProduct, getCartProductsCount} from "@/lib/utils/cartHelper.js"
import { getProductPrice, isStockSufficient } from "@/lib/utils/productHelper";

// import { customer_delete_cart_product } from "../../api/cart";
import {useClickOutsideEvent} from '@/lib/utils/clickOutside.js'
import cogoToast from 'cogo-toast';
// import { rwdHelper, RWDPropHandler} from "../../lib/utils/rwdHelper"


// import { getRWDStyles} from "@/lib/utils/rwdHelper"
import { getToFixedNumber } from "@/lib/utils/toFixedHelper";
import { setCartProducts } from "@/redux/slices/cart-slice";
import { createPortal } from "react-dom";
import PortalWrapper from "@/components/portal-wrapper/PortalWrapper";

const CartButton = ({  
    // node,  mode, actions, update, children, routingTable, ...props


    routingTable,
    element, 
    elementProps,
    mode,
    now,
    ...props

}) => {
    

    const dispatch = useAppDispatch()

    const [showDropDown, setShowDropDown] = useState(false)
    const dropDown = useRef(null);

    const customer = useAppSelector((state) => state.customer);
    const {cartProducts} = useAppSelector((state)=> state.cart)
    const targetCartProducts = customer?.uuid ? customer?.cart_products||[] : cartProducts


    useEffect(() => {
        console.log('cart button')
        console.log(getCartProductsCount(targetCartProducts))
        document.documentElement.dataset.cartCount = getCartProductsCount(targetCartProducts)

    }, [targetCartProducts]);

    useClickOutsideEvent(useEffect, dropDown,()=>{
        setShowDropDown(false)
    },showDropDown)


    

    //cart products preloader
    useEffect(()=>{
        if(localStorage.getItem("cart_products")){
            const _cartProducts = JSON.parse(localStorage.getItem("cart_products"));
            dispatch(setCartProducts(_cartProducts));
        }
    },[])

    // TODO
    // const store = useAppSelector((state) => state.estore);
    // useEffect(()=>{
    //     if(store?.e_commerce_settings?.base_currency && store?.e_commerce_settings?.base_currency!=baseCurrency){
    //       get_exchange_rates(store?.e_commerce_settings?.base_currency).then(res=>{
    //         dispatch(setBaseCurrency(store?.e_commerce_settings?.base_currency))
    //         dispatch(setExchangeRates(res.data.rates))
    //       })
    //     }
    // }, [store, baseCurrency])
    const minusOneDisabled = (cartProduct)=>{
        if(cartProduct?.compose_base) return true
        return (cartProduct?.quantity||0)>1
    }
    const plusOneDisabled = (cartProduct)=>{
        if(cartProduct?.compose_base) return true

        const {requireQtySufficient, } = isStockSufficient( cartProduct?.product, 1, cartProduct?.quantity||0)
        // console.log(requireQtySufficient)
        return !requireQtySufficient
    }

    useEffect(()=>{

    },[])

    return (
        <Fragment>

            <div 
               {...elementProps}
                className={`${style['購物車框']} ${'購物車框'} ${elementProps?.className||''}`}
               
            >
            
                <button className={clsx(style['購物車按鈕'],'購物車按鈕',)} onClick={()=>{setShowDropDown(true)}}>
                    <i className={clsx(style['購物車按鈕-圖標'],'購物車按鈕-圖標',)}/>
                    <span className={clsx(style['購物車按鈕-文字'],'購物車按鈕-文字',)}>購物車</span>
                    <span className={clsx(style['購物車按鈕-商品數'],'購物車按鈕-商品數',)}>{(targetCartProducts||[])?.length||0}</span>
                </button>

                
                <PortalWrapper >
                    <div className={clsx(style['購物車-下拉'], '購物車-下拉', showDropDown?style['顯示']:'', showDropDown?'顯示':'')}
                        ref={dropDown}
                    >

                        <button className={clsx(style['關閉按鈕'], '關閉按鈕')} onClick={()=>{setShowDropDown(false)}}>
                            <i className={clsx(style['關閉圖標'], '關閉圖標')}/>
                        </button>
                        {
                        (targetCartProducts||[]).length > 0
                        ?
                        <Fragment>
                            <div className={clsx(style['購物車列表框'], '購物車列表框')}>
                                    {(targetCartProducts||[]).map((cartProduct, key) => {

                                        const {inventoryControl, inventorySufficient, inventory} = isInventorySufficient(cartProduct)
                                        const {isDiscountApplied, originalSinglePrice, discountSinglePrice, originalTotalPrice, discountTotalPrice,} = getProductPrice(now, cartProduct?.product, cartProduct?.quantity, cartProduct?.variant_product, cartProduct?.compose_base)
                                        
                                        const [productName, variantName, composeName] = getCartProductName(cartProduct)
                                        return (

                                            <div key={key} 
                                                className={clsx(style['購物車商品框'], '購物車商品框', !inventorySufficient?`${style['缺貨']} 缺貨`:'')}
                                            >


                                                <div className={clsx(style['購物車商品-圖片框'], '購物車商品-圖片框')}>
                                                    <a href={`/${routingTable?.['product_route']}/${cartProduct?.product?.uuid}`}>
                                                        <img
                                                            className={clsx(style['購物車商品-圖片'], '購物車商品-圖片')}
                                                            src={cartProduct?.variant_product?.image||cartProduct?.product?.images?.[0]?.image}
                                                            alt=""
                                                        />
                                                    </a>
                                                </div>

                                                <div className={clsx(style['購物車商品-資訊框'], '購物車商品-資訊框')}>
                                                    <a href={`/${routingTable?.['product_route']}/${cartProduct?.product?.uuid}`}>
                                                        {/* <h4 className={clsx(style['購物車商品-名稱'], '購物車商品-名稱')}>{getCartProductName(cartProduct)}</h4> */}
                                                        <h4 className={clsx(style['購物車商品-名稱'], "購物車商品-名稱")}>{productName}</h4>
                                                        <h5 className={clsx(style['購物車商品-變體名稱'], "購物車商品-變體名稱")}>{variantName}</h5>
                                                        <h5 className={clsx(style['購物車商品-任搭名稱'], "購物車商品-任搭名稱")}>{composeName}</h5>
                                                    </a>
                                                    {/* <h6 className={clsx(style['購物車商品-數量'], '購物車商品-數量')}>數量: {cartProduct?.quantity}</h6> */}



                                                    
                                                    <div className={clsx('購物車商品-數量選擇框',style['購物車商品-數量選擇框'])}>
                                                        
                                                        <button
                                                            className={clsx('商品數量減去按鈕',style['商品數量減去按鈕'])}
                                                            onClick={() =>{
                                                                
                                                                if(!minusOneDisabled(cartProduct)){
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
                                                            disabled={minusOneDisabled(cartProduct)}
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



                                                    <span className={clsx(style['購物車商品-價錢'], '購物車商品-價錢')}>
                                                        {isDiscountApplied 
                                                            ? (cartProduct?.product?.currency_sign||'$') +  getToFixedNumber(discountTotalPrice, cartProduct?.product?.currency)
                                                            :   (cartProduct?.product?.currency_sign||'$') + getToFixedNumber(originalTotalPrice, cartProduct?.product?.currency)
                                                        }
                                                    </span>
                                                    {/* <br/> */}
                                                    {
                                                    // cartProduct?.variant_product && cartProduct?.variant_product?.type1 &&
                                                    //     <span className={clsx(style['購物車商品-變體類別1'], '購物車商品-變體類別1')}>{cartProduct?.variant_product?.type1}: {cartProduct?.variant_product?.value1}</span>
                                                    }
                                                    {/* <br/> */}
                                                    {
                                                    // cartProduct?.variant_product && cartProduct?.variant_product?.type2 &&
                                                    //     <span className={clsx(style['購物車商品-變體類別2'], '購物車商品-變體類別2')}>{cartProduct?.variant_product?.type2}: {cartProduct?.variant_product?.value2}</span>
                                                    }
                                                    {
                                                    // cartProduct?.compose_base &&
                                                    //     <span className={clsx(style['購物車商品-任搭'], '購物車商品-任搭')}>{`任搭：${cartProduct?.compose_base?.base}`}</span>
                                                    }
                                                </div>
                                                <div className={clsx(style['購物車商品-動作框'], '購物車商品-動作框')}>
                                                    <button 
                                                        className={clsx(style['購物車商品-刪除按鈕'], '購物車商品-刪除按鈕')}
                                                        onClick={() => {
                                                            deleteCartProductV1(cartProduct?.uuid, dispatch)
                                                        }}>
                                                    刪除
                                                    </button>
                                                    {
                                                        //這邊先不要加太多動作
                                                    }
                                                </div>

                                

                                            </div>);
                                    }   )}
                                </div>
                                <div className={clsx(style['超連結框'], '超連結框')}>
                                    <a className={clsx(style['購物車-超連結'], '購物車-超連結')} href={`/${routingTable?.['cart_route']}`} 
                                    >
                                        檢視購物車
                                    </a>
                                    <a
                                        className={clsx(style['結帳-超連結'], '結帳-超連結')}
                                        href={`/${routingTable?.['checkout_route']}`}
                                    >
                                        結帳
                                    </a>
                                </div>
                            </Fragment>

                            :

                            <div className={clsx(style['購物車列表框'], '購物車列表框')}>
                                <span className={clsx(style['購物車無商品-文字'], '購物車無商品-文字')}>購物車無商品</span>
                            </div>

                            }
                    </div>
                </PortalWrapper>
 

            </div>

        </Fragment>
        )
};

CartButton.propTypes = {
};

export default CartButton;




