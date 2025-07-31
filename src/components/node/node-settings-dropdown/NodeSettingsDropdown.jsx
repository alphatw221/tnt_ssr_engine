"use client"
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect,useRef } from "react";
import clsx from "clsx";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHouse, faGear, faBars } from '@fortawesome/free-solid-svg-icons'

// import style from './NodeSettingsDropdown.module.scss'

import ParameterizeForm from "../../parameterize-form/ParameterizeForm";
// import { useClickOutsideEvent } from '../../../lib/utils/clickOutside.js'

import Offcanvas from 'react-bootstrap/Offcanvas';
import {globalSettings} from '@/lib/utils/componentSettings'
const NodeSettingsDropdown = ({ 

    node ,settings, actions, update, showDropDown}) => {

    // const [showSettingsDropDown, setShowSettingsDropDown] = useState(false)
    // const [mouseDimension, setMouseDimension] = useState('dimension1')

    const updateNodeData = (data)=>{
        update({...node, data:data})

    }
    // const dropDown = useRef(null);
    // useClickOutsideEvent(useEffect, dropDown,()=>{
        
    //     actions.setShowSettingsDropDown(false)
    // },showDropDown)

    const handleOnClick = event=>{

        // if(event.clientX>window.innerWidth/2){
        //     if(event.clientY>window.innerHeight/2){
        //         setMouseDimension('dimension4')
        //     }else{
        //         setMouseDimension('dimension1')
        //     }
        // }else{
        //     if(event.clientY>window.innerHeight/2){
        //         setMouseDimension('dimension3')
        //     }else{
        //         setMouseDimension('dimension2')
        //     }
        // }
        actions.setShowSettingsDropDown(!showDropDown)
    }
    return (
        <Fragment>
            {
            // <div  className={clsx(style.settings)} >
            //   <FontAwesomeIcon  className={style.icon} icon={faGear} onClick={handleOnClick}  
            //     />


                <Offcanvas show={showDropDown} onHide={()=>{actions.setShowSettingsDropDown(false)}} placement='end'>
                    <Offcanvas.Header closeButton>
                    <Offcanvas.Title>設定</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <ParameterizeForm  
                            settings={globalSettings} 
                            data={node} setData={update}>   
                        </ParameterizeForm>
                        <ParameterizeForm  identifier={node?.uuid} settings={(settings||[])} data={node?.data} setData={updateNodeData}>            
                        </ParameterizeForm>
                    </Offcanvas.Body>
                </Offcanvas>


      
            // </div>      
            }
        </Fragment>



    )
};

NodeSettingsDropdown.propTypes = {
    // settings:PropTypes.array,
    // component: PropTypes.object,
    // actions: PropTypes.object,
    // update:PropTypes.func,
    // showDropDown:PropTypes.bool
};

export default NodeSettingsDropdown;
