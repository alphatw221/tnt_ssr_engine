
import style from './MyModal.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createPortal } from 'react-dom';


function MyModal({ isOpen, onClose, title, placement, children }) {


  const [_placement, setPlacement] = useState(placement||'right')
  useEffect(() => {

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }


    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);


  if (!isOpen )return null
  

  const handleClickBackground = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  

  const modal = (
    <div className={`${style["modal-backdrop"]}`} onClick={handleClickBackground}>
      <div className={`${style["modal-content"]} ${style?.[_placement||'center-full']}`}>
        <div className={`${style["top-right"]}`}>
          {
            _placement=='center-full' ?
            <button className={`${style["modal-right"]}`} onClick={()=>{setPlacement(placement||'right')}}>
              最小化
            </button>
            :
            <button className={`${style["modal-full"]}`} onClick={()=>{setPlacement('center-full')}}>
              最大化
            </button>
          }
          <button className={`${style["modal-close"]}`} onClick={handleClickBackground}>
            &times;
          </button>
        </div>
        
        {title && <h2 className={`${style["modal-title"]}`}>{title}</h2>}
        <div className={`${style["modal-body"]}`}>{children}</div>
      </div>
    </div>
  );


  return createPortal(modal, document.body);
  

}

export default MyModal;