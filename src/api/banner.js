import { createCustomerAxios, createCustomerAxiosWithoutInterceptor, createUserAxios, createUserAxiosWithoutInterceptor } from "../lib/axiosClient";



//-----------------------user----------------------------------


export const dev_user_search_banner = (filter_ids, keyword, page) => {

    return createUserAxios().get(`/api/v1/store/banner/dev/search/?filter_ids=${filter_ids}&keyword=${keyword}&page=${page}`);
}

