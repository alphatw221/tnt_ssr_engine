
import React, { Fragment, useState, useEffect ,lazy } from "react";
import clsx from "clsx";
// import style from './TimeoutEventsForm.module.scss'


import Button from 'react-bootstrap/Button';

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
// import cogoToast from 'cogo-toast';

// import html2canvas from 'html2canvas';
// import {setWebsiteEditorSlice} from '../../redux/slices/website-editor-slice'
// import Spinner from 'react-bootstrap/Spinner';


const PresentEventForm=({event, setEvent, removeEvent})=>{



    // const [converting, setConverting]=useState(false)
    // const [categoryName, setCategoryName]=useState('')
    // const [Name, setName]=useState('')

    // const dispatch = useAppDispatch()
    // const settings = {
    //     'add_css':[
    //         // {"key": "add_css_timeout", "name": "新增樣式表時間(n秒後)", "type": "input",  "inputType": "number"}, 
    //         {"key": "css", "name": "樣式表", "type": "textarea"}, 
    //     ],
    //     'remove_css':[
    //         // {"key": "remove_css_timeout", "name": "移除樣式表時間(n秒後)", "type":"input",  "inputType": "number"},
    //         {"key": "target_event_name", "name": "目標事件名稱", "type": "input",  "inputType": "text"}, 
    //     ],
    //     // 'emit_event':[
    //     //     {"key": "emit_event_name", "name": "觸發事件名稱", "type": "input",  "inputType": "text"}, 
    //     // ],
    //     // 'end_listen':[
    //     //     {"key": "end_listen_event_name", "name": "結束監聽事件名稱", "type": "input",  "inputType": "text"}, 
    //     // ],

    // }
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
                    {"key": "trigger_event_name", "name": "觸發事件名稱", "type": "input",  "inputType": "text"}, 

                    {"key": `trigger_position`, "name": `觸發位置`, "type": "select",  
                        "options": [ 

                            {"name": "頂部", "value": "top"}, 
                            {"name": "置中", "value": "middle"},
                            {"name": "底部", "value": "bottom"},

                        ], "name_key": "name", "value_key": "value"}, 
                    
                    
                    {"key": `motion`, "name": `顯示動態`, "type": "select",  
                    "options": [ 

                        {"name": "向上滑動", "value": "scroll_up"},
                        {"name": "向下滑動", "value": "scroll_down"},
                        {"name": "滑動經過", "value": "scroll_pass"},

                    ], "name_key": "name", "value_key": "value"},
                    
                    {"key": "emit_event_once", "name": "單次觸發", "type": "checkbox", "inputType": "checkbox"},


                    {type:'button',action:removeEvent,name:'刪除'},
                  
                  ]} 
                  
                  data={event} setData={setEvent}>            
                </ParameterizeForm>



            </div>
        </Fragment>
    )
}

export default PresentEventForm
;
