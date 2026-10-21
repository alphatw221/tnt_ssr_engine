import PropTypes from "prop-types";
import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import style from './OrderReviews.module.scss'
import ProductRating2 from "@/components/product/sub-components/ProductRating2"
import StarInput from "@/components/product/sub-components/StarInput"
import { customer_create_order_product_review } from "@/api/product";

const MAX_REVIEW_LENGTH = 2000
const MAX_DISPLAY_NAME_LENGTH = 64
const MAX_IMAGES = 5
const MAX_IMAGE_SIZE = 5 * 1024 * 1024

const ERROR_MESSAGES = {
    'order_not_found': '找不到這張訂單',
    'order_not_reviewable': '訂單尚未付款或取貨，暫時不能評價',
    'product_not_reviewable': '這個商品目前不開放評價',
    'already_reviewed': '這個商品已經評價過了',
    'stars_required': '請選擇星等',
    'too_many_images': `圖片最多 ${MAX_IMAGES} 張`,
    'field_required': '請填寫必填欄位',
}

const REVIEW_STATUS_LABELS = {
    'pending': '審核中',
    'hidden': '已隱藏',
}

const OrderReviewItem = ({ item, orderUuid, guestUUID, defaultDisplayName, onCreated }) => {

    const [stars, setStars] = useState(0)
    const [content, setContent] = useState('')
    const [displayName, setDisplayName] = useState(defaultDisplayName || '')
    const [images, setImages] = useState([])
    const [submitting, setSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    //預覽用的 object URL 在移除圖片或卸載時釋放
    const imagesRef = useRef(images)
    imagesRef.current = images
    useEffect(() => {
        return () => imagesRef.current.forEach(image => URL.revokeObjectURL(image.preview))
    }, [])

    const handleSelectImages = (e) => {
        const files = Array.from(e.target.files || [])
        e.target.value = ''
        if (files.some(file => file.size > MAX_IMAGE_SIZE)) {
            setErrorMessage('每張圖片不能超過 5MB')
            return
        }
        if (images.length + files.length > MAX_IMAGES) {
            setErrorMessage(ERROR_MESSAGES['too_many_images'])
            return
        }
        setErrorMessage('')
        setImages(prev => [...prev, ...files.map(file => ({ file, preview: URL.createObjectURL(file) }))])
    }

    const handleRemoveImage = (index) => {
        URL.revokeObjectURL(images[index]?.preview)
        setImages(prev => prev.filter((_, i) => i !== index))
    }

    const handleSubmit = () => {
        if (!stars) {
            setErrorMessage(ERROR_MESSAGES['stars_required'])
            return
        }
        setSubmitting(true)
        setErrorMessage('')
        customer_create_order_product_review({
            order_uuid: orderUuid,
            product_uuid: item?.product?.uuid,
            guest_uuid: guestUUID,
            stars,
            review: content,
            display_name: displayName,
            upload_images: images.map(image => image.file),
        }).then(res => {
            onCreated?.(res?.data)
        }).catch(err => {
            const message = err?.response?.data?.message
            setErrorMessage(typeof message === 'string' ? (ERROR_MESSAGES[message] || '送出失敗，請稍後再試') : '請檢查輸入內容')
        }).finally(() => {
            setSubmitting(false)
        })
    }

    const review = item?.review

    return (
        <div className={clsx(style['單訂單評價框'], '單訂單評價框', review ? `${style['已評價']} 已評價` : '')}>
            <div className={clsx(style['單訂單評價-商品框'], '單訂單評價-商品框')}>
                {item?.image &&
                    <img className={clsx(style['單訂單評價-商品圖片'], '單訂單評價-商品圖片')} alt="" src={item.image} />
                }
                <div className={clsx(style['單訂單評價-商品資訊'], '單訂單評價-商品資訊')}>
                    <span className={clsx(style['單訂單評價-商品名稱'], '單訂單評價-商品名稱')}>{item?.product?.name}</span>
                    {(item?.variant_names || []).length > 0 &&
                        <span className={clsx(style['單訂單評價-商品規格'], '單訂單評價-商品規格')}>{item.variant_names.join('、')}</span>
                    }
                </div>
            </div>

            {review ?
                <div className={clsx(style['我的評價框'], '我的評價框')}>
                    {REVIEW_STATUS_LABELS[review?.status] &&
                        <span className={clsx(style['我的評價-狀態'], '我的評價-狀態', review.status)}>{REVIEW_STATUS_LABELS[review.status]}</span>
                    }
                    <ProductRating2 ratingValue={review?.stars || 0} />
                    {review?.review &&
                        <p className={clsx(style['我的評價-內容'], '我的評價-內容')}>{review.review}</p>
                    }
                    {(review?.images || []).length > 0 &&
                        <div className={clsx(style['我的評價-圖片列表'], '我的評價-圖片列表')}>
                            {review.images.map((image) => (
                                <img className={clsx(style['我的評價-圖片'], '我的評價-圖片')} key={image?.id} alt="" src={image?.image_s || image?.image} />
                            ))}
                        </div>
                    }
                    {review?.reply_content &&
                        <div className={clsx(style['我的評價-商家回覆框'], '我的評價-商家回覆框')}>
                            <span className={clsx(style['我的評價-商家回覆-標題'], '我的評價-商家回覆-標題')}>商家回覆</span>
                            <p className={clsx(style['我的評價-商家回覆-內容'], '我的評價-商家回覆-內容')}>{review.reply_content}</p>
                        </div>
                    }
                </div>
                :
                <div className={clsx(style['評價表單框'], '評價表單框')}>
                    <div className={clsx(style['評價表單-星等框'], '評價表單-星等框')}>
                        <label className={clsx(style['評價表單-標籤'], '評價表單-標籤')}>評分</label>
                        <StarInput value={stars} onChange={setStars} />
                    </div>

                    <div className={clsx(style['評價表單-內容框'], '評價表單-內容框')}>
                        <label className={clsx(style['評價表單-標籤'], '評價表單-標籤')}>評價內容</label>
                        <textarea
                            className={clsx(style['評價表單-內容'], '評價表單-內容')}
                            value={content}
                            maxLength={MAX_REVIEW_LENGTH}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <span className={clsx(style['評價表單-字數'], '評價表單-字數')}>{content.length}/{MAX_REVIEW_LENGTH}</span>
                    </div>

                    <div className={clsx(style['評價表單-名稱框'], '評價表單-名稱框')}>
                        <label className={clsx(style['評價表單-標籤'], '評價表單-標籤')}>顯示名稱</label>
                        <input
                            className={clsx(style['評價表單-名稱'], '評價表單-名稱')}
                            type="text"
                            value={displayName}
                            maxLength={MAX_DISPLAY_NAME_LENGTH}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                    </div>

                    <div className={clsx(style['評價表單-圖片框'], '評價表單-圖片框')}>
                        <label className={clsx(style['評價表單-標籤'], '評價表單-標籤')}>圖片（最多 {MAX_IMAGES} 張）</label>
                        <div className={clsx(style['評價表單-圖片列表'], '評價表單-圖片列表')}>
                            {images.map((image, i) => (
                                <div className={clsx(style['評價表單-單圖片框'], '評價表單-單圖片框')} key={image.preview}>
                                    <img className={clsx(style['評價表單-圖片'], '評價表單-圖片')} alt="" src={image.preview} />
                                    <button type="button" className={clsx(style['評價表單-移除圖片按鈕'], '評價表單-移除圖片按鈕')} onClick={() => handleRemoveImage(i)}>×</button>
                                </div>
                            ))}
                        </div>
                        {images.length < MAX_IMAGES &&
                            <input
                                className={clsx(style['評價表單-上傳圖片'], '評價表單-上傳圖片')}
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleSelectImages}
                            />
                        }
                    </div>

                    {errorMessage &&
                        <div className={clsx(style['評價表單-錯誤訊息'], '評價表單-錯誤訊息')}>{errorMessage}</div>
                    }

                    <button
                        type="button"
                        className={clsx(style['評價表單-送出按鈕'], '評價表單-送出按鈕')}
                        disabled={submitting}
                        onClick={handleSubmit}
                    >{submitting ? '送出中…' : '送出評價'}</button>
                </div>
            }
        </div>
    )
};

OrderReviewItem.propTypes = {
    item: PropTypes.object,
    orderUuid: PropTypes.string,
    guestUUID: PropTypes.string,
    defaultDisplayName: PropTypes.string,
    onCreated: PropTypes.func,
};

export default OrderReviewItem;
