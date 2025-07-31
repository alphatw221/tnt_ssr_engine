// import PropTypes from "prop-types";
import React, { Fragment } from "react";
import style from './node-row/NodeRow.module.scss'

import clsx from "clsx";
const _NodeGrid1D = ({  
    params, searchParams,
    template_nodes,
    parent_node, 
    mode, 
    actions, 
    update, 
    NodeComponent, 

}) => {

    return (
        <Fragment>

            {(parent_node?.children_matrix_3d||[]).map((row, rowIndex)=>{
                return (row||[]).map((column, columnIndex)=>{
                    return (column||[]).map((node, columnRowIndex)=>{
                        return (

                            <div 
                            key={columnRowIndex}
                            style={{
                              justifyContent:parent_node?.data?.row_justify_content||'',
                              flexWrap:parent_node?.data?.row_flex_wrap||'',
                  
                            }}
                            className={clsx(style?.['component_row_container'])}>


                                <NodeComponent
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
                            </div>
                        )
                    })
                })
            })}
        </Fragment>)
      


};

_NodeGrid1D.propTypes = {


};

export default _NodeGrid1D;
