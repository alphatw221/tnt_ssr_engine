import PropTypes from "prop-types";
import clsx from "clsx";

   
import { useAppDispatch, useAppSelector } from "@/redux/hooks";        
// import { 
//   // setSideMenuActive, 
//   setNodeMenuActive,
//   // setComponentMenuActive, setStoreComponentMenuActive, 
//   // setFragmentMenuActive, setStoreFragmentMenuActive, 
//   // setPageMenuActive, setStorePageMenuActive
// } from "../../redux/slices/website-editor-slice"

import style from "./EditorSideMenu.module.scss"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faChevronLeft, faChevronRight, faBars, faGear, faFolder, faBook } from '@fortawesome/free-solid-svg-icons'
import React, { Fragment, useState, useEffect } from "react";

// import PageMenu from './page-menu/PageMenu'
// import Button from 'react-bootstrap/Button';


// import NodeMenu from '@/components/editor-side-menu/node-menu/NodeMenu'
import WebsiteCollaboratorList from '@/components/website-collaborator-list/WebsiteCollaboratorList'
import EditorToolBar from '@/components/editor-tool-bar/EditorToolBar'

// import { dragItemTypes} from '@/lib/dragItems'

// import NodeTemplateMenu2 from '@/components/node-template-menu/NodeTemplateMenu2'
import ElementTemplateMenu from '@/components/element-template-menu/ElementTemplateMenu'

import {user_update_store_settings} from '@/api/estore.js'
import { user_update_website } from '@/api/website.js'
import {getCompnentSettings} from '@/lib/utils/componentSettings.js'

import MyModal from '@/components/modal/MyModal.jsx'
// import Offcanvas from 'react-bootstrap/Offcanvas';
import ParameterizeForm from "@/components/parameterize-form/ParameterizeForm.jsx";
// import EventsForm from '@/components/listen-events-form/EventsForm'
// import CustomizeTagForm from '@/components/listen-events-form/listen-event-form/CustomizeTagForm.jsx'
import WebpageMenu from "@/components/webpage-menu/WebpageMenu";

import FileBrowser from "@/components/file-browser/FileBrowser.jsx"

import { EditEventList } from '@/components/edit-event-list';
import { user_list_website_events } from '@/api/website_edit_event';

