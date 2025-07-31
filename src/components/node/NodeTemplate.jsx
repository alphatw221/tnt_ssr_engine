"use client"
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect ,lazy, useRef } from "react";
import clsx from "clsx";
import style from './Node.module.scss'

import {dragItems, dragItemTypes} from '../../lib/dragItems'
import { useDrag, useDrop } from 'react-dnd'


const NodeTemplate = ({ 
    node_template, 
    mode, 
    actions,
    hierarchy,
    isSudoNode

}) => {


    const ref =  useRef(null)

    //handle drag
    const [{ isDragging, opacity }, drag] = useDrag({
        type: dragItemTypes.NODE,
        item:{
            parent_node:null,
            node:node_template,
            ref:ref
        },
        // end(item, monitor){
        //     document.querySelectorAll(`.${style["highlight-border"]}`)?.forEach(e => {
        //         e.classList.remove(style["highlight-border"]);
        //     });       
        
        // },
        canDrag(monitor){
            return true
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
        
    },[node_template])

    drag(ref)

    return (<div  id={`node_template_${node_template?.uuid}`} ref={ref}>
        {node_template?.display_image && <img style={{ width:'100%', objectFit:'contain', borderRadius:'3px'}} src={node?.display_image}/>}
        <div className="text-center" style={{whiteSpace:'normal'}}>
            {node_template?.name}
        </div>
    </div>)


    
};

NodeTemplate.propTypes = {


};

export default NodeTemplate;
