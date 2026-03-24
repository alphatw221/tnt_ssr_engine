import { createCustomerAxios, createCustomerAxiosWithoutInterceptor, createUserAxios, createUserAxiosWithoutInterceptor } from "../lib/axiosClient";

//-----------------------customer----------------------------------

export const customer_search_blog_post = (filter_uuids, filter_categories, filter_tags, exclude_uuids, exclude_categories, exclude_tags, keyword, page, page_size, order_by, with_categories) => {
    return createCustomerAxios().get(`/api/v1/store/blog_post/search/?filter_uuids=${filter_uuids}&filter_categories=${filter_categories}&filter_tags=${filter_tags}&exclude_uuids=${exclude_uuids}&exclude_categories=${exclude_categories}&exclude_tags=${exclude_tags}&keyword=${keyword}&page=${page}&page_size=${page_size}&order_by=${order_by}&with_categories=${with_categories}`);
}


export const customer_retrieve_blog_post = (blog_post_uuid) => {
    return createCustomerAxios().get(`/api/v1/store/blog_post/${blog_post_uuid}/retrieve/`);
}



//----user----

export const user_search_blog_post = (store_uuid, category_uuid, visibility, keyword, order_by, page, page_size) =>{
    return createUserAxios().get(`/api/v1/store/${store_uuid}/blog_post/search/?category_uuid=${category_uuid}&visibility=${visibility}&keyword=${keyword}&order_by=${order_by}&page=${page}&page_size=${page_size}`);
}

export const user_retrieve_blog_post = (store_uuid, blog_post_uuid) =>{
    return createUserAxios().get(`/api/v1/store/${store_uuid}/blog_post/${blog_post_uuid}/retrieve/`);
}