import PropTypes from "prop-types";
import React, { Fragment } from "react";

import {searchProducts } from "@/fetch/product.js"
import ShopGrid from "@/components/component-instance/ShopGrid.jsx"
import { Providers, PersistProvider } from '@/redux/provider'
import ShopGridPreLoader from '@/components/component-instance/ShopGridPreLoader'
import style from '@/components/component-instance/ShopGrid.module.scss'
import { store } from "@/redux/store"


const ShopGridSEO = async ({  params, searchParams, 
    node,  mode, actions, update, ...props}) => {
    
    
    const productsData = await searchProducts((node?.data?.data_list||[]).map(data=>data.id).join(','), node?.data?.tags)

    
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
            <div className={style['shop-grid-ssr']}>
                {
                    (productsData?.results||[]).map((product, productIndex)=><Fragment key={productIndex}>
                        {(product?.images||[]).map((image,index)=>(<img key={index} src={image?.image}/>))}
                        <h1>{product?.name}</h1>
                        <h2>{`${store.getState()?.estore?.store?.base_currency_sign||'$'}${product?.price}`}</h2>
                        <h3>{`${store.getState()?.estore?.store?.base_currency_sign||'$'}${product?.discount_price}`}</h3>
                        <h4>{product?.short_name}</h4>
                        {(product?.tags||[]).map((tag,index)=>(<span key={index} >{tag}</span>))}
                        <h5>{product?.category_name}</h5>
                        <h6>{product?.sku}</h6>
                        <p>{product?.description}</p>
                    </Fragment>)
                }
                
            </div>
            <Providers >
                <PersistProvider>
                    <ShopGridPreLoader products={productsData?.results||[]} totalRecords={productsData?.count||0}/>
                    <ShopGrid  node={node}  mode={mode} actions={actions} update={update} data={true} {...props}/>
                </PersistProvider>
            </Providers>
        </Fragment>
    )

};

ShopGridSEO.propTypes = {
};

export default ShopGridSEO;




