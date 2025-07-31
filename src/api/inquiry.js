import { createCustomerAxios, createCustomerAxiosWithoutInterceptor, createUserAxios, createUserAxiosWithoutInterceptor } from "../lib/axiosClient";

//-----------------------customer----------------------------------

export const customer_create_inquiry = (data) => {
    return createCustomerAxios().post(`/api/v1/store/inquiry/create/`,data);
}




