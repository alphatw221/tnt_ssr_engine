

export function getElementBaseSettingsA({createChildElement, removeElement}){
    
    return [
        {"type":"inline","inline_items":[
            {"type":'button',"action":createChildElement, "name":'新增子元素', "style":{"marginTop":'20px'}, "variant":'danger'},
            {"type":'button',"action":removeElement, "name":'刪除元素', "style":{"marginTop":'20px'}, "variant":'danger'},
        ]},
        {"key": "uuid", "name": "節點UUID", "type": "text"}, 
        {"key": "name", "name": "名稱", "type": "input",  "inputType": "text"}, 
    
        
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
    
}




export function getElementBaseSettingsB(){
    
    return [
    
        {"type":"accordion", "key":`expand_element_accordion`, "name":'元素', "accordion_items":[
            {"key": "tag_name", "name": "標籤名稱", "type": "input",  "inputType": "text"}, 
            {"key": "type", "name": "使用組件", "type": "select", "options": [
                {"name": "輪播牆", "value": "custom_slider"}, 
                {"name": "文字編輯器", "value": "ck_editor"}, 
                {"name": "顧客登入表單", "value": "customer_login_form"}, 
                {"name": "顧客註冊表單", "value": "customer_register_form"}, 
                {"name": "商品內容", "value": "product_detail"}, 
                {"name": "購物車內容", "value": "cart_detail"}, 
                {"name": "結帳表單", "value": "checkout_form"}, 
                {"name": "訂單付款", "value": "order_payment"}, 
                {"name": "我的訂單", "value": "my_orders"}, 
                {"name": "我的帳戶按鈕", "value": "my_account_button"}, 
                {"name": "購物車按鈕", "value": "cart_button"}, 
                {"name": "商城", "value": "shop"}, 
                {"name": "站內搜索", "value": "website_search_bar"}, 
                {"name": "Google地圖", "value": "google_map"}, 
                {"name": "聯絡我們表單", "value": "contact_us_form"}, 
                {"name": "文章內容", "value": "blog_post_detail"}, 
            ], "name_key": "name", "value_key": "value"},      
            {"key": "props", "name": "屬性", "type": "json", "rows":10}, 
        ]},
        {"type":"accordion", "key":`expand_html_accordion`, "name":'內嵌文字', "accordion_items":[
            {"key": "inner_html", "name": "內嵌文字", "type": "monaco_editor", "height":"95vh", "options":{"fontSize":"20px"}}, 
        ]},
        
       
        
    
    ]
    
}








