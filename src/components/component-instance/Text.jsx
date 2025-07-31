import PropTypes from "prop-types";
// import React, { Fragment, useState, useEffect } from "react";
import clsx from "clsx";
import style from './Text.module.scss'

// import {dragItems, dragItemTypes} from '../../lib/dragItems'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHouse, faGear, faBars } from '@fortawesome/free-solid-svg-icons'

// import { useSelector, useDispatch } from "react-redux";            
// import { useAppSelector,  } from "@/redux/hooks";
// import { v4 as uuidv4 } from 'uuid';


// import { Providers, PersistProvider } from '../../redux/provider'
import { rwdHelper, RWDPropHandler, getRWDStyles} from "@/lib/utils/rwdHelper"
import {rgba2hex} from "@/lib/utils/rgba2hex"

const Text = ({  node, mode, actions, update, children, ...props}) => {
    



    return (
        <h3 

            id={props?.id}
            key={props?.id}
            className={
                clsx(
                    props?.className,
                    style['text']

                )}

            style={{
                ...(props?.style||{}),
                ...getRWDStyles('width', node?.data?.rwd_width, node?.data?.width_unit),
                ...getRWDStyles('max-width', node?.data?.rwd_max_width, node?.data?.max_width_unit),
                ...getRWDStyles('min-width', node?.data?.rwd_min_width, node?.data?.min_width_unit),
        
                ...getRWDStyles('height', node?.data?.rwd_height, node?.data?.height_unit),
                ...getRWDStyles('max-height', node?.data?.rwd_max_height, node?.data?.max_height_unit),
                ...getRWDStyles('min-height', node?.data?.rwd_min_height, node?.data?.min_height_unit),

                ...getRWDStyles('line-height', node?.data?.rwd_line_height, 'px'),
                ...getRWDStyles('font-size', node?.data?.rwd_font_size, 'px'),

                ...getRWDStyles('writing-mode', node?.data?.rwd_writing_mode),
                ...getRWDStyles('word-spacing', node?.data?.rwd_word_spacing),
                ...getRWDStyles('letter-spacing', node?.data?.rwd_letter_spacing),
                ...getRWDStyles('text-orientation', node?.data?.rwd_text_orientation),
                // color:node?.data?.font_color?`rgba(${node?.data?.font_color.r}, ${node?.data?.font_color.g}, ${node?.data?.font_color.b}, ${node?.data?.font_color.a})`:'',

                '--font-color-1':node?.data?.font_color?rgba2hex(node?.data?.font_color?.r, node?.data?.font_color?.g, node?.data?.font_color?.b, node?.data?.font_color?.a):'',
                '--font-color-2':node?.data?.font_color2?rgba2hex(node?.data?.font_color2?.r, node?.data?.font_color2?.g, node?.data?.font_color2?.b, node?.data?.font_color2?.a):'',

                fontFamily:node?.data?.font_family||'',
                fontWeight:node?.data?.font_weight||'',
                textAlign:node?.data?.text_align||''
            }}
            
            >
            {node?.data?.text}
            {children}
        </h3>
    )
  

};

Text.propTypes = {
    // node: PropTypes.object,
    // mode: PropTypes.string,
    // actions: PropTypes.object,
    // update: PropTypes.func
};

export default Text;




