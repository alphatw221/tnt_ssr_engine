"use client"

import {  useAppDispatch } from "@/redux/hooks";
import { setProducts } from "../../redux/slices/shop-slice"

const ShopGridPreLoader = ({ products, totalRecords}) => {

    const dispatch = useAppDispatch();
    dispatch(setProducts({'products':products, 'totalRecords':totalRecords}))
    // dispatch(

    // )

    return null

};

ShopGridPreLoader.propTypes = {
};

export default ShopGridPreLoader; 




