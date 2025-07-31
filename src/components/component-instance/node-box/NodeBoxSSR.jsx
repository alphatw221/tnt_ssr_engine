
import PropTypes from "prop-types";
import React, { Fragment} from "react";
// import clsx from "clsx";
// import style from './NodeBox.module.scss'




import _NodeBox from "./_NodeBox"

import SSRChildren from '@/components/node-matrix/SSRChildren'

const NodeBoxSSR = ({  
  template_nodes, node,  mode, actions, update, ...props}) => {

        return (
            <Fragment>
              <_NodeBox template_nodes={template_nodes} node={node}  mode={mode} actions={actions} update={update} ChildrenComponent={SSRChildren} {...props}/>
            </Fragment>
          )

};

NodeBoxSSR.propTypes = {
};

export default NodeBoxSSR;



