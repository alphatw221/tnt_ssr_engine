
import React, { Fragment, useState, useEffect ,lazy } from "react";
import clsx from "clsx";
// import style from './TimeoutEventsForm.module.scss'


import {Button} from 'react-bootstrap';

import ParameterizeForm from "../../parameterize-form/ParameterizeForm";
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


const MouseEventForm=({event, setEvent, removeEvent})=>{



    // const [converting, setConverting]=useState(false)
    // const [categoryName, setCategoryName]=useState('')
    // const [Name, setName]=useState('')


    return(
        <Fragment>
            <div style={{
                display:'flex', 
                flexDirection:'column', 
                justifyContent:'center' ,
                marginTop:'10px', 
                borderColor:'gray', 
                borderWidth:'1px', 
                borderStyle:'solid',
                borderRadius:'5px',
                padding:'10px'
                
            }}>

                <ParameterizeForm  
                  settings={[
                    {"key": "enable", "name": "啟用", "type": "checkbox"}, 
                    {"key": "emit_event_name", "name": "觸發事件名稱", "type": "input",  "inputType": "text"}, 
                    {"key": "param", "name": "事件參數", "type": "input",  "inputType": "text"}, 
                    {"key": "detail", "name": "事件資料", "type": "textarea",  "inputType": "textarea"}, 
                    {type:'button',action:removeEvent,name:'刪除'},
                  
                  ]} 
                  
                  data={event} setData={setEvent}>            
                </ParameterizeForm>



            </div>
        </Fragment>
    )
}

export default MouseEventForm
;
