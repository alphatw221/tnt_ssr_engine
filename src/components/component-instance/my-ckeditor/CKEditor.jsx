import PropTypes from "prop-types";
import React, { useRef, useState, useEffect, useMemo } from "react";

import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
    ClassicEditor,
    Alignment,
    Autoformat,
    AutoImage,
    Autosave,
    BlockQuote,
    Bold,
    CloudServices,
    Code,
    CodeBlock,
    Essentials,
    FontBackgroundColor,
    FontColor,
    FontFamily,
    FontSize,
    Heading,
    Highlight,
    HorizontalLine,
    ImageBlock,
    ImageCaption,
    ImageInline,
    ImageInsert,
    ImageInsertViaUrl,
    ImageResize,
    ImageStyle,
    ImageTextAlternative,
    ImageToolbar,
    ImageUpload,
    Indent,
    IndentBlock,
    Italic,
    Link,
    LinkImage,
    List,
    MediaEmbed,
    Paragraph,
    PasteFromOffice,
    SimpleUploadAdapter,
    Strikethrough,
    Subscript,
    Superscript,
    Table,
    TableCaption,
    TableToolbar,
    TextTransformation,
    TodoList,
    Underline
} from 'ckeditor5';
import translations from 'ckeditor5/translations/zh.js';

import 'ckeditor5/ckeditor5.css';

import Cookies from "js-cookie";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { user_update_element } from '@/api/element.js';

const KPCKEditor = ({
    element,
    elementProps,
    mode,
    actions,
    ...props
}) => {
    const dispatch = useAppDispatch();
    const { selectedTool } = useAppSelector((state) => state.editor_memory);

    const [isLayoutReady, setIsLayoutReady] = useState(false);
    const editorRef = useRef(null);

    useEffect(() => {
        setIsLayoutReady(true);
        return () => setIsLayoutReady(false);
    }, []);

    const editorConfig = useMemo(() => {
        if (!isLayoutReady) return null;

        return {
            plugins: [
                Alignment, Autoformat, AutoImage, Autosave,
                BlockQuote, Bold, CloudServices, Code, CodeBlock,
                Essentials, FontBackgroundColor, FontColor, FontFamily, FontSize,
                Heading, Highlight, HorizontalLine,
                ImageBlock, ImageCaption, ImageInline, ImageInsert, ImageInsertViaUrl,
                ImageResize, ImageStyle, ImageTextAlternative, ImageToolbar, ImageUpload,
                Indent, IndentBlock, Italic, Link, LinkImage, List,
                MediaEmbed, Paragraph, PasteFromOffice, SimpleUploadAdapter,
                Strikethrough, Subscript, Superscript,
                Table, TableCaption, TableToolbar,
                TextTransformation, TodoList, Underline
            ],
            toolbar: {
                items: [
                    'undo', 'redo', '|',
                    'heading', '|',
                    'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|',
                    'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', 'code', '|',
                    'horizontalLine', 'link', 'insertImage', 'mediaEmbed', 'insertTable', 'highlight', 'blockQuote', 'codeBlock', '|',
                    'alignment', '|',
                    'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent'
                ],
                shouldNotGroupWhenFull: false
            },
            language: 'zh',
            translations: [translations],
            licenseKey: 'GPL',
            fontFamily: { supportAllValues: true },
            fontSize: {
                options: [10, 12, 14, 'default', 18, 20, 22],
                supportAllValues: true
            },
            heading: {
                options: [
                    { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                    { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                    { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                    { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                    { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                    { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                    { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
                ]
            },
            image: {
                toolbar: [
                    'toggleImageCaption', 'imageTextAlternative', '|',
                    'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText', '|',
                    'resizeImage'
                ]
            },
            link: {
                addTargetToExternalLinks: true,
                defaultProtocol: 'https://',
                decorators: {
                    toggleDownloadable: {
                        mode: 'manual',
                        label: 'Downloadable',
                        attributes: { download: 'file' }
                    }
                }
            },
            table: {
                contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
            },
            simpleUpload: {
                uploadUrl: `${import.meta.env.VITE_APP_API_PROTOCAL}://${location.hostname}${import.meta.env.VITE_APP_API_PORT ? ':' + import.meta.env.VITE_APP_API_PORT : ''}/api/v1/store/image/ckeditor/upload/`,
                withCredentials: false,
                headers: {
                    'HTTP_X_CSRFTOKEN': Cookies.get('csrftoken'),
                    Authorization: `Bearer ${Cookies.get('user_access_token')}`
                }
            },
            mediaEmbed: {
                previewsInData: true
            }
        };
    }, [isLayoutReady]);

    if (mode === 'dev' && ['arrow', 'drag', 'iCursor'].includes(selectedTool)) {
        return editorConfig && (
            <CKEditor
                {...elementProps}
                editor={ClassicEditor}
                config={editorConfig}
                data={element?.data?.context || ''}
                onReady={editor => {
                    editorRef.current = editor;
                }}
                onChange={(event, editor) => {}}
                onBlur={(event, editor) => {
                    const data = editor.getData();
                    const updated = { ...element, data: { ...element?.data, context: data } };
                    user_update_element({ element_uuid: updated?.uuid, data: { ...updated, children: null } })
                        .then(res => { console.log(res.data) });
                    actions?.globleUpdateElement(updated?.uuid, updated);
                }}
                onFocus={(event, editor) => {}}
            />
        );
    }

    return (
        <p
            {...elementProps}
            dangerouslySetInnerHTML={{ __html: element?.data?.context }}
        />
    );
};

KPCKEditor.propTypes = {};

export default KPCKEditor;
