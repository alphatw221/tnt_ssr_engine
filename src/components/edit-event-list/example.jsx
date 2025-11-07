// EditEventList 使用示例

import React, { useEffect } from 'react';
import { EditEventList } from '@/components/edit-event-list';
import { user_list_website_events } from '@/api/website_edit_event';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addNewEditEvent } from '@/redux/slices/editor-memory-slice';
import { initSocketConnection } from '@/lib/utils/socket';

// 示例1：基本使用（在WebsiteEditor中）
export function BasicExample() {
  const dispatch = useAppDispatch();
  const storeUuid = "your-store-uuid-here";

  useEffect(() => {
    const socket = initSocketConnection('website_editor', storeUuid);

    socket.on('new_edit_event', (event) => {
      dispatch(addNewEditEvent(event));
    });

    return () => {
      socket.off('new_edit_event');
    };
  }, [dispatch, storeUuid]);

  return (
    <div style={{ height: '100vh' }}>
      <EditEventList
        fetchEventsApi={user_list_website_events}
      />
    </div>
  );
}

// 示例2：集成Redux狀態
export function ReduxExample() {
  const dispatch = useAppDispatch();
  const storeUuid = useAppSelector((state) => state.store?.currentStoreUuid);

  useEffect(() => {
    if (!storeUuid) return;

    const socket = initSocketConnection('website_editor', storeUuid);

    socket.on('new_edit_event', (event) => {
      dispatch(addNewEditEvent(event));
    });

    return () => {
      socket.off('new_edit_event');
    };
  }, [dispatch, storeUuid]);

  if (!storeUuid) {
    return <div>請先選擇一個商店</div>;
  }

  return (
    <div style={{ height: '100vh', padding: '20px' }}>
      <EditEventList
        fetchEventsApi={user_list_website_events}
        pageSize={30}
      />
    </div>
  );
}

// 示例3：作為側邊欄
export function SidebarExample() {
  const dispatch = useAppDispatch();
  const storeUuid = useAppSelector((state) => state.store?.currentStoreUuid);

  useEffect(() => {
    if (!storeUuid) return;

    const socket = initSocketConnection('website_editor', storeUuid);

    socket.on('new_edit_event', (event) => {
      dispatch(addNewEditEvent(event));
    });

    return () => {
      socket.off('new_edit_event');
    };
  }, [dispatch, storeUuid]);

  return (
    <div style={{
      position: 'fixed',
      right: 0,
      top: 0,
      width: '400px',
      height: '100vh',
      boxShadow: '-2px 0 8px rgba(0,0,0,0.1)',
      zIndex: 1000
    }}>
      <EditEventList
        fetchEventsApi={user_list_website_events}
        pageSize={20}
      />
    </div>
  );
}

// 示例4：模擬數據（用於測試）- 使用cursor分頁
export function MockDataExample() {
  const totalEvents = 100; // 模擬總共100條記錄

  const mockFetchEvents = async ({ cursor, pageSize }) => {
    // 模擬API延遲
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 解析cursor（第一次為null）
    const startIndex = cursor ? parseInt(cursor) : 0;
    const endIndex = Math.min(startIndex + pageSize, totalEvents);

    // 生成模擬數據
    const events = Array.from({ length: endIndex - startIndex }, (_, i) => {
      const index = startIndex + i;
      return {
        id: `event-${index}`,
        type: ['create', 'update', 'delete', 'move'][Math.floor(Math.random() * 4)],
        timestamp: Date.now() - index * 60000,
        editor: {
          id: `user-${Math.floor(Math.random() * 5)}`,
          name: ['張三', '李四', '王五', '趙六', '錢七'][Math.floor(Math.random() * 5)],
          avatar: null
        },
        target: {
          type: ['element', 'webpage', 'section', 'node'][Math.floor(Math.random() * 4)],
          uuid: `target-${Math.random().toString(36).substring(2, 11)}`,
          name: `測試目標 ${index}`
        },
        changes: Math.random() > 0.5 ? {
          before: { value: 'old' },
          after: { value: 'new' },
          fields: ['value']
        } : null
      };
    });

    // 計算下一個cursor
    const nextCursor = endIndex < totalEvents ? endIndex.toString() : null;

    return {
      data: {
        results: events,
        next_cursor: nextCursor
      }
    };
  };

  return (
    <div style={{ height: '100vh' }}>
      <EditEventList
        fetchEventsApi={mockFetchEvents}
        pageSize={20}
      />
    </div>
  );
}
