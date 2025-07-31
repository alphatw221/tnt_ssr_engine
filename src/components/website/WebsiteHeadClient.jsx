"use client"
import { useEffect } from "react";
// import {  useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { setEStoreData } from '../../redux/slices/estore-slice'
// import { useSearchParams } from "next/navigation";
const  WebsiteHeadClient = ({
  // baseCurrency,
  // exchangeRates,
  // deliverySettings,
  // paymentSettings,
  customizeTags,
  customize_style_sheet, customize_javascript,
}) => {

    // const dispatch = useAppDispatch();
    // const searchParams = useSearchParams();


    //TODO deplicate
    //insert customize script
    useEffect(()=>{


      (customizeTags||[]).forEach(tag => {
        
        // tag?.name
        // tag_position
        // tag_name
        // attributes
        // content
        // const attributes = Object.fromEntries(
        //   (tag?.attributes||'')
        //     .split(";")
        //     .filter(Boolean)
        //     .map((pair) => pair.split(":").map((s) => s.trim()))
        // );
        let attributes = {}

        if(tag?.attributes){
          try{
            attributes = JSON.parse(tag?.attributes||'')
          }
          catch(e){
            console.log(tag);
            console.log(tag?.attributes);
            console.log(e)}
        }
       

        // let e = document.getElementById(`customize_tag_${tag?.name}`);
        document.querySelectorAll(`#customize_tag_${tag?.name}`)?.forEach(e => {e.remove();})

        if(tag?.enable ){
            const e = document.createElement(tag?.tag_name);
            for (const [key, value] of Object.entries(attributes)) {
              e.setAttribute(key, value);
            }
            e.id = `customize_tag_${tag?.name}`;
            e.innerHTML = tag?.content||'';

            if(tag?.tag_position=='head'){
              const head = document.getElementsByTagName('head')[0];
              head?.appendChild(e)
            }else if(tag?.tag_position=='body'){
              const body = document.getElementsByTagName('body')[0];
              body?.appendChild(e)
            }
            
        }

      });

    },[customizeTags]);



    useEffect(()=>{

      if(customize_style_sheet){

        // console.log(customize_style_sheet)
        // return
          // document.getElementById('customize_style_sheet')?.remove();
          document.querySelectorAll(`#website_customize_style_sheet`)?.forEach(e => {e.remove();})
         
          const link = document.createElement('link'); // 创建 link 元素
          link.id = 'website_customize_style_sheet'
          link.rel = 'stylesheet';                    // 设置 rel 属性
          link.href = customize_style_sheet;                            // 设置 href 为外部 CSS 文件的路径
          document.head.appendChild(link);    
      
      }
      
    },[customize_style_sheet]);

  // //insert external static file
      useEffect(()=>{

        
          if(customize_javascript){

            // console.log(customize_javascript)
            // return

              // document.getElementById('customize_javascript')?.remove();
              document.querySelectorAll(`#website_customize_javascript`)?.forEach(e => {e.remove();})

              const script = document.createElement('script'); // 创建 script 元素
              script.id = 'website_customize_javascript';
              script.src = customize_javascript;                                // 设置 src 为外部 JS 文件的路径
              script.async = true;                             // 设置 async 为 true（可选）
              document.head.appendChild(script);   

          }
        },[customize_javascript]);
    




    return null

};

WebsiteHeadClient.propTypes = {
};

export default WebsiteHeadClient;



{/* <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@200..900&family=Noto+Serif:ital,wdth,wght@0,62.5..100,100..900;1,62.5..100,100..900&display=swap" rel="stylesheet"> */}


// {"rel":"preconnect","href","https://fonts.googleapis.com"}
// {"rel":"preconnect","href","https://fonts.gstatic.com", "crossorigin":true}
// {"rel","stylesheet", "href":"https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@200..900&family=Noto+Serif:ital,wdth,wght@0,62.5..100,100..900;1,62.5..100,100..900&display=swap"}