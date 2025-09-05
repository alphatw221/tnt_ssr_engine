import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useRef } from "react";
import clsx from "clsx";
import style from './RegisterForm.module.scss'
          
import { useAppSelector, useAppDispatch } from "@/redux/hooks";

import { customer_register } from "../../api/customer"
import Cookies from "js-cookie";
import { createValidator } from "../../lib/validator"
// import route_names from "../../route_names";

// import 'intl-tel-input/build/css/intlTelInput.css';
// import './RegisterForm.css'
// import intlTelInput from 'intl-tel-input';
// import axios from "axios";
// import {  getRWDStyles} from "@/lib/utils/rwdHelper"
// import  Link  from 'next/link';
// import {  useRouter } from 'next/navigation';
// import { useSearchParams } from 'next/navigation';
import {getClientIPCountryCode} from '@/fetch/ipapi'

const RegisterForm = ({  
    // node,  
    // mode, 
    // actions, 
    // update,
    // children, routingTable, ...props

    routingTable,
    element, 
    elementProps,
    mode,
    ...props
}) => {
    


    const dispatch = useAppDispatch();

    
    
    // const websiteEditorState = useAppSelector((state) => state.website_editor);

    
    // const telInput = useRef()
    // const [iti, setIti] = useState(null)
    // const searchParams = useSearchParams()

    // useEffect(()=>{

    //     var iti = intlTelInput(telInput.current, {
    //     utilsScript:"/js/iti_utils.js",
    //     initialCountry: "auto",
    //     geoIpLookup:(callback)=>{
    //         if(Cookies.get('country_code')){
    //         callback(Cookies.get('country_code'))
    //         }else{
    //         axios.get('https://ipapi.co/json')
    //         .then( (res) => {
    //             Cookies.set('country_code',res?.data?.country_code)
    //             callback(res?.data?.country_code||"us")
    //         })
    //         .catch( (error) => {
    //             callback("us")
    //         })
    //         }
    //     }
    //     })
    //     setIti(iti)
    // }, [])

    // const [width, setWidth] = useState('')
    const [country, setCountry] = useState(null)
        
    useEffect(()=>{   
        getClientIPCountryCode().then(_country=>{
            setCountry(_country)
        })
    }, [])

    const [registerData, setRegisterData] = useState({
        first_name:'', last_name:'',phone:'', email:'',password:'', confirm_password:''
    })

    const [showEmailVerificationNotification, setShowEmailVerificationNotification] = useState(false)
    const [awaitSubmitButton, setAwaitSubmitButton] = useState(false)

    const [viewPassword, setViewPassword] = useState(false)
    const [viewConfirmPassword, setViewConfirmPassword] = useState(false)

    // const [rememberMe,setRememberMe] = useState(Cookies.get('customer_me')?true:false)

    const [, forceUpdate] = useState();
    const registerFormValidator = useRef(createValidator())

    // const router = useRouter()
    

    const handleRegister = (event)=>{

        if(!registerFormValidator.current.allValid()){
            registerFormValidator.current.showMessages()
            forceUpdate(new Date())
            return
          }

          setAwaitSubmitButton(true)
        customer_register({registerData, country}).then(res=>{
            console.log(res.data)
            setShowEmailVerificationNotification(true)
            setAwaitSubmitButton(false)
        }).catch(err=>{
            setAwaitSubmitButton(false)
        })

    }

    // useEffect(()=>{

    //     rwdHelper(
    //         websiteEditorState.windowWidth, 
    //         websiteEditorState.sideMenuActive, 
    //         [
    //             new RWDPropHandler(node?.data, 'rwd_width', 'width_unit', setWidth),
    //         ]
    //     )



    // },[ websiteEditorState.windowWidth, websiteEditorState.sideMenuActive, setWidth, node?.data])


    // useEffect(()=>{
    //     if(![undefined,null,''].includes(Cookies.get('customer_access_token'))){
    //         // navigate(route_names.home)
    //         // window.location.href = route_names.home
    //         router.push(searchParams.get('from')||'/')

    //     }
    // },[])


    return (
    
        
        <Fragment>
        <form
           {...elementProps}
        >
            <div className={clsx(style['標題框'], '標題框')}>
                <h3 className={clsx(style['標題'], '標題')}>新顧客註冊</h3>
            </div>

            <div className={clsx(style['名字框'], '名字框')}>
                <label className={clsx(style['名字-標籤'], '名字-標籤')}>名字：</label>
                <input
                    className={clsx(style['名字-輸入'], '名字-輸入')}
                    type="text"
                    name="customer-first-name"
                    placeholder="名字 First Name"
                    value={registerData.first_name}
                    onChange={(e)=>{
                        setRegisterData({...registerData, first_name:e.target.value})
                    }}
                    onBlur={() => {
                        registerFormValidator.current.showMessageFor("first_name")
                        forceUpdate(new Date())
                    }}
                />
                {registerFormValidator.current.message("first_name", registerData.first_name, "required")}
            </div>
                
            <div className={clsx(style['姓氏框'], '姓氏框')}>
                <label className={clsx(style['姓氏-標籤'], '姓氏-標籤')}>姓氏：</label>
                <input
                    className={clsx(style['姓氏-輸入'], '姓氏-輸入')}
                    type="text"
                    name="customer-last-name"
                    placeholder="姓氏 Last Name"
                    value={registerData.last_name}
                    onChange={(e)=>{
                        setRegisterData({...registerData, last_name:e.target.value})
                    }}
                    onBlur={() => {
                        registerFormValidator.current.showMessageFor("last_name")
                        forceUpdate(new Date())
                    }}
                />
                {registerFormValidator.current.message("last_name", registerData.last_name, "required")}
            </div>
                
            <div className={clsx(style['電話框'], '電話框')}>
                <label className={clsx(style['電話-標籤'], '電話-標籤')}>電話：</label>
                <input
                    className={clsx(style['電話-輸入'], '電話-輸入')}
                    type="tel"
                    name="customer-phone"
                    placeholder="電話 Phone"
                    value={registerData.phone}
                    onChange={(e)=>{
                        setRegisterData({...registerData, phone:e.target.value})
                    }}
                    onBlur={() => {
                        registerFormValidator.current.showMessageFor("phone")
                        forceUpdate(new Date())
                    }}
                />
                {registerFormValidator.current.message("phone", registerData.phone, "required")}
            </div>


            <div className={clsx(style['電子郵件框'], '電子郵件框')}>
                <label className={clsx(style['電子郵件-標籤'], '電子郵件-標籤')}>電子郵件：</label>
                <input
                    className={clsx(style['電子郵件-輸入'], '電子郵件-輸入')}
                    type="email"
                    name="customer-email"
                    placeholder="電子郵件 Email"
                    value={registerData.email}
                    onChange={(e)=>{
                        setRegisterData({...registerData, email:e.target.value})
                    }}
                    onBlur={() => {
                        registerFormValidator.current.showMessageFor("email")
                        forceUpdate(new Date())
                    }}
                />
                {registerFormValidator.current.message("email", registerData.email, "required|email")}
            </div>
                
            <div className={clsx(style['密碼框'], '密碼框')}>
                <label className={clsx(style['密碼-標籤'], '密碼-標籤')}>密碼：</label>
                <div className={clsx(style['密碼輸入框'], '密碼輸入框')}>
                    <input
                        className={clsx(style['密碼-輸入'], '密碼-輸入')}
                        type={viewPassword?'text':'password'}
                        name="customer-password"
                        placeholder="密碼 Password"
                        onChange={(e)=>{
                            setRegisterData({...registerData, password:e.target.value})
                        }}
                        onBlur={() => {
                            registerFormValidator.current.showMessageFor("password")
                            forceUpdate(new Date());
                        }}
                    />
                    <button className={clsx(style['顯示密碼-按鈕'], '顯示密碼-按鈕')} type="button" onClick={()=>{setViewPassword(!viewPassword)}}>
                        <i className={clsx(style['顯示密碼-圖標'], '顯示密碼-圖標', viewPassword?"fa fa-solid fa-eye-slash":"fa fa-solid fa-eye")} />
                    </button>
                </div>
                
                {registerFormValidator.current.message("password", registerData.password, "required|min:8", {messages:{'min':'密碼至少需為8位'}})}
            </div>
                
            <div className={clsx(style['確認密碼框'], '確認密碼框')}>
                <label className={clsx(style['確認密碼-標籤'], '確認密碼-標籤')}>確認密碼：</label>
                <div className={clsx(style['確認密碼輸入框'], '確認密碼輸入框')}>
                    <input
                        className={clsx(style['確認密碼-輸入'], '確認密碼-輸入')}
                        type={viewConfirmPassword?'text':'password'}
                        name="customer-confirm-password"
                        placeholder="確認密碼 Confirm Password"
                        onChange={(e)=>{
                            setRegisterData({...registerData, confirm_password:e.target.value})
                        }}
                        onBlur={() => {
                            registerFormValidator.current.showMessageFor("confirm_password")
                            forceUpdate(new Date());
                        }}
                    />
                    <button className={clsx(style['顯示確認密碼-按鈕'], '顯示確認密碼-按鈕')} type="button" onClick={()=>{setViewConfirmPassword(!viewConfirmPassword)}}>
                        <i className={clsx(style['顯示確認密碼-圖標'], '顯示確認密碼-圖標', viewConfirmPassword?"fa fa-solid fa-eye-slash":"fa fa-solid fa-eye")} />
                    </button>
                </div>
               
                {registerFormValidator.current.message("confirm_password", registerData.confirm_password, `required|in:${registerData.password}`)}
            </div>

            <div className={clsx(style['登入註冊框'], '登入註冊框')}>
                <div className={clsx(style['註冊按鈕框'], '註冊按鈕框')}>
                    <button  className={clsx(style['註冊按鈕'], '註冊按鈕', awaitSubmitButton?`${style['等待']} 等待`:'')} type="button"  onClick={handleRegister}>
                    註冊 Register
                    </button>
                </div>

                <div className={clsx(style['登入連結框'], '登入連結框')}>
                    <a className={clsx(style['登入連結'], '登入連結')} href={`/${routingTable?.['customer_login_route']}`} >登入</a>
                </div>
            </div>
        </form>
        <div className={clsx(style['電子郵件認證通知框'], '電子郵件認證通知框', showEmailVerificationNotification?`${style['顯示']} 顯示`:'')}>
            <div className={clsx(style['電子郵件認證通知-文字框'], '電子郵件認證通知-文字框')}>
                <span className={clsx(style['電子郵件認證通知-文字'], '電子郵件認證通知-文字')}>認證信件已寄出，請點擊認證連結以完成註冊</span>
            </div>
            <div className={clsx(style['電子郵件認證通知-確認按鈕框'], '電子郵件認證通知-確認按鈕框')}>
                <button className={clsx(style['電子郵件認證通知-確認按鈕'], '電子郵件認證通知-確認按鈕')} onClick={()=>{setShowEmailVerificationNotification(false)}}>確認</button>
            </div>
        </div>
        </Fragment>
    )
};

RegisterForm.propTypes = {
};

export default RegisterForm;




