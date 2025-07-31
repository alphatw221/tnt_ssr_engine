"use client"
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect ,lazy, useRef } from "react";


import BaseNode from './BaseNode'
import NodeClientDev from './NodeClientDev'
import NodeInstanceCSR from "@/components/component-instance/NodeInstanceCSR";
import style from './Node.module.scss'
import { getRWDStyles} from "@/lib/utils/rwdHelper"
import { useAppSelector, useAppDispatch  } from "@/redux/hooks";       

import { getNodeAfterApplyTemplate } from "@/lib/utils/nodeHelper"
const CSRNode = ({ 

    template_nodes,
    hideNodeDict,
    parent_node,
    // rowIndex,columnIndex,columnRowIndex,
    node, 
    mode, actions, 
    hierarchy,
    isSudoNode, 
    data}) => {
    
    const websiteEditorState = useAppSelector((state) => state.website_editor);
    
    var templateAppliedNode = getNodeAfterApplyTemplate(node, template_nodes, isSudoNode, hierarchy);
    // const [hideNodeDict, setHideNodeDict] = useState(JSON?.parse(localStorage?.getItem("hide_node_dict")||"{}")||{});

    
    
    // if(mode=='display'){
    //     return (<div  id={`node_${node?.uuid}`}>
    //         {node?.display_image && <img style={{ width:'100%', objectFit:'contain', borderRadius:'3px'}} src={node?.display_image}/>}
    //         <div className="text-center" style={{whiteSpace:'normal'}}>
    //             {node?.name}
    //         </div>
    //     </div>)
    // }


    if((mode==='edit' && hideNodeDict?.[node?.uuid])){
        return null
    }

    return ( 
        <Fragment>

            
                <BaseNode 
                    template_nodes={template_nodes}
                    hideNodeDict={hideNodeDict}
                    node={templateAppliedNode} 
                    mode={mode} 
                    actions={actions} 
                    NodeInstanceComponent={NodeInstanceCSR}
                    hierarchy={hierarchy}
                    isSudoNode={isSudoNode}
                    >

                {
                    (mode=='display'||(mode==='edit' && websiteEditorState.showComponentSettings )) &&
                    <NodeClientDev
                        parent_node={parent_node}
                        node={node} 
                        mode={mode} actions={actions} 
                        isSudoNode={isSudoNode}
                        
                    />
                }
                        
                </BaseNode>
                
              
          
        </Fragment>
    )
};

CSRNode.propTypes = {
    // parent_node: PropTypes.object,

    // node: PropTypes.object,
    // mode:PropTypes.string,
    // actions:PropTypes.object,
    // update:PropTypes.func,
    // remove:PropTypes.func, 
    // insert:PropTypes.func,
    // data:PropTypes.object||PropTypes.array||null

};

export default CSRNode;
