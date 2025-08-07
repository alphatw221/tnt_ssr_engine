
import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState, useRef } from "react";
import clsx from "clsx";
import style from './CustomSlider.module.scss'

import { Navigation, Pagination, Scrollbar, 
    A11y,
      Autoplay, EffectFade, FreeMode  } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/scrollbar';
import 'swiper/css/free-mode'



// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import {convertToReactProps} from '@/lib/utils/propsConverter.js'


import Element from "@/components/element/Element"

const CustomSliderCSR = ({  
    element, 
    elementProps,
    mode,
    ...props
}) => {
    // const dispatch = useAppDispatch();

    const swiperRef = useRef(null)
    const [swiperKey, setSwiperKey] = useState(1);
    const [gotNode, setGotNode] = useState(false);

    const [rwdSlidesPerView, setRwdSlidesPerView] = useState((element?.data?.rwd_swiper_slides_per_view||'')?.split(','));
    const [rwdSpaceBetween, setRwdSpaceBetween] = useState((element?.data?.rwd_swiper_space_between||'')?.split(','));

    useEffect(()=>{
        
        if(element && !gotNode){
            setGotNode(true)
            setSwiperKey(new Date());
        }
    },[element, gotNode])



    useEffect(()=>{
        setSwiperKey(new Date());
    },[
        element?.data?.rwd_swiper_slides_per_view, 
        element?.data?.rwd_swiper_space_between,
        element?.data?.swiper_free_mode,
        element?.data?.swiper_navigation,
        element?.data?.swiper_pagination,
        element?.data?.swiper_loop,
        element?.data?.swiper_centered_slides,
        element?.data?.swiper_grab_cursor,
        element?.data?.swiper_effect,
        element?.children,
    ])

    // useEffect(()=>{

    //     console.log('custom_slider_init_listenr')
    //     const slide_prev = ()=>{swiperRef?.current?.slidePrev()}
    //     const slide_next = ()=>{swiperRef?.current?.slideNext()}
    //     const slide_to = (e)=>{
    //         console.log('slide to')
    //         console.log(e?.detail)
    //         swiperRef?.current?.slideTo(e?.detail?.param||0)
        
    //     }
    //     document.addEventListener(`${element?.uuid}_slide_prev`, slide_prev)
    //     document.addEventListener(`${element?.uuid}_slide_next`, slide_next)
    //     document.addEventListener(`${element?.uuid}_slide_to`, slide_to)
    //     return ()=>{
    //         document.removeEventListener(`${element?.uuid}_slide_prev`,slide_prev)
    //         document.removeEventListener(`${element?.uuid}_slide_next`, slide_next)
    //         document.removeEventListener(`${element?.uuid}_slide_to`, slide_to)
    //     }
    // },[swiperRef.current])

    useEffect(()=>{
       setRwdSlidesPerView((element?.data?.rwd_swiper_slides_per_view||'')?.split(','))
    },[element?.data?.rwd_swiper_slides_per_view, element])

    useEffect(()=>{
        setRwdSpaceBetween((element?.data?.rwd_swiper_space_between||'')?.split(','))
     },[element?.data?.rwd_swiper_space_between, element])
    // const rwdSlidesPerView = (element?.data?.rwd_swiper_slides_per_view||'')?.split(',');
    // const rwdSpaceBetween = (element?.data?.rwd_swiper_space_between||'')?.split(',');





    const initSwiper = (swiper)=>{
        console.log('init swiper')
        swiperRef.current = swiper;

        const ele = document?.querySelector('.'+ CSS.escape(element.parent_relation_uuid))
        ele.swiper = swiper;
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

        // swiper.on('slideChange', (swiper)=>{
        //     // console.log('realIndex')
        //     // console.log(swiper?.realIndex)
        //     const customEvent = new CustomEvent(`${element?.uuid}_換頁`, {detail:{param:`${swiper?.realIndex}`}});
        //     document.dispatchEvent(customEvent);
        // })
      
    }









    return (
            

            <Swiper
                // install Swiper modules
                {...elementProps}
                key={swiperKey}
                modules={[Navigation, Pagination, Scrollbar, 
                    A11y, 
                    Autoplay, EffectFade, FreeMode]}
                onSwiper={initSwiper}
                autoplay={
                    (  mode==='edit' )?
                    {
                        delay: 600000,
                        disableOnInteraction: true,
                    }:
                    {
                    delay: element?.data?.autoplay_interval||2000,
                    disableOnInteraction: false,

                    }
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
                freeMode={element?.data?.swiper_free_mode||false}
                navigation={element?.data?.swiper_navigation||false}
                pagination={element?.data?.swiper_pagination?{ clickable: true }:false}
                loop={false}//壞掉了 待修
                loopAdditionalSlides={element?.data?.swiper_loop?10:0}
                centeredSlides={element?.data?.swiper_centered_slides||false}
                grabCursor={element?.data?.swiper_grab_cursor||false}
                effect={element?.data?.swiper_effect}
                fadeEffect={ {
                    crossFade: true
                }}
                >

                {   
                    (element?.children||[])
                    // .filter((childrenNode, index)=>childrenNode?.type=='custom_slider_slide')
                    .map((childrenElement, index)=>{
                        return (<SwiperSlide key={index} >


                                <Element
                                    element={childrenElement}  
                                    mode={mode} 
                                    {...props}
                                >

                                </Element> 
                            
                            
                   
                            </SwiperSlide>
                        )
                    })



                }
            </Swiper>

    )
};

CustomSliderCSR.propTypes = {
};

export default CustomSliderCSR;



