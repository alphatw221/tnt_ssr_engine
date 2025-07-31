"use client"
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect,  } from "react";
import clsx from "clsx";
import style from './SideBar.module.scss'


   
// import { useAppSelector } from "@/redux/hooks";   
import Offcanvas from 'react-bootstrap/Offcanvas';


import CSRChildren from "@/components/node-matrix/CSRChildren";

const SideBarClient = ({  

    template_nodes, hideNodeDict, node,  mode, actions, isSudoNode, update}) => {

    // const websiteEditorState = useAppSelector((state) => state.website_editor);

  
    const [showSideBar, setShowSideBar] = useState(false)



    useEffect(()=>{
        const handleClick = ()=>{
            console.log(showSideBar)
            setShowSideBar(!showSideBar)
        }
        setTimeout(()=>{
            document?.getElementById(`side_bar_button_${node?.uuid}`)?.addEventListener('click',handleClick)
        })
        return ()=>{
            document?.getElementById(`side_bar_button_${node?.uuid}`)?.removeEventListener('click',handleClick)
        }
     
    },[node, showSideBar])

    // useEffect(()=>{

    //   setTimeout(()=>{
    //     var elementToInsert = document.getElementById(`side_bar_node_grid_${node_uuid}`);
    //     var targetElement = document.getElementById(`side_bar_node_grid_insert_${node_uuid}`);

    //     // 将要插入的元素插入到目标元素下面
    //     targetElement?.appendChild(elementToInsert);
    //     if(elementToInsert){
    //         elementToInsert.style.display = 'block';
    //     }

    //   },10)
    // },[])
    // const updateHook = (rowIndex, data)=>{
    //     const _children_matrix_3d = JSON.parse(JSON.stringify(node?.children_matrix_3d))
    //     update({...node, children_matrix_3d:_children_matrix_3d.map((_row, _rowIndex)=>_rowIndex==rowIndex?data:_row)})
    // }

    // const updateSiblingsHook = (data)=>{
    //   update( {...node, children_matrix_3d:data})
    // }

    // const updateMatrixHook = (matrix)=>{
    //     update({...node, children_matrix_3d:matrix})

        
    // }

    
    return (
    

        
        <div className={clsx(
            mode=='edit'?"my-offcanvas-dev":'',
            // websiteEditorState.sideMenuActive?'my-offcanvas-side-menu-active':''
            )}>

        
            <Offcanvas show={showSideBar} onHide={()=>{setShowSideBar(false)}} placement={node?.data?.placement||'start'} backdrop={mode=='edit'?false:true} 
             style={{
                backgroundColor:node?.data?.dropdown_background_color?`rgba(${node?.data?.dropdown_background_color.r}, ${node?.data?.dropdown_background_color.g}, ${node?.data?.dropdown_background_color.b}, ${node?.data?.dropdown_background_color.a})`:'',
            }}   
            >
                <Offcanvas.Header closeButton>
                </Offcanvas.Header>
                <Offcanvas.Body style={{'--bs-offcanvas-padding-y':'none', '--bs-offcanvas-padding-x':'none'}}>
                    {/* <div id={`side_bar_node_grid_insert_${node_uuid}`}> */}
                      <div className={
                        clsx(style['side-bar'], 
                        // isOver?style['is-over']:'', 
                        // canDrop?style['can-drop']:''
                    )}  
                        //   style={{

                        //       backgroundColor:node?.data?.dropdown_background_color?`rgba(${node?.data?.dropdown_background_color.r}, ${node?.data?.dropdown_background_color.g}, ${node?.data?.dropdown_background_color.b}, ${node?.data?.dropdown_background_color.a})`:'',



                        //   }}    
                          id={`side_bar_node_grid_${node?.uuid}`}

                      >   
                          <CSRChildren
                            template_nodes={template_nodes}
                            hideNodeDict={hideNodeDict}
                              parent_node={node} 
                              mode={mode} 
                              actions={actions}
                              isSudoNode={isSudoNode}
                            //   update={updateHook}
                            //   updateSiblings={updateSiblingsHook}
                            //   updateMatrix={updateMatrixHook}

                          />


                            {
                                 // 
                                // (node?.children||[]).map((childrenNode,childIndex)=>(    
                                //     <NodeComponent    //CSRNode
                                //         key={childIndex}
                                //         params={params} 
                                //         searchParams={searchParams}
                                //         template_nodes={template_nodes}
                                //         parent_node= {node}
                                //         node={childrenNode}  
                        
                                //         mode={mode} 
                                //         actions={actions}
                                    
                                //     >

                                //     </NodeComponent> 
                                // ))
                            }


                      </div>
                    {/* </div> */}

                </Offcanvas.Body>
            </Offcanvas>
        </div>







    // </div>
  )
};

SideBarClient.propTypes = {
};

export default SideBarClient;




