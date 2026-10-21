import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import style from './OrderReviews.module.scss'
import OrderReviewItem from "./OrderReviewItem";
import { customer_get_order_review_items } from "@/api/product";

//訂單已付款且已取貨才顯示 會員與訪客打同一支 API 由後端判斷身份
const OrderReviews = ({ order, guestUUID }) => {

    const [items, setItems] = useState([])
    const [defaultDisplayName, setDefaultDisplayName] = useState('')

    const isReviewable = order?.payment_status === 'paid' && order?.delivery_status === 'collected'

    useEffect(() => {
        if (!isReviewable || !order?.uuid) return
        customer_get_order_review_items({ order_uuid: order.uuid, guest_uuid: guestUUID }).then(res => {
            setItems(res?.data?.items || [])
            setDefaultDisplayName(res?.data?.default_display_name || '')
        }).catch(() => {
            setItems([])
        })
    }, [isReviewable, order?.uuid, guestUUID])

    const handleCreated = (productUuid, review) => {
        setItems(prev => prev.map(item => item?.product?.uuid === productUuid ? { ...item, review } : item))
    }

    if (!isReviewable || items.length === 0) return null

    return (
        <div className={clsx(style['訂單評價框'], '訂單評價框')}>
            <div className={clsx(style['訂單評價標題框'], '訂單評價標題框')}>
                <h3 className={clsx(style['訂單評價標題'], '訂單評價標題')}>商品評價</h3>
            </div>
            <div className={clsx(style['訂單評價列表'], '訂單評價列表')}>
                {items.map((item) => (
                    <OrderReviewItem
                        key={item?.product?.uuid}
                        item={item}
                        orderUuid={order.uuid}
                        guestUUID={guestUUID}
                        defaultDisplayName={defaultDisplayName}
                        onCreated={(review) => handleCreated(item?.product?.uuid, review)}
                    />
                ))}
            </div>
        </div>
    )
};

OrderReviews.propTypes = {
    order: PropTypes.object,
    guestUUID: PropTypes.string,
};

export default OrderReviews;
