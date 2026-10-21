import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import style from './BlogPostComments.module.scss'
import { useAppSelector } from "@/redux/hooks";
import Paginator from '@/components/paginator/MyPaginator.jsx';
import { customer_search_blog_post_comments, customer_create_blog_post_comment } from '@/api/blog_post'

const PAGE_SIZE = 10
const MAX_CONTENT_LENGTH = 2000

const ERROR_MESSAGES = {
    'content_required': '請輸入留言內容',
    'guest_name_and_email_required': '請填寫暱稱與 Email',
    'comments_disabled': '這篇文章已關閉留言',
    'blog_post_not_found': '找不到這篇文章',
    'invalid_request': '送出失敗，請稍後再試',
}

const COMMENT_STATUS_LABELS = {
    'pending': '審核中',
    'hidden': '已隱藏',
}

const formatDate = (value) => value ? new Date(value).toLocaleDateString('en-CA') : ''

//單則留言 頂層與回覆共用 回覆目前只有官方管理員
const Comment = ({ comment, isReply }) => {
    const isOfficial = Boolean(comment?.is_official)
    return (
        <div className={clsx(
            style['單留言框'], '單留言框',
            isReply && `${style['回覆']} 回覆`,
            isOfficial && `${style['官方']} 官方`,
            comment?.is_mine && `${style['我的']} 我的`,
        )}>
            <div className={clsx(style['單留言-頭部'], '單留言-頭部')}>
                <span className={clsx(style['單留言-名稱'], '單留言-名稱')}>{comment?.author_name}</span>
                {isOfficial &&
                    <span className={clsx(style['單留言-官方標籤'], '單留言-官方標籤')}>官方</span>
                }
                {comment?.is_mine && COMMENT_STATUS_LABELS[comment?.status] &&
                    <span className={clsx(style['單留言-狀態'], '單留言-狀態', comment.status)}>{COMMENT_STATUS_LABELS[comment.status]}</span>
                }
                <span className={clsx(style['單留言-日期'], '單留言-日期')}>{formatDate(comment?.created_at)}</span>
            </div>
            <p className={clsx(style['單留言-內容'], '單留言-內容')}>{comment?.content}</p>

            {(comment?.replies || []).length > 0 &&
                <div className={clsx(style['回覆列表'], '回覆列表')}>
                    {comment.replies.map((reply) => (
                        <Comment comment={reply} isReply key={reply?.uuid} />
                    ))}
                </div>
            }
        </div>
    )
}

