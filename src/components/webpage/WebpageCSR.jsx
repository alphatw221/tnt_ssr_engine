

import { Helmet, HelmetProvider } from "react-helmet-async";

import Element from "@/components/element/Element";
// import WebpageHead from './WebpageHead';
import React, { Fragment, useState, useEffect ,lazy, useRef } from "react";
import {convertToReactProps} from '@/lib/utils/propsConverter.js'
import StoreSettingsPreloader from "@/components/website/StoreSettingsPreloader";

const WebpageCSR =  ({ website, webpage, ...props})=>{

    if(!webpage){
         return "404 Page Not Found."
    }



    // const getRoute = (route)=>{
    //     return website?.data?.[route]||route;
    // }

    // const getRoutingTable = ()=>{
    //   return {
    //     'customer_login_route':website?.data?.customer_login_route,
    //     'customer_register_route':website?.data?.customer_register_route,
    //     'cart_route':website?.data?.cart_route,
    //     'checkout_route':website?.data?.checkout_route,
    //     'order_route':website?.data?.order_route,
    //     'my_orders_route':website?.data?.my_orders_route,
    //     'order_payment_route':website?.data?.order_payment_route,
    //     'shop_route':website?.data?.shop_route,
    //     'product_route':website?.data?.product_route,
    //     'blog_route':website?.data?.blog_route,
    //     'blog_post_route':website?.data?.blog_post_route,
    //   }
    // }

    // const actions = {
    //     getRoute,
    //     getRoutingTable
    // }

    const allowedTags = new Set(['meta', 'link', 'style', 'script']);

    const webpageProps = {
            ...(webpage?.props||{}),
            class: [(webpage?.props?.class||'').replace('\n', ' '), webpage?.uuid||''].filter(Boolean).join(" "),
    };
        
    const reactWebpageProps = convertToReactProps(webpageProps)
        

    // 動態
    return(
      <Fragment>
            <HelmetProvider>
              <Helmet>
                {
                    (webpage?.head_elements||[]).filter(e=>allowedTags.has(e?.tag_name)&&!props?.hideElementDict?.[e?.parent_relation_uuid]).map((e,i)=>{


                      const reactProps = convertToReactProps(e.props)
                      if (e.tag_name === 'style') {
                        return <style key={i} {...reactProps}>{e.inner_html}</style>
                      }
                      if (e.tag_name === 'script') {
                        return <script key={i} {...reactProps}>{e.inner_html}</script>;
                      }
                      if (e.tag_name === 'meta') {
                        return <meta key={i} {...reactProps} />;
                      }
                      if (e.tag_name === 'link') {
                        return <link key={i} {...reactProps} />;
                      }


                    })
                }
              </Helmet>
            </HelmetProvider>
            <div {...reactWebpageProps}>
              {
                  (webpage?.body_elements||[]).map((e,i)=><Element key={i} element={e} {...props}/>)
              }
            </div>
            <StoreSettingsPreloader bonus_point_policy={website?.bonus_point_policy} e_commerce_settings={website?.e_commerce_settings}/>
      </Fragment>
    )

}

WebpageCSR.propTypes = {
};

export default WebpageCSR;


