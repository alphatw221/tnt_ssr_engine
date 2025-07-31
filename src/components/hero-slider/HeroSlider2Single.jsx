import PropTypes from "prop-types";

import { useState } from 'react';

import style from "./HeroSliderSingle.module.scss"
import clsx from "clsx";

const HeroSlider2Single = ({ data, component }) => {

  const [btnIsHover, setBtnIsHover] = useState(false);
  const handleMouseEnter = () => {setBtnIsHover(true);};
  const handleMouseLeave = () => {setBtnIsHover(false);};

  // const eStoreSettings = useSelector((state) => state.estore_settings)

  return (
    <div className={clsx('single-slider', 'single-slider-10',  'bg-aqua', style['single-slider'])}
    style={{

      backgroundColor:component.slider_background_color?`rgba(${component.slider_background_color.r}, ${component.slider_background_color.g}, ${component.slider_background_color.b}, ${component.slider_background_color.a})`:'',

    }}
    
    >
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-6 d-flex align-items-center">
            <div className="slider-content slider-content-10 slider-animated-2">
              <h3 className="animated"
                style={{
                  color:component.subtitle_font_color?`rgba(${component.subtitle_font_color.r}, ${component.subtitle_font_color.g}, ${component.subtitle_font_color.b}, ${component.subtitle_font_color.a})`:'',
                  fontSize:`${component.subtitle_font_size||''}${component?.subtitle_font_size?'px':''}`,
                  fontFamily:component?.subtitle_font_family||'',
                  fontWeight:component?.subtitle_font_family||''
                }}
              >{data.subtitle}</h3>
              <h1 className="animated" style={{
                color:component.title_font_color?`rgba(${component.title_font_color.r}, ${component.title_font_color.g}, ${component.title_font_color.b}, ${component.title_font_color.a})`:'',
                fontSize:`${component.title_font_size||''}${component?.title_font_size?'px':''}`,
                fontFamily:component?.title_font_family||'',
                fontWeight:component?.title_font_weight||''





                }}>{data.title}</h1>
              {data.button_text && (
              <div className={clsx("slider-btn", style['slider-btn'])}>
                <a
                  className="animated"
                  href={data.url}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{

                    color:component.button_font_color?`rgba(${component.button_font_color.r}, ${component.button_font_color.g}, ${component.button_font_color.b}, ${component.button_font_color.a})`:'',
                    fontSize:`${component.button_font_size||''}${component?.button_font_size?'px':''}`,
                    fontFamily:component?.button_font_family||'',
                    fontWeight:component?.button_font_weight||'',
                    borderColor:component.button_font_color?`rgba(${component.button_font_color.r}, ${component.button_font_color.g}, ${component.button_font_color.b}, ${component.button_font_color.a})`:'',






                  }}
                >
                  {data.button_text}
                </a>
              </div>
              )}
            </div>
          </div>
          <div className="col-12 col-sm-6">
            <div className="slider-singleimg-hm10 slider-animated-2 ml-40 mr-40">
              <img
                className="animated img-fluid"
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

HeroSlider2Single.propTypes = {
  data: PropTypes.shape({}),
  component: PropTypes.object

};

export default HeroSlider2Single;
