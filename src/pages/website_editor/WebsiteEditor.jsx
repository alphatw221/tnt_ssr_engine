import React, { Fragment, useState, useEffect, useRef, useMemo } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

import EditorSideMenu from "@/components/editor-side-menu/EditorSideMenu"
import WebpageCSR from "@/components/webpage/WebpageCSR.jsx"

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee, faChevronRight } from '@fortawesome/free-solid-svg-icons'
   

import { 
  setCursor, setClipBoard , 
  setWebsiteCollaborators, 
  websiteCollaboratorLeft, 
  websiteCollaboratorJoin,
  websiteCollaboratorStateUpdate,
} from '@/redux/slices/editor-memory-slice'


import { useAppDispatch, useAppSelector} from '@/redux/hooks'


import { user_retrieve_website }from "@/api/website"
import { user_r_action_to_element} from "@/api/element"

import cogoToast from 'cogo-toast';
// import CSRWebsite from "@/components/website/CSRWebsite";
import Cookies from 'js-cookie'




import {
  websiteFindAndReplaceElement, 
  websiteFindAndReplaceElementData, 
  websiteFindAndRemoveElement,
  websiteFindElement, 
  websiteFindAndInsertElement,
  websiteFindAndInsertChildElement,
} from '@/lib/utils/elementHelper.js';

// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';

// import {get_website_editor_system_message} from '@/api/system_message'

import { initSocketConnection } from '@/lib/utils/socket.js'


import { user_delete_element, user_r_create_element} from '@/api/element.js'
import { user_create_webpage , user_update_webpage, user_delete_webpage, user_r_action_to_webpage} from '@/api/webpage.js'
import { elementCheckDropValidHelper,  webpageCheckDropValidHelper} from "@/lib/utils/dragDropHelperV2";
// import { checkDropValidHelper } from "@/lib/utils/dragDropHelper";
// import { validContainerNodes } from "@/lib/utils/nodeHelper";



