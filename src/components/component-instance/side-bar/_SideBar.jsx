
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import clsx from "clsx";
import style from './SideBar.module.scss'

// import {dragItems, dragItemTypes} from '../../lib/dragItems'
   
// import { useAppSelector } from "@/redux/hooks";   
// import CSRComponentGrid3D from "../component-matrix/CSRComponentGrid3D";
// import {useClickOutsideEvent} from '../../lib/utils/clickOutside.js'

import { rgba2hex } from '@/lib/utils/rgba2hex'
import { getRWDStyles } from "@/lib/utils/rwdHelper"



const _SideBar = ({  

    node,  mode, actions, update, children, ...props}) => {

    // const websiteEditorState = useAppSelector((state) => state.website_editor);

    // const updateHook = (rowIndex, data)=>{
    //     const _children_matrix_3d = JSON.parse(JSON.stringify(node?.children_matrix_3d))
    //     update({...node, children_matrix_3d:_children_matrix_3d.map((_row, _rowIndex)=>_rowIndex==rowIndex?data:_row)})
    // }

    // const updateSiblingsHook = (data)=>{
    //   update( {...node, children_matrix_3d:data})
    // }

    // const updateMatrixHook = (matrix)=>{
    //     update({...node, children_matrix_3d:matrix})

        
    // }


    return (
    
    <div 
        id={props?.id}
        className={
            clsx(
                props?.className,
                style['component']

            )}



        style={{
            ...props?.style||{},
        }}

        >

        <div  
            className={style['button-block']} 
            id={`side_bar_button_${node?.uuid}`}
            // onClick={()=>{setShowSideBar(!showSideBar)}}
            style={{
                // width:width,
                // maxWidth:(node?.data?.max_width||'')+(node?.data?.max_width?node?.data?.max_width_unit:''),
                // height:height,
                // maxHeight:(node?.data?.max_height||'')+(node?.data?.max_height?node?.data?.max_height_unit:''),

                ...getRWDStyles('width', node?.data?.rwd_width, node?.data?.width_unit),
                ...getRWDStyles('max-width', node?.data?.rwd_max_width, node?.data?.max_width_unit),
                ...getRWDStyles('min-width', node?.data?.rwd_min_width, node?.data?.min_width_unit),
        
                ...getRWDStyles('height', node?.data?.rwd_height, node?.data?.height_unit),
                ...getRWDStyles('max-height', node?.data?.rwd_max_height, node?.data?.max_height_unit),
                ...getRWDStyles('min-height', node?.data?.rwd_min_height, node?.data?.min_height_unit),

                ...getRWDStyles('line-height', node?.data?.button_rwd_line_height, 'px'),
                ...getRWDStyles('font-size', node?.data?.button_rwd_font_size, 'px'),



                textAlign:node?.data?.text_align||'',
                // lineHeight:buttonLineHeight,

                // backgroundColor:node?.data?.button_background_color?`rgba(${node?.data?.button_background_color.r}, ${node?.data?.button_background_color.g}, ${node?.data?.button_background_color.b}, ${node?.data?.button_background_color.a})`:'',
 
                '--button-font-color':rgba2hex(node?.data?.button_font_color?.r, node?.data?.button_font_color?.g, node?.data?.button_font_color?.b, node?.data?.button_font_color?.a),
                '--button-font-color2':rgba2hex(node?.data?.button_font_color2?.r, node?.data?.button_font_color2?.g, node?.data?.button_font_color2?.b, node?.data?.button_font_color2?.a),

                // fontSize:buttonFontSize,
                fontFamily:node?.data?.button_font_family||'',
                fontWeight:node?.data?.button_font_weight||'',

                borderColor:node?.data?.button_border_color?`rgba(${node?.data?.button_border_color.r}, ${node?.data?.button_border_color.g}, ${node?.data?.button_border_color.b}, ${node?.data?.button_border_color.a})`:'',
                borderRadius:(node?.data?.button_border_radius||'')+(node?.data?.button_border_radius_unit||''),
                borderWidth:(node?.data?.button_border_width||'')+(node?.data?.button_border_width_unit||''),
                borderStyle:(node?.data?.button_border_style||''),
        
                boxShadow:
                    `${node?.data?.button_shadow_offset_x?node?.data?.button_shadow_offset_x+'px':'0px'} 
                    ${node?.data?.button_shadow_offset_y?node?.data?.button_shadow_offset_y+'px':'0px'} 
                    ${node?.data?.button_shadow_blur_radius?node?.data?.button_shadow_blur_radius+'px':'0px'} 
                    ${node?.data?.button_shadow_spread_radius?node?.data?.button_shadow_spread_radius+'px':'0px'} 
                    ${node?.data?.button_shadow_color?rgba2hex(node?.data?.button_shadow_color?.r, node?.data?.button_shadow_color?.g, node?.data?.button_shadow_color?.b, node?.data?.button_shadow_color?.a):''}`,


            }}
        >   
            <a>
                {node?.data?.icon_name && <i className={node?.data?.icon_name}></i>}
                {node?.data?.text||''}
            </a>
            
        </div>

        



    {children}




    </div>)
};

_SideBar.propTypes = {
};

export default _SideBar;




