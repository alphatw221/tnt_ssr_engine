"use client"

import {  useAppDispatch } from "@/redux/hooks";
import { setCategories } from "../../redux/slices/shop-slice"

const ShopSideBarPreLoader = ({ categories, totalRecords}) => {

    const dispatch = useAppDispatch();
    dispatch(setCategories({'categories':categories, 'totalRecords':totalRecords}))
    // dispatch(

    // )

    return null

};

ShopSideBarPreLoader.propTypes = {
};

export default ShopSideBarPreLoader;




