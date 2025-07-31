
import { io } from "socket.io-client";
import Cookies from 'js-cookie'

// export const socket = io(`${import.meta.env.VITE_APP_WEBSOCKET_PROTOCAL}://${import.meta.env.VITE_APP_WEBSOCKET_HOSTNAME}${import.meta.env.VITE_APP_WEBSOCKET_PORT?':'+import.meta.env.VITE_APP_WEBSOCKET_PORT:''}/${namespace}`,{transports: ['websocket', 'polling']})
export const initSocketConnection = (namespace, store_uuid)=>{
    console.log('init socket host')
    console.log(window.location.host)
    console.log(import.meta.env.VITE_APP_WEBSOCKET_HOSTNAME)
    const socket = io(
        // `${import.meta.env.VITE_APP_WEBSOCKET_PROTOCAL}://${import.meta.env.NODE_ENV === 'development'?import.meta.env.VITE_APP_WEBSOCKET_HOSTNAME:window.location.host}${import.meta.env.VITE_APP_WEBSOCKET_PORT?':'+import.meta.env.VITE_APP_WEBSOCKET_PORT:''}/${namespace}`
        `${import.meta.env.VITE_APP_WEBSOCKET_PROTOCAL}://${import.meta.env.VITE_APP_WEBSOCKET_HOSTNAME}${import.meta.env.VITE_APP_WEBSOCKET_PORT?':'+import.meta.env.VITE_APP_WEBSOCKET_PORT:''}/${namespace}`

        ,{
            transports: ['websocket', 'polling'],
            auth: {
                token: Cookies?.get('user_access_token'),
                target_store:store_uuid
            }

        }
    
    
    
    
    
    )


    
    // socket.on("connect", () => {
    //     console.log(socket.id); 
    //     console.log('socket connected')

    // });
    

    

    socket.on("disconnect", (reason, details) => {

        console.log('socket disconnect')

        if(['io server disconnect, io client disconnect'].includes(reason)){
            //reconnect manually
            setTimeout(() => {socket.connect();}, 1000);
        }
    });


    return socket
}

//個人分擔
    // 黃:
    // 飲料：  875
    //----------------------
    //total: 875

    // Albert:
    // 飲料: 420
    // 小姐: 975 *2 =1950
    //----------------------
    //total: 2370

    // LIN:
    // 飲料: 420
    // 小姐: 975 *2 =1950
    //----------------------
    //total: 2370


// 均分款項-->   (酒店帳單15000 + 計程車司機車費1000) - 875 -2370 -2370  == 10385
// 每人負擔-->   10385 / 3 == 3461

// 美金付款的換匯損失--> 500


// 黃:
// 飲料：  875
// 每人負擔: 3461
//----------------------
//total: 4336

// Albert:
// 飲料: 420
// 小姐: 975 *2 =1950
// 每人負擔: 3461
// 美金付款的換匯損失--> 500/2 = 250
//----------------------
//total: 6081

// LIN:
// 飲料: 420
// 小姐: 975 *2 =1950
// 每人負擔: 3461
// 美金付款的換匯損失--> 500/2 = 250
//----------------------
//total: 6081



//當天付款
//黃： 5000php+ 100usd  == 10500php
//LIN ： 4000php
//ALBERT ： 2000php


//BALANCE:
//黃： +6164
//LIN ： -2081
//ALBERT ： -4081