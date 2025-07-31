import PropTypes from "prop-types";
import { useState, useEffect, Fragment } from 'react';
// import { useSelector, useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hooks";
import style from "./HeroSliderSingle.module.scss"
import clsx from "clsx";
import { rwdHelper, RWDPropHandler} from "../../lib/utils/rwdHelper"
import Link from "next/link";
const HeroSlider1Single = ({ data , component}) => {
  
  const [btnIsHover, setBtnIsHover] = useState(false);
  const handleMouseEnter = () => {setBtnIsHover(true);};
  const handleMouseLeave = () => {setBtnIsHover(false);};

  const eStoreSettings = useAppSelector((state) => state.estore_settings)
  const websiteEditorState = useAppSelector((state) => state.website_editor);


  const [height, setHeight] = useState('')
  const [titleFontSize, setTitleFontSize] = useState('')
  const [subtitleFontSize, setSubtitleFontSize] = useState('')
  const [buttonFontSize, setButtonFontSize] = useState('')

  useEffect(()=>{
            rwdHelper(
              websiteEditorState.windowWidth, 
              websiteEditorState.sideMenuActive, 
              [
                  new RWDPropHandler(component, 'rwd_height', 'height_unit', setHeight),
                  new RWDPropHandler(component, 'title_rwd_font_size', 'px', setTitleFontSize),
                  new RWDPropHandler(component, 'subtitle_rwd_font_size', 'px', setSubtitleFontSize),
                  new RWDPropHandler(component, 'button_rwd_font_size', 'px', setButtonFontSize),
              ]
          )


          // const _rwd_height = (component.rwd_height||'').split(',')
          // const _title_rwd_font_size = (component.title_rwd_font_size||'').split(',')
          // const _subtitle_rwd_font_size = (component.subtitle_rwd_font_size||'').split(',')
          // const _button_rwd_font_size = (component.button_rwd_font_size||'').split(',')

          // if(websiteEditorState.windowWidth>=1536){
          //     //2xl
          //     setHeight(`${_rwd_height?.[0]||''}${component?.height_unit||''}`)
          //     setTitleFontSize(`${_title_rwd_font_size?.[0]||''}${component?.title_rwd_font_size?'px':''}`)
          //     setSubtitleFontSize(`${_subtitle_rwd_font_size?.[0]||''}${component?.subtitle_rwd_font_size?'px':''}`)
          //     setButtonFontSize(`${_button_rwd_font_size?.[0]||''}${component?.button_rwd_font_size?'px':''}`)


          // }else if(websiteEditorState.windowWidth>=1280){
          //     //xl
          //     setHeight(`${_rwd_height?.[1]||_rwd_height?.[0]||''}${component?.height_unit||''}`)
          //     setTitleFontSize(`${_title_rwd_font_size?.[1]||_title_rwd_font_size?.[0]||''}${component?.title_rwd_font_size?'px':''}`)
          //     setSubtitleFontSize(`${_subtitle_rwd_font_size?.[1]||_subtitle_rwd_font_size?.[0]||''}${component?.subtitle_rwd_font_size?'px':''}`)
          //     setButtonFontSize(`${_button_rwd_font_size?.[1]||_button_rwd_font_size?.[0]||''}${component?.button_rwd_font_size?'px':''}`)

          // }else if(websiteEditorState.windowWidth>=1024){
          //     //lg
          //     setHeight(`${_rwd_height?.[2]||_rwd_height?.[1]||_rwd_height?.[0]||''}${component?.height_unit||''}`)
          //     setTitleFontSize(`${_title_rwd_font_size?.[2]||_title_rwd_font_size?.[1]||_title_rwd_font_size?.[0]||''}${component?.title_rwd_font_size?'px':''}`)
          //     setSubtitleFontSize(`${_subtitle_rwd_font_size?.[2]||_subtitle_rwd_font_size?.[1]||_subtitle_rwd_font_size?.[0]||''}${component?.subtitle_rwd_font_size?'px':''}`)
          //     setButtonFontSize(`${_button_rwd_font_size?.[2]||_button_rwd_font_size?.[1]||_button_rwd_font_size?.[0]||''}${component?.button_rwd_font_size?'px':''}`)

          // }else if(websiteEditorState.windowWidth>=768){
          //     //md>tablet
          //     setHeight(`${_rwd_height?.[3]||_rwd_height?.[2]||_rwd_height?.[1]||_rwd_height?.[0]||''}${component?.height_unit||''}`)
          //     setTitleFontSize(`${_title_rwd_font_size?.[3]||_title_rwd_font_size?.[2]||_title_rwd_font_size?.[1]||_title_rwd_font_size?.[0]||''}${component?.title_rwd_font_size?'px':''}`)
          //     setSubtitleFontSize(`${_subtitle_rwd_font_size?.[3]||_subtitle_rwd_font_size?.[2]||_subtitle_rwd_font_size?.[1]||_subtitle_rwd_font_size?.[0]||''}${component?.subtitle_rwd_font_size?'px':''}`)
          //     setButtonFontSize(`${_button_rwd_font_size?.[3]||_button_rwd_font_size?.[2]||_button_rwd_font_size?.[1]||_button_rwd_font_size?.[0]||''}${component?.button_rwd_font_size?'px':''}`)

          // }else if(websiteEditorState.windowWidth>=640){
          //     //sm=>tablet
          //     setHeight(`${_rwd_height?.[4]||_rwd_height?.[3]||_rwd_height?.[2]||_rwd_height?.[1]||_rwd_height?.[0]||''}${component?.height_unit||''}`)
          //     setTitleFontSize(`${_title_rwd_font_size?.[4]||_title_rwd_font_size?.[3]||_title_rwd_font_size?.[2]||_title_rwd_font_size?.[1]||_title_rwd_font_size?.[0]||''}${component?.title_rwd_font_size?'px':''}`)
          //     setSubtitleFontSize(`${_subtitle_rwd_font_size?.[4]||_subtitle_rwd_font_size?.[3]||_subtitle_rwd_font_size?.[2]||_subtitle_rwd_font_size?.[1]||_subtitle_rwd_font_size?.[0]||''}${component?.subtitle_rwd_font_size?'px':''}`)
          //     setButtonFontSize(`${_button_rwd_font_size?.[4]||_button_rwd_font_size?.[3]||_button_rwd_font_size?.[2]||_button_rwd_font_size?.[1]||_button_rwd_font_size?.[0]||''}${component?.button_rwd_font_size?'px':''}`)

          // }else if(websiteEditorState.windowWidth>=390){
          //     //xs=>mobile
          //     setHeight(`${_rwd_height?.[5]||_rwd_height?.[4]||_rwd_height?.[3]||_rwd_height?.[2]||_rwd_height?.[1]||_rwd_height?.[0]||''}${component?.height_unit||''}`)
          //     setTitleFontSize(`${_title_rwd_font_size?.[5]||_title_rwd_font_size?.[4]||_title_rwd_font_size?.[3]||_title_rwd_font_size?.[2]||_title_rwd_font_size?.[1]||_title_rwd_font_size?.[0]||''}${component?.title_rwd_font_size?'px':''}`)
          //     setSubtitleFontSize(`${_subtitle_rwd_font_size?.[5]||_subtitle_rwd_font_size?.[4]||_subtitle_rwd_font_size?.[3]||_subtitle_rwd_font_size?.[2]||_subtitle_rwd_font_size?.[1]||_subtitle_rwd_font_size?.[0]||''}${component?.subtitle_rwd_font_size?'px':''}`)
          //     setButtonFontSize(`${_button_rwd_font_size?.[5]||_button_rwd_font_size?.[4]||_button_rwd_font_size?.[3]||_button_rwd_font_size?.[2]||_button_rwd_font_size?.[1]||_button_rwd_font_size?.[0]||''}${component?.button_rwd_font_size?'px':''}`)

          // }else{
          //     //xxs>mobile
          //     setHeight(`${_rwd_height?.[6]||_rwd_height?.[5]||_rwd_height?.[4]||_rwd_height?.[3]||_rwd_height?.[2]||_rwd_height?.[1]||_rwd_height?.[0]||''}${component?.height_unit||''}`)
          //     setTitleFontSize(`${_title_rwd_font_size?.[6]||_title_rwd_font_size?.[5]||_title_rwd_font_size?.[4]||_title_rwd_font_size?.[3]||_title_rwd_font_size?.[2]||_title_rwd_font_size?.[1]||_title_rwd_font_size?.[0]||''}${component?.title_rwd_font_size?'px':''}`)
          //     setSubtitleFontSize(`${_subtitle_rwd_font_size?.[6]||_subtitle_rwd_font_size?.[5]||_subtitle_rwd_font_size?.[4]||_subtitle_rwd_font_size?.[3]||_subtitle_rwd_font_size?.[2]||_subtitle_rwd_font_size?.[1]||_subtitle_rwd_font_size?.[0]||''}${component?.subtitle_rwd_font_size?'px':''}`)
          //     setButtonFontSize(`${_button_rwd_font_size?.[6]||_button_rwd_font_size?.[5]||_button_rwd_font_size?.[4]||_button_rwd_font_size?.[3]||_button_rwd_font_size?.[2]||_button_rwd_font_size?.[1]||_button_rwd_font_size?.[0]||''}${component?.button_rwd_font_size?'px':''}`)

          // }
      


  },[ websiteEditorState.windowWidth,,setHeight,setTitleFontSize, setSubtitleFontSize,setButtonFontSize,  component])

  
  const sliderSingle =  (
    <Fragment>
      <div
        className={clsx('single-slider-2', 'd-flex', 'align-items-center', 'bg-img', style['single-slider'])}
        style={{ 
          backgroundImage: `url(${data.image})` ,
          backgroundColor:component?.slider_background_color?`rgba(${component?.slider_background_color.r}, ${component?.slider_background_color.g}, ${component?.slider_background_color.b}, ${component?.slider_background_color.a})`:'',

          backgroundPosition: component?.slider_background_position||'',
          backgroundSize:component?.slider_background_size||'',
          backgroundRepeat: component?.slider_background_repeat||'',

          height:height,
          maxHeight:(component?.max_height||'')+(component?.max_height?component?.max_height_unit:''),

      
      }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-7 col-md-8 col-12">
              <div className="slider-content-red slider-content-2 slider-content-2--white slider-animated-1">
                <h3 className="animated no-style"
                  style={{
                    color:component.subtitle_font_color?`rgba(${component.subtitle_font_color.r}, ${component.subtitle_font_color.g}, ${component.subtitle_font_color.b}, ${component.subtitle_font_color.a})`:'',
                    fontSize:subtitleFontSize,
                    fontFamily:component?.subtitle_font_family||'',
                    fontWeight:component?.subtitle_font_weight||''
                  }}
                  >
                  {data.subtitle}
                </h3>
                <h1
                  className="animated"
                  dangerouslySetInnerHTML={{ __html: data.title }}
                  style={{
                    color:component.title_font_color?`rgba(${component.title_font_color.r}, ${component.title_font_color.g}, ${component.title_font_color.b}, ${component.title_font_color.a})`:'',
                    fontSize:titleFontSize,
                    fontFamily:component?.title_font_family||'',
                    fontWeight:component?.title_font_weight||''
                  }}
                />
                {data.button_text && (
                <div className={clsx("slider-btn", style['slider-btn'])} >
                  <a
                    className="animated"
                    href={data.url}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      color:component.button_font_color?`rgba(${component.button_font_color.r}, ${component.button_font_color.g}, ${component.button_font_color.b}, ${component.button_font_color.a})`:'',
                      fontSize:buttonFontSize,
                      fontFamily:component?.button_font_family||'',
                      fontWeight:component?.button_font_weight||'',
                      borderColor:component.button_font_color?`rgba(${component.button_font_color.r}, ${component.button_font_color.g}, ${component.button_font_color.b}, ${component.button_font_color.a})`:'',
                      borderStyle:component?.button_border_style||'',
                      borderRadius:(component?.button_border_radius||'')+(component?.button_border_radius? component?.button_border_radius_unit:'px'),
                      borderWidth:(component?.button_border_width||'')+(component?.button_border_width? component?.button_border_width_unit:'px'),
                    }}
                  >
                    {data.button_text}
                  </a>
                </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
  

  return (
    <Fragment>
      {
        data?.url
        ?
        <Link href={data?.url}>
          {sliderSingle}
        </Link>
        :
        (sliderSingle)
      }
    </Fragment>
  )




};

HeroSlider1Single.propTypes = {
  data: PropTypes.shape({}),
  component: PropTypes.object
};

export default HeroSlider1Single;
