import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

// 加入購物車提示: 觸發時才掛載到 body, 下一個 frame 加上「顯示」以便進場 transition,
// duration 後移除「顯示」, 再等 exitDelay (離場 transition) 後從 DOM 移除
// 文字交由樣式表以 .加入購物車提示-文字::before { content: "..." } 決定
export const useCartToast = ({ duration = 2500, exitDelay = 400 } = {}) => {
    const [mounted, setMounted] = useState(false)
    const [visible, setVisible] = useState(false)
    const [status, setStatus] = useState('')
    const timers = useRef([])
    const frame = useRef(null)

    const clear = () => {
        timers.current.forEach(clearTimeout)
        timers.current = []
        if (frame.current) cancelAnimationFrame(frame.current)
        frame.current = null
    }
    useEffect(() => clear, [])

    // status: '成功' | '失敗'
    const showToast = (_status = '成功') => {
        clear()
        setStatus(_status)
        setMounted(true)
        frame.current = requestAnimationFrame(() => {
            frame.current = requestAnimationFrame(() => setVisible(true))
        })
        timers.current.push(
            setTimeout(() => setVisible(false), duration),
            setTimeout(() => setMounted(false), duration + exitDelay),
        )
    }

    return [{ mounted, visible, status }, showToast]
}

const CartToast = ({ mounted, visible, status }) => {
    if (!mounted || typeof document === 'undefined') return null
    return createPortal(
        <div className={clsx('加入購物車提示框', visible && '顯示', status)}>
            <span className={clsx('加入購物車提示-文字')}></span>
        </div>,
        document.body
    )
}

export default CartToast
