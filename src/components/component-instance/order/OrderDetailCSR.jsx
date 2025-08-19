import { useParams, useSearchParams } from "react-router-dom";
import OrderDetail from "./OrderDetail";
const OrderDetailCSR = ({  
    ...props
}) => {

    const params = useParams()
    const searchParams = new URLSearchParams(window.location.search);

    return <OrderDetail objectUUID={params?.object_uuid} guestUUID={searchParams.get('guest_uuid')} {...props}/>
};



export default OrderDetailCSR;




