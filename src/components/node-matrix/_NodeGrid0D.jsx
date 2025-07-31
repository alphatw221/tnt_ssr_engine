// import PropTypes from "prop-types";
import React, { Fragment } from "react";



const _NodeGrid0D = ({  
    params, searchParams,
    template_nodes,
    parent_node, 
    mode, 
    actions, 
    update, 
    NodeComponent, 

    updateSiblings,
    updateMatrix
    // updateParentComponents
}) => {


    return (
        <Fragment>

            {(parent_node?.children_matrix_3d||[]).map((row, rowIndex)=>{
                return (row||[]).map((column, columnIndex)=>{
                    return (column||[]).map((node, columnRowIndex)=>{
                        return (
                                <NodeComponent
                                    key={columnRowIndex}
                                    params={params} 
                                    searchParams={searchParams}
                                    template_nodes={template_nodes}
                                    parent_node= {parent_node}
                                    rowIndex={rowIndex} 
                                    columnIndex={columnIndex} 
                                    columnRowIndex={columnRowIndex}
                                    node={node}  

                                    mode={mode} 
                                    actions={actions}
                                    update={update}
                                />
                        )
                    })
                })
            })}



        </Fragment>


    );
};

_NodeGrid0D.propTypes = {


};

export default _NodeGrid0D;
