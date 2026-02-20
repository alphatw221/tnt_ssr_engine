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

    // const [products, setProducts] = useState([]);

    const searchParams = new URLSearchParams();
    const customer = useAppSelector((state) => state.customer);
    const {cartProducts} = useAppSelector((state)=> state.cart)
    const targetCartProducts = customer?.uuid ? customer?.cart_products||[] : cartProducts


    const {cache} = useAppSelector((state) => state.shop);


    // const [offset, setOffset] = useState(0);
    useEffect(() => {
        console.log('shop')
        console.log(getCartProductsCount(targetCartProducts))
            document.documentElement.dataset.cartCount = getCartProductsCount(targetCartProducts)

    }, [targetCartProducts]);


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
            // dispatch(setCacheKey({
            //     'key':element?.uuid,
            //     keyword,
            //     page,
            //     pageSize,
            //     orderBy
            // }))

            var _filter_uuids, _filter_categories, _filter_tags, _exclude_uuids, _exclude_categories, _exclude_tags, _keyword, _page, _page_size, _order_by, _with_categories
            customer_search_product(
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

                <div className={clsx(style['商品類別框'], "商品類別框")}>
                    <label className={clsx(style['商品類別-標籤'], "商品類別-標籤")}>商品類別</label>
                    {
                        (cache?.[element?.uuid]?.categories||[]).length == 0 &&
                        <div className={clsx(style['無商品類別框'], "無商品類別框")}>
                            <span className={clsx(style['無商品類別文字'], "無商品類別文字")}>無商品類別</span>
                        </div>
                    }
                    {
                        (cache?.[element?.uuid]?.categories||[]).map((category,key)=>(                            
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
                        (cache?.[element?.uuid]?.results||[]).map((product,key)=>(                            
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
            


          

        </div>
    )
}

Shop.propTypes = {

};


export default Shop;