import { createCustomerAxios, createCustomerAxiosWithoutInterceptor, createUserAxios, createUserAxiosWithoutInterceptor } from "../lib/axiosClient";
import Cookies from 'js-cookie'

export const get_estore_settings = () => {
    return createCustomerAxios().get(`/api/v1/store/user/estore/settings/`);
}

//-----------------------customer----------------------------------

export const customer_get_store = () => {
    return createCustomerAxios().get(`/api/v1/store/customer/retrieve/`);
}

export const customer_get_store_logistic_services = ({country, order_by}) => {
    return createCustomerAxios().get(`/api/v1/store/customer/logistic_services/search/?country=${country}&order_by=${order_by}`);
}
export const customer_get_store_checkout_services = ({country, logistic_service_order_by}) => {
    return createCustomerAxios().get(`/api/v1/store/customer/checkout_services/search/?country=${country}&logistic_service_order_by=${logistic_service_order_by}`);
}
export const customer_get_store_payment_services = ({country, order_by}) => {
    return createCustomerAxios().get(`/api/v1/store/customer/payment_services/search/?country=${country}&order_by=${order_by}`);
}

export const customer_search_store_results = (keyword) => {
    return createCustomerAxios().get(`/api/v1/store/customer/results/?keyword=${keyword}`);
}

//-----------------------user----------------------------------

export const user_get_store = () => {
    return createUserAxios().get(`/api/v1/store/user/retrieve/`);
}


export const user_update_store_settings = (data, event_sourcing=1) => {
    return createUserAxios().put(`/api/v1/store/user/settings/update/`, 
        {
            'data':data,
            'socket_id':Cookies.get('editor_socket_id'),
            'event_sourcing':event_sourcing,
        });
}


// export const user_update_store = (data) => {
//     return createUserAxios().put(`/api/v1/store/user/update/`,data);
// }

// export const user_get_slider = () => {
//     return createUserAxios().get(`/api/v1/store/user/slider/`);
// }


// export const user_get_banner = () => {
//     return createUserAxios().get(`/api/v1/store/user/banner/`);
// }
