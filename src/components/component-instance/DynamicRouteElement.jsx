import React from "react";

function resolvePath(obj, path) {
    if (!obj || !path) return '';
    const value = path.split('.').reduce((acc, key) => {
        if (acc == null) return '';
        const index = parseInt(key);
        if (!isNaN(index) && Array.isArray(acc)) {
            return acc[index < 0 ? acc.length + index : index] ?? '';
        }
        return acc[key] ?? '';
    }, obj);
    return typeof value === 'string' ? value.trim() : value;
}

function resolveExpr(expr, obj) {
    expr = expr.trim();
    if ((expr.startsWith('"') && expr.endsWith('"')) ||
        (expr.startsWith("'") && expr.endsWith("'"))) {
        return expr.slice(1, -1);
    }
    if (/^-?\d+(\.\d+)?$/.test(expr)) {
        return expr;
    }
    // nested ternary: condition ? true_expr : false_expr
    const ternaryMatch = expr.match(/^([^?|]+)\?([^:]+):(.+)$/);
    if (ternaryMatch) {
        const [, cond, truePart, falsePart] = ternaryMatch;
        const condValue = resolvePath(obj, cond.trim());
        const isTruthy = condValue !== '' && condValue != null && condValue !== '0' && condValue !== false && condValue !== 0;
        return resolveExpr(isTruthy ? truePart : falsePart, obj);
    }
    const paths = expr.split('|');
    for (const path of paths) {
        const value = resolvePath(obj, path.trim());
        if (value !== '' && value != null) return String(value);
    }
    return '';
}

function interpolate(template, obj) {
    if (!template || !obj) return template || '';
    // {{condition ? true_expr : false_expr}}
    let result = template.replace(/\{\{([^?{}]+)\?([^:{}]+):([^{}]+)\}\}/g, (_, cond, truePart, falsePart) => {
        const condValue = resolvePath(obj, cond.trim());
        const isTruthy = condValue !== '' && condValue != null && condValue !== '0' && condValue !== false && condValue !== 0;
        return resolveExpr(isTruthy ? truePart : falsePart, obj);
    });
    // {{path1|path2|path3}}
    result = result.replace(/\{\{([\w.|]+)\}\}/g, (_, expr) => {
        const paths = expr.split('|');
        for (const path of paths) {
            const value = resolvePath(obj, path.trim());
            if (value !== '' && value != null) return String(value);
        }
        return '';
    });
    return result;
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
