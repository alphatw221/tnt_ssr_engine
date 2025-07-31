"use client"
import {  useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setEStore } from "@/redux/slices/estore-slice";
// import { setCartProducts } from "../../redux/slices/cart-slice";
import { useEffect } from "react";

const  StoreSettingsPreloader = ({bonus_point_policy, e_commerce_settings}) => {


    const dispatch = useAppDispatch();

    useEffect(()=>{
      dispatch(setEStore({
        bonus_point_policy,
        e_commerce_settings,
      }))
    },[bonus_point_policy, e_commerce_settings])

    return null

};

StoreSettingsPreloader.propTypes = {};

export default StoreSettingsPreloader;



