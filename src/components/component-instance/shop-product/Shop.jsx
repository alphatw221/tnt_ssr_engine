import { Fragment, useState, useEffect } from 'react';
import clsx from "clsx";
// import Paginator from 'react-hooks-paginator';
// import { useSelector } from "react-redux";
// import { useLocation, useSearchParams } from "react-router-dom"
// import { getSortedProducts } from '../../helpers/product';
// import SEO from "../../components/seo";
// import LayoutOne from '../../layouts/LayoutOne';
// import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
// import ShopSidebar from '../../wrappers/product/ShopSidebar';
// import ShopTopbarKingPork from '../../wrappers/product/ShopTopbarKingPork';
// import ShopProducts from '../../wrappers/product/ShopProducts';
// import ProductsKingPork from '../../wrappers/product/ProductsKingPork';
// import PropTypes from "prop-types";
// import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Paginator from '@/components/paginator/MyPaginator.jsx';

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setCacheKey } from "@/redux/slices/shop-slice"
import SingleProduct from './SingleProduct';
import style from './Shop.module.scss'

import { customer_search_product } from "@/api/product"
import { updateCartProduct, getCartProductsCount } from "@/lib/utils/cartHelper";

const Shop = ({ 
    // element,  
    // mode, 
    // actions,
    // routingTable, 
    // ...props,

    routingTable,

    element, 
    elementProps,
    mode,
    ...props
}) => {

    const customer = useAppSelector((state) => state.customer);
    const {cartProducts} = useAppSelector((state)=> state.cart)
    const targetCartProducts = customer?.uuid ? customer?.cart_products||[] : cartProducts

    const {cache} = useAppSelector((state) => state.shop);

    // SSR fallback: use element.data.cache when Redux cache is not yet populated
    const effectiveCache = cache?.[element?.uuid] ?? element?.data?.cache;

    useEffect(() => {
        document.documentElement.dataset.cartCount = getCartProductsCount(targetCartProducts)
    }, [targetCartProducts]);

    const defaultPageSize = element?.data?.limit_count || 25
    const defaultPage = 1
    const defaultOrderBy = 'priority,updated_at'
    const defaultKeyword = ''

    const [_keyword, _setKeyword] = useState(cache?.[element?.uuid]?.keyword||element?.data?.keyword||defaultKeyword);
    const [keyword, setKeyword] = useState(cache?.[element?.uuid]?.keyword||element?.data?.keyword||defaultKeyword);

    const [categoryUUIDs, setCategoryUUIDs] = useState(cache?.[element?.uuid]?.categoryUUIDs?cache?.[element?.uuid]?.categoryUUIDs?.split(','):((element?.data?.filter_categories??'').split(',')||[]));
    const [pageSize, setPageSize] = useState(cache?.[element?.uuid]?.pageSize||element?.data?.page_size||defaultPageSize);
    const [page, setPage] = useState(cache?.[element?.uuid]?.page||element?.data?.page||defaultPage);
    const [orderBy, setOrderBy] = useState(cache?.[element?.uuid]?.orderBy||element?.data?.order_by||defaultOrderBy);

    const [layoutOption, setLayoutOption] = useState(element?.data?.default_layout||'大格子');

    const dispatch = useAppDispatch()

    const filterUUIDs = element?.data?.filter_uuids||''
    const filterTags = element?.data?.filter_tags||''
    const excludeUUIDs = element?.data?.exclude_uuids||''
    const excludeCategories = element?.data?.exclude_categories||''
    const excludeTags = element?.data?.exclude_tags||''

    // 只在 client mount 後讀取 URL params，SSR 階段不執行
    useEffect(() => {
        const p = new URLSearchParams(window.location.search)
        if (p.get('keyword'))        { _setKeyword(p.get('keyword')); setKeyword(p.get('keyword')) }
        if (p.get('category_uuids')) setCategoryUUIDs(p.get('category_uuids').split(','))
        if (p.get('page'))           setPage(p.get('page'))
        if (p.get('page_size'))      setPageSize(p.get('page_size'))
        if (p.get('order_by'))       setOrderBy(p.get('order_by'))
    }, [])

    useEffect(()=>{
        // If Redux cache is empty but SSR cache exists, seed Redux cache and skip fetch
        if (!cache?.[element?.uuid] && element?.data?.cache?.results) {
            const ssrCount = element.data.cache.count
            const ssrResults = element.data.cache.results
            const ssrCategories = element?.data?.cache?.categories
            const ssrKeyword = element.data?.keyword ?? defaultKeyword
            const ssrCategoryUUIDs = (element?.data?.filter_categories??'').split(',')||[]
            const ssrPage = element?.data?.page||defaultPage
            const ssrPageSize = element?.data?.page_size||defaultPageSize
            const ssrOrderBy = element?.data?.order_by||defaultOrderBy
            const ssrFilterUUIDs = element?.data?.filter_uuids||''
            const ssrFilterTags = element?.data?.filter_tags||''
            const ssrExcludeUUIDs = element?.data?.exclude_uuids||''
            const ssrExcludeCategories = element?.data?.exclude_categories||''
            const ssrExcludeTags = element?.data?.exclude_tags||''

            if (
                ssrKeyword == keyword &&
                ssrCategoryUUIDs?.join(',') == categoryUUIDs?.join(',') &&
                ssrPage == page &&
                ssrPageSize == pageSize &&
                ssrOrderBy == orderBy &&
                ssrFilterUUIDs == filterUUIDs &&
                ssrFilterTags == filterTags &&
                ssrExcludeUUIDs == excludeUUIDs &&
                ssrExcludeCategories == excludeCategories &&
                ssrExcludeTags == excludeTags
            ) {
                dispatch(setCacheKey({
                    key: element?.uuid,
                    keyword: ssrKeyword,
                    page: ssrPage,
                    pageSize: ssrPageSize,
                    orderBy: ssrOrderBy,
                    categoryUUIDs: ssrCategoryUUIDs,
                    filterUUIDs: ssrFilterUUIDs,
                    filterTags: ssrFilterTags,
                    excludeUUIDs: ssrExcludeUUIDs,
                    excludeCategories: ssrExcludeCategories,
                    excludeTags: ssrExcludeTags,
                    results: ssrResults || [],
                    count: ssrCount || 0,
                    categories: ssrCategories || [],
                }))
                return
            }
        }

        if(
            !cache?.[element?.uuid]||
            (cache?.[element?.uuid]?.keyword||defaultKeyword)!=keyword||
            (cache?.[element?.uuid]?.categoryUUIDs||'')!=categoryUUIDs?.join(',')||
            (cache?.[element?.uuid]?.page||defaultPage)!=page||
            (cache?.[element?.uuid]?.pageSize||defaultPageSize)!=pageSize||
            (cache?.[element?.uuid]?.orderBy||defaultOrderBy)!=orderBy||
            (cache?.[element?.uuid]?.filterUUIDs||'')!=filterUUIDs||
            (cache?.[element?.uuid]?.filterTags||'')!=filterTags||
            (cache?.[element?.uuid]?.excludeUUIDs||'')!=excludeUUIDs||
            (cache?.[element?.uuid]?.excludeCategories||'')!=excludeCategories||
            (cache?.[element?.uuid]?.excludeTags||'')!=excludeTags
        ){
            customer_search_product(
                filterUUIDs,
                categoryUUIDs?.join(','),
                filterTags,
                excludeUUIDs,
                excludeCategories,
                excludeTags,
                keyword,
                page,
                pageSize,
                orderBy,
                true
            ).then(res=>{
                dispatch(setCacheKey({
                    'key':element?.uuid,
                    keyword,
                    page,
                    pageSize,
                    orderBy,
                    'categoryUUIDs':categoryUUIDs?.join(','),
                    filterUUIDs,
                    filterTags,
                    excludeUUIDs,
                    excludeCategories,
                    excludeTags,
                    'results':res.data?.results||[],
                    'count':res.data?.count||0,
                    'categories':res.data?.categories||[],
                }))
            })
        }

    },[element?.uuid, keyword, categoryUUIDs, page, pageSize, orderBy, cache?.[element?.uuid],
       filterUUIDs, filterTags, excludeUUIDs, excludeCategories, excludeTags])

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

                <div className={clsx(style['商品類別框'], "商品類別框")}>
                    <label className={clsx(style['商品類別-標籤'], "商品類別-標籤")}>商品類別</label>
                    {
                        (effectiveCache?.categories||[]).length == 0 &&
                        <div className={clsx(style['無商品類別框'], "無商品類別框")}>
                            <span className={clsx(style['無商品類別文字'], "無商品類別文字")}>無商品類別</span>
                        </div>
                    }
                    {
                        (effectiveCache?.categories||[]).map((category,key)=>(                            
                            <div key={key} className={clsx(style['單商品類別框'], "單商品類別框")}>
                                <input className={clsx(style['單商品類別-勾選'], "單商品類別-勾選")} 
                                    type="checkbox" 
                                    checked={categoryUUIDs?.includes(category?.uuid)} 
                                    onChange={(e)=>{
                                        if(e.target.checked){
                                            setCategoryUUIDs([...categoryUUIDs, category?.uuid])
                                        }else{
                                            setCategoryUUIDs(categoryUUIDs?.filter(_category_uuid=>_category_uuid!=category?.uuid))
                                        }}}/>
                                <span className={clsx(style['單商品類別'], "單商品類別")}>{category?.name}</span>
                            </div>
                        ))
                    }


                   
                </div>
            </div>

            <div className={clsx(style['商品框'], "商品框")}>
                <div className={clsx(style['商品框-頭段'], "商品框-頭段")}>
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
                <div className={clsx(style['商品框-網格'], "商品框-網格", style[layoutOption], layoutOption)}>
                    {
                        (effectiveCache?.results||[]).map((product,key)=>(                            
                            <SingleProduct 
                                key={key} 
                                product={product} 
                                cartProduct={                
                                    targetCartProducts.find((cartProduct) => cartProduct?.product?.uuid === product?.uuid)
                                } 
                                routingTable={routingTable}/>
                        ))
                    }
                </div>


                <div className={clsx(style['分頁器框'], "分頁器框")}>
                    <Paginator
                        totalRecords={effectiveCache?.count||0}
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
            


          

        </div>
    )
}

Shop.propTypes = {

};


export default Shop;