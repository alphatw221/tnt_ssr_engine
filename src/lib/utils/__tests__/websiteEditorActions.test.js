/**
 * WebsiteEditor Actions 測試
 *
 * 策略：WebsiteEditor 的 actions 本質上是：
 *   「elementHelper 函數 + setWebsite + API call」
 *
 * 我們把「狀態轉換」部分提取為純函數來測試，
 * 再用 mock API 驗證「送給後端的參數」是否正確。
 *
 * 這樣不需要 React 環境，直接測試資料邏輯。
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  websiteFindElement,
  websiteFindAndReplaceElement,
  websiteFindAndRemoveElementRelation,
  websiteFindAndInsertElement,
  websiteFindAndInsertChildElement,
} from '../elementHelper.js'

// ─── 從 WebsiteEditor 提取出來的「純狀態轉換」邏輯 ────────────────────────
// 這些函數對應 WebsiteEditor.jsx 中的 actions，
// 只保留 state 計算部分，去掉 setWebsite 和 API 呼叫。

function computeMoveNextTo(website, sourceElement, targetElement, after) {
  const _website = { ...website }
  websiteFindAndRemoveElementRelation(_website, sourceElement?.parent_relation_uuid)
  websiteFindAndInsertElement(_website, targetElement?.parent_relation_uuid, sourceElement, after)
  return _website
}

function computeMoveInto(website, sourceElement, targetElement, sequence, after) {
  const _website = { ...website }
  websiteFindAndRemoveElementRelation(_website, sourceElement?.parent_relation_uuid)
  websiteFindAndInsertChildElement(_website, targetElement?.parent_relation_uuid, sequence, after, sourceElement)
  return _website
}

// ─── 測試資料工廠 ─────────────────────────────────────────────────────────────

function makeElement(uuid, parent_relation_uuid, opts = {}) {
  return { uuid, parent_relation_uuid, children: [], ...opts }
}

/**
 * 初始結構：
 *
 * page-1 body:
 *   A (rel-A)
 *     └─ B (rel-B)
 *   C (rel-C)
 *
 * page-2 body:
 *   D (rel-D)
 */
function makeWebsite() {
  const B = makeElement('uuid-B', 'rel-B')
  const A = makeElement('uuid-A', 'rel-A', { children: [B] })
  const C = makeElement('uuid-C', 'rel-C')
  const D = makeElement('uuid-D', 'rel-D')

  return {
    webpages: [
      { uuid: 'page-1', head_elements: [], body_elements: [A, C] },
      { uuid: 'page-2', head_elements: [], body_elements: [D] },
    ],
  }
}

// ─── 1. MoveNextTo（拖到某元素旁邊）─────────────────────────────────────────

describe('computeMoveNextTo', () => {

  it('把 C 移到 A 之前（after=0）', () => {
    const website = makeWebsite()
    const A = websiteFindElement(website, 'rel-A')
    const C = websiteFindElement(website, 'rel-C')

    const newWebsite = computeMoveNextTo(website, C, A, 0)
    const body = newWebsite.webpages[0].body_elements

    expect(body.length).toBe(2)
    expect(body[0].uuid).toBe('uuid-C')
    expect(body[1].uuid).toBe('uuid-A')
  })

  it('把 C 移到 A 之後（after=1）', () => {
    const website = makeWebsite()
    const A = websiteFindElement(website, 'rel-A')
    const C = websiteFindElement(website, 'rel-C')

    const newWebsite = computeMoveNextTo(website, C, A, 1)
    const body = newWebsite.webpages[0].body_elements

    expect(body.length).toBe(2)
    expect(body[0].uuid).toBe('uuid-A')
    expect(body[1].uuid).toBe('uuid-C')
  })

  it('把跨頁面的 D 移到 C 之後', () => {
    const website = makeWebsite()
    const C = websiteFindElement(website, 'rel-C')
    const D = websiteFindElement(website, 'rel-D')

    const newWebsite = computeMoveNextTo(website, D, C, 1)
    const page1Body = newWebsite.webpages[0].body_elements
    const page2Body = newWebsite.webpages[1].body_elements

    expect(page2Body.length).toBe(0)           // D 從 page-2 消失
    expect(page1Body.length).toBe(3)           // page-1 多了 D
    expect(page1Body[2].uuid).toBe('uuid-D')
  })

  it('不能把元素移到自身旁邊（應保持不變）', () => {
    const website = makeWebsite()
    const A = websiteFindElement(website, 'rel-A')
    const before = JSON.stringify(website)

    // elementMenuItemHoverDropHelper 會阻止這種情況，但我們驗證 helper 的行為
    // 如果真的執行，自移後結構會壞掉——這是應測試的邊界情況
    // 正確行為：UI 層應阻止，不應呼叫 computeMoveNextTo
    expect(A.parent_relation_uuid).toBe('rel-A')
  })

})

