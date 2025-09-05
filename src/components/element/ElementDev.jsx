// import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect ,lazy, useRef } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";        

import { 
  setCursor
} from '@/redux/slices/editor-memory-slice'
import { elementCheckDropValidHelper } from '@/lib/utils/dragDropHelperV2.js'


import MyModal from '@/components/modal/MyModal.jsx'
import ParameterizeForm from "@/components/parameterize-form/ParameterizeForm.jsx";

import { user_r_action_to_element, user_delete_element, user_r_create_element, user_update_element } from '@/api/element.js'
import { getElementPropsSettingsA, getElementPropsSettingsB } from "@/lib/utils/elementPropsSettings"
import { getElementDataSettings } from "@/lib/utils/elementDataSettings"
import { getElementBaseSettingsA, getElementBaseSettingsB } from "@/lib/utils/elementBaseSettings"
import { useDrag, useDrop } from 'react-dnd'

import style from './Element.module.scss'
import { v4 as uuidv4 } from 'uuid';
const ElementDev = ({ element, actions, ...props}) => {
        const {selectedTool} = useAppSelector((state) => state.editor_memory);
        const dispatch = useAppDispatch();
        const [showSettings, setShowSettings] = useState(false);
        // const [canDrag, setCanDrag] = useState(false)
        const [dragOverPosition, setDragOverPosition] = useState(null)
        // const [iCursorHoverPosition, setICursorHoverPosition] = useState(null)
        
       
        useEffect(()=>{
            const ele = document?.querySelector('.'+ CSS.escape(element.parent_relation_uuid))

            const mouseMoveEventHandler = (e)=>{
                e.stopPropagation();
                const rect = ele?.getBoundingClientRect();
                const clickX = e.clientX - rect.left; // 相對於元件上邊的 Y
                const width = rect.width;

                ele?.classList?.remove?.(style['icursor-hover-left'])
                ele?.classList?.remove?.(style['icursor-hover-in'])
                ele?.classList?.remove?.(style['icursor-hover-right'])

                elementCheckDropValidHelper(null, element, 
                    ()=>{
                        if (clickX < width / 3) {
                            ele?.classList?.add?.(style['icursor-hover-left'])
                        } else if (clickX < (2 * width) / 3) {
                            ele?.classList?.add?.(style['icursor-hover-in'])
                        } else {
                            ele?.classList?.add?.(style['icursor-hover-right'])
                        }
                    }, 
                    ()=>{
                        ele?.classList?.add?.(style['icursor-hover-in'])
                    }, 
                    ()=>{
                        if (clickX < width / 2) {
                            ele?.classList?.add?.(style['icursor-hover-left'])
                        } else {
                            ele?.classList?.add?.(style['icursor-hover-right'])
                        }
                    }, 
                    ()=>{}
                )

            }

            const mouseOverEventHandler = (e)=>{  
                e.stopPropagation()
                if(selectedTool=='iCursor'){
                    ele?.classList?.add?.(style['icursor-hover-in'])
                    ele?.addEventListener?.('mousemove', mouseMoveEventHandler)
                }else if(selectedTool=='drag'){
                    ele?.classList?.add?.(style['drag-hover'])
                }else if (selectedTool=='arrow'){
                    ele?.classList?.add?.(style['arrow-hover'])
                }
            }

           
            const mouseOutEventHandler = (e)=>{   
                e.stopPropagation();
                if(selectedTool=='iCursor'){
                    ele?.classList?.remove?.(style['icursor-hover-left'])
                    ele?.classList?.remove?.(style['icursor-hover-in'])
                    ele?.classList?.remove?.(style['icursor-hover-right'])
                    ele?.removeEventListener?.('mousemove', mouseMoveEventHandler)
                }else if(selectedTool=='drag'){
                    ele?.classList?.remove?.(style['drag-hover'])
                }else if (selectedTool=='arrow'){
                    ele?.classList?.remove?.(style['arrow-hover'])
                }
            }
            
            const onContextMenuHandler = (e)=>{
                e.stopPropagation();
                e.preventDefault();
                setShowSettings(true)
            }

            
            const onClickHandler = (e)=>{
                    e.stopPropagation();
                    const rect = ele?.getBoundingClientRect();
                    const clickX = e.clientX - rect.left; // 相對於元件上邊的 Y
                    const width = rect.width;
            
                    let position = '';
                    elementCheckDropValidHelper(null, element, 
                        ()=>{
                            if (clickX < width / 3) {
                                position = 'before';
                            } else if (clickX < (2 * width) / 3) {
                                position = 'in';
                            } else {
                                position = 'after';
                            }
                        }, 
                        ()=>{position = 'in';}, 
                        ()=>{
                            if (clickX < width / 2) {
                                position = 'before';
                            } else {
                                position = 'after';
                            }
                        }, 
                        ()=>{}
                    )
                    console.log({
                        type:'element',
                        data:JSON.parse(JSON.stringify(element)),
                        position
                    })
                    dispatch(setCursor(
                    {
                        type:'element',
                        data:JSON.parse(JSON.stringify(element)),
                        position
                    }))
            }



            if(selectedTool=='iCursor'){
                ele?.addEventListener?.('mouseover', mouseOverEventHandler)
                ele?.addEventListener?.('mouseout', mouseOutEventHandler)
                ele?.addEventListener?.('click', onClickHandler)
            }else if(selectedTool=='drag'){
                ele?.addEventListener?.('mouseover', mouseOverEventHandler)
                ele?.addEventListener?.('mouseout', mouseOutEventHandler)
            }else if(selectedTool=='arrow'){
                ele?.addEventListener?.('mouseover', mouseOverEventHandler)
                ele?.addEventListener?.('mouseout', mouseOutEventHandler)
                ele?.addEventListener?.('contextmenu', onContextMenuHandler)
            }

            return ()=>{
                ele?.removeEventListener?.('mousemove', mouseMoveEventHandler)
                ele?.removeEventListener?.('mouseover', mouseOverEventHandler)
                ele?.removeEventListener?.('mouseout', mouseOutEventHandler)
                ele?.removeEventListener?.('click', onClickHandler)
                ele?.removeEventListener?.('contextmenu', onContextMenuHandler)

            }
        },[element, selectedTool])
        

        
        
        const updateElement = (_element)=>{
            actions?.globleUpdateElement(element?.uuid, _element)
            user_update_element({
                'element_uuid':_element?.uuid, 
                'data':{..._element, children:null}
            }).then(res=>{console.log(res.data)})
        }
        const updateElementProps = (props)=>{
            updateElement({...element, props:props})
        }
    
        const updateElementData = (data)=>{
            updateElement({...element, data:data})
        }
        
        const removeElement = ()=>{
            if(confirm('刪除元素')){
                actions?.globleRemoveElement(element?.parent_relation_uuid)
                user_delete_element({'parent_relation_uuid':element?.parent_relation_uuid}).then(res=>{console.log(res.data)})
            }
        }
        const createChildElement = ()=>{
            const tempUUID = uuidv4()
            const sudoElement = {uuid:tempUUID, name:'未命名'}
            let _website = actions?.globleInsertInto(sudoElement, element?.parent_relation_uuid, 0, 0)
            _website = JSON.parse(JSON.stringify(_website))
            user_r_create_element({
                        'target_webpage_uuid':null, 
                        'target_webpage_position':null,
                        'target_element_relation_uuid':element?.parent_relation_uuid, 
                        'target_relative_position':'in', 
                        'data':sudoElement
            }).then(res=>{
                _website = actions?.globleUpdateElement(tempUUID, res.data, _website)
            })
            
        }


        const [{ isDragOverCurrent, handlerId }, drop] = useDrop({
            
                accept:['element'],
                collect(monitor) {
                  return {
                    handlerId: monitor.getHandlerId(),
                    isDragOverCurrent: monitor.isOver({ shallow: true }),
                  }
                },
                drop: (item, monitor) => {
                  if(monitor.didDrop()) return
                  if(!monitor.isOver({ shallow: true })) return
            

                    const ele = document?.querySelector('.'+ CSS.escape(element.parent_relation_uuid))

                    const hoverBoundingRect = ele?.getBoundingClientRect()
                    const clientOffset = monitor.getClientOffset()
                    const hoverClientX = clientOffset.x - hoverBoundingRect.left
                    
                    const beforeHandler = ()=>{
                        actions.globleMoveNextTo(item.element, element, 0)
                        // user_r_action_to_element({
                        //     'parent_relation_uuid':item?.element?.parent_relation_uuid, 
                        //     'action':'move',   //move/share/clone
                        //     'target_webpage_uuid':null, 
                        //     'target_element_relation_uuid':element.parent_relation_uuid, 
                        //     'target_relative_position':'before'
                        // }).then(res=>{console.log(res.data)})
                    }
                    const afterHandler = ()=>{
                        actions.globleMoveNextTo(item.element, element, 1)
                        // user_r_action_to_element({
                        //     'parent_relation_uuid':item?.element?.parent_relation_uuid, 
                        //     'action':'move',   //move/share/clone
                        //     'target_webpage_uuid':null, 
                        //     'target_element_relation_uuid':element.parent_relation_uuid, 
                        //     'target_relative_position':'after'
                        // }).then(res=>{console.log(res.data)})
                    }
                    const inHandler = ()=>{
                        actions.globleMoveInto(item.element, element, 0, 0)
                        // user_r_action_to_element({
                        //     'parent_relation_uuid':item?.element?.parent_relation_uuid, 
                        //     'action':'move',   //move/share/clone
                        //     'target_webpage_uuid':null, 
                        //     'target_element_relation_uuid':element.parent_relation_uuid, 
                        //     'target_relative_position':'in'
                        // }).then(res=>{console.log(res.data)})
                    }

                    elementCheckDropValidHelper(item?.element, element, 
                        ()=>{
                            const oneThirdY= (hoverBoundingRect.right - hoverBoundingRect.left) / 3;
                            const twoThirdY= 2 * (hoverBoundingRect.right - hoverBoundingRect.left) / 3;
                
                            if(hoverClientX < oneThirdY){
                                beforeHandler();
                            }else if(twoThirdY < hoverClientX ){
                                afterHandler();
                            }else{
                                inHandler();
                            }
                        },
                        ()=>{
                            inHandler();
                        },
                        ()=>{
                            const middleY= (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
                            if(hoverClientX < middleY){
                                beforeHandler();
                            }else{
                                afterHandler();
                            }
                        },
                        ()=>{}
                    )




                },
                hover(item, monitor) {

                    const ele = document?.querySelector('.'+ CSS.escape(element.parent_relation_uuid))

                    const hoverBoundingRect = ele?.getBoundingClientRect()
                    const clientOffset = monitor.getClientOffset()
                    const hoverClientX = clientOffset.x - hoverBoundingRect.left
                    
                    const beforeHandler = ()=>{setDragOverPosition('drag-over-left');}
                    const afterHandler = ()=>{setDragOverPosition('drag-over-right');}
                    const inHandler = ()=>{setDragOverPosition('drag-over-in');}

                    elementCheckDropValidHelper(item?.element, element, 
                        ()=>{
                            const oneThirdY= (hoverBoundingRect.right - hoverBoundingRect.left) / 3;
                            const twoThirdY= 2 * (hoverBoundingRect.right - hoverBoundingRect.left) / 3;
                
                            if(hoverClientX < oneThirdY){
                                beforeHandler();
                            }else if(twoThirdY < hoverClientX ){
                                afterHandler();
                            }else{
                                inHandler();
                            }
                        },
                        ()=>{
                            inHandler();
                        },
                        ()=>{
                            const middleY= (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
                            if(hoverClientX < middleY){
                                beforeHandler();
                            }else{
                                afterHandler();
                            }
                        },
                        ()=>{}
                    )
            
                },
        },[element, actions])
            
            
        const [{ isDragging }, drag] = useDrag({
            type: 'element',
            item:{
                element:element,
            },
            canDrag(monitor){
                return selectedTool=='drag'},
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        
        },[element, selectedTool])

        useEffect(()=>{
            if(selectedTool=='drag'){
                const ele = document?.querySelector('.'+ CSS.escape(element.parent_relation_uuid))
                drop(drag(ele))
            }
        }, [element, selectedTool, drag, drop])

        useEffect(()=>{
            const ele = document?.querySelector('.'+ CSS.escape(element.parent_relation_uuid))
            if(isDragOverCurrent){
                ele?.classList?.add?.(style[dragOverPosition])
            }else{
                ele?.classList?.remove?.(style[dragOverPosition])
            }
            return ()=>{ele?.classList?.remove?.(style[dragOverPosition])}
        },[element, isDragOverCurrent, dragOverPosition])
        
        const elementPropsSettingsA = getElementPropsSettingsA(element)
        const elementPropsSettingsB = getElementPropsSettingsB(element)
        const elementDataSettings = getElementDataSettings(element?.type, actions?.getStoreUUID())
        const elementBaseSettingsA = getElementBaseSettingsA({createChildElement, removeElement})
        const elementBaseSettingsB = getElementBaseSettingsB()

        return <Fragment>
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


   

    
};

ElementDev.propTypes = {


};

export default ElementDev;
