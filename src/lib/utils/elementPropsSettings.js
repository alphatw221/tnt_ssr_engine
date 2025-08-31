const shareSettings = [
    {"type":"accordion",  "key":`expand_props_accordion`, "name":'屬性', "accordion_items":[
         {"key": "class", "name": "類別", "type": "input",  "inputType": "text"  }, 
    ]},
]       


export function getElementPropsSettingsA(element){


    return [
        {"type":"accordion",  "key":`expand_props_accordion`, "name":'屬性', "accordion_items":[
            {"key": "class", "name": "類別", "type": "textarea",  "inputType": "text"  }, 
        ]},
    ]       
    
   
    
}

export function getElementPropsSettingsB(element){
    if(element?.type){
        return []
    }else{
        switch(element?.tag_name){
            case 'img':
                return [
                    {"type":"accordion",  "key":`expand_image_accordion`, "name":'圖片', "accordion_items":[
                        {'key': `src`, "name": `圖片`, "type": "image"},
                    ]},
                ]
            case 'video':
                return [
                    {"type":"accordion",  "key":`expand_video_accordion`, "name":'影片', "accordion_items":[
                        {'key': `src`, "name": `影片`, "type": "video"},
                    ]},
                ]
            case 'a':
                return [
                    {"type":"accordion",  "key":`expand_hyper_link_accordion`, "name":'超連結', "accordion_items":[
                        {"key": "href", "name": "超連結", "type": "input",  "inputType": "text"}, 
                    ]},
                ]
            default:
                return []
        }
    }
   
    
}










