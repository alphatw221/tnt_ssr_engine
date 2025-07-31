// import { customer_search_product } from "../../api/product"
// import { customer_search_product_category } from '../../api/product_category'

// import { dev_user_search_banner } from "../../api/banner"
import {user_search_blog_post} from "@/api/blog_post"
import {user_search_product} from "@/api/product"
const widthUnitOptions = [{"name": "px", "value": "px"}, {"name": "vw", "value": "vw"}, {"name": "", "value": null}]
const heightUnitOptions = [{"name": "px", "value": "px"}, {"name": "vh", "value": "vh"}, {"name": "", "value": null}]
const marginUnitOptions = [{"name": "px", "value": "px"}, {"name": "%", "value": "%"},{"name": "vw", "value": "vw"},{"name": "vh", "value": "vh"}]
const paddingUnitOptions = [{"name": "px", "value": "px"}, {"name": "%", "value": "%"},{"name": "vw", "value": "vw"},{"name": "vh", "value": "vh"}]
const backgroundSizeOptions = [{"name": "contain", "value": "contain"}, {"name": "cover", "value": "cover"},]
const borderStyleOptions = [{"name": "無", "value": ""},{"name": "solid", "value": "solid"}, {"name": "dotted", "value": "dotted"}, {"name": "inset", "value": "inset"}, {"name": "double", "value": "double"}, {"name": "groove", "value": "groove"}, {"name": "dashed", "value": "dashed"}]
const borderRadiusUnitOptions = [{"name": "無", "value": ""},{"name": "px", "value": "px"}, {"name": "%", "value": "%"}]
const borderWidthUnitOptions = [{"name": "px", "value": "px"}, {"name": "%", "value": "%"}]
const textAlignOptions = [{"name": "左", "value": "left"}, {"name": "中", "value": "center"}, {"name": "右", "value": "right"}, {"name": "", "value": null}]

const justifyContentOptions = [
    {"name": "起始", "value": "flex-start"}, 
    {"name": "置中", "value": "center"}, 
    {"name": "結束", "value": "flex-end"}, 
    {"name": "之間", "value": "space-between"}, 
    {"name": "周圍", "value": "space-around"}, 
    {"name": "平分", "value": "space-evenly"}, 
    ]

const justifyItemsOptions = [
    {"name": "正常", "value": "normal"}, 
    {"name": "拉伸", "value": "stretch"}, 
    {"name": "起始", "value": "start"}, 
    {"name": "左", "value": "left"}, 
    {"name": "中", "value": "center"}, 
    {"name": "結束", "value": "end"}, 
    {"name": "右", "value": "right"}, 
    {"name": "超出對齊", "value": "overflow-alignment"}, 
    {"name": "基準線對齊", "value": "baseline alignment"}, 

]
const alignContentOptions = [
    {"name": "起始", "value": "flex-start"}, 
    {"name": "置中", "value": "center"}, 
    {"name": "結束", "value": "flex-end"}, 
    {"name": "之間", "value": "space-between"},
    {"name": "周圍", "value": "space-around"},
    {"name": "平分", "value": "space-evenly"},
    ]
const alignItemsOptions = [
    {"name": "靠上對齊", "value": "flex-start"}, 
    {"name": "靠下對齊", "value": "flex-end"}, 
    {"name": "置中對齊", "value": "center"}, 
    {"name": "拉伸對齊", "value": "stretch"},
    {"name": "內元件對齊", "value": "baseline"},
   ]

const flexWrapOptions =  [{"name": "打包", "value": "wrap"}, {"name": "不打包", "value": "nowrap"}, {"name": "反向打包", "value": "wrap-reverse"}, {"name": "", "value": null}]
const flexDirectionOptions =  [{"name": "直行", "value": "column"}, {"name": "橫列", "value": "row"}, {"name": "反向直行", "value": "column-reverse"}, {"name": "反向橫列", "value": "row-reverse"},{"name": "", "value": null}]

const presentTriggerPositionOptions = [{"name": "頂部", "value": "top"}, {"name": "置中", "value": "middle"}, {"name": "bottom", "value": "底部"}]

const writingModeOptions = [{"name": "橫向", "value": "horizontal-tb"},{"name": "直向左至右", "value": "vertical-rl"},{"name": "直向右至左", "value": "vertical-lr"}]
const textOrientationOptions = [{"name": "混合", "value": "mixed"},{"name": "直立", "value": "upright"},{"name": "sideways", "value": "sideways"},{"name": "sideways-right", "value": "sideways-right"},{"name": "use-glyph-orientation", "value": "use-glyph-orientation"}]

const hyperLinkFunctionOptions = [
    {"name": "上一頁", "value": "previous_page"}, 
    {"name": "下一頁", "value": "next_page"}, 
    {"name": "重新整理", "value": "refresh"},
    {"name": "滑動至", "value": "scroll_to"}]

const dimensionOptions = [
    {"name": "第一象限", "value": "dimension1"}, 
    {"name": "第二象限", "value": "dimension2"},
    {"name": "第三象限", "value": "dimension3"},
    {"name": "第四象限", "value": "dimension4"},
]
const backgroundPositionOptions = [
    {"name": "top", "value": "top"}, 
    {"name": "bottom", "value": "bottom"},  
    {"name": "left", "value": "left"},  
    {"name": "right", "value": "right"},  
    {"name": "center", "value": "center"}
]
const backgroundRepeatOptions = [
    {"name": "repeat-x", "value": "repeat-x"}, 
    {"name": "repeat-y", "value": "repeat-y"}, 
    {"name": "repeat", "value": "repeat"},  
    {"name": "space", "value": "space"},  
    {"name": "round", "value": "round"},  
    {"name": "no-repeat", "value": "no-repeat"}
]

const backgroundAttachmentOptions = [
    {"name": "scroll", "value": "scroll"}, 
    {"name": "fixed", "value": "fixed"},  
    {"name": "local", "value": "local"}
]

const fontWeightOptions = [  
    {"name": "粗", "value": "bold"}, 
    {"name": "普通", "value": "normal"},
    {"name": "較粗", "value": "bolder"},
    {"name": "較細", "value": "lighter"},
    {"name": "100", "value": "100"},
    {"name": "200", "value": "200"},
    {"name": "300", "value": "300"},
    {"name": "400", "value": "400"},
    {"name": "500", "value": "500"},
    {"name": "600", "value": "600"},
    {"name": "700", "value": "700"},
    {"name": "800", "value": "800"},
    {"name": "900", "value": "900"},]

const fontFamilyOptions = [

    {"name": "新細明體", "value": 'PMingLiU, MingLiU, LiSong Pro, SimSun, STSong, serif'},

    {"name": "正黑體", "value": "Microsoft JhengHei, PingFang TC, PingFang SC, Noto Sans CJK, Heiti TC, Heiti SC, Microsoft YaHei, sans-serif"},
    {"name": "雅黑體", "value": "Microsoft YaHei, PingFang SC, PingFang TC, Noto Sans CJK, Heiti SC, Heiti TC, Arial, sans-serif"},
    {"name": "黑體", "value": "SimHei, Microsoft JhengHei, PingFang SC, PingFang TC, Noto Sans CJK, Heiti SC, Heiti TC, sans-serif"},

    {"name": "宋體", "value": "SimSun, STSong, Songti SC, Microsoft YaHei, PMingLiU, MingLiU, Noto Serif CJK, serif"},
    {"name": "仿宋體", "value": "FangSong, STFangsong, STSong, Songti SC, PMingLiU, MingLiU, Noto Serif CJK, serif"},

    {"name": "楷體", "value": "KaiTi, STKaiti, STSong, Songti SC, PMingLiU, MingLiU, Noto Serif CJK, serif"},
    {"name": "標楷體", "value": "DFKai-SB, BiauKai, STKaiti, 'KaiTi, STSong, Songti SC, PMingLiU, MingLiU, serif"},

    {"name": "Serif", "value": "serif"}, 
    {"name": "Sans-Serif", "value": "sans-serif"},
    {"name": "Monospace", "value": "monospace"},
    {"name": "Cursive", "value": "cursive"},
    {"name": "Fantasy", "value": "fantasy"},
    {"name": "Helvetica", "value": "helvetica"},
    {"name": "Arial", "value": "arial"},
    {"name": "Arial Black", "value": "arial black"},
    {"name": "Verdana", "value": "verdana"},
    {"name": "Tahoma", "value": "tahoma"},

    // {"name": "宋體", "value": "Georgia,Nimbus Roman No9 L,Songti SC,Noto Serif CJK SC,Source Han Serif SC,Source Han Serif CN, STSong,AR PL New Sung,AR PL SungtiL GB, NSimSun, SimSun, TW-Sung,WenQuanYi Bitmap Song,AR PL UMing CN,AR PL UMing HK,AR PL UMing TW,AR PL UMing TW MBE,PMingLiU,MingLiU,serif"},
    // {"name": "黑體", "value": "-apple-system, Noto Sans, Helvetica Neue, Helvetica, Nimbus Sans L, Arial, Liberation Sans, PingFang SC, Hiragino Sans GB, Noto Sans CJK SC, Source Han Sans SC, Source Han Sans CN, Microsoft YaHei, Wenquanyi Micro Hei, WenQuanYi Zen Hei, ST Heiti, SimHei, WenQuanYi Zen Hei Sharp, sans-serif"},
    // {"name": "標楷體", "value": "標楷體"},
    // {"name": "仿宋體", "value": "Baskerville,Times New Roman,Liberation Serif,STFangsong,FangSong,FangSong_GB2312,CWTEX-F,serif"},
    // {"name": "楷體", "value": "Baskerville,Georgia,Liberation Serif,Kaiti SC,STKaiti,AR PL UKai CN,AR PL UKai HK,AR PL UKai TW,AR PL UKai TW MBE,AR PL KaitiM GB, KaiTi, KaiTi_GB2312, DFKai-SB, TW-Kai, serif"},
    
]

const offCanvasOptions = [
    {"name": "左", "value": "start"}, 
    {"name": "右", "value": "end"},
    {"name": "上", "value": "top"},
    {"name": "下", "value": "bottom"},
   
]

const positionOptions = [
    {"name": "一般", "value": "static"}, 
    {"name": "相對", "value": "relative"},
    {"name": "絕對", "value": "absolute"},
    {"name": "固定", "value": "fixed"},
    {"name": "滑動固定", "value": "sticky"},

]

const visableOnWebpageOptions = [
    {"name": "顯示於", "value": "include"},
    {"name": "不顯示於", "value": "exclude"},
]
const scrollAlignOptions = [
    {"name": "起始", "value": "start"}, 
    {"name": "置中", "value": "center"},
    {"name": "末端", "value": "end"},
    {"name": "接近", "value": "nearest"},
]


const baseCurrencyOptions = [  
    {"name": "TWD", "value": "TWD"}, 
    {"name": "MYR", "value": "MYR"},
    {"name": "USD", "value": "USD"},
    {"name": "AUD", "value": "AUD"},
    {"name": "JPY", "value": "JPY"},
    {"name": "SGD", "value": "SGD"},
    {"name": "EUR", "value": "EUR"},
    {"name": "RMB", "value": "RMB"},
    {"name": "KRW", "value": "KRW"},
    {"name": "PHP", "value": "PHP"},
    {"name": "VND", "value": "VND"},
    {"name": "THB", "value": "THB"},
    {"name": "IDR", "value": "IDR"},

]


const baseCurrencySignOptions = [  
        {"name": "$", "value": "$"}, 
        {"name": "NT$", "value": "NT$"},
        {"name": "€", "value": "€"},
        {"name": "£", "value": "£"},
        {"name": "¥", "value": "¥"},
        {"name": "₩", "value": "₩"},
        {"name": "RM", "value": "RM"},
        {"name": "₱", "value": "₱"},
        {"name": "₫", "value": "₫"},
        {"name": "฿", "value": "฿"},
        {"name": "Rp", "value": "Rp"},
        {"name": "S$", "value": "S$"},
    
    ]

