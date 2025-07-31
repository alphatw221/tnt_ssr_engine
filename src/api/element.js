import { createUserAxios, createUserAxiosWithoutInterceptor, createQueryParams, createCustomerAxios } from "../lib/axiosClient";
import Cookies from 'js-cookie'




export const user_r_create_element = ({
    
    target_webpage_uuid, 
    target_webpage_position,
    target_element_relation_uuid, 
    target_relative_position, 
    data
   }) => {

    return createUserAxios().post(
        `/api/v1/website/element/r_create/?target_webpage_uuid=${target_webpage_uuid}&target_webpage_position=${target_webpage_position}&target_element_relation_uuid=${target_element_relation_uuid}&target_relative_position=${target_relative_position}`, data)
}



export const user_r_action_to_element = ({
    parent_relation_uuid, 
    action, 
    target_webpage_uuid, 
    target_webpage_position,
    target_element_relation_uuid, 
    target_relative_position
}) => {

    return createUserAxios().put(`/api/v1/website/element/${parent_relation_uuid}/r_action/${action}/?socket_id=${Cookies.get('editor_socket_id')}`, {

        target_webpage_uuid, 
        target_webpage_position,
        target_element_relation_uuid, 
        target_relative_position

    })
}





export const user_update_element = ({element_uuid, data, }) => {
    return createUserAxios().put(`/api/v1/website/element/${element_uuid}/update/?socket_id=${Cookies.get('editor_socket_id')}`, data)
}
export const user_delete_element = ({parent_relation_uuid,  }) => {
    return createUserAxios().delete(`/api/v1/website/element/${parent_relation_uuid}/delete/?socket_id=${Cookies.get('editor_socket_id')}`)
}


