import { createCustomerAxios, createCustomerAxiosWithoutInterceptor } from "../lib/axiosClient";

export const customer_send_message = (message) => {
    return createCustomerAxios().post(`/api/v1/store/chat/customer/message/send/`, {'message':message});
}

export const customer_read_message = () => {
    return createCustomerAxios().put(`/api/v1/store/chat/customer/message/read/`);
}

export const customer_retrieve_chat = () => {
    return createCustomerAxios().get(`/api/v1/store/chat/customer/retrieve/`);
}

export const customer_search_chat_messages = (cursor) => {
    return createCustomerAxios().get(`/api/v1/store/chat/customer/messages/?cursor=${cursor}`);
}