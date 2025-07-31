import { createCustomerAxios, createCustomerAxiosWithoutInterceptor, createUserAxios, createUserAxiosWithoutInterceptor } from "../lib/axiosClient";

//-----------------------customer----------------------------------

export const customer_search_blog_post = (filter_categories, filter_tags, keyword, order_by, page) => {
    return createCustomerAxios().get(`/api/v1/store/blog_post/search/?filter_categories=${filter_categories}&filter_tags=${filter_tags}&keyword=${keyword}&order_by=${order_by}&page=${page}`);
}


export const customer_retrieve_blog_post = (blog_post_id) => {
    return createCustomerAxios().get(`/api/v1/store/blog_post/${blog_post_id}/retrieve/`);
}



//----user----

export const user_search_blog_post = (store_uuid, category_uuid, visibility, keyword, order_by, page, page_size) =>{
    return createUserAxios().get(`/api/v1/store/${store_uuid}/blog_post/search/?category_uuid=${category_uuid}&visibility=${visibility}&keyword=${keyword}&order_by=${order_by}&page=${page}&page_size=${page_size}`);
}

export const user_retrieve_blog_post = (store_uuid, blog_post_uuid) =>{
    return createUserAxios().get(`/api/v1/store/${store_uuid}/blog_post/${blog_post_uuid}/retrieve/`);
}