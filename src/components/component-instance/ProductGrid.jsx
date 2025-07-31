"use client"
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import clsx from "clsx";
import style from './ProductGrid.module.scss'

// import { useSelector, useDispatch } from "react-redux";     
import { useAppSelector } from "@/redux/hooks";
import { element2json } from "../../lib/utils/element2json";
import ProductGridKingPork from "../../wrappers/product/ProductGridKingPork";

import { customer_search_product } from "../../api/product";

import { rwdHelper, RWDPropHandler} from "../../lib/utils/rwdHelper"

const ProductGrid = ({  
    component,  mode, actions, update}) => {


    // const [width, setWidth] = useState('')
    // const [showSettingsDropDown, setShowSettingsDropDown] = useState(false)
    const websiteEditorState = useAppSelector((state) => state.website_editor);


    const [isHover, setIsHover] = useState(false)
    const [sliderOptions, setSliderOptions] = useState([])

    // const specialSettings=[
    //     {"key": "data_ids", "name": "輪播頁", "type": "multiple_select", "valueType":"integer", "value_key":"id", "name_key":"name", "options":sliderOptions, "default":[]}, 
    // ]

    const [products, setProducts] = useState([])
    // useEffect(()=>{
    //     if(websiteEditorState.sideMenuActive){
    //         setWidth('78vw')
    //     }else{
    //         setWidth('97vw')
    //     }
    // },[websiteEditorState.sideMenuActive , setWidth])





    const [width, setWidth] = useState('')
    const [imageHeight, setImageHeight] = useState('')
    const [imageWidth, setImageWidth] = useState('')
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
                new RWDPropHandler(component, 'image_rwd_height', 'image_height_unit', setImageHeight),

                new RWDPropHandler(component, 'image_rwd_width', '%', setImageWidth),

                new RWDPropHandler(component, 'product_name_rwd_font_size', 'px', setProductNameFontSize),
                new RWDPropHandler(component, 'price_rwd_font_size', 'px', setPriceFontSize),
                new RWDPropHandler(component, 'action_rwd_font_size', 'px', setActionFontSize),
                new RWDPropHandler(component, 'description_rwd_font_size', 'px', setDescriptionFontSize),
            ]
        )



    },[ websiteEditorState.windowWidth, websiteEditorState.sideMenuActive, setWidth, setImageHeight,setImageWidth, setActionFontSize, setPriceFontSize, setProductNameFontSize, component])


    const now = new Date().toJSON().slice(0, 10);

    const searchProducts = ()=>{
        var _filter_ids, _filter_categories, _filter_tags, _exclude_ids, _exclude_categories, _exclude_tags, _keyword, _order_by, _page
        customer_search_product(
                _filter_ids=(component?.data_list||[]).map(data=>data.id).join(','),
                _filter_categories='',
                _filter_tags = component?.filter_tags||'',
                _exclude_ids='',
                _exclude_categories='',
                _exclude_tags=component?.exclude_tags||'',
                _keyword='',
                _order_by='priority,updated_at',
                _page=1
            ).then(res=>{
                // console.log(res.data)
                setProducts(res?.data?.results)
        })
    }
    useEffect(()=>{
        if(mode=='edit'){
            searchProducts()
        }else if (mode==='prod'){
            searchProducts()
    
        }
    },[mode, 
        // searchProducts, 
        component.data_list, component.tags])


    return (
        
        <div 
            className={clsx(style['product-grid'])}
            style={{
                width:width,
                maxWidth:(component?.max_width||'')+(component?.max_width?component?.max_width_unit:''),
                // height:(component.height||settings?.height?.default||'10')+(component.height_unit||settings?.height_unit?.default||'vh'),

            }}
            // onMouseEnter={()=>{setIsHover(true)}}
            // onMouseLeave={()=>{setIsHover(false)}}
            >
            
            


            <ProductGridKingPork  
                products={products} 
                component={component} 
                props={{'imageHeight':imageHeight, 'imageWidth':imageWidth, 'productNameFontSize':productNameFontSize, 'priceFontSize':priceFontSize, 'actionFontSize':actionFontSize, 'descriptionFontSize':descriptionFontSize}}/>




        </div>)
};

ProductGrid.propTypes = {
    component: PropTypes.object,
    mode: PropTypes.string,
    actions: PropTypes.object,
    update: PropTypes.func
};

export default ProductGrid;




