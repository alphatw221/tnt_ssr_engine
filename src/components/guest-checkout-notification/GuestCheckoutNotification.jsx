import { Fragment, useEffect, useState, useRef } from "react";


import clsx from "clsx";
// import { Modal } from "react-bootstrap";


import Cookies from "js-cookie";
import PropTypes from "prop-types";
import { 
    guest_request_cellphone_verification, 
    guest_request_email_verification,
    guest_verify_otp_code,
 } from "@/api/customer";

import style from './GuestCheckoutNotification.module.scss'

// import cogoToast from 'cogo-toast';



import {useClickOutsideEvent} from '@/lib/utils/clickOutside.js'

const GuestCheckoutNotification = ({
    show, setShow, country, cellphone, email, nextAction, routingTable, allowGuestCheckout
}) => {

    
    const [countDown, setCountDown] = useState(0)
    const [otpCode, setOtpCode] = useState('')
    const [awaitSubmitButton, setAwaitSubmitButton] = useState(false)
    
    const [showVerificationBlock, setShowVerificationBlock] = useState(false)
    const [errorMessage, setErrorMessage ] = useState('')
    const [generalMessage, setGeneralMessage ] = useState('')
    const errorMessageDiv = useRef()
    const generalMessageDiv = useRef()
    const ref = useRef()

    const showErrorToast = (message)=>{
        setErrorMessage(message)
        errorMessageDiv?.current?.classList?.remove(style['隱藏'])
        errorMessageDiv?.current?.classList?.remove(`隱藏`)
        setTimeout(()=>{
            errorMessageDiv?.current?.classList?.add(style['隱藏'])
            errorMessageDiv?.current?.classList?.add(`隱藏`)
        },3)
    }
    const showGeneralToast = (message)=>{
        setGeneralMessage(message)
        generalMessageDiv?.current?.classList?.remove(style['隱藏'])
        generalMessageDiv?.current?.classList?.remove(`隱藏`)
        setTimeout(()=>{
            generalMessageDiv?.current?.classList?.add(style['隱藏'])
            generalMessageDiv?.current?.classList?.add(`隱藏`)
        },3)
    }

    const sendSMS = ()=>{
        setCountDown(60)
        guest_request_cellphone_verification({country, cellphone}).then(res=>{
            showGeneralToast('驗證簡訊已發送')
        })

    }

    const sendEmail = ()=>{
        setCountDown(60)
        guest_request_email_verification({country, email}).then(res=>{
            showGeneralToast('驗證信件已發送')
        })
    }
    const verifyOTPCode = ()=>{

        setAwaitSubmitButton(true)
        guest_verify_otp_code({email, cellphone, 'otp_code':otpCode}).then(res=>{
            var inSevenDays = new Date(new Date().getTime() + 7 * 24 * 60 * 60 *1000)
            Cookies.set('guest_access_token', res?.data?.guest_access_token, {expires: inSevenDays})
            setAwaitSubmitButton(false)
            nextAction()
        }).catch(err=>{
            setAwaitSubmitButton(false)
            setErrorMessage('驗證失敗')
        })
    }

    useEffect(() => {
        show && countDown > 0 && setTimeout(() => setCountDown(countDown - 1), 1000);
    }, [show, countDown]);
    
    
    useClickOutsideEvent(useEffect, ref,()=>{setShow(false)}, show)


    const maskCellphone = (cellphone)=>{
        const len = (cellphone||'')?.length
        if(len>7){
            return (cellphone||'')?.slice(0,4) + '*'.repeat(len-7)+ (cellphone||'')?.slice(-3)
        }else{
            return cellphone
        }
    }

    const proceedAsGuest = ()=>{
        if(Cookies.get('guest_access_token')){
            nextAction()
        }else{
            setShowVerificationBlock(true)
        }
    }

    return (
        <div ref={ref} className={clsx(style['訪客結帳彈窗'], '訪客結帳彈窗', show?`${style['顯示']} 顯示`:'')}>
              
            <div className={clsx(style['身份選擇框'], '身份選擇框')}>
 
                <div className={clsx(style['身份選擇訊息框'], '身份選擇訊息框')}>
                    <p className={clsx(style['身份選擇訊息'], '身份選擇訊息')}>身份選擇訊息</p>
                </div>

                <div className={clsx(style['登入註冊框'], '登入註冊框')}>
                    <a className={clsx(style['登入連結'], '登入連結')} href={`/${routingTable?.['customer_login_route']}`} >登入</a>
                    <a className={clsx(style['註冊連結'], '註冊連結')} href={`/${routingTable?.['customer_register_route']}`} >註冊</a>
                </div>

                {
                    allowGuestCheckout&&
                    <div className={clsx(style['以訪客身份繼續按鈕框'], '以訪客身份繼續按鈕框', showVerificationBlock?`${style['可隱藏']} 可隱藏`:'')}>
                        <button className={clsx(style['以訪客身份繼續按鈕'], '以訪客身份繼續按鈕')} onClick={()=>{proceedAsGuest()}} >以訪客身份繼續</button>
                    </div>
                }
                
                {
                    !allowGuestCheckout &&
                    <div className={clsx(style['取消按鈕框'], '取消按鈕框', showVerificationBlock?`${style['可隱藏']} 可隱藏`:'')}>
                        <button className={clsx(style['取消按鈕'], '取消按鈕')} onClick={()=>{setShow(false)}} >取消</button>
                    </div>
                }
                


            </div>
            {
                allowGuestCheckout&&
                <div className={clsx(style['驗證框'], '驗證框', showVerificationBlock?`${style['顯示']} 顯示`:'')}>
                                
                    <div className={clsx(style['驗證訊息框'], '驗證訊息框')}>
                        <p className={clsx(style['驗證訊息'], '驗證訊息')}>驗證訊息</p>
                    </div>
                    
                    <div className={clsx(style['手機驗證框'], "手機驗證框")}>
                        <label className={clsx(style['手機-標籤'], "手機-標籤")}>手機號碼:</label> 
                        <span className={clsx(style['手機'], "手機")}>{`${maskCellphone(cellphone)}`}</span>

                        <button className={clsx(style['手機-發送按鈕'], "手機-發送按鈕")} onClick={()=>{sendSMS()}} disabled={countDown>0}>  
                            {countDown>0?`${countDown}秒後可重新發送`:'取得簡訊驗證碼'}
                        </button>
                    </div>

                    <div className={clsx(style['電子郵件驗證框'], "電子郵件驗證框")}>
                        <label className={clsx(style['電子郵件-標籤'], "電子郵件-標籤")}>Email:</label> 
                        <span className={clsx(style['電子郵件'], "電子郵件")}>{email}</span>
                        <button className={clsx(style['電子郵件-發送按鈕'], "電子郵件-發送按鈕")} onClick={()=>{sendEmail()}} disabled={countDown>0}>  
                            {countDown>0?`${countDown}秒後可重新發送`:'取得郵件驗證碼'}
                        </button>
                    </div>

                    <div className={clsx(style['驗證碼輸入框'], "驗證碼輸入框")}>
                        <label className={clsx(style['驗證碼-標籤'], "驗證碼-標籤")}>驗證碼:</label>  
                        <input className={clsx(style['驗證碼-輸入'], "驗證碼-輸入")} type="text" placeholder="驗證碼" value={otpCode} onChange={(e)=>{setOtpCode(e.target.value)}}/>
                    </div>

                    <div className={clsx(style['按鈕框'], "按鈕框")}>
                        <div className={clsx(style['送出按鈕框'], "送出按鈕框")}>
                            <button  desabled={awaitSubmitButton} className={clsx(style['送出按鈕'], "送出按鈕", awaitSubmitButton?`${style['等待']} 等待`:'')} disabled={awaitSubmitButton} onClick={()=>{verifyOTPCode()}} >確認</button>
                        </div>
                        <div className={clsx(style['取消按鈕框'], '取消按鈕框')}>
                            <button className={clsx(style['取消按鈕'], '取消按鈕')} onClick={()=>{setShow(false)}} >取消</button>
                        </div>
                    </div>
                   
                </div>
            }
            
                
            <div ref={generalMessageDiv} className={clsx(style['通用訊息框'], "通用訊息框", `${style['隱藏']} 隱藏`)}>
                <p className={clsx(style['通用訊息'], "通用訊息")}>{generalMessage}</p>
            </div>
            <div ref={errorMessageDiv} className={clsx(style['錯誤訊息框'], "錯誤訊息框", `${style['隱藏']} 隱藏`)}>
                <p className={clsx(style['錯誤訊息'], "錯誤訊息")}>{errorMessage}</p>
            </div>
                
  
        </div>
    );
  };
  
  GuestCheckoutNotification.propTypes = {
};


  export default GuestCheckoutNotification;
  