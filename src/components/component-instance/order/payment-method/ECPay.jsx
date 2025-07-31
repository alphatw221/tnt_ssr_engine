import PropTypes from "prop-types";
import clsx from "clsx";
import { useState, useEffect, Fragment, useRef, createRef } from "react";
// import Button from 'react-bootstrap/Button';


import { useRouter, useSearchParams } from "next/navigation";


import {customer_get_ecpay_trade_token, customer_create_ecpay_payment} from "../../../../api/ecpay_payment"
import style from './ECPay.module.scss'
import { useAppDispatch } from "@/redux/hooks";
import {removeCache} from "@/redux/slices/order-slice"



const ECPay = ({orderUUID, paymentServiceUUID, routingTable, ecpayMerchantID, productionMode}) => {

    // ecpay_merchant_id = models.CharField(max_length=255, null=True, blank=True)
    // ecpay_hash_key = models.CharField(max_length=255, null=True, blank=True)
    // ecpay_hash_iv = models.CharField(max_length=255, null=True, blank=True)

    const [wait, setWait] = useState(false)

    const [ecpayReady, setEcpayReady] = useState(false)

    const [merchantTradeNo, setMerchantTradeNo] = useState('')

    const router = useRouter()
    const searchParams = useSearchParams()
    const dispatch = useAppDispatch()

    useEffect(() => {

        customer_get_ecpay_trade_token(orderUUID, paymentServiceUUID).then(res=>{
            setMerchantTradeNo(res.data?.merchant_trade_no)
            const tradeToken = res.data?.trade_token

            console.log(res.data)
            var script = document.createElement( "script" )
            script.id = 'ecpay_jquery'
            script.type = "text/javascript";
            script.src = 'https://code.jquery.com/jquery-3.5.1.min.js';
            script.onload = ()=>{
                var script = document.createElement( "script" )
                script.id = 'ecpay_sdk'
                script.type = "text/javascript";
                script.src = productionMode?'https://ecpg.ecpay.com.tw/Scripts/sdk-1.0.0.js?t=20210121100116':'https://ecpg-stage.ecpay.com.tw/Scripts/sdk-1.0.0.js?t=20210121100116';

                script.onload = ()=>{
                    console.log('sdk loaded')

                    const ServerType = productionMode?'Prod':'Stage'
                    try {
                        window?.ECPay.initialize(ServerType, 1, (errMsg)=>{
                            console.log(errMsg)
    
                            window?.ECPay?.createPayment(tradeToken, window?.ECPay.Language.zhTW, (errMsg)=>{
                                console.log(errMsg)
                                setEcpayReady(true)
                            }, 'V2')
    
                        })
                    } catch (error) {
                        console.log(error)
                    }
                    

                }
                document.getElementsByTagName( "head" )[0].appendChild( script );
            }
            document.getElementsByTagName( "head" )[0].appendChild( script );

        })
        
        window.getApplePayResultData = (resultData, errMsg)=>{

            console.log('apple pay data')
            console.log(errMsg)
            console.log(resultData)
        }
        
        return () => {
            if(document.getElementById('ecpay_jquery'))document.getElementById('ecpay_jquery')?.remove()
            if(document.getElementById('ecpay_sdk'))document.getElementById('ecpay_sdk')?.remove()
            window.getApplePayResultData = null
        };
    }, []);


    return (


        <Fragment >
            <div id="ECPayPayment" className={clsx(style['綠界付款元素'], '綠界付款元素')}></div>
            {

            ecpayReady &&
            <div className={clsx(style['送出按鈕框'], '送出按鈕框')}>
                <button className={clsx(style['送出按鈕'], '送出按鈕')} 
                    disabled={wait}
                    onClick={()=>{
                    
                        setWait(true);

                    window?.ECPay.getPayToken((paymentInfo, errMsg)=>{

                        if (errMsg != null) {
                            console.log(errMsg)
                            setWait(false);
                            return;
                        };


                        var _order_uuid, _payment_service_uuid, _pay_token, _merchant_trade_no
                        customer_create_ecpay_payment(_order_uuid=orderUUID, _payment_service_uuid=paymentServiceUUID, _pay_token=paymentInfo?.PayToken, _merchant_trade_no=merchantTradeNo).then(res=>{
                            console.log(res.data)

                            if(res?.data?.three_d_url){
                                window.location.href = res?.data?.three_d_url
                            }else{
                                dispatch(removeCache())
                                router.push(`/${routingTable?.['order_route']}/${orderUUID}?guest_uuid=${searchParams.get('guest_uuid')}`)
                            }


                        }).catch(err=>{setWait(false)})

                    });
                }}>送出</button>
            </div>
            }
        </Fragment>
    )
}



ECPay.propTypes = {

};

export default ECPay;
