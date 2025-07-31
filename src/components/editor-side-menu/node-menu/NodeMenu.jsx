import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useCallback } from "react";
import NodeMenuItem from "./NodeMenuItem";
import style from './NodeMenu.module.scss'
import { useAppDispatch, useAppSelector } from "@/redux/hooks";        
import Button from 'react-bootstrap/Button';


// import { setNodeMenuActive, setNodeMenuQuery, setTargetWebsiteNode} from "@/redux/slices/website-editor-slice"
import NodeTemplateMenu2 from '@/components/node-template-menu/NodeTemplateMenu2.jsx'

    


const NodeMenu =({position, hierarchy, query, title, targetWebsiteNode, nodes, hideNodeDict, actions,
    // nodeMatrix3D,
    // update,
    // remove,
    // move

})=> {

    const dispatch = useAppDispatch();
    const [nodeTemplateActive, setNodeTemplateActive] = useState(false)

    const addNodeTemplate = (nodeTemplate)=>{
        actions.addWebsiteNode(targetWebsiteNode, nodeTemplate)
    }




    return (
        <Fragment>

            <div className={style['accordion']}>
                {
                        <Fragment>
                            {title&&
                             <div className={style['header']} >
                                {
                                    title &&
                                    <h3 style={{marginBottom:'0px'}} className={style['title']}>{title}</h3>
                                }
                                {
                                    (hierarchy||[]).length==0 &&
                                    <Button variant="secondary" className={style['add_btn']} onClick={()=>{
                                        setNodeTemplateActive(true)
                                        }}>+</Button>
                                }
                                
                            </div>
                            }
                           
                        </Fragment>
                }
                
                {
                    // (nodes!=undefined)
                    // ?
                    (nodes||[]).length>0
                    ?
                    (nodes||[]).map((_node,_nodeIndex)=>{ 

                        return(<NodeMenuItem
                            key={_nodeIndex}
                            position={position}
                            hierarchy={hierarchy}
                            node = {_node}
                            nodeIndex = {_nodeIndex}
                            hideNodeDict={hideNodeDict}
                            actions={actions}

                            // update={update}
                            // remove={remove}
                            // move={move}

                            targetWebsiteNode={targetWebsiteNode}
                        />)
                    })
                    :
                    (<p>{`Empty`}</p>)
                    // :
                    // (nodeMatrix3D||[]).length>0
                    // ?
                    // (nodeMatrix3D||[]).map((_row,_rowIndex)=>{ 
                    //     return (<Fragment key={_rowIndex}>
                    //             {(_row||[]).map((_column, _columnIndex)=>{
                    //                     return (<Fragment key={_columnIndex}>
                    //                         {(_column||[]).map((_node, _columnRowIndex)=>{
                    //                                 return (<NodeMenuItem
                    //                                     position={position}
                    //                                     hierarchy={hierarchy}
                    //                                     key={_columnRowIndex}
                    //                                     rowIndex={_rowIndex}
                    //                                     columnIndex={_columnIndex}
                    //                                     columnRowIndex={_columnRowIndex}
                    //                                     node = {_node}
                    //                                     actions={actions}

                    //                                     update={update}
                    //                                     remove={remove}
                    //                                 />)
                    //                         })}
                    //                     </Fragment>)
                    //             })}
                    //         </Fragment>)
                    // })
                    // :
                    // (<p>{`Empty`}</p>)
                }

            </div> 

            {
                (hierarchy||[]).length==0 &&
                    <NodeTemplateMenu2 
                    position={position} 
                    query={query} 
                    active={nodeTemplateActive} 
                    setActive={setNodeTemplateActive} 
                    selectTemplate={addNodeTemplate} 
                    actions={actions}
                    />
            }
        </Fragment>

    );
}

NodeMenu.propTypes = {
    // hierarchy: PropTypes.array, 
    // query: PropTypes.object, 
    // title: PropTypes.string||null, 
    // targetWebsiteNode: PropTypes.string,
    // nodes: PropTypes.object,
    // actions: PropTypes.object,
};

export default NodeMenu;