// import { Fragment, useState } from "react";
// import PropTypes from "prop-types";
// import clsx from "clsx";

// // import { useDispatch } from "react-redux";
// import { useAppDispatch } from "@/redux/hooks";
// // import Rating from "./sub-components/ProductRating";
// // import { getDiscountPrice } from "../../helpers/product";
// // import ProductModal from "./ProductModal";
// // import { addToCart } from "../../store/slices/cart-slice";
// // import { addToWishlist } from "../../store/slices/wishlist-slice";
// import style from './ProductGridSingleKingPork.module.scss'
// import { isStockSufficient  } from "../../lib/utils/cartHelper";
// import { getPriceRange, isDiscountApplied } from "../../lib/utils/productHelper";
// // import { setCartProducts } from "../../store/slices/cart-slice";
// // import { customer_update_cart_product } from "../../api/cart";
// import cogoToast from 'cogo-toast';
// import { updateCartProduct } from "../../lib/utils/cartHelper";
// import ProductModal from "./ProductModal"
// import { rgba2hex } from "@/lib/utils/rgba2hex";

// import Link from "next/link";
// const ProductGridSingleKingPork = ({
//   product,
//   // currency,
//   cartProduct,
//   // wishlistItem,
//   // compareItem,
//   node,
//   props,
//   addon,
//   mainProduct,
//   cartAddonProduct,
// }) => {
//   const [modalShow, setModalShow] = useState(false);
//   // const discountedPrice = getDiscountPrice(product.price, product.discount);
//   // const finalProductPrice = +(product.price * currency.currencyRate).toFixed(2);
//   // const finalDiscountedPrice = +(
//   //   discountedPrice * currency.currencyRate
//   // ).toFixed(2);
//   const dispatch = useAppDispatch();
//   const now = new Date().toJSON().slice(0, 10);
//   const {sufficientStock, inventory} = isStockSufficient(cartProduct?.quantity, product)
//   const applyDiscount = isDiscountApplied(product, now)
//   const {originalMinimumPrice, originalMaximumPrice, discountMinimumPrice, discountMaximumPrice, discountMaximumPercent, discountMinimumPercent} = getPriceRange(product, now)


//   const [hoverAction, setHoverAction] = useState(false)
//   const [hoverQuickView, setHoverQuickView] = useState(false)
//   const [hoverName, setHoverName] = useState(false)


//   return (
//     <Fragment>
//       <div className={clsx(style["product-wrap"], 'mb-10')}>
//         <div className={style["product-img"]} 
//           style={{
//             // boxShadow:
//             // `${node?.data?.image_shadow_offset_x?node?.data?.image_shadow_offset_x+'px':'0px'} 
//             // ${node?.data?.image_shadow_offset_y?node?.data?.image_shadow_offset_y+'px':'0px'} 
//             // ${node?.data?.image_shadow_blur_radius?node?.data?.image_shadow_blur_radius+'px':'0px'} 
//             // ${node?.data?.image_shadow_spread_radius?node?.data?.image_shadow_spread_radius+'px':'0px'} 
//             // ${node?.data?.image_shadow_color?rgba2hex(node?.data?.image_shadow_color?.r, node?.data?.image_shadow_color?.g, node?.data?.image_shadow_color?.b, node?.data?.image_shadow_color?.a):''}`,
//           }}>
//           <a href={ addon?'#':"/product/" + product.uuid}>
//             <img
//               className={clsx(style["default-img"], "product-grid-single-img")}
//               src={product.images?.[0]?.image}
//               alt=""
//               style={{
//                 height:props?.imageHeight||'',
//                 borderColor:node?.data?.image_border_color?`rgba(${node?.data?.image_border_color.r}, ${node?.data?.image_border_color.g}, ${node?.data?.image_border_color.b}, ${node?.data?.image_border_color.a})`:'',
//                 borderRadius:(node?.data?.image_border_radius||'')+(node?.data?.image_border_radius_unit||''),
//                 borderWidth:(node?.data?.image_border_width||'')+(node?.data?.image_border_width_unit||''),
//                 borderStyle:(node?.data?.image_border_style||''),

//                 boxShadow:
//                 `${node?.data?.image_shadow_offset_x?node?.data?.image_shadow_offset_x+'px':'0px'} 
//                 ${node?.data?.image_shadow_offset_y?node?.data?.image_shadow_offset_y+'px':'0px'} 
//                 ${node?.data?.image_shadow_blur_radius?node?.data?.image_shadow_blur_radius+'px':'0px'} 
//                 ${node?.data?.image_shadow_spread_radius?node?.data?.image_shadow_spread_radius+'px':'0px'} 
//                 ${node?.data?.image_shadow_color?rgba2hex(node?.data?.image_shadow_color?.r, node?.data?.image_shadow_color?.g, node?.data?.image_shadow_color?.b, node?.data?.image_shadow_color?.a):''}`,

