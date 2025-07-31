// src/pages/LoginPage.jsx

import './UserLoginPage.css'; // 匯入 CSS













import { useParams, useSearchParams, useNavigate } from 'react-router-dom';


import React, { createRef, useRef, useState, Fragment } from "react";

import { createValidator } from "@/lib/validator"
import { user_general_login } from "@/api/user"

import Cookies from 'js-cookie'


import clsx from "clsx";
import {  useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/slices/user-slice"



export default function LoginPage() {

  const [tabKey, setTabKey] = useState('login');


  const [loginData, setLoginData] = useState({account:Cookies.get('me_user')||'',password:''})

  const [, forceUpdate] = useState();

  const loginFormValidator = useRef(createValidator())

  const [rememberMe, setRememberMe] = useState(![null,undefined,''].includes(Cookies.get('me_user')))



  const dispatch = useAppDispatch();


  const { redirect } = useSearchParams();
  const navigate = useNavigate();


  const handleLogin = ()=>{

    if(!loginFormValidator.current.allValid()){
      loginFormValidator.current.showMessages()
      forceUpdate(new Date())
      return
    }

    user_general_login(loginData).then(res=>{
      console.log(res.data)
      Cookies.set('user_access_token',res.data.user_access_token)
      if(rememberMe){
        Cookies.set('me_user',loginData.account)
      }else{
        Cookies.remove('me_user')
      }



      dispatch(setUser(res.data.user_data))
      navigate(redirect||'/website_backend/website_editor', {replace:true})
      // TODO


      // router.push(searchParams.get('redirect')||(routeNames.website_backend + '/' + routeNames.website_editor))

      // window.location.href = routeNames.website_backend + '/' + routeNames.website_editor
    })

  }







  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">使用者登入</h2>
        <form  className="login-form">
          <div className="form-group">
            <label>帳號 Account</label>
            <input
              type="text"
              placeholder="帳號"
              value={loginData.account}
              onChange={(e) => setLoginData({...loginData, account:e.target.value})}
              required
              onBlur={() => {
                  loginFormValidator.current.showMessageFor("required")
                  forceUpdate(new Date())
                }}
              />
              {loginFormValidator.current.message("required", loginData.account, "required")}

          </div>

          <div className="form-group">
            <label>密碼 Password</label>
            <input
              type="password"
              placeholder="密碼"
              value={loginData.password}
              onChange={(e) => setLoginData({...loginData, password:e.target.value})}
              required
              onBlur={() => {
                loginFormValidator.current.showMessageFor("password")
                forceUpdate(new Date())
              }}
            />
             {loginFormValidator.current.message("password", loginData.password, "required")}
          </div>

          <button type="button" className="login-button" onClick={handleLogin}>
            登入
          </button>
        </form>
      </div>
    </div>
  );
}