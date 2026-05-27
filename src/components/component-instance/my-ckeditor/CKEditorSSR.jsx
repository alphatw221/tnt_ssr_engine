import React from "react";
import 'ckeditor5/ckeditor5-content.css';

const KPCKEditorSSR = ({
    element,
    elementProps,
    mode,
    ...props
}) => {
    return (
        <div
            {...elementProps}
            className={`ck-content${elementProps?.className ? ' ' + elementProps.className : ''}`}
            dangerouslySetInnerHTML={{ __html: element?.data?.context }}
        />
    );
};

KPCKEditorSSR.propTypes = {};

export default KPCKEditorSSR;
