import PropTypes from "prop-types";

import { useState } from 'react';
// import { useSelector, useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hooks";
const HeroSlider3Single = ({ data }) => {
  const [btnIsHover, setBtnIsHover] = useState(false);
  const handleMouseEnter = () => {setBtnIsHover(true);};
  const handleMouseLeave = () => {setBtnIsHover(false);};
  const eStoreSettings = useAppSelector((state) => state.estore_settings)
  return (
    <div className="slider-height-7 bg-glaucous d-flex align-items-center"
      style={{backgroundColor:eStoreSettings.theme_color_2}}
    >
      <div className="container">
        <div className="row align-items-center slider-h9-mrg">
          <div className="col-lg-6 col-md-6 col-12 col-sm-6">
            <div className="slider-content-7 slider-animated-1">
              <h3 className="animated"
                style={{
                  color:eStoreSettings.text_color_1,
                }}
              >{data.title}</h3>
              <h1
                className="animated"
                dangerouslySetInnerHTML={{ __html: data.subtitle }}
                style={{
                  color:eStoreSettings.text_color_1,
                }}
              />
              {data.button_text && (
              <div className="slider-btn-9 ">
                <a
                  className="animated"
                  href={data.url}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    color:eStoreSettings.text_color_1,
                    background:btnIsHover?eStoreSettings.button_color_1:eStoreSettings.button_color_2,
                    borderColor:btnIsHover?eStoreSettings.button_color_1:eStoreSettings.text_color_1
                  }}
                >
                  {data.button_text}
                </a>
              </div>
              )}
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12 col-sm-6">
            <div className="slider-singleimg-hm9 slider-animated-1">
              <img
                className="animated"
                src={data.image}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HeroSlider3Single.propTypes = {
  data: PropTypes.shape({})
};

export default HeroSlider3Single;
