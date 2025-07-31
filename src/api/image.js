import { createUserAxios, createUserAxiosWithoutInterceptor } from "../lib/axiosClient";

export const user_upload_image = (data) => {
    return createUserAxios().post(`/api/v1/store/image/upload/`,data);
}

export const user_list_image = (data) => {
    return createUserAxios().get(`/api/v1/store/image/list/`);
}

export const user_delete_image = (image_id) => {
    return createUserAxios().delete(`/api/v1/store/image/${image_id}/delete/`);
}

