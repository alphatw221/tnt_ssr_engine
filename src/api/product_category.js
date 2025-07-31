import { createCustomerAxios, createCustomerAxiosWithoutInterceptor, createUserAxios, createUserAxiosWithoutInterceptor } from "../lib/axiosClient";

//-----------------------customer----------------------------------

export const customer_search_product_category = (keyword, page) => {
    return createCustomerAxios().get(`/api/v1/store/product_category/search/?keyword=${keyword}&page=${page}`);
}


