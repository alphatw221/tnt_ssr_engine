
import React, { Fragment, useState, useEffect ,lazy } from "react";
import clsx from "clsx";
import style from './ListenEventsForm.module.scss'


import Button from 'react-bootstrap/Button';




const EventsForm=({instance, updateInstance, updateData, title, prop_key, EventFormComponent})=>{

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

                <h5>{title}</h5>
                {
                    (instance?.data?.[prop_key]||[]).length>0 ?
                    (instance?.data?.[prop_key]||[]).map((event,key)=>
                        {
                            const setEvent = (data)=>{
                                const instanceData = {...(instance.data||{})};
                                instanceData[prop_key] = (instance?.data?.[prop_key]||[]).map((_event, _index)=>_index==key?data:_event)
                                updateInstance?.({...instance, data:instanceData})
                                updateData?.(instanceData)
                            }

                            const removeEvent = ()=>{
                                const instanceData = {...(instance.data||{})};
                                instanceData[prop_key] = (instance?.data?.[prop_key]||[]).filter((_event, _index)=>_index!=key);
                                updateInstance?.({...instance, data:instanceData })
                                updateData?.(instanceData)
                            }

                            return (<EventFormComponent 
                                key={key}
                                event={event}
                                setEvent={setEvent}
                                removeEvent={removeEvent}
                            />)
                        }
                    )
                    :
                    <span className="text-center">
                        無{title}
                    </span>
                }

                <Button 
                    variant="secondary" 
                    onClick={(e)=>{
                        const instanceData = {...(instance.data||{})};
                        instanceData[prop_key] = [...(instance?.data?.[prop_key]||[]), {} ]

                        console.log(instanceData)
                        updateInstance?.({...instance, data:instanceData})
                        updateData?.(instanceData)
                    }}
                    style={{ marginTop:'10px'}}

                >新增</Button>
              
                
            </div>
        </Fragment>
    )
}

export default EventsForm;
