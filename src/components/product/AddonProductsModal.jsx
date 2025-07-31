import { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";


import AddonProductGridKingPork from "../../wrappers/product/AddonProductGridKingPork"

const AddonProductsModal = ({ show, onHide,  addonProductData, node, props, title, nextAction}) =>{

  const onCloseModal = () => {
    // setThumbsSwiper(null)
    onHide()
  }
  return (
    <Modal show={show} onHide={onCloseModal} className="product-quickview-modal-wrapper">
    <Modal.Header closeButton></Modal.Header>

    <div className="modal-body">
      <AddonProductGridKingPork
        title={title}
        addonProductData={addonProductData}
        node={node}
        props={props}

      />
    </div>
  </Modal>
  );
}



export default AddonProductsModal;
