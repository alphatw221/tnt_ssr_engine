import PropTypes from "prop-types";
import React, { Fragment } from "react";
import clsx from "clsx";
import style from './AbsolutePositionNodeBox.module.scss'



// import { useAppSelector } from "@/redux/hooks";         

// import {dragItems, dragItemTypes} from '../../lib/dragItems'


// import CSRNode from '@/components/node/CSRNode'
import { getRWDStyles} from "@/lib/utils/rwdHelper"


const _AbsolutePositionNodeBox = ({  
    params, searchParams,
    template_nodes, hideNodeDict, node,  mode, actions, ChildrenComponent, NodeComponent, hierarchy, isSudoNode, children, ...props}) => {
        

        // const websiteEditorState = useAppSelector((state) => state.website_editor);

        // const removeHook = ()=>{
        //     console.log('unimplement remove Hook')
        // }

        // const insertHook = (data)=>{
        //     console.log('unimplement insert Hook')
        //     console.log(data)

        // }
          
        // const updateHook = (data)=>{
        //     update(
        //         {...node, children_matrix_3d:(node?.children_matrix_3d||[]).map((_row, _rowIndex)=>{
        //             return _row.map((_column, _columnIndex)=>{
        //                     return _column.map((_childrenNode, _columnRowIndex)=>{
        //                         if(data?.uuid==_childrenNode?.uuid){
        //                             return data
        //                         }else{
        //                             return _childrenNode
        //                         }
        //                     })
        //                 })
        //             })
        //         }
        //     )

        // }

          

        return (
            <div 
                className={
                    clsx(
                        props?.className,
                        style['absolute-position-node-box'],
                        // isOver?style['is-over']:'', 
                        // canDrop?style['can-drop']:'',

                    )}
                style={{
                    ...props?.style||{},
                    ...getRWDStyles('width', node?.data?.rwd_width, node?.data?.width_unit),
                    ...getRWDStyles('max-width', node?.data?.rwd_max_width, node?.data?.max_width_unit),
                    ...getRWDStyles('min-width', node?.data?.rwd_min_width, node?.data?.min_width_unit),
            
                    ...getRWDStyles('height', node?.data?.rwd_height, node?.data?.height_unit),
                    ...getRWDStyles('max-height', node?.data?.rwd_max_height, node?.data?.max_height_unit),
                    ...getRWDStyles('min-height', node?.data?.rwd_min_height, node?.data?.min_height_unit),
                }}
                id={props?.id}

                // ref={_dropRef}
                >
                
                {
                    // (node?.children_matrix_3d||[]).map((row,rowIndex)=>{
                    //     return row.map((column,columnIndex)=>{
                    //         return column.map((childrenNode, columnRowIndex)=>(

                    //             <Fragment key={columnRowIndex}>
                                
                                  
                    //               <NodeComponent
                    //                     template_nodes={template_nodes}
                    //                     parent_node= {node}
                    //                     rowIndex={rowIndex} 
                    //                     columnIndex={columnIndex} 
                    //                     columnRowIndex={columnRowIndex}
                    //                     node={childrenNode}  
                        
                    //                     mode={mode} 
                    //                     actions={actions}
                                    
                    //                 >

                    //                 </NodeComponent>
                    //             </Fragment>
                    //         ))
                    //     })
                    // })

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

                    // (node?.children||[]).map((childrenNode,childIndex)=>(    
                    //     <NodeComponent
                    //         key={childIndex}
                    //         template_nodes={template_nodes}
                    //         parent_node= {node}
                    //         // rowIndex={rowIndex} 
                    //         // columnIndex={columnIndex} 
                    //         // columnRowIndex={columnRowIndex}
                    //         node={childrenNode}  
            
                    //         mode={mode} 
                    //         actions={actions}
                    //         hierarchy={[...(hierarchy||[]), childrenNode]}
                        
                    //     >

                    //     </NodeComponent> 
                    // ))






                }
                {children}
            </div>)

};

_AbsolutePositionNodeBox.propTypes = {
};

export default _AbsolutePositionNodeBox;




