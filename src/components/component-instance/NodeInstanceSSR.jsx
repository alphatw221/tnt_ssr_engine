// import PropTypes from "prop-types";
import { Providers, PersistProvider } from '@/redux/provider'

import { Fragment } from "react";

import dynamic from "next/dynamic";


import Image from "./Image"
import Video from "./Video"
import Text from "./Text"
import EmptyBox from "./EmptyBox"
import Marquee from "./Marquee"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import KPLink from "./KPLink"
import NodeBoxSSR from "@/components/component-instance/node-box/NodeBoxSSR"
import AbsolutePositionNodeBoxSSR from "@/components/component-instance/absolute-position-node-box/AbsolutePositionNodeBoxSSR"
// import DropDownListSSR from "@/components/component-instance/dropdown-list/DropDownListSSR"
import CustomSliderSSR from '@/components/component-instance/custom-slider/CustomSliderSSR'

import CartDetail from "@/components/component-instance/cart/CartDetail"
import CheckoutForm from "@/components/component-instance/cart/CheckoutForm"
import CartButton from "@/components/component-instance/cart/CartButton"

import MyOrders from "@/components/component-instance/order/MyOrders"
import OrderDetail from "@/components/component-instance/order/OrderDetail";
import OrderPayment from "@/components/component-instance/order/OrderPayment"

import MyAccountButton from "./MyAccountButton"
import WebsiteSearchBar from "./WebsiteSearchBar"
import GoogleMap from "./GoogleMap"
import ContactUsForm from "./ContactUsForm"
import Icon from "./Icon"
// import ShopSideBar from "./ShopSideBar"
// import SideBarSSR from "@/components/component-instance/side-bar/SideBarSSR"
import Shop from "@/components/component-instance/shop-product/Shop"

import CKEditorSSR from './CKEditorSSR'
import ProductDetailSSR from '@/components/component-instance/product-detail/ProductDetailSSR'
// import ShopGridSEO from '@/components/component-instance/ShopGridSEO'
// import NodeBoxCSR from "@/components/component-instance/node-box/NodeBoxCSR"
import BlogPostDetailSSR from "@/components/component-instance/blog-post-detail/BlogPostDetailSSR"

// const Image = dynamic(()=>import('./Image'))
// const Video = dynamic(()=>import('./Video'))
// const Text = dynamic(()=>import('./Text'))
// const EmptyBox = dynamic(()=>import('./EmptyBox'))
// const Marquee = dynamic(()=>import('./Marquee'))
// const LoginForm = dynamic(()=>import('./LoginForm'))
// const RegisterForm = dynamic(()=>import('./RegisterForm'))
// const KPLink = dynamic(()=>import('./KPLink'))
// const NodeBoxSSR = dynamic(()=>import('@/components/component-instance/node-box/NodeBoxSSR'))
// const AbsolutePositionNodeBoxSSR = dynamic(()=>import('@/components/component-instance/absolute-position-node-box/AbsolutePositionNodeBoxSSR'))
// const DropDownListSSR = dynamic(()=>import('@/components/component-instance/dropdown-list/DropDownListSSR'))
// const CustomSliderSSR = dynamic(()=>import('@/components/component-instance/custom-slider/CustomSliderSSR'))
// const CartDetail = dynamic(()=>import('./CartDetail'))
// const CheckoutForm = dynamic(()=>import('./CheckoutForm'))
// const OrderPayment = dynamic(()=>import('./OrderPayment'))
// const MyOrders = dynamic(()=>import('./MyOrders'))
// const LoginButton = dynamic(()=>import('./LoginButton'))
// const CartButton = dynamic(()=>import('./CartButton'))
// const WebsiteSearchBar = dynamic(()=>import('./WebsiteSearchBar'))
// const GoogleMap = dynamic(()=>import('./GoogleMap'))
// const ContactUsForm = dynamic(()=>import('./ContactUsForm'))
// const Icon = dynamic(()=>import('./Icon'))
// const ShopSideBar = dynamic(()=>import('./ShopSideBar'))
// const SideBarSSR = dynamic(()=>import('@/components/component-instance/side-bar/SideBarSSR'))
// const OrderDetail = dynamic(()=>import('./OrderDetail'))
// const CKEditorSSR = dynamic(()=>import('./CKEditorSSR'))
// const ProductDetailSEO = dynamic(()=>import('@/components/component-instance/ProductDetailSEO'))
// const ShopGridSEO = dynamic(()=>import('@/components/component-instance/ShopGridSEO'))
// const NodeBoxCSR = dynamic(()=>import('@/components/component-instance/node-box/NodeBoxCSR'))
// const BlogPostDetailSSR = dynamic(()=>import('@/components/component-instance/blog-post-detail/BlogPostDetailSSR'))

