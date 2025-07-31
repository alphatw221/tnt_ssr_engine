import PropTypes from "prop-types";

import React, { Fragment } from "react";

import SSRNode from "@/components/node/SSRNode"
import BaseNode from '@/components/node/BaseNode.jsx'
import NodeInstanceSSR from "@/components/component-instance/NodeInstanceSSR.jsx";

const SSRChildren = ({  params, searchParams,
    template_nodes,
    parent_node, mode, 
    actions,
    hierarchy,
    isSudoNode,
    ...props
}) => {

    
    return(<Fragment>
        {
            (parent_node?.template_children||[]).map((childrenNode,childIndex)=>(    
                <BaseNode
                    key={childIndex}
                    template_nodes={template_nodes}
                    // parent_node= {parent_node}
                    node={childrenNode}  
                    mode={mode} 
                    actions={actions}
                    NodeInstanceComponent={NodeInstanceSSR}
                    hierarchy={[...(hierarchy||[]), childrenNode]}
                    isSudoNode={true}
                >

                </BaseNode> 
            ))
        }
        {
             


             (parent_node?.children||[]).map((childrenNode,childIndex)=>(    
                        <SSRNode
                            key={childIndex}
                            params={params}
                            searchParams={searchParams}
                            template_nodes={template_nodes}
                            // parent_node= {parent_node}
                            node={childrenNode}  
                            mode={mode} 
                            actions={actions}
                            hierarchy={[...(hierarchy||[]), childrenNode]}
                            isSudoNode={isSudoNode}
                        >

                        </SSRNode> 
                    ))
        }
    </Fragment>)


};

SSRChildren.propTypes = {
};

export default SSRChildren;
