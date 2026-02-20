import { useEffect, useRef } from 'react';

/**
 * HydrationComplete 组件
 * 用于在 hydration 完全完成后触发 hydration_complete 事件
 * 应该放在组件树的最底部，确保所有其他组件都已挂载
 */
const HydrationComplete = () => {
    const hasDispatchedRef = useRef(false);

    useEffect(() => {
        // 确保只触发一次
        if (hasDispatchedRef.current) return;
        hasDispatchedRef.current = true;

        // 使用 requestIdleCallback 确保浏览器完成所有渲染工作
        // 如果浏览器不支持，则使用 setTimeout 作为 fallback
        const dispatchEvent = () => {
            const hydrationCompleteEvent = new CustomEvent('hydration_complete', {
                detail: {
                    timestamp: Date.now(),
                    type: 'ssr-hydration'
                }
            });
            window.dispatchEvent(hydrationCompleteEvent);
            console.log('Hydration complete event dispatched at', new Date().toISOString());
        };

        if (typeof requestIdleCallback !== 'undefined') {
            requestIdleCallback(dispatchEvent, { timeout: 1000 });
        } else {
            setTimeout(dispatchEvent, 0);
        }
    }, []);

    return null; // 不渲染任何内容
};

export default HydrationComplete;
