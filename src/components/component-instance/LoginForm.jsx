
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useRef } from "react";
import clsx from "clsx";
import style from './LoginForm.module.scss'
           
import { useAppSelector, useAppDispatch  } from "@/redux/hooks";

import { setCustomer } from '../../redux/slices/customer-slice'
// import { setCartProducts } from "../../redux/slices/cart-slice";

import { customer_general_login } from "../../api/customer"
import Cookies from "js-cookie";
import { createValidator } from "../../lib/validator"

// import route_names from "../../route_names";

// import { useSearchParams } from 'next/navigation';

// import {  useRouter } from 'next/navigation';

const LoginForm = ({  
    // node,  
    // mode, 
    // actions, 
    // update, children, routingTable, ...props


    element, 
    elementProps,
    mode,
    ...props


}) => {
    


    const dispatch = useAppDispatch();
    // const searchParams = useSearchParams()
    // const router = useRouter()
    // const websiteEditorState = useAppSelector((state) => state.website_editor);



    // const [width, setWidth] = useState('')
    // const [isHover, setIsHover] = useState(false)
    
    const [searchParams, setSearchParams] = useState({ redirect: null, });


    const [awaitSubmitButton, setAwaitSubmitButton] = useState(false)
        

    const [loginData, setLoginData] = useState({email:Cookies.get('customer_me'),password:''})
    const [viewPassword, setViewPassword] = useState(false)
    
    const [rememberMe,setRememberMe] = useState(Cookies.get('customer_me')?true:false)

    const [, forceUpdate] = useState();
    const loginFormValidator = useRef(createValidator())


    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const redirect = urlSearchParams.get('redirect') || '';
        setSearchParams({ redirect });
    }, []);





    const handleLogin = (event)=>{

        if(!loginFormValidator?.current?.allValid()){
            loginFormValidator?.current?.showMessages()
            forceUpdate(new Date())
            return
        }

        setAwaitSubmitButton(true)
        customer_general_login(loginData).then(res=>{
            console.log(res.data)
            dispatch(setCustomer(res.data.customer))
            Cookies.set('customer_access_token', res.data.customer_access_token)
            if(rememberMe){
                Cookies.set('customer_me', loginData.email)
            }else{
                Cookies.remove('customer_me')
            }
            // setAwaitSubmitButton(false)
            window.location.href = searchParams?.redirect||'/'
            // router.push(searchParams.get('redirect')||'/')
        }).catch(err=>{
            setAwaitSubmitButton(false)
        })
    }




    return (
        <form
            {...elementProps}
        >

            <div className={clsx(style['標題框'], '標題框')}>
                <h3 className={clsx(style['標題'], '標題')}>顧客登入</h3>
            </div>

            <div className={clsx(style['電子郵件框'], '電子郵件框')}>
                <label className={clsx(style['電子郵件-標籤'], '電子郵件-標籤')}>電子郵件：</label>
                <input
                    className={clsx(style['電子郵件-輸入'], '電子郵件-輸入')}
                    type="email"
                    name="customer-email"
                    placeholder="電子郵件 Email"
                    value={loginData.email}
                    onChange={(e)=>{
                        setLoginData({...loginData, email:e.target.value})
                    }}
                    onBlur={() => {
                        loginFormValidator.current.showMessageFor("email")
                        forceUpdate(new Date())
                    }}
                />
                {loginFormValidator.current.message("email", loginData.email, "required|email")}
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
                            setLoginData({...loginData, password:e.target.value})
                        }}
                        onBlur={() => {
                            loginFormValidator.current.showMessageFor("password")
                            forceUpdate(new Date());
                        }}
                    />
                    <button className={clsx(style['顯示密碼-按鈕'], '顯示密碼-按鈕')} type="button" onClick={()=>{setViewPassword(!viewPassword)}}>
                        <i className={clsx(style['顯示密碼-圖標'], '顯示密碼-圖標', viewPassword?"fa-solid fa-eye-slash":"fa-solid fa-eye")} />
                    </button>
                </div>
                {loginFormValidator.current.message("password", loginData.password, "required")}
            </div>
            


            <div className={clsx(style['記住我框'], '記住我框')}>
                <label  className={clsx(style['記住我-標籤'], '記住我-標籤')}>記住我</label>
                <input 
                    className={clsx(style['記住我-勾選'], '記住我-勾選')}
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e)=>{
                        setRememberMe(!rememberMe)
                    }}/>
            </div>

            <div className={clsx(style['登入註冊框'], '登入註冊框')}>
                <div className={clsx(style['登入按鈕框'], '登入按鈕框')}>
                    <button  className={clsx(style['登入按鈕'], '登入按鈕', awaitSubmitButton?`${style['隱藏']} 隱藏`:'')} type="button"  onClick={handleLogin}>
                        登入 Login
                    </button>
                </div>

                <div className={clsx(style['註冊連結框'], '註冊連結框')}>
                    <a className={clsx(style['註冊連結'], '註冊連結')} href={`/${routingTable?.['customer_register_route']}`} >註冊</a>
                </div>
            </div>
            
        </form>

    )
};

LoginForm.propTypes = {
};

export default LoginForm;




