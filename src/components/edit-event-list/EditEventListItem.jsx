import PropTypes from "prop-types";
import React, { useState, Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faPencil,
  faTrash,
  faArrowsAlt,
  faChevronRight,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import style from './EditEventListItem.module.scss';
import { EVENT_TYPES, EVENT_TYPE_LABELS, EVENT_TYPE_COLORS } from '@/types/editEvent';

const EditEventListItem = ({ event, onClick }) => {
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
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return '剛剛';
    if (diffMins < 60) return `${diffMins} 分鐘前`;
    if (diffHours < 24) return `${diffHours} 小時前`;
    if (diffDays < 7) return `${diffDays} 天前`;

    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div
      className={style['event-item']}
      onClick={() => onClick?.(event)}
      style={{ '--event-color': EVENT_TYPE_COLORS[event?.action] }}
    >
      <div className={style['event-icon-wrapper']}>
        <FontAwesomeIcon
          icon={getEventIcon(event?.action)}
          className={style['event-icon']}
        />
      </div>

      <div className={style['event-content']}>
        <div className={style['event-header']}>
          <span
            className={style['event-type']}
            style={{ backgroundColor: EVENT_TYPE_COLORS[event?.action] }}
          >
            {EVENT_TYPE_LABELS[event?.action]}
          </span>
          <span className={style['event-time']}>
            {formatTime(event?.created_at)}
          </span>
        </div>

        <div className={style['event-body']}>
          <div className={style['event-editor']}>

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

            <span className={style['editor-name']}>{`${event?.user?.first_name||''}${event?.user?.last_name||''}`}</span>

          </div>

          {
            //target
            <div className={style['event-target']}>


              {
                event?.webpage_uuid &&
                <Fragment>
                  <span className={style['target-type']}>網站</span>
                  <FontAwesomeIcon icon={faChevronRight} className={style['target-separator']} />
                  <span className={style['target-name']}>{event?.updated_data?.name || event?.original_data?.name || '?'}</span>
                </Fragment>
                
              }

              {
                event?.element_uuid &&
                <Fragment>
                  <span className={style['target-type']}>元素</span>
                  <FontAwesomeIcon icon={faChevronRight} className={style['target-separator']} />
                  <span className={style['target-name']}>{event?.updated_data?.name || event?.original_data?.name || '?'}</span>
                </Fragment>
                
              }
              
            </div>

          }

          {
            //changes
            //   event.changes && event.changes.fields && event.changes.fields.length > 0 && (
            //   <div className={style['event-changes']}>
            //     修改了：{event.changes.fields.join(', ')}
            //   </div>
            // )
          }
          

          


        </div>
      </div>
    </div>
  );
};

EditEventListItem.propTypes = {
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
  }).isRequired,
  onClick: PropTypes.func
};

export default EditEventListItem;
