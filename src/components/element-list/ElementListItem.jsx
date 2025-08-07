import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useCallback, useRef } from "react";
// import NodeMenuItem from "./NodeMenuItem";
import style from './ElementListItem.module.scss'
import { useAppDispatch, useAppSelector } from "@/redux/hooks";        
// import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretDown, faGear, faEye, faEyeSlash, faBars, faChevronLeft, faChevronRight, faChevronUp, faChevronDown,faNotesMedical, faFile } from '@fortawesome/free-solid-svg-icons'
import MyModal from '@/components/modal/MyModal.jsx'
import ParameterizeForm from "@/components/parameterize-form/ParameterizeForm.jsx";
import ElementList from "./ElementList";

import { useDrag, useDrop } from 'react-dnd'
import { elementMenuItemHoverDropHelper } from '@/lib/utils/dragDropHelperV2.js'
import { user_r_action_to_element, user_delete_element, user_r_create_element, user_update_element } from '@/api/element.js'
// import { setNodeMenuActive, setNodeMenuQuery, setTargetWebsiteNode} from "@/redux/slices/website-editor-slice"
// import NodeTemplateMenu2 from '@/components/node-template-menu/NodeTemplateMenu2.jsx'

import { 
  setCursor
} from '@/redux/slices/editor-memory-slice'
import { elementCheckDropValidHelper } from "../../lib/utils/dragDropHelperV2";
import { getElementPropsSettingsA, getElementPropsSettingsB } from "@/lib/utils/elementPropsSettings"
import { getElementDataSettings } from "@/lib/utils/elementDataSettings"
import { getElementBaseSettingsA, getElementBaseSettingsB } from "@/lib/utils/elementBaseSettings"

