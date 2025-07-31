import PropTypes from "prop-types";
import React, { Fragment } from "react";

const ProductRating = ({ ratingValue }) => {
  let rating = [];

  for (let i = 0; i < 5; i++) {
    rating.push(<i className="fa fa-star-o" key={i}></i>);
  }
  if (ratingValue && ratingValue > 0) {
    for (let i = 0; i <= ratingValue - 1; i++) {
      rating[i] = <i className="fa fa-star-o yellow" key={i}></i>;
    }
  }
  return <Fragment>
    {rating}

      <h4 style={{display:'inline-block'}}>{ratingValue.toFixed(1)}</h4>
    </Fragment>;
};

ProductRating.propTypes = {
  ratingValue: PropTypes.number
};

export default ProductRating;
