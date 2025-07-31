
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, lazy } from "react";
import clsx from "clsx";
import style from './OrderPayment.module.scss'


// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHouse, faGear, faBars } from '@fortawesome/free-solid-svg-icons'

// import { useSelector, useDispatch } from "react-redux"; 
import { useAppSelector } from "@/redux/hooks";           
// import { setSideMenuActive, setComponentMenuActive} from '../../store/slices/website-editor-slice'


// import { useParams, useLocation } from "react-router-dom";
// import { useParams, useRouter, useSearchParams } from "next/navigation";

import { customer_get_store_payment_services } from "@/api/estore"
import { customer_retrieve_order } from "@/api/order";
import {getClientIPCountryCode} from '@/fetch/ipapi'
import Cookies from "js-cookie";

import OrderItemsSummary from "./OrderItemsSummary";

const ECPay = lazy(()=>import("./payment-method/ECPay"))
const BankTransfer = lazy(()=>import("./payment-method/BankTransfer"))
const CashOnDelivery = lazy(()=>import("./payment-method/CashOnDelivery"))

const OrderPayment = ({  
    // node,  mode, actions, update, routingTable, ...props,
    routingTable,

    element, 
    elementProps,
    mode,
    ...props


}) => {




    
    // const { order } = useAppSelector((state) => state.order);
    const [order, setOrder] = useState(null)
    const [selectPaymentServiceIndex, setSelectPaymentServiceIndex] = useState(null)


    const object_id = '' // TODO
    const searchParams = new URLSearchParams(window.location.search);

    const [paymentServices, setPaymentServices] = useState([])
    const [country, setCountry] = useState(null)


    useEffect(()=>{   
            getClientIPCountryCode().then(_country=>{
                setCountry(_country)
            })
    }, [])

    useEffect(()=>{   
        if(country){
            customer_get_store_payment_services({
                country,
                'order_by':'priority'
            }).then(res=>{
                console.log(res.data)
                setPaymentServices(res?.data)
            })
        }
    }, [country])
    

    useEffect(()=>{
        if(![undefined, null, ''].includes(Cookies.get('customer_access_token')) ||
                ![undefined, null, ''].includes(Cookies.get('guest_access_token')) ||
                ![undefined, null, ''].includes(searchParams.get('guest_uuid'))
        ){
            if(order==null && object_id){
                customer_retrieve_order({'order_uuid':object_id, 'guest_uuid':searchParams.get('guest_uuid')}).then(res=>{
                    console.log(res.data)
                    setOrder(res.data)
                })
                }
        }else{
            const redirect = encodeURIComponent(location.pathname + location.search + location.hash)
            window.location.href = `/${routingTable?.['customer_login_route']}?redirect=${redirect}`
        }
    },[object_id])

    useEffect(()=>{
        if( !['', null, undefined].includes(order?.status) && order?.status!='awaiting_payment'){
            window.location.href = `/${routingTable?.['order_route']}/${order?.uuid}?guest_uuid=${searchParams.get('guest_uuid')}`
        }
    },[order])

    const paymentServiceProviders={
        'ecpay':'綠界科技',
        'bank_transfer':'銀行轉帳',
        'cash_on_delivery':'貨到付款'
    }



    const hasIntersection = (arr1, arr2) =>{
        const set1 = new Set(arr1);
        return arr2.some(item => set1.has(item));
    }

    
    return (
        
        <div 
            {...elementProps}
           >

            <div className={clsx(style['標題框'], '標題框')}>
                    <h3 className={clsx(style['標題'], '標題')}>訂單付款</h3>
            </div>

            <div className={clsx(style['訂單編號框'], '訂單編號框')}>
                    <label className={clsx(style['訂單編號-標籤'], '訂單編號-標籤')} >訂單編號 </label>
                    <span className={clsx(style['訂單編號'], '訂單編號')}>{`#${order?.id||''}`}</span>
            </div>


            <OrderItemsSummary order={order} routingTable={routingTable}/>

            <div className={clsx(style['付款方式框'], '付款方式框')}>
                <div className={clsx(style['付款方式標題框'], '付款方式標題框')}>
                    <h3 className={clsx(style['付款方式標題'], '付款方式標題')}>付款方式</h3>
                </div>


                {
                    (paymentServices||[]).length<=0 &&
                    <div className={clsx('無可用付款方式框',style['無可用付款方式框'])}>
                        <h5 className={clsx('無可用付款方式-文字',style['無可用付款方式-文字'])}>無可用付款方式</h5>
                    </div>
                }
                {
                    (paymentServices||[]).length>0 && order?.uuid &&
                    (paymentServices||[]).map((paymentService, key)=>{

                        if(paymentService?.provider=='cash_on_delivery'){
                            if(hasIntersection(paymentService?.cash_on_delivery_unsupport_logistic_service_tags||[], order?.logistic_service_tags||[]))return null
                            if(
                                (paymentService?.cash_on_delivery_support_logistic_service_tags||[]).length>0 &&
                                !hasIntersection(paymentService?.cash_on_delivery_support_logistic_service_tags||[], order?.logistic_service_tags||[])
                            )return null
                        }
                        



                        return (
                            <div key={key} className={clsx('單付款方式',style['單付款方式'], selectPaymentServiceIndex==key?`${style['選取']} 選取`:'')} onClick={()=>{setSelectPaymentServiceIndex(key)}}>
                                <div className={clsx('單付款方式標題框',style['單付款方式標題框'])}>
                                    <h3 className={clsx('單付款方式標題',style['單付款方式標題'])}>{paymentService?.option_name||paymentServiceProviders?.[paymentService?.provider]}</h3>
                                </div>
                               {
                                paymentService?.provider=='bank_transfer'&& 
                                // selectPaymentServiceIndex==key &&
                                <BankTransfer 
                                    orderUUID={order?.uuid} 
                                    paymentServiceUUID={paymentService?.uuid} 
                                    bankName={paymentService?.bank_name} 
                                    bankAccount={paymentService?.bank_account} 
                                    bankDescription={paymentService?.bank_description} 
                                    images={paymentService?.images} 
                                    routingTable={routingTable}/>
                               }

                               {
                                paymentService?.provider=='ecpay'&& 
                                // selectPaymentServiceIndex==key &&
                                <ECPay 
                                    orderUUID={order?.uuid} 
                                    paymentServiceUUID={paymentService?.uuid} 
                                    ecpayMerchantID={paymentService?.ecpay_merchant_id} 
                                    productionMode = {paymentService?.ecpay_production_mode}
                                    routingTable={routingTable}/>
                               }

                                {
                                paymentService?.provider=='cash_on_delivery'&& 
                                // selectPaymentServiceIndex==key &&
                                <CashOnDelivery 
                                    order={order}
                                    paymentService={paymentService} 
                                    routingTable={routingTable}/>
                               }
                            </div>
                        );
                    })
                }



            </div>


        </div>)
};

OrderPayment.propTypes = {

};

export default OrderPayment;




