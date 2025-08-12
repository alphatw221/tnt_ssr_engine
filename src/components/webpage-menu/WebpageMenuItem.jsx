import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useCallback, useRef } from "react";
// import NodeMenuItem from "./NodeMenuItem";
import style from './WebpageMenuItem.module.scss'
import { useAppDispatch, useAppSelector } from "@/redux/hooks";        
// import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretDown, faGear, faPlus, faBars, faChevronLeft, faChevronRight, faChevronUp, faChevronDown,faNotesMedical, faFile } from '@fortawesome/free-solid-svg-icons'
import MyModal from '@/components/modal/MyModal.jsx'
import ParameterizeForm from "@/components/parameterize-form/ParameterizeForm.jsx";


// import { setNodeMenuActive, setNodeMenuQuery, setTargetWebsiteNode} from "@/redux/slices/website-editor-slice"
// import NodeTemplateMenu2 from '@/components/node-template-menu/NodeTemplateMenu2.jsx'

    
import ElementList from '@/components/element-list/ElementList'

import {user_r_create_element, user_r_action_to_element} from '@/api/element.js'
import {user_r_action_to_webpage, user_delete_webpage, user_update_webpage_cache} from '@/api/webpage.js'
import { useDrag, useDrop } from 'react-dnd'


import {webpageMenuItemHoverDropHelper} from '@/lib/utils/dragDropHelperV2.js'
import { 
  setCursor
} from '@/redux/slices/editor-memory-slice'
const WebpageMenuItem =({
    webpage, 
    actions, 
    ...props
})=> {

    const dispatch = useAppDispatch();
    const {cursor, selectedTool, clipBoard} = useAppSelector((state) => state.editor_memory);

    const [showSettings, setShowSettings] = useState(false);
    const [canDrag, setCanDrag] = useState(false)
    const [dragOverPosition, setDragOverPosition] = useState(null)
    const [iCursorHoverPosition, setICursorHoverPosition] = useState(null)

    const [iCursorHoverHeadBlock, setICursorHoverHeadBlock] = useState(false)
    const [iCursorHoverBodyBlock, setICursorHoverBodyBlock] = useState(false)

    const [expandWebpageDict, setExpandWebpageDict] = useState(JSON?.parse(localStorage?.getItem("expand_webpage_dict")||"{}")||{});
    const expandWebpageDictToggle = (uuid)=>{
        const _expandWebpageDict = JSON.parse(JSON.stringify(expandWebpageDict))
        if(_expandWebpageDict[uuid]){delete _expandWebpageDict[uuid]}
        else{_expandWebpageDict[uuid] = true}
        localStorage.setItem("expand_webpage_dict", JSON.stringify(_expandWebpageDict))
        setExpandWebpageDict(_expandWebpageDict)
    }

    const updateWebpage = (_webpage)=>{
        actions?.updateWebpage(_webpage)
    }
    const updateWebpageData = (data)=>{
        actions?.updateWebpage({...webpage, data:data})
    }


    const addElement = (position)=>{
        const sudoElement = {name:'未命名'}
        user_r_create_element({
            'target_webpage_uuid':webpage?.uuid, 
            'target_webpage_position':position,
            'target_element_relation_uuid':null, 
            'target_relative_position':null, 
            'data':sudoElement
        }).then(res=>{console.log(res.data)})

        actions?.addWebpageElement(webpage?.uuid, position, sudoElement)
    }

    const removeWebpage = ()=>{
        actions?.removeWebpage(webpage?.uuid)
        user_delete_webpage({'webpage_uuid':webpage?.uuid}).then(res=>{console.log(res.data)})
    }


    const webpageMenuItemRef = useRef(null)
    const webpageHeadBlockRef = useRef(null)
    const webpageBodyBlockRef = useRef(null)

    const [{ isDragOverCurrent, handlerId }, drop] = useDrop({

        accept:['webpageMenuItem'],
        collect(monitor) {
        return {
            handlerId: monitor.getHandlerId(),
            isDragOverCurrent: monitor.isOver({ shallow: true }),
        }
        },
        drop: (item, monitor) => {
            if(monitor.didDrop()) return
            if(!monitor.isOver({ shallow: true })) return

            webpageMenuItemHoverDropHelper(webpageMenuItemRef, webpage, item, monitor,
                ()=>{
                    actions?.webpageMoveNextTo(item?.webpage, webpage, 0);
                    user_r_action_to_webpage({
                        'webpage_uuid':item?.webpage?.uuid,
                        'action':'move',
                        'target_webpage_uuid':webpage?.uuid,
                        'target_relative_position':'before'
                    }).then(res=>{console.log(res.data)})
                },
                ()=>{
                    actions?.webpageMoveNextTo(item?.webpage, webpage, 1);
                    user_r_action_to_webpage({
                        'webpage_uuid':item?.webpage?.uuid,
                        'action':'move',
                        'target_webpage_uuid':webpage?.uuid,
                        'target_relative_position':'after'
                    }).then(res=>{console.log(res.data)})
                },
                ()=>{},
                ()=>{}
            )

        },
        hover(item, monitor) {
            webpageMenuItemHoverDropHelper(webpageMenuItemRef, webpage, item, monitor,
                ()=>{setDragOverPosition('hover-top');},
                ()=>{setDragOverPosition('hover-bottom');},
                ()=>{setDragOverPosition('hover-in');},
                ()=>{setDragOverPosition(null);}
            )

        },
    },[webpage, actions])


    const [{ isDragging }, drag] = useDrag({
        type: 'webpageMenuItem',
        item:{
        webpage:webpage,
        },
        canDrag(monitor){
        return canDrag},
        collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        }),
        
    },[webpage, canDrag])
    
    




    const [{ isOverHead, headHandlerId }, dropHead] = useDrop({

        accept:['elementListItem'],
        collect(monitor) {
        return {
            headHandlerId: monitor.getHandlerId(),
            isOverHead: monitor.isOver({ shallow: true }),
        }
        },
        drop: (item, monitor) => {
            if(monitor.didDrop()) return
            if(!monitor.isOver({ shallow: true })) return
            webpageMenuItemHoverDropHelper(webpageHeadBlockRef, webpage, item, monitor, 
                ()=>{},
                ()=>{},
                ()=>{
                    actions.moveIntoWebpageHead(item?.element, webpage, 0);
                    user_r_action_to_element({
                        'parent_relation_uuid':item?.element?.parent_relation_uuid,
                        'action':'move',
                        'target_webpage_uuid':webpage?.uuid,
                        'target_webpage_position':'head',
                    }).then(res=>{console.log(res.data)})
                },
                ()=>{},
            )

        },
        // hover(item, monitor) {
        //     webpageMenuItemHoverDropHelper(webpageHeadBlockRef, webpage, item, monitor, 
        //         ()=>{},
        //         ()=>{},
        //         ()=>{},
        //         ()=>{},
        //     )

        // },
    },[webpage, actions])


    const [{ isOverBody, bodyHandlerId }, dropBody] = useDrop({

        accept:['elementListItem'],
        collect(monitor) {
        return {
            bodyHandlerId: monitor.getHandlerId(),
            isOverBody: monitor.isOver({ shallow: true }),
        }
        },
        drop: (item, monitor) => {
        if(monitor.didDrop()) return
        if(!monitor.isOver({ shallow: true })) return
            webpageMenuItemHoverDropHelper(webpageBodyBlockRef, webpage, item, monitor, 
                ()=>{},
                ()=>{},
                ()=>{
                    actions.moveIntoWebpageBody(item?.element, webpage, 0);
                      user_r_action_to_element({
                        'parent_relation_uuid':item?.element?.parent_relation_uuid,
                        'action':'move',
                        'target_webpage_uuid':webpage?.uuid,
                        'target_webpage_position':'body',
                    }).then(res=>{console.log(res.data)})
                },
                ()=>{},
            )

        },
        // hover(item, monitor) {
        //     webpageMenuItemHoverDropHelper(webpageBodyBlockRef, webpage, item, monitor, 
        //         ()=>{},
        //         ()=>{},
        //         ()=>{},
        //         ()=>{},
        //     )

        // },
    },[webpage, actions])

    const updateWebpageCache = ()=>{
        if(confirm('確認發布更新')){
            user_update_webpage_cache({'webpage_uuid':webpage.uuid}).then(res=>{console.log(res.data)})
        }
    }

    const navigateToWebpage = ()=>{
        actions?.switchWebpage?.(webpage?.name)
    }
 

    drag(drop(webpageMenuItemRef))
    useEffect(()=>{dropHead(webpageHeadBlockRef)},[webpageHeadBlockRef.current])
    useEffect(()=>{dropBody(webpageBodyBlockRef)},[webpageBodyBlockRef.current])

    const globalSettings = [
        {"type":"inline","inline_items":[
            {type:'button',action:navigateToWebpage,name:'前往', style:{marginRight:'10px'}, variant:'danger'},
            {type:'button',action:updateWebpageCache,name:'發佈更新', style:{marginRight:'10px'}, variant:'danger'},
            {type:'button',action:removeWebpage,name:'刪除網頁', style:{}, variant:'danger'},
        ]},
        {"key": "uuid", "name": "節點UUID", "type": "text"}, 
        {"key": "name", "name": "名稱", "type": "input",  "inputType": "text"}, 

        {"type":"accordion", "key":`expand_visibility_accordion`, "name":'發布狀態', "accordion_items":[


            {"key": "visibility", "name": "發布狀態", "type": "select", "options": [
                {"name": "公開", "value": "visable"}, 
                {"name": "不公開", "value": "invisable"},  
                {"name": "排程", "value": "schedule"}
            ], "name_key": "name", "value_key": "value"} ,

            
            {"key": "visible_start_time", "name": "公開時間", "type": "datetime"} ,
            {"key": "visible_end_time", "name": "結束公開時間", "type": "datetime"} ,

        ]},

        
    ]

    const webpageDataSettings = [
        {"type":"accordion", "key":`expand_meta_accordion`, "name":'網頁META', "accordion_items":[
             {"key": "description", "name": "網頁敘述", "type": "input",  "inputType": "text"}, 
            {"key": "keywords", "name": "網頁關鍵字", "type": "input",  "inputType": "text"}, 

            {"key": "og_title", "name": "OpenGraph標題", "type": "input",  "inputType": "text"}, 
            {"key": "og_description", "name": "OpenGraph敘述", "type": "input",  "inputType": "text"}, 

            {'key': `og_image1`, "name": `OpenGraph圖片1`, "type": "image"},
            {'key': `og_image2`, "name": `OpenGraph圖片2`, "type": "image"},
        ]}
       
    ]

    const onMouseHoverMoveHandler = (e)=>{

        const rect = webpageMenuItemRef.current?.getBoundingClientRect();
        const clickY = e.clientY - rect.top; // 相對於元件上邊的 Y
        const height = rect.height;

        if (clickY < height / 2) {
            setICursorHoverPosition('icursor-hover-top')
        }else {
            setICursorHoverPosition('icursor-hover-bottom')
        }

    }
    
    const onMouseOverHandler = ()=>{
        Array.from(document?.getElementsByClassName(webpage.uuid)).forEach(e=>e?.classList.add(style['highlight-border-strong']));
        if(selectedTool==='iCursor'){
            webpageMenuItemRef?.current?.addEventListener('mousemove', onMouseHoverMoveHandler)
        }
    }
    const onMouseOutHandler = ()=>{
        Array.from(document?.getElementsByClassName(webpage.uuid)).forEach(e=>e?.classList.remove(style['highlight-border-strong']));
        setICursorHoverPosition(null)
        webpageMenuItemRef?.current?.removeEventListener('mousemove', onMouseHoverMoveHandler)
    }
    

    const onClickHandler = (e)=>{ 
            
        const rect = webpageMenuItemRef.current?.getBoundingClientRect();
        const clickY = e.clientY - rect.top; // 相對於元件上邊的 Y
        const height = rect.height;

        let position = '';
        if (clickY < height / 2) {
        position = 'before';
        }else {
            position = 'after';
        }

        dispatch(setCursor({
            type:'webpage',
            data:JSON.parse(JSON.stringify(webpage)),
            position
        }))
    }



    useEffect(()=>{
            if(!webpageMenuItemRef.current)return
            webpageMenuItemRef.current.addEventListener('mouseover',onMouseOverHandler)
            webpageMenuItemRef.current.addEventListener('mouseout',onMouseOutHandler)
            webpageMenuItemRef.current.addEventListener('click',onClickHandler)
    
            return ()=>{
                setICursorHoverPosition(null)
                webpageMenuItemRef.current?.removeEventListener('mousemove',onMouseHoverMoveHandler)
                webpageMenuItemRef.current?.removeEventListener('mouseover',onMouseOverHandler)
                webpageMenuItemRef.current?.removeEventListener('mouseout',onMouseOutHandler)
                webpageMenuItemRef.current?.removeEventListener('click',onClickHandler)
            }
    },[webpage, webpageMenuItemRef, webpageMenuItemRef.current, selectedTool])
    

    const onMouseOverHeadBlockHandler = ()=>{
        Array.from(document?.getElementsByClassName(webpage.uuid)).forEach(e=>e?.classList.add(style['highlight-border-strong']));
        if(selectedTool==='iCursor'){setICursorHoverHeadBlock(true)}
    }
    const onMouseOutHeadBlockHandler = ()=>{
        Array.from(document?.getElementsByClassName(webpage.uuid)).forEach(e=>e?.classList.remove(style['highlight-border-strong']));
        setICursorHoverHeadBlock(false)
    }
    const onClickHeadBlockHandler = (e)=>{ 
        dispatch(setCursor({
            type:'webpage',
            data:JSON.parse(JSON.stringify(webpage)),
            position:'in',
            head:true,
        }))
    }
    useEffect(()=>{
            if(!webpageHeadBlockRef.current)return
            webpageHeadBlockRef.current.addEventListener('mouseover',onMouseOverHeadBlockHandler)
            webpageHeadBlockRef.current.addEventListener('mouseout',onMouseOutHeadBlockHandler)
            webpageHeadBlockRef.current.addEventListener('click',onClickHeadBlockHandler)
            return ()=>{
                setICursorHoverHeadBlock(false)
                webpageHeadBlockRef.current?.removeEventListener('mouseover',onMouseOverHeadBlockHandler)
                webpageHeadBlockRef.current?.removeEventListener('mouseout',onMouseOutHeadBlockHandler)
                webpageHeadBlockRef.current?.removeEventListener('click',onClickHeadBlockHandler)
            }
    },[webpage, webpageHeadBlockRef, webpageHeadBlockRef.current, selectedTool])







    const onMouseOverBodyBlockHandler = ()=>{
        Array.from(document?.getElementsByClassName(webpage.uuid)).forEach(e=>e?.classList.add(style['highlight-border-strong']));
        if(selectedTool==='iCursor'){setICursorHoverBodyBlock(true)}
    }
    const onMouseOutBodyBlockHandler = ()=>{
        Array.from(document?.getElementsByClassName(webpage.uuid)).forEach(e=>e?.classList.remove(style['highlight-border-strong']));
        setICursorHoverBodyBlock(false)
    }
    const onClickBodyBlockHandler = (e)=>{ 
        dispatch(setCursor({
            type:'webpage',
            data:JSON.parse(JSON.stringify(webpage)),
            position:'in',
            head:false,
        }))
    }
    useEffect(()=>{
            if(!webpageBodyBlockRef.current)return
            webpageBodyBlockRef.current.addEventListener('mouseover',onMouseOverBodyBlockHandler)
            webpageBodyBlockRef.current.addEventListener('mouseout',onMouseOutBodyBlockHandler)
            webpageBodyBlockRef.current.addEventListener('click',onClickBodyBlockHandler)
            return ()=>{
                setICursorHoverBodyBlock(false)
                webpageBodyBlockRef.current?.removeEventListener('mouseover',onMouseOverBodyBlockHandler)
                webpageBodyBlockRef.current?.removeEventListener('mouseout',onMouseOutBodyBlockHandler)
                webpageBodyBlockRef.current?.removeEventListener('click',onClickBodyBlockHandler)
            }
    },[webpage, webpageBodyBlockRef, webpageBodyBlockRef.current, selectedTool])



    return (
        <Fragment>
            <div className={`
            ${style['item']} 
            ${isDragOverCurrent && dragOverPosition?style?.[dragOverPosition]:''} 
            ${selectedTool=='iCursor' && iCursorHoverPosition ? style?.[iCursorHoverPosition]:''}
            ${cursor?.type=='webpage' && cursor?.data?.uuid==webpage?.uuid ? style['focus']:''}
            ${cursor?.type=='webpage' && cursor?.data?.uuid==webpage?.uuid && selectedTool=='iCursor'&& cursor?.position!='in' ? style[`focus-${cursor?.position}`]:''}
            `} 
            ref={webpageMenuItemRef}>
                
                <FontAwesomeIcon 
                    className={`${style['drag-icon']}`}  
                    icon={faBars} 
                    onMouseEnter={()=>{setCanDrag(true)}} 
                    onMouseLeave={()=>{setCanDrag(false)}} />
                <h3 className={`${style['name']}`}>{webpage.name||'未命名'}</h3>

                <FontAwesomeIcon 
                    className={`${style['expand-icon']}`}
                    icon={expandWebpageDict?.[webpage?.uuid]?faCaretDown:faCaretRight}
                    onClick={()=>{expandWebpageDictToggle(webpage?.uuid)}}
                />

                <FontAwesomeIcon  
                    className={`${style['settings-icon']}`}
                    icon={faGear} 
                    onClick={()=>{setShowSettings(!showSettings)}} />
            </div>

            {   
                expandWebpageDict?.[webpage?.uuid]
                &&
                <Fragment>
                    <div ref={webpageHeadBlockRef} 
                        className={`
                        ${style['title-block']} 
                        ${isOverHead?style['hover-in']:''} 
                        ${iCursorHoverHeadBlock?style['icursor-hover-in']:''}
                        ${cursor?.type=='webpage' && cursor?.data?.uuid==webpage?.uuid && selectedTool=='iCursor'&& cursor?.position=='in' && cursor?.head ? style[`focus-in`]:''}


                        `} >
                        <h5 className={`${style['title']}`}>HEAD元素</h5>
                        <FontAwesomeIcon 
                            className={`${style['expand-head-icon']}`}
                            icon={expandWebpageDict?.[`${webpage?.uuid}_head`]?faCaretDown:faCaretRight}
                            onClick={()=>{expandWebpageDictToggle(`${webpage?.uuid}_head`)}}
                        />
                        <button className={`${style['add-btn']}`} onClick={()=>{addElement('head')}}>
                            <FontAwesomeIcon icon={faPlus}/>
                        <div className={style['tooltip']} >新增元素</div>
                        </button>
                    </div>
                    { expandWebpageDict?.[`${webpage?.uuid}_head`] &&
                        <ElementList elements={webpage?.head_elements} actions={actions} level={0} {...props}/>
                    }
                    <div ref={webpageBodyBlockRef} 
                        className={`
                        ${style['title-block']} 
                        ${isOverBody?style['hover-in']:''} 
                        ${iCursorHoverBodyBlock?style['icursor-hover-in']:''}
                        ${cursor?.type=='webpage' && cursor?.data?.uuid==webpage?.uuid && selectedTool=='iCursor'&& cursor?.position=='in' && !cursor?.head ? style[`focus-in`]:''}
                        `} >
                        <h5 className={`${style['title']}`}>BODY元素</h5>
                        <FontAwesomeIcon 
                            className={`${style['expand-body-icon']}`}
                            icon={expandWebpageDict?.[`${webpage?.uuid}_body`]?faCaretDown:faCaretRight}
                            onClick={()=>{expandWebpageDictToggle(`${webpage?.uuid}_body`)}}
                        />
                        <button className={`${style['add-btn']}`} onClick={()=>{addElement('body')}}><FontAwesomeIcon icon={faPlus}/>
                        <div className={style['tooltip']} >新增元素</div>
                        </button>
                    </div>
                    { expandWebpageDict?.[`${webpage?.uuid}_body`] &&
                        <ElementList elements={webpage?.body_elements} actions={actions} level={0} {...props}/>
                    }
                </Fragment>
              
            }
            



             <MyModal isOpen={showSettings} onClose={setShowSettings} title='網頁設定' placement='right'>
                <ParameterizeForm  
                    settings={globalSettings} 
                    data={webpage} 
                    setData={updateWebpage}>            
                </ParameterizeForm>  
                <ParameterizeForm  
                    settings={webpageDataSettings} 
                    data={webpage.data} 
                    setData={updateWebpageData}>            
                </ParameterizeForm>  
            </MyModal>


        </Fragment>

    );
}

WebpageMenuItem.propTypes = {
};

export default WebpageMenuItem;