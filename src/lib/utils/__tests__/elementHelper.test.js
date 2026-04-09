import { describe, it, expect, beforeEach } from 'vitest'
import {
  websiteFindElement,
  websiteFindAndReplaceElement,
  websiteFindAndRemoveElement,
  websiteFindAndRemoveElementRelation,
  websiteFindAndInsertElement,
  websiteFindAndInsertChildElement,
} from '../elementHelper.js'

// ─── 測試資料工廠 ────────────────────────────────────────────────────────────
// 每個測試用 makeWebsite() 取得全新的獨立副本，避免測試間互相污染

function makeElement(uuid, parent_relation_uuid, children = []) {
  return { uuid, parent_relation_uuid, children }
}

function makeWebpage(uuid, head_elements = [], body_elements = []) {
  return { uuid, head_elements, body_elements }
}

/**
 * 結構示意：
 *
 * webpage-1
 *   head: [A (rel-A)]
 *   body: [B (rel-B)
 *            └─ C (rel-C)
 *                 └─ D (rel-D)]
 *
 * webpage-2
 *   head: []
 *   body: [E (rel-E)]
 */
function makeWebsite() {
  const D = makeElement('uuid-D', 'rel-D')
  const C = makeElement('uuid-C', 'rel-C', [D])
  const B = makeElement('uuid-B', 'rel-B', [C])
  const A = makeElement('uuid-A', 'rel-A')
  const E = makeElement('uuid-E', 'rel-E')

  const page1 = makeWebpage('page-1', [A], [B])
  const page2 = makeWebpage('page-2', [], [E])

  return { webpages: [page1, page2] }
}

// ─── websiteFindElement ───────────────────────────────────────────────────────
describe('websiteFindElement', () => {
  it('在 head_elements 頂層找到元素', () => {
    const website = makeWebsite()
    const result = websiteFindElement(website, 'rel-A')
    expect(result).toBeDefined()
    expect(result.uuid).toBe('uuid-A')
  })

  it('在 body_elements 頂層找到元素', () => {
    const website = makeWebsite()
    const result = websiteFindElement(website, 'rel-B')
    expect(result).toBeDefined()
    expect(result.uuid).toBe('uuid-B')
  })

  it('在深層 children 找到元素（第 2 層）', () => {
    const website = makeWebsite()
    const result = websiteFindElement(website, 'rel-C')
    expect(result).toBeDefined()
    expect(result.uuid).toBe('uuid-C')
  })

  it('在深層 children 找到元素（第 3 層）', () => {
    const website = makeWebsite()
    const result = websiteFindElement(website, 'rel-D')
    expect(result).toBeDefined()
    expect(result.uuid).toBe('uuid-D')
  })

  it('在第二個 webpage 找到元素', () => {
    const website = makeWebsite()
    const result = websiteFindElement(website, 'rel-E')
    expect(result).toBeDefined()
    expect(result.uuid).toBe('uuid-E')
  })

  it('找不到時回傳 undefined', () => {
    const website = makeWebsite()
    const result = websiteFindElement(website, 'rel-NONEXISTENT')
    expect(result).toBeUndefined()
  })

  it('website 為 null 時不崩潰', () => {
    expect(() => websiteFindElement(null, 'rel-A')).not.toThrow()
  })

  it('webpages 為空時回傳 undefined', () => {
    const result = websiteFindElement({ webpages: [] }, 'rel-A')
    expect(result).toBeUndefined()
  })
})

// ─── websiteFindAndReplaceElement ────────────────────────────────────────────
describe('websiteFindAndReplaceElement', () => {
  it('替換 head_elements 頂層元素，保留其 children', () => {
    const website = makeWebsite()
    const replacement = { uuid: 'uuid-A', parent_relation_uuid: 'rel-A', name: 'replaced' }
    websiteFindAndReplaceElement(website, 'uuid-A', replacement)

    const elem = website.webpages[0].head_elements[0]
    expect(elem.name).toBe('replaced')
    expect(Array.isArray(elem.children)).toBe(true)
  })

  it('替換 body_elements 頂層元素，保留其 children', () => {
    const website = makeWebsite()
    const originalChildren = website.webpages[0].body_elements[0].children
    const replacement = { uuid: 'uuid-B', parent_relation_uuid: 'rel-B', name: 'replaced-B' }
    websiteFindAndReplaceElement(website, 'uuid-B', replacement)

    const elem = website.webpages[0].body_elements[0]
    expect(elem.name).toBe('replaced-B')
    expect(elem.children).toEqual(originalChildren)
  })

  it('替換深層 children 中的元素，保留其 children', () => {
    const website = makeWebsite()
    const replacement = { uuid: 'uuid-C', parent_relation_uuid: 'rel-C', name: 'replaced-C' }
    websiteFindAndReplaceElement(website, 'uuid-C', replacement)

    const B = website.webpages[0].body_elements[0]
    const C = B.children[0]
    expect(C.name).toBe('replaced-C')
    // C 原本有子元素 D，應被保留
    expect(C.children.length).toBe(1)
    expect(C.children[0].uuid).toBe('uuid-D')
  })

  it('uuid 不存在時，結構不變', () => {
    const website = makeWebsite()
    const before = JSON.stringify(website)
    websiteFindAndReplaceElement(website, 'uuid-NONEXISTENT', { uuid: 'x' })
    expect(JSON.stringify(website)).toBe(before)
  })
})

