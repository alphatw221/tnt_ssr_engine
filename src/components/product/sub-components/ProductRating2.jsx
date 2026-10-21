import PropTypes from "prop-types";
import React from "react";

import clsx from "clsx";
import style from "./ProductRating.module.scss"

//只輸出結構與 class 星星外觀交給自訂樣式表 亮起的星星帶有「激發」
const ProductRating2 = ({ ratingValue }) => {
  const filledCount = Math.floor(ratingValue || 0);

  return <div className={clsx(style['評分框'], '評分框')}>
    {[0, 1, 2, 3, 4].map((i) => (
      <i
        className={clsx(style['圖標'], '圖標', i < filledCount && `${style['激發']} 激發`)}
        key={i}
      ></i>
    ))}
  </div>;
};

ProductRating2.propTypes = {
  ratingValue: PropTypes.number
};

export default ProductRating2;
