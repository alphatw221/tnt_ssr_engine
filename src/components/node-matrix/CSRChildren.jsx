import PropTypes from "prop-types";
import React, { Fragment } from "react";
import CSRNode from '@/components/node/CSRNode.jsx'
import BaseNode from '@/components/node/BaseNode.jsx'
import NodeInstanceCSR from "@/components/component-instance/NodeInstanceCSR";


const CSRChildren = ({  
    template_nodes,
    hideNodeDict,
  parent_node, mode, actions, 
  hierarchy,
  isSudoNode,
  ...props
}) => {
    
    
    return(<Fragment>

        {

            //TODO hide
            (parent_node?.template_children||[]).map((childrenNode,childIndex)=>(    
                <BaseNode
                    key={childIndex}
                    template_nodes={template_nodes}
                    hideNodeDict={hideNodeDict}
                    // parent_node= {parent_node}
                    node={childrenNode}  
                    mode={mode} 
                    actions={actions}
                    NodeInstanceComponent={NodeInstanceCSR}
                    hierarchy={[...(hierarchy||[]), childrenNode]}
                    isSudoNode={true}
                >

                </BaseNode> 
            ))

        }
        {

            

             (parent_node?.children||[]).map((childrenNode,childIndex)=>(    
                        <CSRNode
                            key={childIndex}

                            template_nodes={template_nodes}
                            hideNodeDict={hideNodeDict}
                            parent_node= {parent_node}
                            node={childrenNode}  
            
                            mode={mode} 
                            actions={actions}
                            hierarchy={[...(hierarchy||[]), childrenNode]}
                            isSudoNode={isSudoNode}
                        >

                        </CSRNode> 
                    ))
        }
    </Fragment>)



};

CSRChildren.propTypes = {
    // parent_node: PropTypes.object,
    // mode: PropTypes.string,
    // actions: PropTypes.object,
    // update: PropTypes.func
};

export default CSRChildren;
