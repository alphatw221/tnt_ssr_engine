
export const voidElements = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']

// export const validContainerNodes = {
//     'webpage':{
//         only_accepted_children:['section'],
//         only_accepted_siblings:['webpage']
//     },
//     'section':{
//         except_accepted_children:['webpage', 'section'],
//         only_accepted_siblings:['section']
//     },
//     'side_bar':{
//         except_accepted_children:['webpage', 'section'],
//         except_accepted_siblings:['webpage', 'section']
//     },
//     'node_box':{
//         except_accepted_children:['webpage', 'section',],
//         except_accepted_siblings:['webpage', 'section', ]
//     },
//     'dropdown_list':{
//         except_accepted_children:['webpage', 'section', ],
//         except_accepted_siblings:['webpage', 'section', ]
//     },
//     'absolute_position_node_box':{
//         except_accepted_children:['webpage', 'section', ],
//         except_accepted_siblings:['webpage', 'section', ]
//     },
//     'custom_slider':{
//         except_accepted_children:['webpage', 'section', ],
//         except_accepted_siblings:['webpage', 'section', ]
//     },
//     'node':{
//         only_accepted_children:[],
//         except_accepted_siblings:['webpage', 'section',]
//     },

   


// }



export const elementCheckDropValidHelper = (source_element, target_element, beforeAfterIn, onlyIn, beforeAfter, invalid)=>{
    // const config = Object.keys(validContainerNodes).includes(target_node?.type)? validContainerNodes[target_node?.type] : validContainerNodes['node']


    if(target_element?.type){
        return beforeAfter();
    }else{
        if(voidElements.includes(target_element?.tag_name)){
            return beforeAfter();
        }else{
            return beforeAfterIn();
        }
    }

    // if(  //可放入
    //   config?.only_accepted_children && config?.only_accepted_children?.includes(source_node?.type)|| 
    //   config?.except_accepted_children && !config?.except_accepted_children?.includes(source_node?.type)
    // ){
    //   if(//可放至前後
    //       config?.only_accepted_siblings && config?.only_accepted_siblings?.includes(source_node?.type)|| 
    //       config?.except_accepted_siblings && !config?.except_accepted_siblings?.includes(source_node?.type)
    //   ){
    //      return tt();
    //   }else{  //不可放至前後
    //       return tf(); 
    //   }
      
    // }else{ //不可放入

    //   if(//可放至前後
    //       config?.only_accepted_siblings && config?.only_accepted_siblings?.includes(source_node?.type)|| 
    //       config?.except_accepted_siblings && !config?.except_accepted_siblings?.includes(source_node?.type)
    //   ){
    //       return ft();
    //   }else{  //不可放至前後
    //       return ff();
    //   }
     
    // }
}

export const elementMenuItemHoverDropHelper = (ref, element, item, hierarchy, monitor, topHandler, bottomHandler, inHandler, invalidHandler)=>{

    if (!ref.current) {
        console.log('no ref')
        invalidHandler()
        return
    }


    if(element?.parent_relation_uuid==item?.element?.parent_relation_uuid) { // prevent self hovering
        console.log(' drag to it self')
        invalidHandler()
        return
      }
      if((hierarchy||[])?.map(n=>n.parent_relation_uuid).includes(item?.element?.parent_relation_uuid)) { //  prevent move to child
        console.log('drag to decendents')
        invalidHandler()
        return 
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top


      elementCheckDropValidHelper(item?.element, element, 
        ()=>{
            const oneThirdY= (hoverBoundingRect.bottom - hoverBoundingRect.top) / 3;
            const twoThirdY= 2 * (hoverBoundingRect.bottom - hoverBoundingRect.top) / 3;

            if(hoverClientY < oneThirdY){
                topHandler();
            }else if(twoThirdY < hoverClientY ){
                bottomHandler();
            }else{
                inHandler();
            }
        },
        ()=>{
            inHandler();
        },
        ()=>{
            const middleY= (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            if(hoverClientY < middleY){
                topHandler();
            }else{
                bottomHandler();
            }
        },
        ()=>{
            invalidHandler()
        }
      )




}


export const webpageCheckDropValidHelper = (type, targetWebpage, beforeAfterIn, onlyIn, beforeAfter, invalid)=>{

    if(type=='element'){
        return onlyIn();
    }else if(type=='webpage'){
        return beforeAfter();
    }else{
        return invalid();
    }
    
}


export const webpageMenuItemHoverDropHelper = (ref, webpage, item, monitor, topHandler, bottomHandler, inHandler, invalidHandler)=>{

    if (!ref.current) {
        console.log('no ref')
        invalidHandler()
        return
    }


    if(webpage?.uuid==item?.webpage?.uuid) { // prevent self hovering
        console.log(' drag to it self')
        invalidHandler()
        return
    }


      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

    let type;
    if(item?.webpage){type='webpage'}else{type='element'}
      webpageCheckDropValidHelper(type, webpage, 
        ()=>{
            const oneThirdY= (hoverBoundingRect.bottom - hoverBoundingRect.top) / 3;
            const twoThirdY= 2 * (hoverBoundingRect.bottom - hoverBoundingRect.top) / 3;

            if(hoverClientY < oneThirdY){
                topHandler();
            }else if(twoThirdY < hoverClientY ){
                bottomHandler();
            }else{
                inHandler();
            }
        },
        ()=>{
            inHandler();
        },
        ()=>{
            const middleY= (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            if(hoverClientY < middleY){
                topHandler();
            }else{
                bottomHandler();
            }
        },
        ()=>{
            invalidHandler()
        }
      )




}