const ElementListItem =({
    element, 
    actions, 
    level,
    hierarchy,
    ...props
})=> {

    const dispatch = useAppDispatch();
    const {cursor, selectedTool, clipBoard} = useAppSelector((state) => state.editor_memory);
    
    const [showSettings, setShowSettings] = useState(false);
    const [canDrag, setCanDrag] = useState(false)
    const [dragOverPosition, setDragOverPosition] = useState(null)
    const [iCursorHoverPosition, setICursorHoverPosition] = useState(null)

    const menuItemRef = useRef(null)
    const nameRef = useRef(null)
    

    const [expandElementDict, setExpandElementDict] = useState(JSON?.parse(localStorage?.getItem("expand_element_dict")||"{}")||{});
    const expandElementDictToggle = (uuid)=>{
        const _expandWebpageDict = JSON.parse(JSON.stringify(expandElementDict))
        if(_expandWebpageDict[uuid]){delete _expandWebpageDict[uuid]}
        else{_expandWebpageDict[uuid] = true}
        localStorage.setItem("expand_element_dict", JSON.stringify(_expandWebpageDict))
        setExpandElementDict(_expandWebpageDict)
    }

    const updateElement = (_element)=>{

        console.log(_element)
        user_update_element({
            'element_uuid':_element?.uuid, 
            'data':_element
        }).then(res=>{console.log(res.data)})
        actions?.globleUpdateElement(_element)
    }
    const updateElementProps = (props)=>{
        updateElement({...element, props:props})
    }

    const updateElementData = (data)=>{
        updateElement({...element, data:data})
    }



    const onMouseHoverMoveHandler = (e)=>{

        const rect = menuItemRef.current?.getBoundingClientRect();
        const clickY = e.clientY - rect.top; // 相對於元件上邊的 Y
        const height = rect.height;

        elementCheckDropValidHelper(null, element, 
            ()=>{
                if (clickY < height / 3) {
                    setICursorHoverPosition('icursor-hover-top')
                } else if (clickY < (2 * height) / 3) {
                    setICursorHoverPosition('icursor-hover-in')
                } else {
                    setICursorHoverPosition('icursor-hover-bottom')
                }
            }, 
            ()=>{setICursorHoverPosition('icursor-hover-in')}, 
            ()=>{
                if (clickY < height / 2) {
                    setICursorHoverPosition('icursor-hover-top')
                } else {
                    setICursorHoverPosition('icursor-hover-bottom')
                }
            }, 
            ()=>{}
        )
    }

    const onMouseOverHandler = ()=>{
        Array.from(document?.getElementsByClassName(element.parent_relation_uuid)).forEach(e=>e?.classList.add(style['highlight-border-strong']));
        Array.from(document?.getElementsByClassName(element.uuid)).forEach(e=>e?.classList.add(style['highlight-border']));

        if(selectedTool==='iCursor'){
            menuItemRef?.current?.addEventListener('mousemove', onMouseHoverMoveHandler)
        }
    }
    const onMouseOutHandler = ()=>{
        Array.from(document?.getElementsByClassName(element.parent_relation_uuid)).forEach(e=>e?.classList.remove(style['highlight-border-strong']));
        Array.from(document?.getElementsByClassName(element.uuid)).forEach(e=>e?.classList.remove(style['highlight-border']));


        setICursorHoverPosition(null)
        menuItemRef?.current?.removeEventListener('mousemove', onMouseHoverMoveHandler)
    }

    const onClickHandler = (e)=>{

        const rect = menuItemRef.current?.getBoundingClientRect();
        const clickY = e.clientY - rect.top; // 相對於元件上邊的 Y
        const height = rect.height;

        let position = '';
        elementCheckDropValidHelper(null, element, 
            ()=>{
                if (clickY < height / 3) {
                    position = 'before';
                } else if (clickY < (2 * height) / 3) {
                    position = 'in';
                } else {
                    position = 'after';
                }
            }, 
            ()=>{position = 'in';}, 
            ()=>{
                if (clickY < height / 2) {
                    position = 'before';
                } else {
                    position = 'after';
                }
            }, 
            ()=>{}
        )

        dispatch(setCursor(
        {
            type:'element',
            data:JSON.parse(JSON.stringify(element)),
            position
        }))
    }


    useEffect(()=>{
        if(!menuItemRef.current)return
        menuItemRef.current.addEventListener('mouseover',onMouseOverHandler)
        menuItemRef.current.addEventListener('mouseout',onMouseOutHandler)
        menuItemRef.current.addEventListener('click',onClickHandler)

        return ()=>{
            setICursorHoverPosition(null)
            menuItemRef.current?.removeEventListener('mousemove',onMouseHoverMoveHandler)
            menuItemRef.current?.removeEventListener('mouseover',onMouseOverHandler)
            menuItemRef.current?.removeEventListener('mouseout',onMouseOutHandler)
            menuItemRef.current?.removeEventListener('click',onClickHandler)
        }
    },[element, menuItemRef, menuItemRef.current, selectedTool])




    const [{ isDragOverCurrent, handlerId }, drop] = useDrop({
    
        accept:['elementListItem'],
        collect(monitor) {
          return {
            handlerId: monitor.getHandlerId(),
            isDragOverCurrent: monitor.isOver({ shallow: true }),
          }
        },
        drop: (item, monitor) => {
          if(monitor.didDrop()) return
          if(!monitor.isOver({ shallow: true })) return
    
          elementMenuItemHoverDropHelper(menuItemRef, element, item, hierarchy, monitor,
            ()=>{
              actions.globleMoveNextTo(item.element, element, 0)
              user_r_action_to_element({
                'parent_relation_uuid':item?.element?.parent_relation_uuid, 
                'action':'move',   //move/share/clone
                'target_webpage_uuid':null, 
                'target_element_relation_uuid':element.parent_relation_uuid, 
                'target_relative_position':'before'
              }).then(res=>{console.log(res.data)})
    
            },
            ()=>{
              actions.globleMoveNextTo(item.element, element, 1)
              user_r_action_to_element({
                'parent_relation_uuid':item?.element?.parent_relation_uuid, 
                'action':'move',   //move/share/clone
                'target_webpage_uuid':null, 
                'target_element_relation_uuid':element.parent_relation_uuid, 
                'target_relative_position':'after'
              }).then(res=>{console.log(res.data)})
            },
            ()=>{
              actions.globleMoveInto(item.element, element, 0, 0)
               user_r_action_to_element({
                'parent_relation_uuid':item?.element?.parent_relation_uuid, 
                'action':'move',   //move/share/clone
                'target_webpage_uuid':null, 
                'target_element_relation_uuid':element.parent_relation_uuid, 
                'target_relative_position':'in'
              }).then(res=>{console.log(res.data)})
            },
            ()=>{}
          )
    
        },
        hover(item, monitor) {
          elementMenuItemHoverDropHelper(menuItemRef, element, item, hierarchy, monitor,
            ()=>{setDragOverPosition('drag-over-top');},
            ()=>{setDragOverPosition('drag-over-bottom');},
            ()=>{setDragOverPosition('drag-over-in');},
            ()=>{setDragOverPosition(null);}
          )
    
        },
      },[element, hierarchy, actions])
    
    
      const [{ isDragging }, drag] = useDrag({
        type: 'elementListItem',
        item:{
          element:element,
        },
        canDrag(monitor){
          return canDrag},
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
        
      },[element, canDrag])
      
      drag(drop(menuItemRef))


const removeElement = ()=>{
    actions?.globleRemoveElement(element?.parent_relation_uuid)
    user_delete_element({'parent_relation_uuid':element?.parent_relation_uuid}).then(res=>{console.log(res.data)})
}
const createChildElement = ()=>{
    const sudoElement = {name:'未命名'}
    user_r_create_element({
                'target_webpage_uuid':null, 
                'target_webpage_position':null,
                'target_element_relation_uuid':element?.parent_relation_uuid, 
                'target_relative_position':'in', 
                'data':sudoElement
    }).then(res=>{console.log(res.data)})
    actions?.globleInsertInto(sudoElement, element, 0, 0)
}


// const globalSettings = [
//     {"type":"inline","inline_items":[
//         {type:'button',action:createChildElement,name:'新增子元素', style:{marginTop:'20px'}, variant:'danger'},
//         {type:'button',action:removeElement,name:'刪除元素', style:{marginTop:'20px'}, variant:'danger'},
//     ]},
//     {"key": "uuid", "name": "節點UUID", "type": "text"}, 
//     {"key": "name", "name": "名稱", "type": "input",  "inputType": "text"}, 

    
//     {"type":"accordion", "key":`expand_visibility_accordion`, "name":'發布狀態', "accordion_items":[


//         {"key": "visibility", "name": "發布狀態", "type": "select", "options": [
//             {"name": "公開", "value": "visable"}, 
//             {"name": "不公開", "value": "invisable"},  
//             {"name": "排程", "value": "schedule"}
//         ], "name_key": "name", "value_key": "value"} ,

        
//         {"key": "visible_start_time", "name": "公開時間", "type": "datetime"} ,
//         {"key": "visible_end_time", "name": "結束公開時間", "type": "datetime"} ,

//     ]},

//     {"type":"accordion", "key":`expand_element_accordion`, "name":'元素', "accordion_items":[
//         {"key": "tag_name", "name": "標籤名稱", "type": "input",  "inputType": "text"}, 
//         {"key": "type", "name": "使用組件", "type": "select", "options": [
//             {"name": "輪播牆", "value": "custom_slider"}, 
//             {"name": "文字編輯器", "value": "ck_editor"}, 
//             {"name": "顧客登入表單", "value": "customer_login_form"}, 
//             {"name": "顧客註冊表單", "value": "customer_register_form"}, 
//             {"name": "商品內容", "value": "product_detail"}, 
//             {"name": "購物車內容", "value": "cart_detail"}, 
//             {"name": "結帳表單", "value": "checkout_form"}, 
//             {"name": "訂單付款", "value": "order_payment"}, 
//             {"name": "我的訂單", "value": "my_orders"}, 
//             {"name": "我的帳戶按鈕", "value": "my_account_button"}, 
//             {"name": "購物車按鈕", "value": "cart_button"}, 
//             {"name": "商城", "value": "shop"}, 
//             {"name": "站內搜索", "value": "website_search_bar"}, 
//             {"name": "Google地圖", "value": "google_map"}, 
//             {"name": "聯絡我們表單", "value": "contact_us_form"}, 
//             {"name": "文章內容", "value": "blog_post_detail"}, 
//         ], "name_key": "name", "value_key": "value"},      
//         {"key": "props", "name": "屬性", "type": "json"}, 
//     ]},
//     {"type":"accordion", "key":`expand_html_accordion`, "name":'內嵌文字', "accordion_items":[
//         {"key": "inner_html", "name": "內嵌文字", "type": "monaco_editor", "height":"95vh", "options":{"fontSize":"20px"}}, 
//     ]},
    
   
    

// ]

const elementPropsSettingsA = getElementPropsSettingsA(element)
const elementPropsSettingsB = getElementPropsSettingsB(element)
const elementDataSettings = getElementDataSettings(element?.type, actions?.getStoreUUID())
const elementBaseSettingsA = getElementBaseSettingsA({createChildElement, removeElement})
const elementBaseSettingsB = getElementBaseSettingsB()
    return (
        <Fragment>
            <div ref={menuItemRef} className={
                `${style['item']} ${style[`level-${level}`]} 
                ${isDragOverCurrent && dragOverPosition?style?.[dragOverPosition]:''} 
                ${selectedTool=='iCursor' && iCursorHoverPosition ? style?.[iCursorHoverPosition]:''}
                ${cursor?.type=='element' && cursor?.data?.parent_relation_uuid==element?.parent_relation_uuid ? style['focus']:''}
                ${cursor?.type=='element' && cursor?.data?.parent_relation_uuid==element?.parent_relation_uuid && selectedTool=='iCursor' ? style[`focus-${cursor?.position}`]:''}
                ${expandElementDict?.[element?.parent_relation_uuid]? style['expand'] :''}
                `}>

                <FontAwesomeIcon 
                    className={`${style['drag-icon']}`}  
                    icon={faBars} 
                    onMouseEnter={()=>{setCanDrag(true)}} 
                    onMouseLeave={()=>{setCanDrag(false)}} />

                <h3 ref={nameRef} className={`${style['name']}`}>{element?.name||'未命名'}</h3>

                <FontAwesomeIcon 
                    className={`${style['expand-icon']}`}
                    icon={expandElementDict?.[element?.parent_relation_uuid]?faCaretDown:faCaretRight}
                    onClick={()=>{expandElementDictToggle(element?.parent_relation_uuid)}}
                />

                <FontAwesomeIcon  
                    className={`${style['visible-icon']}`} 
                    icon={props?.hideElementDict?.[element?.parent_relation_uuid]?faEyeSlash:faEye} 
                    onClick={()=>{
                        actions?.hideElementDictToggle?.(element?.parent_relation_uuid)
                    }} />

                <FontAwesomeIcon  
                    className={`${style['settings-icon']}`}
                    icon={faGear} 
                    onClick={()=>{setShowSettings(!showSettings)}} />
            </div>

            {
                (element?.children||[]).length>0 && expandElementDict?.[element?.parent_relation_uuid] &&
                <ElementList elements={element?.children} actions={actions} level={level+1} hierarchy={[...(hierarchy||[]), {'uuid':element?.uuid, 'parent_relation_uuid':element?.parent_relation_uuid}]} {...props}/>
            }
            
            <MyModal isOpen={showSettings} onClose={setShowSettings} title='元素設定' placement='right'>
                <ParameterizeForm  
                    settings={elementBaseSettingsA} 
                    data={element} 
                    setData={updateElement}>            
                </ParameterizeForm>  
                <ParameterizeForm  
                    settings={elementPropsSettingsA} 
                    data={element.props} 
                    setData={updateElementProps}>            
                </ParameterizeForm>  
                 <ParameterizeForm  
                    settings={elementBaseSettingsB} 
                    data={element} 
                    setData={updateElement}>            
                </ParameterizeForm>  
                <ParameterizeForm  
                    settings={elementPropsSettingsB} 
                    data={element.props} 
                    setData={updateElementProps}>            
                </ParameterizeForm>  
                <ParameterizeForm  
                    settings={elementDataSettings} 
                    data={element.data} 
                    setData={updateElementData}>            
                </ParameterizeForm>  
            </MyModal>


        </Fragment>

    );
}

ElementListItem.propTypes = {
};

export default ElementListItem;