//               }}
//             />
//             {product.images.length > 1 ? (
//               <img
//                 className={style["hover-img"]}
//                 src={product.images?.[1]?.image}
//                 alt=""

//                 style={{
//                   height:props?.imageHeight||'',
//                   borderColor:node?.data?.image_border_color?`rgba(${node?.data?.image_border_color.r}, ${node?.data?.image_border_color.g}, ${node?.data?.image_border_color.b}, ${node?.data?.image_border_color.a})`:'',
//                   borderRadius:(node?.data?.image_border_radius||'')+(node?.data?.image_border_radius_unit||''),
//                   borderWidth:(node?.data?.image_border_width||'')+(node?.data?.image_border_width_unit||''),
//                   borderStyle:(node?.data?.image_border_style||''),

//                   boxShadow:
//                   `${node?.data?.image_shadow_offset_x?node?.data?.image_shadow_offset_x+'px':'0px'} 
//                   ${node?.data?.image_shadow_offset_y?node?.data?.image_shadow_offset_y+'px':'0px'} 
//                   ${node?.data?.image_shadow_blur_radius?node?.data?.image_shadow_blur_radius+'px':'0px'} 
//                   ${node?.data?.image_shadow_spread_radius?node?.data?.image_shadow_spread_radius+'px':'0px'} 
//                   ${node?.data?.image_shadow_color?rgba2hex(node?.data?.image_shadow_color?.r, node?.data?.image_shadow_color?.g, node?.data?.image_shadow_color?.b, node?.data?.image_shadow_color?.a):''}`,

//                 }}
//               />
//             ) : (
//               ""
//             )}
//           </a>


//           <div className={style["product-img-badges"]}>
//             { product?.new_product && <span className={style["purple"]}
//                style={{
//                 color:node?.data?.new_product_font_color?`rgba(${node?.data?.new_product_font_color.r}, ${node?.data?.new_product_font_color.g}, ${node?.data?.new_product_font_color.b}, ${node?.data?.new_product_font_color.a})`:'',
//                 backgroundColor:node?.data?.new_product_badge_color?`rgba(${node?.data?.new_product_badge_color.r}, ${node?.data?.new_product_badge_color.g}, ${node?.data?.new_product_badge_color.b}, ${node?.data?.new_product_badge_color.a})`:'',
//               }}
//             >新品</span> }
//             { (applyDiscount ) && <span className={style["pink"]} 
//               style={{
//                 color:node?.data?.discount_percent_font_color?`rgba(${node?.data?.discount_percent_font_color.r}, ${node?.data?.discount_percent_font_color.g}, ${node?.data?.discount_percent_font_color.b}, ${node?.data?.discount_percent_font_color.a})`:'',
//                 backgroundColor:node?.data?.discount_percent_badge_color?`rgba(${node?.data?.discount_percent_badge_color.r}, ${node?.data?.discount_percent_badge_color.g}, ${node?.data?.discount_percent_badge_color.b}, ${node?.data?.discount_percent_badge_color.a})`:'',
//               }}
//               >
//               {
//                 ['compose', 'variant'].includes(product.type) 
//                 ?
//                 `-${discountMinimumPercent}%~-${discountMaximumPercent}%`
//                 :
//                 `-${parseInt((((product?.price||0) - (product?.discount_price||0))/(product?.price||999999999999999))*100)}%`

//               }
//             </span>}
//           </div>
          
//           {!addon && 
//           <div className={style["product-action"]} 
//             style={{
//               borderBottomLeftRadius:(node?.data?.image_border_radius||'')+(node?.data?.image_border_radius_unit||''),
//               borderBottomRightRadius:(node?.data?.image_border_radius||'')+(node?.data?.image_border_radius_unit||''),
//             }}
            
//             >


//             <div className={clsx(style["pro-same-action"],style["pro-wishlist"])}
            
//             style={{

