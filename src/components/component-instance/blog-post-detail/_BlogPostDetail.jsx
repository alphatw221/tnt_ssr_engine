import React, { Fragment, useState, useEffect } from "react";

import clsx from "clsx";
import style from './BlogPostDetail.module.scss'
import ShareButton from './ShareButton'
const _BlogPostDetail = ({  

    // template_nodes,
    // node,  
    // mode, 
    // actions, 
    // hierarchy, 
    // children, 
    // isSudoNode, 
    blogPost,
    // mode,
    // actions,
    // ...props,

    routingTable,
    element, 
    elementProps,
    mode,
    actions,
    ...props


})=>{

//     return (
//         <div className={
//             clsx(
//                 'ck-content',
//                 style['ck-content'],
//             )}

//             dangerouslySetInnerHTML={{ __html: blogPost?.content }}
//         ></div>
// )

    const [createdAt, setCreatedAt] = useState('')
    const [updatedAt, setUpdatedAt] = useState('')

    useEffect(()=>{
        setCreatedAt(new Date(blogPost?.created_at||null).toLocaleDateString())
        setUpdatedAt(new Date(blogPost?.updated_at||null).toLocaleDateString())
    },[])

    const prePostNextPost = ()=>{
        return (
            <Fragment>
                 {
                        blogPost?.pre &&
                        <div className={clsx('上一則文章大框',style['上一則文章大框'])}>
                            <label className={clsx('上一則文章-標籤',style['上一則文章-標籤'])}>上一則文章：</label>
                            <div className={clsx('上一則文章框',style['上一則文章框'])}>
                                <a className={clsx('上一則文章-超連結',style['上一則文章-超連結'])} href={`/${routingTable?.['blog_post_route']}/${blogPost?.pre?.uuid}`}>
                                    <img className={clsx('上一則文章-圖片',style['上一則文章-圖片'])} src={blogPost?.pre?.image}></img>
                                    <h5 className={clsx('上一則文章-標題',style['上一則文章-標題'])}>{blogPost?.pre?.title}</h5>
                                </a>
                            </div>
                        </div>
                        
                    }
                    {
                        blogPost?.next &&
                        <div className={clsx('下一則文章大框',style['下一則文章大框'])}>
                            <label className={clsx('下一則文章-標籤',style['下一則文章-標籤'])}>下一則文章：</label>
                            <div className={clsx('下一則文章框',style['下一則文章框'])}>
                                <a className={clsx('下一則文章-超連結',style['下一則文章-超連結'])} href={`/${routingTable?.['blog_post_route']}/${blogPost?.next?.uuid}`}>
                                    <img className={clsx('下一則文章-圖片',style['下一則文章-圖片'])} src={blogPost?.next?.image}></img>
                                    <h5 className={clsx('下一則文章-標題',style['下一則文章-標題'])}>{blogPost?.next?.title}</h5>
                                </a>
                            </div>
                        </div>
                            
                    }
            </Fragment>
        )
    }

    return (
        <Fragment>
            <div 
                {...elementProps}
            >

            
                <div className={clsx('文章圖片框',style['文章圖片框'])}>
                    <img
                        className={clsx('文章圖片',style['文章圖片'])}
                        alt=""
                        src={ blogPost?.image}
                    />
                </div>

                <div className={clsx('文章資訊框',style['文章資訊框'])}>
                    <div className={clsx('發表時間框',style['發表時間框'])}>
                        <label className={clsx('發表時間-標題',style['發表時間-標題'])}>發表於：</label>
                        <span className={clsx('發表時間',style['發表時間'])}>{createdAt}</span>
                    </div>

                    <div className={clsx('更新時間框',style['更新時間框'])}>
                        <label className={clsx('更新時間-標題',style['更新時間-標題'])}>最後更新：</label>
                        <span className={clsx('更新時間',style['更新時間'])}>{updatedAt}</span>
                    </div>
                    
                    {
                        blogPost?.auther_name||true &&
                        <div className={clsx('作者框',style['作者框'])}>
                            <label className={clsx('作者-標題',style['作者-標題'])}>作者：</label>
                            <span className={clsx('作者',style['作者'])}>{`${blogPost?.auther_name||''}`}</span>
                        </div>
                    }
                    
                    {
                        blogPost?.allow_comment||true &&
                        <div className={clsx('留言數框',style['留言數框'])}>
                            <label className={clsx('留言數-標題',style['留言數-標題'])}>留言數：</label>
                            <span className={clsx('留言數',style['留言數'])}>{`${(blogPost?.comments||[]).length} `}</span>
                        </div>
                    }

                    <div className={clsx('文章類別框',style['文章類別框'])}>
                        <label className={clsx('文章類別-標題',style['文章類別-標題'])}>文章類別：</label>
                        {(blogPost?.blog_post_category_relations||[]).map((blog_post_category_relation,i)=>{

                                // blog_post_category_relation?.blog_post_category_uuid
                                //TODO a
                                return (
                                        <span key={i} className={clsx('文章類別',style['文章類別'])}>
                                            {blog_post_category_relation?.blog_post_category_name||''}
                                        </span>
                                )
                            })}
                    </div>

                    <div className={clsx('文章標籤框',style['文章標籤框'])}>
                        <label className={clsx('文章標籤-標題',style['文章標籤-標題'])}>文章標籤：</label>
                        {(blogPost?.tags||[]).map((tag,i)=>{

                                //TODO a
                                return (
                                        <span key={i} className={clsx('文章標籤',style['文章標籤'])}>
                                            {tag}
                                        </span>
                                )
                            })}
                    </div>
                    
                    <ShareButton/>
                    
                    <div className={clsx('上下文章框-頂部',style['上下文章框-頂部'])}>
                        {
                            prePostNextPost()
                        }
                    </div>


                </div>


                <h3 className={clsx('文章標題',style['文章標題'])}>{blogPost?.title}</h3>
                <h5 className={clsx('文章副標題',style['文章副標題'])}>{blogPost?.subtitle}</h5>

                <div className={
                    clsx(
                        'ck-content',
                        style['編輯器內容'],
                        '編輯器內容'
                    )}

                    dangerouslySetInnerHTML={{ __html: blogPost?.content||'' }}
                ></div>

                <div className={clsx('上下文章框-底部',style['上下文章框-底部'])}>
                    {
                        prePostNextPost()
                    }
                </div>
            


            </div>


        </Fragment>
    )
}

export default _BlogPostDetail;
