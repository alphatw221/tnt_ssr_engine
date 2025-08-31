import { createUserAxios, createUserAxiosWithoutInterceptor } from "../lib/axiosClient";

export const user_upload_store_files = ({store_uuid, store_file_uuid, formData}) => {
    return createUserAxios().post(`/api/v1/store/${store_uuid}/store_file/${store_file_uuid}/create/`, formData);
}

export const user_search_store_file = ({store_uuid, store_file_uuid, keyword, page_size, cursor}) => {
    return createUserAxios().get(`/api/v1/store/${store_uuid}/store_file/${store_file_uuid}/search/?keyword=${keyword}&cursor=${cursor}&page_size=${page_size}`);
}

export const user_delete_store_files = ({store_uuid, store_file_uuids}) => {
    return createUserAxios().post(`/api/v1/store/${store_uuid}/store_file/delete/`, {store_file_uuids});
}

export const user_update_store_file = ({store_uuid, store_file_uuid, data}) => {
    return createUserAxios().post(`/api/v1/store/${store_uuid}/store_file/${store_file_uuid}/update/`, data);
}

