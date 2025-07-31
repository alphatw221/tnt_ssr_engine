
import PropTypes from "prop-types";
import React, { Fragment, } from "react";

// import {user_retrieve_product} from "@/api/product"
import ProductDetailClient from "./ProductDetailClient";
import { Providers, PersistProvider } from '@/redux/provider'
import {getProductDetail } from '@/fetch/product.js'
import clsx from "clsx";
import style from './ProductDetail.module.scss'

import { isStockSufficient, getProductPrice } from "@/lib/utils/productHelper";


const SingleProduct = ({product})=>{
    const now = new Date().toJSON().slice(0, 10);
    const { 
        isDiscountApplied,
        originalSinglePrice,
        discountSinglePrice,
        originalTotalPrice,
        discountTotalPrice,
        originalMinimumPrice,
        originalMaximumPrice,
        discountMinimumPrice,
        discountMaximumPrice,
        discountMinimumPercent,
        discountMaximumPercent,} = getProductPrice(now, product, 1,  null, null)

   
    return (<div>
            <h1 itemprop="name">{product?.name}</h1>
            {(product?.images||[]).map(product_image=>{
                <img src={product_image?.image}   itemprop="image" alt="商品圖片" />
            })}
            {
                isDiscountApplied ?
                    ['variant', 'compose'].includes(product.type)
                    ?
                    <span >
                        折扣 價格 Discount Price :<strong>{`${discountMinimumPrice} ~ ${discountMaximumPrice}`}</strong>
                    </span>
                    :
                    <span >
                        折扣 價格 Discount Price :<strong>{`${product?.currency_sign||'$'}${discountSinglePrice}`}</strong>
                    </span>
                :
                    ['variant', 'compose'].includes(product.type)
                    ?
                    <span >
                        價格 Price :<strong>{`${originalMinimumPrice} ~ ${originalMaximumPrice}`}</strong>
                    </span>:
                    <span >
                        價格 Price :<strong>{`${product?.currency_sign||'$'}${originalSinglePrice}`}</strong>
                    </span>
            }
            <p itemprop="description">{product.description}</p>
            <div itemprop="content" dangerouslySetInnerHTML={{ __html: product?.content||'' }}></div>
            <div itemprop="spec" dangerouslySetInnerHTML={{ __html: product?.spec||'' }}></div>
    </div>)
}

const ProductDetailSSR = async ({  
    params, searchParams, node,  mode, actions, update, data, children, ...props}) => {
    


    const product = await getProductDetail(params?.object_id)



    return (<Fragment>
        <Providers >
            <PersistProvider>
                <ProductDetailClient product={product} mode={mode} {...props}/>
            </PersistProvider>
        </Providers>
        <div  id={`html_data_${node?.uuid}`}  className={clsx('html-data', style['visually-hidden'])} >
            <SingleProduct product={product}/>
        </div>
    </Fragment>)
    
};

ProductDetailSSR.propTypes = {
};

export default ProductDetailSSR;




