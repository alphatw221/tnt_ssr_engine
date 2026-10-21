import PropTypes from "prop-types";
import React from "react";
import clsx from "clsx";
import style from './ProductReviews.module.scss'
import ProductRating2 from "@/components/product/sub-components/ProductRating2"

//評價摘要 會同時出現在商品資訊區與評價區 顯示方式交給自訂樣式表依外層框決定
const ProductReviewSummary = ({ summary }) => {

    if (!summary) return null

    const count = summary?.count || 0

    return (
        <div className={clsx(style['評價摘要框'], '評價摘要框')}>
            <div className={clsx(style['評價摘要-平均框'], '評價摘要-平均框')}>
                <span className={clsx(style['評價摘要-平均分數'], '評價摘要-平均分數')}>{Number(summary?.average || 0).toFixed(1)}</span>
                <ProductRating2 ratingValue={Number(summary?.average || 0)} />
                <span className={clsx(style['評價摘要-數量'], '評價摘要-數量')}>{count} 則評價</span>
            </div>
            <div className={clsx(style['評價摘要-分布框'], '評價摘要-分布框')}>
                {[5, 4, 3, 2, 1].map((star) => {
                    const starCount = summary?.distribution?.[String(star)] || 0
                    return (
                        <div className={clsx(style['單星等分布框'], '單星等分布框')} key={star}>
                            <span className={clsx(style['單星等分布-星等'], '單星等分布-星等')}>{star} 星</span>
                            <div className={clsx(style['單星等分布-長條框'], '單星等分布-長條框')}>
                                <div
                                    className={clsx(style['單星等分布-長條'], '單星等分布-長條')}
                                    style={{ width: `${count ? (starCount / count) * 100 : 0}%` }}
                                ></div>
                            </div>
                            <span className={clsx(style['單星等分布-數量'], '單星等分布-數量')}>{starCount}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

ProductReviewSummary.propTypes = {
    summary: PropTypes.object,
};

export default ProductReviewSummary;
