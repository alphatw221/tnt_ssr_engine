import { Fragment, useState, useEffect, createRef } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { useDispatch, useSelector } from "react-redux";
import style from './SelectIconModal.module.scss'
import {user_upload_image, user_list_image} from '../../api/image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faX } from '@fortawesome/free-solid-svg-icons'
import clsx from "clsx";
import {solid, regular, brands} from '../../lib/utils/fontAwesomeIconNames.js'

const IconSelectGrid = ({iconType, iconNames, setHoverIconName, setSelectIconName})=>{

  const [selectedIconName, setSelectedIconName] = useState(null)

  return (
  <div className={style.modal_body}>

    {/* <div className={style.search_bar}>
      <input type="text" placeholder="搜尋Icon" value={iconKeyword} onChange={(e)=>{setIconKeyword(e.target.value)}}/>
      <button onClick={()=>{

      }}>搜尋</button>

    </div> */}


    <div className={style.icon_grid}>
      {(iconNames||[]).map((iconName, index)=>(
        <div key={index} className={style.icon_container}>


          <i className={clsx(`fa-${iconName}`,`fa-${iconType}`)} 
            style={{borderColor:`fa-${iconName} fa-${iconType}`==selectedIconName?'red':''}}
            onMouseEnter={()=>{
              setHoverIconName(`fa-${iconName} fa-${iconType}`)
            }} 
            onMouseLeave={()=>{
              setHoverIconName(selectedIconName)
            
            }} 
            onClick={()=>{

              setSelectedIconName(`fa-${iconName} fa-${iconType}`)
              setSelectIconName(`fa-${iconName} fa-${iconType}`)
              
              }}/>
        </div>
      ))}
    </div>
  </div>
  )
}



const SelectIconModal = ({ show, onHide, setHoverIconName, setSelectIconName })=>{

  const dispatch = useDispatch();


  const [iconNames, setIconNames] = useState([])
  const [selectedIconName, _setSelectedIconName] = useState(null)

  const [iconKeyword, setIconKeyword] = useState('')
  // useEffect(()=>{
  //   if(!show) return
  //   // user_list_image().then(res=>{
  //   //   setStoreImages(res.data)
  //   // })
  // },[show])


  return (
    <Modal show={show} onHide={onHide} className={style.modal} >
    <Modal.Header closeButton >
        <div className={style.title_block}>
          <h3 >選擇圖標</h3>
        </div>

    </Modal.Header>



    <Tab.Container defaultActiveKey="solid">
            <Nav
                variant="pills"
                className="product-tab-list text-center"
            >
                <Nav.Item>
                <Nav.Link eventKey="solid">
                    <h4>填滿</h4>
                </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link eventKey="regular">
                    <h4>一般</h4>
                </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link eventKey="brands">
                    <h4>品牌</h4>
                </Nav.Link>
                </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="solid">
              <IconSelectGrid iconType='solid' iconNames={solid} setHoverIconName={setHoverIconName} setSelectIconName={setSelectIconName}/>
            </Tab.Pane>
            <Tab.Pane eventKey="regular">
              <IconSelectGrid iconType='regular' iconNames={regular} setHoverIconName={setHoverIconName} setSelectIconName={setSelectIconName}/>

            </Tab.Pane>
            <Tab.Pane eventKey="brands">
              <IconSelectGrid iconType='brands' iconNames={brands} setHoverIconName={setHoverIconName} setSelectIconName={setSelectIconName}/>

            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>





  </Modal>
  );
}

SelectIconModal.propTypes = {
  onHide: PropTypes.func,
  show: PropTypes.bool,
  setHoverIconName: PropTypes.func, 
  setSelectIconName: PropTypes.func,
};

export default SelectIconModal;
