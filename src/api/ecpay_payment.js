import { createCustomerAxios, createCustomerAxiosWithoutInterceptor } from "../lib/axiosClient";

export const customer_get_ecpay_trade_token = (order_uuid, payment_service_uuid) => {
    return createCustomerAxios().get(`/api/v1/store/payment/ecpay/${order_uuid}/${payment_service_uuid}/trade_token/`);
}

export const customer_create_ecpay_payment = (order_uuid, payment_service_uuid, pay_token, merchant_trade_no) => {
    return createCustomerAxios().post(`/api/v1/store/payment/ecpay/${order_uuid}/${payment_service_uuid}/create/`,{'pay_token':pay_token,'merchant_trade_no':merchant_trade_no});
}
