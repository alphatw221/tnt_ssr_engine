import { createUserAxios, createUserAxiosWithoutInterceptor, createQueryParams } from "../lib/axiosClient";

export const get_categorized_node_templates = (query) => {
    return createUserAxios().get(`/api/v1/website/node-template/categorized-node-templates/${createQueryParams(query)}`);
}

