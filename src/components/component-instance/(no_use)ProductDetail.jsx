"use client"
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import clsx from "clsx";


// import { useSelector, useDispatch } from "react-redux";            
import { useAppSelector, useAppDispatch } from "@/redux/hooks";



import ProductDetail1 from "../../KPpages/shop-product/ProductDetail1"

// import { useParams, useLocation } from "react-router-dom";
import { useParams } from 'next/navigation';

import ProductNotFound from "../../KPpages/other/ProductNotFound"
import {customer_retrieve_product, customer_search_product_reviews} from "../../api/product"
import { setProduct, setProductReveiws } from "@/redux/slices/shop-slice";
import { rwdHelper, RWDPropHandler } from "@/lib/utils/rwdHelper";

const ProductDetail = ({  
    node,  mode, actions, update, data, children, ...props}) => {
    



    // let { pathname } = useLocation();
    let { object_id } = useParams();
  
    const [width, setWidth] = useState('')
    
    const [productOptionHeight, setProductOptionHeight] = useState('')
    const [productOptionNameFontSize, setProductOptionNameFontSize] = useState('')

    const [productOptionDescriptionFontSize, setProductOptionDescriptionFontSize] = useState('')
    const [productOptionDescriptionTop, setProductOptionDescriptionTop] = useState('')
    const [productOptionDescriptionBottom, setProductOptionDescriptionBottom] = useState('')
    const [productOptionDescriptionLeft, setProductOptionDescriptionLeft] = useState('')
    const [productOptionDescriptionRight, setProductOptionDescriptionRight] = useState('')

    const [productOptionPriceDescriptionFontSize, setProductOptionPriceDescriptionFontSize] = useState('')
    const [productOptionPriceDescriptionTop, setProductOptionPriceDescriptionTop] = useState('')
    const [productOptionPriceDescriptionBottom, setProductOptionPriceDescriptionBottom] = useState('')
    const [productOptionPriceDescriptionLeft, setProductOptionPriceDescriptionLeft] = useState('')
    const [productOptionPriceDescriptionRight, setProductOptionPriceDescriptionRight] = useState('')

    const websiteEditorState = useAppSelector((state) => state.website_editor);
    const shop = useAppSelector((state) => state.shop);
    // TODO shop.product => useState


    const [isHover, setIsHover] = useState(false)

    // const [productCommentsCount, setProductCommentsCount] = useState(0)
    // const [productComments, setProductComments] = useState([])
    
    const [productReviewsPage, setProductReviewsPage] = useState(1)


    const dispatch = useAppDispatch()


    useEffect(()=>{
            if(websiteEditorState.sideMenuActive){
                setWidth('80vw')
            }else{
                setWidth('100vw')
            }

    },[websiteEditorState.sideMenuActive, setWidth])

    // const product = (element2json(document.getElementById('ssr_data'))?.products||[]).find(product => product.id === parseInt(object_id));


    useEffect(()=>{


        rwdHelper(
            websiteEditorState.windowWidth, 
            websiteEditorState.sideMenuActive, 
            [
                new RWDPropHandler(node?.data, 'rwd_product_option_height', 'px', setProductOptionHeight),
                new RWDPropHandler(node?.data, 'rwd_product_option_name_font_size', 'px', setProductOptionNameFontSize),

                new RWDPropHandler(node?.data, 'rwd_product_option_price_description_font_size', 'px', setProductOptionPriceDescriptionFontSize),
                new RWDPropHandler(node?.data, 'rwd_product_option_price_description_top', '%', setProductOptionPriceDescriptionTop),
                new RWDPropHandler(node?.data, 'rwd_product_option_price_description_bottom', '%', setProductOptionPriceDescriptionBottom),
                new RWDPropHandler(node?.data, 'rwd_product_option_price_description_left', '%', setProductOptionPriceDescriptionLeft),
                new RWDPropHandler(node?.data, 'rwd_product_option_price_description_right', '%', setProductOptionPriceDescriptionRight),

                new RWDPropHandler(node?.data, 'rwd_product_option_description_font_size', 'px', setProductOptionDescriptionFontSize),
                new RWDPropHandler(node?.data, 'rwd_product_option_description_top', '%', setProductOptionDescriptionTop),
                new RWDPropHandler(node?.data, 'rwd_product_option_description_bottom', '%', setProductOptionDescriptionBottom),
                new RWDPropHandler(node?.data, 'rwd_product_option_description_left', '%', setProductOptionDescriptionLeft),
                new RWDPropHandler(node?.data, 'rwd_product_option_description_right', '%', setProductOptionDescriptionRight),

            ]
        )

    },[ websiteEditorState.windowWidth, websiteEditorState.sideMenuActive, 

        setProductOptionHeight,
        setProductOptionNameFontSize,
        
        setProductOptionPriceDescriptionFontSize, 
        setProductOptionPriceDescriptionTop,
        setProductOptionPriceDescriptionBottom,
        setProductOptionPriceDescriptionLeft,
        setProductOptionPriceDescriptionRight,

        setProductOptionDescriptionFontSize,
        setProductOptionDescriptionTop,
        setProductOptionDescriptionBottom,
        setProductOptionDescriptionLeft,
        setProductOptionDescriptionRight,


        node?.data])



    const retrieveProduct = ()=>{

        if([undefined, null, '', 'undefined', 'null'].includes(object_id)) return

        var _product_uuid
        customer_retrieve_product(_product_uuid=object_id).then(res=>{

            console.log(res.data)
            dispatch(setProduct(res?.data))

        })
    }

    useEffect(()=>{
        if(data){
            // dispatch(setProduct(data))
        }else if(shop?.product?.uuid!=object_id){
            retrieveProduct()
        }
        // if (mode==='prod'){
        //     if(shop?.product?.uuid!=object_id){
        //         retrieveProduct()
        //     }
        // }
    },[])

    useEffect(()=>{
        var _product_uuid
        if (mode==='edit' && node?.data?.preview_data?.uuid && shop?.product?.uuid!=node?.data?.preview_data?.uuid){
            customer_retrieve_product(_product_uuid=node?.data?.preview_data?.uuid).then(res=>{

                console.log(res.data)
                dispatch(setProduct(res?.data))
    
            })
        }
    },[mode, node?.data?.preview_data])

    useEffect(()=>{

        if(shop?.product?.enable_review == true){
            var _product_uuid, _order_by, _page
            customer_search_product_reviews(_product_uuid=object_id, _order_by='-created_at', _page=productReviewsPage).then(res=>{
                dispatch(setProductReveiws({'productReviews':res?.data?.results||[], 'totalRecords':res?.data.count||0}))

            })
        }
    },[shop?.product?.enable_review, productReviewsPage])


    if(!shop.product ){
        return (
            <div style={{width:width,maxWidth:(node?.data?.max_width||'')+(node?.data?.max_width?node?.data?.max_width_unit:'')}}>
                <ProductNotFound />
            </div>
        )
    }
    return (
        
        <div 
            id={props?.id}
            className={
                clsx(
                    props?.className,
                )}
            style={{
                ...props?.style||{},
                width:width,maxWidth:(node?.data?.max_width||'')+(node?.data?.max_width?node?.data?.max_width_unit:'')
            }}
            >
                <ProductDetail1 
                    product={shop.product} 
                    node={node} 

                    productReviewsPage={productReviewsPage}
                    setProductReviewsPage={setProductReviewsPage}

                    props={{
                        productOptionHeight:productOptionHeight,
                        productOptionNameFontSize:productOptionNameFontSize,
                        productOptionPriceDescriptionFontSize:productOptionPriceDescriptionFontSize,
                        productOptionPriceDescriptionTop:productOptionPriceDescriptionTop,
                        productOptionPriceDescriptionBottom:productOptionPriceDescriptionBottom,
                        productOptionPriceDescriptionLeft:productOptionPriceDescriptionLeft,
                        productOptionPriceDescriptionRight:productOptionPriceDescriptionRight,

                        productOptionDescriptionFontSize:productOptionDescriptionFontSize,
                        productOptionDescriptionTop:productOptionDescriptionTop,
                        productOptionDescriptionBottom:productOptionDescriptionBottom,
                        productOptionDescriptionLeft:productOptionDescriptionLeft,
                        productOptionDescriptionRight:productOptionDescriptionRight,


                    }}
                />
                {children}
        </div>)
};

ProductDetail.propTypes = {
};

export default ProductDetail;




