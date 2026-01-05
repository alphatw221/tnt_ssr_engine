
import React, { Fragment, useState, useEffect ,lazy } from "react";
import clsx from "clsx";
// import style from './TimeoutEventsForm.module.scss'


import {Button} from 'react-bootstrap';
// import { useAppDispatch } from "@/redux/hooks";
// import { create_customized_component } from '../../api/component'
// import { create_customized_fragment } from '../../api/fragment'
// import { create_customized_webpage } from '../../api/webpage'
// import { 
//     setStoreCategorizedComponents,
//     setStoreCategorizedFragments,
//     setStoreCategorizedPages

// } from "@/redux/slices/website-editor-slice";

// import html2canvas from 'html2canvas';
// import {setWebsiteEditorSlice} from '../../redux/slices/website-editor-slice'


const TimeoutEventForm=({timeoutEvent, setTimeoutEvent, removeTimeoutEvent})=>{
    // const [converting, setConverting]=useState(false)
    // const [categoryName, setCategoryName]=useState('')
    // const [Name, setName]=useState('')

    // const dispatch = useAppDispatch()
    
    return(
        <Fragment>
            <div style={{
                display:'flex', 
                flexDirection:'column', 
                justifyContent:'center' ,
                marginTop:'10px', 
                // marginBottom:'10px',
                borderColor:'gray', 
                borderWidth:'1px', 
                borderStyle:'solid',
                borderRadius:'5px',
                padding:'10px'
                
            }}>

                {
                    // (webpage?.timeout_events||[]).length>0 ?
                    // (webpage?.timeout_events||[]).map((timeoutEvent,key)=>(<div key={key}>
                    //     {key}
                    // </div>))
                    // :
                    // <span className="text-center">
                    //     無設定事件
                    // </span>
                }

                {/* <Button variant="secondary" onClick={(e)=>{
                    updateWebPage({...webpage, timeout_events:[...(webpage?.timeout_events||[]), {timeout:null, emit_event_name:'' }]})
                }}>新增事件</Button> */}
                
                <div style={{display:'flex', flexDirection:'row', justifyContent:'start' , alignContent:'center', marginTop:'10px'}}> 

                    <label style={{fontSize:'15px', fontWeight:'400', color:'gray'}}>啟用:</label>

                    <div>
                        <input
                            type='checkbox'
                            checked={(timeoutEvent?.enable)}
                            value=''
                            onChange={(e)=>{
                                setTimeoutEvent({...timeoutEvent, enable:e.target.checked})    }}                    
                        />
                    </div>
                </div>
                <div style={{display:'flex', flexDirection:'row', justifyContent:'start' , alignContent:'center', marginTop:'10px'}}> 
                    <label style={{fontSize:'15px', fontWeight:'400', color:'gray'}}>事件名稱:</label>
                    <input type='text' 
                    style={{ paddingLeft:"20px", paddingRight:"20px", marginLeft:'auto'}}
                    value={timeoutEvent?.emit_event_name||''} onChange={(e)=>{setTimeoutEvent({...timeoutEvent, emit_event_name:e.target.value})}}/>
                </div> 

                <div style={{display:'flex', flexDirection:'row', justifyContent:'start' , alignContent:'center', marginTop:'10px'}}> 
                    <label style={{fontSize:'15px', fontWeight:'400', color:'gray'}}>觸發時間(ms):</label>
                    <input type='number' 
                    style={{ paddingLeft:"20px", paddingRight:"20px", marginLeft:'auto'}}
                    value={timeoutEvent?.timeout||''} onChange={(e)=>{setTimeoutEvent({...timeoutEvent, timeout:parseInt(e.target.value)})}}/>
                </div> 
                

                <Button 
                    variant="secondary"
                    onClick={()=>{removeTimeoutEvent()}}
                    style={{ marginTop:'10px'}}
                    >
                                刪除
                </Button>

                    {/* <label style={{fontSize:'15px', fontWeight:'400', color:'gray'}}>物件名稱 :</label>
                    <input type='text' 
                    style={{ paddingLeft:"20px", paddingRight:"20px"}}
                    value={Name} onChange={(e)=>{setName(e.target.value)}}/> */}

                {/* <div style={{display:'flex', flexDirection:'row', justifyContent:'center' ,marginTop:'10px'}}>

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
                </div> */}
                
            </div>
        </Fragment>
    )
}

export default TimeoutEventForm
;
