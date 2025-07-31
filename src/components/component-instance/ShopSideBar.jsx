"use client"
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import clsx from "clsx";
import style from './ShopSideBar.module.scss'
      
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setCategories } from "@/redux/slices/shop-slice";

import ShopSidebarKingPork from "../../wrappers/product/ShopSidebarKingPork";
import {customer_search_product_category} from "../../api/product_category.js"
import { rwdHelper, RWDPropHandler} from "../../lib/utils/rwdHelper"

const ShopSideBar = ({  
    node,  mode, actions, update, data, children, ...props}) => {



    const websiteEditorState = useAppSelector((state) => state.website_editor);
    const shop = useAppSelector((state) => state.shop);

    const dispatch = useAppDispatch()
    
    const [width, setWidth] = useState('')
    const [height, setHeight] = useState('')
    const [titleFontSize, setTitleFontSize] = useState('')
    const [titleLineHeight, setTitleLineHeight] = useState('')
    const [categoryFontSize, setCategoryFontSize] = useState('')
    const [categoryLineHeight, setCategoryLineHeight] = useState('')

    useEffect(()=>{

        rwdHelper(
            websiteEditorState.windowWidth, 
            websiteEditorState.sideMenuActive, 
            [
                new RWDPropHandler(node?.data, 'rwd_width', 'width_unit', setWidth),
                new RWDPropHandler(node?.data, 'rwd_height', 'height_unit', setHeight),
                new RWDPropHandler(node?.data, 'title_rwd_font_size', 'px', setTitleFontSize),
                new RWDPropHandler(node?.data, 'title_rwd_line_height', 'px', setTitleLineHeight),

                new RWDPropHandler(node?.data, 'category_rwd_font_size', 'px', setCategoryFontSize),
                new RWDPropHandler(node?.data, 'category_rwd_line_height', 'px', setCategoryLineHeight),


            ]
        )


    },[ websiteEditorState.windowWidth, websiteEditorState.sideMenuActive, setWidth, setHeight,
        setTitleFontSize,
        setTitleLineHeight,
        setCategoryFontSize,
        setCategoryLineHeight,
        node?.data])

    const [categoriesReady, setCategoriesReady] = useState(false)
    // const [categories, setCategories] = useState(data)
    const searchCategories = ()=>{
        var  _keyword, _page
        customer_search_product_category( _keyword='', _page=1).then(res=>{
            dispatch(setCategories({'categories':res?.data?.results||[], 'categoryTotalRecords':res?.data?.count||0}))
            setCategoriesReady(true)
        })
    }

    useEffect(()=>{
        // if(mode=='edit'){
        //     searchCategories()
        // }else if (mode==='prod'){
        //     setCategoriesReady(true)
        // }
        if(data){
            dispatch(setCategories({'categories':data?.results||[], 'categoryTotalRecords':data?.count||0}))
            setCategoriesReady(true)
        }else{
            searchCategories()
        }

    },[])


    return (
        
        <div 
            id={props?.id}
            className={
                clsx(
                    props?.className,
                    style['shop-side-bar']

                )}
            style={{
                ...props?.style||{},
                width:width,
                maxWidth:(node?.data?.max_width||'')+(node?.data?.max_width?node?.data?.max_width_unit:''),

            }}
            >
            
            

            
            <ShopSidebarKingPork  node={node} categories={shop.categories} categoriesReady={categoriesReady} 
            props={{
                'height':height, 
                'titleFontSize':titleFontSize, 
                'titleLineHeight':titleLineHeight,
                'categoryFontSize':categoryFontSize,
                'categoryLineHeight':categoryLineHeight
                
                }}/>




        </div>)
};

ShopSideBar.propTypes = {
};

export default ShopSideBar;




