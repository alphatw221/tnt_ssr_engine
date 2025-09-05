// import { Fragment, useState } from "react";
// import PropTypes from "prop-types";
// import clsx from "clsx";
// // //import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// // import Rating from "./sub-components/ProductRating";
// // import { getDiscountPrice } from "../../helpers/product";
// // import ProductModal from "./ProductModal";
// // import { addToCart } from "../../store/slices/cart-slice";
// // import { addToWishlist } from "../../store/slices/wishlist-slice";
// import style from './ProductListSingleKingPork.module.scss'
// import { isStockSufficient  } from "../../lib/utils/cartHelper";
// import { getPriceRange, isDiscountApplied } from "../../lib/utils/productHelper";
// // import { customer_update_cart_product } from "../../api/cart";
// import cogoToast from 'cogo-toast';
// import { updateCartProduct } from "../../lib/utils/cartHelper";

// const ProductListSingleKingPork = ({
//   product,
//   cartProduct,
//   node,
//   props,
//   cartAddonProduct,
//   addon,
// }) => {


//   const [modalShow, setModalShow] = useState(false);

//   const dispatch = useDispatch();
  
//   const now = new Date().toJSON().slice(0, 10);
//   const {sufficientStock, inventory} = isStockSufficient(cartProduct?.quantity, product)
//   const applyDiscount = isDiscountApplied(product, now)
//   const {originalMinimumPrice, originalMaximumPrice, discountMinimumPrice, discountMaximumPrice, discountMinimumPercent, discountMaximumPercent} = getPriceRange(product, now)


//   const [hoverAction, setHoverAction] = useState(false)
//   const [hoverQuickView, setHoverQuickView] = useState(false)
//   const [hoverName, setHoverName] = useState(false)


//   return (
//     <Fragment>
      




      
//         <div className={clsx(style["shop-list-wrap"], "mb-60")}>
//           <div className="row">
//             <div className="col-xl-4 col-md-5 col-sm-6">
//               <div className={style["product-list-image-wrap"]}>
//                 <div className={style["product-img"]}>
//                   <a href={addon?"#":"/product/" + product.uuid}>
//                     <img
//                       className={clsx(style["default-img"], "img-fluid")}
//                       src={product.images?.[0].image}
//                       alt=""
//                       style={{
//                         // height:props?.height||'',

//                         borderColor:node?.data?.image_border_color?`rgba(${node?.data?.image_border_color.r}, ${node?.data?.image_border_color.g}, ${node?.data?.image_border_color.b}, ${node?.data?.image_border_color.a})`:'',
//                         borderRadius:(node?.data?.image_border_radius||'')+(node?.data?.image_border_radius_unit||''),
//                         borderWidth:(node?.data?.image_border_width||'')+(node?.data?.image_border_width_unit||''),
//                         borderStyle:(node?.data?.image_border_style||'')



//                       }}
//                     />
//                     {product.images.length > 1 ? (
//                       <img
//                         className={clsx(style["hover-img"] ,"img-fluid")}
//                         src={product.images?.[1]?.image}
//                         alt=""

//                         style={{
//                           // height:props?.height||'',

//                           borderColor:node?.data?.image_border_color?`rgba(${node?.data?.image_border_color.r}, ${node?.data?.image_border_color.g}, ${node?.data?.image_border_color.b}, ${node?.data?.image_border_color.a})`:'',
//                           borderRadius:(node?.data?.image_border_radius||'')+(node?.data?.image_border_radius_unit||''),
//                           borderWidth:(node?.data?.image_border_width||'')+(node?.data?.image_border_width_unit||''),
//                           borderStyle:(node?.data?.image_border_style||'')




//                         }}
//                       />
//                     ) : (
//                       ""
//                     )}
//                   </a>


//                   {/* <div className={style["product-img-badges"]}>
//                     { product?.new_product && <span className={style["purple"]}>新品</span> }
//                     { (applyDiscount ) && <span className={style["pink"]}>
//                       -{parseInt((((product?.price||0) - (product?.discount_price||0))/(product?.price||999999999999999))*100)}%
//                     </span>}
//                   </div> */}

//                   <div className={style["product-img-badges"]}>
//                     { product?.new_product && <span className={style["purple"]}>新品</span> }
//                     { (applyDiscount ) && <span className={style["pink"]}>
//                       {
//                         ['compose', 'variant'].includes(product.type) 
//                         ?
//                         `-${discountMinimumPercent}%~-${discountMaximumPercent}%`
//                         :
//                         `-${parseInt((((product?.price||0) - (product?.discount_price||0))/(product?.price||999999999999999))*100)}%`

