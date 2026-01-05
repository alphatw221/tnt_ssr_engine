import PropTypes from "prop-types";
import clsx from "clsx";
import { useState, useEffect, Fragment, useRef, createRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useAppDispatch } from '../../../../redux/hooks'
import style from "./CashOnDelivery.module.scss"

import { createValidator } from "@/lib/validator"



import {customer_select_cash_on_delivery} from '@/api/order.js'
import { useAppDispatch } from "@/redux/hooks";
import {removeCache} from "@/redux/slices/order-slice"



const CashOnDelivery = ({ order, paymentService, routingTable}) => {

    


    const searchParams = new URLSearchParams(window.location.search);


    const dispatch = useAppDispatch()

    // const hasIntersection = (arr1, arr2) =>{
    //     const set1 = new Set(arr1);
    //     return arr2.some(item => set1.has(item));
    // }

    // if(hasIntersection(paymentService?.cash_on_delivery_unsupport_logistic_service_tags||[], order?.logistic_service_tags||[]))return null
    // if(
    //     (paymentService?.cash_on_delivery_support_logistic_service_tags||[]).length>0 &&
    //     !hasIntersection(paymentService?.cash_on_delivery_support_logistic_service_tags||[], order?.logistic_service_tags||[])
    // )return null
    const [awaitSubmitButton, setAwaitSubmitButton] = useState(false)
    
    return (

        <div className={clsx(style['貨到付款資訊框'], '貨到付款資訊框')}>
            
            <div className={clsx(style['選項名稱框'], '選項名稱框')}>
                <span className={clsx(style['選項名稱'], '選項名稱')}>{paymentService?.cash_on_delivery_option_name||''}</span>
            </div>
            

            <div className={clsx(style['選擇按鈕框'], '選擇按鈕框')}>
                <button className={clsx(style['選擇按鈕'], '選擇按鈕', awaitSubmitButton?`${style['等待']} 等待`:'')} disabled={awaitSubmitButton} onClick={()=>{
                    setAwaitSubmitButton(true)
                    customer_select_cash_on_delivery({'order_uuid':order?.uuid, 'payment_service_uuid':paymentService?.uuid, 'guest_uuid':searchParams.get('guest_uuid')}).then(res=>{
                        // setAwaitSubmitButton(false)
                        // dispatch(removeCache())
                        window.location.href = `/${routingTable?.['order_route']}/${order?.uuid}?guest_uuid=${searchParams.get('guest_uuid')}`

                        // console.log(`/${routingTable?.['order_route']}/${order?.uuid}`)
                        dispatch(removeCache())
                    }).catch(err=>{
                        setAwaitSubmitButton(false)
                    })
                }}>選擇</button>
            </div>


        </div>
            
    )
}



CashOnDelivery.propTypes = {
    // bankOptions:PropTypes.array,
};

export default CashOnDelivery;
