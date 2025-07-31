import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useCallback } from "react";
import style from './EditorToolBar.module.scss'
// import { useSelector, useDispatch } from "react-redux";            
import { useAppSelector, useAppDispatch  } from "@/redux/hooks";       
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faICursor, faGear, faHand, faArrowPointer} from '@fortawesome/free-solid-svg-icons'
import clsx from "clsx";

// import { 
//   setSelectedTool,
//   setShowComponentSettings
// } from '@/redux/slices/website-editor-slice'

import { 
  setSelectedTool,
  setShowComponentSettings
} from '@/redux/slices/editor-memory-slice'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowPointer, faHand, faICursor } from "@fortawesome/free-solid-svg-icons";
const EditorToolBar =({})=> {

  const {selectedTool} = useAppSelector((state) => state.editor_memory);
  const dispatch = useAppDispatch()

  return (
    <Fragment>
      <div className={style['toolbar-container']}>

    
        <div 
          onClick={()=>{if(selectedTool==='arrow'){
            dispatch(setSelectedTool('')); 
            // dispatch(setShowComponentSettings(false));
          }else{
            dispatch(setSelectedTool('arrow')); 
            // dispatch(setShowComponentSettings(true));
          } }}
          className={clsx(style['tool'], selectedTool==='arrow'?style['active']:'')}>


          <FontAwesomeIcon icon={faArrowPointer}/>
        </div>
        <div 
          onClick={()=>{if(selectedTool==='drag'){
            dispatch(setSelectedTool('')); 
            // dispatch(setShowComponentSettings(false));
          }else{
            dispatch(setSelectedTool('drag')); 
            // dispatch(setShowComponentSettings(true));
          }}}
          className={clsx(style['tool'], selectedTool==='drag'?style['active']:'')}>
            <FontAwesomeIcon icon={faHand}/>
          <div className={style['tooltip']} >拖拉工具</div>
        </div>
        <div 
          onClick={()=>{if(selectedTool==='iCursor'){
            dispatch(setSelectedTool('')); 
            // dispatch(setShowComponentSettings(false));
          }else{
            dispatch(setSelectedTool('iCursor')); 
            // dispatch(setShowComponentSettings(true));
          } }}
          className={clsx(style['tool'], selectedTool==='iCursor'?style['active']:'')}>
            <FontAwesomeIcon icon={faICursor}/>
          <div className={style['tooltip']} >游標工具</div>
        </div>
      </div>

    </Fragment>
  )
}

EditorToolBar.propTypes = {

};

export default EditorToolBar;