import { createUserAxios, createUserAxiosWithoutInterceptor } from "../lib/axiosClient";

export const user_upload_medium = (data) => {
    return createUserAxios().post(`/api/v1/store/medium/upload/`,data);
}

export const user_list_medium = (type, page, page_size) => {
    return createUserAxios().get(`/api/v1/store/medium/list/?type=${type}&page=${page}&page_size=${page_size}`);
}

export const user_delete_medium = (medium_uuid) => {
    return createUserAxios().delete(`/api/v1/store/medium/${medium_uuid}/delete/`);
}

