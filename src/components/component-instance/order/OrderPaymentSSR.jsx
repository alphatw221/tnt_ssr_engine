
import React, { Fragment, useState, useEffect } from "react";
import OrderPayment from "./OrderPayment";
const OrderPaymentSSR = ({  
    ...props
}) => {


    
    const [guestUUID, setGuestUUID] = useState()
    const [objectUUID, setObjectUUID] = useState()
    useEffect(()=>{
        setGuestUUID(new URLSearchParams(window.location.search).get('guest_uuid'))
        setObjectUUID(window?.__SSR_PARAMS__?.objectUUID)
    },[])
    return <OrderPayment objectUUID={objectUUID} guestUUID={guestUUID} {...props}/>
};



export default OrderPaymentSSR;




