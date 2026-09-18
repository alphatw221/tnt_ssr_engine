
import React, { Fragment, useState, useEffect } from "react";
import OrderPayment from "./OrderPayment";
const OrderPaymentSSR = ({  
    ...props
}) => {


    
    const [guestUUID, setGuestUUID] = useState()
    const [objectUUID, setObjectUUID] = useState()
    const [ready, setReady] = useState(false)
    useEffect(()=>{
        setGuestUUID(new URLSearchParams(window.location.search).get('guest_uuid'))
        setObjectUUID(window?.__SSR_PARAMS__?.objectUUID)
        setReady(true)
    },[])
    return ready?<OrderPayment objectUUID={objectUUID} guestUUID={guestUUID} {...props}/>:null
};



export default OrderPaymentSSR;




