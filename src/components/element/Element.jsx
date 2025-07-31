// import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect ,lazy, useRef } from "react";
import clsx from "clsx";

import {convertToReactProps} from '@/lib/utils/propsConverter.js'
import TypeElement from '@/components/type-element/TypeElement'
// import ErrorBoundary from '@/components/ErrorBoundary.jsx'
   // parent_relation_uuid
    // uuid


    // template
    // name
    // type 
    

    // tag_name 
    // props 
    // inner_html 
    // data 



const Element = ({ element, ...props}) => {

        if(props?.hideElementDict?.[element?.parent_relation_uuid]) return null

        if(element?.template){
            // console.log(element?.template)
        }
        const mergedProps = {
            ...((element?.template||{})?.props||{}),
            ...(element?.props||{}),
            class: [element?.props?.class||'', element?.parent_relation_uuid||'', element?.uuid||''].filter(Boolean).join(" "),
        };

        const reactMergedProps = convertToReactProps(mergedProps)

        if(element?.template?.type||element?.type){

            // return <div>{element?.template?.type||element?.type}</div>
            return <TypeElement element={element} elementProps = {reactMergedProps} {...props}/>
        
        } 

        const TagName = element?.template?.tag_name || element?.tag_name || "div";

        if(!['', null, undefined].includes(element?.template?.inner_html||element?.inner_html)) {
            return <TagName {...reactMergedProps}  dangerouslySetInnerHTML={{ __html: element?.template?.inner_html||element?.inner_html }}/>
        }

        if((element?.children||[]).length>0) return <TagName {...reactMergedProps}>
            {(element?.children||[]).map((e,i)=><Element key={i} element={e} {...props}/>)}
        </TagName>

        return  <TagName {...reactMergedProps}/>

   

    
};

Element.propTypes = {


};

export default Element;
