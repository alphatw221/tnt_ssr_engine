// import PropTypes from "prop-types";
import React, { Fragment } from "react";
import rowStyle from './node-row/NodeRow.module.scss'
import columnStyle from './node-row/node-column/NodeColumn.module.scss'
import clsx from "clsx";
const _NodeGrid2D = ({  
    params, searchParams,
    template_nodes,
    parent_node, 
    mode, 
    actions, 
    update, 
    NodeComponent, 

}) => {



    return (<Fragment>
        {(parent_node?.children_matrix_3d||[]).map((row, rowIndex)=>{


            return <div 
                key={rowIndex}
                style={{
                    justifyContent:parent_node?.data?.row_justify_content||'',
                    flexWrap:parent_node?.data?.row_flex_wrap||'',
                }}
                className={clsx(rowStyle?.['component_row_container'])}>

                    {
                        (row||[]).map((column, columnIndex)=>{
                        return (column||[]).map((node, columnRowIndex)=>{
                            return (
    
                                <div 
                                    key={columnIndex}
                                    style={{
                                        justifyContent:parent_node?.data?.column_justify_content||'',
                                    }}
                                    className={clsx(columnStyle?.['component_column_container'])}>
    
    
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
                    })}
            </div>
        })}
    </Fragment>)
      


};

_NodeGrid2D.propTypes = {


};

export default _NodeGrid2D;
