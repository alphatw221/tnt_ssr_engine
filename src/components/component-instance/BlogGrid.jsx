"use client"
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import clsx from "clsx";
import style from './BlogGrid.module.scss'

// import { useSelector, useDispatch } from "react-redux";            
import { useAppSelector, useAppDispatch } from "@/redux/hooks";

// import ParameterizeForm from "../parameterize-form/ParameterizeForm";

// import ComponentSettingsDropdown from "../component/component-settings-dropdown/ComponentSettingsDropdown";
// import HeroSliderKingPork from "../../wrappers/hero-slider/HeroSliderKingPork";




import BlogPostGrid from "../../wrappers/blog/BlogPostGrid"

import { customer_search_blog_post } from "../../api/blog_post"
// import { useSearchParams } from "react-router-dom";
import { useSearchParams } from 'next/navigation';
import { setProducts } from "@/redux/slices/shop-slice";
import { setBlogPosts } from "@/redux/slices/blog-slice";
import { rwdHelper, RWDPropHandler} from "../../lib/utils/rwdHelper"

const BlogGrid = ({  
    component,  mode, actions, update}) => {


    const dispatch = useAppDispatch()

    const websiteEditorState = useAppSelector((state) => state.website_editor);
    const shop = useAppSelector((state) => state.shop);
    const blog = useAppSelector((state)=> state.blog)

    const [isHover, setIsHover] = useState(false)

    
    // const [products, setProducts] = useState([])

    const [pageLimit, setPageLimit] = useState(25);
    const [page, setPage] = useState(1);

    // const [totalRecords, setTotalRecords] = useState(0)

    // let [searchParams, setSearchParams] = useSearchParams();
    const searchParams = useSearchParams()
    // const [page, setPage] = useState(searchParams.get('page')||1)
    // const [keyword, setKeyword] = useState(searchParams.get('keyword'))
    // const [categories, setCategories] = useState(searchParams.get('categories'))

    // const setCurrentPage = (page)=>{
    //     if(page && page!=)
    // }

    const searchBlogPosts = ()=>{

        var _filter_categories, _filter_tags, _keyword, _order_by, _page
        customer_search_blog_post(_filter_categories=searchParams.get('categories'), _filter_tags='', _keyword=searchParams.get('keyword'), _order_by='', _page=page).then(res=>{
            // setProducts(res?.data?.results||[])
            // setTotalRecords(res?.data?.count||0)
            console.log(res.data)
            dispatch(setBlogPosts({'blogPosts':res?.data?.results||[], 'totalRecords':res?.data?.count||0}))


        })
    }


    // useEffect(()=>{

    //     var requireUpdate = false
    //     if((searchParams.get('page') && searchParams.get('page')!=page)){

    //         setPage(searchParams.get('page'))
    //         requireUpdate = true
    //     }
    //     if(searchParams.get('keyword')!=keyword){

    //         setKeyword(searchParams.get('keyword'))
    //         requireUpdate = true
    //     }

    //     if(searchParams.get('categories')!=categories){

    //         setCategories(searchParams.get('categories'))
    //         requireUpdate = true
    //     }        
    //     if(requireUpdate){
    //         searchProducts()
    //     }

        
    // }, [searchParams, page, keyword, categories])


    useEffect(()=>{
        if(mode=='edit'){
            searchBlogPosts()
        }else if (mode==='prod' && !blog?.blogPosts){
            searchBlogPosts()
        }
    },[mode])

    



    const [width, setWidth] = useState('')
    const [height, setHeight] = useState('')
    const [productNameFontSize, setProductNameFontSize] = useState('')
    const [priceFontSize, setPriceFontSize] = useState('')
    const [actionFontSize, setActionFontSize] = useState('')
    const [descriptionFontSize, setDescriptionFontSize] = useState('')



    useEffect(()=>{

        rwdHelper(
            websiteEditorState.windowWidth, 
            websiteEditorState.sideMenuActive, 
            [
                new RWDPropHandler(component, 'rwd_width', 'width_unit', setWidth),
                new RWDPropHandler(component, 'rwd_height', 'height_unit', setHeight),

                new RWDPropHandler(component, 'product_name_rwd_font_size', 'px', setProductNameFontSize),
                new RWDPropHandler(component, 'price_rwd_font_size', 'px', setPriceFontSize),
                new RWDPropHandler(component, 'action_rwd_font_size', 'px', setActionFontSize),
                new RWDPropHandler(component, 'description_rwd_font_size', 'px', setDescriptionFontSize),
            ]
        )


        // // const _rwd_font_size = (component.rwd_font_size||'').split(',')
        // const _rwd_width = (component.rwd_width||'').split(',')
        // const _rwd_height = (component.rwd_height||'').split(',')
        // const _product_name_rwd_font_size = (component.product_name_rwd_font_size||'').split(',')
        // const _price_rwd_font_size = (component.price_rwd_font_size||'').split(',')
        // const _action_rwd_font_size = (component.action_rwd_font_size||'').split(',')
        // const _description_rwd_font_size = (component.description_rwd_font_size||'').split(',')

        // // const _rwd_line_height = (component.rwd_line_height||'').split(',')

        // if(websiteEditorState.windowWidth>=1536){
        //     //2xl
        //     // setFontSize(`${_rwd_font_size?.[0]||'12'}${component?.rwd_font_size?'px':''}`)
        //     setWidth(`${_rwd_width?.[0]||''}${component?.width_unit||''}`)
        //     setHeight(`${_rwd_height?.[0]||''}${component?.height_unit||''}`)
        //     setProductNameFontSize(`${_product_name_rwd_font_size?.[0]||''}${component?.product_name_rwd_font_size?'px':''}`)
        //     setPriceFontSize(`${_price_rwd_font_size?.[0]||''}${component?.price_rwd_font_size?'px':''}`)
        //     setActionFontSize(`${_action_rwd_font_size?.[0]||''}${component?.action_rwd_font_size?'px':''}`)
        //     setDescriptionFontSize(`${_description_rwd_font_size?.[0]||''}${component?.description_rwd_font_size?'px':''}`)

        // }else if(websiteEditorState.windowWidth>=1280){
        //     //xl
        //     // setFontSize(`${_rwd_font_size?.[1]||_rwd_font_size?.[0]||'12'}${component?.rwd_font_size?'px':''}`)
        //     setWidth(`${_rwd_width?.[1]||_rwd_width?.[0]||''}${component?.width_unit||''}`)
        //     setHeight(`${_rwd_height?.[1]||_rwd_height?.[0]||''}${component?.height_unit||''}`)
        //     setProductNameFontSize(`${_product_name_rwd_font_size?.[1]||_product_name_rwd_font_size?.[0]||''}${component?.product_name_rwd_font_size?'px':''}`)
        //     setPriceFontSize(`${_price_rwd_font_size?.[1]||_price_rwd_font_size?.[0]||''}${component?.price_rwd_font_size?'px':''}`)
        //     setActionFontSize(`${_action_rwd_font_size?.[1]||_action_rwd_font_size?.[0]||''}${component?.action_rwd_font_size?'px':''}`)
        //     setDescriptionFontSize(`${_description_rwd_font_size?.[1]||_description_rwd_font_size?.[0]||''}${component?.description_rwd_font_size?'px':''}`)

        // }else if(websiteEditorState.windowWidth>=1024){
        //     //lg
        //     // setFontSize(`${_rwd_font_size?.[2]||_rwd_font_size?.[1]||_rwd_font_size?.[0]||'12'}${component?.rwd_font_size?'px':''}`)
        //     setWidth(`${_rwd_width?.[2]||_rwd_width?.[1]||_rwd_width?.[0]||''}${component?.width_unit||''}`)
        //     setHeight(`${_rwd_height?.[2]||_rwd_height?.[1]||_rwd_height?.[0]||''}${component?.height_unit||''}`)
        //     setProductNameFontSize(`${_product_name_rwd_font_size?.[2]||_product_name_rwd_font_size?.[1]||_product_name_rwd_font_size?.[0]||''}${component?.product_name_rwd_font_size?'px':''}`)
        //     setPriceFontSize(`${_price_rwd_font_size?.[2]||_price_rwd_font_size?.[1]||_price_rwd_font_size?.[0]||''}${component?.price_rwd_font_size?'px':''}`)
        //     setActionFontSize(`${_action_rwd_font_size?.[2]||_action_rwd_font_size?.[1]||_action_rwd_font_size?.[0]||''}${component?.action_rwd_font_size?'px':''}`)
        //     setDescriptionFontSize(`${_description_rwd_font_size?.[2]||_description_rwd_font_size?.[1]||_description_rwd_font_size?.[0]||''}${component?.description_rwd_font_size?'px':''}`)

        // }else if(websiteEditorState.windowWidth>=768){
        //     //md>tablet
        //     // setFontSize(`${_rwd_font_size?.[3]||_rwd_font_size?.[2]||_rwd_font_size?.[1]||_rwd_font_size?.[0]||'12'}${component?.rwd_font_size?'px':''}`)
        //     setWidth(`${_rwd_width?.[3]||_rwd_width?.[2]||_rwd_width?.[1]||_rwd_width?.[0]||''}${component?.width_unit||''}`)
        //     setHeight(`${_rwd_height?.[3]||_rwd_height?.[2]||_rwd_height?.[1]||_rwd_height?.[0]||''}${component?.height_unit||''}`)
        //     setProductNameFontSize(`${_product_name_rwd_font_size?.[3]||_product_name_rwd_font_size?.[2]||_product_name_rwd_font_size?.[1]||_product_name_rwd_font_size?.[0]||''}${component?.product_name_rwd_font_size?'px':''}`)
        //     setPriceFontSize(`${_price_rwd_font_size?.[3]||_price_rwd_font_size?.[2]||_price_rwd_font_size?.[1]||_price_rwd_font_size?.[0]||''}${component?.price_rwd_font_size?'px':''}`)
        //     setActionFontSize(`${_action_rwd_font_size?.[3]||_action_rwd_font_size?.[2]||_action_rwd_font_size?.[1]||_action_rwd_font_size?.[0]||''}${component?.action_rwd_font_size?'px':''}`)
        //     setDescriptionFontSize(`${_description_rwd_font_size?.[3]||_description_rwd_font_size?.[2]||_description_rwd_font_size?.[1]||_description_rwd_font_size?.[0]||''}${component?.description_rwd_font_size?'px':''}`)

        // }else if(websiteEditorState.windowWidth>=640){
        //     //sm=>tablet
        //     // setFontSize(`${_rwd_font_size?.[4]||_rwd_font_size?.[3]||_rwd_font_size?.[2]||_rwd_font_size?.[1]||_rwd_font_size?.[0]||'12'}${component?.rwd_font_size?'px':''}`)
        //     setWidth(`${_rwd_width?.[4]||_rwd_width?.[3]||_rwd_width?.[2]||_rwd_width?.[1]||_rwd_width?.[0]||''}${component?.width_unit||''}`)
        //     setHeight(`${_rwd_height?.[4]||_rwd_height?.[3]||_rwd_height?.[2]||_rwd_height?.[1]||_rwd_height?.[0]||''}${component?.height_unit||''}`)
        //     setProductNameFontSize(`${_product_name_rwd_font_size?.[4]||_product_name_rwd_font_size?.[3]||_product_name_rwd_font_size?.[2]||_product_name_rwd_font_size?.[1]||_product_name_rwd_font_size?.[0]||''}${component?.product_name_rwd_font_size?'px':''}`)
        //     setPriceFontSize(`${_price_rwd_font_size?.[4]||_price_rwd_font_size?.[3]||_price_rwd_font_size?.[2]||_price_rwd_font_size?.[1]||_price_rwd_font_size?.[0]||''}${component?.price_rwd_font_size?'px':''}`)
        //     setActionFontSize(`${_action_rwd_font_size?.[4]||_action_rwd_font_size?.[3]||_action_rwd_font_size?.[2]||_action_rwd_font_size?.[1]||_action_rwd_font_size?.[0]||''}${component?.action_rwd_font_size?'px':''}`)
        //     setDescriptionFontSize(`${_description_rwd_font_size?.[4]||_description_rwd_font_size?.[3]||_description_rwd_font_size?.[2]||_description_rwd_font_size?.[1]||_description_rwd_font_size?.[0]||''}${component?.description_rwd_font_size?'px':''}`)

        // }else if(websiteEditorState.windowWidth>=390){
        //     //xs=>mobile
        //     setWidth(`${_rwd_width?.[5]||_rwd_width?.[4]||_rwd_width?.[3]||_rwd_width?.[2]||_rwd_width?.[1]||_rwd_width?.[0]||''}${component?.width_unit||''}`)
        //     setHeight(`${_rwd_height?.[5]||_rwd_height?.[4]||_rwd_height?.[3]||_rwd_height?.[2]||_rwd_height?.[1]||_rwd_height?.[0]||''}${component?.height_unit||''}`)
        //     setProductNameFontSize(`${_product_name_rwd_font_size?.[5]||_product_name_rwd_font_size?.[4]||_product_name_rwd_font_size?.[3]||_product_name_rwd_font_size?.[2]||_product_name_rwd_font_size?.[1]||_product_name_rwd_font_size?.[0]||''}${component?.product_name_rwd_font_size?'px':''}`)
        //     setPriceFontSize(`${_price_rwd_font_size?.[5]||_price_rwd_font_size?.[4]||_price_rwd_font_size?.[3]||_price_rwd_font_size?.[2]||_price_rwd_font_size?.[1]||_price_rwd_font_size?.[0]||''}${component?.price_rwd_font_size?'px':''}`)
        //     setActionFontSize(`${_action_rwd_font_size?.[5]||_action_rwd_font_size?.[4]||_action_rwd_font_size?.[3]||_action_rwd_font_size?.[2]||_action_rwd_font_size?.[1]||_action_rwd_font_size?.[0]||''}${component?.action_rwd_font_size?'px':''}`)
        //     setDescriptionFontSize(`${_description_rwd_font_size?.[5]||_description_rwd_font_size?.[4]||_description_rwd_font_size?.[3]||_description_rwd_font_size?.[2]||_description_rwd_font_size?.[1]||_description_rwd_font_size?.[0]||''}${component?.description_rwd_font_size?'px':''}`)

        // }else{
        //     //xxs>mobile
        //     setWidth(`${_rwd_width?.[6]||_rwd_width?.[5]||_rwd_width?.[4]||_rwd_width?.[3]||_rwd_width?.[2]||_rwd_width?.[1]||_rwd_width?.[0]||''}${component?.width_unit||''}`)
        //     setHeight(`${_rwd_height?.[6]||_rwd_height?.[5]||_rwd_height?.[4]||_rwd_height?.[3]||_rwd_height?.[2]||_rwd_height?.[1]||_rwd_height?.[0]||''}${component?.height_unit||''}`)
        //     setProductNameFontSize(`${_product_name_rwd_font_size?.[6]||_product_name_rwd_font_size?.[5]||_product_name_rwd_font_size?.[4]||_product_name_rwd_font_size?.[3]||_product_name_rwd_font_size?.[2]||_product_name_rwd_font_size?.[1]||_product_name_rwd_font_size?.[0]||''}${component?.product_name_rwd_font_size?'px':''}`)
        //     setPriceFontSize(`${_price_rwd_font_size?.[6]||_price_rwd_font_size?.[5]||_price_rwd_font_size?.[4]||_price_rwd_font_size?.[3]||_price_rwd_font_size?.[2]||_price_rwd_font_size?.[1]||_price_rwd_font_size?.[0]||''}${component?.price_rwd_font_size?'px':''}`)
        //     setActionFontSize(`${_action_rwd_font_size?.[6]||_action_rwd_font_size?.[5]||_action_rwd_font_size?.[4]||_action_rwd_font_size?.[3]||_action_rwd_font_size?.[2]||_action_rwd_font_size?.[1]||_action_rwd_font_size?.[0]||''}${component?.action_rwd_font_size?'px':''}`)
        //     setDescriptionFontSize(`${_description_rwd_font_size?.[6]||_description_rwd_font_size?.[5]||_description_rwd_font_size?.[4]||_description_rwd_font_size?.[3]||_description_rwd_font_size?.[2]||_description_rwd_font_size?.[1]||_description_rwd_font_size?.[0]||''}${component?.description_rwd_font_size?'px':''}`)

        // }
    


    },[ websiteEditorState.windowWidth, websiteEditorState.sideMenuActive, setWidth, setHeight,setActionFontSize,setPriceFontSize,setProductNameFontSize, component])







    return (
        
        <div 
            className={clsx(style['blog-grid'])}
            style={{
                width:width,
                maxWidth:(component?.max_width||'')+(component?.max_width?component?.max_width_unit:''),

                // height:(component.height||settings?.height?.default||'10')+(component.height_unit||settings?.height_unit?.default||'vh'),

            }}
            onMouseEnter={()=>{setIsHover(true)}}
            onMouseLeave={()=>{setIsHover(false)}}
            >
            
            

            
            <BlogPostGrid  
                blogPosts={blog.blogPosts}
                component={component} 
                totalRecords={blog.blogPostTotalRecords}
                // currentPage={currentPage}
                pageLimit={pageLimit}
                setPage={setPage}
                props={{
                    'height':height, 
                    'productNameFontSize':productNameFontSize, 
                    'priceFontSize':priceFontSize, 
                    'actionFontSize':actionFontSize,
                    'descriptionFontSize':descriptionFontSize
                    }}
            />



        </div>)
};

BlogGrid.propTypes = {
    component: PropTypes.object,
    mode: PropTypes.string,
    actions: PropTypes.object,
    update: PropTypes.func
};

export default BlogGrid;




