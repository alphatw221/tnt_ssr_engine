import { createUserAxios, createUserAxiosWithoutInterceptor, createQueryParams, createCustomerAxios } from "../lib/axiosClient";
import Cookies from 'js-cookie'

export const user_retrieve_node = (node_uuid) => {
    return createUserAxios().get(`/api/v1/website/node/${node_uuid}/retrieve/`);
}

export const customer_retrieve_node = (node_uuid) => {
    return createCustomerAxios().get(`/api/v1/website/node/${node_uuid}/customer/retrieve/`);
}

//deplicated
export const user_create_node = (node_uuid, name, type, data, children_matrix_3d, dimension_0_index, dimension_1_index, display_order_index, after,  event_sourcing=1) => {
    return createUserAxios().post(`/api/v1/website/node/${node_uuid}/create/`, {
        
        'name':name, 
        'type':type, 
        'data':data,
        'children_matrix_3d':children_matrix_3d,
        'dimension_0_index':dimension_0_index, 
        'dimension_1_index':dimension_1_index,
        'display_order_index':display_order_index,
        'after':after,

        'socket_id':Cookies.get('editor_socket_id'),
        'event_sourcing':event_sourcing,
    }).then(res=>{
        return res
    })
}


export const user_r_create_node = (target_node_identifier, name, type, data, children, target_relative_position, event_sourcing=1) => {

    return createUserAxios().post(`/api/v1/website/node/${target_node_identifier}/r_create/`, {
        
        'name':name,
        'type':type,
        'data':data,
        'children':children,

        'target_relative_position':target_relative_position,
        'socket_id':Cookies.get('editor_socket_id'),
        'event_sourcing':event_sourcing,
    


    }).then(res=>{
        return res
    });
}

//deplicated
export const user_move_node = (target_parent_node_identifier, node_uuid, dimension_0_index, dimension_1_index, display_order_index, after, event_sourcing=1) => {

    return createUserAxios().put(`/api/v1/website/node/${node_uuid}/move/`, {
        'target_parent_node_identifier':target_parent_node_identifier, 
        'dimension_0_index':dimension_0_index, 
        'dimension_1_index':dimension_1_index,
        'display_order_index':display_order_index,
        'after':after,

        'socket_id':Cookies.get('editor_socket_id'),
        'event_sourcing':event_sourcing,
    


    }).then(res=>{
        return res
    });
}


export const user_r_move_node = (target_node_identifier, node_uuid, target_relative_position, event_sourcing=1) => {

    return createUserAxios().put(`/api/v1/website/node/${node_uuid}/r_move/`, {
        'target_node_identifier':target_node_identifier, 
        'target_relative_position':target_relative_position,

        'socket_id':Cookies.get('editor_socket_id'),
        'event_sourcing':event_sourcing,
    


    }).then(res=>{
        return res
    });
}





export const user_update_node = (node_uuid, data, event_sourcing=1) => {

    console.log(Cookies.get('editor_socket_id'))
    return createUserAxios().put(`/api/v1/website/node/${node_uuid}/update/`, {
        ...data,

        'socket_id':Cookies.get('editor_socket_id'),
        'event_sourcing':event_sourcing,
    })
    .then(res=>{

        return res
    });
}
export const user_delete_node = (node_uuid, event_sourcing=1 ) => {
    return createUserAxios().delete(`/api/v1/website/node/${node_uuid}/delete/?socket_id=${Cookies.get('editor_socket_id')}&event_sourcing=${event_sourcing}`).then(res=>{

        return res
    });
}


