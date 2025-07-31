// import  Link  from 'next/link';

const CustomizeTag = ({tag})=>{

    // return null
    
    let attributes = {}

    if(tag?.attributes){
        try{
            attributes = JSON.parse(tag?.attributes||'')
        }
        catch(e){
            console.log(tag?.attributes)
            return null
        }
    }
   
    if(false){

    }
    // if(tag?.tag_name=='script'){
    //     return (<script {...attributes} dangerouslySetInnerHTML={{ __html: tag?.content||'' }}></script>)
    // }
    else if(tag?.tag_name=='link' && typeof attributes?.href === 'string' && attributes?.href.trim()!==''){
        return <link {...attributes} />;
        // return (<link rel={attributes?.rel} href={attributes?.href} crossorigin={attributes?.crossorigin}/>)


        // const safeAttributes = {
        //     rel: typeof attributes.rel === 'string' ? attributes.rel : 'stylesheet', // 預設值
        //     href: attributes.href,
        //     ...(typeof attributes.crossorigin === 'string' ? { crossOrigin: attributes.crossorigin } : {})
        //   };
        //   return <link {...safeAttributes} />;



    }
    else if(tag?.tag_name=='noscript'){
        return (<noscript {...attributes} dangerouslySetInnerHTML={{ __html: tag?.content||'' }}></noscript>)
    }
  }
export default CustomizeTag