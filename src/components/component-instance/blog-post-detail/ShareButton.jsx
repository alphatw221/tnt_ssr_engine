"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faSquareShareNodes } from '@fortawesome/free-solid-svg-icons'
import cogoToast from 'cogo-toast';
import clsx from "clsx";
import style from "./ShareButton.module.scss"


const ShareButton = ({})=>{


    return ( 
    <div className={clsx('分享框',style['分享框'])}>
        <label className={clsx('分享-標題',style['分享-標題'])}>分享：</label>
        <FontAwesomeIcon className={clsx('分享-按鈕',style['分享-按鈕'])} icon={faSquareShareNodes} onClick={()=>{
            // console.log(window.location.href)
            if (navigator.share) { 
                navigator.share({
                    title: document?.title,
                    url: window?.location?.href
                }).then(() => {
                    cogoToast.success("分享成功", {position: "top-right"});
                })
                .catch(err=>{});
            } else {
                navigator.clipboard.writeText(window.location.href);
                cogoToast.success("已複製連結", {position: "top-right"});
    
            }
            }}/>
    </div>)

  
}

export default ShareButton;
