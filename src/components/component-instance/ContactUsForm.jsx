
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useRef } from "react";
import clsx from "clsx";
import style from './ContactUsForm.module.scss'

// import { useSelector, useDispatch } from "react-redux";            
import { useAppSelector, useAppDispatch  } from "@/redux/hooks";
import {customer_create_inquiry} from "@/api/inquiry"
// import { customer_register } from "../../api/customer"
// import Cookies from "js-cookie";
import { createValidator } from "@/lib/validator"
// import route_names from "../../route_names";

// import 'intl-tel-input/build/css/intlTelInput.css';
// import './RegisterForm.css'
import cogoToast from 'cogo-toast';
// import { getRWDStyles} from "@/lib/utils/rwdHelper"


const ContactUsForm = ({  
    // node,  
    // mode, 
    // actions, 
    // children, ...props
    element, 
    elementProps,
    mode,
    ...props

}) => {
    

    const customer = useAppSelector((state) => state.customer);
    
    const [submitData, setSubmitData] = useState({
        first_name:customer?.first_name||'', 
        last_name:customer?.last_name||'',
        phone:customer?.phone||'', 
        email:customer?.email||'',
        title:'', context:''
    })

    const [, forceUpdate] = useState();
    const contactUsFormValidator = useRef(createValidator())



    const handleSubmit = (event)=>{
        customer_create_inquiry(submitData).then(res=>{
            cogoToast.success("訊息已送出, 專員將盡快跟您聯繫", {position: "top-right"});

        })

    }


    useEffect(()=>{
        if(customer?.uuid){
            setSubmitData({...submitData, 
                first_name:customer?.first_name,
                last_name:customer?.last_name,
                phone:customer?.phone||'', 
                email:customer?.email||'', 
            })
        }
    }, [customer])

    return (
    
        
        <form
             {...elementProps}

        >
                <div className={clsx(style['標題框'], '標題框')}>
                    <h3 className={clsx(style['標題'], '標題')}>聯絡我們</h3>
                </div>

                <div className={clsx(style['名字框'], '名字框')}>
                    <label className={clsx(style['名字-標籤'], '名字-標籤')} >名字：</label>
                    <input
                        className={clsx(style['名字-輸入'], '名字-輸入')}
                        type="text"
                        name="customer-first-name"
                        placeholder="名字"
                        value={submitData.first_name}
                        onChange={(e)=>{
                        setSubmitData({...submitData, first_name:e.target.value})
                        }}
                        onBlur={() => {
                        contactUsFormValidator.current.showMessageFor("first_name")
                        forceUpdate(new Date())
                        }}
                    />
                    {contactUsFormValidator.current.message("first_name", submitData.first_name, "required")}
                </div>
                
                <div className={clsx(style['姓氏框'], '姓氏框')}>
                    <label className={clsx(style['姓氏-標籤'], '姓氏-標籤')} >姓氏：</label>
                    <input
                        className={clsx(style['姓氏-輸入'], '姓氏-輸入')}
                        type="text"
                        name="customer-last-name"
                        placeholder="姓氏"
                        value={submitData.last_name}
                        onChange={(e)=>{
                            setSubmitData({...submitData, last_name:e.target.value})
                        }}
                        onBlur={() => {
                            contactUsFormValidator.current.showMessageFor("last_name")
                            forceUpdate(new Date())
                        }}
                    />
                    {contactUsFormValidator.current.message("last_name", submitData.last_name, "required")}
                </div>
                



                <div className={clsx(style['電子郵件框'], '電子郵件框')}>
                    <label className={clsx(style['電子郵件-標籤'], '電子郵件-標籤')} >電子郵件：</label>
                    <input
                        className={clsx(style['電子郵件-輸入'], '電子郵件-輸入')}
                        type="email"
                        name="customer-email"
                        placeholder="Email"
                        value={submitData.email}
                        onChange={(e)=>{
                        setSubmitData({...submitData, email:e.target.value})
                        }}
                        onBlur={() => {
                        contactUsFormValidator.current.showMessageFor("email")
                        forceUpdate(new Date())
                        }}
                    />
                    {contactUsFormValidator.current.message("email", submitData.email, "required|email")}
                </div>
                
                <div className={clsx(style['主旨框'], '主旨框')}>
                    <label className={clsx(style['主旨-標籤'], '主旨-標籤')} >主旨：</label>
                    <input
                        className={clsx(style['主旨-輸入'], '主旨-輸入')}
                        type="text"
                        name="title"
                        placeholder="主旨"
                        onChange={(e)=>{
                        setSubmitData({...submitData, title:e.target.value})
                        }}
                        onBlur={() => {
                        contactUsFormValidator.current.showMessageFor("password")
                        forceUpdate(new Date());
                        }}
                    />
                    {contactUsFormValidator.current.message("password", submitData.title, "required")}
                </div>
                
                <div className={clsx(style['訊息框'], '訊息框')}>
                
                    <label className={clsx(style['訊息-標籤'], '訊息-標籤')} >訊息：</label>
                    <textarea   
                        className={clsx(style['訊息-輸入'], '訊息-輸入')}
                        placeholder="訊息"
                        onChange={(e)=>{
                            setSubmitData({...submitData, context:e.target.value})
                        }}
                        onBlur={() => {
                            contactUsFormValidator.current.showMessageFor("context")
                            forceUpdate(new Date());
                        }}/>
                    {contactUsFormValidator.current.message("context", submitData.context, "required")}

                </div>
               
      

                <div className={clsx(style['送出框'], '送出框')}>
                    <button  
                        className={clsx(style['送出-按鈕'], '送出-按鈕')}
                        type="button"  
                        onClick={handleSubmit}>
                        送出 Submit
                    </button>
                </div>
        </form>

    // </div>
    )
};

ContactUsForm.propTypes = {
};

export default ContactUsForm;




