import PropTypes from "prop-types";
import React, { Fragment} from "react";
import clsx from "clsx";
import style from './DropDownList.module.scss'

// import {dragItems, dragItemTypes} from '../../lib/dragItems'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHouse, faGear, faBars } from '@fortawesome/free-solid-svg-icons'

// import { useSelector, useDispatch } from "react-redux";         
// import { useAppSelector } from "@/redux/hooks";   
// import { setSideMenuActive, setComponentMenuActive} from '../../redux/slices/website-editor-slice'




// import {useClickOutsideEvent} from '@/lib/utils/clickOutside.js'

import { getRWDStyles} from "@/lib/utils/rwdHelper"
import { rgba2hex } from "@/lib/utils/rgba2hex";


import DropDownListClient from './DropDownListClient'
import { Providers, PersistProvider } from '@/redux/provider'

const _DropDownList = ({  

    template_nodes, hideNodeDict, node,  mode, actions, ChildrenComponent, hierarchy, isSudoNode, children, ...props}) => {

    // const websiteEditorState = useAppSelector((state) => state.website_editor);
    // const editorMemoryState = useAppSelector((state) => state.editor_memory);

    // const [showDropDown, setShowDropDown] = useState(false)



    // const updateHook = (rowIndex, data)=>{
    //     const _children_matrix_3d = JSON.parse(JSON.stringify(node?.children_matrix_3d))
    //     update({...node, children_matrix_3d:_children_matrix_3d.map((_row, _rowIndex)=>_rowIndex==rowIndex?data:_row)})
    // }

    // const updateSiblingsHook = (data)=>{
    //     update( {...node, children_matrix_3d:data})
    //   }

    // const updateMatrixHook = (matrix)=>{
    //     update({...node, children_matrix_3d:matrix})

        
    // }


    return (
    <Fragment>
        <Providers >
            <PersistProvider>
                <DropDownListClient node_uuid={node?.uuid}/>
            </PersistProvider>
        </Providers>
    <div 
        // id={`dropdown_list_${node?.uuid}`}
        id={props?.id}
        className={
            clsx(
                props?.className,
                style['drop-down-list']
            )} 
        
            style={{

                ...props?.style||{},}}
        >

        <div  
            className={style['button-block']} 
            id={`dropdown_list_button_${node?.uuid}`}
            style={{

                '--background-color-1':node?.data?.button_background_color?rgba2hex(node?.data?.button_background_color?.r, node?.data?.button_background_color?.g, node?.data?.button_background_color?.b, node?.data?.button_background_color?.a):'',
                '--background-color-2':node?.data?.button_background_color2?rgba2hex(node?.data?.button_background_color2?.r, node?.data?.button_background_color2?.g, node?.data?.button_background_color2?.b, node?.data?.button_background_color2?.a):'',
    
                '--font-color-1':node?.data?.button_font_color?rgba2hex(node?.data?.button_font_color?.r, node?.data?.button_font_color?.g, node?.data?.button_font_color?.b, node?.data?.button_font_color?.a):'',
                '--font-color-2':node?.data?.button_font_color?rgba2hex(node?.data?.button_font_color2?.r, node?.data?.button_font_color2?.g, node?.data?.button_font_color2?.b, node?.data?.button_font_color2?.a):'',


                ...getRWDStyles('width', node?.data?.rwd_width, node?.data?.width_unit),
                ...getRWDStyles('max-width', node?.data?.rwd_max_width, node?.data?.max_width_unit),
                ...getRWDStyles('min-width', node?.data?.rwd_min_width, node?.data?.min_width_unit),
        
                ...getRWDStyles('height', node?.data?.rwd_height, node?.data?.height_unit),
                ...getRWDStyles('max-height', node?.data?.rwd_max_height, node?.data?.max_height_unit),
                ...getRWDStyles('min-height', node?.data?.rwd_min_height, node?.data?.min_height_unit),

 
                fontFamily:node?.data?.button_font_family||'',
                fontWeight:node?.data?.button_font_weight||'',
                ...getRWDStyles('line-height', node?.data?.button_rwd_line_height, 'px'),
                ...getRWDStyles('font-size', node?.data?.button_rwd_font_size, 'px'),
            }}
        >   
            {node?.data?.icon_name && <i className={node?.data?.icon_name}></i>}
            {node?.data?.text||''}
        </div>


        <div 
            id={`dropdown_list_dropdown_${node?.uuid}`}
            className={
                clsx(style['dropdown'], 
                    // showDropDown?style['active']:'', 
                    // isOver?style['is-over']:'', 
                    // canDrop?style['can-drop']:'', 
                    style?.[node?.data?.dimension||'dimension2']
                )}  
            
            // ref={dropDown}
            style={{

                ...getRWDStyles('width', node?.data?.dropdown_rwd_width, node?.data?.dropdown_width_unit),
                ...getRWDStyles('height', node?.data?.dropdown_rwd_height, node?.data?.dropdown_height_unit),
                backgroundColor:node?.data?.dropdown_background_color?`rgba(${node?.data?.dropdown_background_color.r}, ${node?.data?.dropdown_background_color.g}, ${node?.data?.dropdown_background_color.b}, ${node?.data?.dropdown_background_color.a})`:'',


                borderColor:node?.data?.dropdown_border_color?`rgba(${node?.data?.dropdown_border_color.r}, ${node?.data?.dropdown_border_color.g}, ${node?.data?.dropdown_border_color.b}, ${node?.data?.dropdown_border_color.a})`:'',
                borderRadius:(node?.data?.dropdown_border_radius||'')+(node?.data?.dropdown_border_radius_unit||''),
                borderWidth:(node?.data?.dropdown_border_width||'')+(node?.data?.dropdown_border_width_unit||''),
                borderStyle:(node?.data?.dropdown_border_style||''),


                boxShadow:
                `${node?.data?.dropdown_shadow_offset_x?node?.data?.dropdown_shadow_offset_x+'px':'0px'} 
                ${node?.data?.dropdown_shadow_offset_y?node?.data?.dropdown_shadow_offset_y+'px':'0px'} 
                ${node?.data?.dropdown_shadow_blur_radius?node?.data?.dropdown_shadow_blur_radius+'px':'0px'} 
                ${node?.data?.dropdown_shadow_spread_radius?node?.data?.dropdown_shadow_spread_radius+'px':'0px'} 
                ${node?.data?.dropdown_shadow_color?rgba2hex(node?.data?.dropdown_shadow_color?.r, node?.data?.dropdown_shadow_color?.g, node?.data?.dropdown_shadow_color?.b, node?.data?.dropdown_shadow_color?.a):''}`


            }}    
        >   

            <ChildrenComponent
                template_nodes={template_nodes}
                hideNodeDict={hideNodeDict}
                parent_node={node} 
                mode={mode} 
                actions={actions}
                hierarchy={hierarchy||[]}
                isSudoNode={isSudoNode}

            />

            
{
                                 // 
                                // (node?.children||[]).map((childrenNode,childIndex)=>(    
                                //     <NodeComponent    //CSRNode
                                //         key={childIndex}
                                //         params={params} 
                                //         searchParams={searchParams}
                                //         template_nodes={template_nodes}
                                //         parent_node= {node}
                                //         node={childrenNode}  
                        
                                //         mode={mode} 
                                //         actions={actions}
                                    
                                //     >

                                //     </NodeComponent> 
                                // ))
                            }
           


        </div>
        

        {children}

    </div>
    </Fragment>

    )
};

_DropDownList.propTypes = {
};

export default _DropDownList;




