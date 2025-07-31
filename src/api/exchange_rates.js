import { createCustomerAxios, createCustomerAxiosWithoutInterceptor } from "../lib/axiosClient";

export const get_exchange_rates = (base) => {
    return createCustomerAxios().get(`/api/v1/store/exchange_rates/${base}/`);
}

