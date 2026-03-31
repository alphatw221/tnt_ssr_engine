import React, { Fragment, useState, useEffect } from "react";
import clsx from "clsx";
import style from './BlogPostSingle.module.scss';

const BlogPostSingle = ({blogPost, routingTable})=>{

  const [dateLocale, setDateLocale] = useState('en-CA')

  useEffect(() => {
    // intentional: SSR uses 'en-CA' to stabilize output; client switches to browser locale
    // suppressHydrationWarning is set on the date <li> to silence this known mismatch
    setDateLocale(undefined)
  }, [])

  return (
    <Fragment>
      <div className={clsx(style["部落格文章框"], '部落格文章框')}>
        <div className={clsx(style["部落格文章卡片"], '部落格文章卡片')}>
          <div className={clsx(style["文章圖片框"], '文章圖片框')}>
            <a className={clsx(style["文章圖片連結"], '文章圖片連結')} href={`/blog_post/${blogPost?.uuid}`}>
              <img
                className={clsx(style["文章圖片"], '文章圖片')}
                src={blogPost?.image}
                alt=""
              />
            </a>
          </div>
          <div className={clsx(style["文章內容框"], '文章內容框')}>
            <div className={clsx(style["文章資訊框"], '文章資訊框')}>
              <ul className={clsx(style["文章資訊列表"], '文章資訊列表')}>
                <li className={clsx(style["文章日期"], '文章日期')} suppressHydrationWarning>
                  {new Date(blogPost?.created_at).toLocaleDateString(dateLocale)}
                </li>
                <li className={clsx(style["文章留言數"], '文章留言數')}>
                  <a className={clsx(style["文章留言連結"], '文章留言連結')} href={`/${routingTable?.['blog_post_route']}/${blogPost?.uuid}`}>
                    {(blogPost?.comments||[]).length} <i className={clsx(style["留言圖標"], '留言圖標', 'fa fa-comments-o')} />
                  </a>
                </li>
              </ul>
            </div>
            <h4 className={clsx(style["文章標題"], '文章標題')}>
              <a className={clsx(style["文章標題連結"], '文章標題連結')} href={`/${routingTable?.['blog_post_route']}/${blogPost?.uuid}`}>
                {blogPost?.title}
              </a>
            </h4>
            <p className={clsx(style["文章摘要"], '文章摘要')}>
              {blogPost?.description}
            </p>
            <div className={clsx(style["文章底部操作框"], '文章底部操作框')}>
              <div className={clsx(style["閱讀更多按鈕框"], '閱讀更多按鈕框')}>
                <a className={clsx(style["閱讀更多連結"], '閱讀更多連結')} href={`/${routingTable?.['blog_post_route']}/${blogPost?.uuid}`}>
                  更多 read more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}


export default BlogPostSingle;
