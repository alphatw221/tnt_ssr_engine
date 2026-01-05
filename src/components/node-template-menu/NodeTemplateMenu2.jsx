import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useCallback } from "react";
import style from './NodeTemplateMenu.module.scss'                 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faNotesMedical, faFile } from '@fortawesome/free-solid-svg-icons'

import clsx from "clsx";
import { get_categorized_node_templates } from '@/api/node_template'


import NodeTemplate from "@/components/node/NodeTemplate.jsx"
import { markdownToHtml } from "@/lib/utils/markdown.js"
import {Modal} from 'react-bootstrap';

import "prismjs/themes/prism-tomorrow.css"; //TODO

const NodeTemplateMenu2 =({query, active, setActive, selectTemplate, position, actions, ...props })=> {

  const [showDocumentModal, setShowDocumentModal] = useState(false)
  const [targetNodeTemplate, setTargetNodeTemplate] = useState(null)
  const [doc, setDoc] = useState('')
  
 
  const [categorizedNodes,setCategorizedNodes] = useState([])
  useEffect(()=>{
    if(!active)return
    setCategorizedNodes([])
    get_categorized_node_templates(query).then(res=>{
      setCategorizedNodes(res.data)
      console.log(res.data)
    })
  },[active])
  
  return (
    <Fragment>
      <div className={clsx(style['template-menu'], active?style['active']:'', style[position||'position-left'], props?.className||'')} style={props?.style}>
        <button className={clsx(style['hide-menu-button'],style[position||'position-left'])} onClick={() => {setActive(false)}}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>



        <div className={style['row']}>
          <div className={style['category-list']}>
            {(categorizedNodes||[]).map((category,i)=>(
              <div 
                key={i} 
                className={style['category']} 
                onClick={()=>{
                  const ele = document.getElementById(`node_category_${i}`)
                  if(ele){
                    ele.scrollIntoView({ behavior: "smooth", block: 'start', inline: "center" });
                  }
                }}
              >
                {category.name}
              </div>
            ))}
          </div>

          <div className={style['item-list']}>
            {(categorizedNodes||[]).map((category,i)=>(
              <Fragment key={i}>
                <div className={style['category-title']} id={`node_category_${i}`}>{category.name}:</div>

                {
                  (category?.nodes||[]).map((_node,_nodeIndex)=>(

                    <Fragment key={_nodeIndex}>
                      {
                          <div className={style['item-row']}>

                          
                            <div className={style['item']} >
                              {
                                selectTemplate?
                                <p onClick={()=>{selectTemplate(_node)}}>{_node.type}</p>
                                :
                                <NodeTemplate node_template={_node} mode={'display'} actions={actions}/>

                              }
                            </div>
                            {
                              _node?.doc &&
                              <div className={style['doc']} onClick={()=>{
                                const  convert = async ()=>{
                                  const html = await markdownToHtml(_node?.doc)
                                  setDoc(html)
                                }
                                convert();
                                setTargetNodeTemplate(_node)
                                setShowDocumentModal(true)
                              }}>
                                <FontAwesomeIcon icon={faFile} />



                              </div>
                            }
                            
                          </div>
                        // selectTemplate?
                        // (
                        //   <div className={style['item']} >
                        //       <p onClick={()=>{selectTemplate(_node)}}>{_node.type}</p>
                        //   </div>
                        // ):
                        // (
                        //   <div className={style['item']} >
                        //       {/* <CSRNode node={_node} mode={'display'} actions={actions}/> */}
                        //       <NodeTemplate node_template={_node} mode={'display'} actions={actions}/>
                        //   </div>
                        // )
                      }
                      
                    </Fragment>
                    
                  ))
                }
                
              </Fragment>)
            )}
          </div>
        </div>
        
      </div>


      {/* Document Modal */}
      <Modal show={showDocumentModal} onHide={()=>{setShowDocumentModal(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>{`${targetNodeTemplate?.name} 說明文件`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <div style={{whiteSpace:'pre-wrap'}}>
            {bulletinBoardMessage?.context||''}
          </div> */}
          <div dangerouslySetInnerHTML={{ __html: doc }} />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="primary" onClick={()=>{setShowBulletinBoard(false)}}>
            確定
          </Button>
        </Modal.Footer> */}
      </Modal>


    </Fragment>
  )
}

NodeTemplateMenu2.propTypes = {
  // query:PropTypes.object,
  // active:PropTypes.bool,
  // setActive:PropTypes.func,
  // selectTemplate:PropTypes.func,
};

export default NodeTemplateMenu2;