
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";

import ProductDetailClient from "./ProductDetailClient";
const ProductDetailSSR = ({  

    element, 
    elementProps,
    mode,
    actions,
    object,
    ...props
}) => {
    



    return (<Fragment>
        <ProductDetailClient   element={element}
                elementProps={elementProps} product={object} mode={mode} {...props}/>
    </Fragment>)
    
};

ProductDetailSSR.propTypes = {
};

export default ProductDetailSSR;
