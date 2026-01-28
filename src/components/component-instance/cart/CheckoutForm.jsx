
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useRef } from "react";
import clsx from "clsx";

import { useAppSelector, useAppDispatch  } from "@/redux/hooks";


import { get_exchange_rates } from "@/api/exchange_rates";
import { customer_get_store_checkout_services } from "@/api/estore"
import { 
    getCartSummarize, 
    getCartProductName, 
    isApplyPointsValid,
  } from "@/lib/utils/cartHelper";
import {getProductPrice} from "@/lib/utils/productHelper"

import { createValidator } from "@/lib/validator"
import style from './CheckoutForm.module.scss'

import {getLogisticServiceInfo} from '@/lib/utils/logisticHelper.js'
import {getClientIPCountryCode} from '@/fetch/ipapi'


import { getToFixedNumber } from "@/lib/utils/toFixedHelper";
import { customer_checkout_cart } from "@/api/cart";
import GuestCheckoutNotification from '@/components/guest-checkout-notification/GuestCheckoutNotification'
import Cookies from "js-cookie";
import { deleteAllCartProduct, setCartProducts } from "@/redux/slices/cart-slice";
import { setCustomer} from "@/redux/slices/customer-slice";

const CheckoutForm = ({  
    // node,  mode, actions, update, routingTable, ...props

    routingTable,
    element, 
    elementProps,
    mode,
    now,
    ...props


}) => {
    

    const [searchParams, setSearchParams] = useState({ redirect: null, });
    
    const dispatch = useAppDispatch()
    const customer = useAppSelector((state) => state.customer);
    const {cartProducts} = useAppSelector((state)=> state.cart)
    const targetCartProducts = customer?.uuid ? customer?.cart_products||[] : cartProducts

    const estore = useAppSelector((state) => state.estore);
    const [containProductTags, setContainProductTags] = useState([])
    const [totalItems, setTotalItems] = useState(0)
    const [subtotal, setSubtotal] = useState(0)
    const [tax, setTax] = useState(0)
    const [freeShipping, setFreeShipping] = useState(0)
    const [shippingFee, setShippingFee] = useState(0)
    const [applyPointsValid, setApplyPointsValid] = useState(true)
    const [applyPointsDiscount, setApplyPointsDiscount] = useState(0)
    const [total, setTotal] = useState(0)
    
    const [showProceedAsGuestNotification, setShowProceedAsGuestNotification] = useState(false)

    // const [excludeUUIDs, setExcludeUUIDs] = useState(Object.fromEntries((searchParams.get('exclude_uuids')||'').split(',').map(key => [key, true])))
    const [finalExcludeUUIDs, setFinalExcludeUUIDs] = useState({})




    const [baseCurrency, setBaseCurrency] = useState('')
    const [exchangeRates, setExchangeRates] = useState(1)
    const [logisticServices, setLogisticServices] = useState([])
    // const [invoiceServices, setInvoiceServices] = useState([])
    const [checkoutData, setCheckoutData] = useState({
        // shipping_first_name:customer?.first_name||'', 
        // shipping_last_name:customer?.last_name||'', 
        shipping_name:`${customer?.last_name||''}${customer?.first_name||''}`,
        shipping_cellphone:customer?.phone||'', 
        shipping_email:customer?.email||'', 
        shipping_address_1:'', 
        shipping_address_2:'',
        shipping_principle:'anytime',
        customer_remark:'',
        apply_points:0,



        // logistic_service_uuid:null, 
        // logistic_service_provider:null,

        // invoice_service_uuid:null, 
        // invoice_service_provider:null,

        
    })
    const [awaitSubmitButton, setAwaitSubmitButton] = useState(false)
    
    const receiverInfoValidator = useRef(createValidator())
    const addressInfoValidator = useRef(createValidator())
    const invoiceInfoValidator = useRef(createValidator())

    const [, forceUpdate] = useState();
    
    const [country, setCountry] = useState(null)
    

    //cart products preloader ?
    useEffect(()=>{
        if(localStorage.getItem("cart_products")){
            const _cartProducts = JSON.parse(localStorage.getItem("cart_products"));
            dispatch(setCartProducts(_cartProducts));
        }
    },[])
    //customer preloader ?
    useEffect(()=>{
            if(Cookies.get('customer_access_token')){
                if(localStorage.getItem("customer")){
                    const _customer = JSON.parse(localStorage.getItem("customer"));
                    dispatch(setCustomer(_customer));
                }else{
                    // customer_get_account().then(res=>{
                    //     console.log(res.data)
                    //     localStorage.setItem("customer", JSON.stringify(res.data));
                    //     dispatch(setCustomer(res.data))
                    // }).catch(err=>{
                    //     Cookies.remove('customer_access_token')
                    // })
                }
            }else{
                localStorage.removeItem("customer");
                dispatch(setCustomer({uuid:null}))
            }
        },[])
    useEffect(()=>{   
        getClientIPCountryCode().then(_country=>{
            setCountry(_country)
        })
    }, [])
    useEffect(()=>{
        if(customer?.uuid){
            setCheckoutData({...checkoutData, 
                shipping_name:`${customer?.first_name||''}${customer?.last_name||''}`,
                shipping_cellphone:customer?.phone||'', 
                shipping_email:customer?.email||'', 
            })
        }
    }, [customer])
    useEffect(()=>{   
        if(country){
            customer_get_store_checkout_services({
                country,
                'logistic_service_order_by':'priority',
            }).then(res=>{
                // console.log(res.data)
                setLogisticServices(res?.data?.logistic_services||[])
                // setInvoiceServices(res?.data?.invoice_services||[])
                // if((res?.data?.invoice_services||[])?.length==1){
                //     setCheckoutData({
                //         ...checkoutData,
                //         invoice_service_uuid:res?.data?.invoice_services?.[0]?.uuid,
                //         invoice_service_provider:res?.data?.invoice_services?.[0]?.provider,
                //     })
                // }
            })
        }
    }, [country])

    useEffect(()=>{   

        // console.log(estore)
        if(estore?.e_commerce_settings?.base_currency && estore?.e_commerce_settings?.base_currency!=baseCurrency){
            setBaseCurrency(estore?.e_commerce_settings?.base_currency||'TWD')
            get_exchange_rates(estore?.e_commerce_settings?.base_currency).then(res=>{
                setExchangeRates(res?.data?.rates||{})
            })
        }
    }, [estore, baseCurrency])

    useEffect(() => {
            const urlSearchParams = new URLSearchParams(window.location.search);
            const exclude_uuids = urlSearchParams.get('exclude_uuids') || '';
            setSearchParams({ exclude_uuids });
    }, []);
    
    useEffect(()=>{
            const excludeUUIDs = Object.fromEntries((searchParams?.exclude_uuids||'').split(',').filter(v=>!['','null', 'undefined'].includes(v)).map(key => [key, true]))
            const {items, final_exclude_uuids, subtotal, tax, free_shipping, shipping_fee, total, contain_product_tags, apply_points_valid, apply_points_discount} = getCartSummarize(
                {
                    'cartProducts':targetCartProducts,
                    'exchangeRates':exchangeRates,
                    'now':now,
                    'excludeUUIDs':excludeUUIDs,

                    'checkoutData':checkoutData, 
                    'logisticServices':logisticServices, 
                    'customer':customer, 
                    'bonusPointPolicy':estore?.bonus_point_policy,
                    'baseCurrency':baseCurrency,
                }
            )
            setSubtotal(subtotal)
            setTotalItems(items)
            setFinalExcludeUUIDs(final_exclude_uuids)
            setTax(tax)
            setFreeShipping(free_shipping)
            setShippingFee(shipping_fee)
            setApplyPointsValid(apply_points_valid)
            setApplyPointsDiscount(apply_points_discount)
            setTotal(total)
            setContainProductTags(contain_product_tags)
    }, [now, targetCartProducts, exchangeRates, searchParams, checkoutData, logisticServices])
    
    const nextAction = ()=>{
        setAwaitSubmitButton(true)
        customer_checkout_cart(
            {
                'checkout_data':checkoutData,
                'exclude_uuids':finalExcludeUUIDs,
                'cart_products_data':targetCartProducts,
                'guest_access_token':Cookies.get('guest_access_token'),
                'country':country,
            }
        ).then(res=>{
            // console.log(res.data)
            // setAwaitSubmitButton(false)
            // setShowProceedAsGuestNotification(false)
            if(!customer?.uuid){
                dispatch(deleteAllCartProduct())
            }else{
                dispatch(setCustomer({
                    ...customer,
                    cart_products:(customer.cart_products||[]).filter(_cart_product=>finalExcludeUUIDs?.[_cart_product?.uuid]),
                    points:(customer?.points||0)-(checkoutData?.apply_points||0)
                }))
            }
            // router.push(`/${routingTable?.['order_payment_route']}/${res?.data?.order?.uuid}`)
            window.location.href = `/${routingTable?.['order_payment_route']}/${res?.data?.order?.uuid}`
        }).catch(err=>{
            setAwaitSubmitButton(false)
            setShowProceedAsGuestNotification(false)
        })
        
    }
    const checkout = ()=>{

        var allValid = true;
        if(!receiverInfoValidator.current.allValid()){
            receiverInfoValidator.current.showMessages()
            forceUpdate(new Date())
            allValid=false
        }
        if(checkoutData?.logistic_service_provider=='customize_deliver' && !addressInfoValidator.current.allValid()){
            addressInfoValidator.current.showMessages()
            forceUpdate(new Date())
            allValid=false
        }
        if(checkoutData?.enable_full_invoice && !invoiceInfoValidator.current.allValid()){
            invoiceInfoValidator.current.showMessages()
            forceUpdate(new Date())
            allValid=false
        }
        if(!applyPointsValid){
            allValid=false
        }
        if(!allValid)return

        if(!customer?.uuid ){
            if(estore?.e_commerce_settings?.allow_guest_checkout){
                if(Cookies.get('guest_access_token')){
                    nextAction()
                }else{
                    setShowProceedAsGuestNotification(true)
                }
            }else{
                setShowProceedAsGuestNotification(true)
            }

        }else{
            nextAction()
        }

    }

    return (
        
        <div 
           {...elementProps}
          >
            
            <div className={clsx(style['標題框'], '標題框')}>
                <h3 className={clsx(style['標題'], '標題')}>結帳</h3>
            </div>
                
            {
                (targetCartProducts||[]).filter(_cartProduct=>!finalExcludeUUIDs?.[_cartProduct?.uuid]).length <= 0 &&
                <div className={clsx(style['無商品框'], '無商品框')}>
                    <div className={clsx(style['無商品-圖標框'], '無商品-圖標框')}>
                        <i className={clsx(style['無商品-圖標'], '無商品-圖標', 'pe-7s-cart')}></i>
                    </div>
                    <div className={clsx(style['無商品-文字框'], '無商品-文字框')}>
                        <span className={clsx(style['無商品-文字'], '無商品-文字')}>
                            無結帳商品
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
                (targetCartProducts||[]).filter(_cartProduct=>!finalExcludeUUIDs?.[_cartProduct?.uuid]).length > 0 && 
                <Fragment>
                    <div className={clsx(style['購物車-表格框'], '購物車-表格框')}>
                        <table className={clsx(style['購物車-表格'], '購物車-表格')}>
                            <thead className={clsx(style['表格-頭段'], '表格-頭段')}>
                            <tr className={clsx(style['表格-列'], '表格-列')}>
                                <th className={clsx(style['表格-欄位名稱'], '表格-欄位名稱')}>圖片Image</th>
                                <th className={clsx(style['表格-欄位名稱'], '表格-欄位名稱')}>產品名稱Product Name</th>
                                <th className={clsx(style['表格-欄位名稱'], '表格-欄位名稱')}>單價Unit Price</th>
                                <th className={clsx(style['表格-欄位名稱'], '表格-欄位名稱')}>數量Qty</th>
                                <th className={clsx(style['表格-欄位名稱'], '表格-欄位名稱')}>小計Subtotal</th>
                            </tr>
                            </thead>
                            <tbody className={clsx(style['表格-身體'], '表格-身體')}>
                                {
                                (targetCartProducts||[]).filter(_cartProduct=>!finalExcludeUUIDs?.[_cartProduct?.uuid])?.map((cartProduct, key) => {

                                
                                const {isDiscountApplied, originalSinglePrice, discountSinglePrice, originalTotalPrice, discountTotalPrice} = getProductPrice(now, cartProduct?.product, cartProduct?.quantity, cartProduct?.variant_product, cartProduct?.compose_base)
                                const [productName, variantName, composeName] = getCartProductName(cartProduct)
                                
                                return (
                                    <tr className={clsx(style['表格-列'], '表格-列', )} key={key}>

                                        <td className={clsx(style['表格-圖片框'], "表格-圖片框")}>
                                            <a href={`/${routingTable?.['product_route']}/${cartProduct?.product?.uuid}`}>
                                            <img
                                                className={clsx(style['購物車商品-圖片'], "購物車商品-圖片")}
                                                src={cartProduct?.variant_product?.image||cartProduct.product.images?.[0]?.image}
                                                alt=""
                                            />
                                            </a>
                                        </td>

                                        <td className={clsx(style['表格-名稱框'], "表格-名稱框")}>
                                            <a href={`/${routingTable?.['product_route']}/${cartProduct?.product?.uuid}`}>
                                                {/* <h4 className={clsx(style['購物車商品-名稱'], "購物車商品-名稱")}>
                                                    {getCartProductName(cartProduct)}
                                                </h4> */}
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
                                                    {`${cartProduct?.product?.currency_sign||'$'}${getToFixedNumber(originalSinglePrice, baseCurrency) }`}
                                                </span>
                                            }
                                        </td>


                                        <td className={clsx('表格-商品數量選擇框',style['表格-商品數量選擇框'])}>
                                            <span className={clsx('商品數量',style['商品數量'])}>{cartProduct?.quantity}</span>
                                        </td>
                                    

                                        <td className={clsx('表格-小計框',style['表格-小計框'])}>
                                            <span className={clsx('小計',style['小計'])}>
                                                {`${cartProduct?.product?.currency_sign||'$'}${getToFixedNumber(isDiscountApplied?discountTotalPrice:originalTotalPrice, baseCurrency)}`}
                                            </span>
                                        </td>

                                    
                                    </tr>
                                )

                                })}

                            </tbody>
                        </table>
                    </div>



                    <div className={clsx('運送方式框',style['運送方式框'])}>
                        <div className={clsx('運送方式標題框',style['運送方式標題框'])}>
                            <h5 className={clsx('運送方式標題',style['運送方式標題'])}>
                                運送方式
                            </h5>
                        </div>

                        {
                            (logisticServices||[]).length<=0 &&
                            <div className={clsx('無可用運送方式框',style['無可用運送方式框'])}>
                                <h5 className={clsx('無可用運送方式-文字',style['無可用運送方式-文字'])}>無可用運送方式</h5>
                            </div>
                        }
                        

                        {/* <label className={clsx('單運送方式',style['單運送方式'], )} >
                                    <form action={`http://localhost:8000/api/v1/store/ecpay/logistic_html?logistic_service_uuid=${'eff07994-5124-49ba-9ef9-f3174965de79'}`} method="POST">
                                    <button type="submit">TEST</button></form>  
                        </label> */}


                        {
                            (logisticServices||[]).length>0 &&
                            (logisticServices||[]).map((logisticService, key)=>{

                                const {optionFee, optionName, optionAddress, shippingFeeAfterConvertCurrency} =getLogisticServiceInfo(logisticService, exchangeRates, subtotal)
                                return (
                                    <label key={key} className={clsx('單運送方式',style['單運送方式'], logisticService?.uuid === checkoutData?.logistic_service_uuid?`${style['選取']} 選取`:'')} >
                                        <input
                                            className={clsx('單運送方式-勾選',style['單運送方式-勾選'])}
                                            type="radio"
                                            value={logisticService.uuid}
                                            checked={logisticService?.uuid === checkoutData?.logistic_service_uuid? "checked": ""}
                                            onChange={(e) => {
                                                setCheckoutData({...checkoutData, logistic_service_uuid:logisticService?.uuid, logistic_service_provider:logisticService?.provider})
                                            }}
                                        />
                                        <span className={clsx('單運送方式-文字',style['單運送方式-文字'])}>{optionName}</span>  
                                        {
                                            optionFee &&
                                            <span className={clsx('單運送方式-費用',style['單運送方式-費用'])}>{optionFee}</span>  

                                        }
                                        {
                                            optionAddress &&
                                            <span className={clsx('單運送方式-地址',style['單運送方式-地址'])}>{optionAddress}</span>  

                                        }
                                    </label>
                                );
                            })
                        }

                        {receiverInfoValidator.current.message("logistic_service_provider", checkoutData?.logistic_service_provider, "required", {className:'不合規提示'})}
                    </div>
                      

                    <div className={clsx('運送資料框',style['運送資料框'])}>
                        <div className={clsx('運送資料標題框',style['運送資料標題框'])}>
                            <h5 className={clsx('運送資料標題',style['運送資料標題'])}>
                                運送資料
                            </h5>
                        </div>


                        <div className={clsx(style['收件人姓名框'], '收件人姓名框')}>
                            <label className={clsx(style['收件人姓名-標籤'], '收件人姓名-標籤')}>收件人姓名：</label>
                            <input
                                className={clsx(style['收件人姓名-輸入'], '收件人姓名-輸入')}
                                type="text"
                                name="shipping_name"
                                placeholder="收件人姓名"
                                value={checkoutData?.shipping_name}
                                onChange={(e)=>{
                                    setCheckoutData({...checkoutData, shipping_name:e.target.value})
                                }}
                                onBlur={() => {
                                    receiverInfoValidator.current.showMessageFor("shipping_name")
                                    forceUpdate(new Date())
                                }}
                            />
                            {receiverInfoValidator.current.message("shipping_name", checkoutData?.shipping_name, "required", {className:'不合規提示'})}
                        </div>

                        {
                        // <div className={clsx(style['收件人名字框'], '收件人名字框')}>
                        //     <label className={clsx(style['收件人名字-標籤'], '收件人名字-標籤')}>收件人名字：</label>
                        //     <input
                        //         className={clsx(style['收件人名字-輸入'], '收件人名字-輸入')}
                        //         type="text"
                        //         name="shipping_first_name"
                        //         placeholder="收件人名字"
                        //         value={checkoutData?.shipping_first_name}
                        //         onChange={(e)=>{
                        //             setCheckoutData({...checkoutData, shipping_first_name:e.target.value})
                        //         }}
                        //         onBlur={() => {
                        //             receiverInfoValidator.current.showMessageFor("shipping_first_name")
                        //             forceUpdate(new Date())
                        //         }}
                        //     />
                        //     {receiverInfoValidator.current.message("shipping_first_name", checkoutData?.shipping_first_name, "required", {className:'不合規提示'})}
                        // </div>
                            
                        // <div className={clsx(style['收件人姓氏框'], '收件人姓氏框')}>
                        //     <label className={clsx(style['收件人姓氏-標籤'], '收件人姓氏-標籤')}>收件人姓氏：</label>
                        //     <input
                        //         className={clsx(style['收件人姓氏-輸入'], '收件人姓氏-輸入')}
                        //         type="text"
                        //         name="customer-last-name"
                        //         placeholder="收件人姓氏"
                        //         value={checkoutData?.shipping_last_name}
                        //         onChange={(e)=>{
                        //             setCheckoutData({...checkoutData, shipping_last_name:e.target.value})
                        //         }}
                        //         onBlur={() => {
                        //             receiverInfoValidator.current.showMessageFor("shipping_last_name")
                        //             forceUpdate(new Date())
                        //         }}
                        //     />
                        //     {receiverInfoValidator.current.message("shipping_last_name", checkoutData?.shipping_last_name, "required", {className:'不合規提示'})}
                        // </div>
                        }
                        <div className={clsx(style['收件人電話框'], '收件人電話框')}>
                            <label className={clsx(style['收件人電話-標籤'], '收件人電話-標籤')}>收件人電話：</label>
                            <input
                                className={clsx(style['收件人電話-輸入'], '收件人電話-輸入')}
                                type="tel"
                                value={checkoutData?.shipping_cellphone}
                                placeholder="收件人電話"
                                onChange={(e)=>{
                                    setCheckoutData({...checkoutData, shipping_cellphone:e.target.value})
                                }}
                                onBlur={() => {
                                    receiverInfoValidator.current.showMessageFor("shipping_cellphone")
                                    forceUpdate(new Date())
                                }}
                            />
                            {receiverInfoValidator.current.message("shipping_cellphone", checkoutData?.shipping_cellphone, "required", {className:'不合規提示'})}
                        </div>


                        <div className={clsx(style['收件人信箱：框'], '收件人信箱：框')}>
                            <label className={clsx(style['收件人信箱-標籤'], '收件人信箱-標籤')}>收件人信箱：</label>
                            <input
                                className={clsx(style['收件人信箱-輸入'], '收件人信箱-輸入')}
                                type="email"
                                name="shipping_email"
                                placeholder="收件人信箱"
                                value={checkoutData?.shipping_email}
                                onChange={(e)=>{
                                    setCheckoutData({...checkoutData, shipping_email:e.target.value})
                                }}
                                onBlur={() => {
                                    receiverInfoValidator.current.showMessageFor("shipping_email")
                                    forceUpdate(new Date())
                                }}
                            />
                            {receiverInfoValidator.current.message("shipping_email", checkoutData?.shipping_email, "required|email", {className:'不合規提示'})}
                        </div>
                        {
                            checkoutData?.logistic_service_provider=='customize_deliver' &&
                            <Fragment>
                                <div className={clsx(style['收件人地址框1'], '收件人地址框1')}>
                                    <label className={clsx(style['收件人地址1-標籤'], '收件人地址1-標籤')}>收件人地址1：</label>
                                    <input
                                        className={clsx(style['收件人地址1-輸入'], '收件人地址1-輸入')}
                                        type="text"
                                        name="shipping_address_1"
                                        placeholder="收件人地址1"
                                        value={checkoutData?.shipping_address_1}
                                        onChange={(e)=>{
                                            setCheckoutData({...checkoutData, shipping_address_1:e.target.value})
                                        }}
                                        onBlur={() => {
                                            addressInfoValidator.current.showMessageFor("shipping_address_1")
                                            forceUpdate(new Date());
                                        }}
                                    />
                                    {addressInfoValidator.current.message("shipping_address_1", checkoutData?.shipping_address_1, "required", {className:'不合規提示'})}
                                </div>
                                
                                <div className={clsx(style['收件人地址框2'], '收件人地址框2')}>
                                    <label className={clsx(style['收件人地址2-標籤'], '收件人地址2-標籤')}>收件人地址2：</label>
                                    <input
                                        className={clsx(style['收件人地址2-輸入'], '收件人地址2-輸入')}
                                        type="text"
                                        name="shipping_address_2"
                                        placeholder="收件人地址2"
                                        value={checkoutData?.shipping_address_2}
                                        onChange={(e)=>{
                                            setCheckoutData({...checkoutData, shipping_address_2:e.target.value})
                                        }}
                                    />
                                </div>


                                <div className={clsx(style['出貨時間框'], '出貨時間框')}>
                                    <label className={clsx(style['出貨時間-標籤'], '出貨時間-標籤')}>出貨時間：</label>
                                    
                                    <div className={clsx(style['出貨時間選項框'], '出貨時間選項框')}>

                                        <label className={clsx('單出貨時間選項',style['單出貨時間選項'], checkoutData?.shipping_principle==='anytime'?`${style['選取']} 選取`:'')} >
                                            <input
                                                className={clsx('出貨時間-勾選',style['出貨時間-勾選'])}
                                                type="radio"
                                                value={'anytime'}
                                                checked={ checkoutData?.shipping_principle=='anytime'? "checked": ""}
                                                onChange={(e) => {
                                                    setCheckoutData({...checkoutData, shipping_principle:'anytime'})
                                                }}
                                            />
                                            <span className={clsx('出貨時間-文字',style['出貨時間-文字'])}>隨時可出貨</span>  
                                        </label>
                                        <label className={clsx('單出貨時間選項',style['單出貨時間選項'], checkoutData?.shipping_principle==='notify_before_shipping'?`${style['選取']} 選取`:'')} >
                                            <input
                                                className={clsx('出貨時間-勾選',style['單出貨時間-勾選'])}
                                                type="radio"
                                                value={'notify_before_shipping'}
                                                checked={ checkoutData?.shipping_principle=='notify_before_shipping'? "checked": ""}
                                                onChange={(e) => {
                                                    setCheckoutData({...checkoutData, shipping_principle:'notify_before_shipping'})
                                                }}
                                            />
                                            <span className={clsx('出貨時間-文字',style['出貨時間-文字'])}>出貨前電話通知我</span>  
                                        </label>
                                        <label className={clsx('單出貨時間選項',style['單出貨時間選項'], checkoutData?.shipping_principle==='wait_for_notification'?`${style['選取']} 選取`:'')} >
                                            <input
                                                className={clsx('出貨時間-勾選',style['出貨時間-勾選'])}
                                                type="radio"
                                                value={'wait_for_notification'}
                                                checked={ checkoutData?.shipping_principle=='wait_for_notification'? "checked": ""}
                                                onChange={(e) => {
                                                    setCheckoutData({...checkoutData, shipping_principle:'wait_for_notification'})
                                                }}
                                            />
                                            <span className={clsx('出貨時間-文字',style['出貨時間-文字'])}>等候我通知日期再出貨</span>  
                                        </label>
                                    </div>
                                </div>


                            </Fragment>
                        }
                        <div className={clsx(style['備註框'], '備註框')}>
                            <label className={clsx(style['備註-標籤'], '備註-標籤')}>備註：</label>
                            <input
                                className={clsx(style['備註-輸入'], '備註-輸入')}
                                type="text"
                                name="customer_remark"
                                placeholder="備註"
                                value={checkoutData?.customer_remark}
                                onChange={(e)=>{
                                    setCheckoutData({...checkoutData, customer_remark:e.target.value})
                                }}
                            />
                        </div>
                    </div>
                    
                    


                    {
                        // (invoiceServices||[]).length>1 &&
                        // <div className={clsx('發票選項框',style['發票選項框'])}>
                        //     <div className={clsx('發票選項標題框',style['發票選項標題框'])}>
                        //         <h5 className={clsx('發票選項標題',style['發票選項標題'])}>
                        //             發票選項
                        //         </h5>
                        //     </div>
                        //     {
                        //         (invoiceServices||[]).map((invoiceService, key)=>{

                        //             return (
                        //                 <label key={key} className={clsx('單發票開立方式',style['單發票開立方式'], invoiceService?.uuid === checkoutData?.invoice_service_uuid?`${style['選取']} 選取`:'')} >
                        //                     <input
                        //                         className={clsx('單發票開立方式-勾選',style['單發票開立方式-勾選'])}
                        //                         type="radio"
                        //                         value={invoiceService.uuid}
                        //                         checked={invoiceService?.uuid === checkoutData?.invoice_service_uuid? "checked": ""}
                        //                         onChange={(e) => {
                        //                             setCheckoutData({...checkoutData, invoice_service_uuid:invoiceService?.uuid, invoice_service_provider:invoiceService?.provider})
                        //                         }}
                        //                     />
                        //                     <span className={clsx('單發票開立方式-文字',style['單發票開立方式-文字'])}>{invoiceService?.provider}</span>  
                        //                 </label>
                        //             );
                        //         })
                        //     }

                        //     {receiverInfoValidator.current.message("invoice_service_provider", checkoutData?.invoice_service_provider, "required", {className:'不合規提示'})}
                        // </div>
                    }





                    <div className={clsx('發票開立資訊框',style['發票開立資訊框'])}>
                        <div className={clsx('發票開立資訊標題框',style['發票開立資訊標題框'])}>
                            <h5 className={clsx('發票開立資訊標題',style['發票開立資訊標題'])}>
                                發票開立資訊
                            </h5>
                        </div>

                        <div className={clsx(style['發票類型框'], '發票類型框')}>
                            <label className={clsx('發票類型',style['發票類型'], !checkoutData?.enable_full_invoice?`${style['選取']} 選取`:'')} >
                                <input
                                    className={clsx('發票類型-勾選',style['發票類型-勾選'])}
                                    type="radio"
                                    value={''}
                                    checked={ !checkoutData?.enable_full_invoice? "checked": ""}
                                    onChange={(e) => {
                                        setCheckoutData({...checkoutData, enable_full_invoice:false})
                                    }}
                                />
                                <span className={clsx('發票類型-文字',style['發票類型-文字'])}>二聯式</span>  
                            </label>
                            <label className={clsx('發票類型',style['發票類型'], checkoutData?.enable_full_invoice?`${style['選取']} 選取`:'')} >
                                <input
                                    className={clsx('發票類型-勾選',style['發票類型-勾選'])}
                                    type="radio"
                                    value={''}
                                    checked={checkoutData?.enable_full_invoice? "checked": ""}
                                    onChange={(e) => {
                                        setCheckoutData({...checkoutData, enable_full_invoice:true})
                                    }}
                                />
                                <span className={clsx('發票類型-文字',style['發票類型-文字'])}>三聯式</span>  
                            </label>
                        </div>

                        {
                            checkoutData?.enable_full_invoice &&
                            <Fragment>
                                <div className={clsx(style['統一編號框'], '統一編號框')}>
                                    <label className={clsx(style['統一編號-標籤'], '統一編號-標籤')}>統一編號：</label>
                                    <input
                                        className={clsx(style['統一編號-輸入'], '統一編號-輸入')}
                                        type="text"
                                        name="business_registration_number"
                                        placeholder="統一編號"
                                        value={checkoutData?.business_registration_number}
                                        onChange={(e)=>{
                                            setCheckoutData({...checkoutData, business_registration_number:e.target.value})
                                        }}
                                        onBlur={() => {
                                            invoiceInfoValidator.current.showMessageFor("business_registration_number")
                                            forceUpdate(new Date());
                                        }}
                                    />
                                    {invoiceInfoValidator.current.message("business_registration_number", checkoutData?.business_registration_number, "required", {className:'不合規提示'})}
                                </div>
                                <div className={clsx(style['公司抬頭框'], '公司抬頭框')}>
                                    <label className={clsx(style['公司抬頭-標籤'], '公司抬頭-標籤')}>公司抬頭：</label>
                                    <input
                                        className={clsx(style['公司抬頭-輸入'], '公司抬頭-輸入')}
                                        type="text"
                                        name="company_name"
                                        placeholder="公司抬頭"
                                        value={checkoutData?.company_name}
                                        onChange={(e)=>{
                                            setCheckoutData({...checkoutData, company_name:e.target.value})
                                        }}
                                    />
                                </div>
                            </Fragment>
                        }
                    </div>


                    <div className={clsx('結帳表單-總計框',style['結帳表單-總計框'])}>
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
                        
                        <div className={clsx('小計框',style['小計框'])}>
                            <h5 className={clsx('小計-文字',style['小計-文字'])}>
                                小計:
                            </h5>
                            <span className={clsx('小計',style['小計'])}>
                                {`${estore?.e_commerce_settings?.base_currency_sign||'$'}${getToFixedNumber(subtotal, baseCurrency)}`}
                            </span>
                        </div>
                        
                        <div className={clsx('稅金框',style['稅金框'])}>
                            <h5 className={clsx('稅金-文字',style['稅金-文字'])}>
                                稅金:
                            </h5>
                            <span className={clsx('稅金',style['稅金'])}>
                                {`${estore?.e_commerce_settings?.base_currency_sign||'$'}${getToFixedNumber(tax, baseCurrency)}`}
                            </span>
                        </div>

                        {
                            freeShipping?
                            <div className={clsx('免運費框',style['免運費框'])}>
                                <h5 className={clsx('免運費-文字',style['免運費-文字'])}>
                                    免運費
                                </h5>
                            </div>
                            :
                            <div className={clsx('運費框',style['運費框'])}>
                                <h5 className={clsx('運費框-文字',style['運費框-文字'])}>
                                    運費:
                                </h5>
                                <span className={clsx('運費',style['運費'])}>
                                    {`${estore?.e_commerce_settings?.base_currency_sign||'$'}${getToFixedNumber(shippingFee, baseCurrency)}`}
                                </span>
                            </div>
                        }

                        <div className={clsx('使用紅利框',style['使用紅利框'])}>
                            <h5 className={clsx('使用紅利-文字',style['使用紅利-文字'])}>
                                使用紅利:
                            </h5>
                            <input
                                    className={clsx(style['使用紅利-輸入'], '使用紅利-輸入', applyPointsValid?'':`${style['使用紅利不合規']} 使用紅利不合規`)}
                                    type="number"
                                    min={0}
                                    max={customer?.points||0}
                                    name="apply_points"
                                    placeholder="使用紅利"
                                    value={checkoutData?.apply_points}
                                    onChange={(e)=>{
                                        setCheckoutData({...checkoutData, apply_points:e.target.value})
                                    }}
                                />

                            {
                                !applyPointsValid&&
                                <div className={clsx('使用紅利不合規-文字框',style['使用紅利不合規-文字框'])}>
                                    <span className={clsx('使用紅利不合規-文字',style['使用紅利不合規-文字'])}>
                                        {`使用紅利不合規`}
                                    </span>
                                </div>
                            }

                            <div className={clsx('可用紅利-文字框',style['可用紅利-文字框'])}> 
                                <span className={clsx('可用紅利-文字',style['可用紅利-文字'])}>
                                    {`(可用紅利點數:${(customer?.points||0).toLocaleString()})`}
                                </span>
                            </div>
                        </div>
                        



                        <div className={clsx('紅利折抵框',style['紅利折抵框'])}>
                            <h5 className={clsx('紅利折抵-文字',style['紅利折抵-文字'])}>
                                紅利折抵:
                            </h5>
                            <span className={clsx('紅利折抵',style['紅利折抵'])}>
                            {`${estore?.e_commerce_settings?.base_currency_sign||'$'}${getToFixedNumber(applyPointsDiscount, baseCurrency) }`}
                            </span>
                        </div>




                        <div className={clsx('總金額框',style['總金額框'])}>
                            <h5 className={clsx('總金額-文字',style['總金額-文字'])}>
                                總金額:
                            </h5>
                            <span className={clsx('總金額',style['總金額'])}>
                                {`${estore?.e_commerce_settings?.base_currency_sign||'$'}${getToFixedNumber(total, baseCurrency)}`}
                            </span>
                        </div>

                        <div className={clsx('下單按鈕框',style['下單按鈕框'])}>
                            <button className={clsx('下單按鈕',style['下單按鈕'],awaitSubmitButton?`${style['等待']} 等待`:'')} disabled={awaitSubmitButton} onClick={checkout}>
                                下單
                            </button>
                        </div>
                    </div>


                </Fragment>
            }


            <GuestCheckoutNotification 
                show={showProceedAsGuestNotification}
                setShow={setShowProceedAsGuestNotification}
                allowGuestCheckout={estore?.e_commerce_settings?.allow_guest_checkout}
                country={country} 
                email={checkoutData?.shipping_email} 
                cellphone={checkoutData?.shipping_cellphone} 
                routingTable={routingTable} 
                nextAction={nextAction}/>
        </div>)
};

CheckoutForm.propTypes = {
};

export default CheckoutForm;




