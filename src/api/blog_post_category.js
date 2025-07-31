import { createCustomerAxios, createCustomerAxiosWithoutInterceptor, createUserAxios, createUserAxiosWithoutInterceptor } from "../lib/axiosClient";

//-----------------------customer----------------------------------

export const customer_search_blog_post_category = (keyword, page) => {
    return createCustomerAxios().get(`/api/v1/store/blog_post_category/search/?keyword=${keyword}&page=${page}`);
}


