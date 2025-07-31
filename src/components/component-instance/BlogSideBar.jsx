"use client"
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import clsx from "clsx";
import style from './BlogSideBar.module.scss';

// import { useSelector, useDispatch } from "react-redux";            
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setCategories } from "@/redux/slices/blog-slice";

// import ParameterizeForm from "../parameterize-form/ParameterizeForm";

// import ComponentSettingsDropdown from "../component/component-settings-dropdown/ComponentSettingsDropdown";
// import HeroSliderKingPork from "../../wrappers/hero-slider/HeroSliderKingPork";

// import { element2json } from "../../lib/utils/element2json";

// import ShopGridStandardKingPork from "../../pages/shop/ShopGridStandardKingPork";

// import ShopSidebarKingPork from "../../wrappers/product/ShopSidebarKingPork";

import {customer_search_blog_post_category} from "../../api/blog_post_category";
import BlogSidebarKingPork from "../../wrappers/blog/BlogSidebarKingPork";
import { rwdHelper, RWDPropHandler} from "../../lib/utils/rwdHelper"

const BlogSideBar = ({  
    component,  mode, actions, update}) => {



    const websiteEditorState = useAppSelector((state) => state.website_editor);
    const blog = useAppSelector((state) => state.blog);

    const dispatch = useAppDispatch()

    const [isHover, setIsHover] = useState(false)
    
    const [width, setWidth] = useState('')
    const [height, setHeight] = useState('')
    // const [productNameFontSize, setProductNameFontSize] = useState('')
    // const [priceFontSize, setPriceFontSize] = useState('')
    // const [actionFontSize, setActionFontSize] = useState('')


    useEffect(()=>{

        rwdHelper(
            websiteEditorState.windowWidth, 
            websiteEditorState.sideMenuActive, 
            [
                new RWDPropHandler(component, 'rwd_width', 'width_unit', setWidth),
                new RWDPropHandler(component, 'rwd_height', 'height_unit', setHeight),
            ]
        )

        // // const _rwd_font_size = (component.rwd_font_size||'').split(',')
        // const _rwd_width = (component.rwd_width||'').split(',')
        // const _rwd_height = (component.rwd_height||'').split(',')
        // // const _product_name_rwd_font_size = (component.product_name_rwd_font_size||'').split(',')
        // // const _price_rwd_font_size = (component.price_rwd_font_size||'').split(',')
        // // const _action_rwd_font_size = (component.action_rwd_font_size||'').split(',')

        // // const _rwd_line_height = (component.rwd_line_height||'').split(',')

        // if(websiteEditorState.windowWidth>=1536){
        //     //2xl
        //     // setFontSize(`${_rwd_font_size?.[0]||'12'}${component?.rwd_font_size?'px':''}`)
        //     setWidth(`${_rwd_width?.[0]||''}${component?.width_unit||''}`)
        //     setHeight(`${_rwd_height?.[0]||''}${component?.height_unit||''}`)
        //     // setProductNameFontSize(`${_product_name_rwd_font_size?.[0]||''}${component?.product_name_rwd_font_size?'px':''}`)
        //     // setPriceFontSize(`${_price_rwd_font_size?.[0]||''}${component?.price_rwd_font_size?'px':''}`)
        //     // setActionFontSize(`${_action_rwd_font_size?.[0]||''}${component?.action_rwd_font_size?'px':''}`)

        // }else if(websiteEditorState.windowWidth>=1280){
        //     //xl
        //     // setFontSize(`${_rwd_font_size?.[1]||_rwd_font_size?.[0]||'12'}${component?.rwd_font_size?'px':''}`)
        //     setWidth(`${_rwd_width?.[1]||_rwd_width?.[0]||''}${component?.width_unit||''}`)
        //     setHeight(`${_rwd_height?.[1]||_rwd_height?.[0]||''}${component?.height_unit||''}`)
        //     // setProductNameFontSize(`${_product_name_rwd_font_size?.[1]||_product_name_rwd_font_size?.[0]||''}${component?.product_name_rwd_font_size?'px':''}`)
        //     // setPriceFontSize(`${_price_rwd_font_size?.[1]||_price_rwd_font_size?.[0]||''}${component?.price_rwd_font_size?'px':''}`)
        //     // setActionFontSize(`${_action_rwd_font_size?.[1]||_action_rwd_font_size?.[0]||''}${component?.action_rwd_font_size?'px':''}`)

        // }else if(websiteEditorState.windowWidth>=1024){
        //     //lg
        //     // setFontSize(`${_rwd_font_size?.[2]||_rwd_font_size?.[1]||_rwd_font_size?.[0]||'12'}${component?.rwd_font_size?'px':''}`)
        //     setWidth(`${_rwd_width?.[2]||_rwd_width?.[1]||_rwd_width?.[0]||''}${component?.width_unit||''}`)
        //     setHeight(`${_rwd_height?.[2]||_rwd_height?.[1]||_rwd_height?.[0]||''}${component?.height_unit||''}`)
        //     // setProductNameFontSize(`${_product_name_rwd_font_size?.[2]||_product_name_rwd_font_size?.[1]||_product_name_rwd_font_size?.[0]||''}${component?.product_name_rwd_font_size?'px':''}`)
        //     // setPriceFontSize(`${_price_rwd_font_size?.[2]||_price_rwd_font_size?.[1]||_price_rwd_font_size?.[0]||''}${component?.price_rwd_font_size?'px':''}`)
        //     // setActionFontSize(`${_action_rwd_font_size?.[2]||_action_rwd_font_size?.[1]||_action_rwd_font_size?.[0]||''}${component?.action_rwd_font_size?'px':''}`)

        // }else if(websiteEditorState.windowWidth>=768){
        //     //md>tablet
        //     // setFontSize(`${_rwd_font_size?.[3]||_rwd_font_size?.[2]||_rwd_font_size?.[1]||_rwd_font_size?.[0]||'12'}${component?.rwd_font_size?'px':''}`)
        //     setWidth(`${_rwd_width?.[3]||_rwd_width?.[2]||_rwd_width?.[1]||_rwd_width?.[0]||''}${component?.width_unit||''}`)
        //     setHeight(`${_rwd_height?.[3]||_rwd_height?.[2]||_rwd_height?.[1]||_rwd_height?.[0]||''}${component?.height_unit||''}`)
        //     // setProductNameFontSize(`${_product_name_rwd_font_size?.[3]||_product_name_rwd_font_size?.[2]||_product_name_rwd_font_size?.[1]||_product_name_rwd_font_size?.[0]||''}${component?.product_name_rwd_font_size?'px':''}`)
        //     // setPriceFontSize(`${_price_rwd_font_size?.[3]||_price_rwd_font_size?.[2]||_price_rwd_font_size?.[1]||_price_rwd_font_size?.[0]||''}${component?.price_rwd_font_size?'px':''}`)
        //     // setActionFontSize(`${_action_rwd_font_size?.[3]||_action_rwd_font_size?.[2]||_action_rwd_font_size?.[1]||_action_rwd_font_size?.[0]||''}${component?.action_rwd_font_size?'px':''}`)

        // }else if(websiteEditorState.windowWidth>=640){
        //     //sm=>tablet
        //     // setFontSize(`${_rwd_font_size?.[4]||_rwd_font_size?.[3]||_rwd_font_size?.[2]||_rwd_font_size?.[1]||_rwd_font_size?.[0]||'12'}${component?.rwd_font_size?'px':''}`)
        //     setWidth(`${_rwd_width?.[4]||_rwd_width?.[3]||_rwd_width?.[2]||_rwd_width?.[1]||_rwd_width?.[0]||''}${component?.width_unit||''}`)
        //     setHeight(`${_rwd_height?.[4]||_rwd_height?.[3]||_rwd_height?.[2]||_rwd_height?.[1]||_rwd_height?.[0]||''}${component?.height_unit||''}`)
        //     // setProductNameFontSize(`${_product_name_rwd_font_size?.[4]||_product_name_rwd_font_size?.[3]||_product_name_rwd_font_size?.[2]||_product_name_rwd_font_size?.[1]||_product_name_rwd_font_size?.[0]||''}${component?.product_name_rwd_font_size?'px':''}`)
        //     // setPriceFontSize(`${_price_rwd_font_size?.[4]||_price_rwd_font_size?.[3]||_price_rwd_font_size?.[2]||_price_rwd_font_size?.[1]||_price_rwd_font_size?.[0]||''}${component?.price_rwd_font_size?'px':''}`)
        //     // setActionFontSize(`${_action_rwd_font_size?.[4]||_action_rwd_font_size?.[3]||_action_rwd_font_size?.[2]||_action_rwd_font_size?.[1]||_action_rwd_font_size?.[0]||''}${component?.action_rwd_font_size?'px':''}`)

        // }else if(websiteEditorState.windowWidth>=390){
        //     //xs=>mobile
        //     setWidth(`${_rwd_width?.[5]||_rwd_width?.[4]||_rwd_width?.[3]||_rwd_width?.[2]||_rwd_width?.[1]||_rwd_width?.[0]||''}${component?.width_unit||''}`)
        //     setHeight(`${_rwd_height?.[5]||_rwd_height?.[4]||_rwd_height?.[3]||_rwd_height?.[2]||_rwd_height?.[1]||_rwd_height?.[0]||''}${component?.height_unit||''}`)
        //     // setProductNameFontSize(`${_product_name_rwd_font_size?.[5]||_product_name_rwd_font_size?.[4]||_product_name_rwd_font_size?.[3]||_product_name_rwd_font_size?.[2]||_product_name_rwd_font_size?.[1]||_product_name_rwd_font_size?.[0]||''}${component?.product_name_rwd_font_size?'px':''}`)
        //     // setPriceFontSize(`${_price_rwd_font_size?.[5]||_price_rwd_font_size?.[4]||_price_rwd_font_size?.[3]||_price_rwd_font_size?.[2]||_price_rwd_font_size?.[1]||_price_rwd_font_size?.[0]||''}${component?.price_rwd_font_size?'px':''}`)
        //     // setActionFontSize(`${_action_rwd_font_size?.[5]||_action_rwd_font_size?.[4]||_action_rwd_font_size?.[3]||_action_rwd_font_size?.[2]||_action_rwd_font_size?.[1]||_action_rwd_font_size?.[0]||''}${component?.action_rwd_font_size?'px':''}`)

        // }else{
        //     //xxs>mobile
        //     setWidth(`${_rwd_width?.[6]||_rwd_width?.[5]||_rwd_width?.[4]||_rwd_width?.[3]||_rwd_width?.[2]||_rwd_width?.[1]||_rwd_width?.[0]||''}${component?.width_unit||''}`)
        //     setHeight(`${_rwd_height?.[6]||_rwd_height?.[5]||_rwd_height?.[4]||_rwd_height?.[3]||_rwd_height?.[2]||_rwd_height?.[1]||_rwd_height?.[0]||''}${component?.height_unit||''}`)
        //     // setProductNameFontSize(`${_product_name_rwd_font_size?.[6]||_product_name_rwd_font_size?.[5]||_product_name_rwd_font_size?.[4]||_product_name_rwd_font_size?.[3]||_product_name_rwd_font_size?.[2]||_product_name_rwd_font_size?.[1]||_product_name_rwd_font_size?.[0]||''}${component?.product_name_rwd_font_size?'px':''}`)
        //     // setPriceFontSize(`${_price_rwd_font_size?.[6]||_price_rwd_font_size?.[5]||_price_rwd_font_size?.[4]||_price_rwd_font_size?.[3]||_price_rwd_font_size?.[2]||_price_rwd_font_size?.[1]||_price_rwd_font_size?.[0]||''}${component?.price_rwd_font_size?'px':''}`)
        //     // setActionFontSize(`${_action_rwd_font_size?.[6]||_action_rwd_font_size?.[5]||_action_rwd_font_size?.[4]||_action_rwd_font_size?.[3]||_action_rwd_font_size?.[2]||_action_rwd_font_size?.[1]||_action_rwd_font_size?.[0]||''}${component?.action_rwd_font_size?'px':''}`)

        // }
    


    },[ websiteEditorState.windowWidth, websiteEditorState.sideMenuActive, setWidth, setHeight, component])

    // const [ready, setReady] = useState(false)
    // const [categories, setCategories] = useState([])
    const [categoriesReady, setCategoriesReady] = useState(false)

    const searchCategories = ()=>{
        var  _keyword, _page
        customer_search_blog_post_category( _keyword='', _page=1).then(res=>{
            // setCategories(res?.data?.results||[])
            // setCategoriesReady(true)
            console.log(res.data)
            dispatch(setCategories({'categories':res?.data?.results||[], 'categoryTotalRecords':res?.data?.count||0}))
            setCategoriesReady(true)
        })
    }

    useEffect(()=>{
        if(mode=='edit'){
            searchCategories()
        }else if (mode==='prod' && !blog?.categories){
            searchCategories()
        }

    },[mode])


    return (
        
        <div 
            className={clsx(style['blog-side-bar'])}
            style={{
                width:width,
                maxWidth:(component?.max_width||'')+(component?.max_width?component?.max_width_unit:''),

                // height:(component.height||settings?.height?.default||'10')+(component.height_unit||settings?.height_unit?.default||'vh'),

            }}
            onMouseEnter={()=>{setIsHover(true)}}
            onMouseLeave={()=>{setIsHover(false)}}
            >
            
            

            

            <BlogSidebarKingPork categories={blog.categories} categoriesReady={categoriesReady} blogPosts={[]} props={{'height':height, }}/>



        </div>)
};

BlogSideBar.propTypes = {
    component: PropTypes.object,
    mode: PropTypes.string,
    actions: PropTypes.object,
    update: PropTypes.func
};

export default BlogSideBar;




