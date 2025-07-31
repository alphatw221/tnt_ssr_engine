"use client"
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useRef } from "react";
import clsx from "clsx";
import style from './AbsolutePositionNodeBox.module.scss'



// import { useAppSelector } from "@/redux/hooks";         

import {dragItems, dragItemTypes} from '@/lib/dragItems'
import { useDrop } from 'react-dnd'


// import CSRNode from '@/components/node/CSRNode'
// import { rwdHelper, RWDPropHandler} from "../../lib/utils/rwdHelper"
import { user_update_node} from '@/api/node.js'
import { useAppSelector, useAppDispatch } from "@/redux/hooks";  

import { containerNodeHandleDropNodeHelper } from "@/lib/utils/dragDropHelper.js"

const AbsolutePositionNodeBoxDev = ({  

    node,  mode, actions}) => {
        
        const dispatch = useAppDispatch()


        
        const [{ canDrop, isOver, isOverCurrent }, drop] = useDrop(
            () => ({
              accept: [dragItemTypes.NODE],
              drop: (item, monitor) => {
                if(monitor.didDrop()) return
                if(mode!='edit')return
                if(item?.node?.uuid==node?.uuid)return
                
                if(item.node?.uuid!=undefined && item?.parent_node?.uuid==node?.uuid){
                    user_update_node(item.node?.uuid, item.node, true).then(res=>{
                        console.log(res.data)
                      }).catch(err=>{console.log(err)})
                    return
                }
                
                
                // else{


                //     const rect = document?.getElementById(`node_${node?.uuid}`)?.getBoundingClientRect()
                //     const clientOffset = monitor.getClientOffset()
                //     const itemRect = item?.ref?.current?.getBoundingClientRect()
                //     let _left = (100 * (clientOffset.x - rect.x - (itemRect?.width||0) )/rect.width)
                //     let _top = (100 * (clientOffset.y  - rect.y)/rect.height)
                    
                //     item.node.data = {...item?.node?.data, rwd_top:`${_top}%`, rwd_left:`${_left}%`, position:'absolute'}
                //     containerNodeHandleDropNodeHelper(item, node, actions)
                //     return


                // }
                


              },
              hover:(item, monitor)=>{
                console.log('hover')
                if (!document.getElementById(`node_${node?.uuid}`)) return
                if(item.node?.uuid!=undefined && item?.parent_node?.uuid==node?.uuid){

                    const rect = document.getElementById(`node_${node?.uuid}`)?.getBoundingClientRect()
                    const clientOffset = monitor.getClientOffset()
                    const itemRect = item?.ref?.current?.getBoundingClientRect()
                    let _left = (100 * (clientOffset.x - rect.x - itemRect.width )/rect.width)
                    let _top = (100 * (clientOffset.y  - rect.y)/rect.height)
                    
                    let rwd_top = String(item?.node?.data?.rwd_top||'').split(',')   //
                    let rwd_left = String(item?.node?.data?.rwd_left||'').split(',') //
        
                    let _windowWidth = window.innerWidth
                    
                    let rwd_index 
                    if(_windowWidth>=1536){rwd_index = 0}
                    else if(_windowWidth>=1280){rwd_index = 1}
                    else if(_windowWidth>=1024){rwd_index = 2}
                    else if(_windowWidth>=768){rwd_index = 3}
                    else if(_windowWidth>=640){rwd_index = 4}
                    else if(_windowWidth>=390){rwd_index = 5}
                    else{rwd_index = 6}
        
                    // const top_index = rwd_top.findLastIndex((element, index) => index <= rwd_index) //
                    // const left_index = rwd_left.findLastIndex((element, index) => index <= rwd_index) //

                    rwd_top[rwd_index] = `${_top}%`
                    rwd_left[rwd_index] = `${_left}%`
                    //update item.node
                    item.node = {...item.node, data:{...item.node.data, 'rwd_top':rwd_top.join(','),  'rwd_left':rwd_left.join(',')}, 'position':'absolute'} //



                    //TODO
                    actions?.globleUpdateNode(
                      {...node, children_matrix_3d:(node?.children_matrix_3d||[]).map((_row, _rowIndex)=>{
                          return _row.map((_column, _columnIndex)=>{
                                  return _column.map((_childrenNode, _columnRowIndex)=>{
                                      if(_rowIndex==item.rowIndex && _columnIndex==item.columnIndex && _columnRowIndex==item.columnRowIndex){
                                          return {..._childrenNode, data:{..._childrenNode?.data||{}, 'rwd_top':rwd_top.join(','),  'rwd_left':rwd_left.join(',')}, 'position':'absolute'}  //
                                      }else{
                                          return _childrenNode
                                      }
                                  })
                              })
                          })
                        }
                    )
                    // update(
                    //     {...node, children_matrix_3d:(node?.children_matrix_3d||[]).map((_row, _rowIndex)=>{
                    //         return _row.map((_column, _columnIndex)=>{
                    //                 return _column.map((_childrenNode, _columnRowIndex)=>{
                    //                     if(_rowIndex==item.rowIndex && _columnIndex==item.columnIndex && _columnRowIndex==item.columnRowIndex){
                    //                         return {..._childrenNode, data:{..._childrenNode?.data||{}, 'rwd_top':rwd_top.join(','),  'rwd_left':rwd_left.join(',')}, 'position':'absolute'}  //
                    //                     }else{
                    //                         return _childrenNode
                    //                     }
                    //                 })
                    //             })
                    //         })
                    //     }
                    // )

                    
                }

              },
              collect: (monitor) => ({
                isOver: monitor.isOver(),
                isOverCurrent: monitor.isOver({ shallow: true }),
                canDrop: monitor.canDrop(),
              }),
            }),
            [dragItemTypes, node, actions],
        )
        

        setTimeout(()=>{drop(document.getElementById(`node_${node?.uuid}`))},10)



        // useEffect(()=>{
        //     //update css
        //     if(canDrop){
        //         document.getElementById(`node_${node?.uuid}`)?.classList?.add(style['can-drop'])
        //     }else{
        //         document.getElementById(`node_${node?.uuid}`)?.classList?.remove(style['can-drop'])
        //     }
        //   },[canDrop])
  
        //   useEffect(()=>{
        //     //update css
        //     if(isOver){
        //         document.getElementById(`node_${node?.uuid}`)?.classList?.add(style['is-over'])
        //     }else{
        //         document.getElementById(`node_${node?.uuid}`)?.classList?.remove(style['is-over'])
        //     }
        //   },[isOver])


        return null


};

AbsolutePositionNodeBoxDev.propTypes = {
};

export default AbsolutePositionNodeBoxDev;




