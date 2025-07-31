import PropTypes from "prop-types";
import { Fragment, useState } from "react";
// import { useDispatch } from "react-redux";
// //import { Link } from "react-router-dom";
import clsx from "clsx";
// import { getDiscountPrice } from "../../helpers/product";
// import Rating from "./sub-components/ProductRating";
// import ProductModal from "./ProductModal";
// import { addToCart } from "../../store/slices/cart-slice";
// import { addToWishlist } from "../../store/slices/wishlist-slice";
// import { addToCompare } from "../../store/slices/compare-slice";
import style from "./ProductGridListSingleKingPork.module.scss"



// import { isStockSufficient  } from "../../lib/utils/cartHelper";
// import { getPriceRange, isDiscountApplied } from "../../lib/utils/productHelper";
// import { updateCartProduct } from "../../lib/utils/cartHelper";


import ProductGridSingleKingPork from "./ProductGridSingleKingPork";
import ProductListSingleKingPork from "./ProductListSingleKingPork";

const ProductGridListSingleKingPork = ({
  product,
  currency,
  // cartItem,
  // wishlistItem,
  // compareItem,
  // spaceBottomClass,

  cartProduct,
  node,
  props,
  layout,

}) => {
  const [modalShow, setModalShow] = useState(false);


  return (
    <Fragment>

      {
        layout == 'list'
        ?
        <ProductListSingleKingPork product={product} node={node} cartProduct={cartProduct} props={props}/>

        :
        <ProductGridSingleKingPork product={product} node={node} cartProduct={cartProduct} props={props}/>

      }
       
    </Fragment>
  );
};

ProductGridListSingleKingPork.propTypes = {

};

export default ProductGridListSingleKingPork;
