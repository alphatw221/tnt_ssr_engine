
import React, { Fragment, useState, useEffect ,lazy } from "react";
import clsx from "clsx";
import style from './ListenEventsForm.module.scss'


import Button from 'react-bootstrap/Button';

import ListenEventForm from './listen-event-form/ListenEventForm';

const ListenEventsForm=({instance, updateInstance})=>{
    
    return(
        <Fragment>
            <div style={{
                display:'flex', 
                flexDirection:'column', 
                justifyContent:'center' ,
                marginTop:'20px', 
                marginBottom:'20px',
                borderColor:'gray', 
                borderWidth:'1px', 
                borderStyle:'solid',
                borderRadius:'5px',
                padding:'10px'
                
            }}>

                <h5>監聽事件</h5>
                {
                    (instance?.data?.listen_events||[]).length>0 ?
                    (instance?.data?.listen_events||[]).map((listenEvent,key)=>
                        {
                            const setListenEvent = (data)=>{
                                updateInstance({...instance, data:{...(instance.data||{}), listen_events:(instance?.data?.listen_events||[]).map((_listen_event, _index)=>_index==key?data:_listen_event)}})
                            }

                            const removeListenEvent = ()=>{
                                updateInstance({...instance, data:{...(instance.data||{}), listen_events:(instance?.data?.listen_events||[]).filter((_listen_event, _index)=>_index!=key)} })
                            }
                    
                            return (<ListenEventForm key={key}

                                listenEvent={listenEvent}
                                setListenEvent={setListenEvent}
                                removeListenEvent={removeListenEvent}
                            />)
                        }
                    )
                    :
                    <span className="text-center">
                        無監聽事件
                    </span>
                }

                <Button 
                    variant="secondary" 
                    onClick={(e)=>{
                        updateInstance({...instance, data:{...(instance.data||{}), listen_events:[...(instance?.data?.listen_events||[]), {action_type:''} ]} })
                    }}
                    style={{ marginTop:'10px'}}

                >新增事件</Button>
              
                
            </div>
        </Fragment>
    )
}

export default ListenEventsForm;
