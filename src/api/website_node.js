import { createUserAxios, createUserAxiosWithoutInterceptor, createQueryParams } from "../lib/axiosClient";

//deplicate
export const user_create_website_node = (website_node_type, name, target_index, type, data, children_matrix_3d, after) => {
    return createUserAxios().post(`/api/v1/website/website-node/create/`,
    {
        'website_node_type':website_node_type, 
        'name':name, 
        'target_index':target_index, 
        'type':type, 
        'data':data,
        'children_matrix_3d':children_matrix_3d,
        'after':after
    });
}

// export const user_move_website_node = (node_uuid, target_website_node_type, display_order_index, after) => {
//     return createUserAxios().put(`/api/v1/website/website-node/${node_uuid}/move/`,{
//         'target_website_node_type':target_website_node_type,
//         'display_order_index':display_order_index,
//         'after':after
//     });
// }

// export const user_delete_website_node = (website_node_uuid) => {
//     //NO USE
//     return createUserAxios().delete(`/api/v1/website/website-node/${website_node_uuid}/delete/`);
// }
