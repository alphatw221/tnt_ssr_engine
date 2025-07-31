import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faGear, faBars } from '@fortawesome/free-solid-svg-icons'

import style from './FragmentSettingsDropdown.module.scss'

import ParameterizeForm from "../../parameterize-form/ParameterizeForm";

import { getCompnentSettings } from "../../../lib/utils/componentSettings";
import { useClickOutsideEvent } from "../../../lib/utils/clickOutside";

import Offcanvas from 'react-bootstrap/Offcanvas';


const FragmentSettingsDropdown = ({ 
    // pageIndex, fragmentIndex, 
    fragment , actions, update}) => {

    const [showSettingsDropDown, setShowSettingsDropDown] = useState(false)
    // const [mouseDimension, setMouseDimension] = useState('dimension1')
    const updateFragment = (data)=>{
        update(data)
    }

    const dropDown = useRef(null);
    useClickOutsideEvent(useEffect, dropDown,()=>{
        
        setShowSettingsDropDown(false)
    }, showSettingsDropDown)

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
        setShowSettingsDropDown(!showSettingsDropDown)
    }

    const settings = getCompnentSettings('fragment', actions?.getStoreUUID())

    return (
        <Fragment>
            <div className={clsx(style.settings)} >
              <FontAwesomeIcon  className={style.icon} icon={faGear} onClick={handleOnClick} />




              <Offcanvas show={showSettingsDropDown} onHide={()=>{setShowSettingsDropDown(false)}} placement='end'>
                    <Offcanvas.Header closeButton>
                    <Offcanvas.Title>設定</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <ParameterizeForm  settings={(settings||[])} data={fragment} setData={updateFragment}>            
                        </ParameterizeForm>
                    </Offcanvas.Body>
                </Offcanvas>






                {/* <div ref={dropDown} className={clsx(style.drop_down_list, showSettingsDropDown?style.show:'', style[mouseDimension])}>
                    <div className={style.title}>設定</div>
                    <div className={style.form}>
                        <ParameterizeForm  settings={(settings||[])} data={fragment} setData={updateFragment}>
                            
                        </ParameterizeForm>
                    </div>
                </div> */}
            </div>      
        </Fragment>



    )
};

FragmentSettingsDropdown.propTypes = {
    // pageIndex: PropTypes.number,
    // fragmentIndex: PropTypes.number,
    fragment: PropTypes.object,
    actions: PropTypes.object,
    update: PropTypes.func
};

export default FragmentSettingsDropdown;
