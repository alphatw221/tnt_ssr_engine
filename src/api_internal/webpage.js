import { createInternalAxios } from "../lib/axiosClient";


export const node_server_retrieve_wepage = ({domain, webpage_name, object_uuid}) => {
    return createInternalAxios().get(`/api/v1/website/webpage_ssr/${webpage_name||''}/${object_uuid||''}/ssr/retrieve/?domain=${domain}`);
}



