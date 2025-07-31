"use client"


import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useRef } from "react";
import clsx from "clsx";


import { useAppSelector } from "@/redux/hooks";   


import style from "./ChatMessage.module.scss"



const ChatMessage = ({chatMessage, component})=>{



    return (
        <div style={{display:'flex', flexDirection:'row', alignItems:'end', justifyContent:chatMessage?.user?'start':'end'}}>

            {
                chatMessage?.customer &&
                <div className={style['datetime']}>
                    {new Date(chatMessage?.created_at).toLocaleTimeString().slice(0,-3)}
                </div>
            }
             <div 
                className={clsx(style['chat-message'], chatMessage?.user?style['user']:style['customer'])}
                
                style={{
                    backgroundColor:
                        chatMessage?.user
                        ?
                        component?.store_message_background_color?`rgba(${component?.store_message_background_color.r}, ${component?.store_message_background_color.g}, ${component?.store_message_background_color.b}, ${component?.store_message_background_color.a})`:''
                        :
                        component?.customer_message_background_color?`rgba(${component?.customer_message_background_color.r}, ${component?.customer_message_background_color.g}, ${component?.customer_message_background_color.b}, ${component?.customer_message_background_color.a})`:'',
                    color:component?.message_text_color?`rgba(${component?.message_text_color.r}, ${component?.message_text_color.g}, ${component?.message_text_color.b}, ${component?.message_text_color.a})`:'',
                }}
            >

                {chatMessage?.message||''}

            </div>

            {
                chatMessage?.user &&
                <div className={style['datetime']}>
                    {new Date(chatMessage?.created_at).toLocaleTimeString().slice(0,-3)}
                </div>
            }

        </div>
       

    )

}

export default ChatMessage;