//               backgroundColor:node?.data?.action_background_color?`rgba(${node?.data?.action_background_color.r}, ${node?.data?.action_background_color.g}, ${node?.data?.action_background_color.b}, ${node?.data?.action_background_color.a})`:'',
//               fontSize:props?.actionFontSize||'',
//               color:node?.data?.action_font_color?`rgba(${node?.data?.action_font_color.r}, ${node?.data?.action_font_color.g}, ${node?.data?.action_font_color.b}, ${node?.data?.action_font_color.a})`:'',
//               fontFamily:node?.data?.action_font_family||'',
//               fontWeight:node?.data?.action_font_weight||'',
//             }}
//             >
//               {/* <button
//                 className={wishlistItem !== undefined ? "active" : ""}
//                 disabled={wishlistItem !== undefined}
//                 title={
//                   wishlistItem !== undefined
//                     ? "Added to wishlist"
//                     : "Add to wishlist"
//                 }
//                 onClick={() => dispatch(addToWishlist(product))}
//               >
//                 <i className="pe-7s-like" />
//               </button> */}
//             </div>


            
//               <div className={clsx(style["pro-same-action"], style["pro-cart"])}
//                 onMouseEnter={()=>{setHoverAction(true)}}
//                 onMouseLeave={()=>{setHoverAction(false)}}
//               style={{
//                 backgroundColor:node?.data?.action_background_color?`rgba(${node?.data?.action_background_color.r}, ${node?.data?.action_background_color.g}, ${node?.data?.action_background_color.b}, ${node?.data?.action_background_color.a})`:'',
//               }}
//               >
//                 {
                
                
//                   ['compose', 'variant'].includes(product.type) 
//                   ?
//                   (
//                     <Link href={`/product/${product.uuid}`} style={{
//                       backgroundColor:
//                         hoverAction
//                         ?
//                         node?.data?.action_background_color2?`rgba(${node?.data?.action_background_color2.r}, ${node?.data?.action_background_color2.g}, ${node?.data?.action_background_color2.b}, ${node?.data?.action_background_color2.a})`:''
//                         :
//                         ''
//                       ,
//                       fontSize:props?.actionFontSize||'',
//                       color:node?.data?.action_font_color?`rgba(${node?.data?.action_font_color.r}, ${node?.data?.action_font_color.g}, ${node?.data?.action_font_color.b}, ${node?.data?.action_font_color.a})`:'',
//                       fontFamily:node?.data?.action_font_family||'',
//                       fontWeight:node?.data?.action_font_weight||'',

//                     }}>
//                       {" "}
//                       <i className="pe-7s-cart" style={{
//                         color:node?.data?.font_color3?`rgba(${node?.data?.font_color3.r}, ${node?.data?.font_color3.g}, ${node?.data?.font_color3.b}, ${node?.data?.font_color3.a})`:'',
//                       }}/>
//                       {" "}
//                       <span>去逛逛</span>
//                     </Link>
//                   ) 
//                   :
//                   sufficientStock ? (
//                   <button
//                     style={{
//                       backgroundColor:
//                         hoverAction
//                         ?
//                         node?.data?.action_background_color2?`rgba(${node?.data?.action_background_color2.r}, ${node?.data?.action_background_color2.g}, ${node?.data?.action_background_color2.b}, ${node?.data?.action_background_color2.a})`:''
//                         :
//                         ''
//                       ,

//                       fontSize:props?.actionFontSize||'',
//                       color:node?.data?.action_font_color?`rgba(${node?.data?.action_font_color.r}, ${node?.data?.action_font_color.g}, ${node?.data?.action_font_color.b}, ${node?.data?.action_font_color.a})`:'',
//                       fontFamily:node?.data?.action_font_family||'',
//                       fontWeight:node?.data?.action_font_weight||'',
//                     }}
//                     onClick={() => {
//                       updateCartProduct(product, null, 1, dispatch)
//                     }}
//                     disabled={cartProduct !== undefined && cartProduct.quantity > 0}
//                     title={cartProduct !== undefined ? "已加入購物車" : "加入購物車"}
//                   >
//                     {" "}
//                     <i className="pe-7s-cart" style={{
//                       color:node?.data?.font_color3?`rgba(${node?.data?.font_color3.r}, ${node?.data?.font_color3.g}, ${node?.data?.font_color3.b}, ${node?.data?.font_color3.a})`:'',
//                     }}></i>{" "}

//                     {cartProduct !== undefined && cartProduct.quantity > 0
//                       ? <span>已加入購物車</span>
//                       : <span>加入購物車</span>}
//                   </button>
//                 ) : (
//                   <button disabled  style={{
//                     backgroundColor:
//                         hoverAction
//                         ?
//                         node?.data?.action_background_color2?`rgba(${node?.data?.action_background_color2.r}, ${node?.data?.action_background_color2.g}, ${node?.data?.action_background_color2.b}, ${node?.data?.action_background_color2.a})`:''
//                         :
//                         ''
//                     ,
//                     fontSize:props?.actionFontSize||'',
//                     color:node?.data?.action_font_color?`rgba(${node?.data?.action_font_color.r}, ${node?.data?.action_font_color.g}, ${node?.data?.action_font_color.b}, ${node?.data?.action_font_color.a})`:'',
//                     fontFamily:node?.data?.action_font_family||'',
//                     fontWeight:node?.data?.action_font_weight||'',
//                                     }}>
//                     缺貨中
//                   </button>
//                 )}




