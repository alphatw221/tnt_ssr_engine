import { createUserAxios, createUserAxiosWithoutInterceptor } from "../lib/axiosClient";

export const get_categorized_components = () => {
    return createUserAxios().get(`/api/v1/website/component/categorized-components/`);
}




export const get_customized_categorized_components = () => {
    return createUserAxios().get(`/api/v1/website/store-component/categorized-components/`);
}


export const create_customized_component = (component, categoryName, Name, displayImage) => {

    const formData = new FormData();
    

    // for ( var key in component ) {
    //     formData.append(key, component[key]);
    // }
    formData.set('template',JSON.stringify(component))
    formData.set('category_name',categoryName)
    formData.set('type', component?.type)
    formData.set('name',Name)
    formData.set('display_image',displayImage)


    return createUserAxios().post(`/api/v1/website/store-component/create/`,formData);
}

export const update_customized_component = (component, displayImage) => {

    const formData = new FormData();
    

    // for ( var key in component ) {
    //     formData.append(key, component[key]);
    // }
    formData.set('component',JSON.stringify(component))
    formData.set('display_image',displayImage)

    return createUserAxios().put(`/api/v1/website/store-component/${component?.id}/update/`,formData);
}

export const delete_customized_component = (component) => {
    return createUserAxios().delete(`/api/v1/website/store-component/${component?.id}/delete/`);
}