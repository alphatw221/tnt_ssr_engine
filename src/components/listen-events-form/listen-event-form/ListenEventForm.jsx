
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


const ListenEventForm=({event, setEvent, removeEvent})=>{



    // const [converting, setConverting]=useState(false)
    // const [categoryName, setCategoryName]=useState('')
    // const [Name, setName]=useState('')

    // const dispatch = useAppDispatch()

    const action_type_options = [ 

        {"name": "加入CSS", "value": "add_css"}, 
        {"name": "移除CSS", "value": "remove_css"},
        {"name": "切換CSS", "value": "toggle_css"},
        // {"name": "觸發事件", "value": "emit_event"},
        // {"name": "結束監聽", "value": "end_listen"},

        {"name": "加入類別", "value": "add_classes"}, 
        {"name": "移除類別", "value": "remove_classes"},
        {"name": "切換類別", "value": "toggle_classes"},

        {"name": "監聽鼠標", "value": "listen_cursor"},
        {"name": "取消監聽鼠標", "value": "remove_cursor_listener"},

        {"name": "監聽滾輪", "value": "listen_scroll"},
        {"name": "取消監聽滾輪", "value": "remove_scroll_listener"},

    ]
    const settings = {
        'add_css':[
            {"key": "delay", "name": "延遲時間(n秒後)", "type": "input",  "inputType": "number"}, 
            {"key": "css", "name": "樣式表", "type": "textarea"}, 
        ],
        'remove_css':[
            // {"key": "remove_css_timeout", "name": "移除樣式表時間(n秒後)", "type":"input",  "inputType": "number"},
            {"key": "delay", "name": "延遲時間(n秒後)", "type": "input",  "inputType": "number"}, 
            {"key": "target_event_name", "name": "目標事件名稱", "type": "input",  "inputType": "text"}, 
        ],
        'toggle_css':[
            {"key": "delay", "name": "延遲時間(n秒後)", "type": "input",  "inputType": "number"}, 
            {"key": "css", "name": "樣式表", "type": "textarea"}, 
        ],

        'add_classes':[
            {"key": "delay", "name": "延遲時間(n秒後)", "type": "input",  "inputType": "number"}, 
            {"key": "class_names", "name": "類別名稱(,隔開)", "type": "input",  "inputType": "text"}, 
        ],

        'remove_classes':[
            {"key": "delay", "name": "延遲時間(n秒後)", "type": "input",  "inputType": "number"}, 
            {"key": "class_names", "name": "類別名稱(,隔開)", "type": "input",  "inputType": "text"}, 
        ],

        'toggle_classes':[
            {"key": "delay", "name": "延遲時間(n秒後)", "type": "input",  "inputType": "number"}, 
            {"key": "class_names", "name": "類別名稱(,隔開)", "type": "input",  "inputType": "text"}, 
        ],



        // 'emit_event':[
        //     {"key": "emit_event_name", "name": "觸發事件名稱", "type": "input",  "inputType": "text"}, 
        // ],
        // 'end_listen':[
        //     {"key": "end_listen_event_name", "name": "結束監聽事件名稱", "type": "input",  "inputType": "text"}, 
        // ],

    }



    const unmatch_settings = {
        'add_css':[
            {"key": "unmatch_delay", "name": "延遲時間(n秒後)", "type": "input",  "inputType": "number"}, 
            {"key": "unmatch_css", "name": "樣式表", "type": "textarea"}, 
        ],
        'remove_css':[
            // {"key": "remove_css_timeout", "name": "移除樣式表時間(n秒後)", "type":"input",  "inputType": "number"},
            {"key": "unmatch_delay", "name": "延遲時間(n秒後)", "type": "input",  "inputType": "number"}, 
            {"key": "unmatch_target_event_name", "name": "目標事件名稱", "type": "input",  "inputType": "text"}, 
        ],
        'toggle_css':[
            {"key": "unmatch_delay", "name": "延遲時間(n秒後)", "type": "input",  "inputType": "number"}, 
            {"key": "unmatch_css", "name": "樣式表", "type": "textarea"}, 
        ],

        'add_classes':[
            {"key": "unmatch_delay", "name": "延遲時間(n秒後)", "type": "input",  "inputType": "number"}, 
            {"key": "unmatch_class_names", "name": "類別名稱(,隔開)", "type": "input",  "inputType": "text"}, 
        ],

        'remove_classes':[
            {"key": "unmatch_delay", "name": "延遲時間(n秒後)", "type": "input",  "inputType": "number"}, 
            {"key": "unmatch_class_names", "name": "類別名稱(,隔開)", "type": "input",  "inputType": "text"}, 
        ],

        'toggle_classes':[
            {"key": "unmatch_delay", "name": "延遲時間(n秒後)", "type": "input",  "inputType": "number"}, 
            {"key": "unmatch_class_names", "name": "類別名稱(,隔開)", "type": "input",  "inputType": "text"}, 
        ],

    }



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
                    {"key": "listen_event_name", "name": "監聽事件名稱", "type": "input",  "inputType": "text"}, 
                    {"key": "param", "name": "對應參數", "type": "input",  "inputType": "text"}, 
                    {"key": `action_type`, "name": `觸發動作`, "type": "select",  
                        "options": action_type_options, "name_key": "name", "value_key": "value"}, 
                    ...(settings?.[event?.action_type]||[]),

                    //unmatch param action
                    ![null, undefined, ''].includes(event?.param)?{"key": `unmatch_action_type`, "name": `非對應參數觸發動作`, "type": "select",  
                        "options": action_type_options, "name_key": "name", "value_key": "value"}:{}, 
                    ...(![null, undefined, ''].includes(event?.param)?(unmatch_settings?.[event?.unmatch_action_type]||[]):[]),



                    {type:'button',action:removeEvent,name:'刪除'},
                  
                  ]} 
                  
                  data={event} setData={setEvent}>            
                </ParameterizeForm>



            </div>
        </Fragment>
    )
}

export default ListenEventForm
;
