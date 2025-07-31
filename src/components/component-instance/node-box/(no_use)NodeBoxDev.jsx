"use client"
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useRef } from "react";
// import clsx from "clsx";
// import style from './NodeBox.module.scss'



// import { useAppSelector } from "@/redux/hooks";         

import {dragItems, dragItemTypes} from '@/lib/dragItems'
import { useDrop } from 'react-dnd'




// import { rwdHelper, RWDPropHandler} from "../../lib/utils/rwdHelper"

import style from './NodeBox.module.scss'
import { useAppDispatch, useAppSelector } from "@/redux/hooks";        

import { containerNodeHandleDropNodeHelper } from "@/lib/utils/dragDropHelper.js"
const NodeBoxDev = ({  

    node,  mode, actions}) => {
    // const dispatch = useAppDispatch();


   
        
        // const [{ canDrop, isOver }, drop] = useDrop(
        //     () => ({
        //       accept: [dragItemTypes.NODE],
        //       drop: (item, monitor) => {
        //         if(monitor.didDrop()) return
        //         if(mode!='edit')return
        //         if(item?.node?.uuid==node?.uuid)return
        //         containerNodeHandleDropNodeHelper(item, node, actions)
        //         return

        //       },
        //       collect: (monitor) => ({
        //         isOver: monitor.isOver(),
        //         canDrop: monitor.canDrop(),
        //       }),
        //     }),
        //     [dragItemTypes, node, actions],)
        

        // // console.log(document.getElementById(`node_box_${node?.uuid}`))
        // setTimeout(()=>{drop(document.getElementById(`node_${node?.uuid}`))},10)
        


        // useEffect(()=>{
        //   //update css
        //   if(canDrop){
        //     document.getElementById(`node_${node?.uuid}`)?.classList?.add(style['can-drop'])
        // }else{
        //     document.getElementById(`node_${node?.uuid}`)?.classList?.remove(style['can-drop'])
        // }
        // },[canDrop])

        // useEffect(()=>{
        //   //update css
        //   if(isOver){
        //     document.getElementById(`node_${node?.uuid}`)?.classList?.add(style['is-over'])
        // }else{
        //     document.getElementById(`node_${node?.uuid}`)?.classList?.remove(style['is-over'])
        // }
        // },[isOver])
        
        return null


};

NodeBoxDev.propTypes = {
};

export default NodeBoxDev;




