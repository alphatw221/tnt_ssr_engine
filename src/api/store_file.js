import { createUserAxios, createUserAxiosWithoutInterceptor } from "../lib/axiosClient";

export const user_upload_store_files = ({store_uuid, store_file_uuid, formData}) => {
    return createUserAxios().post(`/api/v1/store/${store_uuid}/store_file/${store_file_uuid}/create/`, formData);
}

// is_folder: true 只列資料夾 / false 只列檔案 / 不給則全部
// order_by: name | type | size | created_at | updated_at，order: asc | desc
// 不經過共用的錯誤 alert：資料夾不存在 (folder_not_found) 由呼叫端自行處理
export const user_search_store_file = ({store_uuid, store_file_uuid, keyword, page_size, cursor, is_folder, order_by, order}) => {
    const params = new URLSearchParams({keyword: keyword||"", cursor: cursor||"", page_size})
    if(is_folder !== undefined && is_folder !== null) params.set('is_folder', is_folder ? 'true' : 'false')
    if(order_by) params.set('order_by', order_by)
    if(order) params.set('order', order)
    return createUserAxiosWithoutInterceptor().get(`/api/v1/store/${store_uuid}/store_file/${store_file_uuid}/search/?${params.toString()}`);
}

export const user_delete_store_files = ({store_uuid, store_file_uuids}) => {
    return createUserAxios().post(`/api/v1/store/${store_uuid}/store_file/delete/`, {store_file_uuids});
}

export const user_update_store_file = ({store_uuid, store_file_uuid, data}) => {
    return createUserAxios().post(`/api/v1/store/${store_uuid}/store_file/${store_file_uuid}/update/`, data);
}

export const user_move_store_files = ({store_uuid, store_file_uuids, target_folder_uuid}) => {
    return createUserAxios().post(`/api/v1/store/${store_uuid}/store_file/move/`, {store_file_uuids, target_folder_uuid});
}
