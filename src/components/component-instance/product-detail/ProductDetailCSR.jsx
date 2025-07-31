
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";

import {user_retrieve_product} from "@/api/product"
import ProductDetailClient from "./ProductDetailClient";
const ProductDetailCSR = ({  
    node,  mode, actions, update, data, children, ...props}) => {
    

    const [product, setProduct] = useState(null)
    
    useEffect(()=>{

        if( node?.data?.preview_data?.uuid && product?.uuid!=node?.data?.preview_data?.uuid && actions?.getStoreUUID()){
            user_retrieve_product(actions?.getStoreUUID(), node?.data?.preview_data?.uuid).then(res=>{
                console.log(res.data)
                setProduct(res?.data)
            })
        }
        
    },[product, actions, node?.data?.preview_data])




    return (<Fragment>
        <ProductDetailClient product={product} mode={mode} {...props}/>
    </Fragment>)
    
};

ProductDetailCSR.propTypes = {
};

export default ProductDetailCSR;




