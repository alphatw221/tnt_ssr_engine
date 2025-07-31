import PropTypes from "prop-types";
import React, { Fragment} from "react";
import clsx from "clsx";
import style from './Video.module.scss'


import {  getRWDStyles} from "@/lib/utils/rwdHelper"
import  Link  from 'next/link';
import { rgba2hex } from "@/lib/utils/rgba2hex";

const Video = ({  
    node,  mode, actions, children, ...props}) => {

   

    const _style = {
        ...props?.style||{},
        ...getRWDStyles('width', node?.data?.rwd_width, node?.data?.width_unit),
        ...getRWDStyles('max-width', node?.data?.rwd_max_width, node?.data?.max_width_unit),
        ...getRWDStyles('min-width', node?.data?.rwd_min_width, node?.data?.min_width_unit),

        ...getRWDStyles('height', node?.data?.rwd_height, node?.data?.height_unit),
        ...getRWDStyles('max-height', node?.data?.rwd_max_height, node?.data?.max_height_unit),
        ...getRWDStyles('min-height', node?.data?.rwd_min_height, node?.data?.min_height_unit),

        ...getRWDStyles('object-position', node?.data?.object_position),
        ...getRWDStyles('object-fit', node?.data?.object_fit),

 
    }

    const _video = (
            <Fragment >
                 <video
                    autoPlay
                    loop
                    muted
                    id={props?.id}  
                    className={
                        clsx(
                            props?.className,
                            style['video']
                        )}
                    style={_style}
                  
                    
                >
                    <source src={node?.data?.video} type="video/mp4"></source>
                </video>
                {children}
            </Fragment>
           
        )
    

    if(node?.data?.href){

        if(node?.data?.href?.[0]==='/'){
            <Link href={node?.data?.href}>
                {_video}
            </Link>
        }

        return (
            <a href={node?.data?.href}>
                {_video}
            </a>
        )
    }

    return (
    <Fragment>
        {_video}
    </Fragment>)





   
};

Video.propTypes = {

};

export default Video;




