import { createUserAxios, createUserAxiosWithoutInterceptor, createQueryParams } from "../lib/axiosClient";


export const user_search_website_events = () => {
    return createUserAxios().get(`/api/v1/website/website-edit-event/search/`);
}
