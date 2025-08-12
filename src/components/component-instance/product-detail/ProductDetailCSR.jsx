
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";

import {user_retrieve_product} from "@/api/product"
import ProductDetailClient from "./ProductDetailClient";
const ProductDetailCSR = ({  
    // node,  mode, actions, update, data, children, ...props,


    element, 
    elementProps,
    mode,
    actions,
    ...props
}) => {
    

    const [product, setProduct] = useState(null)
    
    useEffect(()=>{

        if( element?.data?.preview_data?.uuid && product?.uuid!=element?.data?.preview_data?.uuid && actions?.getStoreUUID()){
            user_retrieve_product(actions?.getStoreUUID(), element?.data?.preview_data?.uuid).then(res=>{
                console.log(res.data)
                setProduct(res?.data)
            })
        }
        
    },[product, actions, element?.data?.preview_data])




    return (<Fragment>
        <ProductDetailClient   element={element}
                elementProps={elementProps} product={product} mode={mode} {...props}/>
    </Fragment>)
    
};

ProductDetailCSR.propTypes = {
};

export default ProductDetailCSR;




