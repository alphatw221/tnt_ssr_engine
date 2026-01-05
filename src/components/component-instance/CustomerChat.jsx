"use client"


import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useRef } from "react";
import clsx from "clsx";


import { useAppSelector } from "@/redux/hooks";   

import {useClickOutsideEvent} from '../../lib/utils/clickOutside.js'
import { rwdHelper, RWDPropHandler} from "../../lib/utils/rwdHelper"

import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
} from "@chatscope/chat-ui-kit-react";

import Cookies from "js-cookie";
import { customer_send_message, customer_read_message, customer_retrieve_chat, customer_search_chat_messages} from "../../api/chat.js"
import { timeAgo } from "../../lib/utils/timeAgo.js"

import style from "./CustomerChat.module.scss"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import {Button} from 'react-bootstrap';
import ChatMessage from '../component(no_use)/chat-message/ChatMessage.js'
import DateSegment from '../component(no_use)/chat-message/DateSegment.js'

const CustomerChat = ({component})=>{


    const [chatContainerActive, setChatContainerActive] = useState(false)
    const [chatSocket, setChatSocket] = useState(null)
    const [chat, setChat] = useState(null)
    const [chatMessages, setChatMessages] = useState([])


    const [messagesGotNext, setMessagesGotNext] = useState(false)
    const [messageCursor, setMessageCursor] = useState('')
    const [keepScrollToBottom, setKeepScrollToBottom] = useState(true)
    const [latch, setLatch] = useState(true)


    const messageList = useRef(null)

    const estore = useAppSelector((state) => state.estore);

    const openWebsocket = ()=>{

        const CustomerChatSocket = new WebSocket(`${process.env.NEXT_PUBLIC_WEBSOCKET_PROTOCAL}://${location.hostname}${process.env.NEXT_PUBLIC_WEBSOCKET_PORT?':'+process.env.NEXT_PUBLIC_WEBSOCKET_PORT:''}/ws/v1/store/chat/customer?customer_access_token=${Cookies.get('customer_access_token')||''}`)
        setChatSocket(CustomerChatSocket)
    }

    // const closeWebsocket = ()=>{
    //     if(chatSocket){
    //         chatSocket.close(1000)
    //     }
    // }

    useEffect(()=>{

        if(chatSocket){
            chatSocket.onmessage = (e)=>{
                const data = JSON.parse(e.data)
                setChatMessages([...chatMessages, data?.payload])
                if(data?.payload?.user){
                    if(chatContainerActive){
                        customer_read_message().then(res=>{
                            console.log(res.data)
                            setChat({...chat, customer_unread_count:0})
                        })
                    }else{
                        setChat({...(chat||{}), customer_unread_count:(chat?.customer_unread_count||0)+1})
                    }
                }
                
                if(keepScrollToBottom){
                    window.setTimeout(()=>{
                        scrollToBottom()
                    },1)
                }
    
            }
            chatSocket.onopen = (e)=>{
                console.log(e)
            }
    
            chatSocket.onclose = (e)=>{

                if(e?.code!=1000){
                    console.log('123')
                    window.setTimeout(()=>{
                        openWebsocket()
                    },1000)
                }else{
                    console.log(e)
            
                }
    
            }
            chatSocket.onerror = (e)=>{
                console.log(e)
            }
        }
    },[chatSocket, chat, setChat, chatMessages, setChatMessages, chatContainerActive, keepScrollToBottom, openWebsocket])


    const scrollToBottom = ()=>{
        if(messageList.current){
            messageList.current.scrollTop = messageList.current.scrollHeight;
        }
    }
      
    useEffect(()=>{

        if(!chatSocket && !['', null, undefined].includes(Cookies.get('customer_access_token'))){

            openWebsocket()
        }
        return () => {
            if(chatSocket){
                console.log('close')
                chatSocket.close(1000)
            }
        
        };
    },[chatSocket])

    useEffect(()=>{
        if(!['', null, undefined].includes(Cookies.get('customer_access_token'))){
            customer_retrieve_chat().then(res=>{

                if(res?.data?.chat){
                    setChat(res?.data?.chat)
                    setChatMessages((res?.data?.chat_messages?.results||[]).reverse())

                    if(res?.data?.chat_messages?.next){
                        setMessagesGotNext(true)
                        const next = (res?.data?.chat_messages?.next||'')
                        const searchParams = new URLSearchParams(next.substring(next.indexOf('?')))
                        setMessageCursor(searchParams.get('cursor')||'')
                
                    }else{
                        setMessagesGotNext(false)
                    }


                    if(keepScrollToBottom){
                        window.setTimeout(()=>{
                            scrollToBottom()
                        },1)
                    }
                }
    
            })
        }
    },[])

    useEffect(()=>{
        if(chatContainerActive && (chat?.customer_unread_count||0)>0){
            customer_read_message().then(res=>{

                setChat({...chat, customer_unread_count:0})
            })
        }
    }, [chatContainerActive, chat, setChat])

    const handleMessageScroll = (e)=>{

        if(Math.abs(e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop) < 1 && keepScrollToBottom==false){
            setKeepScrollToBottom(true)
        }else if(Math.abs(e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop) >= 1 && keepScrollToBottom==true){
            setKeepScrollToBottom(false)
        }else if (e.target.scrollTop < (e.target.scrollHeight - e.target.clientHeight)*0.3 &&  messagesGotNext && latch ){
            console.log('trigger')
            setLatch(false)
            const SnapshotScrollBottom = e.target.scrollHeight-e.target.clientHeight-e.target.scrollTop
            const SnapshotScrollTop = e.target.scrollTop

            var _cursor
            customer_search_chat_messages(_cursor=messageCursor).then(res=>{

                if(res?.data?.next){
                    setMessagesGotNext(true)
                    const next = (res?.data?.next||'')
                    const searchParams = new URLSearchParams(next.substring(next.indexOf('?')))
                    setMessageCursor(searchParams.get('cursor')||'')
            
                }else{
                    setMessagesGotNext(false)
                }


                setChatMessages([...(res?.data?.results||[]).reverse(), ...chatMessages])
                window.setTimeout(()=>{
                    const move = SnapshotScrollTop - messageList.current.scrollTop
                    const scroll_top = messageList.current.scrollHeight - messageList.current.clientHeight - SnapshotScrollBottom - move
                    messageList.current.scrollTop = scroll_top
                    setLatch(true)
                },1)
                

            })
        }
    }


    return (
        <div className={style['component']}>

            <div 
                style={{ 
                    display:'flex', 
                    flexDirection:'column', 
                    justifyContent:'center', 
                    alignContent:'center',
                    backgroundColor:component?.icon_background_color?`rgba(${component?.icon_background_color.r}, ${component?.icon_background_color.g}, ${component?.icon_background_color.b}, ${component?.icon_background_color.a})`:'',
                    color:component?.icon_color?`rgba(${component?.icon_color.r}, ${component?.icon_color.g}, ${component?.icon_color.b}, ${component?.icon_color.a})`:'',

                }} 
                className={style['icon']} 
                onClick={()=>{setChatContainerActive(!chatContainerActive)}}>

                <FontAwesomeIcon  icon={faComment} />

                {
                    chat?.customer_unread_count >0 &&

                    <div className={style['unread-count']} 
                        
                    >
                        {chat?.customer_unread_count||''}
                    </div>
                }
            </div>
            <div className={clsx(style['chat-container'], chatContainerActive?style['active']:'')}>

                {
                    ['', null, undefined].includes(Cookies.get('customer_access_token')) 
                    ?
                    <div style={{width:'100%', height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignContent:'center', alignItems:'center', rowGap:'10px', paddingLeft:'10px', paddingRight:'10px'}} >
                        <h3 className="text-center">請先登入或註冊以聯繫客服人員</h3>
                        <Link href={'/login'} className={style['button']}>
                            {/* 登入 */}
                            <Button variant="secondary" >登入</Button>

                        </Link>
                        <Link href={'/register'} className={style['button']}>
                            {/* 註冊 */}
                            <Button variant="secondary" >註冊</Button>

                        </Link>


                    </div>
                    :

                    // <div className={style['message-list']}>
                    <Fragment>

                        <div 
                            className={style['chat-contact']} 
                            style={{
                                backgroundColor:component?.contact_background_color?`rgba(${component?.contact_background_color.r}, ${component?.contact_background_color.g}, ${component?.contact_background_color.b}, ${component?.contact_background_color.a})`:'',
                            }}>
                            <img src={estore?.store?.favicon} alt="" style={{height:'50px', width:'50px', borderRadius:'50%'}}/>
                            <h3 
                                style={{
                                    marginBottom:'0px', 
                                    marginLeft:'20px',
                                    color:component?.contact_text_color?`rgba(${component?.contact_text_color.r}, ${component?.contact_text_color.g}, ${component?.contact_text_color.b}, ${component?.contact_text_color.a})`:'',
                            }}>
                                {estore?.store?.name}
                            </h3>
                        </div>
                        <div className={style['message-list']}  ref={messageList} onScroll={handleMessageScroll}>
                            {chatMessages.map((chatMessage, messageIndex)=>(

                                <Fragment key={messageIndex}>
                                    {messageIndex>0  && new Date(chatMessage?.created_at).toLocaleDateString() != new Date(chatMessages?.[messageIndex-1]?.created_at).toLocaleDateString() &&
                                        <DateSegment date={new Date(chatMessage?.created_at)}/>
                                    }

                                    <ChatMessage chatMessage={chatMessage} component={component}/>
       
                                </Fragment>

                            ))}
                        </div>
                        <div className={style['chat-input']} style={{display:'flex', flexDirection:'column', justifyContent:'center', alignContent:'center'}}>
                            <MessageInput placeholder="輸入訊息 Type message here" attachButton={false} onSend={(innerHtml,textContent,innerText,nodes)=>{
                                 customer_send_message(innerText).then(res=>{
                                     setChatMessages([...chatMessages, res.data])

                                     if(keepScrollToBottom){
                                        window.setTimeout(()=>{
                                            scrollToBottom()
                                        },1)
                                    }
                                 })
                             }}/>
                        </div>
                    </Fragment>

                    // </div>

                    // <MainContainer>
                    //     <ChatContainer>

                         
                    //         <MessageList onScroll={(e)=>{console.log(e)}}>
                                
                    //             {chatMessages.map((chatMessage, massageIndex)=>(

                    //                 <Message
                    //                     model={{
                    //                         message: chatMessage?.message||'',
                    //                         sentTime: timeAgo(new Date(chatMessage?.created_at)),
                    //                         sender: chatMessage?.user?chatMessage?.user:chatMessage?.customer,
                    //                         direction: chatMessage?.user?'incomming':'outgoing'
                    //                     }}
                    //                 />
                    //             ))}
                            
                    //         </MessageList>
                    //         <MessageInput placeholder="Type message here" onSend={(innerHtml,textContent,innerText,nodes)=>{
                    //             customer_send_message(innerText).then(res=>{
                    //                 setChatMessages([...chatMessages, res.data])
                    //             })
                    //         }}/>
                    //     </ChatContainer>
                    // </MainContainer> 
                }
                 



            </div>

           


        </div>

    )

}

export default CustomerChat;




