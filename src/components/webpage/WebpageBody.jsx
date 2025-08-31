
import Element from "@/components/element/Element";
import React, { Fragment,  } from "react";
import {convertToReactProps} from '@/lib/utils/propsConverter.js'


const WebpageBody =  ({ website, webpage, ...props})=>{

    const routingTable = {
        'customer_login_route':website?.data?.customer_login_route,
        'customer_register_route':website?.data?.customer_register_route,
        'cart_route':website?.data?.cart_route,
        'checkout_route':website?.data?.checkout_route,
        'order_route':website?.data?.order_route,
        'my_orders_route':website?.data?.my_orders_route,
        'order_payment_route':website?.data?.order_payment_route,
        'shop_route':website?.data?.shop_route,
        'product_route':website?.data?.product_route,
        'blog_route':website?.data?.blog_route,
        'blog_post_route':website?.data?.blog_post_route,
    }

    const webpageProps = {
        ...(webpage?.props||{}),
        class: [webpage?.props?.class||'', webpage?.uuid||''].filter(Boolean).join(" "),
    };
    
    const reactWebpageProps = convertToReactProps(webpageProps)
    


    // 動態
    return(
      <div {...reactWebpageProps}>
        {
            (webpage?.body_elements||[]).map((e,i)=><Element key={i} element={e} routingTable={routingTable} {...props}/>)
        }
      </div>
    )

}

WebpageBody.propTypes = {
};

export default WebpageBody;


