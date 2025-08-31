// import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect ,lazy, useRef } from "react";
import clsx from "clsx";

import {convertToReactProps} from '@/lib/utils/propsConverter.js'
import TypeElement from '@/components/type-element/TypeElement'
import ElementDev from "./ElementDev";
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
            //TODO
        }
        const mergedProps = {
            ...((element?.template||{})?.props||{}),
            ...(element?.props||{}),
            class: [(element?.props?.class||'').replace('\n', ' '), element?.parent_relation_uuid||'', element?.uuid||''].filter(Boolean).join(" "),
        };

        const reactMergedProps = convertToReactProps(mergedProps)

        if(element?.type||element?.template?.type){

            // return <div>{element?.template?.type||element?.type}</div>
            return <Fragment>
                    <TypeElement element={element} elementProps = {reactMergedProps} {...props}/>
                    { props?.mode=='dev' && <ElementDev element={element} {...props}/>}
                </Fragment>
        
        } 

        const TagName = element?.tag_name || element?.template?.tag_name || "div";

        if(!['', null, undefined].includes(element?.inner_html||element?.template?.inner_html)) {
            return <Fragment>
                    <TagName {...reactMergedProps}  dangerouslySetInnerHTML={{ __html: element?.inner_html||element?.template?.inner_html }}/>
                    { props?.mode=='dev' && <ElementDev element={element} {...props}/>}
                </Fragment>
        }

        if((element?.children||[]).length>0) return <Fragment>
                <TagName {...reactMergedProps}>
                    {(element?.children||[]).map((e,i)=><Element key={i} element={e} {...props}/>)}
                </TagName>
                { props?.mode=='dev' && <ElementDev element={element} {...props}/>}
            </Fragment>

        return  <Fragment>
            <TagName {...reactMergedProps}/>
            { props?.mode=='dev' && <ElementDev element={element} {...props}/>}
        </Fragment>

   

    
};

Element.propTypes = {


};

export default Element;
