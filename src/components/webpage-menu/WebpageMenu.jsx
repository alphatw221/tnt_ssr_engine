import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useCallback } from "react";
// import NodeMenuItem from "./NodeMenuItem";
import style from './WebpageMenu.module.scss'
import { useAppDispatch, useAppSelector } from "@/redux/hooks";        
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faP, faPlus } from '@fortawesome/free-solid-svg-icons'


// import { setNodeMenuActive, setNodeMenuQuery, setTargetWebsiteNode} from "@/redux/slices/website-editor-slice"
// import NodeTemplateMenu2 from '@/components/node-template-menu/NodeTemplateMenu2.jsx'

import WebpageMenuItem from './WebpageMenuItem'


const WebpageMenu =({
    webpages, 
    actions, 
    ...props
})=> {

    const dispatch = useAppDispatch();
    const [nodeTemplateActive, setNodeTemplateActive] = useState(false)

    const addWebpage = ()=>{
        actions?.addWebpage()
    }




    return (
        <Fragment>
            <div className={`${style['title-block']}`}>
                <h3 className={`${style['title']}`}>網頁</h3>
                <div className={`${style['add-btn']}`} onClick={addWebpage}>
                    <FontAwesomeIcon icon={faPlus}/>
                    <div className={style['tooltip']} >新增網頁</div>
                </div>
            </div>
            <div className={`${style['body-block']}`}>
                {
                    (webpages||[]).length>0
                    ?
                    (webpages||[]).map((webpage, i)=><WebpageMenuItem key={i} webpage={webpage} actions={actions} {...props}/>)
                    :
                    <span className={`${style['no-item-text']}`}>無網頁</span>
                }
            </div>
        </Fragment>

    );
}

WebpageMenu.propTypes = {
};

export default WebpageMenu;