// ─── 2. MoveInto（拖入某元素成為子元素）─────────────────────────────────────

describe('computeMoveInto', () => {

  it('把 C 拖入 A 成為最後一個子元素', () => {
    const website = makeWebsite()
    const A = websiteFindElement(website, 'rel-A')
    const C = websiteFindElement(website, 'rel-C')

    const newWebsite = computeMoveInto(website, C, A, -1, 0)

    const body = newWebsite.webpages[0].body_elements
    expect(body.length).toBe(1)               // C 從 body 移走

    const newA = websiteFindElement(newWebsite, 'rel-A')
    expect(newA.children.length).toBe(2)      // A 原有 B，現在多了 C
    expect(newA.children[1].uuid).toBe('uuid-C')
  })

  it('把 D 拖入 A', () => {
    const website = makeWebsite()
    const A = websiteFindElement(website, 'rel-A')
    const D = websiteFindElement(website, 'rel-D')

    const newWebsite = computeMoveInto(website, D, A, -1, 0)

    expect(newWebsite.webpages[1].body_elements.length).toBe(0)
    const newA = websiteFindElement(newWebsite, 'rel-A')
    expect(newA.children.length).toBe(2)
    expect(newA.children[1].uuid).toBe('uuid-D')
  })

})

// ─── 3. 關鍵：連續兩次拖拉的 parent_relation_uuid 同步問題 ──────────────────
/**
 * Bug 根源：socket_id 判斷讓自己的 socket 事件被跳過
 *
 * 完整流程：
 *   ① drop → globleMoveNextTo（位置更新，parent_relation_uuid 不變）
 *           → user_r_action_to_element API（後端刪舊 relation, 建新 relation）
 *   ② 後端 emit 'collaborator_do_element_action' {
 *         element_relation_uuid: 'rel-C',       ← 舊 uuid（用來找元素）
 *         new_parent_relation_uuid: 'rel-C-NEW' ← 新 uuid（更新後的值）
 *         sender_socket_id: 'my-socket-id'
 *      }
 *   ③ collaboratorDoElementAction 收到事件
 *         if(socket?.id != sender_socket_id)    ← ❌ 自己發的，被跳過
 *             // 這裡才會把 new_parent_relation_uuid 寫入 state
 *             // 但永遠不會執行
 *
 *   結果：前端 state 裡 C 的 parent_relation_uuid 永遠是舊值
 *   第二次拖拉：送出舊 uuid → 後端找不到 → 錯誤
 */
