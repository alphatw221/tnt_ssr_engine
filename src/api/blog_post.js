import { createCustomerAxios, createCustomerAxiosWithoutInterceptor, createUserAxios, createUserAxiosWithoutInterceptor } from "../lib/axiosClient";

//-----------------------customer----------------------------------

export const customer_search_blog_post = (filter_uuids, filter_categories, filter_tags, exclude_uuids, exclude_categories, exclude_tags, keyword, page, page_size, order_by, with_categories) => {
    return createCustomerAxios().get(`/api/v1/store/blog_post/search/?filter_uuids=${filter_uuids}&filter_categories=${filter_categories}&filter_tags=${filter_tags}&exclude_uuids=${exclude_uuids}&exclude_categories=${exclude_categories}&exclude_tags=${exclude_tags}&keyword=${keyword}&page=${page}&page_size=${page_size}&order_by=${order_by}&with_categories=${with_categories}`);
}


export const customer_retrieve_blog_post = (blog_post_uuid) => {
    return createCustomerAxios().get(`/api/v1/store/blog_post/${blog_post_uuid}/retrieve/`);
}

export const customer_increment_blog_post_view = (blog_post_uuid) => {
    return createCustomerAxios().put(`/api/v1/store/blog_post/${blog_post_uuid}/increment_view/`);
}

//帶會員 token 時 自己 pending / hidden 的留言也會列出來
export const customer_search_blog_post_comments = ({blog_post_uuid, page, page_size}) => {
    return createCustomerAxiosWithoutInterceptor().get(`/api/v1/store/blog_post_comment/${blog_post_uuid}/search/`, {params: {page, page_size}});
}

//訪客要帶 guest_name 與 guest_email website 是 honeypot 欄位
export const customer_create_blog_post_comment = ({blog_post_uuid, content, guest_name, guest_email, website}) => {
    return createCustomerAxiosWithoutInterceptor().post(`/api/v1/store/blog_post_comment/${blog_post_uuid}/create/`, {content, guest_name, guest_email, website});
}



//----user----

export const user_search_blog_post = (store_uuid, category_uuid, visibility, keyword, order_by, page, page_size) =>{
    return createUserAxios().get(`/api/v1/store/${store_uuid}/blog_post/search/?category_uuid=${category_uuid}&visibility=${visibility}&keyword=${keyword}&order_by=${order_by}&page=${page}&page_size=${page_size}`);
}

export const user_retrieve_blog_post = (store_uuid, blog_post_uuid) =>{
    return createUserAxios().get(`/api/v1/store/${store_uuid}/blog_post/${blog_post_uuid}/retrieve/`);
}