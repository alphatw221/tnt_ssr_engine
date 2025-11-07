import PropTypes from "prop-types";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faPencil,
  faTrash,
  faArrowsAlt,
  faUser,
  faTimes,
  faCode
} from '@fortawesome/free-solid-svg-icons';
import style from './EditEventDetail.module.scss';
import { EVENT_TYPES, EVENT_TYPE_LABELS, EVENT_TYPE_COLORS } from '@/types/editEvent';

const EditEventDetail = ({ event, onClose }) => {
  if (!event) return null;

  const getEventIcon = (type) => {
    switch (type) {
      case EVENT_TYPES.CREATE:
        return faPlus;
      case EVENT_TYPES.UPDATE:
        return faPencil;
      case EVENT_TYPES.DELETE:
        return faTrash;
      case EVENT_TYPES.MOVE:
        return faArrowsAlt;
      default:
        return faUser;
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
          <FontAwesomeIcon icon={faCode} />
          {label}
        </h4>
        <pre className={style['json-content']}>
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    );
  };

  const renderChanges = () => {
    // if (!event?.changes) return null;

    // const { before, after, fields } = event?.changes;

    return (
      <div className={style['changes-section']}>
        <h3 className={style['section-title']}>變更內容</h3>

        {
          // fields && fields.length > 0 && (
          //   <div className={style['changed-fields']}>
          //     <strong>修改的欄位：</strong>
          //     <div className={style['field-tags']}>
          //       {fields.map((field, index) => (
          //         <span key={index} className={style['field-tag']}>
          //           {field}
          //         </span>
          //       ))}
          //     </div>
          //   </div>
          // )
        }
        {
          event?.action === EVENT_TYPES.UPDATE &&
          <div className={style['changes-content']}>
            <div className={style['change-column']}>
              {renderJsonData(event?.original_data, '變更前')}
            </div>
            <div className={style['change-column']}>
              {renderJsonData(event?.updated_data, '變更後')}
            </div>
          </div>
        }


        {
          [EVENT_TYPES.MOVE, EVENT_TYPES.MIRROR].includes(event?.action) &&
          <div className={style['changes-content']}>
            <div className={style['change-column']}>
              {renderJsonData(event?.original_data, '原始資料')}
              {renderJsonData(event?.original_element_relation_uuid, '變更前關聯uuid')}
            </div>
            <div className={style['change-column']}>
              {renderJsonData(event?.updated_element_relation_uuid, '變更後關聯uuid')}
            </div>
          </div>
        }


        {
          [EVENT_TYPES.CREATE, EVENT_TYPES.CLONE].includes(event?.action) &&
          <div className={style['changes-content']}>
            <div className={style['change-column']}>
              {renderJsonData(event?.original_data, '創建資料')}
              {renderJsonData(event?.original_element_relation_uuid, '關聯uuid')}
            </div>
          </div>
        }

        {
          event?.action === EVENT_TYPES.DELETE_RELATION &&
          <div className={style['changes-content']}>
            <div className={style['change-column']}>
              {renderJsonData(event?.original_element_relation_uuid, '關聯uuid')}
            </div>
          </div>
        }

        {
          event?.action === EVENT_TYPES.DELETE &&
          <div className={style['changes-content']}>
            <div className={style['change-column']}>
              {renderJsonData(event?.original_data, '原始資料')}
            </div>
          </div>
        }

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
              <FontAwesomeIcon
                icon={getEventIcon(event?.action)}
                className={style['event-icon']}
              />
            </div>
            <div className={style['header-info']}>
              <h2 className={style['event-title']}>
                <span
                  className={style['event-type']}
                  style={{ backgroundColor: EVENT_TYPE_COLORS[event?.action] }}
                >
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
            <FontAwesomeIcon icon={faTimes} />
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
                {
                  // event?.user?.avatar ? (
                  //   <img
                  //     src={event?.user?.avatar}
                  //     alt={event?.user?.name}
                  //     className={style['editor-avatar']}
                  //   />
                  // ) : (
                  //   <div className={style['editor-avatar-placeholder']}>
                  //     <FontAwesomeIcon icon={faUser} />
                  //   </div>
                  // )
                }
                <span className={style['editor-name']}>{event?.user?.first_name} {event?.user?.last_name}</span>
                {/* <span className={style['editor-id']}>({event?.user?.id})</span> */}
              </div>
            </div>

            <div className={style['info-row']}>
              <span className={style['info-label']}>目標類型：</span>
              {
                event?.webpage_uuid && <span className={style['target-type']}>網頁</span>
              }
              {
                event?.element_uuid && <span className={style['target-type']}>元素</span>
              }
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

          {
            renderChanges()
          }

          {
            // event?.metadata && (
            //   <div className={style['metadata-section']}>
            //     <h3 className={style['section-title']}>額外資訊</h3>
            //     {renderJsonData(event?.metadata, '元數據')}
            //   </div>
            // )
          }


        </div>
      </div>
    </div>
  );
};

EditEventDetail.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(Object.values(EVENT_TYPES)).isRequired,
    timestamp: PropTypes.number.isRequired,
    editor: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string
    }).isRequired,
    target: PropTypes.shape({
      type: PropTypes.string.isRequired,
      uuid: PropTypes.string.isRequired,
      name: PropTypes.string
    }).isRequired,
    changes: PropTypes.shape({
      before: PropTypes.any,
      after: PropTypes.any,
      fields: PropTypes.arrayOf(PropTypes.string)
    }),
    metadata: PropTypes.any
  }),
  onClose: PropTypes.func.isRequired
};

export default EditEventDetail;
