"use client"
import PropTypes from "prop-types";
import React, { Fragment, useEffect,  } from "react";
import clsx from "clsx";
import style from './SideBar.module.scss'

import {dragItems, dragItemTypes} from '@/lib/dragItems'
import {  useDrop } from 'react-dnd'
   
import { useAppDispatch, useAppSelector } from "@/redux/hooks";        
import { containerNodeHandleDropNodeHelper } from "@/lib/utils/dragDropHelper.js"

const SideBarDev = ({  

    node,  mode, actions, update}) => {

    const dispatch = useAppDispatch();


    const [{ canDrop, isOver }, drop] = useDrop(
        () => ({
          accept: [dragItemTypes.NODE],
          drop: (item, monitor) => {
            if(monitor.didDrop()) return
            if(mode!='edit')return
            if(item?.node?.uuid==node?.uuid)return
            containerNodeHandleDropNodeHelper(item, node, actions)
            return

          },
          collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
          }),
        }),
        [dragItemTypes, update, node, actions],
    )
    


    setTimeout(()=>{drop(document.getElementById(`side_bar_node_grid_${node?.uuid}`))},10)
        


    useEffect(()=>{
      //update css
      if(canDrop){
        document?.getElementById(`side_bar_node_grid_${node?.uuid}`)?.classList?.add(style['can-drop'])
    }else{
        document?.getElementById(`side_bar_node_grid_${node?.uuid}`)?.classList?.remove(style['can-drop'])
    }
    },[canDrop])

    useEffect(()=>{
      //update css
      if(isOver){
        document?.getElementById(`side_bar_node_grid_${node?.uuid}`)?.classList?.add(style['is-over'])
    }else{
        document?.getElementById(`side_bar_node_grid_${node?.uuid}`)?.classList?.remove(style['is-over'])
    }
    },[isOver])





    return null
};

SideBarDev.propTypes = {
};

export default SideBarDev;




