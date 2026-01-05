
import React, { Fragment, useState, useEffect ,lazy } from "react";
import clsx from "clsx";
import style from './InstanceCreateForm.module.scss'


import {Button} from 'react-bootstrap';
import { useAppDispatch } from "@/redux/hooks";
import { create_customized_component } from '../../api/component'
import { create_customized_fragment } from '../../api/fragment'
import { create_customized_webpage } from '../../api/webpage'
import { 
    setStoreCategorizedComponents,
    setStoreCategorizedFragments,
    setStoreCategorizedPages

} from "@/redux/slices/website-editor-slice";
import cogoToast from 'cogo-toast';

import html2canvas from 'html2canvas';
import {setWebsiteEditorSlice} from '../../redux/slices/website-editor-slice'
import {Spinner} from 'react-bootstrap';


const InstanceCreateForm=({instance, type})=>{
    const [converting, setConverting]=useState(false)
    const [categoryName, setCategoryName]=useState('')
    const [Name, setName]=useState('')

    const dispatch = useAppDispatch()

    return(
        <Fragment>
            <div style={{
                display:'flex', 
                flexDirection:'column', 
                justifyContent:'center' ,
                marginTop:'20px', 
                marginBottom:'20px',
                borderColor:'gray', 
                borderWidth:'1px', 
                borderStyle:'solid',
                borderRadius:'5px',
                padding:'10px'
                
            }}>

                {/* <div style={{display:'flex', flexDirection:'row', justifyContent:'center' , alignContent:'center', marginTop:'10px'}}> */}
                    <label style={{fontSize:'15px', fontWeight:'400', color:'gray'}}>類別名稱 :</label>
                    <input type='text' 
                    style={{ paddingLeft:"20px", paddingRight:"20px"}}
                    value={categoryName} onChange={(e)=>{setCategoryName(e.target.value)}}/>
                {/* </div> */}

                    <label style={{fontSize:'15px', fontWeight:'400', color:'gray'}}>物件名稱 :</label>
                    <input type='text' 
                    style={{ paddingLeft:"20px", paddingRight:"20px"}}
                    value={Name} onChange={(e)=>{setName(e.target.value)}}/>

                <div style={{display:'flex', flexDirection:'row', justifyContent:'center' ,marginTop:'10px'}}>

                    {
                        converting 
                        ?
                        <Spinner animation="border" variant="secondary" />
                        :
                        <Button 
                            variant="secondary"
                            onClick={()=>{
                            
                                setConverting(true)

                                if(type=='component'){
                                    dispatch(setWebsiteEditorSlice({simulateComponent: instance}))
                                    setTimeout(()=>{
                                        const ele = document.getElementById('component_simulator')
                                        html2canvas(ele).then((canvas)=>{
                                            canvas.toBlob((blob)=>{
                                                let file = new File([blob], 'component.jpg', {type:'image/jpeg'})
                                                create_customized_component(instance, categoryName, Name , file).then(res=>{
            
                                                    dispatch(setStoreCategorizedComponents(res?.data||[]))
                                                    cogoToast.success("新增成功", {position: "top-right"});
                                                    setConverting(false)
            
                                                })
                                            })
                                        })

                                    },10)
                                }
                                else if (type=='fragment'){
                                    dispatch(setWebsiteEditorSlice({simulateFragment: instance}))
                                    setTimeout(()=>{
                                        const ele = document.getElementById('fragment_simulator')
                                        html2canvas(ele).then((canvas)=>{
                                            canvas.toBlob((blob)=>{
                                                let file = new File([blob], 'fragment.jpg', {type:'image/jpeg'})


                                                create_customized_fragment(instance, categoryName, Name, file).then(res=>{
                                                    dispatch(setStoreCategorizedFragments(res?.data||[]))
                                                    cogoToast.success("新增成功", {position: "top-right"});
                                                    setConverting(false)
    
                                                })
                                            })
                                        })

                                    },5000)

                                }else if (type=='webpage'){
                                    dispatch(setWebsiteEditorSlice({simulateWebpage: instance}))
                                    setTimeout(()=>{
                                        const ele = document.getElementById('webpage_simulator')
                                        html2canvas(ele).then((canvas)=>{
                                            canvas.toBlob((blob)=>{
                                                let file = new File([blob], 'webpage.jpg', {type:'image/jpeg'})

                                                create_customized_webpage(instance, categoryName, Name, file).then(res=>{
                                                    dispatch(setStoreCategorizedPages(res?.data||[]))
                                                    cogoToast.success("新增成功", {position: "top-right"});
                                                    setConverting(false)
    
                                                })
                                                
                                            })
                                        })

                                    },5000)
                                }

                                // html2canvas(instanceRef?.current).then((canvas)=>{
                                //     console.log(canvas)
                                //     // document.body.appendChild(canvas);
                                //     canvas.toBlob((blob)=>{
                                //         let file = new File([blob], 'component.jpg', {type:'image/jpeg'})

                                //         if(type=='component'){
                                //             create_customized_component(instance, categoryName, Name , file).then(res=>{

                                //                 dispatch(setStoreCategorizedComponents(res?.data||[]))
                                //                 cogoToast.success("新增成功", {position: "top-right"});
                                //                 setConverting(false)


                                //             })
                                //         }else if (type=='fragment'){
                                //             create_customized_fragment(instance, categoryName, Name, file).then(res=>{
                                //                 dispatch(setStoreCategorizedFragments(res?.data||[]))
                                //                 cogoToast.success("新增成功", {position: "top-right"});
                                //                 setConverting(false)

                                //             })
                                //         }else if (type=='page'){
                                //             create_customized_webpage(instance, categoryName, Name, file).then(res=>{
                                //                 dispatch(setStoreCategorizedPages(res?.data||[]))
                                //                 cogoToast.success("新增成功", {position: "top-right"});
                                //                 setConverting(false)

                                //             })
                                //         }





                                //     },'image/jpeg')
                                // })
                            
                        
                        }}>儲存物件</Button>
                    }
                </div>
                
            </div>
        </Fragment>
    )
}

export default InstanceCreateForm;
