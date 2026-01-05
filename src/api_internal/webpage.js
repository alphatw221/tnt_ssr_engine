import { createInternalAxios } from "../lib/axiosClient";


export const node_server_retrieve_wepage = ({webpage_name, object_uuid}) => {
    return createInternalAxios().get(`/api/v1/website/webpage/${webpage_name||''}/${object_uuid||''}/customer/retrieve/`);
}



