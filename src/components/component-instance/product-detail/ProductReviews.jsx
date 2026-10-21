import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import style from './ProductReviews.module.scss'
import ProductRating2 from "@/components/product/sub-components/ProductRating2"
import Paginator from '@/components/paginator/MyPaginator.jsx';
import ProductReviewSummary from "./ProductReviewSummary";
import { customer_search_product_reviews } from "@/api/product";

const PAGE_SIZE = 10

const ProductReviews = ({ productUuid, summary }) => {

    const [reviews, setReviews] = useState([])
    const [totalRecords, setTotalRecords] = useState(0)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setPage(1)
    }, [productUuid])

    useEffect(() => {
        if (!productUuid) return
        customer_search_product_reviews(productUuid, page, PAGE_SIZE).then(res => {
            setReviews(res?.data?.results || [])
            setTotalRecords(res?.data?.count || 0)
        }).catch(() => {
            setReviews([])
            setTotalRecords(0)
        })
    }, [productUuid, page])

    return (
        <div className={clsx(style['評價區框'], '評價區框')}>
            <div className={clsx(style['評價區-標題框'], '評價區-標題框')}>
                <h2 className={clsx(style['評價區-標題'], '評價區-標題')}>商品評價</h2>
            </div>

            <ProductReviewSummary summary={summary} />

            {reviews.length === 0 ?
                <div className={clsx(style['評價區-無評價'], '評價區-無評價')}>目前還沒有評價</div>
                :
                <div className={clsx(style['評價列表'], '評價列表')}>
                    {reviews.map((review) => (
                        <div className={clsx(style['單評價框'], '單評價框')} key={review?.uuid}>
                            <div className={clsx(style['單評價-頭部'], '單評價-頭部')}>
                                <span className={clsx(style['單評價-名稱'], '單評價-名稱')}>{review?.display_name}</span>
                                <span className={clsx(style['單評價-日期'], '單評價-日期')}>{review?.created_at ? new Date(review.created_at).toLocaleDateString('en-CA') : ''}</span>
                            </div>

                            <ProductRating2 ratingValue={review?.stars || 0} />

                            {(review?.variant_names || []).length > 0 &&
                                <div className={clsx(style['單評價-規格'], '單評價-規格')}>
                                    {review.variant_names.join('、')}
                                </div>
                            }

                            {review?.review &&
                                <p className={clsx(style['單評價-內容'], '單評價-內容')}>{review.review}</p>
                            }

                            {(review?.images || []).length > 0 &&
                                <div className={clsx(style['單評價-圖片列表'], '單評價-圖片列表')}>
                                    {review.images.map((image) => (
                                        <a className={clsx(style['單評價-圖片框'], '單評價-圖片框')} key={image?.id} href={image?.image} target="_blank" rel="noopener noreferrer">
                                            <img className={clsx(style['單評價-圖片'], '單評價-圖片')} alt="" src={image?.image_s || image?.image} />
                                        </a>
                                    ))}
                                </div>
                            }

                            {review?.reply_content &&
                                <div className={clsx(style['單評價-商家回覆框'], '單評價-商家回覆框')}>
                                    <div className={clsx(style['單評價-商家回覆-頭部'], '單評價-商家回覆-頭部')}>
                                        <span className={clsx(style['單評價-商家回覆-標題'], '單評價-商家回覆-標題')}>商家回覆</span>
                                        <span className={clsx(style['單評價-商家回覆-日期'], '單評價-商家回覆-日期')}>{review?.replied_at ? new Date(review.replied_at).toLocaleDateString('en-CA') : ''}</span>
                                    </div>
                                    <p className={clsx(style['單評價-商家回覆-內容'], '單評價-商家回覆-內容')}>{review.reply_content}</p>
                                </div>
                            }
                        </div>
                    ))}
                </div>
            }

            <Paginator
                totalRecords={totalRecords}
                pageLimit={PAGE_SIZE}
                pageNeighbours={2}
                setOffset={() => {}}
                currentPage={page}
                setCurrentPage={setPage}
                pagePrevText="«"
                pageNextText="»"
            />
        </div>
    )
};

ProductReviews.propTypes = {
    productUuid: PropTypes.string,
    summary: PropTypes.object,
};

export default ProductReviews;