const rwdMarginSettings = [ 
    {"type":"accordion",  "key":"expand_margin_accordion", "name":'邊際', "accordion_items":[

        {"key": "rwd_margin_top", "name": "頂部邊際(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"},
        {"key": "rwd_margin_bottom", "name": "底部邊際(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"}, 
        {"key": "rwd_margin_left", "name": "左側邊際(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"}, 
        {"key": "rwd_margin_right", "name": "右側邊際(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"}, 
        {"key": "margin_unit", "name": "邊際單位", "type": "select", "options": marginUnitOptions, "name_key": "name", "value_key": "value"}, 
    ]}
]
const rwdPaddingSettings = [
    {"type":"accordion",  "key":"expand_padding_accordion", "name":'填充', "accordion_items":[

        {"key": "rwd_padding_top", "name": "頂部填充(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"}, 
        {"key": "rwd_padding_bottom", "name": "底部填充(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"}, 
        {"key": "rwd_padding_left", "name": "左側填充(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"}, 
        {"key": "rwd_padding_right", "name": "右側填充(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"}, 
        {"key": "rwd_padding_unit", "name": "填充單位", "type": "select", "options": paddingUnitOptions, "name_key": "name", "value_key": "value"},      
    ]}  
]
// const rwdWidthSettings = [
//     {"type":"accordion",  "key":"expand_width_accordion", "name":'寬度', "accordion_items":[
//         {"key": "rwd_width", "name": "響應寬度(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"}, 
//         {"key": "width_unit", "name": "寬度單位", "type": "select", "options": widthUnitOptions, "name_key": "name", "value_key": "value"} ,

//         // {"key": "max_width", "name": "最大寬度", "type": "input",  "inputType": "text"}, 
//         // {"key": "max_width_unit", "name": "最大寬度單位", "type": "select", "options": widthUnitOptions, "name_key": "name", "value_key": "value"} ,

//         {"key": "rwd_max_width", "name": "響應最大寬度(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"}, 
//         {"key": "max_width_unit", "name": "最大寬度單位", "type": "select", "options": widthUnitOptions, "name_key": "name", "value_key": "value"} ,

//         {"key": "rwd_min_width", "name": "響應最小寬度(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"}, 
//         {"key": "min_width_unit", "name": "最小寬度單位", "type": "select", "options": widthUnitOptions, "name_key": "name", "value_key": "value"} 


//     ]}
// ]


// const rwdHeightSettings = [
//     {"type":"accordion",  "key":"expand_height_accordion", "name":'高度', "accordion_items":[
//         {"key": "rwd_height", "name": "響應高度(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"}, 
//         {"key": "height_unit", "name": "高度單位", "type": "select", "options": heightUnitOptions, "name_key": "name", "value_key": "value"} ,

//         // {"key": "max_height", "name": "最大高度", "type": "input",  "inputType": "text"}, 
//         // {"key": "max_height_unit", "name": "最大高度單位", "type": "select", "options": heightUnitOptions, "name_key": "name", "value_key": "value"} 

//         {"key": "rwd_max_height", "name": "響應最大高度(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"}, 
//         {"key": "max_height_unit", "name": "最大高度單位", "type": "select", "options": heightUnitOptions, "name_key": "name", "value_key": "value"} ,

//         {"key": "rwd_min_height", "name": "響應最小高度(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"}, 
//         {"key": "min_height_unit", "name": "最小高度單位", "type": "select", "options": heightUnitOptions, "name_key": "name", "value_key": "value"} 


//     ]}
// ]

const hideOnDeviceSettings = [
    {"type":"accordion",  "key":"expand_hide_on_device_accordion", "name":'目標裝置', "accordion_items":[
        {"type":"inline","inline_items":[
            {"key": "hide_on_xxl", "name": "大PC隱藏", "type": "checkbox", "inputType": "checkbox"}, 
            {"key": "hide_on_xl", "name": "中PC隱藏", "type": "checkbox", "inputType": "checkbox"}, 
            {"key": "hide_on_lg", "name": "小PC隱藏", "type": "checkbox", "inputType": "checkbox"}, 
        ]},
        {"type":"inline","inline_items":[
            {"key": "hide_on_md", "name": "大平板隱藏", "type": "checkbox", "inputType": "checkbox"}, 
            {"key": "hide_on_sm", "name": "小平板隱藏", "type": "checkbox", "inputType": "checkbox"}, 

        ]},
        {"type":"inline","inline_items":[
            {"key": "hide_on_xs", "name": "大手機隱藏", "type": "checkbox", "inputType": "checkbox"}, 
            {"key": "hide_on_xxs", "name": "小手機隱藏", "type": "checkbox", "inputType": "checkbox"}, 
        ]},
    ]}
]

const slideRevealSettings = [
    {"type":"accordion",  "key":"expand_slide_reveal_accordion", "name":'滑動顯示', "accordion_items":[
        {"key": "enable_reveal", "name": "啟用滑動顯示", "type": "checkbox", "inputType": "checkbox"}, 
        {"key": "rwd_reveal_offset", "name": "顯示位置(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input", "inputType":"text"}, 

        {"type":"inline","inline_items":[
            {"key": "unreveal_opacity", "name": "初始透明度(0~1)", "type": "input",  "inputType": "number", "dataType":'float', "min":0, "max":1}, 
            {"key": "reveal_opacity", "name": "顯示透明度(0~1)", "type": "input",  "inputType": "number", "dataType":'float', "min":0, "max":1}, 
            {"key": "reveal_opacity_duration", "name": "時長", "type": "input",  "inputType": "number", "dataType":'float', "min":0, "max":5}, 
            {"key": "reveal_opacity_delay", "name": "延遲", "type": "input",  "inputType": "number","dataType":'float', "min":0, "max":5}, 

        ]},

        {"type":"inline","inline_items":[
            {"key": "unreveal_translate_x", "name": "初始橫移", "type": "input",  "inputType": "number"  }, 
            {"key": "reveal_translate_x", "name": "顯示橫移", "type": "input",  "inputType": "number"}, 
            {"key": "unreveal_translate_y", "name": "初始下移", "type": "input",  "inputType": "number"}, 
            {"key": "reveal_translate_y", "name": "顯示下移", "type": "input",  "inputType": "number"}, 
            {"key": "reveal_translate_duration", "name": "時長", "type": "input",  "inputType": "number", "dataType":'float', "min":0, "max":5}, 
            {"key": "reveal_translate_delay", "name": "延遲", "type": "input",  "inputType": "number","dataType":'float', "min":0, "max":5}, 

        ]},



    ]},
]

// const presentEmitEventSettings = [
//     {"type":"accordion",  "key":"expand_emit_event_accordion", "name":'顯示觸發事件', "accordion_items":[
//         {"key": "enable_present_emit_event", "name": "啟用顯示觸發事件", "type": "checkbox", "inputType": "checkbox"}, 

//         {"key": `present_trigger_position`, "name": `觸發位置`, "type": "select",  
//             "options": presentTriggerPositionOptions, "name_key": "name", "value_key": "value"},

//         {"key": "emit_present_event_once", "name": "單次觸發", "type": "checkbox", "inputType": "checkbox"},
//         {"key": "present_emit_event_name", "name": "觸發事件名稱", "type": "input", "inputType":"text"}, 

//     ]},
// ]

// const disapearEmitEventSettings = [
//     {"type":"accordion",  "key":"expand_disapear_emit_event_accordion", "name":'消失觸發事件', "accordion_items":[
//         {"key": "enable_disapear_emit_event", "name": "啟用消失觸發事件", "type": "checkbox", "inputType": "checkbox"}, 
//         {"key": "emit_disapear_event_once", "name": "單次觸發", "type": "checkbox", "inputType": "checkbox"},
//         {"key": "disapear_emit_event_name", "name": "觸發事件名稱", "type": "input", "inputType":"text"}, 

//     ]},
// ]


const initStyleSettings = [
    {"type":"accordion",  "key":"expand_init_style_accordion", "name":'樣式', "accordion_items":[


        {"key": "position", "name": "排版方式", "type": "select", "options": positionOptions, "name_key": "name", "value_key": "value"} ,

        {"type":"inline","inline_items":[
            {"key": "rwd_top", "name": "上(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text", }, 
            {"key": "rwd_left", "name": "左(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text", }, 
            {"key": "rwd_bottom", "name": "下(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text", }, 
            {"key": "rwd_right", "name": "右(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text",}, 

        ]},

        {"key": "z_index", "name": "疊層", "type": "input",  "inputType": "number", "dataType":'integer', "min":0, "max":1000}, 
        {"key": "opacity", "name": "透明度(0~1)", "type": "input",  "inputType": "number", "dataType":'float', "min":0, "max":1}, 


        {"key": "translate_x", "name": "橫移", "type": "input",  "inputType": "text"  }, 
        {"key": "translate_y", "name": "下移", "type": "input",  "inputType": "text"}, 

        {"key": "scale_x", "name": "x縮放", "type": "input",  "inputType": "text"  }, 
        {"key": "scale_y", "name": "y縮放", "type": "input",  "inputType": "text"}, 

        {"key": "rotate", "name": "旋轉", "type": "input",  "inputType": "text"  }, 

        {"key": "init_class_name", "name": "類別名稱(,隔開)", "type": "input",  "inputType": "text"  }, 
        {"key": "init_css", "name": "樣式表", "type": "textarea"  }, 
        {"key": "init_style", "name": "行內樣式", "type": "textarea"  }, 

    ]},
]

const getComponentGrid3DSettings = (accordion_name) => {
    return [

            {"type":"accordion",  "key":`expand_grid_settings_accordion`, "name":accordion_name, "accordion_items":[
                // {"key": `row_justify_content`, "name": `列對齊`, "type": "select",  
                //     "options": justifyContentOptions, "name_key": "name", "value_key": "value"}, 
                // {"key": `row_flex_wrap`, "name": `列打包選項`, "type": "select",  
                //     "options": flexWrapOptions, "name_key": "name", "value_key": "value"},
                // {"key": `column_justify_content`, "name": `行對齊`, "type": "select",  
                //     "options": justifyContentOptions, "name_key": "name", "value_key": "value"},
                // {"key": `column_row_justify_content`, "name": `元件對齊`, "type": "select",  
                //         "options": justifyContentOptions, "name_key": "name", "value_key": "value"},
                

                {"key": `rwd_flex_wrap`, "name": `打包`, "type": "select",  
                    "options": flexWrapOptions, "name_key": "name", "value_key": "value"},
                //flex direction
                {"key": `rwd_flex_direction`, "name": `方向`, "type": "select",  
                    "options": flexDirectionOptions, "name_key": "name", "value_key": "value"}, 

                {"key": `rwd_align_items`, "name": `主軸線對齊`, "type": "select",  
                    "options": alignItemsOptions, "name_key": "name", "value_key": "value"}, 

                {"key": `rwd_justify_content`, "name": `次軸線對齊`, "type": "select",  
                    "options": justifyContentOptions, "name_key": "name", "value_key": "value"}, 

                {"key": `rwd_align_content`, "name": `多行主軸線對齊`, "type": "select",  
                        "options": alignContentOptions, "name_key": "name", "value_key": "value"}, 

                // {"key": `rwd_justify_items`, "name": `列對齊`, "type": "select",  
                //     "options": justifyItemsOptions, "name_key": "name", "value_key": "value"}, 

               
                
            ]}
        ]
}

