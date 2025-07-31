"use client"

import {  useAppDispatch } from "@/redux/hooks";
import { setProduct } from "@/redux/slices/shop-slice"

const ProductDetailPreLoader = ({ product}) => {

    const dispatch = useAppDispatch();
    dispatch(setProduct(product))


    return null

};

ProductDetailPreLoader.propTypes = {
};

export default ProductDetailPreLoader;




