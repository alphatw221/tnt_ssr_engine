import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useCallback } from "react";
import style from './NodeTemplateMenu.module.scss'           
import { useAppSelector, useAppDispatch  } from "@/redux/hooks";       

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import clsx from "clsx";
import {  setNodeMenuActive } from '@/redux/slices/website-editor-slice'
import { get_categorized_node_templates } from '@/api/node_template'

const NodeTemplateMenu =({actions, ...props})=> {

  const websiteEditorState = useAppSelector((state) => state.website_editor);
  const dispatch = useAppDispatch();
  const [categorizedNodes,setCategorizedNodes] = useState([])
  useEffect(()=>{
    setCategorizedNodes([])
    get_categorized_node_templates(websiteEditorState?.nodeMenuQuery).then(res=>{
      setCategorizedNodes(res.data)
      console.log(res.data)
    })
  },[
    websiteEditorState?.nodeMenuQuery
  ])
  
  return (
    <Fragment>
      <div className={clsx(style['template-menu'], websiteEditorState.nodeMenuActive?style['active']:'')}>
        <button className={style['hide-menu-button']} onClick={() => {dispatch(setNodeMenuActive(false))}}>
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
                    <div className={style['item']} key={_nodeIndex}>

                      {

                        ['webpage', 'section'].includes(_node?.type)
                        ?
                        <p onClick={()=>{
                          console.log('click');
                          actions.addWebsiteNode(websiteEditorState?.targetWebsiteNode, _node)}}>{_node.type}</p>
                        :
                        <p>{_node.type}</p>

                      }
                    </div>
                  ))
                }
                
              </Fragment>)
            )}
          </div>
        </div>
        
      </div>
    </Fragment>
  )
}

NodeTemplateMenu.propTypes = {
  type:PropTypes.string,
  categorizedItems:PropTypes.array,
  active:PropTypes.bool,
  onHide:PropTypes.func,
  actions:PropTypes.object,
};

export default NodeTemplateMenu;