// ─── websiteFindAndRemoveElement ─────────────────────────────────────────────
describe('websiteFindAndRemoveElement', () => {
  it('移除 head_elements 頂層元素', () => {
    const website = makeWebsite()
    websiteFindAndRemoveElement(website, 'uuid-A')
    expect(website.webpages[0].head_elements.length).toBe(0)
  })

  it('移除 body_elements 頂層元素', () => {
    const website = makeWebsite()
    websiteFindAndRemoveElement(website, 'uuid-B')
    expect(website.webpages[0].body_elements.length).toBe(0)
  })

  it('移除深層 children 中的元素', () => {
    const website = makeWebsite()
    websiteFindAndRemoveElement(website, 'uuid-C')
    const B = website.webpages[0].body_elements[0]
    expect(B.children.length).toBe(0)
  })

  it('移除葉節點', () => {
    const website = makeWebsite()
    websiteFindAndRemoveElement(website, 'uuid-D')
    const B = website.webpages[0].body_elements[0]
    const C = B.children[0]
    expect(C.children.length).toBe(0)
  })

  it('uuid 不存在時，結構不變', () => {
    const website = makeWebsite()
    const before = JSON.stringify(website)
    websiteFindAndRemoveElement(website, 'uuid-NONEXISTENT')
    expect(JSON.stringify(website)).toBe(before)
  })
})

// ─── websiteFindAndRemoveElementRelation ─────────────────────────────────────
describe('websiteFindAndRemoveElementRelation', () => {
  it('用 parent_relation_uuid 移除 head 頂層元素', () => {
    const website = makeWebsite()
    websiteFindAndRemoveElementRelation(website, 'rel-A')
    expect(website.webpages[0].head_elements.length).toBe(0)
  })

  it('用 parent_relation_uuid 移除 body 頂層元素', () => {
    const website = makeWebsite()
    websiteFindAndRemoveElementRelation(website, 'rel-B')
    expect(website.webpages[0].body_elements.length).toBe(0)
  })

  it('用 parent_relation_uuid 移除深層 children', () => {
    const website = makeWebsite()
    websiteFindAndRemoveElementRelation(website, 'rel-C')
    const B = website.webpages[0].body_elements[0]
    expect(B.children.length).toBe(0)
  })

  it('relation 不存在時，結構不變', () => {
    const website = makeWebsite()
    const before = JSON.stringify(website)
    websiteFindAndRemoveElementRelation(website, 'rel-NONEXISTENT')
    expect(JSON.stringify(website)).toBe(before)
  })
})

// ─── websiteFindAndInsertElement ─────────────────────────────────────────────
describe('websiteFindAndInsertElement', () => {
  it('在目標元素之後插入（after=1）', () => {
    const website = makeWebsite()
    const newElem = makeElement('uuid-NEW', 'rel-NEW')
    // 在 rel-A（head 的第 0 個）之後插入
    websiteFindAndInsertElement(website, 'rel-A', newElem, 1)
    const head = website.webpages[0].head_elements
    expect(head.length).toBe(2)
    expect(head[0].uuid).toBe('uuid-A')
    expect(head[1].uuid).toBe('uuid-NEW')
  })

  it('在目標元素之前插入（after=0）', () => {
    const website = makeWebsite()
    const newElem = makeElement('uuid-NEW', 'rel-NEW')
    websiteFindAndInsertElement(website, 'rel-A', newElem, 0)
    const head = website.webpages[0].head_elements
    expect(head.length).toBe(2)
    expect(head[0].uuid).toBe('uuid-NEW')
    expect(head[1].uuid).toBe('uuid-A')
  })

  it('在深層 children 旁插入', () => {
    const website = makeWebsite()
    const newElem = makeElement('uuid-NEW', 'rel-NEW')
    // C 是 B 的 children[0]，在 C 之後插入
    websiteFindAndInsertElement(website, 'rel-C', newElem, 1)
    const B = website.webpages[0].body_elements[0]
    expect(B.children.length).toBe(2)
    expect(B.children[0].uuid).toBe('uuid-C')
    expect(B.children[1].uuid).toBe('uuid-NEW')
  })

  it('target 不存在時，結構不變', () => {
    const website = makeWebsite()
    const before = JSON.stringify(website)
    const newElem = makeElement('uuid-NEW', 'rel-NEW')
    websiteFindAndInsertElement(website, 'rel-NONEXISTENT', newElem, 1)
    expect(JSON.stringify(website)).toBe(before)
  })
})

