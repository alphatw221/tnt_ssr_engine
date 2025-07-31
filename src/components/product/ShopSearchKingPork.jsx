import style from './ShopSearchKingPork.module.scss'
import clsx from 'clsx';

import React, { useEffect, useState } from "react"
// import { useParams, useSearchParams } from 'react-router-dom';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setWebsiteSearchParams, setSearchParamsUpdatedAt } from "@/redux/slices/estore-slice";

const ShopSearchKingPork = ({node, props}) => {

  // let [searchParams, setSearchParams] = useSearchParams();
  const pathname = usePathname()
  const router = useRouter()

  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()
  // const [ready, setReady] = useState(false)
  const [keyword, setKeyword] = useState('')
  // const [keywordQuery, setKeywordQuery] = useState('')

  const { websiteSearchParams } = useAppSelector((state) => state.estore);



  const setSearchParams = (name, value)=>{
    // const params = new URLSearchParams(searchParams);
    // console.log(params)
    const params = new URL(document.location).searchParams;
    params.delete('page')
    params.set(name, value);
    // console.log(params)
    const searchParamsString = params.toString()
    console.log(searchParamsString)
    // console.log(pathname + '?' + searchParamsString)

    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParamsString;
    console.log(newurl)
    window.history.pushState({path:newurl},'',newurl);

    // router.push(pathname + '?' + searchParamsString)

    const _websiteSearchParams = {...websiteSearchParams}
    _websiteSearchParams[name] = value
    dispatch(setWebsiteSearchParams(_websiteSearchParams))
    dispatch(setSearchParamsUpdatedAt(new Date().toString()))
  }

  const removeSearchParams = (name)=>{
    // const params = new URLSearchParams(searchParams);
    const params = new URL(document.location).searchParams;

    // console.log(params)
    params.delete('page')
    params.delete(name)
    // console.log(params)
    const searchParamsString = params.toString()
    // console.log(searchParamsString)

    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParamsString;
    console.log(newurl)
    window.history.pushState({path:newurl},'',newurl);
    
    // router.push(pathname + '?' + searchParamsString)
    const _websiteSearchParams = {...websiteSearchParams}
    delete _websiteSearchParams[name]
    dispatch(setWebsiteSearchParams(_websiteSearchParams))
    dispatch(setSearchParamsUpdatedAt(new Date().toString()))

  }

  useEffect(() => {
    if(searchParams.get('keyword')){
      setKeyword(searchParams.get('keyword'))
      dispatch(setWebsiteSearchParams({...websiteSearchParams, keyword:searchParams.get('keyword')}))
    }
  }, [])


  const updateSearchParams = ()=>{
    if(keyword){
      console.log(keyword)
      setSearchParams('keyword',keyword)
    }else{
      removeSearchParams('keyword')
    }
  }
  

  return (
    <div className={style["sidebar-widget"]}>
      <h4 className={style["pro-sidebar-title"]}
        style={{
          color:node?.data.title_font_color?`rgba(${node?.data.title_font_color.r}, ${node?.data.title_font_color.g}, ${node?.data.title_font_color.b}, ${node?.data.title_font_color.a})`:'',
          fontSize:props?.titleFontSize||'',
          fontFamily:node?.data?.title_font_family||'',
          fontWeight:node?.data?.title_font_weight||'',
          lineHeight:props?.titleLineHeight||''
        }}
      >搜尋 Search </h4>
      <div className={clsx(style["pro-sidebar-search"], "mb-10", "mt-10")}>
        <div className={style["pro-sidebar-search-form"]} >
          <input type="text" placeholder="搜尋..." 
            value={keyword}
            onKeyUp={(e)=>{
              if(e.keyCode===13){
                e.target.blur()
              }
            }}
            onChange={(e)=>{
              setKeyword(e.target.value)
            }}
            style={{
              borderColor:node?.data?.search_border_color?`rgba(${node?.data?.search_border_color.r}, ${node?.data?.search_border_color.g}, ${node?.data?.search_border_color.b}, ${node?.data?.search_border_color.a})`:'',
              borderRadius:(node?.data?.search_border_radius||'')+(node?.data?.search_border_radius_unit||''),
              borderWidth:(node?.data?.search_border_width||'')+(node?.data?.search_border_width_unit||''),
              borderStyle:(node?.data?.search_border_style||''),
            }}
          />
          <button onClick={(e)=>{
            updateSearchParams()
          }}
          style={{
            borderColor:node?.data?.search_border_color?`rgba(${node?.data?.search_border_color.r}, ${node?.data?.search_border_color.g}, ${node?.data?.search_border_color.b}, ${node?.data?.search_border_color.a})`:'',

          }}
          >
            <i className="pe-7s-search" style={{
              color:node?.data?.search_icon_color?`rgba(${node?.data?.search_icon_color.r}, ${node?.data?.search_icon_color.g}, ${node?.data?.search_icon_color.b}, ${node?.data?.search_icon_color.a})`:'',
            }}/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopSearchKingPork;
