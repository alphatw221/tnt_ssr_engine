import PropTypes from "prop-types";
import React, { Fragment, } from "react";
// import clsx from "clsx";
import style from './CKEditor.module.scss'




const KPCKEditorSSR = ({  

    
    element, 
    elementProps,
    mode,
    ...props


}) => {
    

        return ( <p 
           {...elementProps}
            dangerouslySetInnerHTML={{ __html: node?.data?.context }}
        ></p>)

        


   
};

KPCKEditorSSR.propTypes = {
};

export default KPCKEditorSSR;