// ─── websiteFindAndInsertChildElement ────────────────────────────────────────
describe('websiteFindAndInsertChildElement', () => {
  it('sequence=-1 時，插入到 children 末尾', () => {
    const website = makeWebsite()
    const newElem = makeElement('uuid-NEW', 'rel-NEW')
    // 插入到 B（rel-B）的 children 末尾
    websiteFindAndInsertChildElement(website, 'rel-B', -1, 0, newElem)
    const B = website.webpages[0].body_elements[0]
    expect(B.children.length).toBe(2)
    expect(B.children[1].uuid).toBe('uuid-NEW')
  })

  it('sequence=0, after=0 時，插入到 children 最前面', () => {
    const website = makeWebsite()
    const newElem = makeElement('uuid-NEW', 'rel-NEW')
    websiteFindAndInsertChildElement(website, 'rel-B', 0, 0, newElem)
    const B = website.webpages[0].body_elements[0]
    expect(B.children[0].uuid).toBe('uuid-NEW')
    expect(B.children[1].uuid).toBe('uuid-C')
  })

  it('sequence=0, after=1 時，插入到 children 第 1 個之後', () => {
    const website = makeWebsite()
    const newElem = makeElement('uuid-NEW', 'rel-NEW')
    websiteFindAndInsertChildElement(website, 'rel-B', 0, 1, newElem)
    const B = website.webpages[0].body_elements[0]
    expect(B.children[0].uuid).toBe('uuid-C')
    expect(B.children[1].uuid).toBe('uuid-NEW')
  })

  it('插入到原本沒有 children 的元素', () => {
    const website = makeWebsite()
    const newElem = makeElement('uuid-NEW', 'rel-NEW')
    // A 沒有 children
    websiteFindAndInsertChildElement(website, 'rel-A', -1, 0, newElem)
    const A = website.webpages[0].head_elements[0]
    expect(A.children.length).toBe(1)
    expect(A.children[0].uuid).toBe('uuid-NEW')
  })

  it('target 不存在時，結構不變', () => {
    const website = makeWebsite()
    const before = JSON.stringify(website)
    const newElem = makeElement('uuid-NEW', 'rel-NEW')
    websiteFindAndInsertChildElement(website, 'rel-NONEXISTENT', -1, 0, newElem)
    expect(JSON.stringify(website)).toBe(before)
  })
})

// ─── 複合操作：模擬拖拉移動（globleMoveNextTo 的邏輯）─────────────────────
describe('複合操作：移動元素到另一個元素旁邊', () => {
  it('把 C 從 B 的 children 移到 head，放在 A 之後', () => {
    const website = makeWebsite()
    const C = websiteFindElement(website, 'rel-C')

    // step1: 從原位置移除
    websiteFindAndRemoveElementRelation(website, C.parent_relation_uuid)
    // step2: 插入到 A 之後
    websiteFindAndInsertElement(website, 'rel-A', C, 1)

    // B 的 children 應該少了 C
    const B = website.webpages[0].body_elements[0]
    expect(B.children.length).toBe(0)

    // head 應該有 A 和 C
    const head = website.webpages[0].head_elements
    expect(head.length).toBe(2)
    expect(head[0].uuid).toBe('uuid-A')
    expect(head[1].uuid).toBe('uuid-C')
  })

  it('把 E 從 page-2 移到 B 的 children 末尾', () => {
    const website = makeWebsite()
    const E = websiteFindElement(website, 'rel-E')

    websiteFindAndRemoveElementRelation(website, E.parent_relation_uuid)
    websiteFindAndInsertChildElement(website, 'rel-B', -1, 0, E)

    expect(website.webpages[1].body_elements.length).toBe(0)
    const B = website.webpages[0].body_elements[0]
    expect(B.children.length).toBe(2)
    expect(B.children[1].uuid).toBe('uuid-E')
  })
})
