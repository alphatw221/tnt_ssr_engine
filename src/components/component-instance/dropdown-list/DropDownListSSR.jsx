import PropTypes from "prop-types";
import React, { Fragment } from "react";

import _DropDownList from "./_DropDownList";

import SSRChildren from '@/components/node-matrix/SSRChildren'

const DropDownListSSR = ({  

    template_nodes, node,  mode, actions, update, ...props}) => {




    return (
        <Fragment>
        <_DropDownList 
            template_nodes={template_nodes}
            node={node} 
            mode={mode} 
            actions={actions} 
            update={update} 
            ChildrenComponent={SSRChildren}>
           {...props}
        </_DropDownList>
      
    </Fragment>
      )
};

DropDownListSSR.propTypes = {
};

export default DropDownListSSR;




