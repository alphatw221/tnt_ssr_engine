import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
// //import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { getProductCartQuantity } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
// import { customer_delete_cart_product, customer_update_cart_product } from "../../api/cart";
import { updateCartProduct } from "../../lib/utils/cartHelper";
import { isDiscountApplied } from "../../lib/utils/productHelper";

import cogoToast from 'cogo-toast';
import clsx from "clsx";

import ComposeProductModal from "./ComposeProductModal"
import AddonProductsModal from "./AddonProductsModal"
import style from "./ProductDescriptionInfoKingPork.module.scss"

import { rgba2hex } from "@/lib/utils/rgba2hex";
import { getShippingPriceRangeOptions, getPaymentOptions } from "@/lib/utils/storeHelper"
import { useAppSelector } from "@/redux/hooks";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faSquareShareNodes } from '@fortawesome/free-solid-svg-icons'
import {  useRouter } from 'next/navigation';

const ProductDescriptionInfo = ({
  product,
  selectedProduct,
  setSelectedProduct,
  composeBase, 
  setComposeBase,
  additionalClassName, 
  node,
  props,
  detailPage,
}) => {
  const dispatch = useDispatch();
  const router = useRouter()

  const { cartProducts } = useSelector((state) => state.cart);
  const { store,  baseCurrency, exchangeRates } = useAppSelector((state) => state.estore);

  const [selectedVariantProduct, setSelectedVariantProduct] = useState(product.variant_products ? product.variant_products[0] : null);

  const [quantityCount, setQuantityCount] = useState(1);
  
  const [showShippingOptions, setShowShippingOptions] = useState(false);

  const [variant1, setVariant1] = useState(
    {type:null,values:[]}
  );
  const [variant2, setVariant2] = useState(
    {type:null,values:[]}
  );
  

  const [selectedValue1, setSelectedValue1] = useState((product?.variant_products||[]).length ? product?.variant_products?.[0]?.value1 : null);
  const [selectedValue2, setSelectedValue2] = useState((product?.variant_products||[]).length ? product?.variant_products?.[0]?.value2 : null);
  
  // const productCartQty = 0
  
  const [productCartQty, setProductCartQty] = useState(0);
  const [showComposeModal, setShowComposeModal] = useState(false)
  const [showAddonModal, setShowAddonModal] = useState(false)

  useEffect(()=>{
    const _cartProduct = cartProducts.find(cartProduct=>cartProduct?.product?.id==product.id && (cartProduct?.variant_product?.id||null)==(selectedVariantProduct?.id||null) && (cartProduct?.compose_base?.id||null) == (composeBase?.id||null)  )
    setProductCartQty(_cartProduct?.quantity||0)
  },[selectedVariantProduct, product, cartProducts, composeBase])

  useEffect(()=>{
    if(product?.type=='variant'){
      var _type1 = null 
      var _type2 = null
      const _values1 = []
      const _values2 = []

      product.variant_products.forEach(variantProduct => {

        if(variantProduct.type1){
          _type1 = variantProduct.type1
          _values1.push({'value':variantProduct.value1,'description':variantProduct?.value1_description,'price_description':variantProduct?.value1_price_description})
        }
        if(variantProduct.type2){
          _type2 = variantProduct.type2
          // _values2.push(variantProduct.value2)
          _values2.push({'value':variantProduct.value2,'description':variantProduct?.value2_description,'price_description':variantProduct?.value2_price_description})

        }
      });

      setVariant1({type:_type1, values:_values1})
      setVariant2({type:_type2, values:_values2})
    }
  },[product])

  // const productCartQty = 0
  // const productCartQty = getProductCartQuantity(
  //   cartItems,
  //   product,
  //   selectedProductColor,
  //   selectedProductSize
  // );

  // const now = new Date()
  const now = new Date().toJSON().slice(0, 10);

  const {shippingPriceMax, shippingPriceMin, pickupOptions, deliveryOptions} = getShippingPriceRangeOptions(store?.delivery_settings||{}, product?.tags||[])
  const paymentOptions = getPaymentOptions(store?.payment_settings||{})


  const handleBuy = (product)=>{
    if(product.type=='compose'){
      setShowComposeModal(true)
    }else{
      updateCartProduct(product, selectedVariantProduct, quantityCount, dispatch).then(()=>{
        setQuantityCount(1);
      }).then(()=>{
        setShowAddonModal(true)
      }).then(()=>{
        if(product?.single_page_product){
          router.push('/checkout')

        }
      })
    }
  }

  const priceOptionContext = (value)=>{
    return (
      <div className="size-name" style={{display:'flex', flexDirection:'row'}}>

        <div>
          <h3 style={{
            color:node?.data?.product_option_name_font_color?`rgba(${node?.data?.product_option_name_font_color.r}, ${node?.data?.product_option_name_font_color.g}, ${node?.data?.product_option_name_font_color.b}, ${node?.data?.product_option_name_font_color.a})`:'',
            fontSize:props?.productOptionNameFontSize||''

            }}>{value.value}</h3>
          {value?.description && <span className={style['description']}
            style={{
              top:props?.productOptionDescriptionTop||'',
              bottom:props?.productOptionDescriptionBottom||'',
              left:props?.productOptionDescriptionLeft||'',
              right:props?.productOptionDescriptionRight||'',
              transform:`translateX(${node?.data?.product_option_description_translate_x||0}%) translateY(${node?.data?.product_option_description_translate_y||0}%)`,
              color:node?.data?.product_option_description_font_color?`rgba(${node?.data?.product_option_description_font_color.r}, ${node?.data?.product_option_description_font_color.g}, ${node?.data?.product_option_description_font_color.b}, ${node?.data?.product_option_description_font_color.a})`:'',
              fontSize:props?.productOptionDescriptionFontSize||'',
              backgroundColor:node?.data?.product_option_description_background_color?`rgba(${node?.data?.product_option_description_background_color.r}, ${node?.data?.product_option_description_background_color.g}, ${node?.data?.product_option_description_background_color.b}, ${node?.data?.product_option_description_background_color.a})`:'',
            }}
          >{ value?.description}</span>}

        </div>

        {value?.price_description && <span className={style['price-description']} 
          style={{
            top:props?.productOptionPriceDescriptionTop||'',
            bottom:props?.productOptionPriceDescriptionBottom||'',
            left:props?.productOptionPriceDescriptionLeft||'',
            right:props?.productOptionPriceDescriptionRight||'',
            transform:`translateX(${node?.data?.product_option_price_description_translate_x||0}%) translateY(${node?.data?.product_option_price_description_translate_y||0}%)`,
            color:node?.data?.product_option_price_description_font_color?`rgba(${node?.data?.product_option_price_description_font_color.r}, ${node?.data?.product_option_price_description_font_color.g}, ${node?.data?.product_option_price_description_font_color.b}, ${node?.data?.product_option_price_description_font_color.a})`:'',
            fontSize:props?.productOptionPriceDescriptionFontSize||''
          }}>{'('+ value?.price_description+ ')'}</span>}

      </div>
    )
  }

  const productOptionStyle = {
    borderColor:node?.data?.product_option_border_color?`rgba(${node?.data?.product_option_border_color.r}, ${node?.data?.product_option_border_color.g}, ${node?.data?.product_option_border_color.b}, ${node?.data?.product_option_border_color.a})`:'',
    borderRadius:(node?.data?.product_option_border_radius||'')+(node?.data?.product_option_border_radius_unit||''),
    borderWidth:(node?.data?.product_option_border_width||'')+(node?.data?.product_option_border_width_unit||''),
    borderStyle:(node?.data?.product_option_border_style||''),

    boxShadow:
    `${node?.data?.product_option_shadow_offset_x?node?.data?.product_option_shadow_offset_x+'px':'0px'} 
    ${node?.data?.product_option_shadow_offset_y?node?.data?.product_option_shadow_offset_y+'px':'0px'} 
    ${node?.data?.product_option_shadow_blur_radius?node?.data?.product_option_shadow_blur_radius+'px':'0px'} 
    ${node?.data?.product_option_shadow_spread_radius?node?.data?.product_option_shadow_spread_radius+'px':'0px'} 
    ${node?.data?.product_option_shadow_color?rgba2hex(node?.data?.product_option_shadow_color?.r, node?.data?.product_option_shadow_color?.g, node?.data?.product_option_shadow_color?.b, node?.data?.product_option_shadow_color?.a):''}`,

    width:(node?.data?.product_option_width||'')+ (node?.data?.product_option_width?'%':''),
    height:props?.productOptionHeight||'',
    '--background-color-1':node?.data?.product_option_background_color?rgba2hex(node?.data?.product_option_background_color?.r, node?.data?.product_option_background_color?.g, node?.data?.product_option_background_color?.b, node?.data?.product_option_background_color?.a):'',
    '--background-color-2':node?.data?.product_option_background_color2?rgba2hex(node?.data?.product_option_background_color2?.r, node?.data?.product_option_background_color2?.g, node?.data?.product_option_background_color2?.b, node?.data?.product_option_background_color2?.a):'',
  }

  return (
    <div className={clsx("product-details-content", additionalClassName)}>
      <h2>{product.name}</h2>

      
      {/* <div className="product-details-price">
        {
          isDiscountApplied(product, now)? (
            <Fragment>
              <span>{(product?.currency_sign||'$') + (product?.type=='compose'?(composeBase?.discount_price||''):(selectedProduct?.discount_price||''))}</span>{" "}
              <span className="old">
                {(product?.currency_sign||'$') + (product?.type=='compose'?(composeBase?.price||''):(selectedProduct?.price||''))}
              </span>
            </Fragment>
          ) : (
            <span>{(product?.currency_sign||'$') + (product?.type=='compose'?(composeBase?.price||''):(selectedProduct?.price||''))}</span>
          )
        }
      </div>
       */}

      {product?.enable_review && (product?.stars_count||0) > 0 && 
        <div className="pro-details-rating-wrap">
          <div className="pro-details-rating">
            <Rating ratingValue={(product.stars_count||0)/(product?.reviews_count||1)} />
          </div>
        </div>
      }

      <div className="pro-details-list">
        {/* <p>{product.description}</p> */}
        <p dangerouslySetInnerHTML={{__html: (product?.description||'').replace(/\n/g, "<br />")}}/>
      </div>
      
      


      {/* 運費 */
        ((pickupOptions||[]).length>0 || (deliveryOptions||[]).length>0 )&& 
        <div className={style['support-shipping-row']}>
            <span className={style['label']}>運費</span>
            <span className={style['range']}
              onMouseEnter={()=>{setShowShippingOptions(true)}}
              onMouseLeave={()=>{setShowShippingOptions(false)}}
            >{`${store?.base_currency_sign||'$'}${shippingPriceMin?.toFixed(2)||0} - ${store?.base_currency_sign||'$'}${shippingPriceMax?.toFixed(2)||0}`}</span>
            <FontAwesomeIcon className={style['chevron-down']} icon={faChevronDown} />
                {showShippingOptions &&
                  <div className={style['options']} 
                  onMouseEnter={()=>{setShowShippingOptions(true)}}
                  onMouseLeave={()=>{setShowShippingOptions(false)}}>
                    
                    {
                      (pickupOptions||[]).length>0 && 
                      <Fragment>
                        <div className={style['label']}>自取</div>
                        {
                            (pickupOptions||[]).map((pickupOption, index)=>{
                              return (
                                <div key={index} className={style['option-row']}>
                                  <div>
                                    <div className={style['location']}>{pickupOption?.pickup_location}</div>
                                    <div className={style['address']}>{pickupOption?.pickup_address}</div>
                                  </div>
                                  
                                  <span className={style['price']}>{`${store?.base_currency_sign||'$'}0`}</span>
                                </div>
                              )}
                            )
                        }
                      </Fragment>
                    }

                    {
                      (deliveryOptions||[]).length>0 && 
                      <Fragment>
                        <div className={style['label']}>運送</div>
                        {
                            (deliveryOptions||[]).map((deliveryOption, index)=>{
                              return (
                                <div key={index} className={style['option-row']}>
                                  <span className={style['region']}>{deliveryOption?.region||''}</span>
                                  <span className={style['delivery-option-name']}>{deliveryOption?.delivery_option_name||''}</span>
                                  <span className={style['price']}>{`${deliveryOption?.shipping_fee_currency_sign||'$'}${deliveryOption?.shipping_fee||0}`}</span>
                                </div>
                              )}
                            )
                        }
                      </Fragment>
                    }


                  </div>
                }
        </div>
      }

      {/* 付款 */
        (paymentOptions||[]).length>0 &&
        <div className={style['support-payment-row']}>
            <span className={style['label']}>付款</span>
                { (paymentOptions||[]).map((paymentOption, index) => (<span key={index} className={style['option']}>{paymentOption}</span>))}

        </div>
      }


      {
        (product?.compose_bases||[]).length>0 &&
        <div className="pro-details-size-color">
          <div className="pro-details-size" >
              <span>任搭組數</span>
              <div className="pro-details-size-content">
                {(product?.compose_bases||[]).map((_composeBase, key) => {
                          return (
                            <label
                              className={clsx(`pro-details-size-content--single`, style['product-option'])}
                              key={key}
                              style={productOptionStyle}
                            >
                              <input
                                type="radio"
                                value={_composeBase.id}
                                checked={
                                  _composeBase.id === composeBase?.id
                                    ? "checked"
                                    : ""
                                }
                                onChange={(e) => {
                                  setComposeBase(_composeBase)
                                }}
                              />

                              {priceOptionContext({value:`任搭${_composeBase?.base||1}${product?.unit||'件'}`, description:_composeBase?.description, price_description:_composeBase?.price_description})}

                            </label>
                          );
                        })
                  }
              </div>
          </div>
        </div>
      }

      {(product?.variant_products||[]).length>0 && (
        <div className="pro-details-size-color">
          {
          variant1.type && variant1.values &&
          <div className="pro-details-size" >
            <span>{variant1.type}</span>
            <div className="pro-details-size-content">
              {variant1.values.map((value, key) => {
                        return (
                          <label
                            className={clsx(`pro-details-size-content--single`,style['product-option'])}
                            key={key}
                            style={productOptionStyle}
                            >
                            <input
                              type="radio"
                              value={value.value}
                              checked={
                                value.value === selectedValue1
                                  ? "checked"
                                  : ""
                              }
                              onChange={() => {
                                setSelectedValue1(value.value)
                                const variantProduct = product.variant_products.find(variantProduct=>variantProduct.value1==value.value&&variantProduct.value2==selectedValue2)
                                setSelectedVariantProduct(variantProduct)
                                setSelectedProduct(variantProduct)
                                setQuantityCount(1);
                              }}
                            />


                            {priceOptionContext(value)}
                          </label>
                        );
                      })
                }
            </div>
          </div>
          }
          {
          variant2.type && variant2.values &&
          <div className="pro-details-size" >
            <span>{variant2.type}</span>
            <div className="pro-details-size-content">
              {variant2.values.map((value, key) => {
                        return (
                          <label
                            className={clsx(`pro-details-size-content--single`,style['product-option'])}
                            key={key}
                            style={productOptionStyle}

                          >
                            <input
                              type="radio"
                              value={value.value}
                              checked={
                                value.value === selectedValue2
                                  ? "checked"
                                  : ""
                              }
                              onChange={() => {
                                setSelectedValue1(value)
                                const variantProduct = product.variant_products.find(variantProduct=>variantProduct.value1==selectedValue1&&variantProduct.value2==value.value)
                                setSelectedVariantProduct(variantProduct)
                                setSelectedProduct(variantProduct)
                                setQuantityCount(1);
                              }}
                            />

                            {priceOptionContext(value)}

                          </label>
                        );
                      })
                }
            </div>
          </div>
          }


        </div>
      )}

      {/* <div className="product-details-price" style={{marginTop:'25px', marginBottom:'5px'}}>
        {
          isDiscountApplied(product, now)? (
            <Fragment>
              <span>{(product?.currency_symbol||'$') + (product?.type=='compose'?(composeBase?.discount_price||''):(selectedProduct?.discount_price||''))}</span>{" "}
              <span className="old">
                {(product?.currency_symbol||'$') + (product?.type=='compose'?(composeBase?.price||''):(selectedProduct?.price||''))}
              </span>
            </Fragment>
          ) : (
            <span>{(product?.currency_symbol||'$') + (product?.type=='compose'?(composeBase?.price||''):(selectedProduct?.price||''))}</span>
          )
        }
      </div> */}
      


      <div className="product-details-price" style={{marginTop:'26px', marginBottom:'0px'}}>
        {
          isDiscountApplied(product, now)? (
            <Fragment>
              <span
                style={{ color:node?.data?.product_detail_price_font_color?`rgba(${node?.data?.product_detail_price_font_color.r}, ${node?.data?.product_detail_price_font_color.g}, ${node?.data?.product_detail_price_font_color.b}, ${node?.data?.product_detail_price_font_color.a})`:''}}
              >{(product?.currency_sign||'$') + (product?.type=='compose'?(composeBase?.discount_price||''):(selectedProduct?.discount_price||''))}</span>{" "}
              <span className="old">
                {(product?.currency_sign||'$') + (product?.type=='compose'?(composeBase?.price||''):(selectedProduct?.price||''))}
              </span>
            </Fragment>
          ) : (
            <span
              style={{ color:node?.data?.product_detail_price_font_color?`rgba(${node?.data?.product_detail_price_font_color.r}, ${node?.data?.product_detail_price_font_color.g}, ${node?.data?.product_detail_price_font_color.b}, ${node?.data?.product_detail_price_font_color.a})`:'' }}
            >{(product?.currency_sign||'$') + (product?.type=='compose'?(composeBase?.price||''):(selectedProduct?.price||''))}</span>
          )
        }
      </div>



      {
      // NO USE
      product.affiliateLink ? (
        <div className="pro-details-quality">
          <div className="pro-details-cart btn-hover ml-0">
            <a
              href={product.affiliateLink}
              rel="noopener noreferrer"
              target="_blank"
            >
              Buy Now
            </a>
          </div>
        </div>
      ) 
      // NO USE
      :
      
      
      (
        <div className="pro-details-quality" style={{marginTop:'20px'}}>

          {/* 加入商品數量 */}
          <div className="cart-plus-minus">
            <button
              onClick={() =>
                setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
              }
              className="dec qtybutton"
            >
              -
            </button>
            <input
              className="cart-plus-minus-box"
              type="text"
              value={quantityCount}
              readOnly
            />
            <button
              onClick={() =>
                setQuantityCount(
                  !selectedProduct.inventory_control || quantityCount < selectedProduct.inventory - productCartQty
                    ? quantityCount + 1
                    : quantityCount
                )
              }
              className="inc qtybutton"
            >
              +
            </button>

            {
              product.type!='assorted' && (product?.inventory_control || product?.stock?.inventory_control)  && 
              <div className={style['inventory-details-row']}>
                <span>{`還剩${product?.stock ? (product?.stock?.inventory_control||0) : (product?.inventory||0)}件`}</span>
              </div>
        
            }

          </div>
          {/* 加入商品數量 */}


          {/* 購物車動作 */}
          <div className="pro-details-cart btn-hover">
            { 
            selectedProduct?.stock  && (!selectedProduct?.stock?.inventory_control || (selectedProduct?.stock?.inventory||0) > 0) ?  
            
            (
              <button
                onClick={() =>{handleBuy(product)}}
                disabled={(selectedProduct?.stock?.inventory_control||false) && (productCartQty+quantityCount) > (selectedProduct.stock?.inventory||0)}
              >
                {product.type=='compose'? '搭配商品' : product?.single_page_product ? ' 購買 ': " 加入購物車 "}
              </button>
            )
            
            :  
            
            !selectedProduct?.inventory_control ||  (selectedProduct?.inventory||0) > 0 
            
            ? 
            
            (
              <button
                onClick={() =>{ handleBuy(product)}}
                disabled={(selectedProduct?.inventory_control||false) && (productCartQty+quantityCount) > (selectedProduct?.inventory||0)}
              >
                {product.type=='compose'? '搭配商品' :product?.single_page_product ? ' 購買 ': " 加入購物車 "}
              </button>
            ) : (
              <button disabled>{"  "}缺貨中{"  "}</button>
            )}
          </div>

          {
            detailPage && product.single_page_product &&
            <div className={style['fix-action']}>
              <button onClick={()=>{router.push('/my_orders')}}>訂單查詢</button>
              <div className={style['border']}></div>
              <button onClick={()=>{handleBuy(product)}}>立即下單</button>
            </div>
          }
          {/* 購物車動作 */}


          {/* 願望清單動作 */}
          {/* <div className="pro-details-wishlist">
            <button
              className={wishlistItem !== undefined ? "active" : ""}
              disabled={wishlistItem !== undefined}
              title={
                wishlistItem !== undefined
                  ? "Added to wishlist"
                  : "Add to wishlist"
              }
              onClick={() => dispatch(addToWishlist(product))}
            >
              <i className="pe-7s-like" />
            </button>
          </div>
          <div className="pro-details-compare">
            <button
              className={compareItem !== undefined ? "active" : ""}
              disabled={compareItem !== undefined}
              title={
                compareItem !== undefined
                  ? "Added to compare"
                  : "Add to compare"
              }
              onClick={() => dispatch(addToCompare(product))}
            >
              <i className="pe-7s-shuffle" />
            </button>
          </div> */}
        </div>
      )}

     

      {product?.category_name && (
        <div className="pro-details-meta">
          <span>商品類別 : {product.category_name}</span>
          
        </div>
      )}

      {(product?.tags||[]).length>0 && (
        <div className="pro-details-meta">
          <span>商品標籤 :</span>
          <ul>
            {(product?.tags||[]).map((tag, key) => {
              return (
                <li key={key}>
                  {tag}
                </li>
              );
            })}
          </ul>
        </div>
      )}


      <div className={style['share-row']}>
        <span className={style['label']}>分享 :</span>
        <FontAwesomeIcon className={style['share-icon']} icon={faSquareShareNodes} onClick={()=>{
          console.log(window.location.href)
          if (navigator.share) { 
            navigator.share({
               title: product?.name||'',
               url: window.location.href
             }).then(() => {
               cogoToast.success("分享成功", {position: "top-right"});
             })
             .catch(err=>{});
             } else {
              navigator.clipboard.writeText(window.location.href);
              cogoToast.success("已複製連結", {position: "top-right"});

             }
        }}/>

      </div>


      {/* <div className="pro-details-social">
        <ul>
          <li>
            <a href="//facebook.com">
              <i className="fa fa-facebook" />
            </a>
          </li>
          <li>
            <a href="//dribbble.com">
              <i className="fa fa-dribbble" />
            </a>
          </li>
          <li>
            <a href="//pinterest.com">
              <i className="fa fa-pinterest-p" />
            </a>
          </li>
          <li>
            <a href="//twitter.com">
              <i className="fa fa-twitter" />
            </a>
          </li>
          <li>
            <a href="//linkedin.com">
              <i className="fa fa-linkedin" />
            </a>
          </li>
        </ul>
      </div> */}

      { product?.type=='compose' &&
        <ComposeProductModal 
          show={showComposeModal} 
          onHide={()=>{setShowComposeModal(false)}}
          product={product}
          cartProduct={cartProducts.find(cartProduct=>(
                    cartProduct?.product?.id==product.id
                    &&
                    (cartProduct?.compose_base?.id||null)==(composeBase?.id||null)
            
          ))}
          composeBase={composeBase}
          quantityCount={quantityCount}
          updateCompose={false}
          
          setShowAddonModal = {setShowAddonModal}

          
        />
      }


      { (product?.addon_products||[]).length>0 &&
        <AddonProductsModal 
          show={showAddonModal} 
          onHide={()=>{setShowAddonModal(false)}}
          addonProductData = {(product?.addon_products||[]).map((_addonProduct)=>{return {'product':product, 'addonProduct':_addonProduct}}) }
          node={node}
          props={props}
          title='商品加價購'
          
        />
      }


      
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  product: PropTypes.shape({}),
  selectedProduct: PropTypes.object,
  setSelectedProduct: PropTypes.func,
};

export default ProductDescriptionInfo;
