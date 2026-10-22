import React, { useState, useMemo, useCallback, useEffect, useRef, Fragment } from "react";
import styles from "./FileBrowser.module.scss";
import { Icons, FileTypeIcon, FolderIcon } from "./Icons.jsx";
import { useDropzone } from "react-dropzone";
import {user_upload_store_files, user_search_store_file, user_delete_store_files, user_update_store_file, user_move_store_files} from "@/api/store_file.js"
import { createPortal } from "react-dom";
import MoveDialog from "./MoveDialog.jsx";
import Dialog from "./Dialog.jsx";

const mockFiles = [
  { uuid: 1, name: "文件A.pdf", type: "application/pdf", created_at: "2023-05-01", is_folder: false },
  { uuid: 2, name: "圖片", type: null, created_at: "2023-04-20", is_folder: true },
  { uuid: 3, name: "音樂.mp3", type: "audio/mpeg", created_at: "2023-03-18", is_folder: false },
  { uuid: 4, name: "影片.mp4", type: "video/mp4", created_at: "2023-01-11", is_folder: false },
];


const mimeTypes = {
  // 📄 文字 / 文件
  ".txt": "text/plain",
  ".html": "text/html",
  ".htm": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".xml": "application/xml",
  ".csv": "text/csv",

  // 📂 文件 / 壓縮
  ".pdf": "application/pdf",
  ".zip": "application/zip",
  ".rar": "application/x-rar-compressed",
  ".7z": "application/x-7z-compressed",
  ".bin": "application/octet-stream",

  // 🖼 圖片
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",

  // 🎵 音訊
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".ogg": "audio/ogg",
  ".aac": "audio/aac",
  ".weba": "audio/webm",

  // 🎬 影片
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".ogv": "video/ogg",
  ".avi": "video/x-msvideo",
  ".mov": "video/quicktime",

  // 📦 表單 / 上傳
  ".form": "multipart/form-data", // 不是真正副檔名，表單用
  ".urlencoded": "application/x-www-form-urlencoded"
};


// 依檔案型別決定圖示 (kind) 與顏色 (scss 的 .tone-xxx)
function fileKind(item) {
    const type = item?.type || ''
    if(item?.is_folder) return 'folder'
    if(type.startsWith('image')) return 'image'
    if(type.startsWith('video')) return 'video'
    if(type.startsWith('audio')) return 'audio'
    if(type === 'application/pdf') return 'pdf'
    if(/zip|rar|7z|tar|gzip/.test(type)) return 'archive'
    if(type.startsWith('text') || /json|xml|javascript/.test(type)) return 'text'
    return 'default'
}

function FileIcon({ item, size }) {
    const kind = fileKind(item)
    return (
        <span className={`${styles['file-icon']} ${styles['tone-'+kind]} ${size ? styles['file-icon-'+size] : ''}`}>
            {kind === 'folder' ? <FolderIcon /> : <FileTypeIcon kind={kind} />}
        </span>
    )
}


function formatBytes(bytes = 0) {
    if (bytes === 0 || bytes === undefined || bytes === null) return "-";
    const units = ["B", "KB", "MB", "GB", "TB"];
    let i = 0;
    let num = bytes;
    while (num >= 1024 && i < units.length - 1) {
        num /= 1024;
        i++;
    }
    return `${num.toFixed(num >= 10 ? 0 : 1)} ${units[i]}`;
}


const dateTimeFormat = new Intl.DateTimeFormat('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false });
const dateFormat = new Intl.DateTimeFormat('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' });

function formatDate(iso, withTime = true) {
    if (!iso) return "-";
    const d = new Date(iso);
    if (isNaN(d)) return "-";
    return (withTime ? dateTimeFormat : dateFormat).format(d);
}

// 簡單的 MIME → 好讀的型別名稱
function formatType(item) {
    if (item?.is_folder) return "資料夾";
    const type = item?.type;
    if (!type) return "未知";
    const ext = Object.keys(mimeTypes).find(k => mimeTypes[k] === type);
    return ext ? ext.slice(1).toUpperCase() : type;
}




// 記住上次的路徑 / 排序，下次打開時回到同樣的位置
const STORAGE_KEYS = {
    path: 'fileManagerPath',
    sortKey: 'fileManagerSortKey',
    sortOrder: 'fileManagerSortOrder',
    layout: 'fileManagerLayout',
}
const SORT_KEYS = ['name', 'type', 'size', 'created_at'];
const SORT_ORDERS = ['asc', 'desc'];

