
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";

import {customer_retrieve_product} from "@/api/product"
import ProductDetailClient from "./ProductDetailClient";
const ProductDetailSSR = ({

    element,
    elementProps,
    mode,
    actions,
    object,
    ...props
}) => {

    const [product, setProduct] = useState(object)

    //因為商品有時效性 特價期間 庫存 ...等等 hydrate完需要再fetch一次更新
    useEffect(() => {
        customer_retrieve_product(product?.uuid).then(res=>{
            setProduct(res.data)
        })
    }, [])



    return (<Fragment>
        <ProductDetailClient   element={element}
                elementProps={elementProps} product={product} mode={mode} {...props}/>
    </Fragment>)

};

ProductDetailSSR.propTypes = {
};

export default ProductDetailSSR;
