import PropTypes from "prop-types";
import React, { Fragment } from "react";
// import clsx from "clsx";
// import style from './Node.module.scss'
import BaseNode from './BaseNode'
import NodeInstanceSSR from "@/components/component-instance/NodeInstanceSSR";
import { getNodeAfterApplyTemplate } from "@/lib/utils/nodeHelper"
const SSRNode = ({ 
    params, searchParams, 
    template_nodes,
    // parent_node,
    // rowIndex,columnIndex,columnRowIndex,
    node, 
    mode, actions, 
    isSudoNode,
    hierarchy
    // update, remove, data
}) => {

    node = getNodeAfterApplyTemplate(node, template_nodes, isSudoNode, hierarchy);

    return ( 
        <Fragment>
            <BaseNode 
                params={params}
                searchParams={searchParams} 
                template_nodes={template_nodes}
                node={node} 
                mode={mode} 
                actions={actions} 
                isSudoNode={isSudoNode}
                NodeInstanceComponent={NodeInstanceSSR}>

                
            </BaseNode>
          
        </Fragment>
    )
};

SSRNode.propTypes = {
    // parent_node: PropTypes.object,

    // node: PropTypes.object,
    // mode:PropTypes.string,
    // actions:PropTypes.object,
    // update:PropTypes.func,
    // remove:PropTypes.func, 
    // insert:PropTypes.func,
    // data:PropTypes.object||PropTypes.array||null

};

export default SSRNode;