//                       }
//                     </span>}
//                   </div>


//                 </div>
//               </div>
//             </div>






//             <div className="col-xl-8 col-md-7 col-sm-6">
//               <div className={style["shop-list-content"]}>
//                 <h3 className={style["product-list-name"]}>
//                   <a href={addon?"#":"/product/" + product.uuid}

//                     onMouseEnter={()=>{setHoverName(true)}}
//                     onMouseLeave={()=>{setHoverName(false)}}
//                     style={{


//                       fontSize:props?.productNameFontSize||'',
//                       color:
//                         hoverName
//                         ?
//                         node?.data?.product_name_font_color2?`rgba(${node?.data?.product_name_font_color2.r}, ${node?.data?.product_name_font_color2.g}, ${node?.data?.product_name_font_color2.b}, ${node?.data?.product_name_font_color2.a})`:''
//                         :
//                         node?.data?.product_name_font_color?`rgba(${node?.data?.product_name_font_color.r}, ${node?.data?.product_name_font_color.g}, ${node?.data?.product_name_font_color.b}, ${node?.data?.product_name_font_color.a})`:''
//                       ,                      
//                       fontFamily:node?.data?.product_name_font_family||'',
//                       fontWeight:node?.data?.product_name_font_weight||'',

//                     }}
                  
//                   >
//                     {product.name}
//                   </a>
//                 </h3>
//                 <div className={style["product-list-price"]} 
//                   style={{
//                     lineHeight:props?.priceLineHeight||''
//                   }}
//                 >
//                   {applyDiscount 
//                     ? 
//                     <Fragment>
//                       {
//                         ['compose','variant'].includes(product.type)
//                         ?
//                         <Fragment>

//                           <span style={{
//                             fontSize:props?.priceFontSize||'',
//                             color:node?.data?.price_font_color?`rgba(${node?.data?.price_font_color.r}, ${node?.data?.price_font_color.g}, ${node?.data?.price_font_color.b}, ${node?.data?.price_font_color.a})`:'',
//                             fontFamily:node?.data?.price_font_family||'',
//                             fontWeight:node?.data?.price_font_weight||'',
//                             lineHeight:props?.priceLineHeight||''


//                         }}>{(product?.currency_sign||'$') + discountMinimumPrice}  ~  {(product?.currency_sign||'$') + discountMaximumPrice}</span>
//                           <span className={style["old"]} style={{
//                             fontSize:props?.priceFontSize||'',
//                             color:node?.data?.price_font_color?`rgba(${node?.data?.price_font_color.r}, ${node?.data?.price_font_color.g}, ${node?.data?.price_font_color.b}, ${node?.data?.price_font_color.a})`:'',
//                             fontFamily:node?.data?.price_font_family||'',
//                             fontWeight:node?.data?.price_font_weight||'',  
//                             lineHeight:props?.oldPriceLineHeight||''
//                           }}>{(product?.currency_sign||'$') + originalMinimumPrice}  ~  {(product?.currency_sign||'$') + originalMaximumPrice}</span>
//                         </Fragment>
//                         :
//                         <Fragment>
//                         <span style={{
//                             fontSize:props?.priceFontSize||'',
//                             color:node?.data?.price_font_color?`rgba(${node?.data?.price_font_color.r}, ${node?.data?.price_font_color.g}, ${node?.data?.price_font_color.b}, ${node?.data?.price_font_color.a})`:'',
//                             fontFamily:node?.data?.price_font_family||'',
//                             fontWeight:node?.data?.price_font_weight||'',   
//                             lineHeight:props?.priceLineHeight||''
                    
//                           }}>{(product?.currency_sign||'$') + product.discount_price} </span>
//                         <span className={style["old"]} style={{
//                             fontSize:props?.priceFontSize||'',
//                             color:node?.data?.price_font_color?`rgba(${node?.data?.price_font_color.r}, ${node?.data?.price_font_color.g}, ${node?.data?.price_font_color.b}, ${node?.data?.price_font_color.a})`:'',
//                             fontFamily:node?.data?.price_font_family||'',
//                             fontWeight:node?.data?.price_font_weight||'',
//                             lineHeight:props?.oldPriceLineHeight||''

//                         }}>{(product?.currency_sign||'$') + product.price} </span>

//                         </Fragment>
//                       }
//                     </Fragment>
//                     :
//                     <Fragment>
//                       {
//                         ['compose','variant'].includes(product.type)
//                         ?

