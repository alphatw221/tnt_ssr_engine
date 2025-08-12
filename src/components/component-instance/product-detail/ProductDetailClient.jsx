
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useRef, useCallback, useMemo } from "react";
import clsx from "clsx";
import style from './ProductDetail.module.scss'
import { useAppSelector, useAppDispatch } from "@/redux/hooks";

import ComposeProductModal from "@/components/product/ComposeProductModal"
// import AddonProductsModal from "@/components/product/AddonProductsModal"
import ProductRating2 from "@/components/product/sub-components/ProductRating2"
import { isStockSufficient, getProductPrice } from "@/lib/utils/productHelper";
import { updateCartProduct } from "@/lib/utils/cartHelper";


// import Lightbox from "yet-another-react-lightbox";
// import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
// import Zoom from "yet-another-react-lightbox/plugins/zoom";
// import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
// import "yet-another-react-lightbox/plugins/thumbnails.css";
// import "yet-another-react-lightbox/styles.css";
import { getToFixedNumber } from "@/lib/utils/toFixedHelper";

const ProductDetailClient = ({  
    // params, searchParams,

    product,


    routingTable,
    element, 
    elementProps,
    mode,
    actions,
    ...props
}) => {
    
    const dispatch = useAppDispatch();

    const { cartProducts } = useAppSelector((state) => state.cart);
    const customer = useAppSelector((state) => state.customer);

    const [bigImages, setBigImages] = useState([])
    const [images, setImages] = useState([])
    const targetCartProducts = customer?.uuid ? customer?.cart_products : cartProducts

    const [selectedProduct, setSelectedProduct] = useState(
        (product?.variant_products||[]).length>0 ? product?.variant_products[0] : product
    )
    const [composeBase, setComposeBase] = useState(
        (product?.compose_bases||[]).length>0 ? product?.compose_bases?.[0] : null
    )


    const [selectedVariantProduct, setSelectedVariantProduct] = useState(product?.variant_products ? product?.variant_products?.[0] : null);
    const [quantityCount, setQuantityCount] = useState(1);    
    const [variant1, setVariant1] = useState({type:null,values:[]});
    const [variant2, setVariant2] = useState({type:null,values:[]});
    const [selectedValue1, setSelectedValue1] = useState((product?.variant_products||[]).length ? product?.variant_products?.[0]?.value1 : null);
    const [selectedValue2, setSelectedValue2] = useState((product?.variant_products||[]).length ? product?.variant_products?.[0]?.value2 : null);
    const [productCartQty, setProductCartQty] = useState(0);
    const [showComposeModal, setShowComposeModal] = useState(false)
    const [showAddonModal, setShowAddonModal] = useState(false)

    const [supportLogisticServices, setSupportLogisticServices] = useState([])
    const [supportPaymentServices, setSupportPaymentServices] = useState([])

    const [displayImage, setDisplayImage] = useState(null)
    const [defaultImage, setDefaultImage] = useState(null)

    const [selectedTabIndex, setSelectedTabIndex] = useState(0)

    const smallImageRefs = useRef([]);
    const variantType1Refs = useRef([]);
    const variantType2Refs = useRef([]);
    const composeBaseRefs = useRef([]);

    const productContent = useMemo(
        () => ({ __html: product?.content || "" }),
        [product?.content]
    );
    const productSpec = useMemo(
        () => ({ __html: selectedProduct?.spec||product?.spec || "" }),
        [product?.spec, selectedProduct?.spec]
    );
    useEffect(()=>{
        const _cartProduct = targetCartProducts.find(
            cartProduct=>cartProduct?.product?.uuid==product?.uuid && (cartProduct?.variant_product?.uuid||null)==(selectedVariantProduct?.uuid||null) && (cartProduct?.compose_base?.uuid||null) == (composeBase?.uuid||null)  
        )
        setProductCartQty(_cartProduct?.quantity||0)
    },[selectedVariantProduct, product, targetCartProducts, composeBase])
    
    useEffect(()=>{
        if(product?.type=='variant'){
          var _type1 = null 
          var _type2 = null
          const _values1 = []
          const _values2 = []
    
          product?.variant_products.forEach(variantProduct => {
            if(variantProduct.type1){
              _type1 = variantProduct.type1
              _values1.push({'value':variantProduct.value1,'description':variantProduct?.value1_description,'price_description':variantProduct?.value1_price_description})
            }
            if(variantProduct.type2){
              _type2 = variantProduct.type2
              _values2.push({'value':variantProduct.value2,'description':variantProduct?.value2_description,'price_description':variantProduct?.value2_price_description})
    
            }
          });
    
          setVariant1({type:_type1, values:_values1})
          setVariant2({type:_type2, values:_values2})
        }
      },[product])
      
       useEffect(()=>{
            var _images = []
            var _bigImages = []
            if((product?.images||[]).length>0){
                _images = [..._images, ...product.images]
                _bigImages = [..._bigImages, ...product.images]
            }
            (product?.variant_products||[]).forEach(variant_product=>{
                if(variant_product?.image)_bigImages.push({image:variant_product?.image})
            })
            setImages(_images)
            setBigImages(_bigImages)
            // setTargetImageD(product?.images?.[0])
            setDisplayImage(product?.images?.[0])
            setDefaultImage(product?.images?.[0])
        },[product])

    const now = new Date().toJSON().slice(0, 10);


    // let { object_id } = useParams();
    // const dispatch = useAppDispatch()


    // useEffect(()=>{

    //     if(shop?.product?.enable_review == true){
    //         var _product_uuid, _order_by, _page
    //         customer_search_product_reviews(_product_uuid=object_id, _order_by='-created_at', _page=productReviewsPage).then(res=>{
    //             dispatch(setProductReveiws({'productReviews':res?.data?.results||[], 'totalRecords':res?.data.count||0}))

    //         })
    //     }
    // },[shop?.product?.enable_review, productReviewsPage])


    // if(!shop.product ){
    //     return (
    //         <div style={{width:width,maxWidth:(node?.data?.max_width||'')+(node?.data?.max_width?node?.data?.max_width_unit:'')}}>
    //             <ProductNotFound />
    //         </div>
    //     )
    // }






    const handleBuy = ()=>{
        if(product?.type=='compose'){
          setShowComposeModal(true)
        }else{
          updateCartProduct(product, selectedVariantProduct, quantityCount, dispatch).then(()=>{
            setQuantityCount(1);
          }).then(()=>{
            setShowAddonModal(true)
          }).then(()=>{
            if(product?.single_page_product){
              window.location.href = '/checkout'
            }
          })
        }
    }
    const showImageBrowsingModal = ()=>{}
    const isDiscountApplied = ()=>{
        const {isDiscountApplied} = getProductPrice(now, product, quantityCount, selectedVariantProduct, composeBase)
        return isDiscountApplied
    }
    const getDiscountTotalPrice = ()=>{
        const {discountTotalPrice} = getProductPrice(now, product, quantityCount, selectedVariantProduct, composeBase)
        return getToFixedNumber(discountTotalPrice, product?.currency||'TWD')
        // return discountTotalPrice
    }
    const getOriginalTotalPrice = ()=>{
        const {originalTotalPrice} = getProductPrice(now, product, quantityCount, selectedVariantProduct, composeBase)
        return getToFixedNumber(originalTotalPrice, product?.currency||'TWD')
        // return originalTotalPrice
    }

    const isRequireQtySufficient = ()=>{
        const {requireQtySufficient, inventorySufficient, avaliableForAddToCart, inventory} = isStockSufficient( selectedProduct, quantityCount, productCartQty)
        return requireQtySufficient
    }
    const isInventoryControl = ()=>{
        const {inventoryControl, requireQtySufficient, inventorySufficient, avaliableForAddToCart, inventory} = isStockSufficient( selectedProduct, quantityCount, productCartQty)
        return inventoryControl
    }
    const isInventorySufficient = ()=>{
        const {inventoryControl, requireQtySufficient, inventorySufficient, avaliableForAddToCart, inventory} = isStockSufficient( selectedProduct, quantityCount, productCartQty)
        return inventorySufficient
    }
    const plusOneSufficient = ()=>{
        const {requireQtySufficient, inventorySufficient, avaliableForAddToCart, inventory} = isStockSufficient( selectedProduct, quantityCount+1, productCartQty)
        return requireQtySufficient
    }
    const getInventory = ()=>{
        const {requireQtySufficient, inventorySufficient, avaliableForAddToCart, inventory} = isStockSufficient( selectedProduct, quantityCount, productCartQty)
        return inventory
    }
    const getActionButtonText = ()=>{
        if(isRequireQtySufficient()){
            return product?.type=='compose'? '搭配商品' : product?.single_page_product ? ' 購買 ': " 加入購物車 "
        }
        return "缺貨中"
    }
    const actionButtonDisabled = ()=>{
        return (!isRequireQtySufficient())||(product?.type=='variant'&& !selectedVariantProduct)||(product?.type=='compose'&& !composeBase)
    }
    useEffect(()=>{

        const mouseEnterHandler = (index)=>(e)=>{
            (document.querySelectorAll(`.單小圖框.聚焦`)||[])?.forEach(el=>el?.classList?.remove("聚焦"))
            e?.currentTarget?.classList?.add("聚焦")
            // if(document?.querySelector(`.大圖`))document.querySelector(`.大圖`).src = images?.[index]?.image
            setDisplayImage(images?.[index])
        }
        const mouseEnterHandlers = [];

        (smallImageRefs?.current||[])?.forEach((el,index)=>{
            const h = mouseEnterHandler(index)
            if(el){
                el.addEventListener("mouseenter", h);
            }
        })

        return ()=>{
            (smallImageRefs?.current||[])?.forEach((el,index)=>{
                if(el){
                    el.removeEventListener("mouseenter", mouseEnterHandlers?.[index]);
                }
            })
        }
    },[smallImageRefs, images])




    useEffect(()=>{

        const mouseEnterHandler = (className, value1, value2)=>(e)=>{
            (document.querySelectorAll(`.${className}.聚焦`)||[])?.forEach(el=>el?.classList?.remove("聚焦"))
            e?.currentTarget?.classList?.add("聚焦")
            const variantProduct = product?.variant_products.find(variantProduct=>variantProduct.value1==value1&&variantProduct.value2==value2)
            // setTargetImageA({image:variantProduct?.image})
            // setTargetImageC({image:variantProduct?.image})
            // if(document?.querySelector(`.大圖`))document.querySelector(`.大圖`).src = variantProduct?.image
            if(variantProduct?.image)setDisplayImage({image:variantProduct?.image})
            
        }
        const mouseLeaveHandler = (e)=>{
            e?.currentTarget?.classList?.remove("聚焦")
            setDisplayImage(defaultImage)
            // setTargetImageA(null)
            // if(document?.querySelector(`.大圖`))document.querySelector(`.大圖`).src = displayImage?.image

        }

        const mouseEnterHandlers1 = [];
        (variantType1Refs?.current||[])?.forEach((el,index)=>{
            const h = mouseEnterHandler('單變體1-選項', variant1?.values?.[index]?.value, selectedValue2)
            mouseEnterHandlers1.push(h)
            if(el){
                el.addEventListener("mouseenter", h);
                el.addEventListener("mouseleave", mouseLeaveHandler);
            }
        })

        const mouseEnterHandlers2 = [];
        (variantType2Refs?.current||[])?.forEach((el,index)=>{
            const h = mouseEnterHandler('單變體2-選項', selectedValue1, variant2?.values?.[index]?.value)
            mouseEnterHandlers2.push(h)
            if(el){
                el.addEventListener("mouseenter", h);
                el.addEventListener("mouseleave", mouseLeaveHandler);
            }
        })
        return ()=>{
            (variantType1Refs?.current||[])?.forEach((el,index)=>{
                if(el){
                    el.removeEventListener("mouseenter", mouseEnterHandlers1?.[index]);
                    el.removeEventListener("mouseleave", mouseLeaveHandler);
                }
            });
            (variantType2Refs?.current||[])?.forEach((el,index)=>{
                if(el){
                    el.removeEventListener("mouseenter", mouseEnterHandlers2?.[index]);
                    el.removeEventListener("mouseleave", mouseLeaveHandler);
                }
            });
        }
    },[variantType1Refs, variantType2Refs, product, variant1, variant2, selectedValue1, selectedValue2, defaultImage])


    useEffect(()=>{
        const mouseEnterHandler = (e)=>{
            (document.querySelectorAll(`.單任搭選項.聚焦`)||[])?.forEach(el=>el?.classList?.remove("聚焦"))
            e?.currentTarget?.classList?.add("聚焦")
        }
        const mouseLeaveHandler = (e)=>{
            e?.currentTarget?.classList?.remove("聚焦")
        }
        (composeBaseRefs?.current||[])?.forEach((el,index)=>{
            if(el){
                el.addEventListener("mouseenter", mouseEnterHandler);
                el.addEventListener("mouseleave", mouseLeaveHandler);
            }
        })
        return ()=>{
            (composeBaseRefs?.current||[])?.forEach((el,index)=>{
                if(el){
                    el.removeEventListener("mouseenter", mouseEnterHandler);
                    el.removeEventListener("mouseleave", mouseLeaveHandler);
                }
            });
        }
    },[composeBaseRefs])

    return (
        
        <div 
            {...elementProps}
            >
             

            <div className={clsx(style['商品圖片選項框'], '商品圖片選項框',)}>

                <div className={clsx(style['大小圖框'], '大小圖框',)}>
                    <div className={clsx(style['大圖框'], '大圖框',)} onClick={()=>{showImageBrowsingModal()}}>
                        {(bigImages||[]).map((bigImage,i)=>(
                            <div className={clsx(style['單大圖框'], '單大圖框', bigImage?.image==displayImage?.image?`${style['顯示']} 顯示`:'')} key={i} >
                                <img className={clsx(style['大圖'], '大圖',)} alt="" src={bigImage?.image} />
                            </div>
                        ))}
                    </div>
                    <div className={clsx(style['小圖框'], '小圖框',)}>
                        {(images||[]).map((image,i)=>(
                            <div className={clsx(style['單小圖框'], '單小圖框')} key={i} ref={(el)=>{if (el) smallImageRefs.current[i] = el;}} >
                                <img className={clsx(style['小圖'], '小圖',)} alt="" src={image?.image} onClick={()=>{showImageBrowsingModal()}}/>
                            </div>

                        ))}
                        <button className={clsx(style['小圖框按鈕1'], '小圖框按鈕1',)}>
                            <i className={clsx(style['小圖框按鈕1-圖標'], '小圖框按鈕1-圖標',)}></i>
                        </button>
                        <button className={clsx(style['小圖框按鈕2'], '小圖框按鈕2',)}>
                            <i className={clsx(style['小圖框按鈕2-圖標'], '小圖框按鈕2-圖標',)}></i>
                        </button>
                    </div>
                </div>
                <div className={clsx(style['商品選項框'], '商品選項框',)}>
                        <div className={clsx(style['商品名稱框'], '商品名稱框',)}> 
                            <h2 className={clsx(style['商品名稱'], '商品名稱',)}>{product?.name}</h2>
                        </div>

                        {product?.enable_review && (product?.stars_count||0) > 0 && 
                            <ProductRating2 ratingValue={(product?.stars_count||0)/(product?.reviews_count||1)} />   
                        }

                        <div className={clsx(style['商品敘述框'], '商品敘述框',)}>
                            <p className={clsx(style['商品敘述'], '商品敘述',)} dangerouslySetInnerHTML={{__html: (product?.description||'').replace(/\n/g, "<br />")}}/>
                        </div>
                        
                        {(product?.support_logistic_services||[]).length>0 &&
                            <div className={clsx(style['支援物流框'], '支援物流框',)}>
                                <span className={clsx('運送方式-文字',style['運送方式-文字'])}>運送方式</span>
                                {
                                    (product?.support_logistic_services||[]).map((supportLogisticService, i)=>(
                                        <div className={clsx(style['單物流選項框'], '單物流選項框',)} key={i}>
                                            <span className={clsx(style['單物流選項-名稱'], '單物流選項-名稱',)}>{supportLogisticService.provider}</span>
                                        </div>
                                    ))
                                }
                                
                            </div>
                        }

                        {(product?.support_payment_services||[]).length>0 &&
                            <div className={clsx(style['支援付款框'], '支援付款框',)}>
                                <span className={clsx('付款方式-文字',style['付款方式-文字'])}>付款方式</span>
                                {
                                    (product?.support_payment_services||[]).map((supportPaymentService, i)=>(
                                        <div className={clsx(style['單付款選項框'], '單付款選項框',)} key={i}>
                                            <span className={clsx(style['單付款選項-名稱'], '單付款選項-名稱',)}>{supportPaymentService.provider}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        }

                        {
                            product?.type=='compose' && (product?.compose_bases||[]).length>0 &&
                            <div className={clsx('任搭組數框',style['任搭組數框'])}>
                                <span className={clsx('任搭組數-文字',style['任搭組數-文字'])}>任搭組數</span>

                                {(product?.compose_bases||[]).map((_composeBase, key) => {
                                        return (
                                            <label key={key} className={clsx('單任搭選項',style['單任搭選項'], _composeBase?.uuid==composeBase?.uuid?`${style['選取']} 選取`:'')} ref={(el)=>{if (el) composeBaseRefs.current[key] = el;}}>
                                                <input
                                                    className={clsx('單任搭選項-勾選',style['單任搭選項-勾選'])}
                                                    type="radio"
                                                    value={_composeBase.uuid}
                                                    checked={_composeBase.uuid === composeBase?.uuid? "checked": ""}
                                                    onChange={(e) => {
                                                        setComposeBase(_composeBase)
                                                    }}
                                                />
                                                <span className={clsx('單任搭選項-文字',style['單任搭選項-文字'])}>{`任搭${_composeBase?.base||1}${product?.unit||'件'}`}</span>  
                                                {
                                                    _composeBase?.description&&
                                                    <span className={clsx('單任搭選項-敘述',style['單任搭選項-敘述'])}>{_composeBase?.description}</span>   
                                                }
                                                {
                                                    _composeBase?.price_description&&
                                                    <span className={clsx('單任搭選項-價錢敘述',style['單任搭選項-價錢敘述'])}>{_composeBase?.price_description}</span>   
                                                }
                                            </label>
                                        );
                                })}
                            </div>
                        }

                        {
                            product?.type=='variant' && (product?.variant_products||[]).length>0 &&
                            <div className={clsx('變體商品框',style['變體商品框'])}>
                                {
                                    variant1.type && variant1.values &&
                                    <div className={clsx('變體1框',style['變體1框'])}>
                                        <span className={clsx('變體1-文字',style['變體1-文字'])}>{variant1.type}</span>
                                        {variant1.values.map((value, key) => {

                                            const variantProduct = product?.variant_products.find(variantProduct=>variantProduct.value1==value.value&&variantProduct.value2==selectedValue2)

                                            return (    
                                                    <label key={key} className={clsx('單變體1-選項',style['單變體1-選項'],value.value === selectedValue1?`${style['選取']} 選取`:'')} ref={(el)=>{if (el) variantType1Refs.current[key] = el;}}>
                                                        <input  className={clsx('單變體1-勾選',style['單變體1-勾選'])} type="radio"
                                                            checked={value.value === selectedValue1?"checked": ""}
                                                            onChange={()=>{
                                                                setSelectedValue1(value.value)
                                                                setSelectedVariantProduct(variantProduct)
                                                                setSelectedProduct(variantProduct)
                                                                setQuantityCount(1);
                                                                if(variantProduct.image){
                                                                    setDisplayImage({image:variantProduct.image})
                                                                    setDefaultImage({image:variantProduct.image})
                                                                }
                                                            }}
                                                        />
                                                        {
                                                            variantProduct?.image &&
                                                            <img className={clsx('單變體1-圖片',style['單變體1-圖片'])} src={variantProduct?.image}/>
                                                        }
                                                        
                                                        <span className={clsx('單變體1-文字',style['單變體1-文字'])}>{value.value}</span>  
                                                        {
                                                            value?.description&&
                                                            <span className={clsx('單變體1-敘述',style['單變體1-敘述'])}>{value?.description}</span>   
                                                        }
                                                        {
                                                            value?.price_description&&
                                                            <span className={clsx('單變體1-價錢敘述',style['單變體1-價錢敘述'])}>{value?.price_description}</span>   
                                                        }

                                                    </label>
                                                )
                                            }
                                        )}
                                    </div>
                                }
                                {
                                    variant2.type && variant2.values &&
                                    <div className={clsx('變體2框',style['變體2框'])}>
                                        <span className={clsx('變體2-文字',style['變體2-文字'])}>{variant2.type}</span>
                                        {variant2.values.map((value, key) => {
                                            const variantProduct = product?.variant_products.find(variantProduct=>variantProduct.value1==selectedValue1&&variantProduct.value2==value.value)

                                            return (    
                                                    <label key={key} className={clsx('單變體2-選項',style['單變體2-選項'], value.value === selectedValue2?`${style['選取']} 選取`:'')} ref={(el)=>{if (el) variantType2Refs.current[key] = el;}}>
                                                        <input  className={clsx('單變體2-勾選',style['單變體2-勾選'])} type="radio"
                                                            checked={value.value === selectedValue2?"checked": ""}
                                                            onChange={()=>{
                                                                setSelectedValue2(value)
                                                                setSelectedVariantProduct(variantProduct)
                                                                setSelectedProduct(variantProduct)
                                                                setQuantityCount(1);
                                                                if(variantProduct.image){
                                                                    setDisplayImage({image:variantProduct.image})
                                                                    setDefaultImage({image:variantProduct.image})
                                                                }

                                                            }}
                                                        />
                                                        {
                                                            variantProduct?.image &&
                                                            <img className={clsx('單變體2-圖片',style['單變體2-圖片'])} src={variantProduct?.image}/>
                                                        }
                                                        <span className={clsx('單變體2-文字',style['單變體2-文字'])}>{value.value}</span>  
                                                        {
                                                            value?.description&&
                                                            <span className={clsx('單變體2-敘述',style['單變體2-敘述'])}>{value?.description}</span>   
                                                        }
                                                        {
                                                            value?.price_description&&
                                                            <span className={clsx('單變體2-價錢敘述',style['單變體2-價錢敘述'])}>{value?.price_description}</span>   
                                                        }
                                                    </label>
                                            )
                                            }
                                        )}
                                    </div>
                                }
                            </div>
                        }
                       




                        <div className={clsx('商品價格框',style['商品價格框'])}>
                            {
                                isDiscountApplied() ?
                                <Fragment>
                                    <span className={clsx('折扣後價格',style['折扣後價格'])}>
                                        {`${product?.currency_sign||'$'}${getDiscountTotalPrice()}`}
                                    </span>
                                    <span className={clsx('折扣前價格',style['折扣前價格'])}>
                                        {`${product?.currency_sign||'$'}${getOriginalTotalPrice()}`}
                                    </span>
                                </Fragment>
                                :
                                <span className={clsx('商品價格',style['商品價格'])}>
                                    {`${product?.currency_sign||'$'}${getOriginalTotalPrice()}`}
                                </span>
                            }
                            
                        </div>



                        <div className={clsx('商品數量動作框',style['商品數量動作框'])}>
                            <div className={clsx('商品數量選擇框',style['商品數量選擇框'])}>
                                <button className={clsx('商品數量減去按鈕',style['商品數量減去按鈕'])} onClick={()=>{setQuantityCount(quantityCount > 1 ? quantityCount-1:1)}}>-</button>
                                <input className={clsx('商品數量',style['商品數量'])} type="text" readOnly value={quantityCount}/>
                                <button className={clsx('商品數量增加按鈕',style['商品數量增加按鈕'])} disabled={!plusOneSufficient()} onClick={()=>{
                                    if(plusOneSufficient()){setQuantityCount(quantityCount + 1)}
                                }}>+</button>

                                {
                                    isInventoryControl() && isInventorySufficient() &&
                                    <div className={clsx('商品剩餘數量框',style['商品剩餘數量框'])}>
                                        <span className={clsx('商品剩餘數量',style['商品剩餘數量'])}>{`還剩${getInventory()}件`}</span>
                                    </div>
                                }
                                
                            </div>

                            <div className={clsx('購物動作框',style['購物動作框'])}>
                                <button className={clsx('購物動作按鈕',style['購物動作按鈕'])}
                                    onClick={()=>{
                                        handleBuy();
                                    }}
                                    disabled={actionButtonDisabled()}
                                >
                                    {
                                        getActionButtonText()
                                    }
                                </button>
                            </div>
                        </div>
                       

                        {
                            product?.single_page_product&&
                            <div className={clsx('單頁商品動作框',style['單頁商品動作框'])}>
                                <a className={clsx('訂單查詢連結',style['訂單查詢連結'])} href={'./temp'}>訂單查詢</a>
                                <span className={clsx('單頁商品動作框-分隔線',style['單頁商品動作框-分隔線'])}></span>
                                <button className={clsx('立即下單按鈕',style['立即下單按鈕'])}>立即下單</button>
                            </div>
                        }




                        <div className={clsx('商品類別框',style['商品類別框'])}>
                            <label className={clsx('商品類別-標題',style['商品類別-標題'])}>商品類別：</label>
                            {(product?.product_category_relations||[]).map((product_category_relation,i)=>{
                                    //TODO a
                                    return (<div key={i} className={clsx('單商品類別框',style['單商品類別框'])}>
                                                <span key={i} className={clsx('商品類別',style['商品類別'])}>
                                                    {product_category_relation?.product_category_name||''}
                                                </span>
                                            </div>
                                    )
                                })}
                        </div>

                        <div className={clsx('商品標籤框',style['商品標籤框'])}>
                            <label className={clsx('商品標籤-標題',style['商品標籤-標題'])}>商品標籤：</label>
                            {(product?.tags||[]).map((tag,i)=>{
                                    //TODO a
                                    return (<div key={i} className={clsx('單商品標籤框',style['單商品標籤框'])}>
                                                <span key={i} className={clsx('商品標籤',style['商品標籤'])}>
                                                    {tag}
                                                </span>
                                            </div>
                                    )
                                })}
                        </div>

                        {/* TODO */}
                        { product?.type=='compose' &&
                            <ComposeProductModal 
                                show={showComposeModal} 
                                onHide={()=>{setShowComposeModal(false)}}
                                product={product}
                                cartProduct={cartProducts.find(cartProduct=>(
                                            cartProduct?.product?.uuid==product?.uuid
                                            &&
                                            (cartProduct?.compose_base?.uuid||null)==(composeBase?.uuid||null)
                                    
                                ))}
                                composeBase={composeBase}
                                quantityCount={quantityCount}
                                updateCompose={false}
                                setShowAddonModal = {setShowAddonModal}
                                nextAction = {null}
                            />
                        }

                        
                        {/* { (product?.addon_products||[]).length>0 &&
                            <AddonProductsModal 
                            show={showAddonModal} 
                            onHide={()=>{setShowAddonModal(false)}}
                            addonProductData = {(product?.addon_products||[]).map((_addonProduct)=>{return {'product':product, 'addonProduct':_addonProduct}}) }
                            node={node}
                            props={props}
                            title='商品加價購'
                            nextAction = {null}
                            />
                        } */}



                </div>
            </div>      
            <div className={clsx('商品資訊分頁框',style['商品資訊分頁框'])}>
                <div className={clsx('導覽按鈕框',style['導覽按鈕框'])}>
                    <div className={clsx('單導覽按鈕框',style['單導覽按鈕框'], selectedTabIndex==0?`${style['顯示']} 顯示`:'')}>
                        <button className={clsx('商品內容-導覽按鈕',style['商品內容-導覽按鈕'])} onClick={()=>{setSelectedTabIndex(0)}}>商品內容</button>
                    </div>
                    <div className={clsx('單導覽按鈕框',style['單導覽按鈕框'], selectedTabIndex==1?`${style['顯示']} 顯示`:'')}>
                        <button className={clsx('商品規格-導覽按鈕',style['商品規格-導覽按鈕'])} onClick={()=>{setSelectedTabIndex(1)}}>商品規格</button>
                    </div>
                    {/* <div className={clsx('單導覽按鈕框',style['單導覽按鈕框'], selectedTabIndex==2?`${style['顯示']} 顯示`:'')}>
                        <button className={clsx('商品評論-導覽按鈕',style['商品評論-導覽按鈕'])} onClick={()=>{setSelectedTabIndex(2)}}>商品評論</button>
                    </div> */}
                </div>
                <div className={clsx('分頁框',style['分頁框'])}>
                    <div className={clsx('單分頁框',style['單分頁框'], selectedTabIndex==0?`${style['顯示']} 顯示`:'')}>
                        <div 
                            className={clsx('ck-content', '商品內容',style['商品內容'])}
                            dangerouslySetInnerHTML={productContent}
                        ></div>        
                    </div>
                    <div className={clsx('單分頁框',style['單分頁框'], selectedTabIndex==1?`${style['顯示']} 顯示`:'')}>
                        {/* <div className={clsx('商品規格-列表',style['商品規格-列表'])}>
                            <div className={clsx('單參數框',style['單參數框'])}>
                                <span className={clsx('參數',style['參數'])}>長 :{selectedProduct?.length||''} cm</span> 
                            </div>
                            <div className={clsx('單參數框',style['單參數框'])}>
                                <span className={clsx('參數',style['參數'])}>寬 :{selectedProduct?.width||''} cm</span> 
                            </div>
                            <div className={clsx('單參數框',style['單參數框'])}>
                                <span className={clsx('參數',style['參數'])}>高 :{selectedProduct?.height||''} cm</span> 
                            </div>
                            <div className={clsx('單參數框',style['單參數框'])}>
                                <span className={clsx('參數',style['參數'])}>重量 : {selectedProduct?.weight||''}{" "}{selectedProduct?.weight_unit||''}</span>
                            </div>
                        </div> */}

                        <div 
                            className={clsx('ck-content', '商品規格',style['商品規格'])}
                            dangerouslySetInnerHTML={productSpec}
                        ></div>      


                    </div>
                    {/* <div className={clsx('單分頁框',style['單分頁框'], selectedTabIndex==2?`${style['顯示']} 顯示`:'')}>
                    </div> */}
                </div>
            </div>  

            {
                (product?.relate_products||[]).length >0 &&
                <div className={clsx('相關商品框',style['相關商品框'])}>
                
                    <div className={clsx('相關商品-標題框',style['相關商品-標題框'])}>
                        <h2 className={clsx('相關商品-標題',style['相關商品-標題'])}>相關產品</h2> 
                    </div>

                    <div className={clsx('相關商品-列表',style['相關商品-列表'])}>
                        { (product?.relate_products||[]).map((relate_product,i) => (
                            <div key={i} className={clsx('單相關商品框',style['單相關商品框'])}>
                                <a href={'./temp'}>
                                    <img className={clsx('單相關商品-圖片',style['單相關商品-圖片'])} src={relate_product?.images?.[0]?.image}/>
                                </a>

                                {/* TODO */}
                            </div>
                        ))}
                    </div>
                </div>
            }
           
        </div>)
};

ProductDetailClient.propTypes = {
};

export default ProductDetailClient;




