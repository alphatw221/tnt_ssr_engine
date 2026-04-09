import PropTypes from "prop-types";
import { useState, useEffect, useRef, useCallback } from "react";
import EditEventListItem from './EditEventListItem';
import EditEventDetail from './EditEventDetail';
import style from './EditEventList.module.scss';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  appendEditEvents,
  setEditEventsLoading,
  setEditEventsHasMore,
  setEditEventsNextCursor,
  setEditEventsError
} from '@/redux/slices/editor-memory-slice';

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const IconHistory = () => (
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

const EditEventList = ({
  fetchEventsApi,
  pageSize = 20
}) => {
  const dispatch = useAppDispatch();
  const {
    editEvents: events,
    editEventsLoading: loading,
    editEventsHasMore: hasMore,
    editEventsNextCursor: nextCursor,
    editEventsError: error
  } = useAppSelector((state) => state.editor_memory);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const listRef = useRef(null);
  const isLoadingMore = useRef(false);

  const loadEvents = useCallback(async (cursor = null) => {
    if (loading || !hasMore || isLoadingMore.current) return;

    isLoadingMore.current = true;
    dispatch(setEditEventsLoading(true));
    dispatch(setEditEventsError(null));

    try {
      const response = await fetchEventsApi({ cursor, pageSize });

      console.log(response.data);

      const newEvents = response.data?.results || response.data || [];

      let nextCursorValue = null;
      if (response.data?.next) {
        try {
          const nextUrl = new URL(response.data.next);
          nextCursorValue = nextUrl.searchParams.get('cursor');
        } catch (e) {
          console.error('Failed to parse next URL:', e);
        }
      }

      dispatch(appendEditEvents(newEvents));
      dispatch(setEditEventsHasMore(nextCursorValue !== null && newEvents.length > 0));
      dispatch(setEditEventsNextCursor(nextCursorValue));

    } catch (err) {
      console.error('Failed to load events:', err);
      dispatch(setEditEventsError('載入事件失敗'));
      dispatch(setEditEventsHasMore(false));
    } finally {
      dispatch(setEditEventsLoading(false));
      isLoadingMore.current = false;
    }
  }, [loading, hasMore, fetchEventsApi, pageSize, dispatch]);

  useEffect(() => {
    if (hasMore && events.length === 0) {
      loadEvents(null);
    }
  }, [events, hasMore]);

  useEffect(() => {
    const listElement = listRef.current;
    if (!listElement) return;

    const handleScroll = () => {
      if (loading || !hasMore || isLoadingMore.current) return;
      const { scrollTop, scrollHeight, clientHeight } = listElement;
      if (scrollTop + clientHeight >= scrollHeight - 200) {
        loadEvents(nextCursor);
      }
    };

    listElement.addEventListener('scroll', handleScroll);
    return () => listElement.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore, nextCursor, loadEvents]);

  const handleEventClick = (event) => setSelectedEvent(event);
  const handleCloseDetail = () => setSelectedEvent(null);

  const handleRetry = () => {
    dispatch(setEditEventsError(null));
    dispatch(setEditEventsHasMore(true));
    loadEvents(nextCursor);
  };

  return (
    <div className={style['event-list-container']}>
      <div className={style['event-list-header']}>
        <h2 className={style['header-title']}>
          <IconHistory />
          編輯歷史
        </h2>
        <div className={style['header-info']}>
          共 {events.length} 條記錄
        </div>
      </div>

      <div className={style['event-list']} ref={listRef}>
        {events.length === 0 && !loading && (
          <div className={style['empty-state']}>
            <div className={style['empty-icon']}>
              <IconHistory />
            </div>
            <p>尚無編輯記錄</p>
          </div>
        )}

        {events.map((event) => (
          <EditEventListItem
            key={event.id}
            event={event}
            onClick={handleEventClick}
          />
        ))}

        {loading && (
          <div className={style['loading-indicator']}>
            <IconSpinner />
            <span>載入中...</span>
          </div>
        )}

        {error && (
          <div className={style['error-message']}>
            <IconWarning />
            <span>{error}</span>
            <button onClick={handleRetry} className={style['retry-button']}>
              重試
            </button>
          </div>
        )}

        {!hasMore && events.length > 0 && (
          <div className={style['end-message']}>
            已載入所有歷史記錄
          </div>
        )}
      </div>

      {selectedEvent && (
        <EditEventDetail
          event={selectedEvent}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
};

EditEventList.propTypes = {
  fetchEventsApi: PropTypes.func.isRequired,
  pageSize: PropTypes.number
};

export default EditEventList;
