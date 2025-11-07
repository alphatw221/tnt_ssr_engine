# EditEventList 編輯事件列表組件

一個完整的編輯歷史記錄UI系統，支持顯示新增、修改、刪除、移動四種類型的編輯事件，並能實時接收Socket.io推送的新事件。

## 功能特性

- ✅ 顯示四種編輯事件類型：新增、修改、刪除、移動
- ✅ 顯示編輯者信息（頭像、名稱）
- ✅ 無限滾動加載歷史事件
- ✅ Socket.io實時推送新事件
- ✅ 點擊查看事件詳情
- ✅ 響應式設計

## 使用方法

### 基本使用

```jsx
import React, { useEffect } from 'react';
import { EditEventList } from '@/components/edit-event-list';
import { user_list_website_events } from '@/api/website_edit_event';
import { useAppDispatch } from '@/redux/hooks';
import { addNewEditEvent } from '@/redux/slices/editor-memory-slice';

function MyComponent() {
  const dispatch = useAppDispatch();

  // 在你的websiteEditor socket連接中監聽新事件
  useEffect(() => {
    // 假設你已經有socket連接
    socket.on('new_edit_event', (event) => {
      dispatch(addNewEditEvent(event));
    });

    return () => {
      socket.off('new_edit_event');
    };
  }, [dispatch]);

  return (
    <EditEventList
      fetchEventsApi={user_list_website_events}
      pageSize={20}
    />
  );
}

export default MyComponent;
```

### Props

| Prop | 類型 | 必填 | 默認值 | 說明 |
|------|------|------|--------|------|
| `fetchEventsApi` | function | 是 | - | 獲取歷史事件的API函數 |
| `pageSize` | number | 否 | 20 | 每頁載入的事件數量 |

### Redux Integration

此組件使用Redux來管理編輯事件狀態，所有數據存儲在 `editor_memory` slice 中：

```javascript
// Redux State結構
{
  editor_memory: {
    editEvents: [],              // 事件列表
    editEventsLoading: false,    // 載入狀態
    editEventsHasMore: true,     // 是否有更多數據
    editEventsNextCursor: null,  // 下一頁cursor
    editEventsError: null        // 錯誤信息
  }
}
```

### Redux Actions

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

### 事件數據結構

```javascript
{
  id: "event-uuid-123",
  type: "create", // 'create' | 'update' | 'delete' | 'move'
  timestamp: 1699999999999,
  editor: {
    id: "user-uuid-456",
    name: "張三",
    avatar: "https://example.com/avatar.jpg" // 可選
  },
  target: {
    type: "element", // 'element' | 'webpage' | 'section' | 'node'
    uuid: "target-uuid-789",
    name: "按鈕元素"
  },
  changes: { // 僅update類型需要
    before: { color: "red" },
    after: { color: "blue" },
    fields: ["color", "size"]
  },
  metadata: {} // 可選，額外信息
}
```

## WebsiteEditor Socket集成

在你的WebsiteEditor組件中監聽Socket.io事件並dispatch到Redux：

```javascript
// 在WebsiteEditor組件中
import { useAppDispatch } from '@/redux/hooks';
import { addNewEditEvent } from '@/redux/slices/editor-memory-slice';

function WebsiteEditor() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // 你現有的socket連接
    const socket = initSocketConnection('website_editor', storeUuid);

    // 監聽編輯事件
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
      <EditEventList fetchEventsApi={user_list_website_events} />
    </div>
  );
}
```

### 後端Socket.io事件格式

```javascript
// 當有新的編輯事件發生時，後端推送：
socket.to(room).emit('new_edit_event', {
  id: "event-uuid-123",
  type: "update",
  timestamp: Date.now(),
  editor: {
    id: userId,
    name: userName,
    avatar: userAvatar
  },
  target: {
    type: "element",
    uuid: elementUuid,
    name: elementName
  },
  changes: {
    before: oldData,
    after: newData,
    fields: changedFields
  }
});
```

## API要求

`fetchEventsApi` 函數需要接收以下參數並返回Promise：

```javascript
async function fetchEventsApi({ cursor, pageSize, storeUuid }) {
  // cursor: null 表示第一頁，之後使用返回的 next_cursor
  // 返回格式：
  // {
  //   data: {
  //     results: [事件數組],
  //     next_cursor: "下一頁的cursor" | null  // null表示沒有更多數據
  //   }
  // }
  // 或簡化格式（向後兼容）：
  // {
  //   data: [事件數組]
  // }
}
```

### Cursor-based Pagination 優勢

- ✅ 避免數據重複或遺漏（即使有新數據插入）
- ✅ 更適合實時數據流
- ✅ 性能更好（不需要計算offset）
- ✅ 支持無限滾動

## 樣式定制

組件使用CSS Modules，可以通過覆蓋以下變量來定制樣式：

```scss
// 在父組件中
.custom-event-list {
  --event-color: #3b82f6; // 動態設置事件顏色
}
```

## 完整示例

```jsx
import React, { useEffect } from 'react';
import { EditEventList } from '@/components/edit-event-list';
import { user_list_website_events } from '@/api/website_edit_event';
import { useAppDispatch } from '@/redux/hooks';
import { addNewEditEvent } from '@/redux/slices/editor-memory-slice';
import { initSocketConnection } from '@/lib/utils/socket';

function WebsiteEditor() {
  const dispatch = useAppDispatch();
  const storeUuid = "your-store-uuid";

  useEffect(() => {
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

    return () => {
      socket.off('new_edit_event');
      socket.disconnect();
    };
  }, [dispatch, storeUuid]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1 }}>
        {/* 你的編輯器主要內容 */}
      </div>
      <div style={{ width: '400px', borderLeft: '1px solid #e5e7eb' }}>
        {/* 編輯歷史側邊欄 */}
        <EditEventList
          fetchEventsApi={user_list_website_events}
          pageSize={30}
        />
      </div>
    </div>
  );
}

export default WebsiteEditor;
```

## 注意事項

1. **Redux依賴**：此組件依賴Redux store，確保已正確配置
2. **Socket集成**：需要在你的WebsiteEditor組件中監聽Socket事件並dispatch到Redux
3. **API格式**：確保後端返回正確的cursor-based pagination格式
4. **自動去重**：Redux actions會自動處理事件去重
5. **無限滾動**：滾動到底部前200px時自動載入下一頁
6. **狀態管理**：所有編輯事件狀態統一存儲在 `editor_memory` slice中
