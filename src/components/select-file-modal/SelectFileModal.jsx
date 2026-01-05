import { Fragment, useState, useEffect, createRef, useRef } from "react";
import PropTypes from "prop-types";

import { Modal } from "react-bootstrap";
import {Tab} from "react-bootstrap";
import {Nav} from "react-bootstrap";
import {Button} from 'react-bootstrap';

import { useDispatch, useSelector } from "react-redux";
import style from './SelectFileModal.module.scss'

import {user_upload_medium, user_list_medium, user_delete_medium} from '@/api/medium'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faX, faTrash, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'

import MyModal from '@/components/modal/MyModal.jsx'


const SelectFileModal = ({ show, onHide, acceptType, filterType, setHoverFile, setSelectFile ,})=>{

  const dispatch = useDispatch();

  const [storeImages,setStoreImages] = useState([])
  const [uploadFile,setUploadFile] = useState(null)
  
  const[previewFile,setPreviewFile] = useState(null)
  const [fileType, setFileType] = useState(null)

  const [selectedFile, _setSelectedFile] = useState(null)
  const fileInputRef = createRef()

  const pageSize =25;
  const[page,setPage] = useState(1)
  const [gotNext, setGotNext] = useState(true)
  const [fetching, setFetching] = useState(false)

  const getMoreMedia = (page)=>{
    setFetching(true)
    user_list_medium(filterType, page, pageSize).then(res=>{
      setGotNext(res?.data?.next||null)
      setStoreImages([ ...storeImages, ...(res.data?.results||[]) ])
      setFetching(false)
    })
  }

  useEffect(()=>{
    if(!show) return
    user_list_medium(filterType, 1, pageSize).then(res=>{
      setPage(1)
      setGotNext(res?.data?.next||null)
      setStoreImages(res.data?.results||[])
    })
  },[show])


  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      const file = e.target?.files?.[0]

      setUploadFile(file);
      setFileType(file.type)
      const fileURL = URL.createObjectURL(e.target.files[0]);
      setPreviewFile(fileURL)


    }
  };

  const removeUploadFile = ()=>{
    setUploadFile(null)
    setPreviewFile(null)
  }

  const removeStoreImage = (medium)=>{
    setStoreImages(storeImages.filter(_medium=>_medium.uuid!=medium.uuid))
    user_delete_medium(medium?.uuid).then(res=>{
      console.log(res.data)
    })
  }


  const upload = ()=>{
    const data = new FormData()
    data.set('file', uploadFile) 
    user_upload_medium(data).then(res=>{
      setSelectFile(res.data.file)
      onHide()
    })
  }

  return (
    <MyModal isOpen={show} onClose={onHide} title='上傳媒體' placement='center'>
      <div className={style['modal-body']}>




         <div className={style['upload-file-tab']}>

          {
            previewFile 
            ?
            <div className={style['preview-container']}>

              {
                (fileType||'')?.startsWith('image/')?
                <img src={previewFile} className={style['preview-image']}/>
                :
                (fileType||'')?.startsWith('video/')?
                <video className={style['preview-image']} autoplay loop muted>
                  <source src={previewFile} type={fileType}/>
                </video>
                :
                <div style={{textAlign:'center'}}>{uploadFile?.name}</div>

              }

              {/* <FontAwesomeIcon className={style['remove_image_icon']} icon={faX} onClick={()=>{removeUploadFile()}} /> */}
              <div className={style['actions-container']}>
                <button  className={style['remove-button']}  onClick={()=>{removeUploadFile()}}>移除</button>
                <button  className={style['upload-button']}  onClick={()=>{upload()}}>確定</button>
              </div>
              

            </div>
            :
            <div className={style['file-upload']}>
                <span className={style['file-upload-btn']}>📂 選擇檔案</span>
                <input type={"file"} ref={fileInputRef} accept={acceptType} onChange={handleFileChange}/>
            </div>
          }


          

        </div>
      </div>



      {/* 
        <Tab.Container defaultActiveKey="uploadFile">
            <Nav
                variant="pills"
                className="product-tab-list text-center"
            >
                <Nav.Item>
                <Nav.Link eventKey="uploadFile">
                    <h4>上傳檔案</h4>
                </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link eventKey="storeFile">
                    <h4>我的檔案</h4>
                </Nav.Link>
                </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="uploadFile">
              <div className={style.upload_file_tab}>

                {
                  previewFile 
                  ?
                  <div className={style['preview-container']}>

                    {
                      (fileType||'')?.startsWith('image/')?
                      <img src={previewFile} className={style['preview-image']}/>
                      :
                      (fileType||'')?.startsWith('video/')?
                      <video className={style['preview-image']} autoplay loop muted>
                        <source src={previewFile} type={fileType}/>
                      </video>
                      :
                      <div style={{textAlign:'center'}}>{uploadFile?.name}</div>

                    }

                    <FontAwesomeIcon className={style.remove_image_icon} icon={faX} onClick={()=>{removeUploadFile()}} />


                    <Button variant="secondary" style={{marginTop:'20px'}} onClick={()=>{upload()}}>確定</Button>

                  </div>
                  :
                  <input ref={fileInputRef} type={"file"} accept={acceptType} onChange={handleFileChange} 

                  />
                }


                

              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="storeFile">
              <div className={style?.['store_files_tab']}>
                <div className={style?.['store_files_grid']}>
                  {
                  (storeImages||[])
                  .map((medium, index)=>(
                    <div key={index} className={style['store_files_container']}>


                      {
                      medium?.type?.startsWith('image/')?
                        <img src={medium.file} className={style['store_file']} 
                        onClick={()=>{

                          _setSelectedFile(medium.file)
                          setSelectFile(medium.file)
                          
                          }}/>
                          :
                          medium?.type?.startsWith('video/')?
                          <video controls className={style['store_file']}
                             onClick={()=>{

                              _setSelectedFile(medium.file)
                              setSelectFile(medium.file)

                              }}>
                                <source src={medium.file}></source>
                          </video>
                          :
                          <div 
                            className={style['store_file']} 
                            style={{flex:'row', justifyContent:'center', justifyItems:'center', alignContent:'center',alignItems:'center'}}
                            onClick={()=>{

                              _setSelectedFile(medium.file)
                              setSelectFile(medium.file)

                              }}
                            >
                            <p style={{textAlign:'center'}}>{medium.file?.split('/')?.[medium.file?.split('/').length-1]}</p>
                          </div>
                        }
                        <FontAwesomeIcon 
                                    className={style['remove_icon']} 
                                    icon={faTrash} 
                                    onClick={()=>{removeStoreImage(medium)}}
                                    />
                    </div>
                  ))}
                </div>

                {
                  gotNext
                  &&
                  !fetching
                  &&
                  <div className={style['get-more-icon-container']} 
>
                     <FontAwesomeIcon 
                    className={style['get-more-icon']} 
                    icon={faEllipsisVertical} 
                    onClick={()=>{
                      getMoreMedia(page+1)
                      setPage(page+1)
                    }}
                    />
                  </div>
                 
                }
              </div>
            </Tab.Pane>
       
          </Tab.Content>
        </Tab.Container> */}
    </MyModal>
    



        

  );
}



export default SelectFileModal;
