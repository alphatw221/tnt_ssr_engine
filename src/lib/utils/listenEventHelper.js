
const addCSS = (node_uuid, listen_event_name, css, delay)=>{
    let s = document.createElement('style');
    s.id = `style_sheet_${node_uuid}_${listen_event_name}`
    s.type = 'text/css';
    s.innerHTML = `.node_${node_uuid} ${css||''}`;
    if(delay){
        setTimeout(()=>{document.head.appendChild(s);},delay)
    }else{
        document.head.appendChild(s);
    }
}
const removeCSS = (node_uuid, target_event_name, delay)=>{
    // let ele = document.getElementById(`style_sheet_${node_uuid}_${target_event_name}`);
    const elements = document.querySelectorAll(`#style_sheet_${node_uuid}_${target_event_name}`)
    if(delay){
        setTimeout(()=>{
            // ele?.remove();
            elements.forEach(element => {
                element.remove();
              });
        },delay)
    }else{
        // ele?.remove();
        elements.forEach(element => {
            element.remove();
          });
    }
}
const toggleCSS = (node_uuid, listen_event_name, css, delay) => {
    let ele = document.getElementById(`style_sheet_${node_uuid}_${listen_event_name}`);
    if(ele){
        removeCSS(node_uuid, listen_event_name, delay)
    }else{
        addCSS(node_uuid, listen_event_name, css, delay)
    }
}