const WebsiteEditor = () => {

  const params = useParams()
  const searchParams = useSearchParams()
  const navigate = useNavigate();

  // const websiteEditorState = useAppSelector((state) => {return state.website_editor});
  const userState = useAppSelector((state) => {return state.user});
  const editorMemory = useAppSelector((state) => state.editor_memory );

  const dispatch = useAppDispatch();
  
  // const [showBulletinBoard, setShowBulletinBoard] = useState(false)
  // const [bulletinBoardMessage, setBulletinBoardMessage] = useState({})

  const [socket, setSocket] = useState(null)
  const [website, setWebsite] = useState({

    webpages:[],
    stylesheet_blocks:[],
    javascript_blocks:[],

  })

  // const [sideMenuActive, setSideMenuActive] = useState(false)
  const [hideElementDict, setHideElementDict] = useState(JSON?.parse(localStorage?.getItem("hide_element_dict")||"{}")||{});
  const hideElementDictToggle = (uuid)=>{
    const _hideElementDict = JSON.parse(JSON.stringify(hideElementDict))
    if(_hideElementDict[uuid]){
      delete _hideElementDict[uuid]
    }else{
      _hideElementDict[uuid] = true
    }
    localStorage.setItem("hide_element_dict", JSON.stringify(_hideElementDict))
    setHideElementDict(_hideElementDict)
  }

  const [init, setInit] = useState(false)

  //fetch store website data
  //get system message
  useEffect(()=>{
    if(!init){
      setInit(true)   // prevent run twice in dev mode
      user_retrieve_website().then(res=>{
        console.log(res.data)
        setWebsite(res.data)
      })
    }
  },[init, setInit])

  

  useEffect(()=>{

    if(!socket && website.uuid){
      const socket = initSocketConnection('website_editor_v2',website.uuid)
      setSocket(socket)
    }

    const collaboratorUpdateElement = (element, sender_socket_id)=>{
      const _element = JSON.parse(element)
      console.log(_element)
      const _website = JSON.parse(JSON.stringify(website))
      if(socket?.id!=sender_socket_id){
        console.log('websiteFindAndReplaceElementData')
        websiteFindAndReplaceElementData(_website, _element)
        setWebsite(_website)
      }
    }
  
    const collaboratorRemoveElement = (parent_relation_uuid, sender_socket_id)=>{
      const _website = JSON.parse(JSON.stringify(website))
      if(socket?.id!=sender_socket_id){
        websiteFindAndRemoveElement(_website, parent_relation_uuid)
        setWebsite(_website)
      }
    }
  
    const collaboratorUpdateWebsite = (_website, sender_socket_id)=>{
      _website = JSON.parse(_website)
      if(socket?.id!=sender_socket_id){
        setWebsite(_website)
      }
    }

    const onConnect = ()=>{
      Cookies.set('editor_socket_id', socket.id)
      socket?.emit('collaborator_join_room', {'user':userState?.user, 'themeColor':userState?.themeColor||'#ff00ff'}, (collaborators)=>{
        dispatch(setWebsiteCollaborators(collaborators))
      })
    }

    const onWebsiteCollabtoryRoommateLeft = (collaborator)=>{
      dispatch(websiteCollaboratorLeft(collaborator))

    }
    const onWebsiteCollabtoryRoommateJoin = (collaborator)=>{
      dispatch(websiteCollaboratorJoin(collaborator))

    }
    const onCollaboratorStateUpdate = (collaborator)=>{
      dispatch(websiteCollaboratorStateUpdate(collaborator))

    }

    socket?.on('connect', onConnect)
    socket?.on('website_collabtory_roommate_left', onWebsiteCollabtoryRoommateLeft)
    socket?.on('website_collabtory_roommate_join', onWebsiteCollabtoryRoommateJoin)
    socket?.on('collaborator_state_update', onCollaboratorStateUpdate)
    socket?.on('collaborator_update_element', collaboratorUpdateElement)
    socket?.on('collaborator_remove_element', collaboratorRemoveElement)
    socket?.on('collaborator_update_website', collaboratorUpdateWebsite)

    return ()=>{
      socket?.off('connect', onConnect)
      socket?.off('website_collabtory_roommate_left', onWebsiteCollabtoryRoommateLeft)
      socket?.off('website_collabtory_roommate_join', onWebsiteCollabtoryRoommateJoin)
      socket?.off('collaborator_state_update', onCollaboratorStateUpdate)
      socket?.off('collaborator_update_element', collaboratorUpdateElement);
      socket?.off('collaborator_remove_element', collaboratorRemoveElement);
      socket?.off('collaborator_update_website', collaboratorUpdateWebsite);

    }
  }, [socket, website])







  const globleMoveNextTo = (sourceElement, targetElement, after)=>{
    const _website = JSON.parse(JSON.stringify(website))
    const sourceElementClone = JSON.parse(JSON.stringify(sourceElement))
    websiteFindAndRemoveElement(_website, sourceElement?.parent_relation_uuid)
    websiteFindAndInsertElement(_website, targetElement?.parent_relation_uuid, sourceElementClone, after)
    setWebsite(_website)
  }
  const globleMoveInto = (sourceElement, targetElement, sequence, after)=>{
    const _website = JSON.parse(JSON.stringify(website))
    const sourceElementClone = JSON.parse(JSON.stringify(sourceElement))
    websiteFindAndRemoveElement(_website, sourceElement?.parent_relation_uuid)
    websiteFindAndInsertChildElement(_website, targetElement?.parent_relation_uuid, sequence, after, sourceElementClone)
    setWebsite(_website)
  }
  const globleInsertNextTo = (sourceElement, targetElement, after)=>{
    const _website = JSON.parse(JSON.stringify(website))
    const sourceElementClone = JSON.parse(JSON.stringify(sourceElement))
    websiteFindAndInsertElement(_website, targetElement?.parent_relation_uuid, sourceElementClone, after)
    setWebsite(_website)
  }

  const globleInsertInto = (sourceElement, targetElement, sequence, after)=>{
    const _website = JSON.parse(JSON.stringify(website))
    const sourceElementClone = JSON.parse(JSON.stringify(sourceElement))
    websiteFindAndInsertChildElement(_website, targetElement?.parent_relation_uuid, sequence, after, sourceElementClone)
    setWebsite(_website)
  }

  const globleUpdateElement = (element)=>{
    const _website = JSON.parse(JSON.stringify(website))
    websiteFindAndReplaceElement(_website, element)
    setWebsite(_website)
  }

  const globleRemoveElement = (target_parent_relation_uuid)=>{
    const _website = JSON.parse(JSON.stringify(website))
    websiteFindAndRemoveElement(_website, target_parent_relation_uuid)
    setWebsite(_website)
  }

  const globleFindNode = (target_parent_relation_uuid)=>{
    return websiteFindElement(website, target_parent_relation_uuid)
  }



  const webpageMoveNextTo = (sourceWebpage, targetWebpage, after)=>{
    const _website = JSON.parse(JSON.stringify(website))
    const sourceWebpageClone = JSON.parse(JSON.stringify(sourceWebpage))
    for(let i=0;i<(_website?.webpages||[]).length;i++){
      if(_website?.webpages[i]?.uuid===sourceWebpage?.uuid){
        _website.webpages?.splice(i,1);
        break;
      }
    }
    for(let j=0;j<(_website?.webpages||[]).length;j++){
      if(_website?.webpages[j]?.uuid===targetWebpage?.uuid){
        _website.webpages?.splice(j+after,0, sourceWebpageClone);
        break;
      }
    }
    setWebsite(_website)
  }
  const webpageInsertNextTo = (sourceWebpage, targetWebpage, after)=>{
    const _website = JSON.parse(JSON.stringify(website))
    const sourceWebpageClone = JSON.parse(JSON.stringify(sourceWebpage))
    for(let j=0;j<(_website?.webpages||[]).length;j++){
      if(_website?.webpages[j]?.uuid===targetWebpage?.uuid){
        _website.webpages?.splice(j+after,0, sourceWebpageClone);
        break;
      }
    }
    setWebsite(_website)
  }
  const moveIntoWebpageBody = (sourceElement, targetWebpage, sequence)=>{
    const _website = JSON.parse(JSON.stringify(website))
    const sourceElementClone = JSON.parse(JSON.stringify(sourceElement))
    websiteFindAndRemoveElement(_website, sourceElement?.parent_relation_uuid)
    for(let i=0;i<(_website?.webpages||[]).length;i++){
      if(_website?.webpages[i]?.uuid===targetWebpage?.uuid){
        _website.webpages?.[i]?.body_elements?.splice(sequence, 0, sourceElementClone)
        break;
      }
    }
    setWebsite(_website)
  }
  const moveIntoWebpageHead = (sourceElement, targetWebpage, sequence)=>{
    const _website = JSON.parse(JSON.stringify(website))
    const sourceElementClone = JSON.parse(JSON.stringify(sourceElement))
    websiteFindAndRemoveElement(_website, sourceElement?.parent_relation_uuid)
    for(let i=0;i<(_website?.webpages||[]).length;i++){
      if(_website?.webpages[i]?.uuid===targetWebpage?.uuid){
        _website.webpages?.[i]?.head_elements?.splice(sequence, 0, sourceElementClone)
        break;
      }
    }
    setWebsite(_website)
  }
  const insertIntoWebpageBody = (sourceElement, targetWebpage, sequence)=>{
    const _website = JSON.parse(JSON.stringify(website))
    const sourceElementClone = JSON.parse(JSON.stringify(sourceElement))
    for(let i=0;i<(_website?.webpages||[]).length;i++){
      if(_website?.webpages[i]?.uuid===targetWebpage?.uuid){
        _website.webpages?.[i]?.body_elements?.splice(sequence, 0, sourceElementClone)
        break;
      }
    }
    setWebsite(_website)
  }
  const insertIntoWebpageHead = (sourceElement, targetWebpage, sequence)=>{
    const _website = JSON.parse(JSON.stringify(website))
    const sourceElementClone = JSON.parse(JSON.stringify(sourceElement))
    for(let i=0;i<(_website?.webpages||[]).length;i++){
      if(_website?.webpages[i]?.uuid===targetWebpage?.uuid){
        _website.webpages?.[i]?.head_elements?.splice(sequence, 0, sourceElementClone)
        break;
      }
    }
    setWebsite(_website)
  }
  const updateWebpage = (_webpage) =>{
    user_update_webpage({
      'webpage_uuid':_webpage?.uuid,
      'data':_webpage
    }).then(res=>{console.log(res.data)})
    const _website = JSON.parse(JSON.stringify(website))
    _website.webpages=(website?.webpages||[]).map((w)=>w.uuid==_webpage?.uuid?_webpage:w)
    setWebsite(_website)
  }

  const addWebpageElement = (webpage_uuid, position, _element)=>{
    const _website = JSON.parse(JSON.stringify(website))
    _website.webpages=(_website.webpages||[]).map((w)=>
    w.uuid==webpage_uuid
    ?
    position==='head'?{...w, head_elements:[_element, ...(w?.head_elements||[])]}:{...w, body_elements:[_element, ...(w?.body_elements||[])]}
    :
    w
  )
    setWebsite(_website)
  }


  const addWebpage = ()=>{
    user_create_webpage({
      'data':{
        name:'未命名'
      }
    }).then(res=>{
      console.log(res.data)
    })
    const sudo_webpage = {name:'未命名'}
    const _website = JSON.parse(JSON.stringify(website))
    _website.webpages=[sudo_webpage, ...(_website.webpages||[])]
    setWebsite(_website)
  }

  const removeWebpage = (webpage_uuid) => {
    const _website = JSON.parse(JSON.stringify(website))
    for(let i=0;i<(_website?.webpages||[]).length;i++){
      if(_website?.webpages[i]?.uuid===webpage_uuid){
        _website?.webpages?.splice(i, 1)
        break;
      }
    }
    setWebsite(_website)
  }
  
  const setEditorCursor = (node_uuid)=>{
    dispatch(setCursor(node_uuid))
    socket.emit('collaborator_update_cursor', node_uuid)
  }

  const emitWebsiteUpdated = ()=>{
    socket.emit('website_updated', website)
  }

  const getWebsiteUUID = ()=>{
    return website.uuid
  }
   const getStoreUUID = ()=>{
    return website?.store_uuid
  }
  const updateWebsiteSettings = (data)=>{
    setWebsite({...website, 'data':data})
  }

  const switchWebpage = (webpageName)=>{
      navigate(`/website_backend_v2/website_editor/${webpageName}`, { replace: false });
  }
  const actions = {
      addWebpage,
      addWebpageElement,
      updateWebpage,
      webpageMoveNextTo,
      moveIntoWebpageHead,
      moveIntoWebpageBody,
      removeWebpage,
      setEditorCursor,
      emitWebsiteUpdated,
      socket,
      setWebsite,
      globleMoveNextTo,
      globleMoveInto,
      globleInsertNextTo,
      globleInsertInto,
      globleUpdateElement,
      globleRemoveElement,
      globleFindNode,
      getWebsiteUUID,
      getStoreUUID,
      updateWebsiteSettings,

      hideElementDictToggle,
      switchWebpage,
  }

  //init keydown shortcut
  const keyDownShoutCutHandler = (e)=>{
    console.log(e?.key)
    if ((e?.key||'').toLowerCase() === 'e' && e.ctrlKey|| e.metaKey) {

    }
    // else if((e?.key||'').toLowerCase() === 'r' && e.shiftKey){

    // }
    // else if((e?.key||'').toLowerCase() === 't' && e.shiftKey){

    // }
    else if ((e?.key||'').toLowerCase() === 'd' && e.ctrlKey|| e.metaKey){

    }
    else if ((e?.key||'').toLowerCase() === 'c' && e.ctrlKey|| e.metaKey){
        if(!editorMemory?.cursor){
          console.log('no selected element or webpage')
        }else{
          console.log(editorMemory?.cursor)
          dispatch(setClipBoard(JSON.parse(JSON.stringify(editorMemory?.cursor))))
        }
    }else if ((e?.key||'').toLowerCase() === 'v' && e.ctrlKey|| e.metaKey){
        if(!editorMemory?.clipBoard){
          console.log('no copied element or webpage')
          return
        }

        console.log(editorMemory?.clipBoard)
        if(editorMemory?.cursor?.type=='webpage'){
  
          webpageCheckDropValidHelper(editorMemory?.clipBoard?.type, null, 
            ()=>{},
            ()=>{
              //onlyIn
              if(editorMemory?.cursor?.head){
                insertIntoWebpageHead(editorMemory?.clipBoard?.data, editorMemory?.cursor?.data, 0)
                user_r_action_to_element({
                  'parent_relation_uuid':editorMemory?.clipBoard?.data?.parent_relation_uuid,
                  'action':e?.shiftKey?'share':'clone',
                  'target_webpage_uuid':editorMemory?.cursor?.data?.uuid,
                  'target_webpage_position':'head',
                }).then(res=>{console.log(res.data)})
              }else{
                insertIntoWebpageBody(editorMemory?.clipBoard?.data, editorMemory?.cursor?.data, 0)
                user_r_action_to_element({
                  'parent_relation_uuid':editorMemory?.clipBoard?.data?.parent_relation_uuid,
                  'action':e?.shiftKey?'share':'clone',
                  'target_webpage_uuid':editorMemory?.cursor?.data?.uuid,
                  'target_webpage_position':'body',
                }).then(res=>{console.log(res.data)})
              }
            },
            ()=>{
              //beforeAfter
              webpageInsertNextTo(editorMemory?.clipBoard?.data, editorMemory?.cursor?.data, editorMemory?.cursor?.position=='after'?1:0)
              user_r_action_to_webpage({
                  'webpage_uuid':editorMemory?.clipBoard?.data?.uuid,
                  'action':'clone',
                  'target_webpage_uuid':editorMemory?.cursor?.data?.uuid,
                  'target_relative_position':editorMemory?.cursor?.position,
              }).then(res=>{console.log(res.data)})
            },
            ()=>{},
          )
        }else if(editorMemory?.cursor?.type=='element' && editorMemory?.clipBoard?.type=='element'){
          elementCheckDropValidHelper(editorMemory?.clipBoard?.data, editorMemory?.cursor?.data,
            ()=>{
              if(editorMemory?.cursor?.position=='in'){
                globleInsertInto(editorMemory?.clipBoard?.data, editorMemory?.cursor?.data, 0, 0)
                user_r_action_to_element({
                  'parent_relation_uuid':editorMemory?.clipBoard?.data?.parent_relation_uuid, 
                  'action':e?.shiftKey?'share':'clone',
                  'target_webpage_uuid':null, 
                  'target_element_relation_uuid':editorMemory?.cursor?.data?.parent_relation_uuid, 
                  'target_relative_position':'in'
                }).then(res=>{console.log(res.data)})
              }else{
                globleInsertNextTo(editorMemory?.clipBoard?.data, editorMemory?.cursor?.data, editorMemory?.cursor?.position=='after'?1:0)
                user_r_action_to_element({
                  'parent_relation_uuid':editorMemory?.clipBoard?.data?.parent_relation_uuid, 
                  'action':e?.shiftKey?'share':'clone',
                  'target_webpage_uuid':null, 
                  'target_element_relation_uuid':editorMemory?.cursor?.data?.parent_relation_uuid, 
                  'target_relative_position':editorMemory?.cursor?.position
                }).then(res=>{console.log(res.data)})
              }
            },
            ()=>{},
            ()=>{
              globleInsertNextTo(editorMemory?.clipBoard?.data, editorMemory?.cursor?.data, editorMemory?.cursor?.position=='after'?1:0)
              user_r_action_to_element({
                  'parent_relation_uuid':editorMemory?.clipBoard?.data?.parent_relation_uuid, 
                  'action':e?.shiftKey?'share':'clone',
                  'target_webpage_uuid':null, 
                  'target_element_relation_uuid':editorMemory?.cursor?.data?.parent_relation_uuid, 
                  'target_relative_position':editorMemory?.cursor?.position
                }).then(res=>{console.log(res.data)})
            },
            ()=>{},
          )
        }
        
        
    }
  }

  

  useEffect(() => {
    window.addEventListener("keydown", keyDownShoutCutHandler);
    return () => {
      window.removeEventListener("keydown", keyDownShoutCutHandler);

    };
  }, [
    editorMemory?.cursor,
    editorMemory?.clipBoard,
    editorMemory?.cursorDirection,
    website,
    socket
  ]);

  const routingTable = {
        'customer_login_route':website?.data?.customer_login_route,
        'customer_register_route':website?.data?.customer_register_route,
        'cart_route':website?.data?.cart_route,
        'checkout_route':website?.data?.checkout_route,
        'order_route':website?.data?.order_route,
        'my_orders_route':website?.data?.my_orders_route,
        'order_payment_route':website?.data?.order_payment_route,
        'shop_route':website?.data?.shop_route,
        'product_route':website?.data?.product_route,
        'blog_route':website?.data?.blog_route,
        'blog_post_route':website?.data?.blog_post_route,
      }

  
  // const webpage = params?.page_name ? website.webpages.find(wp=>wp.name==params?.page_name) : website.webpages?.[0]
  // const webpageRef = useRef(params?.page_name ? website.webpages.find(wp=>wp.name==params?.page_name) : website.webpages?.[0])
  const selectedWebpage = useMemo(() => {
    return params?.page_name ? website.webpages.find(wp=>wp.name==params?.page_name) : website.webpages?.[0]
  }, [params?.page_name, website?.webpages]);

  return (
    <Fragment>
      {/* {!sideMenuActive&&
      <button className={style.show_side_menu_button} onClick={()=>{setSideMenuActive(true)}}>
        <div><FontAwesomeIcon icon={faChevronRight} /></div>
      </button>
      } */}

      <EditorSideMenu website={website} actions={actions} hideElementDict={hideElementDict}/>
      {/* <ComponentTemplateMenu />
      <FragmentTemplateMenu actions={actions}/>
      <PageTemplateMenu actions={actions}/> */}





      {/* <StoreComponentMenu/>
      <StoreFragmentMenu actions={actions}/>
      <StoreWebpageMenu actions={actions}/> */}
      
      {/* <BrowserPreview fullWindow={!websiteEditorState.sideMenuActive}>
        <CSRWebsite website={website} actions={actions} mode={'edit'}/>
      </BrowserPreview> */}

      {/* <CSRWebsite website={website} actions={actions} mode={'edit'} hideNodeDict={hideNodeDict}/> */}

      {/* <ComponentSimulator/>
      <FragmentSimulator/>
      <WebpageSimulator/> */}


      {/* 佈告欄 */}


      < WebpageCSR website={website} webpage={selectedWebpage} mode='dev' hideElementDict={hideElementDict} actions={actions} routingTable={routingTable}/>

      {/* <Modal show={showBulletinBoard} onHide={()=>{setShowBulletinBoard(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>{bulletinBoardMessage?.title||''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{whiteSpace:'pre-wrap'}}>
            {bulletinBoardMessage?.context||''}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={()=>{setShowBulletinBoard(false)}}>
            確定
          </Button>
        </Modal.Footer>
      </Modal> */}


    </Fragment>
  );
};

export default WebsiteEditor;
