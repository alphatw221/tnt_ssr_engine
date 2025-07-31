"use client"
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import clsx from "clsx";
import style from './ShopGrid.module.scss'
        
import { useAppSelector, useAppDispatch } from "@/redux/hooks";



import ShopGridStandardKingPork from "../../KPpages/shop/ShopGridStandardKingPork";

import { customer_search_product } from "../../api/product";
import { useSearchParams } from 'next/navigation';
import { setProducts } from "@/redux/slices/shop-slice";
import { rwdHelper, RWDPropHandler} from "../../lib/utils/rwdHelper"

import ShopGalleryKingPork from "../../KPpages/shop/ShopGalleryKingPork"

const ShopGrid = ({  
    node,  mode, actions, update, data, children, ...props}) => {


    const dispatch = useAppDispatch()

    const websiteEditorState = useAppSelector((state) => state.website_editor);
    const shop = useAppSelector((state) => state.shop);
    const {websiteSearchParams, searchParamsUpdatedAt} = useAppSelector((state)=>state.estore)



    const [pageLimit, setPageLimit] = useState(25);
    const [page, setPage] = useState(1);


    const searchParams = useSearchParams()


    const searchProducts = (websiteSearchParams)=>{

        var _filter_ids, _filter_categories, _filter_tags, _exclude_ids, _exclude_categories, _exclude_tags, _keyword, _order_by, _page
        customer_search_product(
            _filter_ids='', 
            _filter_categories=(websiteSearchParams?.categories||'') + ',' + (searchParams.get('categories')||''), 
            _filter_tags=(node?.data?._filter_tags||'') + ',' + ( websiteSearchParams?.tags||'') + ',' + (searchParams.get('tags')||''), 
            _exclude_ids='',
            _exclude_categories='',
            _exclude_tags=node?.data?.exclude_tags||'',
            _keyword=(websiteSearchParams?.keyword||'') + ',' + (searchParams.get('keyword')||''), 
            _order_by='priority,updated_at',
             _page=page).then(res=>{
            
            console.log(res?.data)
            dispatch(setProducts({'products':res?.data?.results||[], 'totalRecords':res?.data?.count||0}))


        })
    }





    useEffect(()=>{

        if(data){
            // dispatch(setProducts({'products':data?.results||[], 'totalRecords':data?.count||0}))
        }else{
            searchProducts()
        }
        // if(mode=='edit'){
        //     searchProducts()
        // }else if (mode==='prod'){
           

        // }
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

    const [productOptionHeight, setProductOptionHeight] = useState('')
    const [productOptionNameFontSize, setProductOptionNameFontSize] = useState('')

    const [productOptionDescriptionFontSize, setProductOptionDescriptionFontSize] = useState('')
    const [productOptionDescriptionRight, setProductOptionDescriptionRight] = useState('')
    const [productOptionDescriptionBottom, setProductOptionDescriptionBottom] = useState('')

    const [productOptionPriceDescriptionFontSize, setProductOptionPriceDescriptionFontSize] = useState('')
    const [productOptionPriceDescriptionRight, setProductOptionPriceDescriptionRight] = useState('')
    const [productOptionPriceDescriptionBottom, setProductOptionPriceDescriptionBottom] = useState('')

    useEffect(()=>{


        rwdHelper(
            websiteEditorState.windowWidth, 
            websiteEditorState.sideMenuActive, 
            [
                new RWDPropHandler(node?.data, 'rwd_width', 'width_unit', setWidth),
                new RWDPropHandler(node?.data, 'rwd_height', 'height_unit', setHeight),


                new RWDPropHandler(node?.data, 'product_name_rwd_font_size', 'px', setProductNameFontSize),
                new RWDPropHandler(node?.data, 'price_rwd_font_size', 'px', setPriceFontSize),
                new RWDPropHandler(node?.data, 'price_rwd_line_height', 'px', setPriceLineHeight),
                new RWDPropHandler(node?.data, 'old_price_rwd_line_height', 'px', setOldPriceLineHeight),

                new RWDPropHandler(node?.data, 'action_rwd_font_size', 'px', setActionFontSize),
                new RWDPropHandler(node?.data, 'description_rwd_font_size', 'px', setDescriptionFontSize),


                new RWDPropHandler(node?.data, 'rwd_product_option_height', 'px', setProductOptionHeight),
                new RWDPropHandler(node?.data, 'rwd_product_option_name_font_size', 'px', setProductOptionNameFontSize),

                new RWDPropHandler(node?.data, 'rwd_product_option_price_description_font_size', 'px', setProductOptionPriceDescriptionFontSize),
                new RWDPropHandler(node?.data, 'rwd_product_option_price_description_right', '', setProductOptionPriceDescriptionRight),
                new RWDPropHandler(node?.data, 'rwd_product_option_price_description_bottom', '', setProductOptionPriceDescriptionBottom),

                new RWDPropHandler(node?.data, 'rwd_product_option_description_font_size', 'px', setProductOptionDescriptionFontSize),
                new RWDPropHandler(node?.data, 'rwd_product_option_description_right', '', setProductOptionDescriptionRight),
                new RWDPropHandler(node?.data, 'rwd_product_option_description_bottom', '', setProductOptionDescriptionBottom),


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

        setProductOptionHeight,
        setProductOptionNameFontSize,
        
        setProductOptionPriceDescriptionFontSize, 
        setProductOptionPriceDescriptionRight,
        setProductOptionPriceDescriptionBottom,

        setProductOptionDescriptionFontSize,
        setProductOptionDescriptionRight,
        setProductOptionDescriptionBottom,
        node?.data])







    return (
        
        <div 
            id={props?.id}
            className={
                clsx(
                    props?.className,
                    style['shop-grid']

                )}

            style={{
                ...props?.style||{},
                width:width,
                maxWidth:(node?.data?.max_width||'')+(node?.data?.max_width?node?.data?.max_width_unit:''),

            }}
            >
            
            

            
            <ShopGridStandardKingPork  
                products={shop.products} 
                node={node} 
                totalRecords={shop.productTotalRecords}
                // currentPage={currentPage}
                pageLimit={pageLimit}
                setPage={setPage}
                props={{
                    'height':height, 
                    'productNameFontSize':productNameFontSize, 
                    'priceFontSize':priceFontSize, 
                    'actionFontSize':actionFontSize,
                    'descriptionFontSize':descriptionFontSize,
                    'priceLineHeight':priceLineHeight,
                    'oldPriceLineHeight':oldPriceLineHeight,

                        productOptionHeight:productOptionHeight,
                        productOptionNameFontSize:productOptionNameFontSize,
                        productOptionPriceDescriptionFontSize:productOptionPriceDescriptionFontSize,
                        productOptionPriceDescriptionRight:productOptionPriceDescriptionRight,
                        productOptionPriceDescriptionBottom:productOptionPriceDescriptionBottom,

                        productOptionDescriptionFontSize:productOptionDescriptionFontSize,
                        productOptionDescriptionRight:productOptionDescriptionRight,
                        productOptionDescriptionBottom:productOptionDescriptionBottom,
                    }}
            />


            {children}
        </div>)
};

ShopGrid.propTypes = {
};

export default ShopGrid;




