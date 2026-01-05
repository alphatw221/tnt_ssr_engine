import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useRef } from "react";
import clsx from "clsx";
import style from './WebsiteSearchBar.module.scss'

     
// import { useAppSelector } from "@/redux/hooks";   



import {useClickOutsideEvent} from '../../lib/utils/clickOutside.js'

// import { getRWDStyles} from "@/lib/utils/rwdHelper"

// import { customer_search_product } from "../../api/product";
// import { customer_search_blog_post } from "../../api/blog_post";
import { customer_search_store_results } from "../../api/estore"
// import Link from "next/link";
const WebsiteSearchBar = ({  

    // node,  mode, actions, update, children, routingTable, ...props

    routingTable,

    element, 
    elementProps,
    mode,
    ...props


}) => {

    // const websiteEditorState = useAppSelector((state) => state.website_editor);



    const [showDropDown, setShowDropDown] = useState(false)
    const [isFetching, setIsFetching] = useState(false)

    const [searchText, setSearchText] = useState('')
    const dropDown = useRef()


    useClickOutsideEvent(useEffect, dropDown,()=>{
        setShowDropDown(false)
    },showDropDown)


    // const [searchBarFontSize, setSearchBarFontSize] = useState('')
    // const [searchBarLineHeight, setSearchBarLineHeight] = useState('')
    // const [resultTitleFontSize, setResultTitleFontSize] = useState('')
    // const [resultTitleLineHeight, setResultTitleLineHeight] = useState('')
    // const [resultParagraphFontSize, setResultParagraphFontSize] = useState('')
    // const [resultParagraphLineHeight, setResultParagraphLineHeight] = useState('')
    // const [width, setWidth] = useState('')
    // const [height, setHeight] = useState('')
    // const [dropdownWidth, setDropdownWidth] = useState('')



    const [results, setResults] = useState([])
    // const [resultsGotNext, setResultsGotNext] = useState(false)
    // const [page, setPage] = useState(1)
    // const [productResults, setProductResults] = useState([])

    const searchResults = ()=>{
        setShowDropDown(true)
        setIsFetching(true)
        

        customer_search_store_results(searchText).then(res=>{
            console.log(res.data)
            setIsFetching(false)
            setResults(res?.data||[])

        }).catch(err=>{ setIsFetching(false) })
    }



    // useEffect(()=>{

    //     rwdHelper(
    //         websiteEditorState.windowWidth, 
    //         websiteEditorState.sideMenuActive, 
    //         [

    //             new RWDPropHandler(node?.data, 'rwd_width', 'width_unit', setWidth),
    //             new RWDPropHandler(node?.data, 'rwd_height', 'height_unit', setHeight),

    //             new RWDPropHandler(node?.data, 'search_bar_rwd_line_height', 'px', setSearchBarLineHeight),
    //             new RWDPropHandler(node?.data, 'search_bar_rwd_font_size', 'px', setSearchBarFontSize),

    //             new RWDPropHandler(node?.data, 'dropdown_rwd_width', 'width_unit', setDropdownWidth),

    //             new RWDPropHandler(node?.data, 'reault_title_rwd_line_height', 'px', setResultTitleLineHeight),
    //             new RWDPropHandler(node?.data, 'reault_title_rwd_font_size', 'px', setResultTitleFontSize),

    //             new RWDPropHandler(node?.data, 'reault_paragraph_rwd_line_height', 'px', setResultParagraphLineHeight),
    //             new RWDPropHandler(node?.data, 'reault_paragraph_rwd_font_size', 'px', setResultParagraphFontSize),

    //         ]
    //     )



    // },[ websiteEditorState.windowWidth, websiteEditorState.sideMenuActive, 
    //     setWidth, 
    //     setHeight, 
    //     setSearchBarLineHeight, 
    //     setSearchBarFontSize,
    //     setDropdownWidth, 
    //     setResultTitleLineHeight,
    //     setResultTitleFontSize,
    //     setResultParagraphLineHeight,
    //     setResultParagraphFontSize,
    //     node?.data])


    const hightlight = (text, keyword, tag, className, length) =>{

        const index = text.indexOf(keyword);

        const start = Math.max(0, index-length)
        const end = Math.min(text.length, index+length)

        const postfix = text.length>index+length?'...':''
        text = text.slice(start, end)
        return text.replace(keyword, `<${tag} class="${style[className]} ${className}">${keyword}</${tag}>`)+postfix


    }


    const { className, ...rest } = elementProps;
    return (
    
        
        <div {...rest} className={clsx(style["站內搜尋框"], "站內搜尋框", className)} >
            <input  
                className={
                    clsx(style['搜尋-輸入'],'搜尋-輸入',)
                } 
                type='text'
                value={searchText}
                onChange={(e)=>{setSearchText(e.target.value)}}
                placeholder={`搜尋${element?.data?.search_type||''}...`}
                
            />   
            <button className={clsx(style['搜尋-按鈕'],'搜尋-按鈕',)} onClick={(e)=>{searchResults()}}>
                搜尋
            </button>



            <div className={clsx(style['搜尋結果-下拉'], '搜尋結果-下拉', showDropDown?style['顯示']:'', showDropDown?'顯示':'')}  ref={dropDown}>   

                
                {

                    isFetching
                    ?
                    <div className={clsx(style['旋轉器框'], '旋轉器框')}>
                        <i className={clsx(style['旋轉器'], '旋轉器')}  />
                    </div>
                    :
                    <Fragment>
                        {
                            (results||[]).length<=0
                            ?
                            <div className={clsx(style['搜尋結果框'], '搜尋結果框')}>
                                <h3>無符合結果</h3>
                            </div>
                            
                            :
                        (results||[]).map((result,i)=>(

                            <Fragment key={i}>
                                { 
                                result?.name
                                ?
                                <a  href={`/${routingTable?.['product_route']}/${result.uuid}`}>
                                    <div  className={clsx(style['搜尋結果框'], '搜尋結果框')} >
                                        <span className={clsx(style['搜尋結果-標題'], '搜尋結果框-標題')} dangerouslySetInnerHTML={{ __html: hightlight(result?.name, searchText, 'span', '高亮', 125) }}></span>
                                        <br />
                                        <p className={clsx(style['搜尋結果-敘述'], '搜尋結果-敘述')} dangerouslySetInnerHTML={{ __html: hightlight(result?.description, searchText, 'span', '高亮', 125) }}></p>
                                    </div>
                                </a>
                                :
                                <a  href={`/${routingTable?.['blog_post_route']}/${result.uuid}`}>
                                    <div  className={clsx(style['搜尋結果框'], '搜尋結果框')} >
                                        <span className={clsx(style['搜尋結果-標題'], '搜尋結果框-標題')} dangerouslySetInnerHTML={{ __html: hightlight(result?.title, searchText, 'span', '高亮', 125) }}></span>
                                        <br />
                                        <p className={clsx(style['搜尋結果-敘述'], '搜尋結果-敘述')} dangerouslySetInnerHTML={{ __html: hightlight(result?.description, searchText, 'span', '高亮', 125) }}></p>
                                    </div>
                                </a>
                                }
                            
                            </Fragment>
                        ))
                        }
                    </Fragment>
                
                }

            </div>

        </div>
     


      




    )
};

WebsiteSearchBar.propTypes = {
};

export default WebsiteSearchBar;




