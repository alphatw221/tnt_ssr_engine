import PropTypes from "prop-types";
import { useState } from "react";
import style from './EditEventDetail.module.scss';
import { EVENT_TYPES, EVENT_TYPE_LABELS, EVENT_TYPE_COLORS } from '@/types/editEvent';
import { useAppDispatch } from '@/redux/hooks';
import { updateEditEvent } from '@/redux/slices/editor-memory-slice';
import { user_undo_website_edit_event } from '@/api/website_edit_event';

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const IconPlus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const IconPencil = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const IconTrash = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" /><path d="M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

const IconMove = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="5 9 2 12 5 15" /><polyline points="9 5 12 2 15 5" />
    <polyline points="15 19 12 22 9 19" /><polyline points="19 9 22 12 19 15" />
    <line x1="2" y1="12" x2="22" y2="12" /><line x1="12" y1="2" x2="12" y2="22" />
  </svg>
);

const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconCode = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);

const IconUndo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 1 0 .49-3.51" />
  </svg>
);

const IconSpinner = () => (
  <svg className={style['spin']} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

const IconWarning = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

// ──────────────────────────────────────────────────────────────────────────────

const EditEventDetail = ({ event, onClose }) => {
  if (!event) return null;

  const dispatch = useAppDispatch();
  const [undoLoading, setUndoLoading] = useState(false);
  const [undoConflict, setUndoConflict] = useState(false);
  const [localUndone, setLocalUndone] = useState(event.undone);

  const getEventIcon = (type) => {
    switch (type) {
      case EVENT_TYPES.CREATE:  return <IconPlus />;
      case EVENT_TYPES.CLONE:   return <IconPlus />;
      case EVENT_TYPES.UPDATE:  return <IconPencil />;
      case EVENT_TYPES.DELETE:
      case EVENT_TYPES.DELETE_RELATION: return <IconTrash />;
      case EVENT_TYPES.MOVE:
      case EVENT_TYPES.MIRROR:  return <IconMove />;
      default:                  return <IconUser />;
    }
  };

  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const renderJsonData = (data, label) => {
    if (!data) return null;
    return (
      <div className={style['json-section']}>
        <h4 className={style['json-label']}>
          <IconCode />
          {label}
        </h4>
        <pre className={style['json-content']}>
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    );
  };

  const renderInnerHTMLData = (html, label) => {
    if (!html) return null;
    return (
      <div className={style['json-section']}>
        <h4 className={style['json-label']}>
          <IconCode />
          {label}
        </h4>
        <pre className={style['json-content']}>
          {html}
        </pre>
      </div>
    );
  };

  const renderChanges = () => {
    return (
      <div className={style['changes-section']}>
        <h3 className={style['section-title']}>變更內容</h3>

        {event?.action === EVENT_TYPES.UPDATE && (
          <div className={style['changes-content']}>
            <div className={style['change-column']}>
              {renderJsonData(event?.original_data, '變更前')}
              {renderInnerHTMLData(event?.original_data?.inner_html, '變更前 innerHTML')}
            </div>
            <div className={style['change-column']}>
              {renderJsonData(event?.updated_data, '變更後')}
              {renderInnerHTMLData(event?.updated_data?.inner_html, '變更後 innerHTML')}
            </div>
          </div>
        )}

        {[EVENT_TYPES.MOVE, EVENT_TYPES.MIRROR].includes(event?.action) && (
          <div className={style['changes-content']}>
            <div className={style['change-column']}>
              {renderJsonData(event?.original_data, '原始資料')}
              {renderJsonData(event?.original_element_relation_uuid, '變更前關聯uuid')}
            </div>
            <div className={style['change-column']}>
              {renderJsonData(event?.updated_element_relation_uuid, '變更後關聯uuid')}
            </div>
          </div>
        )}

        {[EVENT_TYPES.CREATE, EVENT_TYPES.CLONE].includes(event?.action) && (
          <div className={style['changes-content']}>
            <div className={style['change-column']}>
              {renderJsonData(event?.original_data, '創建資料')}
              {renderJsonData(event?.original_element_relation_uuid, '關聯uuid')}
            </div>
          </div>
        )}

        {event?.action === EVENT_TYPES.DELETE_RELATION && (
          <div className={style['changes-content']}>
            <div className={style['change-column']}>
              {renderJsonData(event?.original_element_relation_uuid, '關聯uuid')}
            </div>
          </div>
        )}

        {event?.action === EVENT_TYPES.DELETE && (
          <div className={style['changes-content']}>
            <div className={style['change-column']}>
              {renderJsonData(event?.original_data, '原始資料')}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={style['detail-overlay']} onClick={onClose}>
      <div
        className={style['detail-container']}
        onClick={(e) => e.stopPropagation()}
        style={{ '--event-color': EVENT_TYPE_COLORS[event?.action] }}
      >
        <div className={style['detail-header']}>
          <div className={style['header-left']}>
            <div className={style['event-icon-wrapper']}>
              {getEventIcon(event?.action)}
            </div>
            <div className={style['header-info']}>
              <h2 className={style['event-title']}>
                <span className={style['event-type']}>
                  {EVENT_TYPE_LABELS[event?.action]}
                </span>
                事件詳情
              </h2>
              <div className={style['event-time']}>
                {formatTime(event?.created_at)}
              </div>
            </div>
          </div>
          <button className={style['close-button']} onClick={onClose}>
            <IconClose />
          </button>
        </div>

        <div className={style['detail-body']}>
          <div className={style['info-section']}>
            <h3 className={style['section-title']}>基本資訊</h3>

            <div className={style['info-row']}>
              <span className={style['info-label']}>事件UUID：</span>
              <span className={style['info-value']}>{event?.uuid}</span>
            </div>

            <div className={style['info-row']}>
              <span className={style['info-label']}>編輯者：</span>
              <div className={style['editor-info']}>
                <span className={style['editor-name']}>{event?.user?.first_name} {event?.user?.last_name}</span>
              </div>
            </div>

            <div className={style['info-row']}>
              <span className={style['info-label']}>目標類型：</span>
              {event?.webpage_uuid && <span className={style['target-type']}>網頁</span>}
              {event?.element_uuid && <span className={style['target-type']}>元素</span>}
            </div>

            <div className={style['info-row']}>
              <span className={style['info-label']}>目標名稱：</span>
              <span className={style['info-value']}>{event?.updated_data?.name || event?.original_data?.name || '?'}</span>
            </div>

            <div className={style['info-row']}>
              <span className={style['info-label']}>目標UUID：</span>
              <span className={style['info-value']}>{event?.updated_data?.uuid || event?.original_data?.uuid || '?'}</span>
            </div>
          </div>

          {renderChanges()}

          <div className={style['undo-section']}>
            <h3 className={style['section-title']}>操作</h3>

            {undoConflict && (
              <div className={style['undo-conflict']}>
                <IconWarning />
                <span>此操作與其他事件存在依賴衝突，請先復原依賴。</span>
              </div>
            )}

            <button
              className={style['undo-button']}
              disabled={localUndone || undoLoading}
              onClick={async () => {
                setUndoConflict(false);
                setUndoLoading(true);
                try {
                  await user_undo_website_edit_event(event.uuid);
                  setLocalUndone(true);
                  dispatch(updateEditEvent({ uuid: event.uuid, changes: { undone: true } }));
                } catch (err) {
                  if (err?.response?.status === 409) {
                    setUndoConflict(true);
                  }
                } finally {
                  setUndoLoading(false);
                }
              }}
            >
              {undoLoading ? (
                <>
                  <IconSpinner />
                  <span>處理中...</span>
                </>
              ) : (
                <>
                  <IconUndo />
                  <span>{localUndone ? '已復原' : '復原此操作'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

EditEventDetail.propTypes = {
  event: PropTypes.shape({
    uuid: PropTypes.string,
    undone: PropTypes.bool,
  }),
  onClose: PropTypes.func.isRequired,
};

export default EditEventDetail;
