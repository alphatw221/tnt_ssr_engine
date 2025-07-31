import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useCallback } from "react";
import style from './WebsiteCollaboratorList.module.scss'
// import { useSelector, useDispatch } from "react-redux";            
import { useAppSelector, useAppDispatch  } from "@/redux/hooks";       


const WebsiteCollaboratorList =({})=> {

  const {websiteCollaborators} = useAppSelector((state) => state.editor_memory);

  return (
    <Fragment>
      <div className={style['collaborators-container']}>

        {(websiteCollaborators||[]).map((collaborator,i)=>{
          return (<Fragment key={i}>
            <h3 className={style['last-name']} style={{'--index':i,backgroundColor:collaborator.themeColor, color:'black'}}>{collaborator?.user?.last_name?.[0]||'?'}</h3>
          </Fragment>)
        })}
      </div>

    </Fragment>
  )
}

WebsiteCollaboratorList.propTypes = {

};

export default WebsiteCollaboratorList;