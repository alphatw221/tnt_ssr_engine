import { Fragment, useState, useEffect, createRef, useRef } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import style from './SelectRelativePositionModal.module.scss'
import nodeStyle from '@/components/node/Node.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faX, faTrash, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'

import {Button} from 'react-bootstrap';
import { nodeDropAcceptTable, validContainerNodes } from '@/lib/utils/nodeHelper'
import { user_r_create_node, user_r_move_node } from "@/api/node";
import { checkDropValidHelper } from "@/lib/utils/dragDropHelper";


const hightLightTable = {
  '之前':{
    default:'highlight-top',
    special_cases:['row', 'row-reverse'],
    special_hightlight:'highlight-left',
    after:0,
    value:'before'
  },
  '之內':{
    default:'highlight-border',
    after:0,
    value:'in'
  },
  '之後':{
    default:'highlight-bottom',
    special_cases:['row', 'row-reverse'],
    special_hightlight:'highlight-right',
    after:1,
    value:'after'
  }
}
const ValidRelation = ({dragItem, node, relation, actions, onHide})=>{

  const ref = useRef(null)

  const config = hightLightTable[relation]
  const mouseOver = ()=>{

    const ele = document.getElementById(`node_${node?.uuid}`)
    const parentElement = ele.parentElement;
    const parentStyles = window.getComputedStyle(parentElement);
    if((config?.special_cases||[]).includes(parentStyles.flexDirection)){
      ele?.classList?.add(nodeStyle[config?.special_hightlight])
    }else{
      ele?.classList?.add(nodeStyle[config?.default])
    }

  }

  const removeHighlight = ()=>{
    const ele = document.getElementById(`node_${node?.uuid}`)
    const parentElement = ele.parentElement;
    const parentStyles = window.getComputedStyle(parentElement);
    if((config?.special_cases||[]).includes(parentStyles.flexDirection)){
      ele?.classList?.remove(nodeStyle[config?.special_hightlight])
    }else{
      ele?.classList?.remove(nodeStyle[config?.default])
    }
  }

  const mouseOut = ()=>{
    removeHighlight();
  }
  const onClick = ()=>{
    
    removeHighlight();
    
    if(!dragItem?.parent_node){

      const sudo_node = {name:dragItem?.node?.name, type:dragItem?.node?.type, data:dragItem?.node?.data, children:dragItem?.node?.children||null, }

      if(relation=='之內'){
        actions?.globleInsertInto(sudo_node, node, 0, null, null, 0)
      }else{
        actions?.globleInsertNextTo(sudo_node, node, config?.after||0)
      }

      user_r_create_node(
        node?.uuid, 
        dragItem?.node?.name, 
        dragItem?.node?.type, 
        dragItem?.node?.data, 
        dragItem?.node?.children,
        config?.value, true

      ).then(res=>{
        console.log(res.data)
      })

    }else{


      if(relation=='之內'){
        actions?.globleMoveInto(dragItem?.node, node, 0, null, null, 0)
      }else{
        actions?.globleMoveNextTo(dragItem?.node, node, config?.after||0)
      }
  
      user_r_move_node(node?.uuid, dragItem?.node?.uuid, config?.value, true).then(res=>{
        console.log(res.data)
      })


    }
    
    onHide();
    //hide modal
  }

  useEffect(()=>{
    if(!ref.current)return
    ref.current.addEventListener('mouseover',mouseOver)
    ref.current.addEventListener('mouseout',mouseOut)
    ref.current.addEventListener('click',onClick)

    return ()=>{
      ref.current?.removeEventListener('mouseover',mouseOver)
      ref.current?.removeEventListener('mouseout',mouseOut)
      ref.current?.removeEventListener('click',onClick)

    }
  },[ref, mouseOver, mouseOut, actions, node, dragItem, ])





  return (<Fragment >
    <div ref={ref} className={style['valid-relation']}>{`${node?.name}-${relation}`}</div>
  </Fragment>)
}




const SelectRelativePositionModal = ({ show, onHide, dragItem, avaliableNodes, actions}) =>{


  return (
    <Modal show={show} onHide={onHide} className={style['modal']} size="sm" backdrop={false} >
    <Modal.Header closeButton className={style['modal-header']}>
      <Modal.Title>選擇移動目標</Modal.Title>
    </Modal.Header>

    <Modal.Body >

        <h4 className={style['drag-item']}>
          拖動元件:{dragItem?.node?.name}
        </h4>

        <h4 className={style['valid-relation-title']}>
          可移動目標:
        </h4>
        <div className={style['valid-relation-container']}>
          { 
            (avaliableNodes||[])?.map((node, i)=>{


              return checkDropValidHelper(dragItem?.node, node, validContainerNodes, 
                ()=>{
                  return ['之前', '之內', '之後'].map((relation, i)=>(<ValidRelation key={i} dragItem={dragItem} node={node} relation={relation} actions={actions} onHide={onHide}/>))
                },
                ()=>{
                  return ['之內'].map((relation, i)=>(<ValidRelation key={i} dragItem={dragItem} node={node} relation={relation} actions={actions} onHide={onHide}/>))
                },
                ()=>{
                  return ['之前', '之後'].map((relation, i)=>(<ValidRelation key={i} dragItem={dragItem} node={node} relation={relation} actions={actions} onHide={onHide}/>))
                },
                ()=>{ return null}
              )

            })
          }
        </div>

    </Modal.Body>
 
  </Modal>
  );
}

SelectRelativePositionModal.propTypes = {
};

export default SelectRelativePositionModal;
