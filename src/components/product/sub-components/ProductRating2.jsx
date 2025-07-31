import PropTypes from "prop-types";
import React, { Fragment } from "react";

import clsx from "clsx";
import style from "./ProductRating.module.scss"
const ProductRating2 = ({ ratingValue }) => {
  let rating = [];

  for (let i = 0; i < 5; i++) {
    rating.push(<i className="fa fa-star-o" key={i}></i>);
  }
  if (ratingValue && ratingValue > 0) {
    for (let i = 0; i <= ratingValue - 1; i++) {
      rating[i] = <i className={clsx(style['圖標'], '圖標',"fa fa-star-o yellow")} key={i}></i>;
    }
  }
  return <div className={clsx(style['評分框'], '評分框')}>
    {rating}
      <h4 style={{display:'inline-block'}} className={clsx(style['評分-數字'], '評分-數字')}>{ratingValue?.toFixed(1)||0}</h4>
    </div>;
};

ProductRating2.propTypes = {
  ratingValue: PropTypes.number
};

export default ProductRating2;