//               </div>
            
//             <div className={clsx(style["pro-same-action"],style["pro-quickview"])}
//               onMouseEnter={()=>{setHoverQuickView(true)}}
//               onMouseLeave={()=>{setHoverQuickView(false)}}
//               style={{
//                 backgroundColor:node?.data?.action_background_color?`rgba(${node?.data?.action_background_color.r}, ${node?.data?.action_background_color.g}, ${node?.data?.action_background_color.b}, ${node?.data?.action_background_color.a})`:'',
//               }}
            
//             >
//               <button title="快速瀏覽" onClick={() => setModalShow(true)}
//                 style={{
//                   backgroundColor:
//                     hoverQuickView
//                     ?
//                     node?.data?.action_background_color2?`rgba(${node?.data?.action_background_color2.r}, ${node?.data?.action_background_color2.g}, ${node?.data?.action_background_color2.b}, ${node?.data?.action_background_color2.a})`:''
//                     :
//                     ''
//                 }}
              
//               >
//                 <i className="pe-7s-look" style={{
//                   color:node?.data?.action_font_color?`rgba(${node?.data?.action_font_color.r}, ${node?.data?.action_font_color.g}, ${node?.data?.action_font_color.b}, ${node?.data?.action_font_color.a})`:'',
//                 }}/>
//               </button>
//             </div>
            
//           </div>
//           }
//         </div>

//         <div className={clsx(style["product-content"],"text-center")}>
//           <h3>
//             <a href={addon?'#':"/product/" + product.uuid} 
//               onMouseEnter={()=>{setHoverName(true)}}
//               onMouseLeave={()=>{setHoverName(false)}}
//               className={style["product-name"]}
//               style={{
//                 fontSize:props?.productNameFontSize||'',
//                 color:
//                   hoverName
//                   ?
//                   node?.data?.product_name_font_color2?`rgba(${node?.data?.product_name_font_color2.r}, ${node?.data?.product_name_font_color2.g}, ${node?.data?.product_name_font_color2.b}, ${node?.data?.product_name_font_color2.a})`:''
//                   :
//                   node?.data?.product_name_font_color?`rgba(${node?.data?.product_name_font_color.r}, ${node?.data?.product_name_font_color.g}, ${node?.data?.product_name_font_color.b}, ${node?.data?.product_name_font_color.a})`:''
//                 ,
//                 fontFamily:node?.data?.product_name_font_family||'',
//                 fontWeight:node?.data?.product_name_font_weight||'',
//               }}
//             >
//               {product.name}
//             </a>
//           </h3>
//           {/* {product.rating && product.rating > 0 ? (
//             <div className="product-rating">
//               <Rating ratingValue={product.rating} />
//             </div>
//           ) : (
//             ""
//           )} */}
//           <div className={style["product-price"]}>
//             {applyDiscount 
//             ? 
//             <Fragment>
//               {
//                 ['variant', 'compose'].includes(product.type)
//                 ?
//                 <Fragment>
//                   {/* <span>asdfasdf</span> */}
//                   <span style={{

//                     fontSize:props?.priceFontSize||'',
//                     color:node?.data?.price_font_color?`rgba(${node?.data?.price_font_color.r}, ${node?.data?.price_font_color.g}, ${node?.data?.price_font_color.b}, ${node?.data?.price_font_color.a})`:'',
//                     fontFamily:node?.data?.price_font_family||'',
//                     fontWeight:node?.data?.price_font_weight||'',
//                     lineHeight:props?.priceLineHeight||''
//                   }}
//                   >
//                       {(product?.currency_sign||'$') + discountMinimumPrice}  ~  {(product?.currency_sign||'$') + discountMaximumPrice}
//                   </span>
//                   <span className={style["old"]} style={{
//                     fontSize:props?.oldPriceFontSize||'',
//                     color:node?.data?.old_price_font_color?`rgba(${node?.data?.old_price_font_color.r}, ${node?.data?.old_price_font_color.g}, ${node?.data?.old_price_font_color.b}, ${node?.data?.old_price_font_color.a})`:'',
//                     fontFamily:node?.data?.old_price_font_family||'',
//                     fontWeight:node?.data?.old_price_font_weight||'',
//                     lineHeight:props?.oldPriceLineHeight||''

