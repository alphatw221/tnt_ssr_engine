
import React, { Fragment, useState, useEffect ,lazy } from "react";
import clsx from "clsx";
// import style from './TimeoutEventsForm.module.scss'


import Button from 'react-bootstrap/Button';

import ParameterizeForm from "../../parameterize-form/ParameterizeForm";



const CustomizeTagForm=({event, setEvent, removeEvent})=>{





    const tag_position_options = [ 
        {"name": "Head", "value": "head"}, 
        {"name": "Body", "value": "body"},
    ]

    const tag_name_options = [ 
        {"name": "script", "value": "script"}, 
        {"name": "link", "value": "link"},
        {"name": "noscript", "value": "noscript"},
    ]



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
                    {"key": "enable", "name": "啟用", "type": "checkbox", "inputType": "checkbox"}, 
                    {"key": "name", "name": "名稱", "type": "input",  "inputType": "text"  }, 
                    {"key": `tag_position`, "name": `植入位置`, "type": "select",  
                        "options": tag_position_options, "name_key": "name", "value_key": "value"}, 
                    {"key": `tag_name`, "name": `標籤名稱`, "type": "select",  
                        "options": tag_name_options, "name_key": "name", "value_key": "value"}, 
                    {"key": "attributes", "name": "屬性({JSON字串})", "type": "input",  "inputType": "text"  }, 
                    {"key": "content", "name": "內容", "type": "textarea"  }, 

                    {type:'button',action:removeEvent,name:'刪除'},

                  ]} 
                  
                  data={event} setData={setEvent}>            
                </ParameterizeForm>



            </div>
        </Fragment>
    )
}

export default CustomizeTagForm
;
