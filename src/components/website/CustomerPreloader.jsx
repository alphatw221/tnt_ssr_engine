"use client"
import {  useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setCustomer } from "@/redux/slices/customer-slice";
import { useEffect } from "react";
import Cookies from 'js-cookie'
import {customer_get_account} from "@/api/customer.js"

const  CustomerPreloader = ({}) => {

    const dispatch = useAppDispatch();
    const customer = useAppSelector((state) => state.customer);


    useEffect(()=>{
      if(!customer?.uuid && Cookies.get('customer_access_token')){
        customer_get_account().then(res=>{
          console.log(res.data)
          dispatch(setCustomer(res.data))
        }).catch(err=>{
          Cookies.remove('customer_access_token')
          // dispatch(setCustomer(null))
        })
      }
    },[])

    return null

};

CustomerPreloader.propTypes = {};

export default CustomerPreloader;



