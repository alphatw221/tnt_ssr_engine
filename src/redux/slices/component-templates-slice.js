// const { createSlice } = require('@reduxjs/toolkit');
import { createSlice} from "@reduxjs/toolkit";

const general_settings = {
    'background_color':{key:'background_color', name:'背景顏色', type:'rgba_color', default:{r: '0',g: '0',b: '0',a: '0',}},
    'background_image':{key:'background_image', name:'背景圖片', type:'image'},
    'padding_unit':{key:'padding_unit', name:'填充單位', type:'select', value_key:'value', name_key:'name', options:[{value:'px',name:'px'},{value:'%',name:'%'}], default:'%'},
    'padding_top':{key:'padding_top', name:'頂部填充', type:'input', inputType:'number', default:0},
    'padding_bottom':{key:'padding_bottom', name:'底部填充', type:'input', inputType:'number', default:0},
    'padding_left':{key:'padding_x', name:'水平填充', type:'input', inputType:'number', default:0},
    'padding_right':{key:'padding_x', name:'水平填充', type:'input', inputType:'number', default:0},

    'margin_unit':{key:'padding_unit', name:'填充單位', type:'select', value_key:'value', name_key:'name', options:[{value:'px',name:'px'},{value:'%',name:'%'}], default:'%'},
    'margin_top':{key:'padding_top', name:'頂部邊際', type:'input', inputType:'number', default:0},
    'margin_bottom':{key:'padding_bottom', name:'底部邊際', type:'input', inputType:'number', default:0},
    'margin_left':{key:'margin_left', name:'左側邊際', type:'input', inputType:'number', default:0},
    'margin_right':{key:'margin_right', name:'右側邊際', type:'input', inputType:'number', default:0},
}

const general_fields = {
    background_color:{r: '0',g: '0',b: '0',a: '0',},
    background_image:null,

    padding_unit:'%',
    padding_top:0,
    padding_bottom:0,
    padding_left:0,
    padding_right:0,
    
    margin_unit:'%',
    margin_top:0,
    margin_bottom:0,
    margin_left:0,
    margin_right:0,

}


const componentTemplatesSlice = createSlice({
    name: 'component_templates',
    initialState: {
        
        component_categories:[{key:'general',name:'常用'}],


        component_templates:[
            {
                ...general_fields,
                drag_key:'text_template',
                type:'text_editor',
                name:'文字',
                context:'',
                settings:{
                    ...general_settings,
                },
                categories:['general']
            },
            {
                ...general_fields,
                drag_key:'padding_template',
                type:'padding',
                name:'填充物',
                settings:{
                    ...general_settings,
                },
                categories:['general']
            },
            {
                ...general_fields,
                drag_key:'image_template',
                type:'image',
                name:'圖片',
                image:null,
                settings:{
                    'background_color':{key:'background_color', name:'背景顏色', type:'rgba_color', default:{r: '0',g: '0',b: '0',a: '0',}},
                    'padding_unit':{key:'padding_unit', name:'填充單位', type:'select', value_key:'value', name_key:'name', options:[{value:'px',name:'px'},{value:'%',name:'%'}], default:'%'},
                    'padding_top':{key:'padding_top', name:'頂部填充', type:'input', inputType:'number', default:0},
                    'padding_bottom':{key:'padding_bottom', name:'底部填充', type:'input', inputType:'number', default:0},
                    'padding_left':{key:'padding_x', name:'水平填充', type:'input', inputType:'number', default:0},
                    'padding_right':{key:'padding_x', name:'水平填充', type:'input', inputType:'number', default:0},
                
                    'margin_unit':{key:'padding_unit', name:'填充單位', type:'select', value_key:'value', name_key:'name', options:[{value:'px',name:'px'},{value:'%',name:'%'}], default:'%'},
                    'margin_top':{key:'padding_top', name:'頂部邊際', type:'input', inputType:'number', default:0},
                    'margin_bottom':{key:'padding_bottom', name:'底部邊際', type:'input', inputType:'number', default:0},
                    'margin_left':{key:'margin_left', name:'左側邊際', type:'input', inputType:'number', default:0},
                    'margin_right':{key:'margin_right', name:'右側邊際', type:'input', inputType:'number', default:0},
                },
                categories:['general']
            },




        ],
       
    },
    reducers: {
        setComponentTemplatesSlice(state, action) {
            return {...state, ...action.payload}
        }
    },
});

export const { setComponentTemplatesSlice } = componentTemplatesSlice.actions;
export default componentTemplatesSlice.reducer;
