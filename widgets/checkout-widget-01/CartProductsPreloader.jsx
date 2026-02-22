import {  useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { setCartProducts } from "@/redux/slices/cart-slice";

const  CartProductPreloader = ({}) => {

    const dispatch = useAppDispatch();
    const customer = useAppSelector((state) => state.customer);


    //cart products preloader
    useEffect(()=>{
        if(localStorage.getItem("cart_products")){
            const _cartProducts = JSON.parse(localStorage.getItem("cart_products"));
            dispatch(setCartProducts(_cartProducts));
        }
    },[])

    return null

};

CartProductPreloader.propTypes = {};

export default CartProductPreloader;
