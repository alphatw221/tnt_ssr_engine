import React from "react";

function resolvePath(obj, path) {
    if (!obj || !path) return '';
    return path.split('.').reduce((acc, key) => {
        if (acc == null) return '';
        return acc[key] ?? '';
    }, obj);
}

function interpolate(template, obj) {
    if (!template || !obj) return template || '';
    return template.replace(/\{\{([\w.]+)\}\}/g, (_, path) => {
        const value = resolvePath(obj, path);
        return value !== '' ? String(value) : '';
    });
}

const DynamicRouteElement = ({
    element,
    elementProps,
    object,
    ...props
}) => {
    const template = element?.inner_html ?? element?.template?.inner_html ?? '';
    const rendered = interpolate(template, object);

    if (!rendered) return null;

    const TagName = element?.tag_name || element?.template?.tag_name || "div";

    return (
        <TagName {...elementProps} dangerouslySetInnerHTML={{ __html: rendered }} />
    );
};

export default DynamicRouteElement;
