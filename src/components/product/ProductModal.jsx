import { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import Rating from "./sub-components/ProductRating";

import ProductImageGalleryKingPork from "./ProductImageGalleryKingPork"
import ProductDescriptionInfoKingPork from "./ProductDescriptionInfoKingPork"

function ProductModal({ product, show, onHide, cartProduct, node, props}) {

  const onCloseModal = () => {
    // setThumbsSwiper(null)
    onHide()
  }

  const [selectedProduct, setSelectedProduct] = useState(
    (product?.variant_products||[]).length>0 ? product.variant_products[0] : product
  )
  const [composeBase, setComposeBase] = useState(
    (product?.compose_bases||[]).length>0 ? product.compose_bases[0] : null
  )
  return (
    <Modal show={show} onHide={onCloseModal} className="product-quickview-modal-wrapper">
    <Modal.Header closeButton></Modal.Header>

    <div className="modal-body">
      <div className="row">
        <div className="col-md-5 col-sm-12 col-xs-12">

          <ProductImageGalleryKingPork product={product} selectedProduct={selectedProduct}/>
          
        </div>



        <div className="col-md-7 col-sm-12 col-xs-12">
          <ProductDescriptionInfoKingPork 
            additionalClassName={"quickview-content"}
            product={product} 
            selectedProduct={selectedProduct} 
            setSelectedProduct={setSelectedProduct} 
            composeBase={composeBase}
            setComposeBase={setComposeBase}
            node={node}
            props={props}
            />

        </div>
      </div>
    </div>
  </Modal>
  );
}

ProductModal.propTypes = {
  // currency: PropTypes.shape({}),
  // discountedprice: PropTypes.number,
  // finaldiscountedprice: PropTypes.number,
  // finalproductprice: PropTypes.number,
  onHide: PropTypes.func,
  product: PropTypes.shape({}),
  show: PropTypes.bool,
  // wishlistItem: PropTypes.shape({}),
  // compareItem: PropTypes.shape({})
};

export default ProductModal;
