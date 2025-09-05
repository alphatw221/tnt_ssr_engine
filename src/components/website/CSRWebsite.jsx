" use client"

import PropTypes from "prop-types";
import { Fragment, useState, useEffect } from "react";
import clsx from "clsx";
// import style from "./Website.module.scss"

import { useAppSelector, useAppDispatch } from "@/redux/hooks";


// import { setCurrentPageIndex, setWindowWidth } from  '../../redux/slices/website-editor-slice'
import { setCustomer } from "../../redux/slices/customer-slice";


import { customer_get_account } from '../../api/customer'
// import { customer_get_store } from "../../api/estore";
import Cookies from "js-cookie";


import { useParams, useSearchParams } from 'next/navigation';

import _Website from './_Website'

import CSRWebpage from './webpage/CSRWebpage'
import { getReservePage } from "@/lib/utils/reservePage.js.js";
import WebsiteHeadClient from './WebsiteHeadClient'
import StoreSettingsPreloader from '@/components/website/StoreSettingsPreloader'

const  CSRWebsite = ({website, hideNodeDict, mode, actions}) => {

    const params = useParams()
    const searchParams = useSearchParams()

    const dispatch = useAppDispatch();

    const customer  = useAppSelector((state) => state.customer);

    const [pageIndex, setPageIndex] = useState(0)
    const [webpageNode, setWebpageNode] = useState(null)
    
    //customer auth
    useEffect(()=>{
        if(!customer?.uuid && Cookies.get('customer_access_token')){
                customer_get_account().then(res=>{
                    console.log(res.data)
                    dispatch(setCustomer(res.data))
                }).catch(err=>{
                    Cookies.remove('customer_access_token')
                    // dispatch(setCustomer(null))
                })
        }
        
    },[])

    //init window innerWidth
    // var width
    // useEffect(()=>{
    //     dispatch(setWindowWidth(window.innerWidth))
    //     width = window.innerWidth
    // },[])

    //handle window resize    deplicate
    // useEffect(() => {

    //     dispatch(setWindowWidth(window.innerWidth))

    //     function handleWindowResize() {
    //         dispatch(setWindowWidth(window.innerWidth));

    //         // if(width!=window.innerWidth){
    //         //     width = window.innerWidth
    //         //   }
    //     }
    //     window.addEventListener('resize', handleWindowResize);
    //     return () => {
    //       window.removeEventListener('resize', handleWindowResize);
    //     };
    // }, []);
    
    //find target webpage
    useEffect(()=>{
        // let _pageIndex = -1
        if(params?.page_name){
            const page = (website?.webpage_nodes||[]).find(page=>page?.name===decodeURI(params?.page_name))
            setPageIndex((website?.webpage_nodes||[]).indexOf(page))
            if(page){
                setWebpageNode(page)
            }else{
                setWebpageNode(getReservePage(params?.page_name))
            }
        }else if((website?.webpage_nodes||[]).length>0){
            setPageIndex(0)
            setWebpageNode(website?.webpage_nodes[0])
        }else {
            setPageIndex(-1)
            setWebpageNode(null)
        }
    }, [params?.page_name, website?.webpage_nodes, setWebpageNode, setPageIndex])

    
    //update global webpage index
    //might not be nessary anymore
    // useEffect(()=>{
    //     if(websiteEditorState.currentPageIndex!=pageIndex){
    //         dispatch(setCurrentPageIndex(pageIndex))
    //     }
    // },[pageIndex])
    
    

    const updateHeader = (nodeIndex, data)=>[
        actions.updateWebsiteNode('header', nodeIndex, data)
    ]
    const updateWebpageNode = (data)=>{
        actions.updateWebsiteNode('webpage', pageIndex, data)
    }
    const updateFooter = (nodeIndex, data)=>{
        actions.updateWebsiteNode('footer', nodeIndex, data)
    }



    return (<Fragment>

            <WebsiteHeadClient      
                customizeTags={website?.data?.customize_tags||[]}
                customize_javascript={website?.data?.customize_javascript}
                customize_style_sheet={website?.data?.customize_style_sheet}
                />

            <_Website 
                    params={params} 
                    searchParams={searchParams} 
                    webpage_node={webpageNode}
                    header_nodes={website.header_nodes||[]}
                    footer_nodes={website.footer_nodes||[]}
                    template_nodes={website?.template_nodes||{}}
                    hideNodeDict={hideNodeDict}
                    actions={actions} 
                    mode={mode} 
                    WebPageComponent={CSRWebpage} 

                    updateHeader={updateHeader}
                    updateWebpageNode={updateWebpageNode}
                    updateFooter={updateFooter}

                />

                <StoreSettingsPreloader bonus_point_policy={website?.bonus_point_policy} e_commerce_settings={website?.e_commerce_settings} />
            

        </Fragment>)

};

CSRWebsite.propTypes = {
    website:PropTypes.object,
    mode:PropTypes.string,
    actions:PropTypes.object,
};

export default CSRWebsite;



