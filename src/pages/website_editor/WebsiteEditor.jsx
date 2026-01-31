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

  appendEditEvents,
} from '@/redux/slices/editor-memory-slice'



import { useAppDispatch, useAppSelector} from '@/redux/hooks'


import { user_retrieve_website }from "@/api/website"
import { user_r_action_to_element} from "@/api/element"


// import CSRWebsite from "@/components/website/CSRWebsite";
import Cookies from 'js-cookie'




import {
  websiteFindAndReplaceElement, 
  websiteFindAndRemoveElement,
  websiteFindAndRemoveElementRelation,
  websiteFindElement, 
  websiteFindAndInsertElement,
  websiteFindAndInsertChildElement,
} from '@/lib/utils/elementHelper.js';


// import {get_website_editor_system_message} from '@/api/system_message'

import { initSocketConnection } from '@/lib/utils/socket.js'



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
    const _hideElementDict = { ...hideElementDict };

    // const _hideElementDict = structuredClone(hideElementDict)
    if(_hideElementDict[uuid]){
      delete _hideElementDict[uuid]
    }else{
      _hideElementDict[uuid] = true
    }
    localStorage.setItem("hide_element_dict", JSON.stringify(_hideElementDict))
    setHideElementDict(_hideElementDict)
  }

  const [init, setInit] = useState(false)

  const [expandWebpageDict, setExpandWebpageDict] = useState(JSON?.parse(localStorage?.getItem("expand_webpage_dict")||"{}")||{});
  const expandWebpageDictToggle = (uuid)=>{
      const _expandWebpageDict = { ...expandWebpageDict };
      // const _expandWebpageDict = structuredClone(expandWebpageDict)
      if(_expandWebpageDict[uuid]){delete _expandWebpageDict[uuid]}
      else{_expandWebpageDict[uuid] = true}
      localStorage.setItem("expand_webpage_dict", JSON.stringify(_expandWebpageDict))
      setExpandWebpageDict(_expandWebpageDict)
  }

  
  const [expandElementDict, setExpandElementDict] = useState(JSON?.parse(localStorage?.getItem("expand_element_dict")||"{}")||{});
  const expandElementDictToggle = (uuid)=>{
    // shallow copy 最外層
      const _expandWebpageDict = { ...expandElementDict };
      // const _expandWebpageDict = structuredClone(expandElementDict)
      if(_expandWebpageDict[uuid]){delete _expandWebpageDict[uuid]}
      else{_expandWebpageDict[uuid] = true}
      localStorage.setItem("expand_element_dict", JSON.stringify(_expandWebpageDict))
      setExpandElementDict(_expandWebpageDict)
  }

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

    const collaboratorUpdateElement = (json_data, sender_socket_id)=>{
      
      
      if(socket?.id!=sender_socket_id){
        // shallow copy 最外層
        const _website = { ...website };
        console.log('websiteFindAndReplaceElement')
        const {element, event} = JSON.parse(json_data)
        websiteFindAndReplaceElement(_website, element?.uuid, element)
        setWebsite(_website)
        dispatch(appendEditEvents([event]))
      }
    }
  
    const collaboratorRemoveElement = (json_data, sender_socket_id)=>{
      if(socket?.id!=sender_socket_id){
        // shallow copy 最外層
        const _website = { ...website };
        const {element_uuid, event} = JSON.parse(json_data)
        websiteFindAndRemoveElement(_website, element_uuid)
        setWebsite(_website)
        dispatch(appendEditEvents([event]))
      }
    }
    const collaboratorRemoveElementRelation = (json_data, sender_socket_id)=>{
      if(socket?.id!=sender_socket_id){
        // shallow copy 最外層
        const _website = { ...website };
        const {parent_relation_uuid, event} = JSON.parse(json_data)
        websiteFindAndRemoveElementRelation(_website, parent_relation_uuid)
        setWebsite(_website)
        dispatch(appendEditEvents([event]))
      }
    }
    const collaboratorDoElementAction = ( json_data, sender_socket_id)=>{
      if(socket?.id!=sender_socket_id){
        // shallow copy 最外層
        const _website = { ...website };
        const {
          action, 
          source_element_relation_uuid, 
          new_parent_relation_uuid, 
          target_webpage_uuid, 
          target_webpage_position, 
          target_element_relation_uuid, 
          target_relative_position,
          event
        } = JSON.parse(json_data)
        const sourceElement = websiteFindElement(_website, source_element_relation_uuid)
        const newElement = {...sourceElement, parent_relation_uuid:new_parent_relation_uuid}


        if(action=='move'){
          websiteFindAndRemoveElementRelation(_website, source_element_relation_uuid)
        }

        if(![null, undefined, '', 'null', 'undefined'].includes(target_webpage_uuid)){
          _addWebpageElement(_website, target_webpage_uuid, target_webpage_position, newElement)
        }else{
          if(target_relative_position=='before'){
            websiteFindAndInsertElement(_website, target_element_relation_uuid, newElement, 0)
          }else if(target_relative_position=='after'){
            websiteFindAndInsertElement(_website, target_element_relation_uuid, newElement, 1)
          }else if(target_relative_position=='in'){
            websiteFindAndInsertChildElement(_website, target_element_relation_uuid, -1, 0, newElement)
          }
        }
        setWebsite(_website)
        dispatch(appendEditEvents([event]))
       
      }
    }

    const collaboratorCreateElement = (json_data, sender_socket_id)=>{
      if(socket?.id!=sender_socket_id){
        const _website = { ...website };

        const {
          element, 
          new_parent_relation_uuid, 
          target_webpage_uuid, 
          target_webpage_position, 
          target_element_relation_uuid, 
          target_relative_position,
          event
        } = JSON.parse(json_data)

        const newElement = {...element, parent_relation_uuid:new_parent_relation_uuid}
        if(![null, undefined, '', 'null', 'undefined'].includes(target_webpage_uuid)){
          _addWebpageElement(_website, target_webpage_uuid, target_webpage_position, newElement)
        }else{
          if(target_relative_position=='before'){
            websiteFindAndInsertElement(_website, target_element_relation_uuid, newElement, 0)
          }else if(target_relative_position=='after'){
            websiteFindAndInsertElement(_website, target_element_relation_uuid, newElement, 1)
          }else if(target_relative_position=='in'){
            websiteFindAndInsertChildElement(_website, target_element_relation_uuid, -1, 0, newElement)
          }
        }
        setWebsite(_website)
        dispatch(appendEditEvents([event]))
      } 
    }

    const collaboratorUpdateWebsite = (json_data, sender_socket_id)=>{
      if(socket?.id!=sender_socket_id){

        const {
          _website, 
          event
        } = JSON.parse(json_data)

        setWebsite(_website)
        dispatch(appendEditEvents([event]))
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
    socket?.on('collaborator_do_element_action', collaboratorDoElementAction)
    socket?.on('collaborator_create_element', collaboratorCreateElement)
    socket?.on('collaborator_update_element', collaboratorUpdateElement)
    socket?.on('collaborator_remove_element', collaboratorRemoveElement)
    socket?.on('collaborator_remove_element_relation', collaboratorRemoveElementRelation)
    socket?.on('collaborator_update_website', collaboratorUpdateWebsite)

    return ()=>{
      socket?.off('connect', onConnect)
      socket?.off('website_collabtory_roommate_left', onWebsiteCollabtoryRoommateLeft)
      socket?.off('website_collabtory_roommate_join', onWebsiteCollabtoryRoommateJoin)
      socket?.off('collaborator_state_update', onCollaboratorStateUpdate);
      socket?.off('collaborator_do_element_action', collaboratorDoElementAction);
      socket?.off('collaborator_create_element', collaboratorCreateElement);
      socket?.off('collaborator_update_element', collaboratorUpdateElement);
      socket?.off('collaborator_remove_element', collaboratorRemoveElement);
      socket?.off('collaborator_remove_element_relation', collaboratorRemoveElementRelation);
      socket?.off('collaborator_update_website', collaboratorUpdateWebsite);

    }
  }, [socket, website])







  const globleMoveNextTo = (sourceElement, targetElement, after)=>{
    // shallow copy 最外層
    const _website = { ...website };
    // const _website = structuredClone(website)
    // const sourceElementClone = structuredClone(sourceElement)
    websiteFindAndRemoveElementRelation(_website, sourceElement?.parent_relation_uuid)
    websiteFindAndInsertElement(_website, targetElement?.parent_relation_uuid, sourceElement, after)
    setWebsite(_website)
  }
  const globleMoveInto = (sourceElement, targetElement, sequence, after)=>{
    // shallow copy 最外層
    const _website = { ...website };
    // const _website = structuredClone(website)
    // const sourceElementClone = structuredClone(sourceElement)
    websiteFindAndRemoveElementRelation(_website, sourceElement?.parent_relation_uuid)
    websiteFindAndInsertChildElement(_website, targetElement?.parent_relation_uuid, sequence, after, sourceElement)
    setWebsite(_website)
  }
  const globleInsertNextTo = (sourceElement, targetParentRelationUUID, after)=>{
    
    // shallow copy 最外層
    const _website = { ...website };
    // const _website = structuredClone(website)
    // const sourceElementClone = structuredClone(sourceElement)
    websiteFindAndInsertElement(_website, targetParentRelationUUID, sourceElement, after)
    setWebsite(_website)
  }

  const globleInsertInto = (sourceElement, targetParentRelationUUID, sequence, after)=>{

    // shallow copy 最外層
    const _website = { ...website };
    // const _website = structuredClone(website)
    // const sourceElementClone = structuredClone(sourceElement)
    websiteFindAndInsertChildElement(_website, targetParentRelationUUID, sequence, after, sourceElement)
    setWebsite(_website)
    return _website
  }

  const globleUpdateElement = (element_uuid, element, __website)=>{
    const _website = __website?__website:{...website}
    websiteFindAndReplaceElement(_website, element_uuid, element)
    setWebsite(_website)
    return _website
  }

  const globleRemoveElement = (target_parent_relation_uuid)=>{
    // shallow copy 最外層
    const _website = { ...website };
    // const _website = structuredClone(website)
    websiteFindAndRemoveElementRelation(_website, target_parent_relation_uuid)
    setWebsite(_website)
  }

  const globleFindElement = (target_parent_relation_uuid)=>{
    return websiteFindElement(website, target_parent_relation_uuid)
  }



  const webpageMoveNextTo = (sourceWebpage, targetWebpage, after)=>{
    const _website = { ...website };
    // const _website = structuredClone(website)
    // const sourceWebpageClone = structuredClone(sourceWebpage)
    for(let i=0;i<(_website?.webpages||[]).length;i++){
      if(_website?.webpages[i]?.uuid===sourceWebpage?.uuid){
        _website.webpages?.splice(i,1);
        break;
      }
    }
    for(let j=0;j<(_website?.webpages||[]).length;j++){
      if(_website?.webpages[j]?.uuid===targetWebpage?.uuid){
        _website.webpages?.splice(j+after,0, sourceWebpage);
        break;
      }
    }
    setWebsite(_website)
  }
  const webpageInsertNextTo = (sourceWebpage, targetWebpage, after)=>{
    // const _website = structuredClone(website)
    // const sourceWebpageClone = structuredClone(sourceWebpage)
    // for(let j=0;j<(_website?.webpages||[]).length;j++){
    //   if(_website?.webpages[j]?.uuid===targetWebpage?.uuid){
    //     _website.webpages?.splice(j+after,0, sourceWebpageClone);
    //     break;
    //   }
    // }
    // setWebsite(_website)


    setWebsite(prev => {
      // shallow copy 最外層
      const newWebsite = { ...prev };
      // shallow copy 網頁陣列
      newWebsite.webpages = [...(prev.webpages || [])];
      for (let j = 0; j < newWebsite.webpages.length; j++) {
        if (newWebsite.webpages[j]?.uuid === targetWebpage?.uuid) {
          newWebsite.webpages.splice(j + after, 0, sourceWebpage);
          break;
        }
      }

      return newWebsite;
    });


  }
  const moveIntoWebpageBody = (sourceElement, targetWebpage, sequence)=>{
    const _website = {...website}
    // const _website = structuredClone(website)
    // const sourceElementClone = structuredClone(sourceElement)
    websiteFindAndRemoveElementRelation(_website, sourceElement?.parent_relation_uuid)
    for(let i=0;i<(_website?.webpages||[]).length;i++){
      if(_website?.webpages[i]?.uuid===targetWebpage?.uuid){
        _website.webpages?.[i]?.body_elements?.splice(sequence, 0, sourceElement)
        break;
      }
    }
    setWebsite(_website)
  }
  const moveIntoWebpageHead = (sourceElement, targetWebpage, sequence)=>{
    const _website = {...website}
    // const _website = structuredClone(website)
    // const sourceElementClone = structuredClone(sourceElement)
    websiteFindAndRemoveElementRelation(_website, sourceElement?.parent_relation_uuid)
    for(let i=0;i<(_website?.webpages||[]).length;i++){
      if(_website?.webpages[i]?.uuid===targetWebpage?.uuid){
        _website.webpages?.[i]?.head_elements?.splice(sequence, 0, sourceElement)
        break;
      }
    }
    setWebsite(_website)
  }
  const insertIntoWebpageBody = (sourceElement, targetWebpage, sequence)=>{
    // const _website = structuredClone(website)
    // const sourceElementClone = structuredClone(sourceElement)
    // for(let i=0;i<(_website?.webpages||[]).length;i++){
    //   if(_website?.webpages[i]?.uuid===targetWebpage?.uuid){
    //     _website.webpages?.[i]?.body_elements?.splice(sequence, 0, sourceElementClone)
    //     break;
    //   }
    // }
    // setWebsite(_website)



    
    setWebsite(prev => {
      // shallow copy 最外層
      const newWebsite = { ...prev };

      // shallow copy 網頁列表
      newWebsite.webpages = [...(prev.webpages || [])];

      // 找到目標網頁
      const idx = newWebsite.webpages.findIndex(w => w.uuid === targetWebpage?.uuid);
      if (idx !== -1) {
        // shallow copy 目標網頁
        const targetPage = { ...newWebsite.webpages[idx] };

        // shallow copy body_elements
        targetPage.body_elements = [...(targetPage.body_elements || [])];

        // 插入元素
        targetPage.body_elements.splice(sequence, 0, sourceElement);

        // 更新陣列
        newWebsite.webpages[idx] = targetPage;
      }

      return newWebsite;
    })



  }
  const insertIntoWebpageHead = (sourceElement, targetWebpage, sequence)=>{
    // const _website = structuredClone(website)
    // const sourceElementClone = structuredClone(sourceElement)
    // for(let i=0;i<(_website?.webpages||[]).length;i++){
    //   if(_website?.webpages[i]?.uuid===targetWebpage?.uuid){
    //     _website.webpages?.[i]?.head_elements?.splice(sequence, 0, sourceElementClone)
    //     break;
    //   }
    // }
    // setWebsite(_website)


    setWebsite(prev => {
      // shallow copy 最外層
      const newWebsite = { ...prev };

      // shallow copy 網頁列表
      newWebsite.webpages = [...(prev.webpages || [])];

      // 找到目標網頁
      const idx = newWebsite.webpages.findIndex(w => w.uuid === targetWebpage?.uuid);
      if (idx !== -1) {
        // shallow copy 目標網頁
        const targetPage = { ...newWebsite.webpages[idx] };

        // shallow copy head_elements
        targetPage.head_elements = [...(targetPage.head_elements || [])];

        // 插入元素
        targetPage.head_elements.splice(sequence, 0, sourceElement);

        // 更新陣列
        newWebsite.webpages[idx] = targetPage;
      }

      return newWebsite;
    })


  }
  const updateWebpage = (_webpage) =>{
    const _website = {...website}
    // const _website = structuredClone(website)
    user_update_webpage({
      'webpage_uuid':_webpage?.uuid,
      'data':{..._webpage, head_elements:null, body_elements:null}
    }).then(res=>{console.log(res.data)})
    
    for (let i = 0; i < (_website?.webpages||[]).length; i++) {
      if (_website?.webpages[i].uuid === _webpage?.uuid) {
        _website.webpages[i] = _webpage;
        break; 
      }
    }
    
    setWebsite(_website)
  }

  const _addWebpageElement = (_website, webpage_uuid, position, _element)=>{


    
    for (let i = 0; i < (_website?.webpages||[]).length; i++) {
      const w = _website.webpages[i];
      if (w.uuid === webpage_uuid) {
        if (position === 'head') {
          (w.head_elements ||= []).push(_element);
        } else {
          (w.body_elements ||= []).push(_element);
        }
        break; 
      }
    }
    

  }
  const addWebpageElement = (webpage_uuid, position, _element)=>{
    const _website = {...website}
    // const _website = structuredClone(website)
    _addWebpageElement(_website, webpage_uuid, position, _element)
    setWebsite(_website)
    return _website
  }


  const addWebpage = ()=>{
    user_create_webpage({
      'data':{
        name:'未命名'
      }
    }).then(res=>{console.log(res.data)})
    const sudo_webpage = {name:'未命名'}
    const _website = {...website};
    // const _website = structuredClone(website)
    (_website.webpages ||= []).push(sudo_webpage)
    setWebsite(_website)
  }

  const removeWebpage = (webpage_uuid) => {
    // const _website = structuredClone(website)
    const _website = {...website}
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
      navigate(`/website_backend/website_editor/${webpageName}`, { replace: false });
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
      globleFindElement,
      getWebsiteUUID,
      getStoreUUID,
      updateWebsiteSettings,

      hideElementDictToggle,
      switchWebpage,
  }

  //init keydown shortcut
  const keyDownShoutCutHandler = (e)=>{
    if ((e?.key||'').toLowerCase() === 'e' && e.ctrlKey|| e.metaKey) {

    }
    // else if((e?.key||'').toLowerCase() === 'r' && e.shiftKey){

    // }
    // else if((e?.key||'').toLowerCase() === 't' && e.shiftKey){

    // }
    else if ((e?.key||'').toLowerCase() === 'd' && e.ctrlKey|| e.metaKey){

    }
    else if ((e?.key||'').toLowerCase() === 'c' && e.ctrlKey|| e.metaKey && editorMemory?.selectedTool=='iCursor'){
        if(!editorMemory?.cursor){
          console.log('no selected element or webpage')
        }else{
          console.log(editorMemory?.cursor)
          if(confirm('複製')){
            dispatch(setClipBoard(structuredClone(editorMemory?.cursor)))
          }
        }
    }else if ((e?.key||'').toLowerCase() === 'v' && e.ctrlKey|| e.metaKey && editorMemory?.selectedTool=='iCursor'){
        if(!editorMemory?.clipBoard){
          console.log('no copied element or webpage')
          return
        }
        console.log(editorMemory?.clipBoard)
        if(!confirm('確認貼上')) return;
        if(editorMemory?.cursor?.type=='webpage'){
  
          webpageCheckDropValidHelper(editorMemory?.clipBoard?.type, null, 
            ()=>{},
            ()=>{
              //onlyIn
              if(editorMemory?.cursor?.head){
                insertIntoWebpageHead(structuredClone(editorMemory?.clipBoard?.data), editorMemory?.cursor?.data, 0)
                user_r_action_to_element({
                  'parent_relation_uuid':editorMemory?.clipBoard?.data?.parent_relation_uuid,
                  'action':e?.shiftKey?'mirror':'clone',
                  'target_webpage_uuid':editorMemory?.cursor?.data?.uuid,
                  'target_webpage_position':'head',
                }).then(res=>{console.log(res.data)})
              }else{
                insertIntoWebpageBody(structuredClone(editorMemory?.clipBoard?.data), editorMemory?.cursor?.data, 0)
                user_r_action_to_element({
                  'parent_relation_uuid':editorMemory?.clipBoard?.data?.parent_relation_uuid,
                  'action':e?.shiftKey?'mirror':'clone',
                  'target_webpage_uuid':editorMemory?.cursor?.data?.uuid,
                  'target_webpage_position':'body',
                }).then(res=>{console.log(res.data)})
              }
            },
            ()=>{
              //beforeAfter
              webpageInsertNextTo(structuredClone(editorMemory?.clipBoard?.data), editorMemory?.cursor?.data, editorMemory?.cursor?.position=='after'?1:0)
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
                globleInsertInto(structuredClone(editorMemory?.clipBoard?.data), editorMemory?.cursor?.data?.parent_relation_uuid, -1, 0)
                user_r_action_to_element({
                  'parent_relation_uuid':editorMemory?.clipBoard?.data?.parent_relation_uuid, 
                  'action':e?.shiftKey?'mirror':'clone',
                  'target_webpage_uuid':null, 
                  'target_element_relation_uuid':editorMemory?.cursor?.data?.parent_relation_uuid, 
                  'target_relative_position':'in'
                }).then(res=>{console.log(res.data)})
              }else{
                globleInsertNextTo(structuredClone(editorMemory?.clipBoard?.data), editorMemory?.cursor?.data?.parent_relation_uuid, editorMemory?.cursor?.position=='after'?1:0)
                user_r_action_to_element({
                  'parent_relation_uuid':editorMemory?.clipBoard?.data?.parent_relation_uuid, 
                  'action':e?.shiftKey?'mirror':'clone',
                  'target_webpage_uuid':null, 
                  'target_element_relation_uuid':editorMemory?.cursor?.data?.parent_relation_uuid, 
                  'target_relative_position':editorMemory?.cursor?.position
                }).then(res=>{console.log(res.data)})
              }
            },
            ()=>{},
            ()=>{
              globleInsertNextTo(structuredClone(editorMemory?.clipBoard?.data), editorMemory?.cursor?.data?.parent_relation_uuid, editorMemory?.cursor?.position=='after'?1:0)
              user_r_action_to_element({
                  'parent_relation_uuid':editorMemory?.clipBoard?.data?.parent_relation_uuid, 
                  'action':e?.shiftKey?'mirror':'clone',
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
    editorMemory?.selectedTool,
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
    return params?.page_name ? (website?.webpages||[]).find(wp=>wp.name==params?.page_name) : website?.webpages?.[0]
  }, [params?.page_name, website?.webpages]);

  return (
    <Fragment>
      {/* {!sideMenuActive&&
      <button className={style.show_side_menu_button} onClick={()=>{setSideMenuActive(true)}}>
        <div><FontAwesomeIcon icon={faChevronRight} /></div>
      </button>
      } */}

      <EditorSideMenu website={website} actions={actions} hideElementDict={hideElementDict} expandWebpageDict={expandWebpageDict} expandWebpageDictToggle={expandWebpageDictToggle} expandElementDict={expandElementDict} expandElementDictToggle={expandElementDictToggle}/>
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


      < WebpageCSR website={website} webpage={selectedWebpage} mode='dev' hideElementDict={hideElementDict} actions={actions} routingTable={routingTable} now={Date.now()}/>

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
