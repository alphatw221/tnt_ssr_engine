
import PropTypes from "prop-types";
import React, { Fragment} from "react";
// import clsx from "clsx";
// import style from './NodeBox.module.scss'



import CSRChildren from '@/components/node-matrix/CSRChildren'

// import NodeBoxDev from '@/components/component-instance/node-box/NodeBoxDev'
import _NodeBox from './_NodeBox'
const NodeBoxCSR = ({  
    template_nodes, hideNodeDict, node,  mode, actions, children, hierarchy, ...props}) => {

        return (
            <Fragment>
              <_NodeBox 
                template_nodes={template_nodes} 
                hideNodeDict={hideNodeDict}
                node={node}  
                mode={mode} 
                actions={actions} 
                ChildrenComponent={CSRChildren} 
                hierarchy={hierarchy}
                {...props}
              >
                {children}
              </_NodeBox>
              {/* <NodeBoxDev node={node}  mode={mode} actions={actions}/> */}
            </Fragment>
          )

};

NodeBoxCSR.propTypes = {
};

export default NodeBoxCSR;




