import { createCustomerAxios, createCustomerAxiosWithoutInterceptor } from "../lib/axiosClient";

export const customer_update_cart_product = ({product_uuid, variant_uuid, adjust_quantity, compose_base_uuid, compose_products_data, update_compose, addon_source_product_uuid, cart_addon_product_adjust_quantity}) => {
    return createCustomerAxios().put(`/api/v1/store/cart/customer/update/`, 
    {
        product_uuid,
        variant_uuid, 
        adjust_quantity, 
        compose_base_uuid, 
        compose_products_data,
        update_compose,

        addon_source_product_uuid,
        cart_addon_product_adjust_quantity,

    });
}

export const customer_delete_cart_product = (cart_product_uuid) => {
    return createCustomerAxios().delete(`/api/v1/store/cart/customer/delete/${cart_product_uuid}/`);
}

export const customer_clear_cart_product = () => {
    return createCustomerAxios().delete(`/api/v1/store/cart/customer/clear/`);
}

export const customer_checkout_cart = ({checkout_data, exclude_uuids, cart_products_data, guest_access_token, country}) => {
    return createCustomerAxios().put(`/api/v1/store/cart/customer/checkout/?country=${country}`,
    {
        checkout_data, 
        exclude_uuids, 
        cart_products_data,
        guest_access_token
    });
}

