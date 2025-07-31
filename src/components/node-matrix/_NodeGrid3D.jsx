// import PropTypes from "prop-types";
import React, { Fragment } from "react";



const _ComponentGrid3D = ({  
    params, searchParams,
    parent_node, 
    template_nodes,
    mode, 
    actions, 
    
    NodeRowComponent, 
    // update, 
    // updateSiblings,
    // updateMatrix
    // updateParentComponents
}) => {


    return (
        <Fragment>

            {(parent_node?.children_matrix_3d||[]).map((row, rowIndex)=>
                (
                    <NodeRowComponent 
                        params={params} 
                        searchParams={searchParams}
                        key={rowIndex} 
                        // parent_array={parent?.components}
                        template_nodes={template_nodes}
                        parent_node={parent_node} 
                        row = {row}
                        rowIndex={rowIndex} 
                        
                        siblings={parent_node?.children_matrix_3d||[]}

                        // updateSiblings={updateSiblings}
                        // updateMatrix={updateMatrix}

                        mode={mode} 
                        actions={actions}
                        // actions={{...actions,updateParentComponents}}
                        // update={update}
                        />

                )
            )}



        </Fragment>


    );
};

_ComponentGrid3D.propTypes = {


};

export default _ComponentGrid3D;
