import React, { Fragment, useState, useEffect } from "react";
import clsx from "clsx";
import style from './BlogGrid.module.scss'

import { useAppSelector, useAppDispatch } from "@/redux/hooks";

import { customer_search_blog_post } from "../../api/blog_post"

import Paginator from '@/components/paginator/MyPaginator.jsx';

import { setCacheKey } from "@/redux/slices/blog-slice"

import BlogPostSingle from '@/components/blog/BlogPostSingle.jsx'

const BlogGrid = ({
    routingTable,

    element,
    elementProps,
    mode,
    ...props}) => {


    const searchParams = new URLSearchParams();

    const {cache} = useAppSelector((state) => state.blog);

    const defaultPageSize = 25
    const defaultPage = 1
    const defaultOrderBy = 'priority,updated_at'
    const defaultKeyword = ''


    const [_keyword, _setKeyword] = useState(searchParams.get('keyword')||cache?.[element?.uuid]?.keyword||defaultKeyword);
    const [keyword, setKeyword] = useState(searchParams.get('keyword')||cache?.[element?.uuid]?.keyword||defaultKeyword);

    const [categoryUUIDs, setCategoryUUIDs] = useState(searchParams.get('category_uuids')?searchParams.get('category_uuids')?.split(','):(cache?.[element?.uuid]?.categoryUUIDs||'').split(',')||[]);
    const [pageSize, setPageSize] = useState(searchParams.get('page_size')||cache?.[element?.uuid]?.pageSize||defaultPageSize);
    const [page, setPage] = useState(searchParams.get('page')||cache?.[element?.uuid]?.page||defaultPage);
    const [orderBy, setOrderBy] = useState(searchParams.get('order_by')||cache?.[element?.uuid]?.orderBy||defaultOrderBy);
    const [layoutOption, setLayoutOption] = useState(element?.data?.default_layout||'大格子');


    const dispatch = useAppDispatch()


    useEffect(()=>{
        console.log(cache?.[element?.uuid])
        if(
            !cache?.[element?.uuid]||
            (cache?.[element?.uuid]?.keyword||defaultKeyword)!=keyword||
            (cache?.[element?.uuid]?.categoryUUIDs||'')!=categoryUUIDs?.join(',')||
            (cache?.[element?.uuid]?.page||defaultPage)!=page||
            (cache?.[element?.uuid]?.pageSize||defaultPageSize)!=pageSize||
            (cache?.[element?.uuid]?.orderBy||defaultOrderBy)!=orderBy
        ){
            var _filter_uuids, _filter_categories, _filter_tags, _exclude_uuids, _exclude_categories, _exclude_tags, _keyword, _page, _page_size, _order_by, _with_categories
            customer_search_blog_post(
                _filter_uuids='', 
                _filter_categories=categoryUUIDs?.join(','), 
                _filter_tags='', 
                _exclude_uuids='',
                _exclude_categories='',
                _exclude_tags='',
                _keyword=keyword, 
                _page=page,
                _page_size=pageSize,
                _order_by=orderBy,
                _with_categories=true
            ).then(res=>{

                console.log(res.data)
                dispatch(setCacheKey({
                    'key':element?.uuid,
                    keyword,
                    page,
                    pageSize,
                    orderBy,
                    'categoryUUIDs':categoryUUIDs?.join(','),
                    'results':res.data?.results||[],
                    'count':res.data?.count||0,
                    'categories':res.data?.categories||[],
                }))

            })
        }
    },[element?.uuid, keyword, categoryUUIDs, page, pageSize, orderBy, cache])




    return (

        <div
            {...elementProps}
            >

            <div className={clsx(style['篩選器框'], "篩選器框")}>
                <div className={clsx(style['搜尋框'], "搜尋框")}>
                    <label className={clsx(style['搜尋-標籤'], "搜尋-標籤")}>搜尋</label>
                    <input type="text" className={clsx(style['搜尋-輸入'], "搜尋-輸入")}
                        placeholder="搜尋..."
                        value={_keyword}
                        onKeyUp={(e)=>{if(e.keyCode===13){e.target.blur();setKeyword(_keyword)}}}
                        onChange={(e)=>{_setKeyword(e.target.value)}}
                    />
                    <button className={clsx(style['搜尋-按鈕'], "搜尋-按鈕")} onClick={(e)=>{setKeyword(_keyword)}}>
                        <i className={clsx(style['搜尋-按鈕圖標'], "搜尋-按鈕圖標", "pe-7s-search")}/>
                    </button>
                </div>

                <div className={clsx(style['文章類別框'], "文章類別框")}>
                    <label className={clsx(style['文章類別-標籤'], "文章類別-標籤")}>文章類別</label>
                    {
                        (cache?.[element?.uuid]?.categories||[]).length == 0 &&
                        <div className={clsx(style['無文章類別框'], "無文章類別框")}>
                            <span className={clsx(style['無文章類別文字'], "無文章類別文字")}>無文章類別</span>
                        </div>
                    }
                    {
                        (cache?.[element?.uuid]?.categories||[]).map((category,key)=>(
                            <div key={key} className={clsx(style['單文章類別框'], "單文章類別框")}>
                                <input className={clsx(style['單文章類別-勾選'], "單文章類別-勾選")}
                                    type="checkbox"
                                    checked={categoryUUIDs?.includes(category?.uuid)}
                                    onChange={(e)=>{
                                        if(e.target.checked){
                                            setCategoryUUIDs([...categoryUUIDs, category?.uuid])
                                        }else{
                                            setCategoryUUIDs(categoryUUIDs?.filter(_category_uuid=>_category_uuid!=category?.uuid))
                                        }}}/>
                                <span className={clsx(style['單文章類別'], "單文章類別")}>{category?.name}</span>
                            </div>
                        ))
                    }



                </div>
            </div>

            <div className={clsx(style['文章框'], "文章框")}>
                <div className={clsx(style['文章框-頭段'], "文章框-頭段")}>
                    <div className={clsx(style['網格佈局按鈕框'], "網格佈局按鈕框")}>
                        <button className={clsx(style['網格佈局按鈕'], "網格佈局按鈕", layoutOption=='列'?`${style['選取']} 選取`:'')} onClick={e => {setLayoutOption('列')}}>
                            <i className={clsx(style['網格佈局按鈕-圖標'], "網格佈局按鈕-圖標", "fa fa-list-ul")}  />
                        </button>
                        <button className={clsx(style['網格佈局按鈕'], "網格佈局按鈕", layoutOption=='大格子'?`${style['選取']} 選取`:'')} onClick={e => {setLayoutOption('大格子')}}>
                            <i className={clsx(style['網格佈局按鈕-圖標'], "網格佈局按鈕-圖標", "fa fa-th-large")} />
                        </button>
                        <button className={clsx(style['網格佈局按鈕'], "網格佈局按鈕", layoutOption=='小格子'?`${style['選取']} 選取`:'')} onClick={e => {setLayoutOption('小格子')}}>
                            <i className={clsx(style['網格佈局按鈕-圖標'], "網格佈局按鈕-圖標", "fa fa-th")} />
                        </button>
                    </div>
                </div>
                <div className={clsx(style['文章框-網格'], "文章框-網格", style[layoutOption], layoutOption)}>
                    {
                        (cache?.[element?.uuid]?.results||[]).map((blogPost,key)=>(
                            <BlogPostSingle
                                key={key}
                                blogPost={blogPost}
                                routingTable={routingTable}/>
                        ))
                    }
                </div>


                <div className={clsx(style['分頁器框'], "分頁器框")}>
                    <Paginator
                        totalRecords={cache?.[element?.uuid]?.count||0}
                        pageLimit={pageSize}
                        pageNeighbours={2}
                        currentPage={page}
                        setCurrentPage={(page)=>{setPage(page)}}
                        pagePrevText="«"
                        pageNextText="»"
                        setOffset={()=>{}}
                    />
                </div>

            </div>





        </div>)
};

BlogGrid.propTypes = {
};

export default BlogGrid;
