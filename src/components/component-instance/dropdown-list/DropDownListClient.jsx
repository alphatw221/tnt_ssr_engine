"use client"
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useRef } from "react";
import clsx from "clsx";
import style from './DropDownList.module.scss'

// import {dragItems, dragItemTypes} from '../../lib/dragItems'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHouse, faGear, faBars } from '@fortawesome/free-solid-svg-icons'

// import { useSelector, useDispatch } from "react-redux";         
import { useAppSelector } from "@/redux/hooks";   
// import { setSideMenuActive, setComponentMenuActive} from '../../redux/slices/website-editor-slice'




// import {useClickOutsideEvent} from '@/lib/utils/clickOutside.js'

// import { rwdHelper, RWDPropHandler} from "../../lib/utils/rwdHelper"
// import { rgba2hex } from "@/lib/utils/rgba2hex";



const DropDownListClient = ({  

    node_uuid}) => {

    const websiteEditorState = useAppSelector((state) => state.website_editor);
    // const editorMemoryState = useAppSelector((state) => state.editor_memory);

    const [showDropDown, setShowDropDown] = useState(false)




    useEffect(() => {
        const handleClickOutside = (event)=> {
          if (document?.getElementById(`dropdown_list_dropdown_${node_uuid}`) && !document?.getElementById(`dropdown_list_dropdown_${node_uuid}`)?.contains(event.target)) {
            if(!websiteEditorState.showComponentSettings){
                setShowDropDown(false)
                // trigger css 
                document?.getElementById(`dropdown_list_dropdown_${node_uuid}`)?.classList?.remove(style['active'])
            }
          }
        }
        if(showDropDown){
          document.addEventListener("click", handleClickOutside,true);
        }else{
          document.removeEventListener("click", handleClickOutside,true);
        }
        return () => {document.removeEventListener("click", handleClickOutside,true);};
      }, [showDropDown])

    
    useEffect(() => {
        const toggleActive = ()=>{
            if(showDropDown){
                document?.getElementById(`dropdown_list_dropdown_${node_uuid}`)?.classList?.remove(style['active'])
                setShowDropDown(false)
            }else{
                document?.getElementById(`dropdown_list_dropdown_${node_uuid}`)?.classList?.add(style['active'])
                setShowDropDown(true)
            }
        }
        document?.getElementById(`dropdown_list_button_${node_uuid}`)?.addEventListener('click',toggleActive)
        return () => {
            document?.getElementById(`dropdown_list_button_${node_uuid}`)?.removeEventListener('click',toggleActive)
        };
    }, [showDropDown])


    return null
    
};

DropDownListClient.propTypes = {
};

export default DropDownListClient;




