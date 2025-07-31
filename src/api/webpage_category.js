import { createUserAxios, createUserAxiosWithoutInterceptor } from "../lib/axiosClient";

export const update_customized_webpage_category = (category) => {
    return createUserAxios().put(`/api/v1/website/store-webpage-category/${category?.id}/update/`, category);
}

export const delete_customized_webpage_category = (category) => {
    return createUserAxios().delete(`/api/v1/website/store-webpage-category/${category?.id}/delete/`);
}