//                   }}
//                   >
//                     {(product?.currency_sign||'$') + originalMinimumPrice}  ~  {(product?.currency_sign||'$') + originalMaximumPrice}
//                   </span>
//                 </Fragment>
//                 :
//                 <Fragment>
//                   <span style={{
//                     fontSize:props?.priceFontSize||'',
//                     color:node?.data?.price_font_color?`rgba(${node?.data?.price_font_color.r}, ${node?.data?.price_font_color.g}, ${node?.data?.price_font_color.b}, ${node?.data?.price_font_color.a})`:'',
//                     fontFamily:node?.data?.price_font_family||'',
//                     fontWeight:node?.data?.price_font_weight||'',
//                     lineHeight:props?.priceLineHeight||''

//                   }}
//                   >
//                     {(product?.currency_sign||'$') + product.discount_price} 
//                   </span>
//                   <span className={style["old"]} style={{
//                     fontSize:props?.oldPriceFontSize||'',
//                     color:node?.data?.old_price_font_color?`rgba(${node?.data?.old_price_font_color.r}, ${node?.data?.old_price_font_color.g}, ${node?.data?.old_price_font_color.b}, ${node?.data?.old_price_font_color.a})`:'',
//                     fontFamily:node?.data?.old_price_font_family||'',
//                     fontWeight:node?.data?.old_price_font_weight||'',
//                     lineHeight:props?.oldPriceLineHeight||''
//                   }}
//                   >
//                     {(product?.currency_sign||'$') + product.price} 
//                   </span>

//                 </Fragment>
//               }
//             </Fragment>
//             :
//             <Fragment>
//               {
//                 ['variant', 'compose'].includes(product.type)
//                 ?
//                 // <span>{originalMinimumPrice}</span>
//                 <span
//                 style={{
//                   fontSize:props?.priceFontSize||'',
//                   color:node?.data?.price_font_color?`rgba(${node?.data?.price_font_color.r}, ${node?.data?.price_font_color.g}, ${node?.data?.price_font_color.b}, ${node?.data?.price_font_color.a})`:'',
//                   fontFamily:node?.data?.price_font_family||'',
//                   fontWeight:node?.data?.price_font_weight||'',
//                   lineHeight:props?.priceLineHeight||''

//                 }}
//                 >{(product?.currency_sign||'$') + originalMinimumPrice}  ~  {(product?.currency_sign||'$') + originalMaximumPrice}</span>
//                 :
//                 // <span>1234asdfasdf</span>

//                 <span style={{
//                   fontSize:props?.priceFontSize||'',
//                   color:node?.data?.price_font_color?`rgba(${node?.data?.price_font_color.r}, ${node?.data?.price_font_color.g}, ${node?.data?.price_font_color.b}, ${node?.data?.price_font_color.a})`:'',
//                   fontFamily:node?.data?.price_font_family||'',
//                   fontWeight:node?.data?.price_font_weight||'',
//                   lineHeight:props?.priceLineHeight||''

//                 }}>{(product?.currency_sign||'$') + product.price} </span>
//               }
//             </Fragment>
//             }
//           </div>
          

//           {
//             addon &&
//             <button className={style["addon-button"]}
//               onClick={(e)=>{
//                 updateCartProduct(mainProduct, null, 0, dispatch, null, null, null, product, 1)


//                 console.log(mainProduct)
//                 console.log(product)
//               }}
//             >
//                 {" "}
//                 <i className="pe-7s-cart" style={{
//                   color:node?.data?.font_color3?`rgba(${node?.data?.font_color3.r}, ${node?.data?.font_color3.g}, ${node?.data?.font_color3.b}, ${node?.data?.font_color3.a})`:'',
//                 }}/>
//                 {" "}
//                 {
//                   ((cartAddonProduct?.quantity||0)>=(cartProduct?.quantity||1))? '已達加購上限': '加購'
//                 }
//             </button>
//           }

//         </div>
//       </div>

//       {/* product modal */}
//       <ProductModal
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//         product={product}
//         cartProduct={cartProduct}
//         node={node}
//         props={props}
//         // currency={currency}
//         // discountedPrice={discountedPrice}
//         // finalProductPrice={finalProductPrice}
//         // finalDiscountedPrice={finalDiscountedPrice}
//         // wishlistItem={wishlistItem}
//         // compareItem={compareItem}
//       />

//     </Fragment>
//   );
// };

// ProductGridSingleKingPork.propTypes = {


// };

// export default ProductGridSingleKingPork;