const EditorSideMenu = ({ website, actions, ...props}) => {
  



 



  // const websiteEditorState = useAppSelector((state) => state.website_editor);
  // const dispatch = useAppDispatch();
  
  const [showWebsiteSettings, setShowWebsiteSettings] = useState(false)
  const [showFileBrowser, setShowFileBrowser] = useState(false)
  const [showWebsiteEditEvents, setShowWebsiteEditEvents] = useState(false)

  const [active, setActive] = useState(false)

  const [nodeMenuActive, setNodeMenuActive] = useState(false)
  const [position, setPosition] = useState(localStorage?.getItem('side_menu_position')||'position-left')
  const [hoverPosition, setHoverPosition] = useState('hover-bottom')
  const [showDashLine, setShowDashLine] = useState(false)

  const settings = getCompnentSettings('website')




  const updateWebsiteData = (data)=>{


    actions?.updateWebsiteSettings(data)
    user_update_website({
      'data':{
        'data':data
      }
    }).then(res=>{
      console.log(res.data)
    }).catch(err=>{
      console.log(res.data)
    })

  }



  return (

    <Fragment>

      {/* ACTIVE BUTTON */}
      {!active&&
        <button className={clsx(style['side-menu-active-button'],style[position])} onClick={()=>{setActive(true)}}>
          <div>
            <FontAwesomeIcon icon={faChevronRight}/>
          </div>
        </button>
      }

      {/* ROOT NODE TEMPLATE MENU */}
      <ElementTemplateMenu 
        position={position} 
        query={{}} 
        active={nodeMenuActive} 
        setActive={setNodeMenuActive} 
        selectTemplate={null} 
        actions={actions}/>


      {/* DASH LINE  */}
      {/* <div className={clsx(style['dash-line'], showDashLine ? style['show'] : "", style[hoverPosition])}></div> */}
      
      {/* SIDE MENU */}
      <div className={clsx(style['editor-side-menu'], active ? style['active'] : "", style[position])}>

        {/* DRAG BAR */}
        {/* <div className={clsx(style['drag-bar'], style[position])}>
          <div   >
            <FontAwesomeIcon icon={faBars}/>
          </div>
        </div> */}
        
        {/* CLOSE SIDE MENU BUTTON */}
        <button className={clsx(style['close-side-menu-button'],style[position])} onClick={() => setActive(false)}>
          <FontAwesomeIcon icon={faChevronLeft}/>
        </button>
        



        <WebsiteCollaboratorList/>
        <div className={style['bar']}>
          <EditorToolBar/>

          <div className={style['file-browser-button']} onClick={()=>{setShowFileBrowser(true)}}>
            <FontAwesomeIcon icon={faFolder}/>
            <div className={style['tooltip']} >檔案素材</div>
          </div>

          <div className={style['bar-button']} onClick={()=>{setShowWebsiteSettings(true)}}>
            <FontAwesomeIcon icon={faGear}/>
            <div className={style['tooltip']} >網站設定</div>
          </div>
          
          <div className={style['bar-button']} onClick={()=>{setShowWebsiteEditEvents(true)}}>
            <FontAwesomeIcon icon={faBook}/>
            <div className={style['tooltip']} >編輯記錄</div>
          </div>

        </div>
        
          


        {/* SCROLLABLE AREA */}
        <div className={clsx(style['scrollable-area'], style[position])}>
          
     


          <WebpageMenu webpages={website.webpages} actions={actions} {...props}/>
          {/* <NodeMenu position={position} hierarchy={[]} query={{'type':'section'}} title={'頁首'} targetWebsiteNode={'header'} nodes={website?.header_nodes||[]} actions={actions} update={updateHeaderNode} remove={removeHeaderNode} move={moveHeaderNode} hideNodeDict={hideNodeDict}/>
          <NodeMenu position={position} hierarchy={[]} query={{'type':'section'}} title={'頁尾'} targetWebsiteNode={'footer'} nodes={website?.footer_nodes||[]} actions={actions} update={updateFooterNode} remove={removeFooterNode} move={moveFooterNode} hideNodeDict={hideNodeDict}/>
          <NodeMenu position={position} hierarchy={[]} query={{'type':'webpage'}} title={'頁面'} targetWebsiteNode={'webpage'} nodes={website?.webpage_nodes||[]} actions={actions} update={updateWebpageNode} remove={removeWebpageNode} move={moveWebpageNode} hideNodeDict={hideNodeDict}/> */}
        </div>
       
        {/* <div className={clsx(style['tool-bar'], style[position])}>

        </div> */}
      </div>






    {/* <Offcanvas show={showWebsiteSettings} onHide={()=>{setShowWebsiteSettings(false)}} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>網站設定</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ParameterizeForm  
          identifier={website?.uuid}
          settings={[
            ...settings,

            {"type":"accordion", "key":"customize_tags", "name":'植入代碼', "accordion_items":[
              {type:'slot', slot:EventsForm, props:{'instance':website, 'updateData':updateWebsiteData, 'title':'代碼', 'prop_key':'customize_tags', 'EventFormComponent':CustomizeTagForm}},
            ]},
          ]} 
          data={website?.data} setData={updateWebsiteData}>            
        </ParameterizeForm>         
      </Offcanvas.Body>
    </Offcanvas> */}


      
      <MyModal isOpen={showFileBrowser} onClose={setShowFileBrowser} title='檔案管理' placement='center-lg'>
        <FileBrowser actions={actions}/>
      </MyModal>


      <MyModal isOpen={showWebsiteEditEvents} onClose={setShowWebsiteEditEvents} title='編輯記錄' placement='right'>
         <EditEventList
          fetchEventsApi={user_list_website_events}
          pageSize={20}
        />
      </MyModal>

      <MyModal isOpen={showWebsiteSettings} onClose={setShowWebsiteSettings} title='網站設定' placement='right'>
         <ParameterizeForm  
            identifier={website?.uuid}
            settings={[
              ...settings,
            ]} 
            data={website?.data} 
            setData={updateWebsiteData}>            
        </ParameterizeForm>  
      </MyModal>

    </Fragment>
    
  );

};

EditorSideMenu.propTypes = {
  // website: PropTypes.object,
  // actions: PropTypes.object
  
};

export default EditorSideMenu;
