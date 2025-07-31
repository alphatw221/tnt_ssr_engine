import { createUserAxios, createUserAxiosWithoutInterceptor, createCustomerAxios, createCustomerAxiosWithoutInterceptor } from "../lib/axiosClient";
import Cookies from 'js-cookie'
export const user_retrieve_wepage = () => {
    return createUserAxios().get(`/api/v1/website/webpage/retrieve`);
}

export const customer_retrieve_wepage = ({webpage_name, object_uuid}) => {
    return createCustomerAxios().get(`/api/v1/website/webpage/${webpage_name||''}/${object_uuid||''}/customer/retrieve/`);
}






export const user_create_webpage = ({data}) => {
    return createUserAxios().post(`/api/v1/website/webpage/create/?socket_id=${Cookies.get('editor_socket_id')}`, data)
}

export const user_r_action_to_webpage = ({webpage_uuid, 
    action, 
    target_webpage_uuid, 
    target_relative_position})=>{
    return createUserAxios().put(`/api/v1/website/webpage/${webpage_uuid}/r_action/${action}/?socket_id=${Cookies.get('editor_socket_id')}`, 
    {
        target_webpage_uuid,
        target_relative_position
    })
}


export const user_update_webpage = ({webpage_uuid, data, }) => {
    return createUserAxios().put(`/api/v1/website/webpage/${webpage_uuid}/update/?socket_id=${Cookies.get('editor_socket_id')}`, data)
}

export const user_update_webpage_cache = ({webpage_uuid, }) => {
    return createUserAxios().put(`/api/v1/website/webpage/${webpage_uuid}/update_cache/?socket_id=${Cookies.get('editor_socket_id')}`)
}

export const user_delete_webpage = ({webpage_uuid,  }) => {
    return createUserAxios().delete(`/api/v1/website/webpage/${webpage_uuid}/delete/?socket_id=${Cookies.get('editor_socket_id')}`)
}
