import { createCustomerAxios, createCustomerAxiosWithoutInterceptor, createUserAxios, createUserAxiosWithoutInterceptor } from "../lib/axiosClient";

//-----------------------customer----------------------------------

export const customer_search_product = (filter_uuids, filter_categories, filter_tags, exclude_uuids, exclude_categories, exclude_tags, keyword, page, page_size, order_by, with_categories) => {
    return createCustomerAxios().get(`/api/v1/store/product/search/?filter_uuids=${filter_uuids}&filter_categories=${filter_categories}&filter_tags=${filter_tags}&exclude_uuids=${exclude_uuids}&exclude_categories=${exclude_categories}&exclude_tags=${exclude_tags}&keyword=${keyword}&page=${page}&page_size=${page_size}&order_by=${order_by}&with_categories=${with_categories}`);
}


export const customer_retrieve_product = (product_uuid) => {
    return createCustomerAxios().get(`/api/v1/store/product/${product_uuid}/retrieve/`);
}

export const customer_search_product_reviews = (product_uuid, page, page_size) => {
    return createCustomerAxios().get(`/api/v1/store/product_review/${product_uuid}/search/?page=${page}&page_size=${page_size}`);
}

export const customer_get_product_review_summary = (product_uuid) => {
    return createCustomerAxios().get(`/api/v1/store/product_review/${product_uuid}/summary/`);
}

//會員與訪客共用 會員靠 header 的 customer token 訪客靠 query 的 guest_uuid 或 header 的 guest token
export const customer_get_order_review_items = ({order_uuid, guest_uuid}) => {
    return createCustomerAxiosWithoutInterceptor().get(`/api/v1/store/product_review/order/${order_uuid}/items/`, {params: guest_uuid ? {guest_uuid} : {}});
}

export const customer_create_order_product_review = ({order_uuid, product_uuid, guest_uuid, stars, review, display_name, upload_images}) => {

    const formData = new FormData();

    formData.set('stars', stars);
    formData.set('review', review||'');
    if(display_name) formData.set('display_name', display_name);
    (upload_images||[]).forEach((image) => {
        formData.append('upload_images', image)
    });

    return createCustomerAxiosWithoutInterceptor().post(`/api/v1/store/product_review/order/${order_uuid}/${product_uuid}/create/`, formData, {params: guest_uuid ? {guest_uuid} : {}});
}
//-----------------------user----------------------------------

// export const dev_user_get_product = (product_id) => {
//     return createUserAxios().get(`/api/v1/store/product/${product_id}/dev/retrieve/`);
// }

export const user_search_product = (store_uuid, category_uuid, visibility, keyword, order_by, page, page_size) => {
    return createUserAxios().get(`/api/v1/store/${store_uuid}/product/search/?category_uuid=${category_uuid}&visibility=${visibility}&keyword=${keyword}&order_by=${order_by}&page=${page}&page_size=${page_size}`);
}

export const user_retrieve_product = (store_uuid, product_uuid) =>{
    return createUserAxios().get(`/api/v1/store/${store_uuid}/product/${product_uuid}/retrieve/`);
}