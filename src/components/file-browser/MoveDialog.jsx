import React, { useState, useEffect, useRef } from "react";
import styles from "./FileBrowser.module.scss";
import { Icons, FolderIcon } from "./Icons.jsx";
import { user_search_store_file } from "@/api/store_file.js"
import Dialog from "./Dialog.jsx";


// 移動檔案用的資料夾選擇器 (類似 google drive 的「移動」)
// 點資料夾 = 進入該資料夾，按「移到這裡」= 移到目前所在的資料夾
export default function MoveDialog({actions, movingItems, currentPath, onCancel, onConfirm}) {
    const [pickerPath, setPickerPath] = useState(currentPath||[]);
    const [folders, setFolders] = useState([]);
    const [nextCursor, setNextCursor] = useState(null);
    const [loading, setLoading] = useState(false);
    const requestIdRef = useRef(0);

    const movingUUIDs = new Set((movingItems||[]).map(i=>i?.uuid))
    const currentFolderUUID = currentPath?.[currentPath.length-1]?.uuid||null
    const pickerFolderUUID = pickerPath?.[pickerPath.length-1]?.uuid||null

    const getCursorFromNext = (next)=>{
        if(!next) return null
        try{
            return new URL(next, window.location.origin).searchParams.get('cursor')
        }catch(e){
            return next
        }
    }

    const fetchFolders = (cursor)=>{
        const requestId = ++requestIdRef.current
        setLoading(true)
        user_search_store_file({
            'store_uuid':actions?.getStoreUUID(),
            'store_file_uuid':pickerFolderUUID||'',
            'keyword':'',
            'page_size':50,
            'cursor':cursor||'',
            'is_folder':true,
            'order_by':'name',
        }).then(res=>{
            if(requestId !== requestIdRef.current) return
            const results = res.data?.results||[]
            setFolders(prev=>cursor ? [...prev, ...results] : results)
            setNextCursor(getCursorFromNext(res.data?.next))
        }).catch(err=>{
            if(requestId !== requestIdRef.current) return
            setNextCursor(null)
            // 資料夾已被刪除 → 回到根目錄，其餘錯誤照一般方式提示
            if(pickerFolderUUID && err?.response?.data?.message==='folder_not_found'){
                setPickerPath([])
            }else{
                alert('錯誤')
            }
        }).finally(()=>{
            if(requestId === requestIdRef.current) setLoading(false)
        })
    }

    useEffect(()=>{
        setFolders([])
        setNextCursor(null)
        fetchFolders('')
    },[pickerFolderUUID])

    // 移到原本所在的資料夾等於沒動
    const canMoveHere = !loading && pickerFolderUUID !== currentFolderUUID

    const pickerFolderName = pickerPath?.[pickerPath.length-1]?.name || '根目錄'

    return (
        <Dialog
            title={`移動${movingItems?.length===1 ? `「${movingItems[0]?.name}」` : ` ${movingItems?.length} 個項目`}`}
            onClose={onCancel}
            width={520}
            footer={
                <>
                    <span className={styles['dialog-footer-hint']}>
                        {pickerFolderUUID === currentFolderUUID ? '項目已在此資料夾' : `移到「${pickerFolderName}」`}
                    </span>
                    <button type="button" className={`${styles['btn']} ${styles['btn-secondary']}`} onClick={onCancel}>取消</button>
                    <button type="button" className={`${styles['btn']} ${styles['btn-primary']}`} disabled={!canMoveHere} onClick={()=>onConfirm(pickerPath?.[pickerPath.length-1]||null)}>
                        移到這裡
                    </button>
                </>
            }
        >
            <nav className={styles['breadcrumb']}>
                <button
                    type="button"
                    className={styles['crumb']}
                    onClick={()=>setPickerPath([])}
                    disabled={pickerPath.length===0}
                >
                    <Icons.Home />
                    <span>根目錄</span>
                </button>
                {
                    pickerPath.map((p, i)=>(
                        <React.Fragment key={p?.uuid}>
                            <Icons.ChevronRight className={styles['crumb-separator']} />
                            <button
                                type="button"
                                className={styles['crumb']}
                                onClick={()=>setPickerPath(pickerPath.slice(0, i+1))}
                                disabled={i===pickerPath.length-1}
                                title={p?.name}
                            >
                                <span>{p?.name || p?.uuid}</span>
                            </button>
                        </React.Fragment>
                    ))
                }
            </nav>

            <ul className={styles['folder-picker']}>
                {
                    folders.map(f=>{
                        // 不能移到自己 (或自己的子資料夾) 底下，所以不能點進去
                        const disabled = movingUUIDs.has(f?.uuid)
                        return (
                            <li key={f?.uuid}>
                                <button
                                    type="button"
                                    disabled={disabled}
                                    onClick={()=>setPickerPath([...pickerPath, f])}
                                    title={disabled ? '無法移到自己底下' : f?.name}
                                >
                                    <span className={`${styles['file-icon']} ${styles['tone-folder']}`}><FolderIcon /></span>
                                    <span className={styles['folder-picker-name']}>{f?.name}</span>
                                    {disabled ? <span className={styles['folder-picker-tag']}>移動中</span> : <Icons.ChevronRight className={styles['folder-picker-arrow']} />}
                                </button>
                            </li>
                        )
                    })
                }
                {
                    !loading && folders.length===0 &&
                    <li className={styles['folder-picker-empty']}>沒有子資料夾</li>
                }
                {
                    loading && <li className={styles['folder-picker-empty']}>載入中…</li>
                }
                {
                    !loading && nextCursor &&
                    <li>
                        <button type="button" className={styles['folder-picker-more']} onClick={()=>fetchFolders(nextCursor)}>
                            載入更多
                        </button>
                    </li>
                }
            </ul>
        </Dialog>
    );
}
