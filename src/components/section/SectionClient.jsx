"use client"

import { useEffect, useState } from "react";
import { initListenEvents, removeListenEvents} from '@/lib/utils/listenEventHelper.js'


const  SectionClient = ({node_uuid, listen_events, init_css}) => {


    // const [done, setDone] = useState(false)

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


    return null

};

SectionClient.propTypes = {
};

export default SectionClient;