const NodeInstanceSSR =  ({ 

        params, searchParams, 
        template_nodes,
        node, 
        mode, actions, update, children, ...props
    }) => {
    
    const routingTable = actions?.getRoutingTable()

    switch(node?.type){
        case 'node_box':
            return (<NodeBoxSSR 
                template_nodes={template_nodes}
                node={node} mode={mode} actions={actions} update={update} {...props}/>)
        case 'absolute_position_node_box':
            return (<AbsolutePositionNodeBoxSSR 
                template_nodes={template_nodes}
                node={node} mode={mode} actions={actions} update={update} {...props}/>)
        case 'marquee':
            return (<Marquee 
                node={node} mode={mode} actions={actions} update={update} {...props}/>)
        case 'image':
            return (<Image 
                node={node} mode={mode} actions={actions} update={update} {...props}/>)
        case 'video':
            return (<Video 
                node={node} mode={mode} actions={actions} update={update}  {...props}/>)

        case 'text':
            return (<Text 
                node={node} mode={mode} actions={actions} update={update} {...props}/>)    
        case 'empty_box':
            return (<EmptyBox 
                node={node} mode={mode} actions={actions} update={update} {...props}/>)   
        // case 'dropdown_list':
        //     return (<DropDownListSSR //deplicated
        //         template_nodes={template_nodes}
        //         node={node} mode={mode} actions={actions} update={update} {...props}/>)  
      
        case 'icon':
            return (<Icon 
                node={node} mode={mode} actions={actions} update={update} {...props}/>)  

        case 'hyper_link':
            return (<KPLink 
                node={node} mode={mode} actions={actions} update={update} {...props}/>)  
        case 'ck_editor':
            return (<CKEditorSSR 
                node={node} mode={mode} actions={actions} update={update} {...props}/>)  

        

        case 'product_detail': 
            return (
                <Fragment>
                    <ProductDetailSSR params={params} searchParams={searchParams} node={node} mode={mode} actions={null} routingTable={routingTable} {...props}/>
                </Fragment>
                ) 
        // case 'shop_grid': 
        //         return (
        //             <Fragment>
        //                 <ShopGridSEO params={params} searchParams={searchParams} node={node} mode={mode} actions={actions} update={update} {...props}/>
        //             </Fragment>
        //             ) 
        case 'blog_post_detail': 
                return (<BlogPostDetailSSR
                    params={params} searchParams={searchParams} node={node} mode={mode} actions={actions} {...props}/>) 
        
        case 'custom_slider': 
                return (<CustomSliderSSR 
                    params={params} searchParams={searchParams} template_nodes={template_nodes} node={node} mode={mode} actions={actions} update={update} {...props}/>)  
        
        case 'custom_slider_slide':    //temp to be deplicated
            return (<NodeBoxSSR 
                template_nodes={template_nodes}
                node={node} mode={mode} actions={actions} update={update} {...props}/>)
        //-------------------CSR------------------------------------------------------
        // case 'side_bar':                      //deplicated
        //     return (<SideBarSSR 

        //             node={node} mode={mode} actions={actions} update={update} {...props}/>
        //         ) 
        
        case 'shop':
            return (
                <Fragment>
                    <Providers >
                        <PersistProvider>
                                <Shop 
                            node={node} mode={mode} actions={null} update={update} routingTable={routingTable} {...props}/>
                        </PersistProvider>
                    </Providers>
                </Fragment>
                ) 

        case 'customer_login_form':
            return (
                <Fragment>
                    <Providers >
                        <PersistProvider>
                                <LoginForm 
                            node={node} mode={mode} actions={null} update={update} routingTable={routingTable} {...props}/>
                        </PersistProvider>
                    </Providers>
                </Fragment>
                ) 
        case 'customer_register_form':
            return (
                <Fragment>
                    <Providers >
                        <PersistProvider>
                        <RegisterForm 
                    node={node} mode={mode} actions={null} update={update} routingTable={routingTable} {...props}/>
                        </PersistProvider>
                    </Providers>
                </Fragment>
                ) 
       
        case 'cart_detail':
            return (
                <Fragment>
                    <Providers >
                        <PersistProvider>
                            <CartDetail 
                                node={node} mode={mode} actions={null} routingTable={routingTable} {...props}/>
                        </PersistProvider>
                    </Providers>
                </Fragment>
                ) 
        case 'checkout_form':
            return (
                <Fragment>
                    <Providers >
                        <PersistProvider>
                            <CheckoutForm 
                                node={node} mode={mode} actions={null} routingTable={routingTable} {...props} />
                        </PersistProvider>
                    </Providers>
                </Fragment>
                ) 
        case 'order_detail':
            return (
                <Fragment>
                    <Providers >
                        <PersistProvider>
                            <OrderDetail 
                                node={node} mode={mode} actions={null} routingTable={routingTable} {...props}/>
                        </PersistProvider>
                    </Providers>
                </Fragment>
                ) 
        case 'order_payment':
            return (
                <Fragment>
                    <Providers >
                        <PersistProvider>
                            <OrderPayment 
                                node={node} mode={mode} actions={null} routingTable={routingTable} {...props}/>
                        </PersistProvider>
                    </Providers>
                </Fragment>
                ) 
        case 'my_orders':
            return (
                <Fragment>
                <Providers >
                    <PersistProvider>
                    <MyOrders 
                        node={node} mode={mode} actions={null} routingTable={routingTable} {...props}/>
                    </PersistProvider>
                </Providers>
                </Fragment>
                ) 
        case 'my_account_button':
            return (
                <Fragment>
                    <Providers >
                        <PersistProvider>
                        <MyAccountButton 
                            node={node} mode={mode} routingTable={routingTable} {...props}/>
                        </PersistProvider>
                    </Providers>
                </Fragment>
                ) 
       
        case 'cart_button':
            return (
                <Fragment>
                    <Providers >
                        <PersistProvider>
                        <CartButton 
                            node={node} mode={mode} routingTable={routingTable} {...props}/>
                        </PersistProvider>
                    </Providers>
                </Fragment>
                ) 
       
        // case 'shop_side_bar': 
        //     return (
        //         <Fragment>
        //         <Providers >
        //             <PersistProvider>
        //             <ShopSideBar 
        //         node={node} mode={mode} actions={actions} update={update} {...props}/>
        //             </PersistProvider>
        //         </Providers>
        //         </Fragment>
        //         )  
       



        case 'website_search_bar':
            return (<WebsiteSearchBar 
                node={node} mode={mode} actions={null} update={update} {...props}/>) 
        case 'google_map':
            return (
                    <GoogleMap 
                node={node} mode={mode} actions={null} update={update} {...props}/>
                ) 
        case 'contact_us_form':
            return (

                    <Fragment>
                        <Providers >
                            <PersistProvider>
                               <ContactUsForm 
                                    node={node} mode={mode} actions={null} update={update} {...props}/>
                            </PersistProvider>
                        </Providers>
                    </Fragment>
                        
                ) 
        
       
        default:
            return (<div>{node?.type}</div>)


    // )
    }
};

NodeInstanceSSR.propTypes = {

};

export default NodeInstanceSSR;
