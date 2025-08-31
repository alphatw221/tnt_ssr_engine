import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import styles from "./FileBrowser.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faFolder, faFile, faTh, faList, faSortAlphaDown, 
    faSortAlphaUp, faMagnifyingGlass, faChevronRight, 
    faFileVideo, faFileImage, faImage, faVideo, 
    faEye,faEyeLowVision,faCopy,
    faFileAudio, faFilePdf, faFileText, faFileCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { useDropzone } from "react-dropzone";
import {user_upload_store_files, user_search_store_file, user_delete_store_files, user_update_store_file} from "@/api/store_file.js"
import { createPortal } from "react-dom";

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


function fileIconByType(type) {

    if(type.startsWith('image')){
        return <FontAwesomeIcon icon={faFileImage} /> 
    }else if(type.startsWith('audio')){
        return <FontAwesomeIcon icon={faFileAudio} /> 
    }else if(type.startsWith('video')){
        return <FontAwesomeIcon icon={faFileVideo} /> 
    }else if(type.startsWith('text')){
        return <FontAwesomeIcon icon={faFileText} />
    }else if(type.startsWith('application')){
        return <FontAwesomeIcon icon={faFile} />
    }

    return <FontAwesomeIcon icon={faFileCircleQuestion} />
    
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


function formatDate(iso) {
    if (!iso) return "-";
    const d = new Date(iso);
    return d.toLocaleString();
}




export default function FileManager({actions, ...props}) {
    const [layout, setLayout] = useState("grid"); // grid 或 list
    const [path, setPath] = useState(JSON.parse(window?.localStorage?.getItem('fileManagerPath'))||[]);     //local storage
    const [sortKey, setSortKey] = useState("name"); 
    const [sortOrder, setSortOrder] = useState("asc");
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState(new Set()); // 選取的 id
    const [items, setItems] = useState([]);   
    const [acceptedFiles, setAcceptedFiles] = useState([]);   
    const [targetFile, setTargetFile] = useState(null);
    const [targetFileClone, setTargetFileClone] = useState(null);
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [processing, setProcessing] = useState(false);

    const [uploadIsPublic, setUploadIsPublic] = useState(true);

    const [itemContextMenuPos, setItemContextMenuPos] = useState(null); // {x, y} | null
    const itemContextMenuRef = useRef(null);

    const [tableContextMenuPos, setTableContextMenuPos] = useState(null); // {x, y} | null
    const tableContextMenuRef = useRef(null);


        order_by:JSON.parse(window?.localStorage?.getItem('product-search-data'))?.order_by||'priority'


    const savePathToLocalStorage = (path)=>{
        window?.localStorage?.setItem('fileManagerPath', JSON.stringify(path))
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




    const sortedItems = useMemo(() => {

        const filtered = items.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));


        const comparator = (a, b) => {
            const mul = sortOrder === "asc" ? 1 : -1;
            // 資料夾永遠排在檔案前（像雲端硬碟）
            if (a.is_folder && !b.is_folder) return -1;
            if (!a.is_folder && b.is_folder) return 1;


            if (sortKey === "name") return mul * a.name.localeCompare(b.name);
            if (sortKey === "type") return mul * String(a.type || "").localeCompare(String(b.type || ""));
            // if (sortKey === "size") return mul * ((a.size || 0) - (b.size || 0));
            // if (sortKey === "modified") return mul * (new Date(a.modified || 0) - new Date(b.modified || 0));
            return 0;
        };


        return [...filtered].sort(comparator);
    }, [items, search, sortKey, sortOrder]);

    useEffect(()=>{
        setProcessing(true)
        user_search_store_file({
            'store_uuid':actions?.getStoreUUID(),
            'store_file_uuid':path?.[path.length-1]?.uuid||'',
            'keyword':search,
            'page_size':50,
            'cursor':''
        }).then(res=>{
            console.log(res.data)
            setItems(res.data?.results)
            setProcessing(false)
        }).catch(err=>{setProcessing(false)})
    },[path])

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
            'store_file_uuid':path?.[path.length-1]||null,
            'formData':formData
        }).then(res=>{
            console.log(res.data)
            setItems([...items, ...res.data])
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
            savePathToLocalStorage([...path, store_file])
            setSelected(new Set());
        }
    };


    const onBreadcrumbClick = (index) => {
        setPath(path?.slice(0, index))
        savePathToLocalStorage(path?.slice(0, index))
        setSelected(new Set());
        setTargetFile(null)
    };


    const toggleSelect = (uuid) => {
        setSelected((prev) => {
            const next = new Set(prev);
            if (next.has(uuid)) next.delete(uuid);
            else next.add(uuid);
            return next;
        });
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
            setItems([...items, ...res.data])
            setProcessing(false)
        }).catch(err=>{setProcessing(false)})
    }
    const clearSelection = () => setSelected(new Set());

    const deleteStoreFiles = ()=>{

        if(confirm('確認刪除')){
            setProcessing(true)
            user_delete_store_files({
                'store_uuid':actions?.getStoreUUID(),
                'store_file_uuids': Array.from(selected).length>0 ? Array.from(selected) : [targetFile?.uuid],
                
            }).then(res=>{
                setItems(items?.filter(i=>i?.uuid!=targetFile?.uuid || !selected.has(i?.uuid)))
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
            setItems(items?.map(i=>i?.uuid==res?.data?.uuid ? res?.data : i))
            setProcessing(false)
        }).catch(err=>{setProcessing(false)})
    }

    return (
    <div className={styles['fileManager']}>

        <div className={`${styles['spinner']} ${processing?styles['show']:''}`}></div>
        <div className={`${styles['upload-form']} ${showUploadForm?styles['show']:''}`}>
            <div className={styles['public']}>
                <label >資源公開:</label>
                <select
                        value={uploadIsPublic ? "true" : "false"}
                        onChange={(e) => setUploadIsPublic(e.target.value === "true")}
                >
                        <option value="true">公開</option>
                        <option value="false">不公開</option>
                </select>
            </div>
            <div className={styles['actions']}>
                <button type="button" className={styles['cancel']} onClick={()=>{setShowUploadForm(false)}}>取消</button>
                <button type="button" className={styles['confirm']} onClick={()=>{uploadAcceptedFiles()}}>確認</button>
            </div>
        </div>
        <div className={`${styles['update-form']} ${showUpdateForm?styles['show']:''}`}>

            <div className={styles['file-name']}>
                <label >名稱:</label>
                <input
                        value={targetFileClone?.name||''}
                        type='text'
                        onChange={(e) => setTargetFileClone({...targetFileClone, name:e.target.value})}
                />
            </div>
            <div className={styles['file-description']}>
                <label >敘述:</label>
                <input
                        value={targetFileClone?.description||''}
                        type='text'
                        onChange={(e) => setTargetFileClone({...targetFileClone, description:e.target.value})}
                />
            </div>
            <div className={styles['actions']}>
                <button type="button" className={styles['cancel']} onClick={()=>{setShowUpdateForm(false)}}>取消</button>
                <button type="button" className={styles['confirm']} onClick={()=>{setShowUpdateForm(false); updateTargetFile()}}>更新</button>
            </div>
        </div>



        {/* 自訂 Context Menu */}
        {itemContextMenuPos && createPortal(
            <ul
                ref={itemContextMenuRef}
                style={{
                    position: "fixed",
                    top: itemContextMenuPos.y,
                    left: itemContextMenuPos.x,
                    background: "white",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "5px 0",
                    listStyle: "none",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    zIndex: 1000,
                }}
            >
                {
                    !targetFile &&
                    <li
                        style={{ padding: "8px 16px", cursor: "pointer" }}
                        onClick={() => { setItemContextMenuPos(null); createFolder()}}
                    >
                        📂 新增資料夾
                    </li>
                }
                {
                    !targetFile &&
                    <li
                        style={{ padding: "8px 16px", cursor: "pointer" }}
                        onClick={() => { setItemContextMenuPos(null); open()}}
                    >
                        📄 上傳檔案
                    </li>
                }
                {
                    Array.from(selected).length<=0 && targetFile?.is_folder &&
                    <li
                        style={{ padding: "8px 16px", cursor: "pointer" }}
                        onClick={() => {setItemContextMenuPos(null); setPath([...path, targetFile]); savePathToLocalStorage([...path, targetFile])}}
                    >
                        📂 開啟
                    </li>
                }
                {
                    Array.from(selected).length<=0 && targetFile &&
                    <li
                        style={{ padding: "8px 16px", cursor: "pointer" }}
                        onClick={() => {console.log(targetFile); setItemContextMenuPos(null); setTargetFileClone(JSON.parse(JSON.stringify(targetFile))); setShowUpdateForm(true);}}
                    >
                        ✏️ 編輯
                    </li>
                }
                {
                    targetFile &&
                    <li
                        style={{ padding: "8px 16px", cursor: "pointer", color: "red" }}
                        onClick={() => {setItemContextMenuPos(null); deleteStoreFiles()}}
                    >
                        🗑️ 刪除
                    </li>
                }
               
            </ul>
        , document.body)}




        {/* Toolbar */}
        <div className={styles['toolbar']}>
            {/* Search */}
            <div className={styles['searchBox']}>
                <FontAwesomeIcon icon={faMagnifyingGlass} /> 
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="搜尋當前資料夾"

                />
            </div>

            <div className={styles['viewToggle']}>
                 <button
                    
                    onClick={() => setLayout("grid")}
                    title="Grid view"
                >
                    <FontAwesomeIcon icon={faTh} />
                </button>
                <button
                    
                    onClick={() => setLayout("list")}
                    title="List view"
                >
                    <FontAwesomeIcon icon={faList} /> 
                </button>
            </div>
           


            {/* Sort */}
            <div className={styles['sortBox']}>
                <select
                    value={sortKey}
                    onChange={(e) => setSortKey(e.target.value)}
                    title="Sort by"
                >
                    <option value="name">名稱</option>
                    <option value="type">型別</option>
                    <option value="size">大小</option>
                    <option value="is_public">公開</option>
                    <option value="is_folder">資料夾</option>
                    <option value="updated_at">日期</option>
                </select>
                <button
                    onClick={() => setSortOrder((o) => (o === "asc" ? "desc" : "asc"))}
                    title="排序"
                >
                    <FontAwesomeIcon icon={sortOrder === "asc" ? faSortAlphaDown : faSortAlphaUp} /> 
                </button>
            </div>
           
        </div>



        {/* Breadcrumb */}
        <nav className={styles['breadcrumb']}>
            <label>路徑:</label>
            <div >
                <button
                    className={styles['directory']}
                    onClick={() => onBreadcrumbClick(0)}
                    title='根目錄'
                >
                    根目錄
                </button> 
                {path.length>0 && <FontAwesomeIcon icon={faChevronRight} /> }
            </div>

            {
                path.map((p, i) => {
                    const isLast = i === path.length - 1;
                    return (
                        <div key={i} >
                            <button
                                className={styles['directory']}
                                onClick={() => onBreadcrumbClick(i+1)}
                                disabled={isLast}
                                title={p?.name}
                            >
                                {p?.name || p?.uuid}
                            </button>
                            {!isLast && <FontAwesomeIcon icon={faChevronRight} /> }
                        </div>
                    );
                })
            }
        </nav>



 
        <div   {...getRootProps()} 
           >
            <input {...getInputProps()} />


            <div className={`${styles['tableWrapper']} ${isDragActive?styles['dropActive']:''}`} onContextMenu={(e)=>{
                clearSelection(); setTargetFile(null); handleContextMenu(e);
            }}>
                {
                        (sortedItems||[]?.length)<1 &&
                        <div className={styles['empty-file']}>
                            <span >
                                無檔案
                            </span>

                            <div>
                                <span>拖動檔案至此</span>
                                <span>或</span>
                            </div>
                            <button type="button" onClick={open}>
                                點此上傳
                            </button>
                        </div>
                        
                }
                <table className={styles['']}>
                    <thead className={styles['']}>
                        <tr>
                            <th className={styles['']}></th>
                            <th className={styles['']}>名稱</th>
                            <th className={styles['']}>敘述</th>
                            <th className={styles['']}>公開</th>
                            <th className={styles['']}>型別</th>
                            <th className={styles['']}>大小</th>
                            <th className={styles['']}>日期</th>
                            <th className={styles['']}>網址</th>
                        </tr>
                    </thead>

                   
                    <tbody>
                        {sortedItems.map((it, i) => (
                            <tr key={i} className={`${targetFile?.uuid==it?.uuid?styles['focus']:''} ${selected.has(it.uuid)?styles['focus']:''}`} 
                            onContextMenu={(e)=>{ e.stopPropagation(); if(Array.from(selected).length>0 && !selected.has(it?.uuid)){clearSelection()} setTargetFile(it); handleContextMenu(e);}} 
                            onClick={()=>{setTargetFile(it)}}
                            onDoubleClick={(e)=>{if(it?.is_folder){setPath([...path, targetFile]); savePathToLocalStorage([...path, targetFile])}}}
                            >
                                <td className={styles['']}>
                                    <input
                                        type="checkbox"
                                        checked={selected.has(it.uuid)}
                                        onChange={() => toggleSelect(it.uuid)}
                                        aria-label={`Select ${it.name}`}
                                    />
                                </td>
                                <td className={styles['']}>
                                    <button
                                        className={styles['']}
                                        onDoubleClick={() => it.is_folder && onEnterFolder(it.id)}
                                        onClick={() => toggleSelect(it.uuid)}
                                    >
                                        {
                                            it?.is_folder
                                            ?
                                            <span className={styles['']}>
                                                <FontAwesomeIcon icon={faFolder} /> 
                                            </span>
                                            :
                                            <span className={styles['']}>{fileIconByType(it.type)}</span>
                                        }
                                        
                                        <span className={styles['']} title={it.name}>{it.name}</span>
                                    </button>
                                </td>
                                <td className={styles['']}>{it.description||''}</td>
                                <td className={styles['']}>{it.is_public?<FontAwesomeIcon icon={faEye}/>:<FontAwesomeIcon icon={faEyeLowVision}/>}</td>

                                <td className={styles['']}>{it.is_folder ? "資料夾" : (it.type || "未知")}</td>
                                
                                <td className={styles['']}>{it.is_folder ? "-" : formatBytes(it.size)}</td>
                                <td className={styles['']}>{formatDate(it.created_at)}</td>
                                <td className={styles['']}>
                                    {
                                        it?.is_public && !it?.is_folder &&
                                        <button className={styles['']} onClick={()=>{
                                            navigator.clipboard.writeText(it.public_file)
                                        }}>
                                            <FontAwesomeIcon icon={faCopy}/>
                                        </button>
                                    }
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>




        </div>

       



    </div>
  );
}
