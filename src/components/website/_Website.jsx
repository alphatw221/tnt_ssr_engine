import { Fragment } from "react";

// import clsx from "clsx";
// import Webpage from "./webpage/Webpage";
// import style from "./Website.module.scss"

import { getReservePage } from "../../lib/utils/reservePage.js.js";







const _Website = ({
    params, 
    searchParams, 
    webpage_node, 
    header_nodes, 
    footer_nodes,
    template_nodes,
    hideNodeDict,
    // pageIndex, 
    // website, 
    actions, mode, WebPageComponent,

    updateHeader,
    updateWebpageNode,
    updateFooter,


})=>{


    if(!webpage_node){   //for SSR

        switch(params.page_name){
            case 'product':
                return (<WebPageComponent params={params} searchParams={searchParams}  webpage_node={getReservePage(params.page_name)} header_nodes={header_nodes||[]} footer_nodes={footer_nodes||[]} mode={'prod'}/>)
            case 'cart':
                return (<WebPageComponent params={params} searchParams={searchParams}  webpage_node={getReservePage(params.page_name)} header_nodes={header_nodes||[]} footer_nodes={footer_nodes||[]} mode={'prod'}/>)
            case 'checkout':
                return (<WebPageComponent params={params} searchParams={searchParams}  webpage_node={getReservePage(params.page_name)} header_nodes={header_nodes||[]} footer_nodes={footer_nodes||[]} mode={'prod'}/>)
            case 'order':
                return (<WebPageComponent params={params} searchParams={searchParams}  webpage_node={getReservePage(params.page_name)} header_nodes={header_nodes||[]} footer_nodes={footer_nodes||[]} mode={'prod'}/>)
            case 'order_payment':
                return (<WebPageComponent params={params} searchParams={searchParams}  webpage_node={getReservePage(params.page_name)} header_nodes={header_nodes||[]} footer_nodes={footer_nodes||[]} mode={'prod'}/>)
            case 'my_orders':
                return (<WebPageComponent params={params} searchParams={searchParams}  webpage_node={getReservePage(params.page_name)} header_nodes={header_nodes||[]} footer_nodes={footer_nodes||[]} mode={'prod'}/>)
            case 'login':
                return (<WebPageComponent params={params} searchParams={searchParams}  webpage_node={getReservePage(params.page_name)} header_nodes={header_nodes||[]} footer_nodes={footer_nodes||[]} mode={'prod'}/>)
            case 'register':
                return (<WebPageComponent params={params} searchParams={searchParams}  webpage_node={getReservePage(params.page_name)} header_nodes={header_nodes||[]} footer_nodes={footer_nodes||[]} mode={'prod'}/>)
            case 'shop':
                return (<WebPageComponent params={params} searchParams={searchParams}  webpage_node={getReservePage(params.page_name)} header_nodes={header_nodes||[]} footer_nodes={footer_nodes||[]} mode={'prod'}/>)
            case 'blog':
                return (<WebPageComponent params={params} searchParams={searchParams}  webpage_node={getReservePage(params.page_name)} header_nodes={header_nodes||[]} footer_nodes={footer_nodes||[]} mode={'prod'}/>)
            case 'blog_post':
                return (<WebPageComponent params={params} searchParams={searchParams}  webpage_node={getReservePage(params.page_name)} header_nodes={header_nodes||[]} footer_nodes={footer_nodes||[]} mode={'prod'}/>)
            default:
                break
        }
    }

    // console.log(mode)
    return (
        <Fragment>
            {
                // pageIndex>=0 && (website?.webpage_nodes||[])?.[pageIndex] 
                webpage_node
                ?
                <WebPageComponent 
                    params={params} 
                    searchParams={searchParams} 
                    header_nodes={header_nodes||[]} 
                    webpage_node={webpage_node} 
                    footer_nodes={footer_nodes||[]} 
                    template_nodes={template_nodes}
                    hideNodeDict={hideNodeDict}
                    // layout={website?.layout||{}} 
                    // page={(website?.webpage_nodes||[])?.[pageIndex] } 
                    // pageIndex={pageIndex} 
                    actions={actions} 
                    mode={mode}

                    updateHeader={updateHeader}
                    updateWebpageNode={updateWebpageNode}
                    updateFooter={updateFooter}
                />
                :
                <Fragment>
                    <div style={{paddingTop:'40vh'}}>
                        <h1 style={{textAlign:'center', fontWeight:'bold'}}>
                            找不到此頁面.
                        </h1>
                        <h1 style={{textAlign:'center', fontWeight:'bold'}}>
                            404 Page Not Found.
                        </h1>
                    </div>
                </Fragment>
            }
        </Fragment>
    );
}
export default _Website;