const eventHandlerHelper = (node_uuid, listen_event_name, action_type, target_event_name, delay, css, class_names, windowEvents, scrollHandler, mouseMoveHandler)=>{
    if(action_type=='add_css'){
        addCSS(node_uuid, listen_event_name, css, delay)
    }else if(action_type=='remove_css'){
        removeCSS(node_uuid, target_event_name, delay)
    }else if(action_type=='toggle_css'){
        toggleCSS(node_uuid, listen_event_name, css, delay)
    }
    else if(action_type=='add_classes'){
        const targetElement = document.getElementById(`node_${node_uuid}`)
        if(delay){
            setTimeout(()=>{
                targetElement?.classList?.add(...(class_names?.split(',')||[]))
            },delay)
        }else{
            targetElement?.classList?.add(...(class_names?.split(',')||[]))
        }

    }else if(action_type=='remove_classes'){
        const targetElement = document.getElementById(`node_${node_uuid}`)
        if(delay){
            setTimeout(()=>{
                targetElement?.classList?.remove(...(class_names?.split(',')||[]))
            },delay)
        }else{
            targetElement?.classList?.remove(...(class_names?.split(',')||[]))
        }
        
    }else if(action_type=='toggle_classes'){

        const targetElement = document.getElementById(`node_${node_uuid}`)
        if(delay){
            setTimeout(()=>{
                (class_names?.split(',')||[]).forEach((className, i)=>{
                    targetElement?.classList?.toggle(className)
                })
            },delay)
        }else{
            (class_names?.split(',')||[]).forEach((className, i)=>{
                targetElement?.classList?.toggle(className)
            })
        }
        
    }
    
    else if(action_type=='listen_cursor'){
        window.addEventListener('mousemove', mouseMoveHandler)
        windowEvents.push({eventName:'mousemove', 'eventHandler':mouseMoveHandler})
    }else if(action_type=='remove_cursor_listener'){
        window?.removeEventListener('mousemove', mouseMoveHandler)
    }else if(action_type=='listen_scroll'){
        window.addEventListener('scroll', scrollHandler)
        windowEvents.push({eventName:'scroll', 'eventHandler':scrollHandler})
    }else if(action_type=='remove_scroll_listener'){
        window?.removeEventListener('scroll', scrollHandler)
    }
}
export const initListenEvents = (node_uuid, listen_events, elementEvents, documentEvents,  windowEvents, listen_param_events ) =>{



    const mouseMoveHandler = (e)=>{

        document?.getElementById(`node_${node_uuid}`)?.style?.setProperty('--mouse-x',e.clientX/window.innerWidth)
        document?.getElementById(`node_${node_uuid}`)?.style?.setProperty('--mouse-y',e.clientY/window.innerHeight)
    }
    
    const scrollHandler = (e)=>{
        document?.getElementById(`node_${node_uuid}`)?.style?.setProperty('--scroll-x',window.scrollX/window.innerWidth)
        document?.getElementById(`node_${node_uuid}`)?.style?.setProperty('--scroll-y',window.scrollY/window.innerHeight)
    }

    // v2 of listen event feature
    // (listen_param_events||[]).filter(_listen_param_events=>_listen_param_events?.enable).forEach(listen_param_event=>{
    //     const eventHandler = (e)=>{
    //         if(e?.detail?.param===listen_param_event?.param){
    //             eventHandlerHelper(
    //                 node_uuid, 
    //                 listen_param_event?.listen_event_name, 
    //                 listen_param_event?.match_action_type, 
    //                 listen_param_event?.match_target_event_name, 
    //                 listen_param_event?.match_delay, 
    //                 listen_param_event?.match_css, 
    //                 listen_param_event?.match_class_names, 
    //                 windowEvents, scrollHandler, mouseMoveHandler)
    //         }else{
    //             eventHandlerHelper(
    //                 node_uuid, 
    //                 listen_param_event?.listen_event_name, 
    //                 listen_param_event?.unmatch_action_type, 
    //                 listen_param_event?.unmatch_target_event_name, 
    //                 listen_param_event?.unmatch_delay, 
    //                 listen_param_event?.unmatch_css, 
    //                 listen_param_event?.unmatch_class_names, 
    //                 windowEvents, scrollHandler, mouseMoveHandler)
    //         }
    //     }
    //     documentEvents.push({eventName:listen_param_events?.listen_event_name||'',eventHandler})
    //     document.addEventListener(listen_param_events?.listen_event_name||'', eventHandler)
    // })

    (listen_events||[]).filter(_listen_event=>_listen_event?.enable).forEach(listen_event => {


        const eventHandler = (e)=>{
            if(![null, undefined, ''].includes(listen_event?.param)){
                if(e?.detail?.param === listen_event?.param){
                    eventHandlerHelper(
                        node_uuid, 
                        listen_event?.listen_event_name, 
                        listen_event?.action_type, 
                        listen_event?.target_event_name, 
                        listen_event?.delay, 
                        listen_event?.css, 
                        listen_event?.class_names, 
                        windowEvents, scrollHandler, mouseMoveHandler)
                }else{
                    eventHandlerHelper(
                        node_uuid, 
                        listen_event?.listen_event_name, 
                        listen_event?.unmatch_action_type, 
                        listen_event?.unmatch_target_event_name, 
                        listen_event?.unmatch_delay, 
                        listen_event?.unmatch_css, 
                        listen_event?.unmatch_class_names, 
                        windowEvents, scrollHandler, mouseMoveHandler)
                }
            }else{
                eventHandlerHelper(
                    node_uuid, 
                    listen_event?.listen_event_name, 
                    listen_event?.action_type, 
                    listen_event?.target_event_name, 
                    listen_event?.delay, 
                    listen_event?.css, 
                    listen_event?.class_names, 
                    windowEvents, scrollHandler, mouseMoveHandler)
            }
        }
        // const eventHandler = (e)=>{
          
        //     if(listen_event?.action_type=='add_css'){
        //         addCSS(node_uuid, listen_event?.listen_event_name, listen_event?.css, listen_event?.delay)
        //     }else if(listen_event?.action_type=='remove_css'){
        //         removeCSS(node_uuid, listen_event?.target_event_name, listen_event?.delay)
        //     }else if(listen_event?.action_type=='toggle_css'){
        //         toggleCSS(node_uuid, listen_event?.listen_event_name, listen_event?.css, listen_event?.delay)
        //     }
        //     else if(listen_event?.action_type=='add_classes'){

        //         const targetElement = document.getElementById(`node_${node_uuid}`)
        //         if(listen_event?.delay){
        //             setTimeout(()=>{
        //                 targetElement?.classList?.add(...(listen_event?.class_names?.split(',')||[]))
        //             },listen_event?.delay)
        //         }else{
        //             targetElement?.classList?.add(...(listen_event?.class_names?.split(',')||[]))
        //         }

        //     }else if(listen_event?.action_type=='remove_classes'){
        //         const targetElement = document.getElementById(`node_${node_uuid}`)
        //         if(listen_event?.delay){
        //             setTimeout(()=>{
        //                 targetElement?.classList?.remove(...(listen_event?.class_names?.split(',')||[]))
        //             },listen_event?.delay)
        //         }else{
        //             targetElement?.classList?.remove(...(listen_event?.class_names?.split(',')||[]))
        //         }
                
        //     }else if(listen_event?.action_type=='toggle_classes'){

        //         const targetElement = document.getElementById(`node_${node_uuid}`)
        //         if(listen_event?.delay){
        //             setTimeout(()=>{
        //                 (listen_event?.class_names?.split(',')||[]).forEach((className, i)=>{
        //                     targetElement?.classList?.toggle(className)
        //                 })
        //             },listen_event?.delay)
        //         }else{
        //             (listen_event?.class_names?.split(',')||[]).forEach((className, i)=>{
        //                 targetElement?.classList?.toggle(className)
        //             })
        //         }
                
        //     }
            
        //     else if(listen_event?.action_type=='listen_cursor'){
        //         window.addEventListener('mousemove', mouseMoveHandler)
        //         windowEvents.push({eventName:'mousemove', 'eventHandler':mouseMoveHandler})
        //     }else if(listen_event?.action_type=='remove_cursor_listener'){
        //         window?.removeEventListener('mousemove', mouseMoveHandler)
        //     }else if(listen_event?.action_type=='listen_scroll'){
        //         window.addEventListener('scroll', scrollHandler)
        //         windowEvents.push({eventName:'scroll', 'eventHandler':scrollHandler})
        //     }else if(listen_event?.action_type=='remove_scroll_listener'){
        //         window?.removeEventListener('scroll', scrollHandler)
        //     }

        // }
        documentEvents.push({eventName:listen_event?.listen_event_name||'',eventHandler})
        document.addEventListener(listen_event?.listen_event_name||'', eventHandler)
    });
}

export const removeListenEvents = (node_uuid, elementEvents, documentEvents, windowEvents)=>{
    documentEvents.forEach((event,i) => {
        document.removeEventListener(event.eventName, event.eventHandler)
    });

    // elementEvents.forEach((event,i) => {
    //     document?.getElementById(`node_${node_uuid}`)?.removeEventListener(event.eventName, event.eventHandler)
    // });

    // windowEvents.forEach((event,i) => {
    //     window?.removeEventListener(event.eventName, event.eventHandler)
    // });
    // if(node_uuid=='f28a8c80-6a87-4c6a-833b-5354beb7a7fe'){
    //     console.log('remove listen event')
    // }
}

