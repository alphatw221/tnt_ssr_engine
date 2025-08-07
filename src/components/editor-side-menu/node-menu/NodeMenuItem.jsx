import PropTypes from "prop-types";
// import Accordion from 'react-bootstrap/Accordion';
// import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faGear, faBars, faCaretUp, faCaretDown, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

// import Dropdown from 'react-bootstrap/Dropdown';
// import SplitButton from 'react-bootstrap/SplitButton';

import { useRef, Fragment, useState, useEffect } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import style from './NodeMenuItem.module.scss'
import nodeStyle from '@/components/node/Node.module.scss'
import clsx from "clsx";

// import { dragItemTypes, nodeCompatibility } from '../../../lib/dragItems.js'
import NodeMenu from './NodeMenu.jsx'

// import route_names from "../../../route_names.js";

// import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Offcanvas from 'react-bootstrap/Offcanvas';
import ParameterizeForm from "../../parameterize-form/ParameterizeForm.jsx";

import { getCompnentSettings } from "../../../lib/utils/componentSettings.js";

import {  user_update_node, user_delete_node, user_create_node, user_r_move_node, user_r_create_node } from '@/api/node.js'

// import {user_move_node } from '@/api/node.js'



import Button from 'react-bootstrap/Button';
// import { setNodeMenuActive, setNodeMenuQuery, setTargetWebsiteNode} from "@/redux/slices/website-editor-slice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks";        

import NodeTemplateMenu2 from '@/components/node-template-menu/NodeTemplateMenu2.jsx'
import {remove3DMatrixNode} from '@/lib/utils/nodeMatrix3D.js'

import EventsForm from '@/components/listen-events-form/EventsForm'
import MouseEventForm from '@/components/listen-events-form/listen-event-form/MouseEventForm'
import ListenEventForm from "@/components/listen-events-form/listen-event-form/ListenEventForm";
import PresentEventForm from "@/components/listen-events-form/listen-event-form/PresentEventForm";
import TimeoutEventForm from "@/components/listen-events-form/listen-event-form/TimeoutEventForm";
import MouseClickOutsideEventForm from '@/components/listen-events-form/listen-event-form/MouseClickOutsideEventForm'

import {globalSettings} from '@/lib/utils/componentSettings'

import { menuNodeMouseEventPositionHelper, nodeDropAcceptTable, validContainerNodes } from '@/lib/utils/nodeHelper'
import { nodeMenuHoverDropHelper} from '@/lib/utils/dragDropHelper'
import {  setCursorDirection } from "@/redux/slices/editor-memory-slice";


