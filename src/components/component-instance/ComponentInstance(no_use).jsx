// import PropTypes from "prop-types";
// import React, { lazy } from "react";


// import dynamic from "next/dynamic";

// import Marquee from "./Marquee"
// import Image from "./Image"
// import Text from "./Text"
// import EmptyBox from "./EmptyBox"
// import DropDownList from "./DropDownList"
// import Slider from "./Slider"
// // import CKEditor from "./CKEditor"
// import LoginForm from "./LoginForm"
// import RegisterForm from "./RegisterForm"
// import ProductDetail from "./ProductDetail"
// import CartDetail from "./CartDetail"
// import CheckoutForm from "./CheckoutForm"
// import OrderDetail from "./OrderDetail"
// import OrderPayment from "./OrderPayment"
// import MyOrders from "./MyOrders"
// import LoginButton from "./LoginButton"
// import CartButton from "./CartButton"
// import Icon from "./Icon"
// import ProductGrid from "./ProductGrid"
// import KPLink from "./KPLink"
// import ShopGrid from "./ShopGrid"
// import ShopGallery from "./ShopGallery"

// import ShopSideBar from "./ShopSideBar"
// import ComponentBox from "./NodeBox"
// import HoverBox from "./HoverBox"
// import AbsolutePositionComponentBox from "./AbsolutePositionNodeBox"
// import BlogGrid from "./BlogGrid"
// import BlogSideBar from "./BlogSideBar"
// import BlogPostDetail from "./BlogPostDetail"
// // import { Providers, PersistProvider } from '../../redux/provider'
// import SideBar from "./SideBar"
// import CustomerChat from "./CustomerChat"
// import Portal from "./Portal"
// import WebsiteSearchBar from "./WebsiteSearchBar"
// import GoogleMap from "./GoogleMap"
// import ContactUsForm from "./ContactUsForm"
// import CustomSlider from "./CustomSlider"

// const CKEditor = dynamic(() => import("./CKEditor"), { ssr: false });

// // import CKEditor from "./"

// const ComponentInstance = ({ 
//     // pageIndex, fragmentIndex, 
//     // rowIndex, columnIndex, columnRowIndex, 
//     component, mode, actions, update}) => {
    
//     // const CKEditor = dynamic(() => import("./CKEditor"), { ssr: false });

//     // console.log(component?.type)

//     switch(component?.type){
//         case 'component_box':
//             return (<ComponentBox 
//                 component={component} mode={mode} actions={actions} update={update}/>)
//         case 'hover_box':
//             return (<HoverBox 
//                 component={component} mode={mode} actions={actions} update={update}/>)
//         case 'absolute_position_component_box':
//             return (<AbsolutePositionComponentBox 
//                 component={component} mode={mode} actions={actions} update={update}/>)
//         case 'marquee':
//             return (<Marquee 
//                 component={component} mode={mode} actions={actions} update={update}/>)
//         case 'image':
//             return (<Image 
//                 component={component} mode={mode} actions={actions} update={update}/>)
//         case 'text':
//             return (<Text 
//                 component={component} mode={mode} actions={actions} update={update}/>)    
//         case 'empty_box':
//             return (
//             <EmptyBox 
//                 component={component} mode={mode} actions={actions} update={update}/>)   
//         case 'dropdown_list':
//             return (<DropDownList 
//                 component={component} mode={mode} actions={actions} update={update}/>)  
//         case 'custom_slider':
//             return (<CustomSlider 
//                 component={component} mode={mode} actions={actions} update={update}/>)  
//         case 'slider':
//             return (<Slider 
//                 component={component} mode={mode} actions={actions} update={update}/>)   
//         case 'ck_editor':
//             return (<CKEditor 
//                 component={component} mode={mode} actions={actions} update={update}/>)        
//         case 'login_form':
//             return (<LoginForm 
//                 component={component} mode={mode} actions={actions} update={update}/>)  
//         case 'register_form':
//             return (<RegisterForm 
//                 component={component} mode={mode} actions={actions} update={update}/>)        
//         case 'product_detail':
//             return (<ProductDetail 
//                 component={component} mode={mode} actions={actions} update={update}/>)  
//         case 'cart_detail':
//             return (<CartDetail 
//                 component={component} mode={mode} actions={actions} update={update}/>)  
//         case 'checkout_form':
//             return (<CheckoutForm 
//                 component={component} mode={mode} actions={actions} update={update}/>)  
//         case 'order_detail':
//             return (<OrderDetail 
//                 component={component} mode={mode} actions={actions} update={update}/>)  
//         case 'order_payment':
//             return (<OrderPayment 
//                 component={component} mode={mode} actions={actions} update={update}/>)  
//         case 'my_orders':
//             return (<MyOrders 
//                 component={component} mode={mode} actions={actions} update={update}/>)  
//         case 'login_button':
//             return (<LoginButton 
//                 component={component} mode={mode} actions={actions} update={update}/>)  
//         case 'icon':
//             return (<Icon 
//                 component={component} mode={mode} actions={actions} update={update}/>)  
//         case 'hyper_link':
//             return (<KPLink 
//                 component={component} mode={mode} actions={actions} update={update}/>)  
//         case 'navigation_link':
//             return (<KPLink 
//                 component={component} mode={mode} actions={actions} update={update}/>)  
//         case 'cart_button':
//             return (<CartButton 
//                 component={component} mode={mode} actions={actions} update={update}/>) 
//         case 'product_grid':
//             return (<ProductGrid 
//                 component={component} mode={mode} actions={actions} update={update}/>) 
//         case 'shop_grid':
//             return (<ShopGrid 
//                 component={component} mode={mode} actions={actions} update={update}/>) 
//         case 'shop_gallery':
//             return (<ShopGallery 
//                 component={component} mode={mode} actions={actions} update={update}/>) 
//         case 'shop_side_bar':
//             return (<ShopSideBar 
//                 component={component} mode={mode} actions={actions} update={update}/>) 
//         case 'blog_grid':
//             return (<BlogGrid 
//                 component={component} mode={mode} actions={actions} update={update}/>) 
//         case 'blog_side_bar':
//             return (<BlogSideBar 
//                 component={component} mode={mode} actions={actions} update={update}/>) 
//         case 'blog_post_detail':
//             return (<BlogPostDetail 
//                 component={component} mode={mode} actions={actions} update={update}/>) 
//         case 'side_bar':
//             return (<SideBar 
//                 component={component} mode={mode} actions={actions} update={update}/>) 
//         case 'customer_chat':
//             return (<CustomerChat 
//                 component={component} mode={mode} actions={actions} update={update}/>) 
//         case 'portal':
//             return (<Portal 
//                 component={component} mode={mode} actions={actions} update={update}/>) 
//         case 'website_search_bar':
//             return (<WebsiteSearchBar 
//                 component={component} mode={mode} actions={actions} update={update}/>) 
//         case 'google_map':
//             return (<GoogleMap 
//                 component={component} mode={mode} actions={actions} update={update}/>) 
//         case 'contact_us_form':
//             return (<ContactUsForm 
//                 component={component} mode={mode} actions={actions} update={update}/>) 
//         default:
//             return (<div>{component?.type}</div>)

//     }

// };

// ComponentInstance.propTypes = {

//     component:PropTypes.object,
//     mode: PropTypes.string,
//     actions: PropTypes.object,
//     update: PropTypes.func
// };

// export default ComponentInstance;