const getWidthSettings = (key, name, accordion_name)=>{
    const k = key? key+'_' : ''
    const n = name||''
    const accordion_n = accordion_name||'寬度'
    return [
        {"type":"accordion",  "key":`expand_${k}rwd_width_accordion`, "name":accordion_n, "accordion_items":[
            {"key": `${k}rwd_width`, "name": `${n}響應寬度(XXL,XL,LG,MD,SM,XS,XXS)`, "type": "input",  "inputType": "text"}, 
            {"key": `${k}width_unit`, "name": `${n}寬度單位`, "type": "select", "options": widthUnitOptions, "name_key": "name", "value_key": "value"} ,
            
            {"key": `${k}rwd_max_width`, "name": `${n}響應最大寬度(XXL,XL,LG,MD,SM,XS,XXS)`, "type": "input",  "inputType": "text"}, 
            {"key": `${k}max_width_unit`, "name": `${n}最大寬度單位`, "type": "select", "options": widthUnitOptions, "name_key": "name", "value_key": "value"} ,
    
            {"key": `${k}rwd_min_width`, "name": `${n}響應最小寬度(XXL,XL,LG,MD,SM,XS,XXS)`, "type": "input",  "inputType": "text"}, 
            {"key": `${k}min_width_unit`, "name": `${n}最小寬度單位`, "type": "select", "options": widthUnitOptions, "name_key": "name", "value_key": "value"} 
    
    
        ]}
    ]
}

const getHeightSettings = (key, name, accordion_name)=>{
    const k = key? key+'_' : ''
    const n = name||''
    const accordion_n = accordion_name||'高度'

    return [
        {"type":"accordion",  "key":`expand_${k}rwd_height_accordion`, "name":accordion_n, "accordion_items":[
            {"key": `${k}rwd_height`, "name": `${n}響應高度(XXL,XL,LG,MD,SM,XS,XXS)`, "type": "input",  "inputType": "text"}, 
            {"key": `${k}height_unit`, "name": `${n}高度單位`, "type": "select", "options": heightUnitOptions, "name_key": "name", "value_key": "value"} ,
    
            // {"key": `${k}max_height`, "name": `${n}最大高度`, "type": "input",  "inputType": "text"}, 
            // {"key": `${k}max_height_unit`, "name": `${n}最大高度單位`, "type": "select", "options": heightUnitOptions, "name_key": "name", "value_key": "value"} ,

            {"key": `${k}rwd_max_height`, "name": `${n}響應最大高度(XXL,XL,LG,MD,SM,XS,XXS)`, "type": "input",  "inputType": "text"}, 
            {"key": `${k}max_height_unit`, "name": `${n}最大高度單位`, "type": "select", "options": heightUnitOptions, "name_key": "name", "value_key": "value"} ,

            {"key": `${k}rwd_min_height`, "name": `${n}響應最小高度(XXL,XL,LG,MD,SM,XS,XXS)`, "type": "input",  "inputType": "text"}, 
            {"key": `${k}min_height_unit`, "name": `${n}最小高度單位`, "type": "select", "options": heightUnitOptions, "name_key": "name", "value_key": "value"} 

        ]}
    ]
}
const getBackgroundImageSettings = (key, name, accordion_name) => {
    const k = key? key+'_' : ''
    return [

            {"type":"accordion",  "key":`expand_${k}background_accordion`, "name":accordion_name, "accordion_items":[
                {"key": `${k}background_color`, "name": `${name}背景顏色`, "type": "rgba_color"},
                {"key": `${k}background_color2`, "name": `${name}背景顏色2`, "type": "rgba_color"},
                {'key': `${k}background_image`, "name": `${name}背景圖片`, "type": "image"},
                {"key": `${k}background_size`, "name": `${name}響應背景圖片配置(XXL,XL,LG,MD,SM,XS,XXS)-(x%y%)`, "type": "input_or_select",  "inputType": "text",  
                    "options": backgroundSizeOptions, "name_key": "name", "value_key": "value"}, 
                {"key": `${k}background_position`, "name": `${name}響應背景圖片位置(XXL,XL,LG,MD,SM,XS,XXS)-(x% y%)`, "type": "input_or_select",  "inputType": "text",  
                    "options": backgroundPositionOptions, "name_key": "name", "value_key": "value"},
                {"key": `${k}background_repeat`, "name": `${name}背景圖片重複`, "type": "select",  
                    "options": backgroundRepeatOptions, "name_key": "name", "value_key": "value"},
                {"key": `${k}background_attachment`, "name": `${name}背景圖片附著`, "type": "select",  
                    "options": backgroundAttachmentOptions, "name_key": "name", "value_key": "value"},


                // {"key": `${k}background_position_x`, "name": `${name}背景水平排版`, "type": "input",  "inputType": "text", }, 
                // {"key": `${k}background_position_y`, "name": `${name}背景垂直排版`, "type": "input",  "inputType": "text", }, 
            ]}


        
        ]
}

const getBorderSettings = (key, name, accordion_name, basic_controls, additions) =>{ 
    const k = key? key+'_' : ''
    return [


        {"type":"accordion",  "key":`expand_${k}border_accordion`, "name":accordion_name, "accordion_items":[
            ...(basic_controls||[]),
            {"key": `${k}border_style`, "name": `${name}邊線風格`, "type": "select",  "options": borderStyleOptions, "name_key": "name", "value_key": "value"},
            {"key": `${k}border_color`, "name": `${name}邊線顏色`, "type": "rgba_color"},
            {"key": `${k}border_color2`, "name": `${name}邊線顏色2`, "type": "rgba_color"},

            {"key": `${k}border_radius`, "name": `${name}圓角`, "type": "input",  "inputType": "number"}, 
            {"key": `${k}border_radius_unit`, "name": `${name}圓角單位`, "type": "select",  "options":borderRadiusUnitOptions, "name_key": "name", "value_key": "value"},
    
            {"key": `${k}border_width`, "name": `${name}邊線寬度`, "type": "input",  "inputType": "number"}, 
            {"key": `${k}border_width_unit`, "name": `${name}邊線寬度單位`, "type": "select", "options": borderWidthUnitOptions, "name_key": "name", "value_key": "value"},
            
            {"key": `${k}shadow_offset_x`, "name": `${name}水平陰影`, "type": "input",  "inputType": "number"}, 
            {"key": `${k}shadow_offset_y`, "name": `${name}垂直陰影`, "type": "input",  "inputType": "number"}, 
            {"key": `${k}shadow_blur_radius`, "name": `${name}陰影模糊`, "type": "input",  "inputType": "number"}, 
            {"key": `${k}shadow_spread_radius`, "name": `${name}陰影擴散`, "type": "input",  "inputType": "number"}, 
            {"key": `${k}shadow_color`, "name": `${name}陰影顏色`, "type": "rgba_color"},
            ...(additions||[])
        ]}


       
    ]
}

const getShadowSettings = (key, name, accordion_name, basic_controls,additions) =>{ 

    const k = key? key+'_' : ''
    return [

        {"type":"accordion",  "key":`expand_${k}shadow_accordion`, "name":accordion_name, "accordion_items":[
            ...(basic_controls||[]),
            {"key": `${k}shadow_offset_x`, "name": `${name}水平陰影`, "type": "input",  "inputType": "number"}, 
            {"key": `${k}shadow_offset_y`, "name": `${name}垂直陰影`, "type": "input",  "inputType": "number"}, 
            {"key": `${k}shadow_blur_radius`, "name": `${name}陰影模糊`, "type": "input",  "inputType": "number"}, 
            {"key": `${k}shadow_spread_radius`, "name": `${name}陰影擴散`, "type": "input",  "inputType": "number"}, 
            {"key": `${k}shadow_color`, "name": `${name}陰影顏色`, "type": "rgba_color"},
    
            ...(additions||[])
        ]}
       
    ]
}

const getFontSettings = (key, name, accordion_name, basic_controls, additions) => { 
    const k = key? key+'_' : ''
    return [
        {"type":"accordion",  "key":`expand_${k}rwd_font_accordion`, "name":accordion_name, "accordion_items":[
            ...(basic_controls||[]),
            {"key": `${k}rwd_font_size`, "name": `${name}響應字體大小(XXL,XL,LG,MD,SM,XS,XXS)`, "type": "input",  "inputType": "text"}, 
            {"key": `${k}font_weight`, "name": `${name}字體粗細`, "type": "select", "options": fontWeightOptions,"name_key": "name", "value_key": "value"}, 
            {"key": `${k}font_family`, "name": `${name}字體`, "type": "input_or_select", "inputType": "text", "options": fontFamilyOptions,"name_key": "name", "value_key": "value"}, 
            {"key": `${k}rwd_writing_mode`, "name": `${name}響應書寫方向(XXL,XL,LG,MD,SM,XS,XXS)`, "type": "input_or_select",  "inputType": "text",  
                    "options": writingModeOptions, "name_key": "name", "value_key": "value"}, 
            {"key": `${k}rwd_word_spacing`, "name": `${name}響應文字間距(XXL,XL,LG,MD,SM,XS,XXS)`, "type": "input",  "inputType": "text"}, 
            {"key": `${k}rwd_letter_spacing`, "name": `${name}響應字元間距(XXL,XL,LG,MD,SM,XS,XXS)`, "type": "input",  "inputType": "text"}, 
            {"key": `${k}rwd_text_orientation`, "name": `${name}響應文字方向(XXL,XL,LG,MD,SM,XS,XXS)`, "type": "input_or_select",  "inputType": "text",  
            "options": textOrientationOptions, "name_key": "name", "value_key": "value"}, 
            {"key": `${k}font_color`, "name": `${name}文字顏色1`, "type": "rgba_color"}, 
            {"key": `${k}font_color2`, "name": `${name}文字顏色2`, "type": "rgba_color"}, 
            ...(additions||[])
        ]}
        
    ]
} 

const productDetailSettings = [
    {"type":"accordion",  "key":`expand_product_detail_accordion`, "name":'商品內容', "accordion_items":[
                    
        {"key": "product_detail_price_font_color", "name": "價錢顏色", "type": "rgba_color"}, 
        {"key": "product_option_width", "name": "選項寬度", "type": "input", "inputType":"range"}, 

        {"type":"accordion",  "key":`expand_product_option_accordion`, "name":'商品選項', "accordion_items":[
            {"key": "rwd_product_option_height", "name": "響應高度(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input", "inputType":"text"}, 
            ...getBorderSettings('product_option', '商品選項', '商品選項邊框'),

        ]},
        {"type":"accordion",  "key":`expand_product_option_name_accordion`, "name":'選項標題', "accordion_items":[
              
            {"key": "rwd_product_option_name_font_size", "name": "選項名稱字體大小(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"}, 
            {"key": `product_option_name_font_color`, "name": `選項名稱顏色`, "type": "rgba_color"}, 
            {"key": "product_option_background_color", "name": "選項背景顏色", "type": "rgba_color"}, 
            {"key": "product_option_background_color2", "name": "選項背景顏色2", "type": "rgba_color"}, 
        ]},
        {"type":"accordion",  "key":`expand_product_option_description_accordion`, "name":'選項敘述', "accordion_items":[
            {"key": "rwd_product_option_description_font_size", "name": "選項敘述字體大小(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"}, 
            {"key": "product_option_description_background_color", "name": "選項敘述背景顏色", "type": "rgba_color"}, 
            {"key": `product_option_description_font_color`, "name": `選項敘述顏色`, "type": "rgba_color"}, 

            {"key": `rwd_product_option_description_top`, "name": `選項敘述靠上(XXL,XL,LG,MD,SM,XS,XXS)`, "type": "input",  "inputType": "text"}, 
            {"key": `rwd_product_option_description_bottom`, "name": `選項敘述靠下(XXL,XL,LG,MD,SM,XS,XXS)`, "type": "input",  "inputType": "text"}, 
            {"key": `rwd_product_option_description_left`, "name": `選項敘述靠左(XXL,XL,LG,MD,SM,XS,XXS)`, "type": "input",  "inputType": "text"}, 
            {"key": `rwd_product_option_description_right`, "name": `選項敘述靠右(XXL,XL,LG,MD,SM,XS,XXS)`, "type": "input",  "inputType": "text"}, 

            {"key": `product_option_description_translate_x`, "name": `水平位移`, "type": "input",  "inputType": "number"}, 
            {"key": `product_option_description_translate_y`, "name": `垂直位移`, "type": "input",  "inputType": "number"}, 

        ]},
        {"type":"accordion",  "key":`expand_product_option_price_description_accordion`, "name":'選項價錢敘述', "accordion_items":[
            {"key": "rwd_product_option_price_description_font_size", "name": "價錢敘述字體大小(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"}, 
            {"key": `product_option_price_description_font_color`, "name": `價錢敘述顏色`, "type": "rgba_color"}, 
            
            {"key": `rwd_product_option_price_description_top`, "name": `價錢敘述靠上(XXL,XL,LG,MD,SM,XS,XXS)`, "type": "input",  "inputType": "text"}, 
            {"key": `rwd_product_option_price_description_bottom`, "name": `價錢敘述靠下(XXL,XL,LG,MD,SM,XS,XXS)`, "type": "input",  "inputType": "text"}, 
            {"key": `rwd_product_option_price_description_left`, "name": `價錢敘述靠左(XXL,XL,LG,MD,SM,XS,XXS)`, "type": "input",  "inputType": "text"}, 
            {"key": `rwd_product_option_price_description_right`, "name": `價錢敘述靠右(XXL,XL,LG,MD,SM,XS,XXS)`, "type": "input",  "inputType": "text"}, 

            {"key": `product_option_price_description_translate_x`, "name": `水平位移`, "type": "input",  "inputType": "number"}, 
            {"key": `product_option_price_description_translate_y`, "name": `垂直位移`, "type": "input",  "inputType": "number"}, 
        ]},
        
      

       

      

    ]},
]