const NodeMenuItem =({position, hierarchy, node, 
  hideNodeDict,
  // nodeIndex, 
  actions, 
  // rowIndex, columnIndex, columnRowIndex,  //deplicate
  // update, remove, move,   //deplicate
  // targetWebsiteNode
})=> {

  const router = useRouter()


  const [showSettingsDropDown, setShowSettingsDropDown] = useState(false)
  const [canDrag, setCanDrag] = useState(false)
  // const [showChildrenMenu, setShowChildrenMenu] = useState(false)
  const [nodeTemplateActive, setNodeTemplateActive] = useState(false)
  const [hoverPosition, setHoverPosition] = useState(null)


  const menuItemRef = useRef(null)
  const nameRef = useRef(null)

  const settings = getCompnentSettings(node?.type, actions?.getStoreUUID())
  const dispatch = useAppDispatch();
  const websiteEditorState = useAppSelector((state) => state.website_editor);



  const [showChildrenMenuDict, setShowChildrenMenuDict] = useState(JSON?.parse(localStorage?.getItem("show_children_menu_dict")||"{}")||{});
  // const [hideNodeDict, setHideNodeDict] = useState(JSON?.parse(localStorage?.getItem("hide_node_dict")||"{}")||{});
  // 在客戶端渲染時從 localStorage 中加載狀態
  // useEffect(() => {
  //   setShowChildrenMenuDict(JSON?.parse(localStorage?.getItem("show_children_menu_dict")||"{}")||{});
  //   setHideNodeDict(JSON?.parse(localStorage?.getItem("hide_node_dict")||"{}")||{});
  // }, []);
  const showChildrenMenuDictToggle = (uuid)=>{
    const _showChildrenMenuDict = JSON.parse(JSON.stringify(showChildrenMenuDict))
    if(_showChildrenMenuDict[uuid]){
      delete _showChildrenMenuDict[uuid]
    }else{
      _showChildrenMenuDict[uuid] = true
    }
    localStorage.setItem("show_children_menu_dict", JSON.stringify(_showChildrenMenuDict))
    setShowChildrenMenuDict(_showChildrenMenuDict)
  }
  // const hideNodeDictToggle = (uuid)=>{
  //   const _hideNodeDict = JSON.parse(JSON.stringify(hideNodeDict))
  //   if(_hideNodeDict[uuid]){
  //     delete _hideNodeDict[uuid]
  //   }else{
  //     _hideNodeDict[uuid] = true
  //   }
  //   localStorage.setItem("hide_node_dict", JSON.stringify(_hideNodeDict))
  //   setHideNodeDict(_hideNodeDict)
  // }

  const menuElementRemoveHighlight = (element)=>{
    element?.classList?.remove(
      style['hover-top'], 
      style['hover-in'], 
      style['hover-bottom'], )
  }
  const onMouseHoverMoveHandler = (e)=>{

    // const menu_element = document.getElementById(`menu_node_${node?.uuid}`)
    menuElementRemoveHighlight(menuItemRef?.current);
    menuNodeMouseEventPositionHelper(menuItemRef?.current, e, node,
      ()=>{menuItemRef?.current?.classList.add(style['hover-top'])},
      ()=>{menuItemRef?.current?.classList.add(style['hover-in'])},
      ()=>{menuItemRef?.current?.classList.add(style['hover-bottom'])}
    )

  }

  const onMouseOverHandler = ()=>{
    const ele = document?.querySelector(`#node_${node?.uuid}.base-node`)
    ele?.classList.add(nodeStyle['highlight-border'])

    // const menu_element = document.getElementById(`menu_node_${node?.uuid}`)
    if(websiteEditorState.selectedTool==='cursor'){
      nameRef?.current?.addEventListener('mousemove', onMouseHoverMoveHandler)
    }
  }
  const onMouseOutHandler = ()=>{
    const ele = document?.querySelector(`#node_${node?.uuid}.base-node`)
    ele?.classList.remove(nodeStyle['highlight-border'])

    // const menu_element = document.getElementById(`menu_node_${node?.uuid}`)
    menuElementRemoveHighlight(menuItemRef?.current)
    nameRef?.current?.removeEventListener('mousemove', onMouseHoverMoveHandler)
  }

  const onClickHandler = (e)=>{
    


    if(websiteEditorState.selectedTool==='cursor'){
      actions?.setEditorCursor(node?.uuid)

      menuNodeMouseEventPositionHelper(menuItemRef?.current, e, node,
        ()=>{dispatch(setCursorDirection('before'))},
        ()=>{dispatch(setCursorDirection('in'))},
        ()=>{dispatch(setCursorDirection('after'))}
      )
      menuElementRemoveHighlight(menuItemRef?.current)
    }else if(websiteEditorState.selectedTool==='drag'){
      actions?.setEditorCursor(node?.uuid)
    }else if(websiteEditorState.selectedTool==='arrow'){
      actions?.setEditorCursor(node?.uuid)
    }
  }
  useEffect(()=>{
    if(!nameRef.current)return
    nameRef.current.addEventListener('mouseover',onMouseOverHandler)
    nameRef.current.addEventListener('mouseout',onMouseOutHandler)
    nameRef.current.addEventListener('click',onClickHandler)

    return ()=>{
      menuElementRemoveHighlight(menuItemRef?.current)
      nameRef.current?.removeEventListener('mousemove',onMouseHoverMoveHandler)
      nameRef.current?.removeEventListener('mouseover',onMouseOverHandler)
      nameRef.current?.removeEventListener('mouseout',onMouseOutHandler)
      nameRef.current?.removeEventListener('click',onClickHandler)
    }
  },[node, menuItemRef,menuItemRef.current, nameRef,nameRef.current, websiteEditorState.selectedTool, actions])


  const updateCurrentNode = (nodeData)=>{


    actions?.globleUpdateNode(nodeData)
    user_update_node(node?.uuid, nodeData, true).then(res=>{
      console.log(res.data)
    }).catch(err=>{
      console.log(err)
    })
  }

  const updateCurrentNodeData = (data)=>{


    actions?.globleUpdateNode({...node, 'data':data})
    user_update_node(node?.uuid, {...node, 'data':data}, true).then(res=>{
      console.log(res.data)
    }).catch(err=>{
      console.log(err)
    })
  }



  const removeCurrentNode = ()=>{

    actions?.globleRemoveNode(node?.uuid)
    user_delete_node(node?.uuid).then(res=>{
      console.log(res.data)

    }).catch(err=>{
      console.log(err)
    })
    
  }


  const addSectionNode = (nodeTemplate)=>{

    user_r_create_node(
      node?.uuid, 
      nodeTemplate?.name, 
      nodeTemplate?.type, 
      nodeTemplate?.data, 
      nodeTemplate?.children, 
      'in', true )
    .then(res=>{console.log(res.data)})

    // var _node_uuid, _name, _type, _data, _children_matrix_3d, _dimension_0_index, _dimension_1_index, _display_order_index, _after
    // user_create_node(
    //   _node_uuid=node?.uuid, 
    //   _name=nodeTemplate?.name, 
    //   _type=nodeTemplate?.type, 
    //   _data=nodeTemplate?.data, 
    //   _children_matrix_3d=null,
    //   _dimension_0_index=(node?.children_matrix_3d||[]).length>0?(node?.children_matrix_3d||[]).length-1:0, 
    //   _dimension_1_index=null, 
    //   _display_order_index=null, 
    //   _after=(node?.children_matrix_3d||[]).length>0?1:0)
    //   true
    // .then(res=>{
    //   console.log(res.data)
    //   // update(nodeIndex, {...node, children:[...(node?.children||[]), res.data?.node]})

    // }).catch(err=>{
    //   console.log(err)

    // })

    const sudo_node = {name:nodeTemplate?.name, type:nodeTemplate?.type, data:nodeTemplate?.data }
    // actions?.globleUpdateNode({...node, children:[...(node?.children||[]), sudo_node]})
    actions?.globleInsertInto(sudo_node, node, 0, null, null, 0)
  }



  const [{ isOverCurrent, handlerId }, drop] = useDrop({

    accept:['webpage', 'section'].includes(node?.type) ? nodeDropAcceptTable[node?.type] : ['menu_node'],
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      }
    },
    drop: (item, monitor) => {
      if(monitor.didDrop()) return
      if(!monitor.isOver({ shallow: true })) return

      nodeMenuHoverDropHelper(menuItemRef, node, item, hierarchy, monitor, validContainerNodes,
        ()=>{
          actions.globleMoveNextTo(item.node, node, 0)
          user_r_move_node(node?.uuid, item?.node?.uuid, 'before', true).then(res=>{
            console.log(res.data)
          });
        },
        ()=>{
          actions.globleMoveNextTo(item.node, node, 1)
          user_r_move_node(node?.uuid, item?.node?.uuid, 'after', true).then(res=>{
            console.log(res.data)
          });
        },
        ()=>{
          actions.globleMoveInto(item.node, node, 0, null, null, 0)
          user_r_move_node(node?.uuid, item?.node?.uuid, 'in', true).then(res=>{
            console.log(res.data)
          });
        },
        ()=>{}
      )

    },
    hover(item, monitor) {
      nodeMenuHoverDropHelper(menuItemRef, node, item, hierarchy, monitor, validContainerNodes,
        ()=>{setHoverPosition('hover-top');},
        ()=>{setHoverPosition('hover-bottom');},
        ()=>{setHoverPosition('hover-in');},
        ()=>{setHoverPosition(null);}
      )

    },
  },[hierarchy, node, actions
    // nodeIndex,
     ])


  const [{ isDragging }, drag] = useDrag({
    type: ['webpage', 'section'].includes(node?.type) ? `menu_${node?.type}` : 'menu_node',
    item:{
      node:node,
    },
    canDrag(monitor){
      return canDrag},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    
  },[node, canDrag
    // hierarchy, nodeIndex, 
    ])
  
  drag(drop(menuItemRef))



  const reservePageName = [
    'product', 
    'cart', 
    'checkout', 
    'order', 
    'order_payment', 
    'my_orders', 
    'login', 
    'register', 
    'shop', 
    'blog', 
    'blog_post'
  ]



  return (
    <Fragment>
      <div ref={menuItemRef} key={handlerId} id={`menu_node_${node?.uuid}`}>
          {/* HEADER */}
          <div className={clsx(style['page-menu-item-header'] , style[`layer-${((hierarchy||[]).length)}`], isOverCurrent && hoverPosition?style?.[hoverPosition]:'')} >
              {
                // ((node.type=='section' && (hierarchy||[]).length<=1) || (node.type=='webpage' &&(hierarchy||[]).length==0) )&&
                <FontAwesomeIcon className={style.drag_icon} icon={faBars} onMouseEnter={()=>{setCanDrag(true)}} onMouseLeave={()=>{setCanDrag(false)}} />
              }
                <p className={clsx(style['page-name'],
                  // reservePageName.includes(node?.name)?style['reserve-page-name']:''
                  )} ref={nameRef}>{node?.name}</p>

            <div style={{display:'flex', flexDirection:'row', alignItems:'center', columnGap:'5px'}} className={style['settings']}>
              {
                // showChildrenMenuDict?.[node?.uuid] ?
                <FontAwesomeIcon  className={style['icon']} icon={showChildrenMenuDict?.[node?.uuid]?faCaretUp:faCaretDown} 
                  onClick={()=>{
                    // menuDictRemoveKey(node?.uuid)
                    showChildrenMenuDictToggle(node?.uuid)
                    // updateCurrentNodeData({...node?.data, show_children_menu:false})
                  }} />
                // :
                // <FontAwesomeIcon  className={style['icon']} icon={faCaretDown} 
                //   onClick={()=>{
                //     menuDictSetTrue(node?.uuid)
                //     // updateCurrentNodeData({...node?.data, show_children_menu:true})
                //   }} />
              }
              {
                node?.type!='webpage' &&
                <Fragment>
                  {
                    // node?.data?.hide_while_editing ?
                    <FontAwesomeIcon  className={style['icon']} icon={hideNodeDict?.[node?.uuid]?faEyeSlash:faEye} 
                      onClick={()=>{
                        actions?.hideNodeDictToggle(node?.uuid)
                        // updateCurrentNodeData({...node?.data, hide_while_editing:false})
                      }} />
                    // :
                    // <FontAwesomeIcon  className={style['icon']} icon={faEye} 
                    //   onClick={()=>{
                    //     updateCurrentNodeData({...node?.data, hide_while_editing:true}
                    //     )}} />
                  }
                </Fragment>
              }
            
              <FontAwesomeIcon  className={style['icon']} icon={faGear} 
                  onClick={()=>{setShowSettingsDropDown(!showSettingsDropDown)}} />
            </div>
          </div>
          
          
      </div>
    


    <Offcanvas show={showSettingsDropDown} onHide={()=>{setShowSettingsDropDown(false)}} placement='end'>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>設定</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ParameterizeForm  
                  settings={globalSettings} 
                  data={node} setData={updateCurrentNode}>            
                </ParameterizeForm>
                <ParameterizeForm  
                  identifier={node?.uuid}
                  settings={[

                    // {"key": "hide_while_editing", "name": "隱藏", "type": "checkbox", "inputType": "checkbox"}, 
                    ...settings, 
                     
                    node?.type=='webpage'?  
                    {"type":"accordion", "key":"expand_timeout_events_accordion", "name":'初始觸發事件', "accordion_items":[
                      {type:'slot', slot:EventsForm, props:{'instance':node, 'updateInstance':updateCurrentNode, 'title':'觸發事件', 'prop_key':'timeout_events', 'EventFormComponent':TimeoutEventForm}},
                    ]}:{},

                    // {type:'slot', slot:TimeoutEventsForm, props:{'webpage':page, 'updateWebPage':updateWebPage}},
                    // {type:'slot', slot:ListenEventsForm, props:{'instance':page, 'updateInstance':updateWebPage}},
                    // {type:'slot', slot:InstanceCreateForm, props:{'instance':page, 'type':'webpage'}},
                    // {type:'button',action:routeToPage,name:'前往'},
                    {"type":"accordion", "key":"expand_present_events_accordion", "name":'顯示觸發事件', "accordion_items":[
                      {type:'slot', slot:EventsForm, props:{'instance':node, 'updateInstance':updateCurrentNode, 'title':'觸發事件', 'prop_key':'present_events', 'EventFormComponent':PresentEventForm}},
                    ]},
                    {"type":"accordion", "key":"expand_listen_events_accordion", "name":'監聽事件', "accordion_items":[
                      {type:'slot', slot:EventsForm, props:{'instance':node, 'updateInstance':updateCurrentNode, 'title':'觸發事件', 'prop_key':'listen_events', 'EventFormComponent':ListenEventForm}},
                    ]},  
                    {"type":"accordion", "key":"expand_mouse_click_events_accordion", "name":'游標點擊觸發事件', "accordion_items":[
                      {type:'slot', slot:EventsForm, props:{'instance':node, 'updateInstance':updateCurrentNode, 'title':'觸發事件', 'prop_key':'mouse_click_events', 'EventFormComponent':MouseEventForm}},
                  ]},
                    {"type":"accordion", "key":"expand_mouse_over_events_accordion", "name":'游標懸浮觸發事件', "accordion_items":[
                        {type:'slot', slot:EventsForm, props:{'instance':node, 'updateInstance':updateCurrentNode, 'title':'觸發事件', 'prop_key':'mouse_over_events', 'EventFormComponent':MouseEventForm}},
                    ]},
                    {"type":"accordion", "key":"expand_mouse_leave_events_accordion", "name":'游標滑出觸發事件', "accordion_items":[
                        {type:'slot', slot:EventsForm, props:{'instance':node, 'updateInstance':updateCurrentNode, 'title':'觸發事件', 'prop_key':'mouse_leave_events', 'EventFormComponent':MouseEventForm}},
                    ]},
                    {"type":"accordion", "key":"expand_mouse_click_outside_events_accordion", "name":'點擊元件外部觸發事件', "accordion_items":[
                        {type:'slot', slot:EventsForm, props:{'instance':node, 'updateInstance':updateCurrentNode, 'title':'觸發事件', 'prop_key':'mouse_click_outside_events', 'EventFormComponent':MouseClickOutsideEventForm}},
                    ]},
                    node?.type=='webpage'?{type:'button',action:()=>{
                      //disconnect socket
                      actions?.socket?.disconnect();
                      router.push(`/website_backend_v2/website_editor/${node?.name}`);},name:'前往'}:{},

                    {type:'button',action:removeCurrentNode,name:'刪除', style:{marginTop:'20px'}, variant:'danger'},
                  ]} 
                  data={node.data} setData={updateCurrentNodeData}>            
                </ParameterizeForm>
            </Offcanvas.Body>
        </Offcanvas>

        {/* Children Menu */}
        {

          // node?.type=='webpage'&& (hierarchy||[]).length==0
          // ?
          <Fragment>
            {
              //  node?.data?.show_children_menu 
               showChildrenMenuDict?.[node?.uuid]
               && 
               <NodeMenu 
               position={position}
               hierarchy={[...hierarchy, node]} 
               nodes={node?.children||[]} 
               hideNodeDict={hideNodeDict}
               actions={actions}
              //  update={updateHook}
              //  remove={removeHook}
              //  move={moveHook}
               
               />
            }
          </Fragment>
         
         

        }
        {/* Add Button */}
        {
          showChildrenMenuDict?.[node?.uuid] && node?.type=='webpage'&& (hierarchy||[]).length==0 &&
          <div style={{display:'flex', justifyContent:'center', margin:'5px'}}>
            <Button variant="primary" onClick={()=>{
              setNodeTemplateActive(true)
            }}>+</Button>
          </div>    
        }




    {
          node?.type=='webpage' && (hierarchy||[]).length==0 &&
            <NodeTemplateMenu2 
            position={position} 
            query={{'type':'section'}} 
            active={nodeTemplateActive} 
            setActive={setNodeTemplateActive} 
            selectTemplate={addSectionNode} 
            actions={actions}
            />
    }
    </Fragment>     
    
    
  );
}


NodeMenuItem.propTypes = {
    hierarchy: PropTypes.array,
    node: PropTypes.object,
    nodeIndex: PropTypes.number,
    actions: PropTypes.object
  };

export default NodeMenuItem;