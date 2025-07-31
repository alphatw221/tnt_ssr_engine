import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useCallback } from "react";
import style from './ElementTemplateMenu.module.scss'                 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faChevronUp, faChevronDown,faNotesMedical, faFile } from '@fortawesome/free-solid-svg-icons'

import clsx from "clsx";
// import { get_categorized_node_templates } from '@/api/node_template'


import ElementTemplate from "@/components/element/element_template/ElementTemplate.jsx"
// import { markdownToHtml } from "@/lib/utils/markdown.js"
// import Modal from 'react-bootstrap/Modal';

// import "prismjs/themes/prism-tomorrow.css"; //TODO

const ElementTemplateMenu =({query, active, setActive, selectTemplate, position, actions, ...props })=> {

  // const [showDocumentModal, setShowDocumentModal] = useState(false)
  // const [targetNodeTemplate, setTargetNodeTemplate] = useState(null)
  // const [doc, setDoc] = useState('')
  
 
  const [categorizedElements,setCategorizedElements] = useState([])
  useEffect(()=>{
    if(!active)return
    setCategorizedElements([])
    // get_categorized_node_templates(query).then(res=>{
    //   setCategorizedElements(res.data)
    //   console.log(res.data)
    // })
  },[active])
  
  const scrollToCategory = (i)=>{
    const ele = document.getElementById(`node_category_${i}`)
    if(ele){
      ele.scrollIntoView({ behavior: "smooth", block: 'start', inline: "center" });
    }
  }
  return (
    <Fragment>
      <div className={clsx(style['template-menu'], active?style['active']:'', style[position||'position-left'], props?.className||'')} >
        <button className={clsx(style['hide-menu-button'],style[position||'position-left'])} onClick={() => {setActive(false)}}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>



        <div className={style['row']}>
          <div className={style['category-list']}>
            {(categorizedElements||[]).map((category,i)=>(
              <div 
                key={i} 
                className={style['category']} 
                onClick={()=>{scrollToCategory(i)}}
              >
                {category.name}
              </div>
            ))}
          </div>

          <div className={style['item-list']}>
            {(categorizedElements||[]).map((category,i)=>(
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
                                <ElementTemplate 
                                element_template={_node} 
                                mode={'display'} 
                                actions={actions}/>

                              }
                            </div>
                            
                          </div>
            
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
      {/* <Modal show={showDocumentModal} onHide={()=>{setShowDocumentModal(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>{`${targetNodeTemplate?.name} 說明文件`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div dangerouslySetInnerHTML={{ __html: doc }} />
        </Modal.Body>
      </Modal>
 */}

    </Fragment>
  )
}

ElementTemplateMenu.propTypes = {
  // query:PropTypes.object,
  // active:PropTypes.bool,
  // setActive:PropTypes.func,
  // selectTemplate:PropTypes.func,
};

export default ElementTemplateMenu;