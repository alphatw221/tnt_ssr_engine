"use client"
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect ,lazy, useRef } from "react";
import clsx from "clsx";
import style from './Node.module.scss'

import {dragItems, dragItemTypes} from '../../lib/dragItems'
import { useDrag, useDrop } from 'react-dnd'
import NodeSettingsDropdown from "./node-settings-dropdown/NodeSettingsDropdown";
import { getCompnentSettings } from "../../lib/utils/componentSettings";
         
import { useAppSelector, useAppDispatch  } from "@/redux/hooks";       


import EventsForm from '@/components/listen-events-form/EventsForm'
import MouseEventForm from '@/components/listen-events-form/listen-event-form/MouseEventForm'
import ListenEventForm from "@/components/listen-events-form/listen-event-form/ListenEventForm";
import PresentEventForm from "@/components/listen-events-form/listen-event-form/PresentEventForm";
import MouseClickOutsideEventForm from '@/components/listen-events-form/listen-event-form/MouseClickOutsideEventForm'

import SelectRelativePositionModal from "@/components/select-relative-position-modal/SelectRelativePositionModal"


import {  user_update_node, user_delete_node,  } from '@/api/node.js'

import {  setCursorDirection } from "@/redux/slices/editor-memory-slice";
import { nodeMouseEventPositionHelper } from "@/lib/utils/nodeHelper";
const NodeClientDev = ({ 
    parent_node,
    node, 
    mode, actions,
    hierarchy,
    isSudoNode

}) => {
    const dispatch = useAppDispatch();
    const websiteEditorState = useAppSelector((state) => state.website_editor);
    const [showSettingsDropDown, setShowSettingsDropDown] = useState(false)
    const [showSelectRelativePositionModal, setShowSelectRelativePositionModal] = useState(false)

    const [avaliableNodes, setAvaliableNodes] = useState([])
    const [dragItem, setDragItem] = useState(null)

    const removeNode = ()=>{

        actions?.globleRemoveNode(node?.uuid)
        user_delete_node(node?.uuid).then(res=>{
            console.log(res.data)

          }).catch(err=>{
            console.log(err)
          })
    }


    const updateNode = (node)=>{
        
        actions?.globleUpdateNode(node)
        user_update_node(node?.uuid, node, true).then(res=>{
            console.log(res.data)


        }).catch(err=>{
            console.log(err)
        })
    }



    //handle drag
    const [{ isDragging, opacity }, drag] = useDrag({
        type: dragItemTypes.NODE,
        item:{
            parent_node:parent_node,
            node:node,
            ref:{current:document?.querySelector(`#node_${node?.uuid}.base-node`)}
        },
        end(item, monitor){
            document.querySelectorAll(`.${style["highlight-border"]}`)?.forEach(e => {
                e.classList.remove(style["highlight-border"]);
            });       
        
        
        
        
        
        
        
        },
        canDrag(monitor){
            if(mode=='display')return true  
            return websiteEditorState.selectedTool==='drag';
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
        
    },[node, parent_node, mode, websiteEditorState.selectedTool])

    
    
    const [{ CanDrop, isOver, isOverCurrent }, drop] = useDrop(
            () => ({
              accept: [dragItemTypes.NODE],
              drop: (item, monitor) => {
                if(monitor.didDrop()) return
                if(!monitor.isOver({ shallow: true })) return

                // document.querySelectorAll(`.${style["highlight-border"]}`)?.forEach(e => {
                //     e.classList.remove(style["highlight-border"]);
                // });
                // highlightedElements.forEach((el) => {el.classList.remove("highlight-border");});


                const clientOffset = monitor.getClientOffset()
                const elements = document?.elementsFromPoint(clientOffset.x, clientOffset.y)
                .filter(el=>el.classList.contains("base-node")&&el.id!=`node_${item?.node?.uuid}`)
                .map((el)=>{
                        const node_uuid = el.id.replace('node_','')
                        const array = actions.globleFindNode(node_uuid)
                        if (!array) return null
                        const [n, _, __, ___, p] = array
                        return n
                    })


                setAvaliableNodes(elements)
                setDragItem(item)
                setShowSelectRelativePositionModal(true)


              },
              hover:(item, monitor)=>{
                
                // 遍歷並移除類別
                // highlightedElements.forEach((el) => {el?.classList?.remove(style["highlight-border"]);});


                // document.querySelectorAll(`.${style["highlight-border"]}`)?.forEach(e => {
                //     e.classList.remove(style["highlight-border"]);
                // });
      


                // const clientOffset = monitor.getClientOffset()

                // // let elements = []
                // // try{
                // //     elements = document?.elementsFromPoint(clientOffset.x, clientOffset.y)
                    
                // // }catch(e){
                // //     console.log(`${clientOffset.x},${clientOffset.y}` )
                // // }
                // const elements = document?.elementsFromPoint(clientOffset.x, clientOffset.y)
                // elements.filter(el=>el.classList.contains("base-node")&&el.id!=`node_${item?.node?.uuid}`)
                // .forEach((el) => el.classList.add(style["highlight-border"]));


              },
              canDrop: (item, monitor)=>{
                if(item?.node?.uuid == node?.uuid) {return false}
                return true
                // TODO check hierarchy
              }
              ,
              collect: (monitor) => ({
                isOver: monitor.isOver(),
                isOverCurrent: monitor.isOver({ shallow: true }),
                CanDrop: monitor.canDrop(),
              }),
            }),
            [node, actions, setAvaliableNodes, setDragItem, setShowSelectRelativePositionModal],
        )

    useEffect(()=>{
       if(CanDrop && isOver){
        document?.querySelector(`#node_${node?.uuid}.base-node`)?.classList?.add(style["highlight-border"])
       }else{
        document?.querySelector(`#node_${node?.uuid}.base-node`)?.classList.remove(style["highlight-border"]);
       }
    },[CanDrop,isOver])

    useEffect(()=>{
        const ele = document?.querySelector(`#node_${node?.uuid}.base-node`);
        if(ele){
            drop(drag(ele))
        }
    },[drag, drop])


    //get settings
    const settings = getCompnentSettings(node?.type, actions?.getStoreUUID())


    const onClickHandler = (e)=>{
       
        if(websiteEditorState.selectedTool==='cursor'){

            e.stopPropagation();
            actions?.setEditorCursor(node?.uuid)
            const ele = document.getElementById(`node_${node?.uuid}`)

            nodeMouseEventPositionHelper(ele, e, node,
                ()=>{dispatch(setCursorDirection('before'))},
                ()=>{dispatch(setCursorDirection('in'))},
                ()=>{dispatch(setCursorDirection('after'))}
            )
            // const ele = document?.querySelector(`#node_${node?.uuid}.base-node`);
            // if(!ele)return
            // const rect = ele.getBoundingClientRect()
            // const x = e.clientX - rect.left;
            // const y = e.clientY - rect.top;
            
            // if (x < rect.width / 5) {
            //     dispatch(setCursorDirection('left'))
            // } else if (x > 4 * rect.width / 5) {
            //     dispatch(setCursorDirection('right'))
            // } 
            // else if (y < rect.height / 10) {
            //     dispatch(setCursorDirection('pre'))
            // } else if (y > 9 * rect.height / 10) {
            //     dispatch(setCursorDirection('post'))
            // }
            // else if (y < rect.height / 5) {
            //     dispatch(setCursorDirection('top'))
            // } else if (y > 4 * rect.height / 5) {
            //     dispatch(setCursorDirection('bottom'))
            // }else{
            //     dispatch(setCursorDirection('bottom'))
            // }


        }else if(websiteEditorState.selectedTool==='drag'){
            e.stopPropagation();
            actions?.setEditorCursor(node?.uuid)
        }else if(websiteEditorState.selectedTool==='arrow'){
            e.stopPropagation();
            actions?.setEditorCursor(node?.uuid)
        }
    }

    const elementRemoveHighlight = (element)=>{
        element?.classList?.remove(style['highlight-top'], style['highlight-border'], style['highlight-bottom'], style['highlight-left'], style['highlight-right'])
    }

    const onMouseHoverMoveHandler = (e)=>{



        if(websiteEditorState.selectedTool==='cursor'){

            // const ele = document?.querySelector(`#node_${node?.uuid}.base-node`);
            e.stopPropagation();

            const ele = document?.querySelector(`#node_${node?.uuid}.base-node`);

            if(websiteEditorState.selectedTool==='cursor'){
                nodeMouseEventPositionHelper(ele, e, node,
                    ()=>{elementRemoveHighlight(ele);ele?.classList.add(style['highlight-top'])},
                    ()=>{elementRemoveHighlight(ele);ele?.classList.add(style['highlight-border'])},
                    ()=>{elementRemoveHighlight(ele);ele?.classList.add(style['highlight-bottom'])},
                    ()=>{elementRemoveHighlight(ele);ele?.classList.add(style['highlight-left'])},
                    ()=>{elementRemoveHighlight(ele);ele?.classList.add(style['highlight-right'])}
                )
            }



            // if(!ele)return
            // const rect = ele.getBoundingClientRect()
            // const x = e.clientX - rect.left;
            // const y = e.clientY - rect.top;
            
            // if (x < rect.width / 5) {
            //     ele.style.cursor = 'w-resize'; //
            // } else if (x > 4 * rect.width / 5) {
            //     ele.style.cursor = 'e-resize'; // 
            // } 
            // else if (y < rect.height / 10) {
            //     ele.style.cursor = 'vertical-text'; // 
            // } else if (y > 9 * rect.height / 10) {
            //     ele.style.cursor = 'vertical-text'; // 
            // }
            // else if (y < rect.height / 5) {
            //     ele.style.cursor = 'n-resize'; // 
            // } else if (y > 4 * rect.height / 5) {
            //     ele.style.cursor = 's-resize'; // 
            // }


            // else {
            //     ele.style.cursor = 'default'; // 中间区域
            // }

        }
    }

    
    const onMouseOverHandler = (e)=>{
        // const ele = document.getElementById(`node_${node?.uuid}`)
        // e.stopPropagation();
        document?.querySelector(`#node_${node?.uuid}.base-node`)?.addEventListener('mousemove', onMouseHoverMoveHandler)
        // if(websiteEditorState.selectedTool==='cursor'){
        //     nodeMouseEventPositionHelper(ele, e, node,
        //         ()=>{elementRemoveHighlight(ele);ele?.classList.add(style['highlight-top'])},
        //         ()=>{elementRemoveHighlight(ele);ele?.classList.add(style['highlight-border'])},
        //         ()=>{elementRemoveHighlight(ele);ele?.classList.add(style['highlight-bottom'])},
        //         ()=>{elementRemoveHighlight(ele);ele?.classList.add(style['highlight-left'])},
        //         ()=>{elementRemoveHighlight(ele);ele?.classList.add(style['highlight-right'])}
        //     )
        // }
    }
    const onMouseOutHandler = (e)=>{
        const ele = document?.querySelector(`#node_${node?.uuid}.base-node`);
        ele?.removeEventListener('mousemove', onMouseHoverMoveHandler)
        elementRemoveHighlight(ele);

        // ele?.classList.remove(style['highlight-border'])
        // ele?.classList.remove(style['highlight-bottom'])
        // ele?.classList.remove(style['highlight-left'])
        // ele?.classList.remove(style['highlight-right'])
    }

    const onContextMenuHandler = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        setShowSettingsDropDown(true)
    }

    useEffect(()=>{
        document?.querySelector(`#node_${node?.uuid}.base-node`)?.addEventListener('mouseover', onMouseOverHandler)
        document?.querySelector(`#node_${node?.uuid}.base-node`)?.addEventListener('mouseout', onMouseOutHandler)
        document?.querySelector(`#node_${node?.uuid}.base-node`)?.addEventListener('click',onClickHandler)
        document?.querySelector(`#node_${node?.uuid}.base-node`)?.addEventListener('contextmenu', onContextMenuHandler);

        return ()=>{

            // const ele = document?.querySelector(`#node_${node?.uuid}.base-node`);
            // if(ele){
            //     ele.style.cursor = 'default'
            // }
            const ele = document.getElementById(`node_${node?.uuid}`)
            elementRemoveHighlight(ele);

            document?.querySelector(`#node_${node?.uuid}.base-node`)?.removeEventListener('mousemove', onMouseHoverMoveHandler)
            document?.querySelector(`#node_${node?.uuid}.base-node`)?.removeEventListener('mouseover', onMouseOverHandler)
            document?.querySelector(`#node_${node?.uuid}.base-node`)?.removeEventListener('mouseout', onMouseOutHandler)
            document?.querySelector(`#node_${node?.uuid}.base-node`)?.removeEventListener('click', onClickHandler)
            document?.querySelector(`#node_${node?.uuid}.base-node`)?.removeEventListener('contextmenu', onContextMenuHandler);

        }
    },[node, websiteEditorState.selectedTool, actions])

    // return null


    return (<Fragment>
        {
        !isDragging &&
                        <NodeSettingsDropdown  
                            className={style.settings_dropdown}
                            node={node} 
                            settings={[
                      
                                ...settings,

                                {"type":"accordion", "key":"expand_present_events_accordion", "name":'顯示觸發事件', "accordion_items":[
                                    {type:'slot', slot:EventsForm, props:{'instance':node, 'updateInstance':updateNode, 'title':'觸發事件', 'prop_key':'present_events', 'EventFormComponent':PresentEventForm}},
                                ]},  
                                {"type":"accordion", "key":"expand_listen_events_accordion", "name":'監聽事件', "accordion_items":[
                                    {type:'slot', slot:EventsForm, props:{'instance':node, 'updateInstance':updateNode, 'title':'觸發事件', 'prop_key':'listen_events', 'EventFormComponent':ListenEventForm}},
                                ]},  
                                {"type":"accordion", "key":"expand_mouse_click_events_accordion", "name":'游標點擊觸發事件', "accordion_items":[
                                    {type:'slot', slot:EventsForm, props:{'instance':node, 'updateInstance':updateNode, 'title':'觸發事件', 'prop_key':'mouse_click_events', 'EventFormComponent':MouseEventForm}},
                                ]},
                                {"type":"accordion", "key":"expand_mouse_over_events_accordion", "name":'游標懸浮觸發事件', "accordion_items":[
                                    {type:'slot', slot:EventsForm, props:{'instance':node, 'updateInstance':updateNode, 'title':'觸發事件', 'prop_key':'mouse_over_events', 'EventFormComponent':MouseEventForm}},
                                ]},
                                {"type":"accordion", "key":"expand_mouse_leave_events_accordion", "name":'游標滑出觸發事件', "accordion_items":[
                                    {type:'slot', slot:EventsForm, props:{'instance':node, 'updateInstance':updateNode, 'title':'觸發事件', 'prop_key':'mouse_leave_events', 'EventFormComponent':MouseEventForm}},
                                ]},
                                 {"type":"accordion", "key":"expand_mouse_click_outside_events_accordion", "name":'點擊元件外部觸發事件', "accordion_items":[
                                    {type:'slot', slot:EventsForm, props:{'instance':node, 'updateInstance':updateNode, 'title':'觸發事件', 'prop_key':'mouse_click_outside_events', 'EventFormComponent':MouseClickOutsideEventForm}},
                                ]},
                                {type:'button',action:removeNode,name:'刪除原件'},

                            
                            ]}
                            actions={{...actions, setShowSettingsDropDown}}
                            showDropDown={showSettingsDropDown}
                            update={updateNode}
                        />
                        }
            
            {
                !isDragging && 
                <SelectRelativePositionModal 
                    show={showSelectRelativePositionModal} 
                    onHide={()=>{setShowSelectRelativePositionModal(false)}}
                    dragItem={dragItem}
                    avaliableNodes={avaliableNodes}
                    actions={actions}
                />
            }
    </Fragment>)


    
};

NodeClientDev.propTypes = {


};

export default NodeClientDev;
