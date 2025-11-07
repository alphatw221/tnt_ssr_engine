// 編輯事件類型定義




export const EVENT_TYPES = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  MOVE: 'move',
  CLONE: 'clone',
  MIRROR: 'mirror',
  DELETE_RELATION: 'delete_relation',
};

export const EVENT_TYPE_LABELS = {
  [EVENT_TYPES.CREATE]: '新增',
  [EVENT_TYPES.UPDATE]: '修改',
  [EVENT_TYPES.DELETE]: '刪除',
  [EVENT_TYPES.MOVE]: '移動',
  [EVENT_TYPES.CLONE]: '複製',
  [EVENT_TYPES.MIRROR]: '鏡像',
  [EVENT_TYPES.DELETE_RELATION]: '刪除關聯',
};

export const EVENT_TYPE_COLORS = {
  [EVENT_TYPES.CREATE]: '#10b981',
  [EVENT_TYPES.UPDATE]: '#3b82f6',
  [EVENT_TYPES.DELETE]: '#ef4444',
  [EVENT_TYPES.DELETE_RELATION]: '#ef4444',
  [EVENT_TYPES.MOVE]: '#f59e0b',
  [EVENT_TYPES.CLONE]: '#f59e0b',
  [EVENT_TYPES.MIRROR]: '#f59e0b',
};

// 編輯事件數據結構
// {
//   id: string,
//   type: 'create' | 'update' | 'delete' | 'move',
//   timestamp: number,
//   editor: {
//     id: string,
//     name: string,
//     avatar?: string
//   },
//   target: {
//     type: 'element' | 'webpage' | 'section' | 'node',
//     uuid: string,
//     name: string
//   },
//   changes?: {
//     before: any,
//     after: any,
//     fields: string[]
//   },
//   metadata?: any
// }
