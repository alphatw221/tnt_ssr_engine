import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useRef } from "react";
import {dragItems, dragItemTypes} from '../../../../../lib/dragItems'
import {  useDrop } from 'react-dnd'

import CSRNode from "../../../../../components/node/CSRNode"


import _NodeColumnRow from "./_NodeColumnRow";


import {remove3DMatrixNode, insert3DMatrixNode} from '@/lib/utils/nodeMatrix3D.js'
import { useAppDispatch, useAppSelector } from "@/redux/hooks";        

import { nodeGridDropNodeHelper } from "@/lib/utils/dragDropHelper.js"

const CSRNodeColumnRow = ({ 
  template_nodes,
  parent_node, 
  rowIndex, 
  columnIndex, 
  columnRowIndex, 
  node,
  mode, actions, 

  // update, 
  siblings,
  // updateSiblings,
  // updateMatrix

}) => {


  const dispatch = useAppDispatch();

  // const removeHook = ()=>{
  //   updateSiblings((siblings||[]).filter((_node,_columnRowIndex)=>_columnRowIndex!=columnRowIndex))
  // }
  // const insertHook = (data)=>{
  //   const _siblings = JSON.parse(JSON.stringify(siblings))
  //   _siblings.splice(columnRowIndex+1,0,data)
  //   updateSiblings(_siblings)
  // }
  
  // const updateHook = (data)=>{
  //   update(columnRowIndex, data)
  // }

    

    const dropColumnRowRef = useRef(null)
    const [hoverStyle, setHoverStyle] = useState('hover_bottom')
    const [{ CanDrop, isOver, isOverCurrent }, drop] = useDrop(
        () => ({
          accept: [dragItemTypes.NODE],
          drop: (item, monitor) => {
            if(monitor.didDrop()) return
            if(!monitor.isOver({ shallow: true })) return

            let dimension_0_index = rowIndex;
            let dimension_1_index = columnIndex;
            let dimension_2_index = columnRowIndex;
            let after = 0;

            if(hoverStyle==='hover_top'){
              after = 0
            }else if(hoverStyle==='hover_bottom'){
              after = 1
            }else if(hoverStyle==='hover_left'){
              dimension_2_index=null;
              after = 0
            }else if(hoverStyle==='hover_right'){
              dimension_2_index=null;
              after = 1
            }

            nodeGridDropNodeHelper(item, parent_node, dimension_0_index, dimension_1_index, dimension_2_index, after, actions)
            return


            //----------------------------------------------------------node column logic ends----------------------------------------------------------------
          },
          hover:(item, monitor)=>{
            
            if (!dropColumnRowRef.current) return
            const hoverBoundingRect = dropColumnRowRef.current?.getBoundingClientRect()
            const hoverMiddleY =
              (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2


            const oneFourthX =
            (hoverBoundingRect.right - hoverBoundingRect.left) / 4
            const threeFourthX = oneFourthX * 3


            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            const hoverClientX = clientOffset.x - hoverBoundingRect.left

            if(hoverClientX<oneFourthX){
              setHoverStyle('hover_left')
            }else if (hoverClientX>threeFourthX){
              setHoverStyle('hover_right')
            }
            else if (hoverClientY < hoverMiddleY){
              setHoverStyle('hover_top')
            } else{
              setHoverStyle('hover_bottom')
            }

          },
          collect: (monitor) => ({
            isOver: monitor.isOver(),
            isOverCurrent: monitor.isOver({ shallow: true }),
            CanDrop: monitor.canDrop(),
          }),
        }),
        [ parent_node, siblings, rowIndex, columnIndex, columnRowIndex, hoverStyle],
    )
    drop(dropColumnRowRef)
    
    return (<_NodeColumnRow 
      template_nodes={template_nodes}
      parent_node={parent_node} 
      rowIndex={rowIndex} 
      columnIndex={columnIndex} 
      columnRowIndex={columnRowIndex} 
      node={node} 
      mode={mode} 
      actions={actions} 


      dropColumnRowRef={dropColumnRowRef} 
      isOverCurrent={isOverCurrent}  
      hoverStyle={hoverStyle}


      NodeComponent={CSRNode}


      />)


};

CSRNodeColumnRow.propTypes =  {
  // parent_array:PropTypes.array,
  // rowIndex:PropTypes.number,
  // columnIndex:PropTypes.number,
  // columnRowIndex:PropTypes.number,
  // component: PropTypes.object,
  // parent: PropTypes.object,
  // mode: PropTypes.string,
  // actions: PropTypes.object,
  // update: PropTypes.func,
  // remove: PropTypes.func,
};
export default CSRNodeColumnRow;
