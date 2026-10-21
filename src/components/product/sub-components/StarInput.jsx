import PropTypes from "prop-types";
import React from "react";

import clsx from "clsx";
import style from "./ProductRating.module.scss"

//可點選的星等輸入 只輸出結構與 class 星星外觀交給自訂樣式表 選到的星星帶有「激發」
const StarInput = ({ value, onChange }) => {
  return <div className={clsx(style['星等輸入框'], '星等輸入框')}>
    {[1, 2, 3, 4, 5].map((star) => (
      <i
        className={clsx(style['圖標'], '圖標', star <= (value || 0) && `${style['激發']} 激發`)}
        key={star}
        role="button"
        aria-label={`${star} 星`}
        onClick={() => onChange?.(star)}
      ></i>
    ))}
  </div>;
};

StarInput.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
};

export default StarInput;
