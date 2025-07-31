
import React, { Fragment, useState, useEffect ,lazy } from "react";
import clsx from "clsx";
// import style from './TimeoutEventsForm.module.scss'


import Button from 'react-bootstrap/Button';

const EmitEventForm=({emitEvent, setEmitEvent, removeEmitEvent})=>{

    
    return(
        <Fragment>
            <div style={{
                display:'flex', 
                flexDirection:'column', 
                justifyContent:'center' ,
                marginTop:'10px', 
                borderColor:'gray', 
                borderWidth:'1px', 
                borderStyle:'solid',
                borderRadius:'5px',
                padding:'10px'
                
            }}>

 
                
                <div style={{display:'flex', flexDirection:'row', justifyContent:'start' , alignContent:'center', marginTop:'10px'}}> 

                    <label style={{fontSize:'15px', fontWeight:'400', color:'gray'}}>啟用:</label>

                    <div>
                        <input
                            type='checkbox'
                            checked={(emitEvent?.enable)}
                            value=''
                            onChange={(e)=>{
                                setEmitEvent({...emitEvent, enable:e.target.checked})    }}                    
                        />
                    </div>
                </div>
                <div style={{display:'flex', flexDirection:'row', justifyContent:'start' , alignContent:'center', marginTop:'10px'}}> 
                    <label style={{fontSize:'15px', fontWeight:'400', color:'gray'}}>事件名稱:</label>
                    <input type='text' 
                    style={{ paddingLeft:"20px", paddingRight:"20px", marginLeft:'auto'}}
                    value={emitEvent?.emit_event_name||''} onChange={(e)=>{setEmitEvent({...emitEvent, emit_event_name:e.target.value})}}/>
                </div> 

            
                

                <Button 
                    variant="secondary"
                    onClick={()=>{removeEmitEvent()}}
                    style={{ marginTop:'10px'}}
                    >
                                刪除
                </Button>

                
            </div>
        </Fragment>
    )
}

export default EmitEventForm
;
