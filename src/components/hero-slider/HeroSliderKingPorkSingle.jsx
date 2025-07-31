import PropTypes from "prop-types";
//import { Link } from "react-router-dom";
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

const HeroSliderKingPorkSingle = ({ data }) => {
  
  const [btnIsHover, setBtnIsHover] = useState(false);
  const handleMouseEnter = () => {setBtnIsHover(true);};
  const handleMouseLeave = () => {setBtnIsHover(false);};

  const eStoreSettings = useSelector((state) => state.estore_settings)

  return (
    <div
      className="single-slider-2 slider-height-2 d-flex align-items-center bg-img"
      style={{ backgroundImage: `url(${data.image})` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-7 col-md-8 col-12">
            <div className="slider-content-red slider-content-2 slider-content-2--white slider-animated-1">
              <h3 className="animated no-style"
                style={{
                  color:eStoreSettings.text_color_1,
                }}
                >
                {data.title}
              </h3>
              <h1
                className="animated"
                dangerouslySetInnerHTML={{ __html: data.subtitle }}
                style={{
                  color:eStoreSettings.text_color_1,
                }}
              />
              <div className="slider-btn-red btn-hover" >
                <a
                  className="animated"
                  href={data.url}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    color:eStoreSettings.text_color_1,
                    background:btnIsHover?eStoreSettings.button_color_1:eStoreSettings.button_color_2
                  }}
                >
                  {data.button_text}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HeroSliderKingPorkSingle.propTypes = {
  data: PropTypes.shape({})
};

export default HeroSliderKingPorkSingle;
