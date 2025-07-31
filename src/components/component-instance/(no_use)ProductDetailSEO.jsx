import PropTypes from "prop-types";
import React, { Fragment } from "react";

import {getProductDetail } from "@/fetch/product.js"
import ProductDetail from "@/components/component-instance/ProductDetail.jsx"
import { Providers, PersistProvider } from '@/redux/provider'
import ProductDetailPreLoader from '@/components/component-instance/ProductDetailPreLoader'
import style from './ProductDetail.module.scss'
import { store } from "@/redux/store"

const ProductDetailSEO = async ({  params, searchParams, 
    node,  mode, actions, update, ...props}) => {
    
    const product = await getProductDetail(params?.object_id)


    // name
    // short_name
    // sku
    // tags
    // price
    // // category_name
    // content
    // description
    // discount_end_time
    // discount_price
    // discount_start_time
    // images
    // inventory
    // type
    // variant_products

    return (
        <Fragment>
            <div className={style['product-detail-ssr']}>
                {(product?.images||[]).map((image,index)=>(<img key={index} src={image?.image}/>))}
                <h1>{product?.name}</h1>
                <h2>{`${store.getState()?.estore?.store?.base_currency_sign||'$'}${product?.price}`}</h2>
                <h3>{`${store.getState()?.estore?.store?.base_currency_sign||'$'}${product?.discount_price}`}</h3>
                <h4>{product?.short_name}</h4>
                {(product?.tags||[]).map((tag,index)=>(<span key={index} >{tag}</span>))}
                <h5>{product?.category_name}</h5>
                <h6>{product?.sku}</h6>
                <p>{product?.description}</p>
                <p>{product?.content}</p>
            </div>
            <Providers >
                <PersistProvider>
                    <ProductDetailPreLoader product={product}/>
                    <ProductDetail  node={node}  mode={mode} actions={actions} update={update} data={true} {...props}/>
                </PersistProvider>
            </Providers>
        </Fragment>
    )

};

ProductDetailSEO.propTypes = {
};

export default ProductDetailSEO;




