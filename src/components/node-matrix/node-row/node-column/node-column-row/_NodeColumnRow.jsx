// import PropTypes from "prop-types";
// import React, {  } from "react";


import style from './NodeColumnRow.module.scss'

// import {dragItems, dragItemTypes} from '../../../../../lib/dragItems'

import clsx from "clsx";
// import Component from "../../../../component/Component";



const _NodeColumnRow = ({ 
  params, 
  searchParams, 
  template_nodes,
  parent_node, 
  rowIndex, 
  columnIndex, 
  columnRowIndex, 
  // columnRow,
  node, 

  mode, 
  actions, 
  dropColumnRowRef, 
  isOverCurrent, 
  hoverStyle,

  NodeComponent,
}) => {


    return (
      <div ref={dropColumnRowRef} 
          className={clsx(style.component_column_row_container, isOverCurrent?style.is_over_current:'', style[hoverStyle])}
          style={{justifyContent:parent_node?.data?.column_row_justify_content||'',
          }}
          >
            
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
                />
      </div>
    );
};

_NodeColumnRow.propTypes =  {
//   parent_array:PropTypes.array,
//   rowIndex:PropTypes.number,
//   columnIndex:PropTypes.number,
//   columnRowIndex:PropTypes.number,
//   component: PropTypes.object,
//   parent: PropTypes.object,
//   mode: PropTypes.string,
//   actions: PropTypes.object,
//   update: PropTypes.func,
//   remove: PropTypes.func,
};
export default _NodeColumnRow;