const BlogPostComments = ({ blogPostUuid, commentsCount }) => {

    const customer = useAppSelector((state) => state.customer);
    const isCustomer = Boolean(customer?.uuid)

    const [comments, setComments] = useState([])
    const [totalRecords, setTotalRecords] = useState(0)
    const [enableComments, setEnableComments] = useState(true)
    const [page, setPage] = useState(1)
    const [reloadKey, setReloadKey] = useState(0)

    const [content, setContent] = useState('')
    const [guestName, setGuestName] = useState('')
    const [guestEmail, setGuestEmail] = useState('')
    const [website, setWebsite] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [noticeMessage, setNoticeMessage] = useState('')

    useEffect(() => {
        if (!blogPostUuid) return
        customer_search_blog_post_comments({ blog_post_uuid: blogPostUuid, page, page_size: PAGE_SIZE }).then(res => {
            setComments(res?.data?.results || [])
            setTotalRecords(res?.data?.count || 0)
            setEnableComments(res?.data?.enable_comments !== false)
        }).catch(() => {
            setComments([])
            setTotalRecords(0)
        })
    }, [blogPostUuid, page, reloadKey, isCustomer])

    const handleSubmit = () => {
        if (!content.trim()) {
            setErrorMessage(ERROR_MESSAGES['content_required'])
            return
        }
        if (!isCustomer && (!guestName.trim() || !guestEmail.trim())) {
            setErrorMessage(ERROR_MESSAGES['guest_name_and_email_required'])
            return
        }
        setSubmitting(true)
        setErrorMessage('')
        setNoticeMessage('')
        customer_create_blog_post_comment({
            blog_post_uuid: blogPostUuid,
            content,
            ...(isCustomer ? {} : { guest_name: guestName, guest_email: guestEmail }),
            website,
        }).then(res => {
            setContent('')
            setNoticeMessage(res?.data?.status === 'pending' ? '留言審核中，通過後就會顯示' : '留言成功')
            setPage(1)
            setReloadKey(key => key + 1)
        }).catch(err => {
            const message = err?.response?.data?.message
            if (message === 'comments_disabled') setEnableComments(false)
            setErrorMessage(typeof message === 'string' ? (ERROR_MESSAGES[message] || '送出失敗，請稍後再試') : '請檢查輸入內容')
        }).finally(() => {
            setSubmitting(false)
        })
    }

    if (!enableComments) return null

    return (
        <div className={clsx(style['留言區框'], '留言區框')}>
            <div className={clsx(style['留言區-標題框'], '留言區-標題框')}>
                <h3 className={clsx(style['留言區-標題'], '留言區-標題')}>留言</h3>
                <span className={clsx(style['留言區-數量'], '留言區-數量')}>{commentsCount || 0}</span>
            </div>

            <div className={clsx(style['留言表單框'], '留言表單框')}>
                {!isCustomer &&
                    <div className={clsx(style['留言表單-訪客資訊框'], '留言表單-訪客資訊框')}>
                        <div className={clsx(style['留言表單-暱稱框'], '留言表單-暱稱框')}>
                            <label className={clsx(style['留言表單-標籤'], '留言表單-標籤')}>暱稱</label>
                            <input
                                className={clsx(style['留言表單-暱稱'], '留言表單-暱稱')}
                                type="text"
                                value={guestName}
                                onChange={(e) => setGuestName(e.target.value)}
                            />
                        </div>
                        <div className={clsx(style['留言表單-信箱框'], '留言表單-信箱框')}>
                            <label className={clsx(style['留言表單-標籤'], '留言表單-標籤')}>Email（不會公開）</label>
                            <input
                                className={clsx(style['留言表單-信箱'], '留言表單-信箱')}
                                type="email"
                                value={guestEmail}
                                onChange={(e) => setGuestEmail(e.target.value)}
                            />
                        </div>
                    </div>
                }

                {/* honeypot 用 CSS 藏起來 不能用 type=hidden 有值後端會判定為機器人 */}
                <div className={style['留言表單-網站框']} aria-hidden="true">
                    <input
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                    />
                </div>

                <div className={clsx(style['留言表單-內容框'], '留言表單-內容框')}>
                    <textarea
                        className={clsx(style['留言表單-內容'], '留言表單-內容')}
                        value={content}
                        maxLength={MAX_CONTENT_LENGTH}
                        placeholder="寫下你的留言"
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <span className={clsx(style['留言表單-字數'], '留言表單-字數')}>{content.length}/{MAX_CONTENT_LENGTH}</span>
                </div>

                {errorMessage &&
                    <div className={clsx(style['留言表單-錯誤訊息'], '留言表單-錯誤訊息')}>{errorMessage}</div>
                }
                {noticeMessage &&
                    <div className={clsx(style['留言表單-提示訊息'], '留言表單-提示訊息')}>{noticeMessage}</div>
                }

                <button
                    type="button"
                    className={clsx(style['留言表單-送出按鈕'], '留言表單-送出按鈕')}
                    disabled={submitting}
                    onClick={handleSubmit}
                >{submitting ? '送出中…' : '送出留言'}</button>
            </div>

            {comments.length === 0 ?
                <div className={clsx(style['留言區-無留言'], '留言區-無留言')}>目前還沒有留言</div>
                :
                <div className={clsx(style['留言列表'], '留言列表')}>
                    {comments.map((comment) => (
                        <Comment comment={comment} key={comment?.uuid} />
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

BlogPostComments.propTypes = {
    blogPostUuid: PropTypes.string,
    commentsCount: PropTypes.number,
};

export default BlogPostComments;
