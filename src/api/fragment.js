import { createUserAxios, createUserAxiosWithoutInterceptor } from "../lib/axiosClient";

export const get_categorized_fragments = () => {
    return createUserAxios().get(`/api/v1/website/fragment/categorized-fragments/`);
}



export const get_customized_categorized_fragments = () => {
    return createUserAxios().get(`/api/v1/website/store-fragment/categorized-fragments/`);
}


export const create_customized_fragment = (fragment, categoryName, Name, displayImage) => {

    const formData = new FormData();
    

    // for ( var key in component ) {
    //     formData.append(key, component[key]);
    // }
    formData.set('template',JSON.stringify(fragment))
    formData.set('category_name',categoryName)
    formData.set('name',Name)
    formData.set('display_image',displayImage)

    return createUserAxios().post(`/api/v1/website/store-fragment/create/`,formData);
}

export const update_customized_fragment = (fragment, displayImage) => {

    const formData = new FormData();
    
    formData.set('fragment',JSON.stringify(fragment))
    formData.set('display_image',displayImage)


    return createUserAxios().put(`/api/v1/website/store-fragment/${fragment?.id}/update/`, formData);
}

export const delete_customized_fragment = (fragment) => {
    return createUserAxios().delete(`/api/v1/website/store-fragment/${fragment?.id}/delete/`);
}