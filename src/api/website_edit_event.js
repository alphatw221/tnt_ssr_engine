import { createUserAxios, createQueryParams } from "../lib/axiosClient";

export const user_list_website_events = ({ cursor = null, pageSize = 20 }) => {
    const params = createQueryParams({
        cursor,
        page_size: pageSize,
    });
    return createUserAxios().get(`/api/v1/website/website-edit-event/list/${params}`);
}

export const user_get_website_event_detail = (eventId) => {
    return createUserAxios().get(`/api/v1/website/website-edit-event/${eventId}/`);
}
