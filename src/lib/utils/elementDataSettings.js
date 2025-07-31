
import {user_search_blog_post} from "@/api/blog_post"
import {user_search_product} from "@/api/product"







export function getElementDataSettings(type, store_uuid){

    switch(type){

     
        
        case 'ck_editor':
            return [
            ]
        
        
        
            
        case 'customer_login_form':
            return [
            ]
        case 'customer_register_form':
            return [
            ]
       
       
        
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
              

            ]
        
       


     
        case 'my_account_button':
            return [

            ]

        case 'cart_button':
            return [
            

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

            ]

        case 'product_grid':

            const searchProductRequest = (keyword, page)=>{
                // var _filter_ids, _filter_categories, _filter_tags, _order_by, _keyword, _page
                var _filter_ids, _filter_categories, _filter_tags, _exclude_ids, _exclude_categories, _exclude_tags, _order_by, _keyword, _page
                return user_search_product()
            }
   

            return [

                {"key": 'data_list', "name": "選擇商品", "type": "search_select", "multiple":true, "name_keys":['name'], "value_key":'id', "search_request":searchProductRequest},

                {"key": "filter_tags", "name": "篩選標籤(使用,隔開)", "type": "input",  "inputType": "text"}, 
                {"key": "exclude_tags", "name": "去除標籤(使用,隔開)", "type": "input",  "inputType": "text"}, 


            ]
        case 'shop_grid':

            return [

                    {"key": "default_layout", "name": "預設佈局", "type": "select", "options": [{"name": "列", "value": "列"}, {"name": "大格子", "value": "大格子"}, {"name": "小格子", "value": "小格子"}], "name_key": "name", "value_key": "value"} ,
                    {"key": "filter_tags", "name": "篩選標籤(使用,隔開)", "type": "input",  "inputType": "text"}, 
                    {"key": "exclude_tags", "name": "去除標籤(使用,隔開)", "type": "input",  "inputType": "text"}, 
  



            ]
        
       

        case 'shop_side_bar':

            return [


            ]
        

        case 'website_search_bar':
            
            return[
                
             

            ]
        
        case 'google_map':
            return [

                {"key": "api_key", "name": "金鑰", "type": "input",  "inputType": "text"},

                {"key": `lat`, "name": `經度`, "type": "input",  "inputType": "number", "dataType":'float'}, 
                {"key": `lng`, "name": `緯度`, "type": "input",  "inputType": "number", "dataType":'float'}, 
                {"key": `zoom`, "name": `縮放`, "type": "input",  "inputType": "number"}, 

            ]
        
        case 'contact_us_form':
            return [

  
            ]
        
        case 'my_orders':
            return [
                {"type":"accordion",  "key":`expand_my_orders_accordion`, "name":'我的訂單', "accordion_items":[
                    {"key": "default_order_status", "name": "預設狀態", "type": "input",  "inputType": "text"}, 
                ]}
            ]



        default:
            return [
    
            
            ]


    
    }
}










