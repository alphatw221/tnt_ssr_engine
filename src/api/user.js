import { createCustomerAxios, createCustomerAxiosWithoutInterceptor, createUserAxios, createUserAxiosWithoutInterceptor } from "../lib/axiosClient";

export const user_general_login = (data) => {
    return createCustomerAxios().post(`/api/v1/auth/user/login/general/`, data);
}


export const get_user_account = () => {
    return createUserAxiosWithoutInterceptor().get(`/api/v1/auth/user/account/`);
}


export const validate_user_token = () => {
    return createUserAxiosWithoutInterceptor().get(`/api/v1/auth/user/validate/`);
}
