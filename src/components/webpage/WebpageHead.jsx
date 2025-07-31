
import Element from "@/components/element/Element";
import React, { Fragment,  } from "react";
// import { Helmet } from 'react-helmet-async';


const WebpageHead =  ({ website, webpage, mode, ...props})=>{



    const title = webpage?.object?.title||webpage?.object?.name ? `${website?.name||''} | ${webpage?.name||''} | ${webpage?.object?.title||webpage?.object?.name}` : `${website?.name||''} | ${webpage?.name||''}`
    const description = webpage?.object?.description ? webpage?.object?.description : webpage?.data?.description||''
    const keywords = webpage?.object?.keywords ? webpage?.object?.keywords : webpage?.data?.keywords||''
    const og_title = webpage?.object?.title ? webpage?.object?.title : webpage?.data?.og_title||''
    const og_description = webpage?.object?.description ? webpage?.object?.description : webpage?.data?.og_description||''

    const og_image1 = webpage?.object?.image ? webpage?.object?.image : webpage?.data?.og_image1
    const og_image2 = webpage?.data?.og_image2

    const allowedTags = new Set(['meta', 'title', 'link', 'style', 'script', 'base']);


    // 動態
    return(
      <Fragment>

            {/* for ios device  */}
            <meta
              name="format-detection"
              content="telephone=no, date=no, email=no, address=no"
            />

            {
              typeof website?.data?.favicon === 'string' && website?.data?.favicon.trim() !== ''&&
              <link rel="icon" href={website?.data?.favicon} type="image/x-icon" />
            }
            <meta name="description" content={description}/>
            <meta name="keywords" content={keywords}/>
            {/* <meta name="author" content="網站作者名稱"/> */}
            <title>{title}</title>
            <meta property="og:title" content={og_title}/>
            <meta property="og:description" content={og_description}/>
            {/* <meta property="og:type" content="website"/>
            <meta property="og:url" content="https://你的網站網址"/> */}
            {
                og_image1&&
                <meta property="og:image" content={og_image1}/>
            }
            {
                og_image2&&
                <meta property="og:image" content={og_image2}/>
            }



            {
                (webpage?.head_elements||[]).filter(e=>allowedTags.has(e?.tag_name)).map((e,i)=><Element key={i} element={e} {...props}/>)
            }



          
        </Fragment>
    )

}

WebpageHead.propTypes = {
};

export default WebpageHead;


