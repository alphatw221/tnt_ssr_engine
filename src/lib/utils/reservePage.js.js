export const reservePages = ['product', 'cart', 'checkout', 'order', 'order_payment', 'my_orders', 'login', 'register', 'shop', 'blog', 'blog_post']
export function getReservePage(page_name){

    switch(page_name){
        case 'product':

            const product_detail = {
                "name":"商品",
                "type":"product_detail",
                "data":{},
            }
            const product_detail_section = {
                "name":"商品分段",
                "type":"section",
                "data":{
                    "background_color":{"r": "255","g": "255","b": "255","a": "1"},
                    "background_image":null,
                },
                "children":[product_detail],
                "children_matrix_3d":[[[
                    product_detail
                ]]],
            }
            return {
                "name":"商品", 
                "type":"webpage",
                "data":{
                    "use_layout":true,
                },
                "children":[product_detail_section],
                "children_matrix_3d":[[[
                    product_detail_section
                ]]],
            }

        case 'cart':
            const cart_detail = {
                "name":"購物車",
                "type":"cart_detail",
                "data":{},
            }
            const cart_section = {
                "name":"購物車分段",
                "type":"section",
                "data":{
                    "background_color":{"r": "255","g": "255","b": "255","a": "1"},
                    "background_image":null,
                },
                "children":[cart_detail],
                "children_matrix_3d":[[[
                    cart_detail
                ]]],
            }
            return {
                "name":"購物車", 
                "type":"webpage",
                "data":{
                    "use_layout":true,
                },
                "children":[cart_section],
                "children_matrix_3d":[[[
                    cart_section
                ]]],
            }
        case 'checkout':

            const checkout_form = {
                "name":"結帳表單",
                "type":"checkout_form",
                "data":{},
            }
            const checkout_section = {
                "name":"結帳表單分段",
                "type":"section",
                "data":{
                    "background_color":{"r": "255","g": "255","b": "255","a": "1"},
                    "background_image":null,
                },
                "children":[checkout_form],
                "children_matrix_3d":[[[
                    checkout_form
                ]]],
            }
            return {
                "name":"結帳", 
                "type":"webpage",
                "data":{
                    "use_layout":true,
                },
                "children":[checkout_section],
                "children_matrix_3d":[[[
                    checkout_section
                ]]],
            }

        case 'order':
            const order = {
                "name":"訂單",
                "type":"order_detail",
                "data":{},
            }
            const order_section = {
                "name":"訂單分段",
                "type":"section",
                "data":{
                    "background_color":{"r": "255","g": "255","b": "255","a": "1"},
                    "background_image":null,
                },
                "children":[order],
                "children_matrix_3d":[[[
                    order
                ]]],
            }
            return {
                "name":"訂單", 
                "type":"webpage",
                "data":{
                    "use_layout":true,
                },
                "children":[order_section],
                "children_matrix_3d":[[[
                    order_section
                ]]],
            }
        case 'order_payment':
            const order_payment = {
                "name":"付款",
                "type":"order_payment",
                "data":{},
            }
            const order_payment_section = {
                "name":"付款分段",
                "type":"section",
                "data":{
                    "background_color":{"r": "255","g": "255","b": "255","a": "1"},
                    "background_image":null,
                },
                "children":[order_payment],
                "children_matrix_3d":[[[
                    order_payment
                ]]],
            }
            return {
                "name":"付款", 
                "type":"webpage",
                "data":{
                    "use_layout":true,
                },
                "children":[order_payment_section],
                "children_matrix_3d":[[[
                    order_payment_section
                ]]],
            }
        case 'my_orders':
            const my_orders = {
                "name":"我的訂單",
                "type":"my_orders",
                "data":{},
            }
            const my_orders_section = {
                "name":"我的訂單分段",
                "type":"section",
                "data":{
                    "background_color":{"r": "255","g": "255","b": "255","a": "1"},
                    "background_image":null,
                },
                "children":[my_orders],
                "children_matrix_3d":[[[
                    my_orders
                ]]],
            }
            return {
                "name":"我的訂單", 
                "type":"webpage",
                "data":{
                    "use_layout":true,
                },
                "children":[my_orders_section],
                "children_matrix_3d":[[[
                    my_orders_section
                ]]],
            }
        case 'login':
            const login_form = {
                "name":"登入表單",
                "type":"login_form",
                "data":{
                    "rwd_margin_top":"10",
                    "rwd_margin_bottom":"10",
                    "margin_unit":"vh",
                },
            }
            const login_form_section = {
                "name":"登入表單分段",
                "type":"section",
                "data":{
                    "background_color":{"r": "255","g": "255","b": "255","a": "1"},
                    "background_image":null,
                    //rwd_height
                    "rwd_height":'80vh'
                },
                "children":[login_form],
                "children_matrix_3d":[[[
                    login_form
                ]]],
            }
            return {
                "name":"登入", 
                "type":"webpage",
                "data":{
                    "use_layout":true,
                },
                "children":[login_form_section],
                "children_matrix_3d":[[[
                    login_form_section
                ]]],
            }

        case 'register':
            const register_form = {
                "name":"註冊表單",
                "type":"register_form",
                "data":{
                    "rwd_margin_top":"10",
                    "rwd_margin_bottom":"10",
                    "margin_unit":"vh",
                },
            }
            const register_form_section = {
                "name":"註冊表單分段",
                "type":"section",
                "data":{
                    "background_color":{"r": "255","g": "255","b": "255","a": "1"},
                    "background_image":null,
                    "rwd_height":'80vh'
                },
                "children":[register_form],
                "children_matrix_3d":[[[
                    register_form
                ]]],
            }
            return {
                "name":"註冊", 
                "type":"webpage",
                "data":{
                    "use_layout":true,
                },
                "children":[register_form_section],
                "children_matrix_3d":[[[
                    register_form_section
                ]]],
            }
        case 'shop':
            const shop_side_bar = {
                "name":"商城側邊欄",
                "type":"shop_side_bar",
                "data":{
                    'rwd_margin_top':'5vh,,,0vh'
                },
            }

            const shop_grid = {
                "name":"商品網格",
                "type":"shop_grid",
                "data":{},
            }
            const shop_section = {
                "name":"商城分段",
                "type":"section",
                "data":{
                    "background_color":{"r": "255","g": "255","b": "255","a": "1"},
                    "background_image":null,
                    "column_justify_content":"start",
                },
                "children":[
                    shop_side_bar,
                    shop_grid
                ],
                "children_matrix_3d":[[
                    [shop_side_bar],
                    [shop_grid]
                ]],
            }
            return {
                "name":"商城", 
                "type":"webpage",
                "data":{
                    "use_layout":true,
                },
                "children":[
                    shop_section
                ],
                "children_matrix_3d":[[[
                    shop_section
                ]]],
            }
        case 'blog':
            const blog_side_bar = {
                "name":"部落格側邊欄",
                "type":"blog_side_bar",
                "data":{},
            }

            const blog_grid = {
                "name":"部落格網格",
                "type":"blog_grid",
                "data":{},
            }
            const blog_section = {
                "name":"部落格分段",
                "type":"section",
                "data":{
                    "background_color":{"r": "255","g": "255","b": "255","a": "1"},
                    "background_image":null,
                    "column_justify_content":"start",
                },
                "children":[blog_side_bar,blog_grid],
                "children_matrix_3d":[[
                    [blog_side_bar],
                    [blog_grid]
                ]],
            }
        return {
            "name":"部落格", 
            "type":"webpage",
            "data":{
                "use_layout":true,
            },
            "children":[blog_section],
            "children_matrix_3d":[[[
                blog_section
            ]]],
        }
        case 'blog_post':
            const blog_post_detail = {
                "name":"文章",
                "type":"blog_post_detail",
                "data":{},
            }
            const blog_post_detail_section = {
                "name":"文章分段",
                "type":"section",
                "data":{
                    "background_color":{"r": "255","g": "255","b": "255","a": "1"},
                    "background_image":null,
                },
                "children":[blog_post_detail],
               
            }
            return {
                "name":"文章", 
                "type":"webpage",
                "data":{
                    "use_layout":true,
                },
                "children":[blog_post_detail_section],
              
            }

        default:
            return {
                "name":"", 
                "use_layout":true,
                "fragments":[
                   
                ]
              }


    
    }
}