//                         <span
//                         style={{
//                           fontSize:props?.priceFontSize||'',
//                           color:node?.data?.price_font_color?`rgba(${node?.data?.price_font_color.r}, ${node?.data?.price_font_color.g}, ${node?.data?.price_font_color.b}, ${node?.data?.price_font_color.a})`:'',
//                           fontFamily:node?.data?.price_font_family||'',
//                           fontWeight:node?.data?.price_font_weight||'',
//                           lineHeight:props?.priceLineHeight||''

//                         }}
//                         >{(product?.currency_sign||'$') + originalMinimumPrice}  ~  {(product?.currency_sign||'$') + originalMaximumPrice}</span>
//                         :


//                         <span style={{
//                           fontSize:props?.priceFontSize||'',
//                           color:node?.data?.price_font_color?`rgba(${node?.data?.price_font_color.r}, ${node?.data?.price_font_color.g}, ${node?.data?.price_font_color.b}, ${node?.data?.price_font_color.a})`:'',
//                           fontFamily:node?.data?.price_font_family||'',
//                           fontWeight:node?.data?.price_font_weight||'',
//                           lineHeight:props?.priceLineHeight||''

//                         }}>{(product?.currency_sign||'$') + product.price} </span>
//                       }
//                     </Fragment>
//                   }
//                 </div>



//                 {/* {product.rating && product.rating > 0 ? (
//                   <div className="rating-review">
//                     <div className="product-list-rating">
//                       <Rating ratingValue={product.rating} />
//                     </div>
//                   </div>
//                 ) : (
//                   ""
//                 )} */}



//                 {product.description ? (
//                   <p
//                   style={{
//                     fontSize:props?.descriptionFontSize||'',
//                     color:node?.data?.description_font_color?`rgba(${node?.data?.description_font_color.r}, ${node?.data?.description_font_color.g}, ${node?.data?.description_font_color.b}, ${node?.data?.description_font_color.a})`:'',
//                     fontFamily:node?.data?.description_font_family||'',
//                     fontWeight:node?.data?.description_font_weight||'',
//                   }}
//                   dangerouslySetInnerHTML={{__html: (product?.description||'')?.replace(/\n/g, "<br />")||''}}
//                   />
//                 ) : (
//                   ""
//                 )}

//                 <div className={clsx(style["shop-list-actions"], "d-flex", "align-items-center")}>
//                   <div className={clsx(style["shop-list-btn"],)}>

//                   {
              
              
//                       ['compose', 'variant'].includes(product.type) 
//                       ?
//                       (
//                         <a href={`/product/${product.uuid}`} 
//                         onMouseEnter={()=>{setHoverAction(true)}}
//                         onMouseLeave={()=>{setHoverAction(false)}}
//                         style={{
//                           backgroundColor:
//                             hoverAction
//                             ?
//                             node?.data?.action_background_color2?`rgba(${node?.data?.action_background_color2.r}, ${node?.data?.action_background_color2.g}, ${node?.data?.action_background_color2.b}, ${node?.data?.action_background_color2.a})`:''
//                             :
//                             node?.data?.action_background_color?`rgba(${node?.data?.action_background_color.r}, ${node?.data?.action_background_color.g}, ${node?.data?.action_background_color.b}, ${node?.data?.action_background_color.a})`:''
//                           ,
//                           fontSize:props?.actionFontSize||'',
//                           color:node?.data?.action_font_color?`rgba(${node?.data?.action_font_color.r}, ${node?.data?.action_font_color.g}, ${node?.data?.action_font_color.b}, ${node?.data?.action_font_color.a})`:'',
//                           fontFamily:node?.data?.action_font_family||'',
//                           fontWeight:node?.data?.action_font_weight||'',

//                         }}>
//                           去逛逛
//                         </a>
//                       ) 
//                       :
//                       sufficientStock ? (
//                       <button
//                         onMouseEnter={()=>{setHoverAction(true)}}
//                         onMouseLeave={()=>{setHoverAction(false)}}

//                         style={{
//                           backgroundColor:
//                             hoverAction
//                             ?
//                             node?.data?.action_background_color2?`rgba(${node?.data?.action_background_color2.r}, ${node?.data?.action_background_color2.g}, ${node?.data?.action_background_color2.b}, ${node?.data?.action_background_color2.a})`:''
//                             :
//                             node?.data?.action_background_color?`rgba(${node?.data?.action_background_color.r}, ${node?.data?.action_background_color.g}, ${node?.data?.action_background_color.b}, ${node?.data?.action_background_color.a})`:''
//                           ,                          
//                           fontSize:props?.actionFontSize||'',
//                           color:node?.data?.action_font_color?`rgba(${node?.data?.action_font_color.r}, ${node?.data?.action_font_color.g}, ${node?.data?.action_font_color.b}, ${node?.data?.action_font_color.a})`:'',
//                           fontFamily:node?.data?.action_font_family||'',
//                           fontWeight:node?.data?.action_font_weight||'',
//                         }}
//                         onClick={() => {
//                           if(addon){

