import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState, useRef } from "react";
import clsx from "clsx";
// import style from './CustomSlider.module.scss'
import style from './CustomSlider.module.scss'

import { Navigation, Pagination, Scrollbar, A11y,  Autoplay, EffectFade, FreeMode  } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// import { Providers, PersistProvider } from '@/redux/provider'
import {htmlStyleToReactStyle} from '@/lib/utils/propsConverter.js'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/scrollbar';
import 'swiper/css/free-mode'




const CustomSliderClient = ({  
    element_uuid,
    element_data,
    // base_class_name,
    // base_style
    elementProps,
    ...props
    // mode, actions,
}) => {


    const [clientSideSlides, setClientSideSlides] = useState([]);

    const swiperRef = useRef(null)
    const [swiperKey, setSwiperKey] = useState(1);
    // const [gotNode, setGotNode] = useState(false);

    // const [rwdSlidesPerView, setRwdSlidesPerView] = useState((element_data?.rwd_swiper_slides_per_view||'')?.split(','));
    // const [rwdSpaceBetween, setRwdSpaceBetween] = useState((element_data?.rwd_swiper_space_between||'')?.split(','));


    // useEffect(()=>{
    //     setSwiperKey(new Date());
    // },[
    //     element_data?.rwd_swiper_slides_per_view, 
    //     element_data?.rwd_swiper_space_between,
    //     element_data?.swiper_free_mode,
    //     element_data?.swiper_navigation,
    //     element_data?.swiper_pagination,
    //     element_data?.swiper_loop,
    //     element_data?.swiper_centered_slides,
    //     element_data?.swiper_grab_cursor,
    //     element_data?.swiper_effect,
    // ])

    const cssStyleDeclarationToObject = (cssStyle)=> {
        const styleObject = {};
        for (let i = 0; i < cssStyle.length; i++) {
          const property = cssStyle[i];
          const value = cssStyle.getPropertyValue(property);
          styleObject[property] = value;
        }
        return styleObject;
      }


   

    // useEffect(()=>{

    //     console.log('custom_slider_init_listenr')
    //     const slide_prev = ()=>{swiperRef?.current?.slidePrev()}
    //     const slide_next = ()=>{swiperRef?.current?.slideNext()}
    //     const slide_to = (e)=>{
    //         console.log('slide to')
    //         console.log(e?.detail)
    //         swiperRef?.current?.slideTo(e?.detail?.param||0)
        
    //     }
    //     document.addEventListener(`${element_uuid}_slide_prev`, slide_prev)
    //     document.addEventListener(`${element_uuid}_slide_next`, slide_next)
    //     document.addEventListener(`${element_uuid}_slide_to`, slide_to)
    //     return ()=>{
    //         document.removeEventListener(`${element_uuid}_slide_prev`,slide_prev)
    //         document.removeEventListener(`${element_uuid}_slide_next`, slide_next)
    //         document.removeEventListener(`${element_uuid}_slide_to`, slide_to)
    //     }
    // },[swiperRef.current])

    // useEffect(()=>{
    //    setRwdSlidesPerView((element_data?.rwd_swiper_slides_per_view||'')?.split(','))
    // },[element_data?.rwd_swiper_slides_per_view])

    // useEffect(()=>{
    //     setRwdSpaceBetween((element_data?.rwd_swiper_space_between||'')?.split(','))
    //  },[element_data?.rwd_swiper_space_between])
    const rwdSlidesPerView = (element_data?.rwd_swiper_slides_per_view||'')?.split(',');
    const rwdSpaceBetween = (element_data?.rwd_swiper_space_between||'')?.split(',');



    const initSwiper = (swiper)=>{
        swiperRef.current = swiper;
        const slideWidth = swiper.slides?.[0]?.offsetWidth||0;
        swiper.slides?.forEach((slide, index)=>{
            const p = (index * slideWidth) + (slideWidth/2) + swiper.translate + (slideWidth/2)
            const v = 180 * p / (swiper?.el?.offsetWidth + slideWidth)
            const deg =  Math.min(Math.max(v, 0), 180);
            slide?.style?.setProperty('--slide-deg', deg?`${deg}deg`:null)
        })

        swiper.on('setTransition',(swiper, transition)=>{
            swiper?.el?.style?.setProperty('--swiper-transition',transition?`${transition}ms`:null)
        })

        swiper.on('setTranslate',(swiper, translate)=>{
            // console.log(translate)
            const slideWidth = swiper.slides?.[0]?.offsetWidth||0;
            swiper.slides?.forEach((slide, index)=>{
                const p = (index * slideWidth) + (slideWidth/2) + translate + (slideWidth/2)
                const v = 180 * p / (swiper?.el?.offsetWidth + slideWidth)
                const deg =  Math.min(Math.max(v, 0), 180);
                slide?.style?.setProperty('--slide-deg', deg?`${deg}deg`:null)
            })

        })

        swiper.on('slideChange', (swiper)=>{
            // console.log('realIndex')
            // console.log(swiper?.realIndex)
            const customEvent = new CustomEvent(`${element_uuid}_換頁`, {detail:{param:`${swiper?.realIndex}`}});
            document.dispatchEvent(customEvent);
        })
      
    }







    useEffect(() => {
        // 找到伺服端生成的 Slides

        const targetElement = document?.getElementById(`html_data_${element_uuid}`)
        const serverSlides = targetElement ? Array.from(targetElement.children) : [];

        // 動態包裝每個 Slide
        const slidesContent = serverSlides.map((ele) => {
            return {'id':ele.id, 'className':ele.className, 'style':htmlStyleToReactStyle(ele.getAttribute('style')), 'innerHTML':ele.innerHTML, 'outerHTML':ele.outerHTML}
        });

        setClientSideSlides(slidesContent);
        // console.log(slidesContent)
        setSwiperKey(new Date())
    }, []);





      
    return (
            
        <Swiper
            // install Swiper modules
            {...elementProps}
            key={swiperKey}
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade, FreeMode]}
            onSwiper={initSwiper}
            autoplay={
                // (  mode==='edit' )?
                {
                    delay: 600000,
                    disableOnInteraction: true,
                }
                // {
                // delay: element_data?.autoplay_interval||2000,
                // disableOnInteraction: false,

                // }
            }
            slidesPerView={parseInt(rwdSlidesPerView?.[6]||rwdSlidesPerView?.[5]||rwdSlidesPerView?.[4]||rwdSlidesPerView?.[3]||rwdSlidesPerView?.[2]||rwdSlidesPerView?.[1]||rwdSlidesPerView?.[0]||1)}
            spaceBetween={parseInt(rwdSpaceBetween?.[6]||rwdSpaceBetween?.[5]||rwdSpaceBetween?.[4]||rwdSpaceBetween?.[3]||rwdSpaceBetween?.[2]||rwdSpaceBetween?.[1]||rwdSpaceBetween?.[0]||50)}
            breakpoints={{
                390: {
                    slidesPerView: parseInt(rwdSlidesPerView?.[5]||rwdSlidesPerView?.[4]||rwdSlidesPerView?.[3]||rwdSlidesPerView?.[2]||rwdSlidesPerView?.[1]||rwdSlidesPerView?.[0]||1),
                    spaceBetween: parseInt(rwdSpaceBetween?.[5]||rwdSpaceBetween?.[4]||rwdSpaceBetween?.[3]||rwdSpaceBetween?.[2]||rwdSpaceBetween?.[1]||rwdSpaceBetween?.[0]||50),
                },
                640: {
                    slidesPerView: parseInt(rwdSlidesPerView?.[4]||rwdSlidesPerView?.[3]||rwdSlidesPerView?.[2]||rwdSlidesPerView?.[1]||rwdSlidesPerView?.[0]||1),
                    spaceBetween: parseInt(rwdSpaceBetween?.[4]||rwdSpaceBetween?.[3]||rwdSpaceBetween?.[2]||rwdSpaceBetween?.[1]||rwdSpaceBetween?.[0]||50),
                },
                768: {
                    slidesPerView: parseInt(rwdSlidesPerView?.[3]||rwdSlidesPerView?.[2]||rwdSlidesPerView?.[1]||rwdSlidesPerView?.[0]||1),
                    spaceBetween: parseInt(rwdSpaceBetween?.[3]||rwdSpaceBetween?.[2]||rwdSpaceBetween?.[1]||rwdSpaceBetween?.[0]||50),
                },
                1024: {
                    slidesPerView: parseInt(rwdSlidesPerView?.[2]||rwdSlidesPerView?.[1]||rwdSlidesPerView?.[0]||1),
                    spaceBetween: parseInt(rwdSpaceBetween?.[2]||rwdSpaceBetween?.[1]||rwdSpaceBetween?.[0]||50),
                },
                1280: {
                    slidesPerView: parseInt(rwdSlidesPerView?.[1]||rwdSlidesPerView?.[0]||1),
                    spaceBetween: parseInt(rwdSpaceBetween?.[1]||rwdSpaceBetween?.[0]||50),
                },
                1536: {
                    slidesPerView: parseInt(rwdSlidesPerView?.[0]||1),
                    spaceBetween: parseInt(rwdSpaceBetween?.[0]||50),
                },

                }}
            freeMode={element_data?.swiper_free_mode||false}
            navigation={element_data?.swiper_navigation||false}
            pagination={element_data?.swiper_pagination?{ clickable: true }:false}
            loop={false} //待修
            loopAdditionalSlides={element_data?.swiper_loop?10:0}
            centeredSlides={element_data?.swiper_centered_slides||false}
            grabCursor={element_data?.swiper_grab_cursor||false}
            effect={element_data?.swiper_effect}
            fadeEffect={ {
                crossFade: true
            }}
            >
                {clientSideSlides.map((ele, index) => (
                    <SwiperSlide key={index}>
                        <div  id={ele.id} className={ele.className} style={ele.style} dangerouslySetInnerHTML={{ __html: ele.outerHTML }} />
                    </SwiperSlide>
                ))}
            
        </Swiper>



            

    )
};

CustomSliderClient.propTypes = {
};

export default CustomSliderClient;



