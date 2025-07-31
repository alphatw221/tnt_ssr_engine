"use client"
import PropTypes from "prop-types";
import React, { Fragment} from "react";
import clsx from "clsx";



import { useRouter } from 'next/navigation';

const KPLinkClient = ({href, func, scroll_to, scroll_into_view_block, scroll_into_view_inline, mode, children, ...props}) => {

    const router = useRouter()
    // if(mode==='edit') return (<Fragment>
    //     {children}
    // </Fragment>)
    return (<a 
        id={props?.id}
        style={props?.style}
        className={props?.className}
        // href='#'
        onClick={(e)=>{
            // console.log(e)
            if(mode=='edit')return
            
            e.preventDefault();
            if(func=='previous_page'){
                router.back()
            }else if(func=='next_page'){
                router.forward()
            }else if(func=='refresh'){
                console.log('refresh')
                // router.refresh()
                window?.location?.reload();
            }else if(func=='scroll_to'){
                console.log(`node_${scroll_to}`)
                const element = document.getElementById(`node_${scroll_to}`)
                if(element){
                    element.scrollIntoView({ behavior: "smooth", block: scroll_into_view_block||'end', inline: scroll_into_view_inline||"center" });
                }
            }
        }}
    >
        {children}

    </a>)
    
};

KPLinkClient.propTypes = {

};

export default KPLinkClient;



