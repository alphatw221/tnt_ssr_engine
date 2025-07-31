"use client"
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect ,lazy, useRef } from "react";
import clsx from "clsx";
import style from './Node.module.scss'
import { initListenEvents, removeListenEvents} from '@/lib/utils/listenEventHelper.js'
import { convertStyleStringToObject } from "@/lib/utils/styleStringToObject"
import {isInViewport} from "@/lib/utils/isInViewportHelper"

const NodeClient = ({ 

    node_uuid,
    init_css,
    listen_events,
    present_events,

    mouse_click_events,
    mouse_over_events,
    mouse_leave_events,
    mouse_click_outside_events,

    enable_reveal,
    reveal_offset

}) => {


    //init css
    useEffect(()=>{
        if(init_css && node_uuid){
            let s = document.createElement('style');
            s.id = `init_style_sheet_${node_uuid}`
            s.type = 'text/css';
            s.innerHTML = `.node_${node_uuid} ${init_css||''}`;

            document?.getElementById(`init_style_sheet_${node_uuid}`)?.remove()
            document.head.appendChild(s);
        }
      
    },[init_css, node_uuid])


    //handle click outside events
    useEffect(()=>{

        const events = [];
        (mouse_click_outside_events||[]).filter(_mouse_click_outside_event=>_mouse_click_outside_event?.enable).forEach(mouse_click_outside_event => {
            
            // mouse_click_outside_event?.target_class_name
            const handleClickOutside = (event)=> {
                if(!document?.getElementById(`node_${node_uuid}`)?.contains?.(event.target) &&
                    document?.getElementById(`node_${node_uuid}`)?.classList?.contains?.(mouse_click_outside_event?.target_class_name)
                ){
                    document?.getElementById(`node_${node_uuid}`)?.classList?.remove?.(mouse_click_outside_event?.target_class_name)
                }
            }
            document.addEventListener("click", handleClickOutside,true);
            events.push(handleClickOutside)
        });
        return ()=>{
            events.forEach((event,i) => {
                document?.removeEventListener('click', event)
            });
        }
    },[mouse_click_outside_events])




    //handle listening events
   
    useEffect(()=>{
        const elementEvents = []
        const documentEvents = []
        const windowEvents = []

        initListenEvents(node_uuid, listen_events, elementEvents, documentEvents , windowEvents);

        return ()=>{
            removeListenEvents(node_uuid, elementEvents, documentEvents, windowEvents)
        }

    },[listen_events, node_uuid])
    

     //handle present events
     useEffect(()=>{
        
        if(!document?.getElementById(`node_${node_uuid}`)) return
        const events = [];
            

        (present_events||[]).filter(_event=>_event?.enable).forEach(event => {
        
            let trigger = false;
            let side = false;  //up=>true down=>false

            const eventHandler = (e)=>{
                     
                var rect = document?.getElementById(`node_${node_uuid}`)?.getBoundingClientRect();
                if(!rect)return
          
                if (
                    (event?.trigger_position=='top' && side && (event?.motion=='scroll_pass'||event?.motion=='scroll_up') && (rect.top+rect.bottom)/2>=0) ||
                    (event?.trigger_position=='middle' && side && (event?.motion=='scroll_pass'||event?.motion=='scroll_up') && (rect.top+rect.bottom)/2>=(window.innerHeight/2))||
                    (event?.trigger_position=='bottom' && side && (event?.motion=='scroll_pass'||event?.motion=='scroll_up') && (rect.top+rect.bottom)/2>=window.innerHeight)||
                    (event?.trigger_position=='top' && !side && (event?.motion=='scroll_pass'||event?.motion=='scroll_down') && (rect.top+rect.bottom)/2<0)||
                    (event?.trigger_position=='middle' && !side && (event?.motion=='scroll_pass'||event?.motion=='scroll_down') && (rect.top+rect.bottom)/2<(window.innerHeight/2))||
                    (event?.trigger_position=='bottom' && !side && (event?.motion=='scroll_pass'||event?.motion=='scroll_down') && (rect.top+rect.bottom)/2<window.innerHeight)
                    
                ){

                    side = !side
                    console.log(event?.trigger_event_name)
                    console.log(node_uuid)
                    const customEvent = new CustomEvent(event?.trigger_event_name);
                    document.dispatchEvent(customEvent);

                    if(event?.emit_event_once){
             
                        window.removeEventListener("scroll", eventHandler);

                    }


                }else if (
                    (event?.trigger_position=='top' && (rect.top+rect.bottom)/2<0)||
                    (event?.trigger_position=='middle' && (rect.top+rect.bottom)/2<(window.innerHeight/2))||
                    (event?.trigger_position=='bottom' && (rect.top+rect.bottom)/2<window.innerHeight)
                ){
                    side=true
                }else if(
                    (event?.trigger_position=='top' && (rect.top+rect.bottom)/2>=0) ||
                    (event?.trigger_position=='middle' && (rect.top+rect.bottom)/2>=(window.innerHeight/2))||
                    (event?.trigger_position=='bottom' && (rect.top+rect.bottom)/2>=window.innerHeight)
                ){
                    side=false
                }

            }

            window.addEventListener("scroll", eventHandler);
            events.push(eventHandler)

        })
            

        return ()=>{

            events.forEach((event,i) => {

                window.removeEventListener("scroll", event);

            });
        }

    },[present_events])


    //init mouse click emitEvent
    useEffect(()=>{
        const events = [];
        (mouse_click_events||[]).filter(_mouse_click_event=>_mouse_click_event?.enable).forEach(mouse_click_event => {
            
            const emitEvent = (e)=>{
                console.log(mouse_click_event?.emit_event_name)
                const customEvent = new CustomEvent(mouse_click_event?.emit_event_name, {detail:{param:mouse_click_event?.param, ...convertStyleStringToObject(mouse_click_event?.detail)}});
                document.dispatchEvent(customEvent);
            }
            events.push(emitEvent)
            document?.getElementById(`node_${node_uuid}`)?.addEventListener('click', emitEvent)
        });
        return ()=>{
            events.forEach((event,i) => {
                document?.getElementById(`node_${node_uuid}`)?.removeEventListener('click', event)
            });
        }
    },[mouse_click_events])

    //init mouse over emitEvent
    useEffect(()=>{
        const events = [];
        (mouse_over_events||[]).filter(_mouse_over_event=>_mouse_over_event?.enable).forEach(mouse_over_event => {
            
            const emitEvent = (e)=>{
                console.log(mouse_over_event?.emit_event_name)
                const customEvent = new CustomEvent(mouse_over_event?.emit_event_name, {detail:{param:mouse_over_event?.param, ...convertStyleStringToObject(mouse_over_event?.detail)}});
                document.dispatchEvent(customEvent);
            }
            events.push(emitEvent)
            document?.getElementById(`node_${node_uuid}`)?.addEventListener('mouseenter', emitEvent)
        });
        return ()=>{
            events.forEach((event,i) => {
                document?.getElementById(`node_${node_uuid}`)?.removeEventListener('mouseenter', event)
            });
        }
    },[mouse_over_events])

    //init mouse leave emitEvent
    useEffect(()=>{
        const events = [];
        (mouse_leave_events||[]).filter(_mouse_leave_events=>_mouse_leave_events?.enable).forEach(mouse_leave_event => {
            
            const emitEvent = (e)=>{
                console.log(mouse_leave_event?.emit_event_name)
                const customEvent = new CustomEvent(mouse_leave_event?.emit_event_name, {detail:{param:mouse_leave_event?.param, ...convertStyleStringToObject(mouse_leave_event?.detail)}});
                document.dispatchEvent(customEvent);
            }
            events.push(emitEvent)
            document?.getElementById(`node_${node_uuid}`)?.addEventListener('mouseleave', emitEvent)
        });
        return ()=>{
            events.forEach((event,i) => {
                document?.getElementById(`node_${node_uuid}`)?.removeEventListener('mouseleave', event)
            });
        }
    },[mouse_leave_events])


    


    //handle scroll reveal
    const scroll_reveal = (e)=>{

        if(!document?.getElementById(`node_${node_uuid}`)) return
        if(!enable_reveal) return

        // console.log(document?.getElementById(`node_${node_uuid}`))

        let rwd_reveal_offset = String(reveal_offset||'').split(',')

        let rwd_index 
        if(window.innerWidth>=1536){rwd_index = 0}
        else if(window.innerWidth>=1280){rwd_index = 1}
        else if(window.innerWidth>=1024){rwd_index = 2}
        else if(window.innerWidth>=768){rwd_index = 3}
        else if(window.innerWidth>=640){rwd_index = 4}
        else if(window.innerWidth>=390){rwd_index = 5}
        else{rwd_index = 6}

        const reveal_offset_index = rwd_reveal_offset.findLastIndex((element, index) => index <= rwd_index)


        var elementTop = document?.getElementById(`node_${node_uuid}`)?.getBoundingClientRect().top;


        // console.log(elementTop);
        // console.log(window.innerHeight );
        // console.log(rwd_reveal_offset)

        // console.log(((parseInt(rwd_reveal_offset?.[reveal_offset_index]))||0) );


        if (elementTop < window.innerHeight - ((parseInt(rwd_reveal_offset?.[reveal_offset_index]))||0) ) {
            // console.log('reveal')
            // setReveal(true)
            document?.getElementById(`node_${node_uuid}`)?.classList?.add(style['reveal'])
            //set css
            window.removeEventListener("scroll", scroll_reveal);

        } 

    }

    //handle scroll event
    useEffect(() => {
        // const browserPreview = document.getElementById('kp_browser_preview')

        if(enable_reveal){
            window.addEventListener("scroll", scroll_reveal);
        }



        return () => {
            window.removeEventListener("scroll", scroll_reveal);
        };
    }, [
        enable_reveal, 
        reveal_offset]);

    return null

    
};

NodeClient.propTypes = {

};

export default NodeClient;
