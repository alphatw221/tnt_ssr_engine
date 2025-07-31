
import PropTypes from "prop-types";
import dynamic from 'next/dynamic'; 

import React, { Fragment} from "react";
import clsx from "clsx";
import style from './Node.module.scss'


import { getRWDStyles} from "@/lib/utils/rwdHelper"
import { rgba2hex } from "@/lib/utils/rgba2hex";

import { convertStyleStringToObject } from "@/lib/utils/styleStringToObject"

import NodeClient from './NodeClient'
// const NodeClient = dynamic(() => import('./NodeClient'));

const BaseNode = ({ 
    params, searchParams, 
    template_nodes,
    hideNodeDict,
    // parent_node,
    // rowIndex,columnIndex,columnRowIndex,
    hierarchy,
    isSudoNode,
    node, 
    mode, actions, NodeInstanceComponent, children, ...props}) => {



    //display mode
    // if(mode=='display'){
    //     return (<div  id={`node_${node?.uuid}`}>
    //         {node?.display_image && <img style={{ width:'100%', objectFit:'contain', borderRadius:'3px'}} src={node?.display_image}/>}
    //         <div className="text-center" style={{whiteSpace:'normal'}}>
    //             {node?.name}
    //             {children}
    //         </div>
    //     </div>)
    // }
    //hide node
    // if(
    //     // hideOnDevice ||
    //      (mode==='edit' && node?.data?.hide_while_editing)){
    //     return null
    // }
    
    return (
        <Fragment>
             <NodeClient 
                node_uuid={node?.uuid}
                init_css={node?.data?.init_css}
                listen_events={node?.data?.listen_events}
                present_events={node?.data?.present_events}
                mouse_click_events={node?.data?.mouse_click_events}
                mouse_over_events={node?.data?.mouse_over_events}
                mouse_leave_events={node?.data?.mouse_leave_events}
                mouse_click_outside_events={node?.data?.mouse_click_outside_events}
                
                enable_reveal={node?.data?.enable_reveal}
                reveal_offset={node?.data?.rwd_reveal_offset}
            />


            <NodeInstanceComponent
                params={params} 
                searchParams={searchParams}
                template_nodes={template_nodes}
                hideNodeDict={hideNodeDict}
                node={node} 
                actions={actions} 
                mode={mode} 
                hierarchy={hierarchy}
                isSudoNode={isSudoNode}
                id={`node_${node?.uuid}`}          
                className={
                    clsx(
                        style['node'], 
                        isSudoNode?'sudo-node':'base-node',
                        node?.mark_as_template?'base-node-template':'',
                        `node_${node?.uuid}`,
                        ...(node?.data?.init_class_name?.split(',')||[])
                    )}


                style={{

                    ...getRWDStyles('margin-top', node?.data?.rwd_margin_top, node?.data?.margin_unit),
                    ...getRWDStyles('margin-bottom', node?.data?.rwd_margin_bottom, node?.data?.margin_unit),
                    ...getRWDStyles('margin-left', node?.data?.rwd_margin_left, node?.data?.margin_unit),
                    ...getRWDStyles('margin-right', node?.data?.rwd_margin_right, node?.data?.margin_unit),

                    '--unreveal-opacity':node?.data?.unreveal_opacity,
                    '--reveal-opacity':node?.data?.reveal_opacity,
                    '--reveal-opacity-transition-duration':(node?.data?.reveal_opacity_duration==0?node?.data?.reveal_opacity_duration:node?.data?.reveal_opacity_duration||'')+(node?.data?.reveal_opacity_duration?'s':''),
                    '--reveal-opacity-transition-delay':(node?.data?.reveal_opacity_delay==0?node?.data?.reveal_opacity_delay:node?.data?.reveal_opacity_delay||'')+(node?.data?.reveal_opacity_delay?'s':''),
                    '--unreveal-translate-x':(node?.data?.unreveal_translate_x==0?node?.data?.unreveal_translate_x:node?.data?.unreveal_translate_x||'')+(node?.data?.unreveal_translate_x?'px':''),
                    '--reveal-translate-x':(node?.data?.reveal_translate_x==0?node?.data?.unreveal_translate_x:node?.data?.unreveal_translate_x||'')+(node?.data?.reveal_translate_x?'px':''),
                    '--unreveal-translate-y':(node?.data?.unreveal_translate_y==0?node?.data?.unreveal_translate_y:node?.data?.unreveal_translate_y||'')+(node?.data?.unreveal_translate_y?'px':''),
                    '--reveal-translate-y':(node?.data?.reveal_translate_y==0?node?.data?.reveal_translate_y:node?.data?.reveal_translate_y||'')+(node?.data?.reveal_translate_y?'px':''),
                    '--reveal-translate-transition-duration':(node?.data?.reveal_translate_duration==0?node?.data?.reveal_translate_duration:node?.data?.reveal_translate_duration||'')+(node?.data?.reveal_translate_duration?'s':''),
                    '--reveal-translate-transition-delay':(node?.data?.reveal_translate_delay==0?node?.data?.reveal_translate_delay:node?.data?.reveal_translate_delay||'')+(node?.data?.reveal_translate_delay?'s':''),
                    
                    // ...prodStyle,
                    position:node?.data?.position||'',
                    ...getRWDStyles('top', node?.data?.rwd_top),
                    ...getRWDStyles('bottom', node?.data?.rwd_bottom),
                    ...getRWDStyles('left', node?.data?.rwd_left),
                    ...getRWDStyles('right', node?.data?.rwd_right),

                    '--display-xxl':node?.data?.hide_on_xxl?'none':'',
                    '--display-xl':node?.data?.hide_on_xl?'none':'',
                    '--display-lg':node?.data?.hide_on_lg?'none':'',
                    '--display-md':node?.data?.hide_on_md?'none':'',
                    '--display-sm':node?.data?.hide_on_sm?'none':'',
                    '--display-xs':node?.data?.hide_on_xs?'none':'',
                    '--display-xxs':node?.data?.hide_on_xxs?'none':'',

                    zIndex:node?.data?.z_index==0?(node?.data?.z_index):(node?.data?.z_index||''),
                    opacity:node?.data?.opacity==0?(node?.data?.opacity):(node?.data?.opacity||''),
                    translate:(node?.data?.translate_x||node?.data?.translate_y)?`${node?.data?.translate_x||''} ${node?.data?.translate_y||''}`:'',


                    scale:(node?.data?.scale_x||node?.data?.scale_y)?`${node?.data?.scale_x||''} ${node?.data?.scale_y||''}`:'',
                    rotate:`${node?.data?.rotate||''}`,
                    
                    '--background-color-1':node?.data?.background_color?rgba2hex(node?.data?.background_color?.r, node?.data?.background_color?.g, node?.data?.background_color?.b, node?.data?.background_color?.a):null,
                    '--background-color-2':node?.data?.background_color2?rgba2hex(node?.data?.background_color2?.r, node?.data?.background_color2?.g, node?.data?.background_color2?.b, node?.data?.background_color2?.a):null,
                    backgroundImage:node?.data?.background_image?`url(${node?.data?.background_image})`:null,

                    ...getRWDStyles('background-position', node?.data?.background_position),
                    ...getRWDStyles('background-size', node?.data?.background_size),
                    backgroundRepeat: node?.data?.background_repeat||'',

                    '--border-color-1':node?.data?.border_color?rgba2hex(node?.data?.border_color?.r, node?.data?.border_color?.g, node?.data?.border_color?.b, node?.data?.border_color?.a):null,
                    '--border-color-2':node?.data?.border_color2?rgba2hex(node?.data?.border_color2?.r, node?.data?.border_color2?.g, node?.data?.border_color2?.b, node?.data?.border_color2?.a):null,

                    // borderColor:node?.data?.border_color?`rgba(${node?.data?.border_color.r}, ${node?.data?.border_color.g}, ${node?.data?.border_color.b}, ${node?.data?.border_color.a})`:'',
                    borderRadius:(node?.data?.border_radius||'')+(node?.data?.border_radius_unit||''),
                    borderWidth:(node?.data?.border_width||'')+(node?.data?.border_width_unit||''),
                    borderStyle:(node?.data?.border_style||''),

                    boxShadow:
                    (node?.data?.shadow_offset_x||node?.data?.shadow_offset_y||node?.data?.shadow_blur_radius||node?.data?.shadow_spread_radius)?
                    `${node?.data?.shadow_offset_x?node?.data?.shadow_offset_x+'px':'0px'} 
                    ${node?.data?.shadow_offset_y?node?.data?.shadow_offset_y+'px':'0px'} 
                    ${node?.data?.shadow_blur_radius?node?.data?.shadow_blur_radius+'px':'0px'} 
                    ${node?.data?.shadow_spread_radius?node?.data?.shadow_spread_radius+'px':'0px'} 
                    ${node?.data?.shadow_color?rgba2hex(node?.data?.shadow_color?.r, node?.data?.shadow_color?.g, node?.data?.shadow_color?.b, node?.data?.shadow_color?.a):''}`:'',

                    ...(convertStyleStringToObject(node?.data?.init_style))
                }}


                >
                                {children}

            </NodeInstanceComponent>




        </Fragment>
       
    )
};

BaseNode.propTypes = {

};

export default BaseNode;
