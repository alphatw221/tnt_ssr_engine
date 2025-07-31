import { createCustomerAxios, createCustomerAxiosWithoutInterceptor, createUserAxios, createUserAxiosWithoutInterceptor } from "../lib/axiosClient";

//-----------------------customer----------------------------------

export const customer_search_product = (filter_uuids, filter_categories, filter_tags, exclude_uuids, exclude_categories, exclude_tags, keyword, page, page_size, order_by, with_categories) => {
    return createCustomerAxios().get(`/api/v1/store/product/search/?filter_uuids=${filter_uuids}&filter_categories=${filter_categories}&filter_tags=${filter_tags}&exclude_uuids=${exclude_uuids}&exclude_categories=${exclude_categories}&exclude_tags=${exclude_tags}&keyword=${keyword}&page=${page}&page_size=${page_size}&order_by=${order_by}&with_categories=${with_categories}`);
}


export const customer_retrieve_product = (product_uuid) => {
    return createCustomerAxios().get(`/api/v1/store/product/${product_uuid}/retrieve/`);
}

export const customer_search_product_reviews = (product_uuid, order_by, page) => {
    return createCustomerAxios().get(`/api/v1/store/product_review/${product_uuid}/search/?order_by=${order_by}&page=${page}`);
}

export const customer_create_product_review = (product_uuid, data) => {

    //data

    const formData = new FormData();
    
    formData.set('stars',data?.stars||5);
    formData.set('review',data?.review||'');

    // if((data?.upload_images||[]).length){
    //     formData.set('upload_images',data?.upload_images||[])
    // }
    (data?.upload_images||[]).forEach((image,i) => {
        formData.set('upload_images',image)
    });

    return createCustomerAxios().post(`/api/v1/store/product_review/${product_uuid}/create/`, formData);
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