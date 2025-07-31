import { createUserAxios, createUserAxiosWithoutInterceptor } from "../lib/axiosClient";

export const user_retrieve_website = () => {
    return createUserAxios().get(`/api/v1/website/website/retrieve/`);
}

export const user_update_website = ({data}) => {
    return createUserAxios().put(`/api/v1/website/website/update/`,data);
}
