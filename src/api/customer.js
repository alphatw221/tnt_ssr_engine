import { createCustomerAxios, createCustomerAxiosWithoutInterceptor } from "../lib/axiosClient";

export const validate_customer_token = () => {
    return createCustomerAxiosWithoutInterceptor().get(`/api/v1/auth/customer/validate/`);
}


export const customer_general_login = (data) => {
    return createCustomerAxios().post(`/api/v1/auth/customer/login/general/`, data);
}

export const customer_register = ({registerData, country}) => {
    return createCustomerAxios().post(`/api/v1/auth/customer/register/?country=${country}`, registerData);
}




//
export const customer_verify_code = (data) => {
    return createCustomerAxios().post(`/api/v1/auth/register/customer/verification-code/verify/`, data);
}

export const customer_create_verification_code = (data) => {
    return createCustomerAxios().post(`/api/v1/auth/register/customer/verification-code`, data);
}


export const customer_get_account = () => {
    return createCustomerAxiosWithoutInterceptor().get(`/api/v1/auth/customer/account/`);
}





export const guest_request_cellphone_verification = ({country, cellphone}) => {
    return createCustomerAxios().post(`/api/v1/auth/customer/cellphone/verification/`, {'country':country, 'cellphone':cellphone});
}
export const guest_request_email_verification = ({country, email}) => {
    return createCustomerAxios().post(`/api/v1/auth/customer/email/verification/`, {'country':country, 'email':email});
}
export const guest_verify_otp_code = ({email, cellphone, otp_code}) => {
    return createCustomerAxiosWithoutInterceptor().post(`/api/v1/auth/customer/verify_otp/`, {'email':email, 'cellphone':cellphone, 'otp_code':otp_code});
}
