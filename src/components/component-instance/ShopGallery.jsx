"use client"
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import clsx from "clsx";
import style from './ShopGrid.module.scss'

// import { useSelector, useDispatch } from "react-redux";            
import { useAppSelector, useAppDispatch } from "@/redux/hooks";

// import ParameterizeForm from "../parameterize-form/ParameterizeForm";

// import ComponentSettingsDropdown from "../component/component-settings-dropdown/ComponentSettingsDropdown";
// import HeroSliderKingPork from "../../wrappers/hero-slider/HeroSliderKingPork";



import ShopGridStandardKingPork from "../../KPpages/shop/ShopGridStandardKingPork";

import { customer_search_product } from "../../api/product";
// import { useSearchParams } from "react-router-dom";
import { useSearchParams } from 'next/navigation';
import { setProducts } from "@/redux/slices/shop-slice";
import { rwdHelper, RWDPropHandler} from "../../lib/utils/rwdHelper"

import ShopGalleryKingPork from "../../KPpages/shop/ShopGalleryKingPork"

const ShopGallery = ({  
    component,  mode, actions, update}) => {


    const dispatch = useAppDispatch()

    const websiteEditorState = useAppSelector((state) => state.website_editor);
    const shop = useAppSelector((state) => state.shop);
    const {websiteSearchParams, searchParamsUpdatedAt} = useAppSelector((state)=>state.estore)

    // const [isHover, setIsHover] = useState(false)

    
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

    const searchProducts = (websiteSearchParams)=>{

        var _filter_ids, _filter_categories, _filter_tags, _exclude_ids, _exclude_categories, _exclude_tags, _keyword, _order_by, _page
        customer_search_product(
            _filter_ids='', 
            _filter_categories=websiteSearchParams?(websiteSearchParams?.['categories']||''):searchParams.get('categories'), 
            _filter_tags=websiteSearchParams? (component?._filter_tags||'') + ',' + (websiteSearchParams?.['tags']||''): (component?._filter_tags||'') + ',' +searchParams.get('tags'), 
            _exclude_ids='',
            _exclude_categories='',
            _exclude_tags=component?.exclude_tags||'',
            _keyword=websiteSearchParams?(websiteSearchParams?.['keyword']||''):searchParams.get('keyword'), 
            _order_by='priority,updated_at',
             _page=page).then(res=>{
            // setProducts(res?.data?.results||[])
            // setTotalRecords(res?.data?.count||0)

            dispatch(setProducts({'products':res?.data?.results||[], 'totalRecords':res?.data?.count||0}))


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
            searchProducts()
        }else if (mode==='prod'){
           

        }
    },[])

    useEffect(()=>{
        if(searchParamsUpdatedAt){

            searchProducts(websiteSearchParams)

        }
    },[searchParamsUpdatedAt])



    const [width, setWidth] = useState('')
    const [height, setHeight] = useState('')
    const [productNameFontSize, setProductNameFontSize] = useState('')
    const [priceFontSize, setPriceFontSize] = useState('')
    const [priceLineHeight, setPriceLineHeight] = useState('')
    const [oldPriceLineHeight, setOldPriceLineHeight] = useState('')
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
                new RWDPropHandler(component, 'price_rwd_line_height', 'px', setPriceLineHeight),
                new RWDPropHandler(component, 'old_price_rwd_line_height', 'px', setOldPriceLineHeight),

                new RWDPropHandler(component, 'action_rwd_font_size', 'px', setActionFontSize),
                new RWDPropHandler(component, 'description_rwd_font_size', 'px', setDescriptionFontSize),
            ]
        )

    },[ websiteEditorState.windowWidth, websiteEditorState.sideMenuActive, 
        setWidth, 
        setHeight,
        setActionFontSize,
        setPriceFontSize,
        setProductNameFontSize, 
        setPriceLineHeight,
        setOldPriceLineHeight,
        component])







    return (
        
        <div 
            className={clsx(style['shop-grid'])}
            style={{
                width:width,
                maxWidth:(component?.max_width||'')+(component?.max_width?component?.max_width_unit:''),

            }}
            >
            
            

            
            <ShopGalleryKingPork  
                products={shop.products} 
                component={component} 
                totalRecords={shop.productTotalRecords}
                pageLimit={pageLimit}
                setPage={setPage}
                props={{
                    'height':height, 
                    'productNameFontSize':productNameFontSize, 
                    'priceFontSize':priceFontSize, 
                    'actionFontSize':actionFontSize,
                    'descriptionFontSize':descriptionFontSize,
                    'priceLineHeight':priceLineHeight,
                    'oldPriceLineHeight':oldPriceLineHeight
                    }}
            />



        </div>)
};

ShopGallery.propTypes = {
    component: PropTypes.object,
    mode: PropTypes.string,
    actions: PropTypes.object,
    update: PropTypes.func
};

export default ShopGallery;




