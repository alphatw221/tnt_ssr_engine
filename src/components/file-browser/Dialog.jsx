import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./FileBrowser.module.scss";
import { Icons } from "./Icons.jsx";


// 檔案管理共用的對話框：portal 到 body (外層 modal 有 transform，fixed 會跑掉)，Esc / 點背景關閉
export default function Dialog({title, onClose, footer, children, width=480}) {

    useEffect(()=>{
        const onKeyDown = (e)=>{ if(e.key==='Escape') onClose?.() }
        document.addEventListener('keydown', onKeyDown)
        return ()=>document.removeEventListener('keydown', onKeyDown)
    },[onClose])

    return createPortal(
        <div className={styles['dialog-backdrop']} onMouseDown={(e)=>{ if(e.target===e.currentTarget) onClose?.() }}>
            <div className={styles['dialog']} style={{width: `min(${width}px, calc(100vw - 32px))`}} role="dialog" aria-modal="true" onClick={(e)=>e.stopPropagation()}>
                <div className={styles['dialog-header']}>
                    <h3 title={typeof title==='string' ? title : undefined}>{title}</h3>
                    <button type="button" className={styles['icon-button']} onClick={onClose} aria-label="關閉">
                        <Icons.Close />
                    </button>
                </div>
                <div className={styles['dialog-body']}>
                    {children}
                </div>
                {footer && <div className={styles['dialog-footer']}>{footer}</div>}
            </div>
        </div>
    , document.body);
}
