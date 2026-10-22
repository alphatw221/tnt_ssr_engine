import React from "react";


/* ============================================================
   檔案管理用的自製 SVG icon
   - UI icon：24×24 網格、1.75 線寬、圓角端點，顏色跟隨 currentColor，
     尺寸預設 1em (跟著 font-size 走，用法跟 FontAwesome 相同)
   - 檔案型別 icon：實心頁面 + 摺角 + 白色圖形，顏色跟隨 currentColor (.tone-xxx)
   ============================================================ */

function UIIcon({ children, className, title, strokeWidth = 1.75, ...props }) {
    return (
        <svg
            className={className}
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden={title ? undefined : true}
            role={title ? 'img' : undefined}
            focusable="false"
            {...props}
        >
            {title && <title>{title}</title>}
            {children}
        </svg>
    );
}

const make = (paths, defaults) => (props) => <UIIcon {...defaults} {...props}>{paths}</UIIcon>;

const folderOutline = "M3.5 7.25A2.25 2.25 0 0 1 5.75 5h3.38a2.25 2.25 0 0 1 1.6.66L12 6.93h6.25a2.25 2.25 0 0 1 2.25 2.25v8.07a2.25 2.25 0 0 1-2.25 2.25H5.75a2.25 2.25 0 0 1-2.25-2.25z";

export const Icons = {
    Search: make(<>
        <circle cx="10.75" cy="10.75" r="6.25" />
        <path d="m15.5 15.5 4.75 4.75" />
    </>),

    Close: make(<path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />),

    ChevronRight: make(<path d="m9.5 6 6 6-6 6" />),
    ChevronUp: make(<path d="m7 14.5 5-5 5 5" />, { strokeWidth: 2.25 }),
    ChevronDown: make(<path d="m7 9.5 5 5 5-5" />, { strokeWidth: 2.25 }),

    Home: make(<>
        <path d="M4 10.4 11.2 4.6a1.25 1.25 0 0 1 1.6 0L20 10.4" />
        <path d="M5.75 9v9.25A1.75 1.75 0 0 0 7.5 20h2.75v-5a1.75 1.75 0 0 1 1.75-1.75h0A1.75 1.75 0 0 1 13.75 15v5h2.75a1.75 1.75 0 0 0 1.75-1.75V9" />
    </>),

    FolderPlus: make(<>
        <path d={folderOutline} />
        <path d="M12 10.5v5M9.5 13h5" />
    </>),

    FolderOpen: make(<>
        <path d="M3.5 17V7.25A2.25 2.25 0 0 1 5.75 5h3.38a2.25 2.25 0 0 1 1.6.66L12 6.93h5.75A2.25 2.25 0 0 1 20 9.18v1.07" />
        <path d="M3.6 17.6 5.9 11.6a2 2 0 0 1 1.87-1.29h12.4a1.25 1.25 0 0 1 1.18 1.65l-1.96 5.7a2 2 0 0 1-1.9 1.34H5.45a1.95 1.95 0 0 1-1.85-1.4z" />
    </>),

    // 移動：資料夾 + 箭頭
    Move: make(<>
        <path d={folderOutline} />
        <path d="M9 13.25h6M12.75 11l2.25 2.25-2.25 2.25" />
    </>),

    Upload: make(<>
        <path d="M12 15V4.75M7.75 9 12 4.75 16.25 9" />
        <path d="M4.75 14.5v2.75A2.75 2.75 0 0 0 7.5 20h9a2.75 2.75 0 0 0 2.75-2.75V14.5" />
    </>),

    CloudUpload: make(<>
        <path d="M7.25 18.5h-.5a4.25 4.25 0 0 1-.55-8.46 6 6 0 0 1 11.6 0 4.25 4.25 0 0 1-.55 8.46h-.5" />
        <path d="M12 20v-7.25M9.25 15.25 12 12.5l2.75 2.75" />
    </>),

    Grid: make(<>
        <rect x="4" y="4" width="6.75" height="6.75" rx="1.75" />
        <rect x="13.25" y="4" width="6.75" height="6.75" rx="1.75" />
        <rect x="4" y="13.25" width="6.75" height="6.75" rx="1.75" />
        <rect x="13.25" y="13.25" width="6.75" height="6.75" rx="1.75" />
    </>),

    List: make(<>
        <path d="M9.5 6.5h10M9.5 12h10M9.5 17.5h10" />
        <path d="M4.75 6.5h.01M4.75 12h.01M4.75 17.5h.01" strokeWidth="2.5" />
    </>),

    // 升冪：箭頭朝上、橫條由短到長
    SortAsc: make(<>
        <path d="M7 19V5.5M3.75 8.75 7 5.5l3.25 3.25" />
        <path d="M13.5 7h3M13.5 12h5M13.5 17h7" />
    </>),
    // 降冪：箭頭朝下、橫條由長到短
    SortDesc: make(<>
        <path d="M7 5v13.5M3.75 15.25 7 18.5l3.25-3.25" />
        <path d="M13.5 7h7M13.5 12h5M13.5 17h3" />
    </>),

    Check: make(<path d="m5.5 12.5 4.25 4.25L18.5 8" />, { strokeWidth: 2.75 }),

    Link: make(<>
        <path d="M10.25 13.75a3.9 3.9 0 0 0 5.5 0l2.75-2.75a3.9 3.9 0 0 0-5.5-5.5l-.9.9" />
        <path d="M13.75 10.25a3.9 3.9 0 0 0-5.5 0L5.5 13a3.9 3.9 0 0 0 5.5 5.5l.9-.9" />
    </>),

    Lock: make(<>
        <rect x="5" y="10.25" width="14" height="10" rx="2.5" />
        <path d="M8.25 10.25V8a3.75 3.75 0 0 1 7.5 0v2.25" />
        <path d="M12 14.25v2" />
    </>),

    Globe: make(<>
        <circle cx="12" cy="12" r="8.25" />
        <path d="M3.75 12h16.5" />
        <path d="M12 3.75c2.2 2.25 3.3 5 3.3 8.25s-1.1 6-3.3 8.25c-2.2-2.25-3.3-5-3.3-8.25S9.8 6 12 3.75z" />
    </>),

    Pen: make(<>
        <path d="M14.75 5.75 18.25 9.25" />
        <path d="M4.75 19.25 5.5 15.5 15.9 5.1a1.77 1.77 0 0 1 2.5 0l.99.99a1.77 1.77 0 0 1 0 2.5L9 19l-4.25.25z" />
    </>),

    Trash: make(<>
        <path d="M4.75 7h14.5" />
        <path d="M9.25 7V5.5A1.5 1.5 0 0 1 10.75 4h2.5a1.5 1.5 0 0 1 1.5 1.5V7" />
        <path d="m6.5 7 .8 11.1A2 2 0 0 0 9.3 20h5.4a2 2 0 0 0 2-1.9L17.5 7" />
        <path d="M10.25 11v5M13.75 11v5" />
    </>),
};


