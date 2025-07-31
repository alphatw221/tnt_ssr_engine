import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useRef } from "react";

import {dragItems, dragItemTypes} from '../../../lib/dragItems'

import { useDrop } from 'react-dnd'

import CSRNodeColumn from './node-column/CSRNodeColumn'
import _NodeRow from "./_NodeRow";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";        

import { nodeGridDropNodeHelper } from "@/lib/utils/dragDropHelper.js"

const CSRNodeRow = ({ 
  template_nodes,
  parent_node, 
  row, 
  rowIndex, 

  // update,

  siblings,
  // updateSiblings,
  // updateMatrix,
  mode, actions, 
}) => {
    const dispatch = useAppDispatch();


    // const updateHook = (columnIndex, data)=>{
    //   const _row = JSON.parse(JSON.stringify(row))
    //   update(rowIndex, (_row||[]).map((_column, _columnIndex)=>_columnIndex==columnIndex?data:_column))
    // }

    // const updateSiblingsHook = (data)=>{
    //   update(rowIndex, data)
    // }

 

    const dropRowRef = useRef(null)
    const [hoverStyle, setHoverRowStyle] = useState('hover_bottom')

    const [{ CanDrop, isOver, isOverCurrent }, dropRow] = useDrop(
        () => ({
          accept: [dragItemTypes.NODE],
          drop: (item, monitor) => {

            if(monitor.didDrop()) return
            if(!monitor.isOver({ shallow: true })) return


            let dimension_0_index = rowIndex;
            let dimension_1_index = null;
            let dimension_2_index = null;
            let after = 0;

            if(hoverStyle==='hover_top'){
              after = 0
            }else if(hoverStyle==='hover_bottom'){
              after = 1
            }

            nodeGridDropNodeHelper(item, parent_node, dimension_0_index, dimension_1_index, dimension_2_index, after, actions)
            return


            
          },
          hover:(item, monitor)=>{
            if (!dropRowRef.current) return
            const hoverBoundingRect = dropRowRef.current?.getBoundingClientRect()
            const hoverMiddleY =
              (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            if (hoverClientY < hoverMiddleY){
              setHoverRowStyle('hover_top')
            } else{
              setHoverRowStyle('hover_bottom')
            }

          },
          collect: (monitor) => ({
            isOver: monitor.isOver(),
            isOverCurrent: monitor.isOver({ shallow: true }),
            CanDrop: monitor.canDrop(),
          }),
        }),
        [ parent_node,siblings, rowIndex, hoverStyle],
    )
    dropRow(dropRowRef)
    

    return (<_NodeRow 
      row={row} 
      rowIndex={rowIndex} 
      template_nodes={template_nodes}
      parent_node={parent_node} 
      mode={mode} 
      actions={actions} 
      dropRowRef={dropRowRef} 
      isOverCurrent={isOverCurrent} 
      hoverStyle={hoverStyle}

      NodeColumnComponent={CSRNodeColumn} 

      // update={updateHook}
      // updateSiblings={updateSiblingsHook}
      // updateMatrix={updateMatrix}
      
      />)
};

CSRNodeRow.propTypes = {
   
};

export default CSRNodeRow;
