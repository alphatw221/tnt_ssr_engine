import { createCustomerAxios, createCustomerAxiosWithoutInterceptor, createUserAxios, createUserAxiosWithoutInterceptor } from "../lib/axiosClient";



export const get_website_editor_system_message = () => {
    return createUserAxios().get(`/api/v1/auth/system_message/website_editor/`);
}


