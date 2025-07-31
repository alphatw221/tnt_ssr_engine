import PropTypes from "prop-types";
import React, { lazy } from "react";


import dynamic from "next/dynamic";

import Marquee from "./Marquee"
import Image from "./Image"
import Video from "./Video"

import Text from "./Text"
import EmptyBox from "./EmptyBox"
import DropDownListCSR from "@/components/component-instance/dropdown-list/DropDownListCSR"
// import Slider from "./Slider"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
// import ProductDetail from "./ProductDetail"
import ProductDetailCSR from "@/components/component-instance/product-detail/ProductDetailCSR"

import CartDetail from "@/components/component-instance/cart/CartDetail"
import CheckoutForm from "@/components/component-instance/cart/CheckoutForm"
import CartButton from "@/components/component-instance/cart/CartButton"

import OrderDetail from "@/components/component-instance/order/OrderDetail"
import OrderPayment from "@/components/component-instance/order/OrderPayment"
import MyOrders from "@/components/component-instance/order/MyOrders"

import MyAccountButton from "./MyAccountButton"

import Icon from "./Icon"
// import ProductGrid from "./ProductGrid"
import KPLink from "./KPLink"
// import ShopGrid from "./ShopGrid"
// import ShopGallery from "./ShopGallery"

// import ShopSideBar from "./ShopSideBar"
import Shop from "@/components/component-instance/shop-product/Shop"
import NodeBoxCSR from "@/components/component-instance/node-box/NodeBoxCSR"
// import HoverBox from "./HoverBox"
import AbsolutePositionNodeBoxCSR from "@/components/component-instance/absolute-position-node-box/AbsolutePositionNodeBoxCSR"
// import BlogGrid from "./BlogGrid"
// import BlogSideBar from "./BlogSideBar"
// import BlogPostDetail from "./BlogPostDetail"
// import SideBar from "./SideBar"
// import SideBarCSR from "@/components/component-instance/side-bar/SideBarCSR"
// import CustomerChat from "./CustomerChat"
// import Portal from "./Portal"
import WebsiteSearchBar from "./WebsiteSearchBar"
import GoogleMap from "./GoogleMap"
import ContactUsForm from "./ContactUsForm"
import CustomSliderCSR from "@/components/component-instance/custom-slider/CustomSliderCSR"


import BlogPostDetailCSR from './blog-post-detail/BlogPostDetailCSR'

const CKEditor = dynamic(() => import("./CKEditor"), { ssr: false });