const visableOnWebpageSettings = [
    {"type":"accordion",  "key":"expand_visable_on_webpage_accordion", "name":'特定頁面顯示', "accordion_items":[

        {"key": "visable_on_webpage_logic", "name": "顯示設定", "type": "select", "options": visableOnWebpageOptions, "name_key": "name", "value_key": "value"} ,
        {"key": "target_webpages", "name": "頁面名稱(使用,逗號隔開)", "type": "input", "inputType":"text"}, 

    ]},
]


export const globalSettings = [
    {"key": "uuid", "name": "節點UUID", "type": "text"}, 
    {"key": "name", "name": "名稱", "type": "input",  "inputType": "text"}, 

    {"type":"accordion", "key":`expand_template_accordion`, "name":'樣板設定', "accordion_items":[

        {"key": "mark_as_template", "name": "設為模板", "type": "checkbox", "inputType": "checkbox"}, 
        {"key": "template_node_uuid", "name": "引用模板UUID", "type": "input",  "inputType": "text", "allow_blank":true}, 

    ]},

    {"type":"accordion", "key":`expand_visibility_accordion`, "name":'發布狀態', "accordion_items":[


        {"key": "visibility", "name": "發布狀態", "type": "select", "options": [
            {"name": "公開", "value": "visable"}, 
            {"name": "不公開", "value": "invisable"},  
            {"name": "排程", "value": "schedule"}
        ], "name_key": "name", "value_key": "value"} ,

        
        {"key": "visible_start_time", "name": "公開時間", "type": "datetime"} ,
        {"key": "visible_end_time", "name": "結束公開時間", "type": "datetime"} ,

    ]},
]

