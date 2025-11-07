# EditEventList Redux集成指南

## 概述

EditEventList組件已改為使用Redux進行狀態管理，所有編輯事件數據存儲在`editor_memory` slice中。Socket.io連接需要在你的WebsiteEditor組件中進行管理。

## 快速集成步驟

### 1. 在WebsiteEditor中監聽Socket事件

```javascript
// WebsiteEditor.jsx
import { useAppDispatch } from '@/redux/hooks';
import { addNewEditEvent } from '@/redux/slices/editor-memory-slice';
import { initSocketConnection } from '@/lib/utils/socket';

function WebsiteEditor() {
  const dispatch = useAppDispatch();
  const storeUuid = "your-store-uuid";

  useEffect(() => {
    // 初始化你現有的Socket連接
    const socket = initSocketConnection('website_editor', storeUuid);

    socket.on('connect', () => {
      console.log('Socket connected');
    });

    // 監聽新的編輯事件並dispatch到Redux
    socket.on('new_edit_event', (event) => {
      console.log('Received new edit event:', event);
      dispatch(addNewEditEvent(event));
    });

    return () => {
      socket.off('new_edit_event');
      socket.disconnect();
    };
  }, [dispatch, storeUuid]);

  return (
    <div>
      {/* 你的編輯器UI */}
    </div>
  );
}
```

### 2. 使用EditEventList組件

```javascript
import { EditEventList } from '@/components/edit-event-list';
import { user_list_website_events } from '@/api/website_edit_event';

// 在你的WebsiteEditor或任何組件中
<EditEventList
  fetchEventsApi={user_list_website_events}
  pageSize={20}
/>
```

## Redux State結構

```javascript
{
  editor_memory: {
    // ... 其他state

    // Edit Events相關
    editEvents: [],              // 事件列表
    editEventsLoading: false,    // 載入狀態
    editEventsHasMore: true,     // 是否有更多數據
    editEventsNextCursor: null,  // 下一頁cursor
    editEventsError: null        // 錯誤信息
  }
}
```

## 可用的Redux Actions

```javascript
import {
  addNewEditEvent,        // 添加新事件（Socket推送時使用）
  setEditEvents,          // 設置事件列表
  appendEditEvents,       // 追加事件（分頁加載時使用）
  setEditEventsLoading,   // 設置載入狀態
  setEditEventsHasMore,   // 設置是否有更多數據
  setEditEventsNextCursor,// 設置下一頁cursor
  setEditEventsError,     // 設置錯誤
  clearEditEvents         // 清空事件列表
} from '@/redux/slices/editor-memory-slice';
```

## 組件Props

| Prop | 類型 | 必填 | 默認值 | 說明 |
|------|------|------|--------|------|
| `fetchEventsApi` | function | 是 | - | 獲取歷史事件的API函數 |
| `pageSize` | number | 否 | 20 | 每頁載入的事件數量 |

## API要求

API函數需要支持cursor-based pagination：

```javascript
// 請求參數
{
  cursor: string | null,  // null表示第一頁
  pageSize: number
}

// 返回格式
{
  data: {
    results: [...],           // 事件數組
    next_cursor: string | null // null表示沒有更多數據
  }
}

// 或向後兼容的簡化格式
{
  data: [...]  // 事件數組
}
```

## 後端Socket事件格式

```javascript
socket.to(room).emit('new_edit_event', {
  id: "event-uuid-123",
  type: "create" | "update" | "delete" | "move",
  timestamp: 1234567890,
  editor: {
    id: "user-uuid",
    name: "編輯者名稱",
    avatar: "https://..." // 可選
  },
  target: {
    type: "element" | "webpage" | "section" | "node",
    uuid: "target-uuid",
    name: "目標名稱"
  },
  changes: {  // 僅update類型需要
    before: {...},
    after: {...},
    fields: ["field1", "field2"]
  },
  metadata: {...}  // 可選
});
```

## 完整集成示例

```javascript
import React, { useEffect } from 'react';
import { EditEventList } from '@/components/edit-event-list';
import { user_list_website_events } from '@/api/website_edit_event';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addNewEditEvent, clearEditEvents } from '@/redux/slices/editor-memory-slice';
import { initSocketConnection } from '@/lib/utils/socket';

function WebsiteEditor() {
  const dispatch = useAppDispatch();
  const storeUuid = useAppSelector((state) => state.estore?.uuid);

  useEffect(() => {
    if (!storeUuid) return;

    // 清空舊的事件
    dispatch(clearEditEvents());

    // 初始化Socket連接
    const socket = initSocketConnection('website_editor', storeUuid);

    socket.on('connect', () => {
      console.log('Website editor socket connected');
    });

    // 監聽新的編輯事件
    socket.on('new_edit_event', (event) => {
      console.log('Received new edit event:', event);
      dispatch(addNewEditEvent(event));
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    return () => {
      socket.off('new_edit_event');
      socket.disconnect();
    };
  }, [dispatch, storeUuid]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* 編輯器主區域 */}
      <div style={{ flex: 1 }}>
        {/* 你的編輯器內容 */}
      </div>

      {/* 編輯歷史側邊欄 */}
      <div style={{ width: '400px', borderLeft: '1px solid #e5e7eb' }}>
        <EditEventList
          fetchEventsApi={user_list_website_events}
          pageSize={20}
        />
      </div>
    </div>
  );
}

export default WebsiteEditor;
```

## 注意事項

1. **統一的Socket管理**：所有Socket事件都應在WebsiteEditor組件中統一管理
2. **Redux依賴**：確保Redux store已正確配置
3. **清理狀態**：切換商店或退出編輯器時，使用`clearEditEvents()`清空狀態
4. **自動去重**：`addNewEditEvent`會自動檢查事件是否已存在
5. **cursor分頁**：使用cursor而非offset，更適合實時數據流

## 遷移檢查清單

- [ ] 在WebsiteEditor中添加Socket監聽
- [ ] 監聽`new_edit_event`事件並dispatch到Redux
- [ ] 移除EditEventList的namespace和storeUuid props
- [ ] 確保API支持cursor-based pagination
- [ ] 測試實時推送功能
- [ ] 測試無限滾動加載
- [ ] 測試事件詳情查看
