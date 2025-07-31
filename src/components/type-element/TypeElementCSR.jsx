import PropTypes from "prop-types";
import React, { lazy } from "react";




import CustomSliderCSR from "@/components/component-instance/custom-slider/CustomSliderCSR"

import LoginForm from "../component-instance/LoginForm"
import RegisterForm from "../component-instance/RegisterForm"
import CartDetail from "@/components/component-instance/cart/CartDetail"
import CheckoutForm from "@/components/component-instance/cart/CheckoutForm"
import CartButton from "@/components/component-instance/cart/CartButton"
import MyOrders from "@/components/component-instance/order/MyOrders"
// import OrderDetail from "@/components/component-instance/order/OrderDetail"
import OrderPayment from "@/components/component-instance/order/OrderPayment"
import MyAccountButton from "../component-instance/MyAccountButton"
import WebsiteSearchBar from "../component-instance/WebsiteSearchBar"
import GoogleMap from "../component-instance/GoogleMap"
import ContactUsForm from "../component-instance/ContactUsForm"
import Shop from "@/components/component-instance/shop-product/Shop"
import CKEditor from '../component-instance/my-ckeditor/CKEditor'
import ProductDetailCSR from "@/components/component-instance/product-detail/ProductDetailCSR"
import BlogPostDetailCSR from '../component-instance/blog-post-detail/BlogPostDetailCSR'




const TypeElementCSR = ({ 
     element, children, ...props}) => {
    
    switch(element?.type){
        case 'custom_slider':
            return (<CustomSliderCSR 
                element={element}  {...props}/>)  
        case 'ck_editor':
            return (<CKEditor 
               element={element}  {...props}/>)         
        case 'customer_login_form':
            return (<LoginForm 
               element={element}  {...props}/>)  
        case 'customer_register_form':
            return (<RegisterForm 
                element={element}  {...props}/>)       
        case 'product_detail':
            return (<ProductDetailCSR 
                element={element}  {...props}/>)  
        case 'cart_detail':
            return (<CartDetail 
                 element={element}  {...props}/>)  
        case 'checkout_form':
            return (<CheckoutForm 
                element={element}  {...props}/>) 
        // case 'order_detail':
        //     return (<OrderDetail 
        //         element={element}  {...props}/>)  
        case 'order_payment':
            return (<OrderPayment 
             element={element}  {...props}/>)  
        case 'my_orders':
            return (<MyOrders 
                element={element}  {...props}/>)  
        case 'my_account_button':
            return (<MyAccountButton 
                element={element}  {...props}/>)  
        case 'cart_button':
            return (<CartButton 
               element={element}  {...props}/>)  
        case 'shop':
            return (<Shop 
                element={element}  {...props}/>)
        case 'website_search_bar':
            return (<WebsiteSearchBar 
               element={element}  {...props}/>)  
        case 'google_map':
            return (<GoogleMap 
                 element={element}  {...props}/>)  
        case 'contact_us_form':
            return (<ContactUsForm 
                  element={element}  {...props}/>)  
        case 'blog_post_detail': 
            return (<BlogPostDetailCSR 
                 element={element}  {...props}/>)  
       
        default:
            return (<div>{element?.type}</div>)

    }

};

TypeElementCSR.propTypes = {

};

export default TypeElementCSR;
