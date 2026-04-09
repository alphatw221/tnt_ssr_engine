import { createUserAxios, createQueryParams } from "../lib/axiosClient";

export const user_list_website_events = ({ cursor = null, pageSize = 20 }) => {
    const params = createQueryParams({
        cursor,
        page_size: pageSize,
    });
    return createUserAxios().get(`/api/v1/website/website-edit-event/list/${params}`);
}

export const user_get_website_event_detail = (eventUUID) => {
    return createUserAxios().get(`/api/v1/website/website-edit-event/${eventUUID}/`);
}

export const user_undo_website_edit_event = (eventUUID) => {
    return createUserAxios().post(`/api/v1/website/website-edit-event/${eventUUID}/undo/`);
}
