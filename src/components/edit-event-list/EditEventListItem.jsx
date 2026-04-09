import PropTypes from "prop-types";
import { Fragment } from "react";
import style from './EditEventListItem.module.scss';
import { EVENT_TYPES, EVENT_TYPE_LABELS, EVENT_TYPE_COLORS } from '@/types/editEvent';

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const IconPlus = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const IconPencil = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const IconTrash = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" /><path d="M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

const IconMove = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="5 9 2 12 5 15" /><polyline points="9 5 12 2 15 5" />
    <polyline points="15 19 12 22 9 19" /><polyline points="19 9 22 12 19 15" />
    <line x1="2" y1="12" x2="22" y2="12" /><line x1="12" y1="2" x2="12" y2="22" />
  </svg>
);

const IconUser = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconChevronRight = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// ──────────────────────────────────────────────────────────────────────────────

const EditEventListItem = ({ event, onClick }) => {
  const getEventIcon = (type) => {
    switch (type) {
      case EVENT_TYPES.CREATE:
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
        {getEventIcon(event?.action)}
      </div>

      <div className={style['event-content']}>
        <div className={style['event-header']}>
          <span className={style['event-type']}>
            {EVENT_TYPE_LABELS[event?.action]}
          </span>
          <span className={style['event-time']}>
            {formatTime(event?.created_at)}
          </span>
        </div>

        <div className={style['event-body']}>
          <div className={style['event-editor']}>
            <span className={style['editor-name']}>{`${event?.user?.first_name || ''}${event?.user?.last_name || ''}`}</span>
          </div>

          <div className={style['event-target']}>
            {event?.webpage_uuid && (
              <Fragment>
                <span className={style['target-type']}>網站</span>
                <IconChevronRight />
                <span className={style['target-name']}>{event?.updated_data?.name || event?.original_data?.name || '?'}</span>
              </Fragment>
            )}
            {event?.element_uuid && (
              <Fragment>
                <span className={style['target-type']}>元素</span>
                <IconChevronRight />
                <span className={style['target-name']}>{event?.updated_data?.name || event?.original_data?.name || '?'}</span>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

EditEventListItem.propTypes = {
  event: PropTypes.shape({
    uuid: PropTypes.string,
    action: PropTypes.string,
  }),
  onClick: PropTypes.func
};

export default EditEventListItem;