const NodeInstanceCSR = ({ 
    template_nodes, hideNodeDict, data, node, mode, actions, children, ...props}) => {
    

    switch(node?.type){
        case 'webpage':
            return (<div>{node?.type}-{node?.name}</div>)  
        case 'section':
            return (<div>{node?.type}-{node?.name}</div>)
        case 'node_box':
            return (<NodeBoxCSR 
                template_nodes={template_nodes} hideNodeDict={hideNodeDict} node={node} mode={mode} actions={actions} data={data} {...props}>
                    {children}
                </NodeBoxCSR>)
        
        case 'absolute_position_node_box':
            return (<AbsolutePositionNodeBoxCSR 
                template_nodes={template_nodes} hideNodeDict={hideNodeDict} node={node} mode={mode} actions={actions} data={data} {...props}>
                    {children}
                </AbsolutePositionNodeBoxCSR>)
        // case 'marquee':
        //     return (<Marquee 
        //         node={node} mode={mode} actions={actions} data={data} {...props}>
        //             {children}
        //         </Marquee>)
        case 'image':
            return (<Image 
                node={node} mode={mode} actions={actions} data={data} {...props}>
                    {children}
                </Image>)
        case 'video':
            return (<Video 
                node={node} mode={mode} actions={actions} data={data} {...props}>
                    {children}
                </Video>)
        case 'text':
            return (<Text 
                node={node} mode={mode} actions={actions} data={data} {...props}>
                    {children}
                </Text>)    
        case 'empty_box':
            return (<EmptyBox 
                node={node} mode={mode} actions={actions} data={data} {...props}>
                    {children}
                </EmptyBox>)   
        case 'dropdown_list':  //deplicated
            return (<DropDownListCSR 
                template_nodes={template_nodes} hideNodeDict={hideNodeDict} node={node} mode={mode} actions={actions} data={data} {...props}>
                    {children}
                </DropDownListCSR>)  
        case 'custom_slider':
            return (<CustomSliderCSR 
                template_nodes={template_nodes} hideNodeDict={hideNodeDict} node={node} mode={mode} actions={actions} data={data} {...props}>
                    {children}
                </CustomSliderCSR>)  
        case 'custom_slider_slide':    //temp
            return (<NodeBoxCSR 
                template_nodes={template_nodes} hideNodeDict={hideNodeDict} node={node} mode={mode} actions={actions} data={data} {...props}>
                    {children}
                </NodeBoxCSR>)
        
        case 'ck_editor':
            return (<CKEditor 
                node={node} mode={mode} actions={actions} data={data} {...props}>
                    {children}
                </CKEditor>)        
        case 'customer_login_form':
            return (<LoginForm 
                node={node} mode={mode} actions={actions} data={data} {...props}>
                    {children}
                </LoginForm>)  
        case 'customer_register_form':
            return (<RegisterForm 
                node={node} mode={mode} actions={actions} data={data} {...props}>
                    {children}
                </RegisterForm>)        
        case 'product_detail':
            return (<ProductDetailCSR 
                node={node} mode={mode} actions={actions} data={data} {...props}>
                    {children}
                </ProductDetailCSR>)  
        case 'cart_detail':
            return (<CartDetail 
                node={node} mode={mode} actions={actions} data={data} {...props}>
                    {children}
                </CartDetail>)  
        case 'checkout_form':
            return (<CheckoutForm 
                node={node} mode={mode} actions={actions} data={data} {...props}>
                    {children}
                </CheckoutForm>    )  
        case 'order_detail':
            return (<OrderDetail 
                node={node} mode={mode} actions={actions} data={data} {...props}>
                    {children}
                </OrderDetail>)  
        case 'order_payment':
            return (<OrderPayment 
                node={node} mode={mode} actions={actions} data={data} {...props}>
                    {children}
                </OrderPayment>)  
        case 'my_orders':
            return (<MyOrders 
                node={node} mode={mode} actions={actions} data={data} {...props}>
                    {children}
                </MyOrders>)  
        case 'my_account_button':
            return (<MyAccountButton 
                node={node} mode={mode} actions={actions} data={data} {...props}>
                    {children}
                </MyAccountButton>)  
        case 'icon':
            return (<Icon 
                node={node} mode={mode} actions={actions} data={data} {...props}>
                    {children}
                </Icon>)  
        case 'hyper_link':
            return (<KPLink 
                node={node} mode={mode} actions={actions} data={data} {...props}>
                    {children}
                </KPLink>)  
        case 'cart_button':
            return (<CartButton 
                node={node} mode={mode} actions={actions} data={data} {...props}>
                    {children}
                </CartButton>) 
        case 'shop':
            return (<Shop 
                node={node} mode={mode} actions={actions} data={data} {...props}>
                    {children}
                </Shop>) 
        // case 'shop_grid':
        //     return (<ShopGrid 
        //         node={node} mode={mode} actions={actions} data={data} {...props}>
        //             {children}
        //         </ShopGrid>) 
        // case 'shop_side_bar': 
        //     return (<ShopSideBar 
        //         node={node} mode={mode} actions={actions} data={data} {...props}>
        //             {children}
        //         </ShopSideBar>) 
        // case 'side_bar':        //deplicated
        //     return (<SideBarCSR 
        //         template_nodes={template_nodes}
        //         hideNodeDict={hideNodeDict}
        //         node={node} mode={mode} actions={actions} data={data} {...props}>
        //             {children}
        //         </SideBarCSR>) 
        case 'website_search_bar':
            return (<WebsiteSearchBar 
                node={node} mode={mode} actions={actions} data={data} {...props}>
                    {children}
                </WebsiteSearchBar>) 
        case 'google_map':
            return (<GoogleMap 
                node={node} mode={mode} actions={actions} data={data} {...props}>
                    {children}
                </GoogleMap>) 
        case 'contact_us_form':
            return (<ContactUsForm 
                node={node} mode={mode} actions={actions} data={data} {...props}>
                    {children}
                </ContactUsForm>) 
        // case 'blog_grid':
        //     return (<BlogGrid 
        //         node={node} mode={mode} actions={actions} />) 
        // case 'blog_side_bar':
        //     return (<BlogSideBar 
        //         node={node} mode={mode} actions={actions} />) 
        case 'blog_post_detail': 
            return (<BlogPostDetailCSR 
                node={node} mode={mode} actions={actions} {...props}/>) 
        // case 'customer_chat': deplicate
        //     return (<CustomerChat 
        //         node={node} mode={mode} actions={actions} />) 
        // case 'portal': deplicate
        //     return (<Portal 
        //         node={node} mode={mode} actions={actions} />) 
        // case 'slider':   deplicate
        //     return (<Slider 
        //         node={node} mode={mode} actions={actions} />) 
        // case 'shop_gallery': deplicate
        //     return (<ShopGallery 
        //         node={node} mode={mode} actions={actions} />) 
        // case 'product_grid': deplicate
        //     return (<ProductGrid 
        //         node={node} mode={mode} actions={actions} />) 
        default:
            return (<div>{node?.type}</div>)

    }

};

NodeInstanceCSR.propTypes = {
    data:PropTypes.object||PropTypes.array||null,
    node:PropTypes.object,
    mode: PropTypes.string,
    actions: PropTypes.object,

};

export default NodeInstanceCSR;
