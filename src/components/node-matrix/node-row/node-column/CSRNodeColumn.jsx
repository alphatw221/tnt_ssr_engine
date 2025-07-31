import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useRef } from "react";


import CSRNodeColumnRow from "./node-column-row/CSRNodeColumnRow"
import _NodeColumn from "./_NodeColumn";



import { useAppDispatch, useAppSelector } from "@/redux/hooks";        


const CSRComponentColumn = ({  
  template_nodes,
  parent_node, 
  rowIndex, 
  columnIndex, 
  column, 

  mode, 
  actions, 
  // update, 
  // updateMatrix
}) => {

    const dispatch = useAppDispatch();


    // const updateHook = (columnRowIndex, data)=>{
    //   const _column = JSON.parse(JSON.stringify(column))
    //   update(columnIndex, (_column||[]).map((_columnRow, _columnRowIndex)=>_columnRowIndex==columnRowIndex?data:_columnRow))
    // }

    // const updateSiblingsHook = (data)=>{
    //   update(columnIndex, data)
    // }

    const dropColumnRef = useRef(null)
    const [hoverStyle, setHoverColumnStyle] = useState('hover_left')

    
    return (<_NodeColumn 
      column={column} 
      rowIndex={rowIndex} 
      columnIndex={columnIndex} 
      template_nodes={template_nodes}
      parent_node={parent_node} 
      mode={mode} 
      actions={actions} 
      dropColumnRef={dropColumnRef} 
      hoverStyle={hoverStyle}
      NodeColumnRowComponent={CSRNodeColumnRow}

      // update={updateHook}
      // updateSiblings={updateSiblingsHook}
      // updateMatrix={updateMatrix}
      />)

};

CSRComponentColumn.propTypes = {
    // parent_array: PropTypes.array,
    // array: PropTypes.array,
    // rowIndex: PropTypes.number,
    // columnIndex: PropTypes.number,
    // // pageIndex: PropTypes.number,
    // // fragmentIndex: PropTypes.number,
    // parent: PropTypes.object,
    // mode: PropTypes.string,
    // actions: PropTypes.object,
    // update: PropTypes.func,
    // remove: PropTypes.func,
};

export default CSRComponentColumn;