// localStorage 可能不存在 (SSR / 無痕模式) 或內容損毀，失敗時回傳預設值
function loadFromStorage(key, fallback, isValid) {
    try {
        const raw = window.localStorage.getItem(key);
        if (raw === null) return fallback;
        const value = JSON.parse(raw);
        return isValid(value) ? value : fallback;
    } catch (e) {
        return fallback;
    }
}

function saveToStorage(key, value) {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {}
}


export default function FileManager({actions, ...props}) {
    const [layout, setLayout] = useState(() => loadFromStorage(STORAGE_KEYS.layout, "grid", v => ['grid', 'list'].includes(v)));
    const [path, setPath] = useState(() => loadFromStorage(STORAGE_KEYS.path, [], v => Array.isArray(v) && v.every(p => p?.uuid)));
    const [sortKey, setSortKey] = useState(() => loadFromStorage(STORAGE_KEYS.sortKey, "name", v => SORT_KEYS.includes(v)));
    const [sortOrder, setSortOrder] = useState(() => loadFromStorage(STORAGE_KEYS.sortOrder, "asc", v => SORT_ORDERS.includes(v)));
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [selected, setSelected] = useState(new Set()); // 選取的 uuid，刪除 / 編輯 / 移動都以此為準
    const selectAnchorRef = useRef(null); // shift 範圍選取的起點 uuid
    const [items, setItems] = useState([]);   
    const [acceptedFiles, setAcceptedFiles] = useState([]);   
    const [targetFileClone, setTargetFileClone] = useState(null);
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showMoveDialog, setShowMoveDialog] = useState(false);
    const [processing, setProcessing] = useState(false);

    const [uploadIsPublic, setUploadIsPublic] = useState(true);

    const [itemContextMenuPos, setItemContextMenuPos] = useState(null); // {x, y} | null
    const itemContextMenuRef = useRef(null);

    const [tableContextMenuPos, setTableContextMenuPos] = useState(null); // {x, y} | null
    const tableContextMenuRef = useRef(null);

    const [nextCursor, setNextCursor] = useState(null); // null 代表沒有下一頁
    const loadingRef = useRef(false);
    const requestIdRef = useRef(0);
    const sentinelRef = useRef(null);


    useEffect(()=>{ saveToStorage(STORAGE_KEYS.path, path) },[path])
    useEffect(()=>{ saveToStorage(STORAGE_KEYS.sortKey, sortKey) },[sortKey])
    useEffect(()=>{ saveToStorage(STORAGE_KEYS.sortOrder, sortOrder) },[sortOrder])
    useEffect(()=>{ saveToStorage(STORAGE_KEYS.layout, layout) },[layout])

    // 右下角的短暫提示 (例如「已複製網址」)
    const [toast, setToast] = useState(null);
    const toastTimerRef = useRef(null);
    const showToast = (message)=>{
        setToast(message)
        clearTimeout(toastTimerRef.current)
        toastTimerRef.current = setTimeout(()=>setToast(null), 2000)
    }
    useEffect(()=>()=>clearTimeout(toastTimerRef.current),[])

    const copyLink = (item)=>{
        navigator.clipboard?.writeText(item?.public_file)
            .then(()=>showToast('已複製網址'))
            .catch(()=>showToast('複製失敗'))
    }




    const handleContextMenu = (e) => {
        e.preventDefault(); // 阻止預設的右鍵選單

        const clickX = e.clientX;
        const clickY = e.clientY;
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const menuW = itemContextMenuRef.current?.offsetWidth || 150; // 預估寬度
        const menuH = itemContextMenuRef.current?.offsetHeight || 100; // 預估高度

        let posX = clickX;
        let posY = clickY;

        // 如果超出右邊，就往左擺
        if (clickX + menuW > screenW) {
        posX = screenW - menuW - 5;
        }

        // 如果超出下方，就往上擺
        if (clickY + menuH > screenH) {
        posY = screenH - menuH - 5;
        }

        setItemContextMenuPos({ x: posX, y: posY });

        
    };

    const handleClickOutside = (e) => {
        if (itemContextMenuRef.current && !itemContextMenuRef.current.contains(e.target)) {
            setItemContextMenuPos(null); // 點擊外部關閉
        }
        if (tableContextMenuRef.current && !tableContextMenuRef.current.contains(e.target)) {
            setTableContextMenuPos(null); // 點擊外部關閉
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
        document.removeEventListener("click", handleClickOutside);
        };
    }, []);




    // 排序由後端處理 (分頁才會正確)，items 即為後端回傳的順序

    const selectedItems = useMemo(() => items.filter(i => selected.has(i?.uuid)), [items, selected]);
    const singleSelected = selectedItems.length === 1 ? selectedItems[0] : null;

    // 從後端回傳的 next (完整網址或 cursor 字串) 取出 cursor
    const getCursorFromNext = (next)=>{
        if(!next) return null
        try{
            return new URL(next, window.location.origin).searchParams.get('cursor')
        }catch(e){
            return next
        }
    }

    const currentFolderUUID = path?.[path.length-1]?.uuid||''

    const fetchItems = useCallback((cursor)=>{
        const requestId = ++requestIdRef.current
        loadingRef.current = true
        setProcessing(true)
        user_search_store_file({
            'store_uuid':actions?.getStoreUUID(),
            'store_file_uuid':currentFolderUUID,
            'keyword':debouncedSearch,
            'page_size':50,
            'cursor':cursor||'',
            'order_by':sortKey,
            'order':sortOrder,
        }).then(res=>{
            if(requestId !== requestIdRef.current) return   // 已切換資料夾、搜尋字或排序，丟棄舊回應
            const results = res.data?.results||[]
            setItems(prev=>{
                if(!cursor) return results
                // 剛新增 / 上傳的項目已經插入列表，翻到它所在的頁時不要重複
                const exists = new Set(prev.map(i=>i?.uuid))
                return [...prev, ...results.filter(i=>!exists.has(i?.uuid))]
            })
            setNextCursor(getCursorFromNext(res.data?.next))

            // 資料夾可能已被移動 / 改名，以後端回傳的實際路徑為準
            const folderPath = res.data?.folder_path
            if(!cursor && Array.isArray(folderPath)){
                setPath(prev=>{
                    const same = prev.length===folderPath.length && prev.every((p, i)=>p?.uuid===folderPath[i]?.uuid && p?.name===folderPath[i]?.name)
                    return same ? prev : folderPath
                })
            }
        }).catch(err=>{
            if(requestId !== requestIdRef.current) return
            setNextCursor(null)
            // 記住的資料夾已被刪除 → 回到根目錄
            const message = err?.response?.data?.message
            if(currentFolderUUID && ['folder_not_found', 'invalid store file uuid'].includes(message)){
                setPath([])
            }else{
                alert('錯誤')
            }
        }).finally(()=>{
            if(requestId !== requestIdRef.current) return
            loadingRef.current = false
            setProcessing(false)
        })
    },[currentFolderUUID, debouncedSearch, sortKey, sortOrder, actions])

    // 輸入停止 300ms 後才送出搜尋
    useEffect(()=>{
        const timer = setTimeout(()=>setDebouncedSearch(search.trim()), 300)
        return ()=>clearTimeout(timer)
    },[search])

    useEffect(()=>{
        setNextCursor(null)
        clearSelection()
        fetchItems('')
    },[currentFolderUUID, debouncedSearch, sortKey, sortOrder])  // 只看目前資料夾的 uuid，路徑校正 (改名 / 移動) 不會重新載入

    // 滑到底 (sentinel 進入可視範圍) 時載入下一頁
    useEffect(()=>{
        const sentinel = sentinelRef.current
        if(!sentinel || !nextCursor) return
        const observer = new IntersectionObserver((entries)=>{
            if(entries[0]?.isIntersecting && !loadingRef.current){
                fetchItems(nextCursor)
            }
        }, { rootMargin: '200px' })
        observer.observe(sentinel)
        return ()=>observer.disconnect()
    },[nextCursor, fetchItems])

    // 當檔案被拖放進來
    const onDrop = useCallback((acceptedFiles) => {
        console.log(acceptedFiles)
        setAcceptedFiles(acceptedFiles)
        setShowUploadForm(true)
    }, []);

    const uploadAcceptedFiles = ()=>{
        const formData = new FormData();
        (acceptedFiles||[])?.forEach(f=>{
            formData.append('files',f)
        })
        formData.set('json', JSON.stringify({'is_public':uploadIsPublic, 'is_folder':false}))

        setProcessing(true)
        setShowUploadForm(false)
        user_upload_store_files({
            'store_uuid':actions?.getStoreUUID(),
            'store_file_uuid':path?.[path.length-1]?.uuid||null,
            'formData':formData
        }).then(res=>{
            console.log(res.data)
            setItems(prev=>[...res.data, ...prev])  // 放在最前面，items 會再把資料夾 / 檔案分開
            setProcessing(false)
        }).catch(err=>{setProcessing(false)})
    }
    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
        onDrop,
        noClick: true, // 不要在點擊時開啟檔案選擇
        noKeyboard: true,
    });
    


    const onEnterFolder = (store_file) => {
        if(store_file?.is_folder){
            setPath([...path, store_file])
        }
    };


    const onBreadcrumbClick = (index) => {
        setPath(path?.slice(0, index))
    };


    const toggleSelect = (uuid) => {
        selectAnchorRef.current = uuid
        setSelected((prev) => {
            const next = new Set(prev);
            if (next.has(uuid)) next.delete(uuid);
            else next.add(uuid);
            return next;
        });
    };

    // 單擊: 只選這個 / Cmd(Ctrl)+單擊: 加選或取消 / Shift+單擊: 範圍選取
    const onItemClick = (e, item) => {
        e.stopPropagation()
        if(e.metaKey || e.ctrlKey){
            toggleSelect(item.uuid)
            return
        }
        const anchorIndex = items.findIndex(i=>i?.uuid===selectAnchorRef.current)
        if(e.shiftKey && anchorIndex>=0){
            const index = items.findIndex(i=>i?.uuid===item.uuid)
            const [start, end] = anchorIndex<index ? [anchorIndex, index] : [index, anchorIndex]
            setSelected(new Set(items.slice(start, end+1).map(i=>i.uuid)))
            return
        }
        selectAnchorRef.current = item.uuid
        setSelected(new Set([item.uuid]))
    };

    // 在未選取的項目上按右鍵 → 只選它；在已選取的項目上按右鍵 → 保留目前的選取
    const onItemContextMenu = (e, item) => {
        e.stopPropagation()
        if(!selected.has(item.uuid)){
            selectAnchorRef.current = item.uuid
            setSelected(new Set([item.uuid]))
        }
        handleContextMenu(e)
    };

    const createFolder = ()=>{

        const formData = new FormData();
        formData.set('json', JSON.stringify({'is_public':true, 'is_folder':true}))

        setProcessing(true)
        setShowUploadForm(false)
        user_upload_store_files({
            'store_uuid':actions?.getStoreUUID(),
            'store_file_uuid':path?.[path.length-1]?.uuid||null,
            'formData':formData
        }).then(res=>{
            console.log(res.data)
            setItems(prev=>[...res.data, ...prev])  // 放在最前面，items 會再把資料夾 / 檔案分開
            setProcessing(false)
        }).catch(err=>{setProcessing(false)})
    }
    const clearSelection = () => {
        selectAnchorRef.current = null
        setSelected(new Set())
    };

    const deleteStoreFiles = ()=>{
        const deleteUUIDs = selectedItems.map(i=>i.uuid)
        if(deleteUUIDs.length<1) return

        if(confirm(deleteUUIDs.length===1 ? `確認刪除「${selectedItems[0]?.name}」` : `確認刪除 ${deleteUUIDs.length} 個項目`)){
            setProcessing(true)
            user_delete_store_files({
                'store_uuid':actions?.getStoreUUID(),
                'store_file_uuids': deleteUUIDs,
                
            }).then(res=>{
                const deleted = new Set(deleteUUIDs)
                setItems(prev=>prev.filter(i=>!deleted.has(i?.uuid)))
                clearSelection()
                setProcessing(false)
            }).catch(err=>{setProcessing(false)})
        }
    }

    const updateTargetFile = ()=>{
        setProcessing(true)
        user_update_store_file({
            'store_uuid':actions?.getStoreUUID(),
            'store_file_uuid': targetFileClone?.uuid,
            'data':targetFileClone,
        }).then(res=>{
            setItems(prev=>prev.map(i=>i?.uuid==res?.data?.uuid ? res?.data : i))
            setProcessing(false)
        }).catch(err=>{setProcessing(false)})
    }

    const moveStoreFiles = (targetFolder)=>{
        const moveUUIDs = selectedItems.map(i=>i.uuid)
        setShowMoveDialog(false)
        if(moveUUIDs.length<1) return

        setProcessing(true)
        user_move_store_files({
            'store_uuid':actions?.getStoreUUID(),
            'store_file_uuids':moveUUIDs,
            'target_folder_uuid':targetFolder?.uuid||null,
        }).then(res=>{
            // 移走的項目已不在目前資料夾
            const moved = new Set(moveUUIDs)
            setItems(prev=>prev.filter(i=>!moved.has(i?.uuid)))
            clearSelection()
            setProcessing(false)
        }).catch(err=>{setProcessing(false)})
    }

    const currentFolderName = path?.[path.length-1]?.name || '根目錄'
    const allSelected = items.length>0 && selectedItems.length===items.length
    const loadingMore = processing && items.length>0 && !!nextCursor

    // 列表表頭點擊排序：同欄位切換升降冪，換欄位從升冪開始
    const onHeaderSort = (key)=>{
        if(sortKey===key){
            setSortOrder(o=>o==='asc' ? 'desc' : 'asc')
        }else{
            setSortKey(key)
            setSortOrder('asc')
        }
    }
    // 一般函式 (不是元件)，避免每次 render 都產生新的元件型別造成重新掛載
    const sortHeader = (sortBy, label, className)=>(
        <th className={className}>
            <button type="button" className={`${styles['th-sort']} ${sortKey===sortBy ? styles['active'] : ''}`} onClick={()=>onHeaderSort(sortBy)}>
                {label}
                {sortKey===sortBy && (sortOrder==='asc' ? <Icons.ChevronUp /> : <Icons.ChevronDown />)}
            </button>
        </th>
    )

    // 列表 / 網格共用的點擊、右鍵、雙擊
    const itemHandlers = (it)=>({
        onClick: (e)=>onItemClick(e, it),
        onContextMenu: (e)=>onItemContextMenu(e, it),
        onDoubleClick: ()=>onEnterFolder(it),
    })

    const itemCheckbox = (it)=>(
        <label className={styles['checkbox']} onClick={(e)=>e.stopPropagation()} onDoubleClick={(e)=>e.stopPropagation()}>
            <input
                type="checkbox"
                checked={selected.has(it.uuid)}
                onChange={()=>toggleSelect(it.uuid)}
                aria-label={`選取 ${it.name}`}
            />
            <span className={styles['checkbox-box']}><Icons.Check /></span>
        </label>
    )

    const btn = (variant)=>`${styles['btn']} ${styles['btn-'+variant]}`

    return (
    <div className={styles['fileManager']}>

        {/* 上傳確認 */}
        {showUploadForm &&
            <Dialog
                title="上傳檔案"
                onClose={()=>setShowUploadForm(false)}
                footer={
                    <>
                        <button type="button" className={btn('secondary')} onClick={()=>setShowUploadForm(false)}>取消</button>
                        <button type="button" className={btn('primary')} onClick={uploadAcceptedFiles} disabled={(acceptedFiles||[]).length<1}>
                            上傳 {(acceptedFiles||[]).length} 個檔案
                        </button>
                    </>
                }
            >
                <p className={styles['dialog-text']}>上傳至「{currentFolderName}」</p>
                <ul className={styles['upload-list']}>
                    {(acceptedFiles||[]).slice(0, 5).map((f, i)=>(
                        <li key={i}>
                            <FileIcon item={{type: f.type}} />
                            <span className={styles['upload-list-name']} title={f.name}>{f.name}</span>
                            <span className={styles['upload-list-size']}>{formatBytes(f.size)}</span>
                        </li>
                    ))}
                    {(acceptedFiles||[]).length>5 &&
                        <li className={styles['upload-list-more']}>以及其他 {(acceptedFiles||[]).length-5} 個檔案</li>
                    }
                </ul>

                <div className={styles['field-label']}>存取權限</div>
                <div className={styles['visibility-options']}>
                    {[
                        {value: true, icon: Icons.Globe, title: '公開', desc: '任何拿到網址的人都能檢視'},
                        {value: false, icon: Icons.Lock, title: '不公開', desc: '只能在後台使用'},
                    ].map(o=>(
                        <label key={String(o.value)} className={`${styles['visibility-option']} ${uploadIsPublic===o.value ? styles['active'] : ''}`}>
                            <input type="radio" name="upload-visibility" checked={uploadIsPublic===o.value} onChange={()=>setUploadIsPublic(o.value)} />
                            <o.icon />
                            <span>
                                <strong>{o.title}</strong>
                                <small>{o.desc}</small>
                            </span>
                        </label>
                    ))}
                </div>
            </Dialog>
        }

        {/* 編輯名稱 / 敘述 */}
        {showUpdateForm &&
            <Dialog
                title="編輯"
                onClose={()=>setShowUpdateForm(false)}
                footer={
                    <>
                        <button type="button" className={btn('secondary')} onClick={()=>setShowUpdateForm(false)}>取消</button>
                        <button type="submit" form="file-update-form" className={btn('primary')} disabled={!targetFileClone?.name?.trim()}>儲存</button>
                    </>
                }
            >
                <form id="file-update-form" className={styles['form']} onSubmit={(e)=>{e.preventDefault(); setShowUpdateForm(false); updateTargetFile()}}>
                    <label className={styles['field']}>
                        <span className={styles['field-label']}>名稱</span>
                        <input
                            className={styles['input']}
                            value={targetFileClone?.name||''}
                            type='text'
                            maxLength={128}
                            autoFocus
                            onChange={(e) => setTargetFileClone({...targetFileClone, name:e.target.value})}
                        />
                    </label>
                    <label className={styles['field']}>
                        <span className={styles['field-label']}>敘述</span>
                        <textarea
                            className={styles['input']}
                            value={targetFileClone?.description||''}
                            rows={3}
                            maxLength={255}
                            placeholder="選填"
                            onChange={(e) => setTargetFileClone({...targetFileClone, description:e.target.value})}
                        />
                    </label>
                </form>
            </Dialog>
        }

        {showMoveDialog &&
            <MoveDialog
                actions={actions}
                movingItems={selectedItems}
                currentPath={path}
                onCancel={()=>setShowMoveDialog(false)}
                onConfirm={moveStoreFiles}
            />
        }

        {/* 右鍵選單 */}
        {itemContextMenuPos && createPortal(
            <div
                ref={itemContextMenuRef}
                className={styles['context-menu']}
                style={{ top: itemContextMenuPos.y, left: itemContextMenuPos.x }}
                onContextMenu={(e)=>e.preventDefault()}
            >
                {selectedItems.length===0 && <>
                    <button type="button" onClick={() => { setItemContextMenuPos(null); createFolder()}}>
                        <Icons.FolderPlus /> 新增資料夾
                    </button>
                    <button type="button" onClick={() => { setItemContextMenuPos(null); open()}}>
                        <Icons.Upload /> 上傳檔案
                    </button>
                </>}
                {singleSelected?.is_folder &&
                    <button type="button" onClick={() => {setItemContextMenuPos(null); onEnterFolder(singleSelected)}}>
                        <Icons.FolderOpen /> 開啟
                    </button>
                }
                {singleSelected && !singleSelected.is_folder && singleSelected.is_public &&
                    <button type="button" onClick={() => {setItemContextMenuPos(null); copyLink(singleSelected)}}>
                        <Icons.Link /> 複製網址
                    </button>
                }
                {singleSelected &&
                    <button type="button" onClick={() => {setItemContextMenuPos(null); setTargetFileClone(JSON.parse(JSON.stringify(singleSelected))); setShowUpdateForm(true);}}>
                        <Icons.Pen /> 編輯
                    </button>
                }
                {selectedItems.length>0 && <>
                    <button type="button" onClick={() => {setItemContextMenuPos(null); setShowMoveDialog(true)}}>
                        <Icons.Move /> 移動{selectedItems.length>1 ? ` ${selectedItems.length} 個項目` : ''}
                    </button>
                    <div className={styles['context-menu-divider']} />
                    <button type="button" className={styles['danger']} onClick={() => {setItemContextMenuPos(null); deleteStoreFiles()}}>
                        <Icons.Trash /> 刪除{selectedItems.length>1 ? ` ${selectedItems.length} 個項目` : ''}
                    </button>
                </>}
            </div>
        , document.body)}


        {/* Toolbar */}
        <div className={styles['toolbar']}>
            <div className={styles['search-box']}>
                <Icons.Search />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={`在「${currentFolderName}」中搜尋`}
                />
                {search &&
                    <button type="button" className={styles['icon-button']} onClick={()=>setSearch('')} aria-label="清除搜尋">
                        <Icons.Close />
                    </button>
                }
            </div>

            <div className={styles['toolbar-group']}>
                <div className={styles['segmented']}>
                    <select
                        value={sortKey}
                        onChange={(e) => setSortKey(e.target.value)}
                        title="排序依據"
                    >
                        <option value="name">名稱</option>
                        <option value="type">型別</option>
                        <option value="size">大小</option>
                        <option value="created_at">建立日期</option>
                    </select>
                    <button
                        type="button"
                        onClick={() => setSortOrder((o) => (o === "asc" ? "desc" : "asc"))}
                        title={sortOrder === "asc" ? "升冪" : "降冪"}
                    >
                        {sortOrder === "asc" ? <Icons.SortAsc /> : <Icons.SortDesc />}
                    </button>
                </div>

                <div className={styles['segmented']}>
                    <button type="button" className={layout==='grid' ? styles['active'] : ''} onClick={() => setLayout("grid")} title="網格檢視">
                        <Icons.Grid />
                    </button>
                    <button type="button" className={layout==='list' ? styles['active'] : ''} onClick={() => setLayout("list")} title="清單檢視">
                        <Icons.List />
                    </button>
                </div>

                <span className={styles['toolbar-divider']} />

                <button type="button" className={btn('secondary')} onClick={createFolder} disabled={processing}>
                    <Icons.FolderPlus /> 新增資料夾
                </button>
                <button type="button" className={btn('primary')} onClick={open}>
                    <Icons.Upload /> 上傳
                </button>
            </div>
        </div>


        {/* 路徑 / 已選取的操作列 */}
        <div className={styles['subbar']}>
            {selectedItems.length>0
                ?
                <div className={styles['selection-bar']}>
                    <button type="button" className={styles['icon-button']} onClick={clearSelection} title="取消選取">
                        <Icons.Close />
                    </button>
                    <span className={styles['selection-count']}>已選取 {selectedItems.length} 項</span>
                    <span className={styles['toolbar-divider']} />
                    {singleSelected &&
                        <button type="button" className={btn('ghost')} onClick={()=>{setTargetFileClone(JSON.parse(JSON.stringify(singleSelected))); setShowUpdateForm(true);}}>
                            <Icons.Pen /> 編輯
                        </button>
                    }
                    <button type="button" className={btn('ghost')} onClick={()=>setShowMoveDialog(true)}>
                        <Icons.Move /> 移動
                    </button>
                    <button type="button" className={`${btn('ghost')} ${styles['danger']}`} onClick={deleteStoreFiles}>
                        <Icons.Trash /> 刪除
                    </button>
                </div>
                :
                <nav className={styles['breadcrumb']}>
                    <button
                        type="button"
                        className={styles['crumb']}
                        onClick={() => onBreadcrumbClick(0)}
                        disabled={path.length===0}
                    >
                        <Icons.Home />
                        <span>根目錄</span>
                    </button>
                    {path.map((p, i) => (
                        <Fragment key={p?.uuid || i}>
                            <Icons.ChevronRight className={styles['crumb-separator']} />
                            <button
                                type="button"
                                className={styles['crumb']}
                                onClick={() => onBreadcrumbClick(i+1)}
                                disabled={i === path.length - 1}
                                title={p?.name}
                            >
                                <span>{p?.name || p?.uuid}</span>
                            </button>
                        </Fragment>
                    ))}
                </nav>
            }
            <span className={styles['item-count']}>
                {items.length} 個項目{nextCursor ? '以上' : ''}
            </span>
        </div>


        <div {...getRootProps({ className: styles['drop-zone'] })}>
            <input {...getInputProps()} />

            <div className={`${styles['progress-bar']} ${processing ? styles['show'] : ''}`} />

            <div className={styles['content']}
                onClick={clearSelection}
                onContextMenu={(e)=>{ clearSelection(); handleContextMenu(e); }}
            >
                {items.length<1 && !processing &&
                    <div className={styles['empty-state']}>
                        {debouncedSearch
                            ? <>
                                <div className={styles['empty-icon']}><Icons.Search /></div>
                                <h4>找不到符合「{debouncedSearch}」的項目</h4>
                                <p>試試其他關鍵字，或清除搜尋條件</p>
                                <button type="button" className={btn('secondary')} onClick={(e)=>{e.stopPropagation(); setSearch('')}}>清除搜尋</button>
                            </>
                            : <>
                                <div className={styles['empty-icon']}><Icons.CloudUpload /></div>
                                <h4>這個資料夾是空的</h4>
                                <p>將檔案拖曳到這裡上傳，或使用下方按鈕</p>
                                <div className={styles['empty-actions']}>
                                    <button type="button" className={btn('secondary')} onClick={(e)=>{e.stopPropagation(); createFolder()}}>
                                        <Icons.FolderPlus /> 新增資料夾
                                    </button>
                                    <button type="button" className={btn('primary')} onClick={(e)=>{e.stopPropagation(); open()}}>
                                        <Icons.Upload /> 上傳檔案
                                    </button>
                                </div>
                            </>
                        }
                    </div>
                }

                {items.length>0 && layout==='grid' &&
                    <div className={styles['grid']}>
                        {items.map((it) => (
                            <div key={it.uuid} className={`${styles['card']} ${selected.has(it.uuid) ? styles['selected'] : ''}`} {...itemHandlers(it)}>
                                <div className={styles['card-thumb']}>
                                    {it?.is_public && it?.type?.startsWith('image') && it?.public_file_s
                                        ? <img src={it.public_file_s} alt="" loading="lazy" draggable={false} />
                                        : <FileIcon item={it} size="lg" />
                                    }
                                    {itemCheckbox(it)}
                                    {!it.is_public &&
                                        <span className={styles['card-badge']} title="不公開"><Icons.Lock /></span>
                                    }
                                    {it.is_public && !it.is_folder &&
                                        <button type="button" className={styles['card-action']} title="複製網址" onClick={(e)=>{e.stopPropagation(); copyLink(it)}} onDoubleClick={(e)=>e.stopPropagation()}>
                                            <Icons.Link />
                                        </button>
                                    }
                                </div>
                                <div className={styles['card-info']}>
                                    <div className={styles['card-name']} title={it.name}>{it.name}</div>
                                    <div className={styles['card-meta']}>
                                        {it.is_folder ? '資料夾' : `${formatBytes(it.size)} · ${formatDate(it.created_at, false)}`}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }

                {items.length>0 && layout==='list' &&
                    <table className={styles['table']}>
                        <thead>
                            <tr>
                                <th className={styles['col-check']}>
                                    <label className={styles['checkbox']} onClick={(e)=>e.stopPropagation()}>
                                        <input
                                            type="checkbox"
                                            checked={allSelected}
                                            onChange={()=>allSelected ? clearSelection() : setSelected(new Set(items.map(i=>i.uuid)))}
                                            aria-label="全選"
                                        />
                                        <span className={styles['checkbox-box']}><Icons.Check /></span>
                                    </label>
                                </th>
                                {sortHeader('name', '名稱', styles['col-name'])}
                                <th className={styles['col-desc']}>敘述</th>
                                {sortHeader('type', '型別', styles['col-type'])}
                                {sortHeader('size', '大小', styles['col-size'])}
                                {sortHeader('created_at', '建立日期', styles['col-date'])}
                                <th className={styles['col-actions']}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((it) => (
                                <tr key={it.uuid} className={selected.has(it.uuid) ? styles['selected'] : ''} {...itemHandlers(it)}>
                                    <td className={styles['col-check']}>{itemCheckbox(it)}</td>
                                    <td className={styles['col-name']}>
                                        <div className={styles['name-cell']}>
                                            <FileIcon item={it} />
                                            <span className={styles['name-text']} title={it.name}>{it.name}</span>
                                            {!it.is_public && <Icons.Lock className={styles['private-icon']} title="不公開" />}
                                        </div>
                                    </td>
                                    <td className={styles['col-desc']} title={it.description||''}>{it.description||'—'}</td>
                                    <td className={styles['col-type']}>{formatType(it)}</td>
                                    <td className={styles['col-size']}>{it.is_folder ? "—" : formatBytes(it.size)}</td>
                                    <td className={styles['col-date']}>{formatDate(it.created_at)}</td>
                                    <td className={styles['col-actions']}>
                                        {it?.is_public && !it?.is_folder &&
                                            <button type="button" className={styles['icon-button']} title="複製網址" onClick={(e)=>{e.stopPropagation(); copyLink(it)}} onDoubleClick={(e)=>e.stopPropagation()}>
                                                <Icons.Link />
                                            </button>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }

                {/* 無限捲動用的觸發點 */}
                <div ref={sentinelRef} className={styles['sentinel']}>
                    {loadingMore && <span>載入中…</span>}
                </div>
            </div>

            {isDragActive &&
                <div className={styles['drop-overlay']}>
                    <div>
                        <Icons.CloudUpload />
                        <strong>放開以上傳</strong>
                        <span>檔案將上傳至「{currentFolderName}」</span>
                    </div>
                </div>
            }
        </div>

        {toast && <div className={styles['toast']}>{toast}</div>}
    </div>
  );
}
