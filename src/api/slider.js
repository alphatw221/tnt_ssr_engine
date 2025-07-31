import { createCustomerAxios, createCustomerAxiosWithoutInterceptor, createUserAxios, createUserAxiosWithoutInterceptor } from "../lib/axiosClient";



//-----------------------user----------------------------------


export const search_slider = (filter_ids, keyword, tags, page, order_by) => {

    return createUserAxios().get(`/api/v1/store/slider/search/?filter_ids=${filter_ids}&keyword=${keyword}&tags=${tags}&page=${page}&order_by=${order_by}`);
}

