import { useParams, useSearchParams } from "react-router-dom";
import OrderPayment from "./OrderPayment";
const OrderPaymentCSR = ({  
    ...props
}) => {

    const params = useParams()
    const searchParams = new URLSearchParams(window.location.search);

    return <OrderPayment objectUUID={params?.object_uuid} guestUUID={searchParams.get('guest_uuid')} {...props}/>
};



export default OrderPaymentCSR;




