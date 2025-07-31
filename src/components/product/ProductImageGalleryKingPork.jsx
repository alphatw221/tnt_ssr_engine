import React, { Fragment, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { EffectFade, Thumbs } from 'swiper';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Swiper, { SwiperSlide } from "../../components/swiper/SwiperSlider";

const ProductImageGallery = ({ product, selectedProduct }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [galleryswiper, setGallerySwiper] = useState(null);
  const [index, setIndex] = useState(-1);

  const [images, setImages] = useState([])
  const [swiperKey ,setSwiperKey] = useState(new Date)



  useEffect(()=>{
    var _images = []
    if(selectedProduct?.image){
      _images.push({image:selectedProduct.image})
    }
    if((product?.images||[]).length>0){
      _images = [..._images, ...product.images]
    }
    setImages(_images)
  },[product, selectedProduct])


  useEffect(()=>{
    if(galleryswiper){
      galleryswiper.slideTo(1)
    }
  },[images, galleryswiper])
  
  // const slides = product?.images.map((img, i) => ({
  //     src: img.image,
  //     key: i,
  // }));

  // swiper slider settings
  // const gallerySwiperParams = {
  //   onSwiper: setGallerySwiper,
  //   spaceBetween: 10,
  //   loop: true,
  //   effect: "fade",
  //   fadeEffect: {
  //     crossFade: true
  //   },
  //   thumbs: { swiper: thumbsSwiper },
  //   modules: [EffectFade, Thumbs],
  // };

  // const thumbnailSwiperParams = {
  //   onSwiper: setThumbsSwiper,
  //   spaceBetween: 10,
  //   slidesPerView: 4,
  //   touchRatio: 0.2,
  //   freeMode: true,
  //   loop: (images?.length||0)>4?true:false,
  //   slideToClickedSlide: true,
  //   navigation: true
  // };

  const gallerySwiperParams = {
    spaceBetween: 10,
    loop: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    thumbs: { swiper: thumbsSwiper },
    modules: [EffectFade, Thumbs],
  };

  const thumbnailSwiperParams = {
    onSwiper: setThumbsSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    touchRatio: 0.2,
    freeMode: true,
    loop: true,
    slideToClickedSlide: true,
    navigation: true
  };




  const now = new Date()
  return (
    <Fragment >
      <div className="product-large-image-wrapper">

        <div className="product-img-badges">
          { product?.new && <span className="purple">新品</span> }
          { (product.discount_start_time < now && now < product.discount_end_time ) && <span className="pink">
            -{parseInt((((selectedProduct?.price||0) - (selectedProduct?.discount_price||0))/(selectedProduct?.price||999999999999999))*100)}%
            </span>}
        </div>



        {images?.length>0 ? (
          <Swiper options={gallerySwiperParams} >

            
            {images.map((single, key) => (
              <SwiperSlide key={key} >
                <button className="lightgallery-button" onClick={() => {setIndex(key); console.log(key)}}>
                  <i className="pe-7s-expand1"></i>
                </button>
                <div className="single-image">
                  <img
                    src={single.image}
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </SwiperSlide>
            ))}
            <Lightbox
                open={index >= 0}
                index={index}
                close={() => setIndex(-1)}
                slides={images.map((img, i) => ({
                  src: img.image,
                  key: i,
              }))}
                plugins={[Thumbnails, Zoom, Fullscreen]}
            />
          </Swiper>
        ) : null}

      </div>
      <div className="product-small-image-wrapper mt-15 mb-15" 
      // style={{height:'150px'}}
      >
        {images?.length ? (
          <Swiper options={thumbnailSwiperParams} >
            {images.map((single, key) => (
              <SwiperSlide key={key}>
                <div className="single-image">
                  <img
                    src={single.image}
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : null}
      </div>
    </Fragment>
  );
};

ProductImageGallery.propTypes = {
  product: PropTypes.shape({}),
  selectedProduct: PropTypes.object,
};

export default ProductImageGallery;
