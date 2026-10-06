import { Fragment, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { useAppDispatch } from "@/redux/hooks";
import style from './SingleProduct.module.scss'

import cogoToast from 'cogo-toast';
import { updateCartProduct, } from "@/lib/utils/cartHelper";
import { getProductPrice, isStockSufficient } from "@/lib/utils/productHelper"

// import ProductModal from "./ProductModal"

import ProductDetailClient from '@/components/component-instance/product-detail/ProductDetailClient'
import { getToFixedNumber } from "@/lib/utils/toFixedHelper";

const PRODUCT_TYPE_CLASS_NAME = {
    'single': '單一商品',
    'variant': '變體商品',
    'compose': '任搭商品',
    'assorted': '套組商品',
}

// 販售形態: single/assorted 可直接加入購物車, variant/compose 需至商品頁選規格
const DIRECT_ADD_PRODUCT_TYPES = ['single', 'assorted']

const SingleProduct = ({
    product,
    cartProduct,
    routingTable,
}) => {

    const [modalShow, setModalShow] = useState(false);

    const dispatch = useAppDispatch();
    const now = new Date().toJSON().slice(0, 10);
    const ref = useRef()
    const {isDiscountApplied, originalSinglePrice, discountSinglePrice, originalMinimumPrice, originalMaximumPrice, discountMinimumPrice, discountMaximumPrice, discountMaximumPercent, discountMinimumPercent} = getProductPrice(now, product, cartProduct?.quantity, cartProduct?.variant_product, cartProduct?.compose_base)
    const {inventoryControl, requireQtySufficient, inventorySufficient, avaliableForAddToCart, inventory} = isStockSufficient( product, 1, cartProduct?.quantity||0)
    const productType = product?.type || 'single'
    const canDirectAdd = DIRECT_ADD_PRODUCT_TYPES.includes(productType)
    const cartQuantity = cartProduct?.quantity || 0
    const isOutOfStock = canDirectAdd && !inventorySufficient

    useEffect(()=>{
            const mouseEnterHandler = (e)=>{
                (document.querySelectorAll(`.單商品框.聚焦`)||[])?.forEach(el=>{el?.classList?.remove("聚焦");el?.classList?.remove(style['聚焦']);})
                e?.currentTarget?.classList?.add("聚焦")
                e?.currentTarget?.classList?.add(style['聚焦'])
            }
            const mouseLeaveHandler = (e)=>{
                e?.currentTarget?.classList?.remove("聚焦")
                e?.currentTarget?.classList?.remove(style['聚焦'])
            }
            if(ref?.current){
                ref?.current?.addEventListener("mouseenter", mouseEnterHandler);
                ref?.current?.addEventListener("mouseleave", mouseLeaveHandler);
            }
            return ()=>{
                if(ref?.current){
                    ref?.current?.removeEventListener("mouseenter", mouseEnterHandler);
                    ref?.current?.removeEventListener("mouseleave", mouseLeaveHandler);
                }
            }
    },[ref])



  return (
    <Fragment>
        <div
            className={clsx(
                style["單商品框"], '單商品框',
                PRODUCT_TYPE_CLASS_NAME[productType] || PRODUCT_TYPE_CLASS_NAME['single'],
                canDirectAdd ? [style["可直接加入"], '可直接加入'] : [style["需選規格"], '需選規格'],
                cartQuantity > 0 && [style["已加入"], '已加入'],
                isOutOfStock && [style["缺貨"], '缺貨'],
                product?.enable_direct_buy && [style["可直接購買"], '可直接購買'],
            )}
            data-cart-quantity={cartQuantity}
            ref={ref}
        >

            <div className={clsx(style["商品圖片框"], '商品圖片框')}>

                <a href={`/${routingTable?.['product_route']}/${product?.uuid}`}>
                    <img

                    className={clsx(style["商品主要圖片"], '商品主要圖片')}
                    src={product.images?.[0]?.image}
                    alt=""
                
                    />

                    {
                        product?.images?.[1] &&
                        <img
                            className={clsx(style["商品次要圖片"], '商品次要圖片')}
                            src={product?.images?.[1]?.image}
                            alt=""
                        />
                    }
                </a>
                

                <div className={clsx(style["特殊商品標章框"], '特殊商品標章框')}>
                    { product?.new_product &&
                        <span className={clsx(style["新品標章"], '新品標章')}>新品</span>
                    }
                    { product?.free_shipping_label &&
                        <span className={clsx(style["免運標章"], '免運標章')}>免運</span>
                    }
                    { isDiscountApplied &&
                        <span className={clsx(style["特價標章"], '特價標章')} >
                            {
                                ['compose', 'variant'].includes(product.type) 
                                ?
                                `-${discountMinimumPercent}%~-${discountMaximumPercent}%`
                                :
                                `-${parseInt((((originalSinglePrice) - (discountSinglePrice))/(originalSinglePrice!=0?originalSinglePrice:999999999999999))*100)}%`

                            }
                        </span>
                    }
                </div>
            </div>
            
            <div className={clsx(style["商品動作框"], '商品動作框')}>

                <div className={clsx(style["加入願望清單框"], '加入願望清單框')}>

                </div>
                {/* 文字/圖標交由樣式表以 ::before / ::after 決定，顯示與否依 .單商品框 上的販售形態與狀態 class 切換 */}
                {
                    canDirectAdd &&
                    <div className={clsx(style["加入購物車框"], '加入購物車框')}>
                        <button
                            className={clsx(style["加入購物車-按鈕"], '加入購物車-按鈕')}
                            disabled={isOutOfStock}
                            onClick={() => {updateCartProduct(product, null, 1, dispatch)}}
                        >
                            <span className={clsx(style["加入購物車-文字"], '加入購物車-文字')}></span>
                        </button>
                    </div>
                }
                {
                    canDirectAdd && product?.enable_direct_buy &&
                    <div className={clsx(style["直接購買框"], '直接購買框')}>
                        <button
                            className={clsx(style["直接購買-按鈕"], '直接購買-按鈕')}
                            disabled={isOutOfStock}
                            onClick={() => {
                                updateCartProduct(product, null, 1, dispatch).then(()=>{
                                    window.location.href = `/${routingTable?.['checkout_route']||'checkout'}`
                                })
                            }}
                        >
                            <span className={clsx(style["直接購買-文字"], '直接購買-文字')}></span>
                        </button>
                    </div>
                }
                <div className={clsx(style["前往商品框"], '前往商品框')}>
                    <a href={`/${routingTable?.['product_route']}/${product?.uuid}`} className={clsx(style["前往商品-超連結"], '前往商品-超連結')}>
                        <span className={clsx(style["前往商品-文字"], '前往商品-文字')}></span>
                    </a>
                </div>
                <div className={clsx(style["快速瀏覽框"], '快速瀏覽框')}>
                    <button className={clsx(style["快速瀏覽-按鈕"], '快速瀏覽-按鈕')}onClick={() => setModalShow(true)}>
                        <i className={clsx(style["快速瀏覽-圖標"], '快速瀏覽-圖標')}/>
                    </button>
                </div>

            </div>

            <div className={clsx(style["商品資訊框"], '商品資訊框')}>

                <div className={clsx(style["商品名稱框"], '商品名稱框')}>
                    <a href={`/${routingTable?.['product_route']}/${product?.uuid}`}  >
                        <h3 className={clsx(style["商品名稱"], '商品名稱')}>{product?.name||''}</h3>
                    </a>
                </div>

                <div className={clsx(style["商品價錢框"], '商品價錢框')}>
                    {
                        isDiscountApplied 
                        ? 
                        
                            ['variant', 'compose'].includes(product.type)
                            ?
                                <Fragment>
                                    <span className={clsx('折扣後價格',style['折扣後價格'])}>
                                        {
                                            discountMinimumPrice===discountMaximumPrice
                                            ?
                                            `${product?.currency_sign||'$'}${getToFixedNumber(discountMinimumPrice, product?.currency)}`
                                            :
                                            `${product?.currency_sign||'$'}${getToFixedNumber(discountMinimumPrice, product?.currency)} ~ ${product?.currency_sign||'$'}${getToFixedNumber(discountMaximumPrice, product?.currency) }`
                                        }
                                    </span>
                                    <span className={clsx('折扣前價格',style['折扣前價格'])} >
                                        {
                                            originalMinimumPrice===originalMaximumPrice
                                            ?
                                            `${product?.currency_sign||'$'}${getToFixedNumber(originalMinimumPrice, product?.currency)}`
                                            :
                                            `${product?.currency_sign||'$'}${getToFixedNumber(originalMinimumPrice, product?.currency) } ~ ${product?.currency_sign||'$'}${getToFixedNumber(originalMaximumPrice, product?.currency) }`
                                        }
                                    </span>
                                </Fragment>
                            :
                                <Fragment>
                                    <span className={clsx('折扣後價格',style['折扣後價格'])}>
                                        {`${product?.currency_sign||'$'}${getToFixedNumber(discountSinglePrice, product?.currency) }`}
                                    </span>
                                    <span className={clsx('折扣前價格',style['折扣前價格'])} > 
                                        {`${product?.currency_sign||'$'}${getToFixedNumber(originalSinglePrice, product?.currency) }`}
                                    </span>
                                </Fragment>
                        :
                            ['variant', 'compose'].includes(product.type)
                            ?
                            <span className={clsx('商品價格',style['商品價格'])}>
                                {
                                    originalMinimumPrice===originalMaximumPrice
                                    ?
                                    `${product?.currency_sign||'$'}${getToFixedNumber(originalMinimumPrice, product?.currency) }`
                                    :
                                    `${product?.currency_sign||'$'}${getToFixedNumber(originalMinimumPrice, product?.currency) } ~ ${product?.currency_sign||'$'}${getToFixedNumber(originalMaximumPrice, product?.currency) }`
                                }
                            </span>
                            :
                            <span className={clsx('商品價格',style['商品價格'])}>{`${product?.currency_sign||'$'}${getToFixedNumber(originalSinglePrice, product?.currency) }`} </span>
                    
                    }
                </div>
                
                <div className={clsx(style["商品敘述框"], '商品敘述框')}>
                    <p className={clsx(style["商品敘述"], '商品敘述')}>{product?.description||''}</p>
                </div>
            </div>
        </div>


        {
            modalShow &&
            <div className={clsx(style["快速瀏覽彈窗"], '快速瀏覽彈窗')}>
                <div className={clsx(style["快速瀏覽標頭"], '快速瀏覽標頭')}>
                    <button className={clsx(style["快速瀏覽關閉"], '快速瀏覽關閉')} onClick={() => setModalShow(false)}>✕</button>
                </div>
                <div className={clsx(style["快速瀏覽內容"], '快速瀏覽內容')}>
                    <ProductDetailClient product={product}/>
                </div>
            </div>
        }
    </Fragment>
  );
};

SingleProduct.propTypes = {


};

export default SingleProduct;
