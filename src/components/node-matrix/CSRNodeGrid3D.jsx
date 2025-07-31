import PropTypes from "prop-types";
import React, { Fragment } from "react";


import CSRNodeRow from "./node-row/CSRNodeRow";
// import CSRComponentRow from "./component-row/CSRComponentRow"

import CSRNode from "../node/CSRNode";  //TODO temp

import _NodeGrid3D from "./_NodeGrid3D";
const CSRNodeGrid3D = ({  
    template_nodes,
  parent_node, mode, actions, 
  hierarchy
//   update, 
//   updateSiblings, updateMatrix
}) => {
    
    
    return(<Fragment>
        {
             (parent_node?.children||[]).map((childrenNode,childIndex)=>(    
                        <CSRNode
                            key={childIndex}

                            template_nodes={template_nodes}
                            parent_node= {parent_node}
                            node={childrenNode}  
            
                            mode={mode} 
                            actions={actions}
                            hierarchy={[...hierarchy, childrenNode]}
                        >

                        </CSRNode> 
                    ))
        }
    </Fragment>)

    return (<_NodeGrid3D 
        template_nodes={template_nodes}
        parent_node={parent_node} 
        mode={mode} 
        actions={actions} 
        
        NodeRowComponent={CSRNodeRow} 
        // update={update} 
        // updateSiblings={updateSiblings}
        // updateMatrix={updateMatrix}
        // updateParentComponents={updateParentComponents}
    />)


};

CSRNodeGrid3D.propTypes = {
    parent_node: PropTypes.object,
    mode: PropTypes.string,
    actions: PropTypes.object,
    update: PropTypes.func
};

export default CSRNodeGrid3D;
