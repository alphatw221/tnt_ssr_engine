import {  useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setEStore } from "@/redux/slices/estore-slice";
import { useEffect } from "react";

const  StoreSettingsPreloader = ({bonus_point_policy, e_commerce_settings}) => {

  //TODO SSR 情況下 settings 會在window.__ssr__.... 找到參數 
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



