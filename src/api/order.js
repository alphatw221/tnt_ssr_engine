import { createCustomerAxios, createCustomerAxiosWithoutInterceptor } from "../lib/axiosClient";

// export const customer_update_order = (order_uuid, checkoutData) => {
//     return createCustomerAxios().put(`/api/v1/store/order/${order_uuid}/update/`, {'checkout_data':checkoutData});
// }

export const customer_retrieve_order = ({order_uuid, guest_uuid}) => {
    return createCustomerAxios().get(`/api/v1/store/order/${order_uuid}/retrieve/?guest_uuid=${guest_uuid}`);
}

export const customer_search_order = ({guest_uuid, status, page, page_size}) => {
    return createCustomerAxios().get(`/api/v1/store/order/search/?guest_uuid=${guest_uuid}&status=${status}&page=${page}&page_size=${page_size}`);
}

export const customer_upload_receipt = ({
    order_uuid, payment_service_uuid, guest_uuid, data
}) => {
    return createCustomerAxios().put(`/api/v1/store/order/${order_uuid}/upload_receipt/${payment_service_uuid}/?guest_uuid=${guest_uuid}`, data);
}


export const customer_select_cash_on_delivery = ({order_uuid, payment_service_uuid, guest_uuid}) => {
    return createCustomerAxios().put(`/api/v1/store/order/${order_uuid}/cash_on_delivery/${payment_service_uuid}/?guest_uuid=${guest_uuid}`);
}