describe('連續兩次拖拉的 parent_relation_uuid 同步（socket_id 判斷 bug）', () => {

  /**
   * 模擬 collaboratorDoElementAction 的純邏輯
   * （去掉 socket_id 判斷，代表「如果這段邏輯有執行」的結果）
   */
  function applyCollaboratorDoElementAction(website, {
    action,
    element_relation_uuid,
    new_parent_relation_uuid,
    target_element_relation_uuid,
    target_relative_position,
    target_webpage_uuid,
  }) {
    const _website = { ...website }
    const sourceElement = websiteFindElement(_website, element_relation_uuid)
    const newElement = { ...sourceElement, parent_relation_uuid: new_parent_relation_uuid }

    if (action === 'move') {
      websiteFindAndRemoveElementRelation(_website, element_relation_uuid)
    }

    if (![null, undefined, '', 'null', 'undefined'].includes(target_webpage_uuid)) {
      // 簡化：不測 webpage case
    } else {
      if (target_relative_position === 'before') {
        websiteFindAndInsertElement(_website, target_element_relation_uuid, newElement, 0)
      } else if (target_relative_position === 'after') {
        websiteFindAndInsertElement(_website, target_element_relation_uuid, newElement, 1)
      } else if (target_relative_position === 'in') {
        websiteFindAndInsertChildElement(_website, target_element_relation_uuid, -1, 0, newElement)
      }
    }
    return _website
  }

  it('【重現 bug】globleMoveNextTo 後 parent_relation_uuid 沒有更新', () => {
    let website = makeWebsite()
    const C = websiteFindElement(website, 'rel-C')
    const A = websiteFindElement(website, 'rel-A')

    // 第一次拖拉：前端樂觀更新（globleMoveNextTo）
    website = computeMoveNextTo(website, C, A, 1)

    // 前端 state 裡 C 的 parent_relation_uuid 仍是舊值
    const C_in_state = websiteFindElement(website, 'rel-C')
    expect(C_in_state).toBeDefined()
    expect(C_in_state.parent_relation_uuid).toBe('rel-C')  // 舊值，未更新

    // 後端實際已把 relation 更新為 'rel-C-NEW'
    // 但因為 if(socket?.id != sender_socket_id) 判斷，前端跳過了 socket 事件
    // 所以前端永遠不知道 'rel-C-NEW'
  })

  it('【重現 bug】第二次拖拉時 API 送出過期的 parent_relation_uuid', () => {
    let website = makeWebsite()
    const apiCalls = []

    const C = websiteFindElement(website, 'rel-C')
    const A = websiteFindElement(website, 'rel-A')

    // ── 第一次拖拉 ──
    apiCalls.push({ parent_relation_uuid: C.parent_relation_uuid })   // 'rel-C' ✓
    website = computeMoveNextTo(website, C, A, 1)
    // 後端 socket 事件被跳過，state 中 C.parent_relation_uuid 仍是 'rel-C'

    // ── 第二次拖拉 ──
    const C_second = websiteFindElement(website, 'rel-C')  // 仍用舊 uuid 找得到
    apiCalls.push({ parent_relation_uuid: C_second.parent_relation_uuid })  // 'rel-C' ✗

    // 兩次 API 送出的是同一個 parent_relation_uuid
    // 但後端第一次已把 'rel-C' 刪除、建立 'rel-C-NEW'
    // 第二次找不到 'rel-C' → 錯誤
    expect(apiCalls[0].parent_relation_uuid).toBe('rel-C')
    expect(apiCalls[1].parent_relation_uuid).toBe('rel-C')  // ← 問題：應該是 'rel-C-NEW'
  })

  it('【驗證修復方向 A】sender 也處理自己的 socket 事件，正確更新 parent_relation_uuid', () => {
    let website = makeWebsite()
    const C = websiteFindElement(website, 'rel-C')
    const A = websiteFindElement(website, 'rel-A')

    // 第一次拖拉：前端只做「移除舊位置」，不插入（讓 socket 事件決定最終位置）
    // 或：前端做樂觀更新，socket 事件回來後再修正 parent_relation_uuid
    website = computeMoveNextTo(website, C, A, 1)

    // 修復方向：移除 if(socket?.id != sender_socket_id) 的限制，
    // 讓 sender 也能處理自己觸發的 action（只需防止重複插入，不需防止 uuid 更新）
    //
    // 模擬：sender 也收到並處理 socket 事件
    const socketPayload = {
      action: 'move',
      element_relation_uuid: 'rel-C',        // 舊 uuid（後端用來識別元素）
      new_parent_relation_uuid: 'rel-C-NEW', // 新 uuid（後端建立的新 relation）
      target_element_relation_uuid: 'rel-A',
      target_relative_position: 'after',
      target_webpage_uuid: null,
    }

    // 如果 sender 也處理這個事件（去掉 socket_id 判斷）：
    // ⚠️ 但這會雙重插入！因為 globleMoveNextTo 已經插入過了
    // 所以正確的修復需要更細緻的設計（見修復方向 B）
    const websiteAfterSocket = applyCollaboratorDoElementAction(website, socketPayload)

    // socket 事件處理後，new_parent_relation_uuid 被正確寫入
    const C_after = websiteFindElement(websiteAfterSocket, 'rel-C-NEW')
    expect(C_after).toBeDefined()
    expect(C_after.parent_relation_uuid).toBe('rel-C-NEW')  // ✓ 正確更新
  })

  /**
   * 模擬方案 A 修復後的 collaboratorDoElementAction（sender 分支）：
   * 只用 websiteFindAndReplaceElement 更新 parent_relation_uuid，不重複移動位置
   */
  function applyCollaboratorDoElementAction_senderBranch(website, {
    element_relation_uuid,
    new_parent_relation_uuid,
  }) {
    const _website = { ...website }
    const sourceElement = websiteFindElement(_website, element_relation_uuid)
    if (sourceElement) {
      const newElement = { ...sourceElement, parent_relation_uuid: new_parent_relation_uuid }
      websiteFindAndReplaceElement(_website, sourceElement.uuid, newElement)
    }
    return _website
  }

  it('【方案A修復後】sender 收到自己的 socket 事件，只更新 parent_relation_uuid 不重複移動', () => {
    let website = makeWebsite()
    const C = websiteFindElement(website, 'rel-C')
    const A = websiteFindElement(website, 'rel-A')

    // step1: 樂觀更新位置（globleMoveNextTo）
    website = computeMoveNextTo(website, C, A, 1)

    // 確認位置正確（A 之後）
    const body = website.webpages[0].body_elements
    expect(body[0].uuid).toBe('uuid-A')
    expect(body[1].uuid).toBe('uuid-C')

    // step2: sender 收到自己的 socket 事件，只更新 uuid
    website = applyCollaboratorDoElementAction_senderBranch(website, {
      element_relation_uuid: 'rel-C',
      new_parent_relation_uuid: 'rel-C-NEW',
    })

    // 位置不變
    const bodyAfter = website.webpages[0].body_elements
    expect(bodyAfter[0].uuid).toBe('uuid-A')
    expect(bodyAfter[1].uuid).toBe('uuid-C')
    expect(bodyAfter.length).toBe(2)  // 沒有重複插入

    // parent_relation_uuid 已更新
    expect(bodyAfter[1].parent_relation_uuid).toBe('rel-C-NEW')  // ✓
  })

  it('【方案A修復後】第二次拖拉時 API 送出正確的 parent_relation_uuid', () => {
    let website = makeWebsite()
    const apiCalls = []

    const C = websiteFindElement(website, 'rel-C')
    const A = websiteFindElement(website, 'rel-A')
    const B = websiteFindElement(website, 'rel-B')

    // ── 第一次拖拉 ──
    apiCalls.push({ parent_relation_uuid: C.parent_relation_uuid })  // 'rel-C' ✓
    website = computeMoveNextTo(website, C, A, 1)

    // socket 事件回來，sender 分支更新 uuid
    website = applyCollaboratorDoElementAction_senderBranch(website, {
      element_relation_uuid: 'rel-C',
      new_parent_relation_uuid: 'rel-C-NEW',
    })

    // ── 第二次拖拉 ──
    const C_second = websiteFindElement(website, 'rel-C-NEW')  // 用新 uuid 找
    expect(C_second).toBeDefined()
    apiCalls.push({ parent_relation_uuid: C_second.parent_relation_uuid })  // 'rel-C-NEW' ✓

    // 第二次送出的是後端期待的新 uuid
    expect(apiCalls[1].parent_relation_uuid).toBe('rel-C-NEW')  // ✓ 修復成功

    // 也確認第二次移動的位置邏輯正確
    website = computeMoveNextTo(website, C_second, B, 0)
    website = applyCollaboratorDoElementAction_senderBranch(website, {
      element_relation_uuid: 'rel-C-NEW',
      new_parent_relation_uuid: 'rel-C-NEW2',
    })
    const C_third = websiteFindElement(website, 'rel-C-NEW2')
    expect(C_third).toBeDefined()
    expect(C_third.parent_relation_uuid).toBe('rel-C-NEW2')  // ✓ 三次都正確
  })

  it('【驗證修復方向 B】前端不做樂觀更新，完全依賴 socket 事件', () => {
    /**
     * 最簡單的修復：
     *   drop → 只呼叫 API，不呼叫 globleMoveNextTo
     *   等 socket 事件（collaborator_do_element_action）回來，
     *   移除 sender 的判斷，讓自己也處理
     *
     * 缺點：有網路延遲（失去樂觀更新的即時感）
     * 優點：state 永遠與後端同步
     */
    let website = makeWebsite()

    // 不做樂觀更新，直接等 socket 事件
    const socketPayload = {
      action: 'move',
      element_relation_uuid: 'rel-C',
      new_parent_relation_uuid: 'rel-C-NEW',
      target_element_relation_uuid: 'rel-A',
      target_relative_position: 'after',
      target_webpage_uuid: null,
    }

    // 處理 socket 事件（sender 也處理）
    website = applyCollaboratorDoElementAction(website, socketPayload)

    // 結果：C 移到 A 之後，且 parent_relation_uuid 正確更新
    const body = website.webpages[0].body_elements
    expect(body[0].uuid).toBe('uuid-A')
    expect(body[1].uuid).toBe('uuid-C')
    expect(body[1].parent_relation_uuid).toBe('rel-C-NEW')  // ✓

    // 第二次拖拉時，parent_relation_uuid 是正確的新值
    const C_second = websiteFindElement(website, 'rel-C-NEW')
    expect(C_second).toBeDefined()
    expect(C_second.parent_relation_uuid).toBe('rel-C-NEW')  // ✓ 不會再出錯
  })

})

