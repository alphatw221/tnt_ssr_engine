import PropTypes from "prop-types";
import React, { Fragment} from "react";
import clsx from "clsx";
import style from './Image.module.scss'


import {  getRWDStyles} from "@/lib/utils/rwdHelper"
import  Link  from 'next/link';
import { rgba2hex } from "@/lib/utils/rgba2hex";

const Image = ({  
    // pageIndex, fragmentIndex, rowIndex, columnIndex, columnRowIndex, 
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

    const _img = (
            <Fragment >
                <img
                    id={props?.id}  className={
                        clsx(
                            props?.className,
                            style['image']
                        )}
                    style={_style}
                    src={node?.data?.image}
                    alt={node?.data?.alt||''}
                />
                {children}
            </Fragment>
        )
    
    if(mode=='edit'){
        return (
            <Fragment>
                {_img}
            </Fragment>)
    }
    if(node?.data?.href){

        if(node?.data?.href?.[0]==='/'){
            return (
            <Link href={(node?.data?.href||'')} >
                {_img}
            </Link>)
        }

        return (
            <a href={(node?.data?.href||null)} >
                {_img}
            </a>
        )
    }

    return (
    <Fragment>
        {_img}
    </Fragment>)





   
};

Image.propTypes = {

};

export default Image;




