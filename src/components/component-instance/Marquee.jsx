import PropTypes from "prop-types";
import React, { Fragment} from "react";
import clsx from "clsx";
import style from './Marquee.module.scss'

import { getRWDStyles} from "@/lib/utils/rwdHelper"

const Marquee = ({  
    node,  mode, actions, children, ...props}) => {

    return (
        <Fragment
        >

            
            <marquee 
                id={props?.id}
                className={
                    clsx(
                        props?.className,
                        style['marquee']

                    )}
                style={{
                    ...props?.style||{},
                    ...getRWDStyles('width', node?.data?.rwd_width, node?.data?.width_unit),
                    ...getRWDStyles('max-width', node?.data?.rwd_max_width, node?.data?.max_width_unit),
                    ...getRWDStyles('min-width', node?.data?.rwd_min_width, node?.data?.min_width_unit),
            
                    ...getRWDStyles('height', node?.data?.rwd_height, node?.data?.height_unit),
                    ...getRWDStyles('max-height', node?.data?.rwd_max_height, node?.data?.max_height_unit),
                    ...getRWDStyles('min-height', node?.data?.rwd_min_height, node?.data?.min_height_unit),

                    ...getRWDStyles('line-height', node?.data?.rwd_line_height, 'px'),
                    ...getRWDStyles('font-size', node?.data?.marquee_rwd_font_size, 'px'),

                    color:node?.data.marquee_font_color?`rgba(${node?.data.marquee_font_color.r}, ${node?.data.marquee_font_color.g}, ${node?.data.marquee_font_color.b}, ${node?.data.marquee_font_color.a})`:'',
                    fontFamily:node?.data?.marquee_font_family||'',
                    fontWeight:node?.data?.marquee_font_weight||'',

                }}
                >
                {node?.data.context}
                
            </marquee>
            {children}
        </Fragment>

    )
};

Marquee.propTypes = {
};

export default Marquee;




