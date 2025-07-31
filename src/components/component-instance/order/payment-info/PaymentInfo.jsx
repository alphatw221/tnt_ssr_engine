
import clsx from "clsx";

import { useState, useEffect, Fragment, useRef, createRef } from "react";

import style from "./PaymentInfo.module.scss"




const PaymentInfo = ({order}) => {

    if(order?.payment_service_provider=='ecpay'){
        if(order?.payment_service_ecpay_payment_type=='ATM'){

            return (<Fragment>
                <div className={clsx(style['付款渠道框'], '付款渠道框')}>
                    <label className={clsx(style['付款渠道-標籤'], '付款渠道-標籤')}>付款渠道:</label>
                    <span className={clsx(style['付款渠道'], "付款渠道")}>ATM轉帳</span>
                </div>

                <div className={clsx(style['銀行代碼框'], '銀行代碼框')}>
                    <label className={clsx(style['銀行代碼-標籤'], '銀行代碼-標籤')}>銀行代碼:</label>
                    <span className={clsx(style['銀行代碼'], "銀行代碼")}>{order?.payment_service_ecpay_data?.['BankCode']||''}</span>
                </div>

                <div className={clsx(style['銀行帳戶框'], '銀行帳戶框')}>
                    <label className={clsx(style['銀行帳戶-標籤'], '銀行帳戶-標籤')}>銀行帳戶:</label>
                    <span className={clsx(style['銀行帳戶'], "銀行帳戶")}>{order?.payment_service_ecpay_data?.['vAccount']||''}</span>
                </div>

                <div className={clsx(style['付款期限框'], '付款期限框')}>
                    <label className={clsx(style['付款期限-標籤'], '付款期限-標籤')}>付款期限:</label>
                    <span className={clsx(style['付款期限'], "付款期限")}>{order?.payment_service_ecpay_data?.['ExpireDate']||''}</span>
                </div>
            </Fragment>)
        }
    }
    
}



    
    



PaymentInfo.propTypes = {};

export default PaymentInfo;