/* ---------- 檔案型別 icon ---------- */

// 頁面 (含摺角) 32×40
const PAGE = "M6 1.5h14.6a3 3 0 0 1 2.12.88l7.4 7.4a3 3 0 0 1 .88 2.12V35.5a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-31a3 3 0 0 1 3-3z";
const FOLD = "M21 1.6V8a3.5 3.5 0 0 0 3.5 3.5h6.4z";

const GLYPHS = {
    image: <>
        <circle cx="12" cy="20.5" r="2.4" fill="#fff" />
        <path d="M7.5 32 13.4 25.6a1 1 0 0 1 1.45-.02l3.05 3.12 2.2-2.3a1 1 0 0 1 1.45 0L24.5 29.5V31a1 1 0 0 1-1 1z" fill="#fff" />
    </>,
    video: <path d="M13 21.6v8.8a1 1 0 0 0 1.52.85l7.1-4.4a1 1 0 0 0 0-1.7l-7.1-4.4A1 1 0 0 0 13 21.6z" fill="#fff" />,
    audio: <>
        <path d="M14.25 29.5V21.4a1 1 0 0 1 .78-.98l5.5-1.24a1 1 0 0 1 1.22.98V27.5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12.25" cy="29.75" r="2.25" fill="#fff" />
        <circle cx="19.5" cy="27.75" r="2.25" fill="#fff" />
    </>,
    pdf: <>
        <rect x="6.5" y="22.5" width="19" height="9" rx="2" fill="#fff" />
        <text x="16" y="29.4" textAnchor="middle" fontSize="6.6" fontWeight="700" fontFamily="-apple-system, 'Segoe UI', Arial, sans-serif" letterSpacing=".3" fill="currentColor">PDF</text>
    </>,
    archive: <>
        <path d="M15 4h2v2.5h-2zM17 6.5h2V9h-2zM15 9h2v2.5h-2zM17 11.5h2V14h-2zM15 14h2v2.5h-2z" fill="#fff" fillOpacity=".85" />
        <rect x="13.75" y="18.5" width="6.5" height="8.5" rx="1.75" fill="none" stroke="#fff" strokeWidth="1.75" />
        <path d="M17 22.25v1.5" stroke="#fff" strokeWidth="1.75" strokeLinecap="round" />
    </>,
    text: <path d="M9.5 21h13M9.5 25.25h13M9.5 29.5h8" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />,
    default: <path d="M9.5 23h13M9.5 27.5h9" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeOpacity=".9" />,
};

export function FileTypeIcon({ kind = 'default', className }) {
    return (
        <svg className={className} viewBox="0 0 34 40" aria-hidden="true" focusable="false">
            <path d={PAGE} fill="currentColor" />
            <path d={FOLD} fill="#fff" fillOpacity=".38" />
            {GLYPHS[kind] || GLYPHS.default}
        </svg>
    );
}

// 雙色資料夾 40×32：後片較深、前片為主色，前片頂端一道亮邊
export function FolderIcon({ className }) {
    return (
        <svg className={className} viewBox="0 0 40 32" aria-hidden="true" focusable="false">
            <path d="M2 5.5A3.5 3.5 0 0 1 5.5 2h8.6a3.5 3.5 0 0 1 2.47 1.02L19.5 6H34.5A3.5 3.5 0 0 1 38 9.5V26.5a3.5 3.5 0 0 1-3.5 3.5h-29A3.5 3.5 0 0 1 2 26.5z" fill="currentColor" />
            <path d="M2 5.5A3.5 3.5 0 0 1 5.5 2h8.6a3.5 3.5 0 0 1 2.47 1.02L19.5 6H34.5A3.5 3.5 0 0 1 38 9.5V26.5a3.5 3.5 0 0 1-3.5 3.5h-29A3.5 3.5 0 0 1 2 26.5z" fill="#000" fillOpacity=".16" />
            <path d="M2 12.5A3.5 3.5 0 0 1 5.5 9h29a3.5 3.5 0 0 1 3.5 3.5v14a3.5 3.5 0 0 1-3.5 3.5h-29A3.5 3.5 0 0 1 2 26.5z" fill="currentColor" />
            <path d="M5.5 9h29a3.5 3.5 0 0 1 3.4 2.7H2.1A3.5 3.5 0 0 1 5.5 9z" fill="#fff" fillOpacity=".22" />
        </svg>
    );
}