export function getCompnentSettings(type, store_uuid){

    switch(type){
        case 'website':
            return [


      
                {'key': `favicon`, "name": `網站圖示`, "type": "image"},

                {"type":"accordion",  "key":`expand_function_page_name`, "name":'路由設定', "accordion_items":[
                    {"key": "customer_login_route", "name": "顧客登入路徑名稱", "type": "input",  "inputType": "text"}, 
                    {"key": "customer_register_route", "name": "顧客註冊路徑名稱", "type": "input",  "inputType": "text"}, 
                    {"key": "cart_route", "name": "購物車路徑名稱", "type": "input",  "inputType": "text"}, 
                    {"key": "checkout_route", "name": "結帳路徑名稱", "type": "input",  "inputType": "text"}, 
                    {"key": "order_route", "name": "訂單路徑名稱", "type": "input",  "inputType": "text"}, 
                    {"key": "my_orders_route", "name": "我的訂單路徑名稱", "type": "input",  "inputType": "text"}, 
                    {"key": "order_payment_route", "name": "訂單付款路徑名稱", "type": "input",  "inputType": "text"}, 
                    {"key": "shop_route", "name": "商城路徑名稱", "type": "input",  "inputType": "text"}, 
                    {"key": "product_route", "name": "商品路徑名稱", "type": "input",  "inputType": "text"}, 
                    {"key": "blog_route", "name": "部落格路徑名稱", "type": "input",  "inputType": "text"}, 
                    {"key": "blog_post_route", "name": "文章路徑名稱", "type": "input",  "inputType": "text"}, 
                ]},
                // {"type":"accordion",  "key":`static_file_settings`, "name":'靜態檔案', "accordion_items":[
                //     {'key': `customize_style_sheet`, "name": `客製樣式表`, "type": "file", "accept":".css", "filter_type":"text/css"},
                //     {'key': `customize_javascript`, "name": `客製腳本`, "type": "file", "accept":".js", "filter_type":"text/javascript"},
                // ]}

            ]
        case 'webpage':
            return [
                {"key": "use_layout", "name": "使用佈局", "type": "checkbox", "inputType": "checkbox"}, 
                {"key": "require_login", "name": "要求訪客登入", "type": "checkbox", "inputType": "checkbox"}, 

                // {"key": "name", "name": "名稱", "type": "input",  "inputType": "text"}, 
                // {"key": "path", "name": "路徑", "type": "input",  "inputType": "text"}, 
                {"key": "description", "name": "網頁敘述", "type": "input",  "inputType": "text"}, 
                {"key": "keywords", "name": "網頁關鍵字", "type": "input",  "inputType": "text"}, 

                {"key": "og_title", "name": "OpenGraph標題", "type": "input",  "inputType": "text"}, 
                {"key": "og_description", "name": "OpenGraph敘述", "type": "input",  "inputType": "text"}, 

                {'key': `og_image1`, "name": `OpenGraph圖片1`, "type": "image"},
                {'key': `og_image2`, "name": `OpenGraph圖片2`, "type": "image"},
                ...initStyleSettings,
                ...getBackgroundImageSettings('','','背景'),
                {"type":"accordion",  "key":`expand_cursor_accordion`, "name":'游標', "accordion_items":[
                    {'key': `cursor_image`, "name": `游標圖片`, "type": "image"},
                ]},
                {"type":"accordion",  "key":`expand_static_file_accordion`, "name":'靜態檔案', "accordion_items":[
                    {'key': `customize_style_sheet`, "name": `客製樣式表`, "type": "file", "accept":".css", "filter_type":"text/css"},
                    {'key': `customize_javascript`, "name": `客製腳本`, "type": "file", "accept":".js", "filter_type":"text/javascript"},
                ]}
            ]
        case 'section':
            return [

                // {"key": "name", "name": "名稱", "type": "input",  "inputType": "text"}, 

                // {"type":"inline","inline_items":[

                    
                //     {"key": "height", "name": "高度", "type": "input",  "inputType": "number"}, 
                //     {"key": "height_unit", "name": "高度單位", "type": "select", "options": [{"name": "px", "value": "px"}, {"name": "vh", "value": "vh"}, {"name": "", "value": null}], "name_key": "name", "value_key": "value"} ,

                //     {"key": "width", "name": "寬度", "type": "input",  "inputType": "string"}, 
                //     {"key": "width_unit", "name": "寬度單位", "type": "select", "options": [{"name": "px", "value": "px"}, {"name": "vw", "value": "vw"}, {"name": "", "value": null}], "name_key": "name", "value_key": "value"} 
                // ]},
               
                // {"type":"inline","inline_items":[
                //     {"key": "padding_top", "name": "頂部填充", "type": "input",  "inputType": "number"}, 
                //     {"key": "padding_bottom", "name": "底部填充", "type": "input",  "inputType": "number"}, 
                //     {"key": "padding_x", "name": "水平填充", "type": "input",  "inputType": "number"}, 
                //     {"key": "padding_unit", "name": "填充單位", "type": "select", "options": [{"name": "px", "value": "px"}, {"name": "%", "value": "%"}], "name_key": "name", "value_key": "value"},     

                // ]},
                ...visableOnWebpageSettings,
                ...hideOnDeviceSettings,
                ...getWidthSettings(),
                ...getHeightSettings(),
                ...rwdPaddingSettings,
                ...initStyleSettings,
                ...getBackgroundImageSettings('','','背景'),
                ...getComponentGrid3DSettings('元件網格設定'),

                {"type":"accordion",  "key":`expand_cursor_accordion`, "name":'游標', "accordion_items":[
                    {'key': `cursor_image`, "name": `游標圖片`, "type": "image"},
                ]}
            ]
        // case 'fragment':  deplicate
        //     return [

        //         {"key": "name", "name": "名稱", "type": "input",  "inputType": "text"}, 


        //         {"type":"inline","inline_items":[
        //             {"key": "height", "name": "高度", "type": "input",  "inputType": "number"}, 
        //             {"key": "height_unit", "name": "高度單位", "type": "select", "options": [{"name": "px", "value": "px"}, {"name": "vh", "value": "vh"}, {"name": "", "value": null}], "name_key": "name", "value_key": "value"} ,

        //             {"key": "width", "name": "寬度", "type": "input",  "inputType": "string"}, 
        //             {"key": "width_unit", "name": "寬度單位", "type": "select", "options": [{"name": "px", "value": "px"}, {"name": "vw", "value": "vw"}, {"name": "", "value": null}], "name_key": "name", "value_key": "value"} 
        //         ]},
               
        //         {"type":"inline","inline_items":[
        //             {"key": "padding_top", "name": "頂部填充", "type": "input",  "inputType": "number"}, 
        //             {"key": "padding_bottom", "name": "底部填充", "type": "input",  "inputType": "number"}, 
        //             {"key": "padding_x", "name": "水平填充", "type": "input",  "inputType": "number"}, 
        //             {"key": "padding_unit", "name": "填充單位", "type": "select", "options": [{"name": "px", "value": "px"}, {"name": "%", "value": "%"}], "name_key": "name", "value_key": "value"},     

        //         ]},
        //         ...initStyleSettings,
        //         ...getBackgroundImageSettings('','','背景'),
        //         ...getComponentGrid3DSettings('元件網格設定'),
        //     ]
            // case 'header_footer':
            //     return [
    
            //         {"key": "name", "name": "名稱", "type": "input",  "inputType": "text"}, 
                    
            //         {"key": "sticky", "name": "固定", "type": "select", 
            //             "options": [{"name": "頂部", "value": "top"}, {"name": "底部", "value": "bottom"}], "name_key": "name", "value_key": "value"},     

            //         // {"key": "fixed", "name": "固定", "type": "checkbox", "inputType": "checkbox"}, 

            //         {"type":"inline","inline_items":[
            //             {"key": "height", "name": "高度", "type": "input",  "inputType": "number"}, 
            //             {"key": "height_unit", "name": "高度單位", "type": "select", "options": [{"name": "px", "value": "px"}, {"name": "vh", "value": "vh"}, {"name": "", "value": null}], "name_key": "name", "value_key": "value"} 
            //         ]},
                   
            //         {"type":"inline","inline_items":[
            //             {"key": "padding_top", "name": "頂部填充", "type": "input",  "inputType": "number"}, 
            //             {"key": "padding_bottom", "name": "底部填充", "type": "input",  "inputType": "number"}, 
            //             {"key": "padding_x", "name": "水平填充", "type": "input",  "inputType": "number"}, 
            //             {"key": "padding_unit", "name": "填充單位", "type": "select", "options": [{"name": "px", "value": "px"}, {"name": "%", "value": "%"}], "name_key": "name", "value_key": "value"},     
    
            //         ]},
                    
            //         ...getShadowSettings('','','陰影'),
            //         ...getBackgroundImageSettings('','', '背景')
    
            //     ]
        
        case 'ck_editor':
            return [

                
                {"key": "background_color", "name": "背景顏色", "type": "rgba_color"},
                ...getWidthSettings(),
                ...hideOnDeviceSettings,
                ...slideRevealSettings,


            ]
        
        // case 'dropdown_list': //deplicated
        //     return[
                
        //         {"type":"accordion",  "key":`expand_dropdown_list_accordion`, "name":'下拉選單', "accordion_items":[
        //             {"key": "text", "name": "內文", "type": "input",  "inputType": "text"}, 
        //             {'key': "icon_name", "name": "圖標", "type": "icon"},
        //             {"key": "dimension", "name": "元件象限", "type": "select", "options": dimensionOptions,"name_key": "name", "value_key": "value"}, 
        //         ]},

        //         ...hideOnDeviceSettings,
                
        //         // {"key": "button_background_color", "name": "按鈕背景顏色", "type": "rgba_color"},
        //         ...getWidthSettings(),
        //         ...getHeightSettings(),

        //         ...getFontSettings('button','按鈕','按鈕文字',[
        //             {"key": "button_rwd_line_height", "name": "行高(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"}
        //         ]),
        //         // {"type":"accordion",  "key":`expand_button_background_accordion`, "name":'按鈕前景', "accordion_items":[
        //         //     {"key": "button_background_color", "name": "前景顏色", "type": "rgba_color"},
        //         //     {"key": "button_background_color2", "name": "前景顏色2", "type": "rgba_color"},
        //         // ]},
        //         ...getBackgroundImageSettings('','','按鈕背景'),
        //         ...getBorderSettings('','','按鈕邊線'),
        //         ...getShadowSettings('','','按鈕陰影'),


        //         {"type":"accordion",  "key":`expand_dropdown_background_accordion`, "name":'下拉背景', "accordion_items":[
        //             {"key": "dropdown_background_color", "name": "下拉背景顏色", "type": "rgba_color"},
        //         ]},

        //         {"type":"accordion",  "key":`expand_dropdown_rwd_width_accordion`, "name":'下拉尺寸', "accordion_items":[

        //             {"key": "dropdown_rwd_width", "name": "下拉響應寬度(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"}, 
        //             {"key": "dropdown_width_unit", "name": "下拉寬度單位", "type": "select", "options": widthUnitOptions, "name_key": "name", "value_key": "value"} ,

        //             {"key": "dropdown_rwd_height", "name": "下拉響應高度(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"}, 
        //             {"key": "dropdown_height_unit", "name": "下拉高度單位", "type": "select", "options": heightUnitOptions, "name_key": "name", "value_key": "value"} ,

        //             // {"type":"inline","inline_items":[
        //             //     {"key": "dropdown_width", "name": "下拉寬度", "type": "input",  "inputType": "number"}, 
        //             //     {"key": "dropdown_width_unit", "name": "下拉寬度單位", "type": "select", "options": [{"name": "px", "value": "px"}, {"name": "%", "value": "%"}, {"name": "vw", "value": "vw"}, {"name": "", "value": null}], "name_key": "name", "value_key": "value"} 
        //             // ]},
    
        //             // {"type":"inline","inline_items":[
        //             //     {"key": "dropdown_height", "name": "下拉高度", "type": "input",  "inputType": "number"}, 
        //             //     {"key": "dropdown_height_unit", "name": "下拉高度單位", "type": "select", "options": [{"name": "px", "value": "px"}, {"name": "vh", "value": "vh"}, {"name": "", "value": null}], "name_key": "name", "value_key": "value"} 
        //             // ]},
        //         ]},
        //         ...getBorderSettings('dropdown','下拉','下拉邊線'),
        //         ...getShadowSettings('dropdown','下拉','下拉陰影'),

                
                
        //         ...rwdMarginSettings,
        //         // ...rwdPaddingSettings,
                
        //         //dropdown
                
                

        //     ]
        
        case 'empty_box':
            return [
                ...hideOnDeviceSettings,
                ...getBackgroundImageSettings('','','背景'),
                ...getBorderSettings('', '', '邊線'),
                ...getWidthSettings(),
                ...getHeightSettings(),
                ...slideRevealSettings,
                ...initStyleSettings,
                ...rwdMarginSettings,
                // ...presentEmitEventSettings,
                // ...disapearEmitEventSettings,
            ]
        
        case 'node_box':
            return [
                ...hideOnDeviceSettings,
                ...getWidthSettings(),
                ...getHeightSettings(),
                ...getBackgroundImageSettings('','','背景'),
                ...getBorderSettings('', '', '邊線'),
                ...getShadowSettings('','','陰影'),
                ...rwdMarginSettings,
                // ...rwdPaddingSettings,
                ...slideRevealSettings,
                ...initStyleSettings,
                ...getComponentGrid3DSettings('元件網格設定'),
                // ...presentEmitEventSettings,
                // ...disapearEmitEventSettings,

            ]
        
        // case 'custom_slider_slide':   //deplicated
        //     return [
        //         ...hideOnDeviceSettings,
        //         ...getWidthSettings(),
        //         ...getHeightSettings(),
        //         ...getBackgroundImageSettings('','','背景'),
        //         ...getBorderSettings('', '', '邊線'),
        //         ...getShadowSettings('','','陰影'),
        //         ...rwdMarginSettings,
        //         // ...rwdPaddingSettings,
        //         ...slideRevealSettings,
        //         ...initStyleSettings,
        //         ...getComponentGrid3DSettings('元件網格設定'),
        //         // ...presentEmitEventSettings,
        //         // ...disapearEmitEventSettings,

        //     ]
        // case 'hover_box':   deplicate
        //     return [
        //         {"key": "top_text", "name": "頂部文字", "type": "input", "inputType":"text"}, 
        //         {"key": "bottom_text", "name": "底部文字", "type": "input", "inputType":"text"}, 


        //         {"key": "href", "name": "超連結", "type": "input",  "inputType": "text"}, 

        //         ...getWidthSettings(),
        //         ...getHeightSettings(),

        //         {"type":"accordion",  "key":"", "name":"圖片", "accordion_items":[
        //             {'key': `image`, "name": `圖片`, "type": "image"},
        //             {"key": "image_width", "name": "圖片寬", "type": "input", "inputType":"range"}, 
        //             {"key": "image_height", "name": "圖片高", "type": "input", "inputType":"range"}, 

        //         ]},
        //         ...getBorderSettings('image', '圖片', '圖片邊線'),


        //         {"type":"accordion",  "key":"", "name":'方框背景', "accordion_items":[
        //             {"key": `box_background_color`, "name": `方框背景顏色`, "type": "rgba_color"},
        //             {"key": `box_background_color2`, "name": `方框背景顏色2`, "type": "rgba_color"},
                  
        //         ]},
        //         ...getBorderSettings('box', '', '方框邊線'),

        //         ...getFontSettings('','文字', '文字',

        //             [{"key": "rwd_line_height", "name": "行高(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"}, ]

        //         ),
        //         ...getShadowSettings('','','陰影'),



        //         ...slideRevealSettings,
        //         ...initStyleSettings,

        //         ...rwdMarginSettings,
        //         ...rwdPaddingSettings,
        //     ]
        case 'absolute_position_node_box':    //deplicated
            return [
                ...hideOnDeviceSettings,
                ...getWidthSettings(),
                ...getHeightSettings(),
                ...getBackgroundImageSettings('','','背景'),
                ...getBorderSettings('', '', '邊線'),
                ...getShadowSettings('','','陰影'),

                ...slideRevealSettings,
                ...initStyleSettings,

                ...rwdMarginSettings,
                // ...rwdPaddingSettings,
                // ...presentEmitEventSettings,
                // ...disapearEmitEventSettings,
            ]
        case 'image':
            return [
                ...hideOnDeviceSettings,
                // {"key": "full_width", "name": "最大寬度", "type": "checkbox", "inputType": "checkbox"}, 

                
                {"type":"accordion",  "key":`expand_hyper_link_accordion`, "name":'超連結', "accordion_items":[
                    {"key": "href", "name": "超連結", "type": "input",  "inputType": "text"}, 
                ]},

                {"type":"accordion",  "key":`expand_image_accordion`, "name":'圖片', "accordion_items":[
                    {'key': `image`, "name": `圖片`, "type": "image"},
                    {"key": "object_fit", "name": "響應圖片配置(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input_or_select", "inputType": "text",  "options": [{"name": "fill", "value": "fill"}, {"name": "contain", "value": "contain"}, {"name": "cover", "value": "cover"}, {"name": "none", "value": "none"}, {"name": "scale-down", "value": "scale-down"}], "name_key": "name", "value_key": "value"}, 
                    {"key": "object_position", "name": "響應圖片位置(XXL,XL,LG,MD,SM,XS,XXS)-(x%,y%)", "type": "input_or_select",  "inputType": "text",  "options": [{"name": "top", "value": "top"}, {"name": "bottom", "value": "bottom"},  {"name": "left", "value": "left"},  {"name": "right", "value": "right"},  {"name": "center", "value": "center"}], "name_key": "name", "value_key": "value"},

                    // {"key": `image_background_color`, "name": `前景顏色`, "type": "rgba_color"},
                    // {"key": `image_background_color2`, "name": `前景顏色2`, "type": "rgba_color"},

                ]},
                ...getBackgroundImageSettings('','','背景'),

                ...getWidthSettings(),
                ...getHeightSettings(),
                ...getBorderSettings('','圖片','邊線'),
                ...getShadowSettings('','','背景陰影'),
                // ...getShadowSettings('image','','圖片陰影'),  // 只需要一個 
                ...slideRevealSettings,
                ...initStyleSettings,

                ...rwdMarginSettings,
                // ...rwdPaddingSettings,
                // ...presentEmitEventSettings,    
                // ...disapearEmitEventSettings,
            
            ]
        
        case 'video':
                return [
                    ...hideOnDeviceSettings,    
                    
                    {"type":"accordion",  "key":`expand_hyper_link_accordion`, "name":'超連結', "accordion_items":[
                        {"key": "href", "name": "超連結", "type": "input",  "inputType": "text"}, 
                    ]},
    
                    {"type":"accordion",  "key":`expand_image_accordion`, "name":'影片', "accordion_items":[
                        {'key': `video`, "name": `影片`, "type": "video"},
                        {"key": "object_fit", "name": "響應圖片配置(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input_or_select",  "inputType": "text", "options": [{"name": "fill", "value": "fill"}, {"name": "contain", "value": "contain"}, {"name": "cover", "value": "cover"}, {"name": "none", "value": "none"}, {"name": "scale-down", "value": "scale-down"}], "name_key": "name", "value_key": "value"}, 
                        {"key": "object_position", "name": "響應圖片位置(XXL,XL,LG,MD,SM,XS,XXS)-(x%,y%)", "type": "input_or_select",  "inputType": "text",  "options": [{"name": "top", "value": "top"}, {"name": "bottom", "value": "bottom"},  {"name": "left", "value": "left"},  {"name": "right", "value": "right"},  {"name": "center", "value": "center"}], "name_key": "name", "value_key": "value"},
    
    
                    ]},
                    ...getBackgroundImageSettings('','','背景'),
                    ...getWidthSettings(),
                    ...getHeightSettings(),
                    ...getBorderSettings('','影片','邊線'),
                    ...getShadowSettings('','','背景陰影'),
                    ...slideRevealSettings,
                    ...initStyleSettings,
    
                
                ]
            
        case 'customer_login_form':
            return [
                ...getWidthSettings(),
                ...getHeightSettings(),
                ...slideRevealSettings,
                ...initStyleSettings,
                ...rwdMarginSettings,
            ]
        case 'customer_register_form':
            return [
                ...getWidthSettings(),
                ...getHeightSettings(),
                ...slideRevealSettings,
                ...initStyleSettings,
                ...rwdMarginSettings,
            ]
        // case 'marquee':
        //     return [
        //         ...hideOnDeviceSettings,
                
        //         // {"key": "full_width", "name": "最大寬度", "type": "checkbox", "inputType": "checkbox"}, 
                 
        //         // {"key": "background_color", "name": "背景顏色", "type": "rgba_color"}, 

        //         ...getWidthSettings(),
        //         ...getHeightSettings(),
        //         ...getFontSettings('marquee', '跑馬燈', '跑馬燈文字',
        //             [
        //                 {"key": "context", "name": "內文", "type": "textarea"}, 
        //                 {"key": "rwd_line_height", "name": "行高(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"},
        //             ]
        //         ),
        //         ...getBackgroundImageSettings('','','背景'),
        //         ...slideRevealSettings,
        //         ...initStyleSettings,
        //         // ...presentEmitEventSettings,
        //         // ...disapearEmitEventSettings,

        //     ]

        // case 'navigation_link':  deplicate
        //         return[
                    
        //             {"key": "text", "name": "內文", "type": "input",  "inputType": "text"}, 
        //             {"key": "text_align", "name": "文字對齊", "type": "select", "options": textAlignOptions, "name_key": "name", "value_key": "value"} ,
        //             {"key": "rwd_line_height", "name": "行高(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"}, 

        //             {"key": "to", "name": "頁面名稱", "type": "input",  "inputType": "text"}, 
        //             {'key': "icon_name", "name": "圖標", "type": "icon"},
        //             // {"key": "background_color", "name": "背景顏色", "type": "rgba_color"},

                    
        //             ...hideOnDeviceSettings,
        //             ...getWidthSettings(),
        //             ...getHeightSettings(),
        //             ...getFontSettings('text','', '文字'),
        //             ...getBorderSettings('', '', '邊線'),
        //             ...getShadowSettings('','','陰影'),

        //             {"type":"accordion",  "key":"", "name":'前景', "accordion_items":[
        //                 {"key": "text_background_color", "name": "前景顏色", "type": "rgba_color"},
        //                 {"key": "text_background_color2", "name": "前景顏色", "type": "rgba_color"},
        //             ]},
        //             ...getBackgroundImageSettings('','','背景'),
        //             ...slideRevealSettings,
        //             ...initStyleSettings,

        //             ...rwdMarginSettings,
        //             ...rwdPaddingSettings,
    
        //         ]
        case 'hyper_link':
                return[

                    {"type":"accordion",  "key":`expand_hyper_link_accordion`, "name":'超連結', "accordion_items":[
                      

                        {"key": "function", "name": "功能", "type": "select", "options": hyperLinkFunctionOptions, "name_key": "name", "value_key": "value"} ,

                        {"key": "href", "name": "超連結", "type": "input",  "inputType": "text"}, 
                        {'key': "icon_name", "name": "圖標", "type": "icon"},

                        {"key": "scroll_to", "name": "傳送至", "type": "input",  "inputType": "text"}, 
                        {"key": "scroll_into_view_block", "name": "垂直對齊", "type": "select", "options": scrollAlignOptions, "name_key": "name", "value_key": "value"},      
                        {"key": "scroll_into_view_inline", "name": "水平對齊", "type": "select", "options": scrollAlignOptions, "name_key": "name", "value_key": "value"},     
                    ]},
                   
                    // {"key": "background_color", "name": "背景顏色", "type": "rgba_color"},


                    // {"type":"accordion",  "key":`expand_scroll_accordion`, "name":'滑動參數', "accordion_items":[
                    //     {"key": "scroll_to", "name": "傳送至", "type": "input",  "inputType": "text"}, 
                    //     {"key": "scroll_into_view_block", "name": "垂直對齊", "type": "select", "options": scrollAlignOptions, "name_key": "name", "value_key": "value"},      
                    //     {"key": "scroll_into_view_inline", "name": "水平對齊", "type": "select", "options": scrollAlignOptions, "name_key": "name", "value_key": "value"},      
                    // ]},
                    ...hideOnDeviceSettings,
                    ...getWidthSettings(),
                    ...getHeightSettings(),
                    ...getFontSettings('text','', '文字',[
                        {"key": "text", "name": "內文", "type": "input",  "inputType": "text"}, 
                        {"key": "text_align", "name": "文字對齊", "type": "select", "options": textAlignOptions, "name_key": "name", "value_key": "value"} ,
                        {"key": "rwd_line_height", "name": "行高(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"}, 
                    ]),
                    ...getBorderSettings('', '', '邊線'),
                    ...getShadowSettings('','','陰影'),

                    // {"type":"accordion",  "key":`expand_text_background_accordion`, "name":'前景', "accordion_items":[
                    //     {"key": "text_background_color", "name": "前景顏色", "type": "rgba_color"},
                    //     {"key": "text_background_color2", "name": "前景顏色2", "type": "rgba_color"},
                    //     {'key': `text_background_image`, "name": `前景圖片`, "type": "image"},
                    //     {"key": `text_background_size`, "name": `響應前景圖片配置(XXL,XL,LG,MD,SM,XS,XXS)-(x%,y%)`, "type": "input_or_select",  
                    //         "options": backgroundSizeOptions, "name_key": "name", "value_key": "value"}, 
                    //     {"key": `text_background_position`, "name": `響應前景圖片位置(XXL,XL,LG,MD,SM,XS,XXS)-(x%,y%)`, "type": "input_or_select",  "inputType": "text",  
                    //         "options": backgroundPositionOptions, "name_key": "name", "value_key": "value"},
                    //     {"key": `text_background_repeat`, "name": `前景圖片重複`, "type": "select",  
                    //         "options": backgroundRepeatOptions, "name_key": "name", "value_key": "value"},
                    // ]},
                    ...getBackgroundImageSettings('','','背景'),
                    ...slideRevealSettings,
                    ...initStyleSettings,

                    ...rwdMarginSettings,
                    ...rwdPaddingSettings,
                    // ...presentEmitEventSettings,
                    // ...disapearEmitEventSettings,
    
                ]
        // case 'slider':



        //     return [

        //         {"key": "slider_name", "name": "輪播強樣式", "type": "select", "options": [{"name": "1", "value": "1"}, {"name": "2", "value": '2'}], "name_key": "name", "value_key": "value"} ,
        //         {"key": "full_width", "name": "最大寬度", "type": "checkbox", "inputType": "checkbox"}, 
        //         // {"key": 'data_list', "name": "選擇輪播頁", "type": "search_select", "multiple":true, "name_keys":['name'], "value_key":'id', "search_request":searchSliderRequest},
        //         {"key": "tags", "name": "輪播牆標籤(使用,隔開)", "type": "input",  "inputType": "text"}, 


        //         {"type":"accordion",  "key":`expand_slider_background_accordion`, "name":"輪播頁", "accordion_items":[
        //             {"key": "slider_background_color", "name": "背景顏色", "type": "rgba_color"}, 

        //             {"key": `slider_background_size`, "name": `響應圖片配置(XXL,XL,LG,MD,SM,XS,XXS)-(x% y%)`, "type": "input_or_select",  
        //                 "options": backgroundSizeOptions, "name_key": "name", "value_key": "value"}, 
        //             {"key": `slider_background_position`, "name": `響應圖片位置(XXL,XL,LG,MD,SM,XS,XXS)-(x% y%)`, "type": "input_or_select",  
        //                 "options": backgroundPositionOptions, "name_key": "name", "value_key": "value"},
        //             {"key": `slider_background_repeat`, "name": `圖片重複`, "type": "select",  
        //                 "options": backgroundRepeatOptions, "name_key": "name", "value_key": "value"},
        //         ]},
        //         ...hideOnDeviceSettings,
        //         ...getWidthSettings(),
        //         ...getHeightSettings(),
        //         //---title---
        //         ...getFontSettings('title', '標題', '標題文字'),
        //         //---subtitle---
        //         ...getFontSettings('subtitle', '副標題', '副標題文字'),
        //         //---button---
        //         ...getFontSettings('button', '按鈕','按鈕文字'),
        //         ...getBorderSettings('button', '按鈕','按鈕邊線'),
        //         ...getBorderSettings('', '', '邊線'),
        //         ...getShadowSettings('','','陰影'),


        //     ]
        
        case 'custom_slider':

            return [

                {"type":"accordion",  "key":`expand_custom_slider_accordion`, "name":'輪播牆', "accordion_items":[
                    {"key": "autoplay_interval", "name": "置換間隔(微秒)", "type": "input", "inputType":"number", "dataType":"integer"}, 

                    {"key": "rwd_swiper_space_between", "name": "輪播頁間隔(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input", "inputType":"text"}, 
                    {"key": "rwd_swiper_slides_per_view", "name": "顯示個數(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input", "inputType":"text"}, 

                    {"key": "swiper_navigation", "name": "使用導覽", "type": "checkbox", "inputType": "checkbox"}, 
                    {"key": "swiper_pagination", "name": "使用分頁器", "type": "checkbox", "inputType": "checkbox"}, 
                    {"key": "swiper_centered_slides", "name": "輪播頁置中", "type": "checkbox", "inputType": "checkbox"}, 
                    {"key": "swiper_grab_cursor", "name": "抓取游標", "type": "checkbox", "inputType": "checkbox"}, 
                    {"key": "swiper_free_mode", "name": "自由滑動", "type": "checkbox", "inputType": "checkbox"}, 
                    {"key": "swiper_loop", "name": "無限循環", "type": "checkbox", "inputType": "checkbox"}, 

                    {"key": "swiper_effect", "name": "特效", "type": "input_or_select",  "inputType": "text",  "options": [{"name": "漸變", "value": "fade"}], "name_key": "name", "value_key": "value"},

                    // swiper_navigation
                    // swiper_pagination
                    // swiper_effect
                    // swiper_centered_slides
                    // swiper_grab_cursor
                    // swiper_free_mode




                ]},
                ...hideOnDeviceSettings,

                // ...getBackgroundImageSettings('','','背景'),
                ...getWidthSettings(),
                ...getHeightSettings(),

                ...slideRevealSettings,
                ...initStyleSettings,
                ...getBorderSettings('', '', '邊線'),
                ...getShadowSettings('','','陰影'),
                ...rwdMarginSettings,
                // ...presentEmitEventSettings,
                // ...disapearEmitEventSettings,

            ]
        
        // case 'custom_slider_slide':

        //     return [
        //         {"type":"accordion",  "key":`expand_custom_slider_slide_accordion`, "name":'輪播頁面', "accordion_items":[
        //             {"key": "public", "name": "公開", "type": "checkbox", "inputType": "checkbox"}, 
        //         ]},
        //         ...getBackgroundImageSettings('','','背景'),
        //         ...getBorderSettings('', '', '邊線'),
        //         ...getShadowSettings('','','陰影'),
        //     ]

        // case 'banner_list':


        //     const searchBannerRequest = (keyword, page)=>{
        //         var _filter_ids, _keyword, _page
        //         return dev_user_search_banner(_filter_ids='', _keyword=keyword, _page=page)
        //     }
        //     return [

        //         {"key": "banner_name", "name": "廣告樣式", "type": "select", "options": [{"name": "1", "value": "1"}], "name_key": "name", "value_key": "value"} ,
        //         {"key": "full_width", "name": "最大寬度", "type": "checkbox", "inputType": "checkbox"}, 
        //         {"key": 'data_list', "name": "選擇廣告", "type": "search_select", "multiple":true, "name_keys":['name'], "value_key":'id', "search_request":searchBannerRequest},
        //         ...hideOnDeviceSettings,
        //         ...getWidthSettings(),
        //         ...getHeightSettings(),
        //         //---title---
        //         ...getFontSettings('title','標題','標題文字'),
        //         //---subtitle---
        //         ...getFontSettings('subtitle','副標題','副標題文字'),
        //         //---button---
        //         ...getFontSettings('button','按鈕','按鈕文字'),
        //     ]


        case 'text':
            return [

               
                ...hideOnDeviceSettings,
                ...getFontSettings('','', '文字',
                    [
                        {"key": "text", "name": "內文", "type": "input", "inputType":"text"}, 
                        {"key": "text_align", "name": "文字對齊", "type": "select", "options": textAlignOptions, "name_key": "name", "value_key": "value"} ,
                        {"key": "rwd_line_height", "name": "行高(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"}, 
                    ],
                    // [
                    //     {"key": "background_color", "name": "背景顏色", "type": "rgba_color"}, 
                    // ]
                ),
                ...getBackgroundImageSettings('','','背景'),
                ...getBorderSettings('', '', '邊線'),
                ...getWidthSettings(),
                ...getHeightSettings(),
                ...slideRevealSettings,
                ...initStyleSettings,

                ...rwdMarginSettings,
                // ...rwdPaddingSettings,
                // ...presentEmitEventSettings,
                // ...disapearEmitEventSettings,
            ]

        // case 'side_bar':   //deplicated
        //     return [


        //         {"type":"accordion",  "key":`expand_side_bar_accordion`, "name":'側邊欄', "accordion_items":[
                    
        //             {"key": "placement", "name": "放置", "type": "select", "options": offCanvasOptions, "name_key": "name", "value_key": "value"} ,
        //             {"key": "dropdown_background_color", "name": "側拉背景顏色", "type": "rgba_color"}, 
        //         ]},


        //         // {"key": "text", "name": "內文", "type": "input", "inputType":"text"}, 
        //         // {"key": "text_align", "name": "文字對齊", "type": "select", "options": textAlignOptions, "name_key": "name", "value_key": "value"} ,
                
        //         // {'key': "icon_name", "name": "圖標", "type": "icon"},

        //         ...hideOnDeviceSettings,
        //         ...getFontSettings('button','按鈕', '文字',[
        //             {"key": "text", "name": "內文", "type": "input", "inputType":"text"}, 
        //             {"key": "text_align", "name": "文字對齊", "type": "select", "options": textAlignOptions, "name_key": "name", "value_key": "value"} ,
                    
        //             {'key': "icon_name", "name": "圖標", "type": "icon"},

        //             {"key": "button_rwd_line_height", "name": "行高(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"}, 
        //         ]),
        //         ...getBorderSettings('button','按鈕', '邊線'),
        //         ...getBackgroundImageSettings('','按鈕','背景'),
        //         ...getWidthSettings(),
        //         ...getHeightSettings(),
        //         ...rwdMarginSettings,

        //     ]
        case 'my_account_button':
            return [

                ...getWidthSettings(),
                ...getHeightSettings(),
                ...rwdMarginSettings,
                ...hideOnDeviceSettings,

            ]

        case 'cart_button':
            return [

                ...getWidthSettings(),
                ...getHeightSettings(),
                ...rwdMarginSettings,
                ...hideOnDeviceSettings,

            ]



        case 'icon':
            return [
                // {"key": "rwd_font_size", "name": "響應字體大小(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"}, 
                // {"key": "font_color", "name": "文字顏色", "type": "rgba_color"}, 
                // {"key": "background_color", "name": "背景顏色", "type": "rgba_color"}, 

                ...hideOnDeviceSettings,

                ...getFontSettings('','', '文字',
                    [
                        {'key': "icon_name", "name": "圖標", "type": "icon"},
                        {"key": "text_align", "name": "文字對齊", "type": "select", "options": textAlignOptions, "name_key": "name", "value_key": "value"} ,
                        {"key": "rwd_line_height", "name": "行高(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"}, 
                    ]
                ),
                ...getWidthSettings(),
                ...getHeightSettings(),
                ...getBackgroundImageSettings('','圖標','背景'),
                ...getBorderSettings('', '圖標','邊線'),
                ...getShadowSettings('','','陰影'),
                ...slideRevealSettings,
                ...initStyleSettings,
                ...rwdMarginSettings,
                // ...presentEmitEventSettings,
                // ...disapearEmitEventSettings,

            ]
        
        case 'blog_post_detail':
                var searchBlogPostRequest = (keyword, page)=>{
                    var _store_uuid, _category_uuid, _visibility, _keyword, _order_by, _page, _page_size
                    return user_search_blog_post(
                        _store_uuid=store_uuid,    
                        _category_uuid='', 
                        _visibility='',   
                        _keyword=keyword, 
                        _order_by='priority',
                        _page=page, 
                        _page_size=25, 
                        )
                }
    
                return [
                    {"key": 'preview_data', "name": "預覽文章", "type": "search_select", "multiple":false, "name_keys":['title'], "value_key":'uuid', "search_request":searchBlogPostRequest},
                    // ...getWidthSettings(),//deplicated
                    // ...getHeightSettings(),//deplicated
                    // ...getBackgroundImageSettings('','圖標','背景'),//deplicated
                    // ...getBorderSettings('', '圖標','邊線'),//deplicated
                    // ...getShadowSettings('','','陰影'),//deplicated
                    // ...slideRevealSettings,//deplicated
                    // ...initStyleSettings,  //deplicated
                    ...rwdMarginSettings,
                ]

        case 'product_detail':
            var searchProductRequest1 = (keyword, page)=>{
                var _store_uuid, _category_uuid, _visibility, _keyword, _order_by, _page, _page_size
                return user_search_product( 
                    _store_uuid=store_uuid,    
                    _category_uuid='', 
                    _visibility='',   
                    _keyword=keyword, 
                    _order_by='priority',
                    _page=page, 
                    _page_size=25, )
            }

            return [
                {"key": 'preview_data', "name": "預覽商品", "type": "search_select", "multiple":false, "name_keys":['name'], "value_key":'uuid', "search_request":searchProductRequest1},
                // ...(productDetailSettings[0].accordion_items)
                ...rwdMarginSettings,
            ]

        case 'product_grid':

            const searchProductRequest = (keyword, page)=>{
                // var _filter_ids, _filter_categories, _filter_tags, _order_by, _keyword, _page
                var _filter_ids, _filter_categories, _filter_tags, _exclude_ids, _exclude_categories, _exclude_tags, _order_by, _keyword, _page
                return user_search_product()
            }
            // const searchProductCategoryRequest = (keyword, page)=>{
            //     var _keyword, _page
            //     return customer_search_product_category( _keyword=keyword, _page=page)
            // }

            return [

                {"key": 'data_list', "name": "選擇商品", "type": "search_select", "multiple":true, "name_keys":['name'], "value_key":'id', "search_request":searchProductRequest},

                {"key": "filter_tags", "name": "篩選標籤(使用,隔開)", "type": "input",  "inputType": "text"}, 
                {"key": "exclude_tags", "name": "去除標籤(使用,隔開)", "type": "input",  "inputType": "text"}, 

                ...getWidthSettings(),

                {"type":"accordion",  "key":`expand_background_color_accordion`, "name":'背景', "accordion_items":[
                    {"key": "background_color", "name": "背景顏色", "type": "rgba_color"}, 
                ]},


                ...getHeightSettings('image', '圖片', '商品圖片高度'),
                // ...getWidthSettings('image', '圖片', '商品圖片寬度'),


                {"type":"accordion",  "key":`expand_image_rwd_width_accordion`, "name":'商品圖片寬度', "accordion_items":[
                    {"key": `image_rwd_width`, "name": `圖片響應寬度佔比(XXL,XL,LG,MD,SM,XS,XXS)`, "type": "input",  "inputType": "text"}, 
                  
            
                ]},


                ...getBorderSettings('image','商品圖片','商品圖片邊線'),
                // ...getFontSettings('description','商品介紹', '商品介紹文字'),

                // {"key": "image_height", "name": "圖片高度", "type": "input",  "inputType": "number"}, 
                // {"key": "font_color1", "name": "名稱顏色", "type": "rgba_color"},
                // {"key": "font_color2", "name": "價錢顏色", "type": "rgba_color"},
                // {"key": "font_color3", "name": "動畫文字顏色", "type": "rgba_color"},
                // {"key": "background_color2", "name": "動畫顏色", "type": "rgba_color"},
                
                ...getFontSettings('product_name','商品名稱', '商品名稱文字'),
                ...getFontSettings('price','價錢', '價錢文字'),
                ...getFontSettings('action','動作', '動作文字'),

                {"type":"accordion",  "key":`expand_action_background_accordion`, "name":'動作背景', "accordion_items":[
                    {"key": "action_background_color", "name": "動作背景顏色", "type": "rgba_color"}, 
                    {"key": "action_background_color2", "name": "動作背景顏色2", "type": "rgba_color"}, 
                ]},


                ...productDetailSettings,

               

            ]
        case 'shop_grid':

            return [
                    
                    
                    ...getWidthSettings(),
                    ...getHeightSettings(),
                    ...rwdMarginSettings,
                    ...rwdPaddingSettings,

                    {"key": "default_layout", "name": "預設佈局", "type": "select", "options": [{"name": "列", "value": "列"}, {"name": "大格子", "value": "大格子"}, {"name": "小格子", "value": "小格子"}], "name_key": "name", "value_key": "value"} ,
                    {"key": "filter_tags", "name": "篩選標籤(使用,隔開)", "type": "input",  "inputType": "text"}, 
                    {"key": "exclude_tags", "name": "去除標籤(使用,隔開)", "type": "input",  "inputType": "text"}, 

                    {"type":"accordion",  "key":`expand_background_accordion`, "name":'背景', "accordion_items":[
                        {"key": "background_color", "name": "背景顏色", "type": "rgba_color"}, 
                    ]},
                    {"type":"accordion",  "key":`expand_grid_settings_accordion`, "name":'網格', "accordion_items":[
                        {"key": "grid_row_gap", "name": "列間距", "type": "input", "inputType": "number"}, 
                        {"key": "grid_column_padding", "name": "行間距", "type": "input", "inputType": "number"}, 
                        {"key": "mobile_column_flex_basis", "name": "手機響應佈局", "type": "select", "options": [{"name": "1行", "value": "100%"}, {"name": "2行", "value": "50%"}], "name_key": "name", "value_key": "value"} ,

                    ]},
                    ...getFontSettings('product_name','商品名稱', '商品名稱文字'),
                    ...getFontSettings('price','價錢', '價錢文字',[
                        {"key": "price_rwd_line_height", "name": "價錢行高(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"}, 
                        {"key": "old_price_rwd_line_height", "name": "原價行高(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"}, 

                    ]),
                    ...getFontSettings('action','動作', '動作文字'),

                    {"type":"accordion",  "key":`expand_action_background_accordion`, "name":'動作背景', "accordion_items":[
                        {"key": "action_background_color", "name": "動作背景顏色", "type": "rgba_color"}, 
                        {"key": "action_background_color2", "name": "動作背景顏色2", "type": "rgba_color"}, 
                    ]},
                    ...getFontSettings('description','商品介紹', '商品介紹文字'),
                    ...getBorderSettings('image','商品圖片','商品圖片'),
                    
                    {"type":"accordion",  "key":`expand_badge_accordion`, "name":'商品徽章', "accordion_items":[
                        {"key": "new_product_font_color", "name": "新品文字顏色", "type": "rgba_color"}, 
                        {"key": "new_product_badge_color", "name": "新品徽章顏色", "type": "rgba_color"}, 
                        {"key": "discount_percent_font_color", "name": "折扣文字顏色", "type": "rgba_color"}, 
                        {"key": "discount_percent_badge_color", "name": "折扣徽章顏色", "type": "rgba_color"}, 

                    ]},
                    
                    ...productDetailSettings,


                    



            ]
        
        // case 'shop_gallery':

        //     return [
                    
        //             ...getWidthSettings(),
        //             ...getHeightSettings(),
        //             ...rwdMarginSettings,
        //             ...rwdPaddingSettings,

        //             {"key": "filter_tags", "name": "篩選標籤(使用,隔開)", "type": "input",  "inputType": "text"}, 
        //             {"key": "exclude_tags", "name": "去除標籤(使用,隔開)", "type": "input",  "inputType": "text"}, 

        //             {"type":"accordion",  "key":"", "name":'背景', "accordion_items":[
        //                 {"key": "background_color", "name": "背景顏色", "type": "rgba_color"}, 
        //             ]},

        //             ...getFontSettings('product_name','商品名稱', '商品名稱文字'),
        //             ...getFontSettings('price','價錢', '價錢文字',[
        //                 {"key": "price_rwd_line_height", "name": "價錢行高(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"}, 
        //                 {"key": "old_price_rwd_line_height", "name": "原價行高(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"}, 

        //             ]),
        //             ...getFontSettings('action','動作', '動作文字'),

        //             {"type":"accordion",  "key":"", "name":'動作背景', "accordion_items":[
        //                 {"key": "action_background_color", "name": "動作背景顏色", "type": "rgba_color"}, 
        //                 {"key": "action_background_color2", "name": "動作背景顏色2", "type": "rgba_color"}, 
        //             ]},
        //             ...getFontSettings('description','商品介紹', '商品介紹文字'),
        //             ...getBorderSettings('image','商品圖片','商品圖片'),
                    

        //             {"type":"accordion",  "key":"", "name":'商品徽章', "accordion_items":[
        //                 {"key": "new_product_font_color", "name": "新品文字顏色", "type": "rgba_color"}, 
        //                 {"key": "new_product_badge_color", "name": "新品徽章顏色", "type": "rgba_color"}, 
        //                 {"key": "discount_percent_font_color", "name": "折扣文字顏色", "type": "rgba_color"}, 
        //                 {"key": "discount_percent_badge_color", "name": "折扣徽章顏色", "type": "rgba_color"}, 

        //             ]},
        //             ...productDetailSettings,

        //     ]

        case 'shop_side_bar':

            return [
                    {"key": "background_color", "name": "背景顏色", "type": "rgba_color"}, 
                    
                    ...getWidthSettings(),
                    ...getHeightSettings(),
                    ...getFontSettings('title','', '標題文字',[
                        {"key": "title_rwd_line_height", "name": "行高(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"}, 

                    ]),
                    ...getBorderSettings('search','','搜尋列',[
                        {"key": "search_icon_color", "name": "圖標顏色", "type": "rgba_color"}, 
                    ]),
                    ...getFontSettings('category','', '類別文字',[
                        {"key": "category_rwd_line_height", "name": "行高(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"}, 
                    ]),
                    // ...getFontSettings('action','動作', '動作文字'),
                    ...rwdMarginSettings,
                    ...rwdPaddingSettings,

            ]
        // case 'customer_chat':
        //     return [
        //         {"type":"accordion",  "key":"", "name":'圖標', "accordion_items":[
        //             {"key": "icon_background_color", "name": "圖標背景顏色", "type": "rgba_color"}, 
        //             {"key": "icon_color", "name": "圖標顏色", "type": "rgba_color"}, 
        //         ]},
                

        //         {"type":"accordion",  "key":"", "name":'聯絡人', "accordion_items":[
        //             {"key": "contact_background_color", "name": "聯絡人背景顏色", "type": "rgba_color"}, 
        //             {"key": "contact_text_color", "name": "聯絡人文字顏色", "type": "rgba_color"}, 
        //         ]},

                

        //         {"type":"accordion",  "key":"", "name":'對話', "accordion_items":[
        //             {"key": "customer_message_background_color", "name": "顧客訊息背景顏色", "type": "rgba_color"}, 
        //             {"key": "store_message_background_color", "name": "商家訊息背景顏色", "type": "rgba_color"}, 
        //             {"key": "message_text_color", "name": "訊息文字顏色", "type": "rgba_color"},
        //         ]},

                 


        //     ]
        // case 'portal':  deplicate
            
        //     return[

        //         {"type":"accordion",  "key":"", "name":'滑動Portal', "accordion_items":[
        //             {"key": "_id", "name": "傳送點ID", "type": "input",  "inputType": "text"}, 
        //             {"key": "to", "name": "傳送至", "type": "input",  "inputType": "text"}, 
        //             {"key": "scroll_into_view_block", "name": "垂直對齊", "type": "select", "options": scrollAlignOptions, "name_key": "name", "value_key": "value"},      
        //             {"key": "scroll_into_view_inline", "name": "水平對齊", "type": "select", "options": scrollAlignOptions, "name_key": "name", "value_key": "value"},      

        //         ]},

                
        //         {"type":"accordion",  "key":"", "name":'圖標', "accordion_items":[
        //             {'key': "icon_name", "name": "前圖標", "type": "icon"},
        //             {'key': "icon_name2", "name": "後圖標", "type": "icon"},
        //         ]},

        //         ...getWidthSettings(),
        //         ...getHeightSettings(),
        //         ...getFontSettings('','', '文字',[
        //             {"key": "text", "name": "內文", "type": "input",  "inputType": "text"}, 
        //             {"key": "text_align", "name": "文字對齊", "type": "select", "options": textAlignOptions, "name_key": "name", "value_key": "value"} ,
        //             {"key": "rwd_line_height", "name": "行高(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"}, 
        //         ]),
        //         ...getBorderSettings('', '', '邊線'),
        //         ...getShadowSettings('','','陰影'),

        //         ...getBackgroundImageSettings('', '', '背景'),
        //         ...rwdMarginSettings,
        //         ...rwdPaddingSettings,

        //     ]

        case 'website_search_bar':
            
            return[
                
                // {"key": "dimension", "name": "元件象限", "type": "select", "options": dimensionOptions,"name_key": "name", "value_key": "value"}, 

                ...getWidthSettings(),
                ...getHeightSettings(),

                // ...getBackgroundImageSettings('', '', '背景'),

                // ...getWidthSettings('dropdown','彈出框', '彈出框'),
                // ...getBorderSettings('dropdown','彈出框','彈出框邊線'),

                // ...getFontSettings('search_bar', '搜尋欄', '搜尋欄文字',
                //     [{"key": "search_bar_rwd_line_height", "name": "搜尋欄行高(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"}, ]
                // ),
                // ...getBorderSettings('search_bar','搜尋欄','搜尋欄邊線'),


                // ...getFontSettings('result_title', '標題', '結果標題',
                //     [{"key": "result_title_rwd_line_height", "name": "標題行高(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"}, ]
                // ),

                // ...getFontSettings('result_paragraph', '內文', '結果內文',
                //     [{"key": "result_title_rwd_line_height", "name": "內文行高(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"}, ]
                // ),
                ...slideRevealSettings,
                ...initStyleSettings,
                ...rwdMarginSettings,


            ]
        
        case 'google_map':
            return [

                {"key": "api_key", "name": "金鑰", "type": "input",  "inputType": "text"},

                {"key": `lat`, "name": `經度`, "type": "input",  "inputType": "number", "dataType":'float'}, 
                {"key": `lng`, "name": `緯度`, "type": "input",  "inputType": "number", "dataType":'float'}, 
                {"key": `zoom`, "name": `縮放`, "type": "input",  "inputType": "number"}, 

                ...getWidthSettings(),
                ...getHeightSettings(),
                ...slideRevealSettings,
                ...rwdMarginSettings,
                ...hideOnDeviceSettings,
            ]
        
        case 'contact_us_form':
            return [

                // {"key": "api_key", "name": "金鑰", "type": "input",  "inputType": "text"},

                // {"key": `lat`, "name": `經度`, "type": "input",  "inputType": "number"}, 
                // {"key": `lng`, "name": `緯度`, "type": "input",  "inputType": "number"}, 
                // {"key": `zoom`, "name": `縮放`, "type": "input",  "inputType": "number"}, 
                // ...getBorderSettings('','邊線','邊線'),
                // ...getBackgroundImageSettings('', '', '背景'),
                // ...getShadowSettings('','','陰影'),


                // ...getFontSettings('title','', '標題文字',[
                //     {"key": "title_rwd_line_height", "name": "行高(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"}, 

                // ]),

                // ...getFontSettings('label','', '標籤文字',[
                //     {"key": "label_rwd_line_height", "name": "行高(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"}, 
                // ]),
                // ...getBorderSettings('input','','輸入邊線'),


                // ...getFontSettings('submit','', '送出按鈕文字',[
                //     {"key": "submit_rwd_line_height", "name": "行高(XXL,XL,LG,MD,SM,XS,XXS)", "type": "input",  "inputType": "text"}, 
                // ]),
                // ...getBorderSettings('submit','','送出按鈕邊線'),


                // {"type":"accordion",  "key":`expand_submit_background_accordion`, "name":"送出按鈕背景", "accordion_items":[
                //     {"key": `submit_background_color`, "name": `背景顏色`, "type": "rgba_color"},
                //     {"key": `submit_background_color2`, "name": `背景顏色2`, "type": "rgba_color"},
                // ]},

                // ...getShadowSettings('submit','','送出按鈕陰影'),
                


                ...getWidthSettings(),
                ...getHeightSettings(),
                ...slideRevealSettings,
                ...initStyleSettings,
                ...rwdMarginSettings,
                // ...presentEmitEventSettings,
                // ...disapearEmitEventSettings,
            ]
        
        case 'my_orders':
            return [
                {"type":"accordion",  "key":`expand_my_orders_accordion`, "name":'我的訂單', "accordion_items":[
                    {"key": "default_order_status", "name": "預設狀態", "type": "input",  "inputType": "text"}, 
                ]}
            ]



        default:
            return [
    
                // {"type":"inline","inline_items":[
                //     {"key": "width", "name": "寬度", "type": "input",  "inputType": "number"}, 
                //     {"key": "width_unit", "name": "寬度單位", "type": "select", "options": [{"name": "px", "value": "px"}, {"name": "%", "value": "%"}, {"name": "vw", "value": "vw"}, {"name": "", "value": null}], "name_key": "name", "value_key": "value"} 
                // ]},
                
                // {"type":"inline","inline_items":[
                //     {"key": "height", "name": "高度", "type": "input",  "inputType": "number"}, 
                //     {"key": "height_unit", "name": "高度單位", "type": "select", "options": [{"name": "px", "value": "px"}, {"name": "vh", "value": "vh"}, {"name": "", "value": null}], "name_key": "name", "value_key": "value"} 
                // ]},
               
                // {"key": "margin_top", "name": "頂部邊際", "type": "input",  "inputType": "number"},
                // {"key": "margin_bottom", "name": "底部邊際", "type": "input",  "inputType": "number"}, 
                // {"key": "margin_left", "name": "左側邊際", "type": "input",  "inputType": "number"}, 
                // {"key": "margin_right", "name": "右側邊際", "type": "input",  "inputType": "number"}, 
                // {"key": "margin_unit", "name": "邊際單位", "type": "select", "options": [{"name": "px", "value": "px"}, {"name": "%", "value": "%"}], "name_key": "name", "value_key": "value"}, 
                
                // {"key": "padding_top", "name": "頂部填充", "type": "input",  "inputType": "number"}, 
                // {"key": "padding_bottom", "name": "底部填充", "type": "input",  "inputType": "number"}, 
                // {"key": "padding_left", "name": "左側填充", "type": "input",  "inputType": "number"}, 
                // {"key": "padding_right", "name": "右側填充", "type": "input",  "inputType": "number"}, 
                // {"key": "padding_unit", "name": "填充單位", "type": "select", "options": [{"name": "px", "value": "px"}, {"name": "%", "value": "%"}], "name_key": "name", "value_key": "value"}, 
            
            ]


    
    }
}










