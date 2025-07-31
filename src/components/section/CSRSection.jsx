import PropTypes from "prop-types";
import React, {  useEffect, useRef, useState, Fragment} from "react";

import {dragItems, dragItemTypes} from '../../lib/dragItems'

import {  useDrop } from 'react-dnd'


import _Section from "./_Section";
// import { rwdHelper, RWDHideHandler, RWDPropHandler, RWDWidthHandler} from "@/lib/utils/rwdHelper"
import { useAppSelector, useAppDispatch  } from "@/redux/hooks";       


import { useParams } from 'next/navigation';

import { containerNodeHandleDropNodeHelper } from "@/lib/utils/dragDropHelper.js"
import { getNodeAfterApplyTemplate } from "@/lib/utils/nodeHelper"
import SelectRelativePositionModal from "@/components/select-relative-position-modal/SelectRelativePositionModal"

import style from '@/components/node/Node.module.scss'
import CSRChildren from '@/components/node-matrix/CSRChildren'

const CSRSection = ({  
    template_nodes,
    hideNodeDict,
    // nodeIndex,
    node,
    mode, actions,
    hierarchy,
    isSudoNode
    // update
  }) => {
    const websiteEditorState = useAppSelector((state) => state.website_editor);
    // const [width, setWidth] = useState('')


    // useEffect(()=>{
    //   //build node matrix 3d
    // },[node?.children])

    
    var templateAppliedNode = getNodeAfterApplyTemplate(node, template_nodes, isSudoNode, hierarchy);

    let params = useParams();

    const dispatch = useAppDispatch();
    const ref = useRef()

    const [showSelectRelativePositionModal, setShowSelectRelativePositionModal] = useState(false)
    const [avaliableNodes, setAvaliableNodes] = useState([])
    const [dragItem, setDragItem] = useState(null)


    const [{ CanDrop, isOver }, dropSectionRef] = useDrop(
        () => ({
          accept: [dragItemTypes.NODE],
          drop: (item, monitor) => {
            if(monitor.didDrop()) return
            if(!monitor.isOver({ shallow: true })) return
            
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
          collect: (monitor) => ({
            isOver: monitor.isOver(),
            isOverCurrent: monitor.isOver({ shallow: true }),
            CanDrop: monitor.canDrop(),
          }),
        }),
        [ node, actions],
    )
    
    dropSectionRef(ref)

    useEffect(()=>{
        if(CanDrop && isOver){
         document?.getElementById(`node_${node?.uuid}`)?.classList?.add(style["highlight-border"])
        }else{
         document?.getElementById(`node_${node?.uuid}`)?.classList.remove(style["highlight-border"]);
        }
     },[CanDrop,isOver])

    
    // const childrenUpdate = (data)=>{
    //   actions.updateFragment(pageIndex, fragmentIndex, {...fragment, components:data})
    // }


    // const updateHook = (rowIndex, data)=>{
    //   const _children_matrix_3d = JSON.parse(JSON.stringify(node?.children_matrix_3d))
    //   update(nodeIndex, {...node, children_matrix_3d:_children_matrix_3d.map((_row, _rowIndex)=>_rowIndex==rowIndex?data:_row)})
    // }

    // const updateSiblingsHook = (data)=>{
    //   update(nodeIndex, {...node, children_matrix_3d:data})
    // }

    // const updateMatrixHook = (matrix)=>{
    //   console.log(matrix)
    //   update(nodeIndex, {...node, children_matrix_3d:matrix})
    // }
    //rwd property
    // useEffect(()=>{

    //   rwdHelper(
    //     websiteEditorState.windowWidth, 
    //     websiteEditorState.sideMenuActive, 
    //     [
    //         new RWDPropHandler(node?.data, 'width', 'width_unit', setWidth),
    //     ]
    //   )
    // },[ websiteEditorState.sideMenuActive, setWidth, node])

    if(hideNodeDict?.[node?.uuid]) return null

    // CSR
    const pageName = params?.page_name==undefined?'/':params?.page_name
    if(templateAppliedNode?.data?.visable_on_webpage_logic==='include'  ){
      if(!(templateAppliedNode?.data?.target_webpages||'').split(',').includes(decodeURI(pageName))){
          return null
      }
    }else if(templateAppliedNode?.data?.visable_on_webpage_logic==='exclude' ){
        if((templateAppliedNode?.data?.target_webpages||'').split(',').includes(decodeURI(pageName))){
            return null
        }
    }

    return (
        <Fragment>

            <_Section 
                        template_nodes={template_nodes}
                        hideNodeDict={hideNodeDict}
                        node={templateAppliedNode}
                        mode={mode} 
                        actions={actions} 
                        dropSectionRef={ref} 
                        sectionCanDrop={false} 
                        isOverSection={false} 
                        ChildrenComponent={CSRChildren} 
                        hierarchy={hierarchy}
                        isSudoNode={isSudoNode}
                        // update={updateHook}
                        // updateSiblings={updateSiblingsHook}
                        // updateMatrix={updateMatrixHook}
                        // width={width}
                        // height={height}

                    />
             
            {

                <SelectRelativePositionModal 
                    show={showSelectRelativePositionModal} 
                    onHide={()=>{setShowSelectRelativePositionModal(false)}}
                    dragItem={dragItem}
                    avaliableNodes={avaliableNodes}
                    actions={actions}
                />
            }



        </Fragment>
        
    )

    
};

CSRSection.propTypes = {

    // nodeIndex: PropTypes.number,
    // node: PropTypes.object,
    // mode: PropTypes.string,
    // actions: PropTypes.object,
    // update: PropTypes.func,

};

export default CSRSection;
