import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

import {  useAppSelector, useAppDispatch } from "@/redux/hooks";
import Cookies from 'js-cookie'
import { setUser } from "@/redux/slices/user-slice"
import {get_user_account} from '@/api/user.js'
const PrivateRoute = ({ children }) => {

  const [isVerifing, setIsVerifing] = useState(true); 
  const {user} = useAppSelector((state)=> state.user)
  const dispatch = useAppDispatch()
  const location = useLocation();

  useEffect(()=>{
    if(Cookies.get('user_access_token')){
      if(user){
        setIsVerifing(false)
      }else{
        get_user_account().then(res=>{
          dispatch(setUser(res.data))
          setIsVerifing(false)
        }).catch(err=>{
          Cookies.remove('user_access_token')
          setIsVerifing(false)
        })
      }
    }else{
      dispatch(setUser(null))
      setIsVerifing(false)
    }
  },[])



  if (isVerifing) return <div>...</div>

  if(!user) {
    const redirect = encodeURIComponent(location.pathname);
    return <Navigate to={`/website_backend/user_login?redirect=${redirect}`} />;
  }

  return children;

};

export default PrivateRoute;