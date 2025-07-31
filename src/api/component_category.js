import { createUserAxios, createUserAxiosWithoutInterceptor } from "../lib/axiosClient";

export const update_customized_component_category = (category) => {
    return createUserAxios().put(`/api/v1/website/store-component-category/${category?.id}/update/`, category);
}

export const delete_customized_component_category = (category) => {
    return createUserAxios().delete(`/api/v1/website/store-component-category/${category?.id}/delete/`);
}