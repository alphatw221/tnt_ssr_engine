
import PropTypes from "prop-types";
import React, { Fragment} from "react";
import clsx from "clsx";
import style from './NodeBox.module.scss'



// import { useAppSelector } from "@/redux/hooks";         

// import {dragItems, dragItemTypes} from '../../lib/dragItems'




import { getRWDStyles} from "@/lib/utils/rwdHelper"


const _NodeBox = ({  
    params, searchParams,
    template_nodes,
    hideNodeDict,
    node,  mode, actions, ChildrenComponent, hierarchy, children, isSudoNode, ...props}) => {
        

        // const websiteEditorState = useAppSelector((state) => state.website_editor);



        


        return (
            <div 
                className={
                  clsx(
                    props?.className,
                    style['node-box'],
                  )}
                style={{
                    

                    ...props?.style,
                    ...getRWDStyles('width', node?.data?.rwd_width, node?.data?.width_unit),
                    ...getRWDStyles('max-width', node?.data?.rwd_max_width, node?.data?.max_width_unit),
                    ...getRWDStyles('min-width', node?.data?.rwd_min_width, node?.data?.min_width_unit),
            
                    ...getRWDStyles('height', node?.data?.rwd_height, node?.data?.height_unit),
                    ...getRWDStyles('max-height', node?.data?.rwd_max_height, node?.data?.max_height_unit),
                    ...getRWDStyles('min-height', node?.data?.rwd_min_height, node?.data?.min_height_unit),
    
                    ...getRWDStyles('flex-direction', node?.data?.rwd_flex_direction),
                    ...getRWDStyles('flex-wrap', node?.data?.rwd_flex_wrap),
                    ...getRWDStyles('justify-content', node?.data?.rwd_justify_content),
                    ...getRWDStyles('justify-items', node?.data?.rwd_justify_items),
                    ...getRWDStyles('align-content', node?.data?.rwd_align_content),
                    ...getRWDStyles('align-items', node?.data?.rwd_align_items),

                }}
                id = {props.id}
                >
                

                  <ChildrenComponent
                  
                    params={params}
                    searchParams={searchParams} 
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



                  {children}

            </div>)

};

_NodeBox.propTypes = {
};

export default _NodeBox;




