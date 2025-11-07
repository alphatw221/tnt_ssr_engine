import PropTypes from "prop-types";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faExclamationTriangle, faHistory } from '@fortawesome/free-solid-svg-icons';
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

const EditEventList = ({
  fetchEventsApi,
  pageSize = 20
}) => {
  // 從Redux讀取狀態
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

  // 載入歷史事件
  const loadEvents = useCallback(async (cursor = null) => {
    if (loading || !hasMore || isLoadingMore.current) return;

    isLoadingMore.current = true;

    dispatch(setEditEventsLoading(true));
    dispatch(setEditEventsError(null));

    try {
      const response = await fetchEventsApi({
        cursor: cursor,
        pageSize: pageSize
      });

      console.log(response.data)

      const newEvents = response.data?.results || response.data || [];

      // 從next URL中提取cursor參數
      let nextCursorValue = null;
      if (response.data?.next) {
        try {
          const nextUrl = new URL(response.data.next);
          nextCursorValue = nextUrl.searchParams.get('cursor');
        } catch (e) {
          console.error('Failed to parse next URL:', e);
        }
      }
      

      // 使用Redux action追加事件
      dispatch(appendEditEvents(newEvents));

      // 如果沒有next_cursor，表示沒有更多數據
      dispatch(setEditEventsHasMore(nextCursorValue !== null && newEvents.length > 0));
      dispatch(setEditEventsNextCursor(nextCursorValue));

    } catch (err) {
      console.error('Failed to load events:', err);
      dispatch(setEditEventsError('載入事件失敗'));
      // 發生錯誤時，停止繼續加載，避免無限重試
      dispatch(setEditEventsHasMore(false));
    } finally {
      dispatch(setEditEventsLoading(false));
      isLoadingMore.current = false;
    }
  }, [loading, hasMore, fetchEventsApi, pageSize, dispatch]);

  // 初始載入
  useEffect(() => {
    if(hasMore && events.length===0){
      loadEvents(null);
    }
  }, [events, hasMore]);

  // 無限滾動實現 - 使用scroll事件
  useEffect(() => {
    const listElement = listRef.current;
    if (!listElement) return;

    const handleScroll = () => {
      // 檢查是否正在加載或沒有更多數據
      if (loading || !hasMore || isLoadingMore.current) return;

      const { scrollTop, scrollHeight, clientHeight } = listElement;

      // 當滾動到距離底部200px時觸發加載
      const threshold = 200;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - threshold;

      if (isNearBottom) {
        console.log('Near bottom, loading more events...');
        console.log(nextCursor)
        loadEvents(nextCursor);
      }
    };

    listElement.addEventListener('scroll', handleScroll);

    return () => {
      listElement.removeEventListener('scroll', handleScroll);
    };
  }, [loading, hasMore, nextCursor, loadEvents]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseDetail = () => {
    setSelectedEvent(null);
  };

  const handleRetry = () => {
    // 重置錯誤狀態並重新加載
    dispatch(setEditEventsError(null));
    dispatch(setEditEventsHasMore(true));
    loadEvents(nextCursor);
  };

  return (
    <div className={style['event-list-container']}>
      <div className={style['event-list-header']}>
        <h2 className={style['header-title']}>
          <FontAwesomeIcon icon={faHistory} />
          編輯歷史
        </h2>
        <div className={style['header-info']}>
          共 {events.length} 條記錄
        </div>
      </div>

      <div className={style['event-list']} ref={listRef}>
        {events.length === 0 && !loading && (
          <div className={style['empty-state']}>
            <FontAwesomeIcon icon={faHistory} className={style['empty-icon']} />
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
            <FontAwesomeIcon icon={faSpinner} spin />
            <span>載入中...</span>
          </div>
        )}

        {error && (
          <div className={style['error-message']}>
            <FontAwesomeIcon icon={faExclamationTriangle} />
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