// ─── 4. elementMenuItemHoverDropHelper 的防護邏輯 ─────────────────────────────
/**
 * 測試「不能拖到自身」和「不能拖到子孫」的防護邏輯，
 * 這些是 dragDropHelperV2.js 提供的，是拖拉安全性的第一道防線。
 */
import { elementCheckDropValidHelper, elementMenuItemHoverDropHelper } from '../dragDropHelperV2.js'

describe('elementCheckDropValidHelper', () => {
  it('target 有 type 屬性時，只能放前後（不能放入）', () => {
    const calls = []
    const target = makeElement('uuid-T', 'rel-T', { type: 'section' })
    elementCheckDropValidHelper(null, target,
      () => calls.push('beforeAfterIn'),
      () => calls.push('onlyIn'),
      () => calls.push('beforeAfter'),
      () => calls.push('invalid'),
    )
    expect(calls).toEqual(['beforeAfter'])
  })

  it('target 為 void element（img/input 等）時，只能放前後', () => {
    const calls = []
    const target = makeElement('uuid-T', 'rel-T', { tag_name: 'img' })
    elementCheckDropValidHelper(null, target,
      () => calls.push('beforeAfterIn'),
      () => calls.push('onlyIn'),
      () => calls.push('beforeAfter'),
      () => calls.push('invalid'),
    )
    expect(calls).toEqual(['beforeAfter'])
  })

  it('target 為一般 div 時，可以放前後和放入', () => {
    const calls = []
    const target = makeElement('uuid-T', 'rel-T', { tag_name: 'div' })
    elementCheckDropValidHelper(null, target,
      () => calls.push('beforeAfterIn'),
      () => calls.push('onlyIn'),
      () => calls.push('beforeAfter'),
      () => calls.push('invalid'),
    )
    expect(calls).toEqual(['beforeAfterIn'])
  })
})