//                           }else{
//                             updateCartProduct(product, null, 1, dispatch)
//                           }
//                         }}
//                         disabled={

//                           addon ? (((cartAddonProduct?.quantity||0)>=(cartProduct?.quantity||1))? true: false)
//                           :
//                           (cartProduct?.quantity)?true:false
                          



//                           // (cartProduct !== undefined && cartProduct.quantity > 0) || (addon && (cartProduct?.cart_addon_product.quantity||0)>=cartProduct.quantity)
                        
                        
                        
//                         }
//                         title={

//                           addon ? (((cartAddonProduct?.quantity||0)>=(cartProduct?.quantity||1))? '已加入購物車': '加購')
//                           :
//                           (cartProduct?.quantity)?'已加入購物車':'加入購物車'
                          





//                           // cartProduct !== undefined ? "已加入購物車" : addon? "加購" : "加入購物車"
//                         }
//                       >
//                         {" "}
//                         <i className="pe-7s-cart" style={{
//                           color:node?.data?.font_color3?`rgba(${node?.data?.font_color3.r}, ${node?.data?.font_color3.g}, ${node?.data?.font_color3.b}, ${node?.data?.font_color3.a})`:'',
//                         }}></i>{" "}
//                         {
//                             addon ? (((cartAddonProduct?.quantity||0)>=(cartProduct?.quantity||1))? '已加入購物車': '加購')
//                             :
//                             (cartProduct?.quantity)?'已加入購物車':'加入購物車'
                        
                        
//                         // cartProduct !== undefined && cartProduct.quantity > 0
//                         //   ? "已加入購物車"
//                         //   : "加入購物車"
//                           }
//                       </button>
//                     ) : (
//                       <button disabled  
                      
//                       onMouseEnter={()=>{setHoverAction(true)}}
//                       onMouseLeave={()=>{setHoverAction(false)}}
//                       style={{
//                         backgroundColor:
//                           hoverAction
//                           ?
//                           node?.data?.action_background_color2?`rgba(${node?.data?.action_background_color2.r}, ${node?.data?.action_background_color2.g}, ${node?.data?.action_background_color2.b}, ${node?.data?.action_background_color2.a})`:''
//                           :
//                           node?.data?.action_background_color?`rgba(${node?.data?.action_background_color.r}, ${node?.data?.action_background_color.g}, ${node?.data?.action_background_color.b}, ${node?.data?.action_background_color.a})`:''
//                         ,                        
//                         fontSize:props?.actionFontSize||'',
//                         color:node?.data?.action_font_color?`rgba(${node?.data?.action_font_color.r}, ${node?.data?.action_font_color.g}, ${node?.data?.action_font_color.b}, ${node?.data?.action_font_color.a})`:'',
//                         fontFamily:node?.data?.action_font_family||'',
//                         fontWeight:node?.data?.action_font_weight||'',
//                       }}>
//                         缺貨中
//                       </button>
//                     )}
//                   </div>

//                   <div className={clsx(style["shop-list-wishlist"], "ml-10")}>
//                     {/* <button
//                       className={wishlistItem !== undefined ? "active" : ""}
//                       disabled={wishlistItem !== undefined}
//                       title={
//                         wishlistItem !== undefined
//                           ? "Added to wishlist"
//                           : "Add to wishlist"
//                       }
//                       onClick={() => dispatch(addToWishlist(product))}
//                     >
//                       <i className="pe-7s-like" />
//                     </button> */}
//                   </div>


//                   <div className={clsx(style["shop-list-compare"], "ml-10")}>
//                     {/* <button
//                       className={compareItem !== undefined ? "active" : ""}
//                       disabled={compareItem !== undefined}
//                       title={
//                         compareItem !== undefined
//                           ? "Added to compare"
//                           : "Add to compare"
//                       }
//                       onClick={() => dispatch(addToCompare(product))}
//                     >
//                       <i className="pe-7s-shuffle" />
//                     </button> */}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>





//       {/* product modal */}
//       {/* <ProductModal
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//         product={product}
//         currency={currency}
//         discountedPrice={discountedPrice}
//         finalProductPrice={finalProductPrice}
//         finalDiscountedPrice={finalDiscountedPrice}
//         wishlistItem={wishlistItem}
//         compareItem={compareItem}
//       /> */}
//     </Fragment>
//   );
// };

// ProductListSingleKingPork.propTypes = {

// };

// export default ProductListSingleKingPork;
