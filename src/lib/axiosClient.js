import axios from "axios";
import Cookies from 'js-cookie'
// import { toast } from 'react-toastify';
import cogoToast from 'cogo-toast';

const _baseURL = import.meta.env.MODE=='production' 
    ?
    undefined
    // `${import.meta.env.VITE_APP_API_PROTOCAL}://${import.meta.env.VITE_APP_API_HOSTNAME}${import.meta.env.VITE_APP_API_PORT?':'+import.meta.env.VITE_APP_API_PORT:''}`

    :
    `${import.meta.env.VITE_APP_API_PROTOCAL}://${import.meta.env.VITE_APP_API_HOSTNAME}${import.meta.env.VITE_APP_API_PORT?':'+import.meta.env.VITE_APP_API_PORT:''}`
// const _baseURL = undefined


const internalURL = `${import.meta.env.VITE_APP_INTERNAL_API_PROTOCAL}://${import.meta.env.VITE_APP_INTERNAL_API_HOSTNAME}${import.meta.env.VITE_APP_INTERNAL_API_PORT?':'+import.meta.env.VITE_APP_INTERNAL_API_PORT:''}`

export function createInternalAxios(){

    // const headers = {}

    return axios.create({
        baseURL:internalURL,
    })
}

export function createCustomerAxiosWithoutInterceptor(){

    const headers = {}
    if(Cookies.get("customer_access_token")) headers.Authorization = `Bearer ${Cookies.get("customer_access_token")}`

    return axios.create({
        // baseURL: window.location.protocol+'://'+window.location.host,
        baseURL:_baseURL,

        headers: headers,
    })
}

export function createCustomerAxios(){

    const headers = {}
    if(Cookies.get("customer_access_token")) {headers.Authorization = `Bearer ${Cookies.get("customer_access_token")}`}
    else if(Cookies.get("guest_access_token")){headers.Authorization = `Bearer ${Cookies.get("guest_access_token")}`}
    const axiosInstance = axios.create({
        // baseURL: window.location.protocol+'://'+window.location.host,
        baseURL:_baseURL,
        headers: headers,
    })

    axiosInstance.interceptors.response.use(
        response => response,
        error => {
            console.log(error)
            if (error.response?.data?.message){
                alert('錯誤')
                // cogoToast?.error?.("錯誤", {position: "top-right"});

                // toast.info(error.response.data.message)
            } else{
                alert("錯誤，請重整頁面")
                // cogoToast?.error?.("錯誤，請重整頁面", {position: "top-right"});

                // toast.info('error_messages.please_refresh_page')
            }
            return Promise.reject(error);
        }
    );
    return axiosInstance
}

export function createUserAxiosWithoutInterceptor(){

    const headers = {}
    if(Cookies.get("user_access_token")) headers.Authorization = `Bearer ${Cookies.get("user_access_token")}`

    return axios.create({
        // baseURL: window.location.protocol+'://'+window.location.host,
        baseURL:_baseURL,

        headers: headers,
    })
}

export function createUserAxios(){

    const headers = {}
    if(Cookies.get("user_access_token")) headers.Authorization = `Bearer ${Cookies.get("user_access_token")}`
    const axiosInstance = axios.create({
        // baseURL: window.location.protocol+'://'+window.location.host,
        baseURL:_baseURL,

        headers: headers,
    })

    axiosInstance.interceptors.response.use(
        response => response,
        error => {
            if (error.response?.data?.message){
                // cogoToast.error("錯誤", {position: "top-right"});
                alert('錯誤')
                // toast.info(error.response.data.message)
            } else{
                // cogoToast.error("錯誤，請重整頁面", {position: "top-right"});
                alert('錯誤')
                // toast.info('error_messages.please_refresh_page')
            }
            return Promise.reject(error);
        }
    );
    return axiosInstance
}


export function createQueryParams(query){
    var queryParams = '?'
    Object.entries(query).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
            queryParams += `${key}=${value}&`
        }
    });
    // 移除最後一個 '&'
    return queryParams.slice(0, -1)
}
