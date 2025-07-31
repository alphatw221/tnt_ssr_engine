
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react"

import style from './ShopCategoriesKingPork.module.scss'
import clsx from "clsx";



import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setWebsiteSearchParams, setSearchParamsUpdatedAt } from "@/redux/slices/estore-slice";
const ShopCategoriesKingPork = ({ node, categories, categoriesReady, props }) => {

  let [ready, setReady] = useState(false);
  // let [searchParams, setSearchParams] = useSearchParams();
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const [selectedCategories, setSelectedCategories] = useState([])

  const { websiteSearchParams } = useAppSelector((state) => state.estore);
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    if(categoriesReady){
      if(searchParams.get('categories')){
        const category_ids = searchParams.get('categories').split(',')
        const _selectedCategories = (categories||[]).filter(category=>category_ids.includes(category.id.toString()))
        setSelectedCategories(_selectedCategories)
        dispatch(setWebsiteSearchParams({...websiteSearchParams, categories:searchParams.get('categories')}))
      }

    }
  }, [categoriesReady])


  const setSearchParams = (name, value)=>{
    const params = new URL(document.location).searchParams;
    params.delete('page')
    params.set(name, value);
    const searchParamsString = params.toString()
    const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParamsString;
    window.history.pushState({path:newurl},'',newurl);
    // router.push(pathname + '?' + searchParamsString)

    const _websiteSearchParams = {...websiteSearchParams}
    _websiteSearchParams[name] = value
    dispatch(setWebsiteSearchParams(_websiteSearchParams))
    dispatch(setSearchParamsUpdatedAt(new Date().toString()))
  }

  const removeSearchParams = (name)=>{

    const params = new URL(document.location).searchParams;
    params.delete('page')
    params.delete(name)
    const searchParamsString = params.toString()
    const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParamsString;
    window.history.pushState({path:newurl},'',newurl);
    // router.push(pathname + '?' + searchParamsString)
    console.log('remove search params')
    const _websiteSearchParams = {...websiteSearchParams}
    delete _websiteSearchParams[name]
    dispatch(setWebsiteSearchParams(_websiteSearchParams))
    dispatch(setSearchParamsUpdatedAt(new Date().toString()))

  }


  const updateSearchParams = (_selectedCategories)=>{

      console.log(_selectedCategories)
      if((_selectedCategories||[]).length){
        const categoriesQuery = (_selectedCategories||[]).map(selectedCategory=>selectedCategory.id).join(',')
        setSearchParams('categories', categoriesQuery)
      }else{
        removeSearchParams('categories')
      }
  }

  return (
    <div className={clsx(style["sidebar-widget"],"mt-35")}>
      
      <h4 className={style["pro-sidebar-title"]} 
        style={{
          color:node?.data.title_font_color?`rgba(${node?.data.title_font_color.r}, ${node?.data.title_font_color.g}, ${node?.data.title_font_color.b}, ${node?.data.title_font_color.a})`:'',
          fontSize:props?.titleFontSize||'',
          fontFamily:node?.data?.title_font_family||'',
          fontWeight:node?.data?.title_font_weight||'',
          lineHeight:props?.titleLineHeight||''
        }}
      >商品類別 Categories </h4>


      <div className={clsx(style["sidebar-widget-list"], "mt-10")}>
        {(categories||[])?.length ? (
          <ul>
            {categories.map((category, key) => {
              return (
                <li key={key}>
                  <div className={style["sidebar-widget-list-left"]}>

                    <div style={{display:'flex', flexDirection:'row', flexWrap:'nowrap'}}>
                      <input type="checkbox" 
                      checked={selectedCategories.map(selectedCategory=>selectedCategory.id).includes(category.id)}
                      onChange={(e)=>{
                        if(e.target.checked){
                          const _selectedCategories = [...selectedCategories, {id:category.id, name:category.name}]
                          setSelectedCategories(_selectedCategories)
                          updateSearchParams(_selectedCategories)
                        }else{
                          const _selectedCategories = selectedCategories.filter(selectedCategory=>selectedCategory.id!=category.id)
                          setSelectedCategories(_selectedCategories)
                          updateSearchParams(_selectedCategories)

                          console.log(_selectedCategories)
                        }
                      }}/>

                      <span className="ml-10"
                        style={{
                          color:node?.data.category_font_color?`rgba(${node?.data.category_font_color.r}, ${node?.data.category_font_color.g}, ${node?.data.category_font_color.b}, ${node?.data.category_font_color.a})`:'',
                          fontSize:props?.categoryFontSize||'',
                          fontFamily:node?.data?.category_font_family||'',
                          fontWeight:node?.data?.category_font_weight||'',
                          lineHeight:props?.categoryLineHeight||'',
                          whiteSpace:'nowrap'

                        }}
                      >{category.name}</span>

                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          "No categories found"
        )}
      </div>
    </div>
  );
};

ShopCategoriesKingPork.propTypes = {
  categories: PropTypes.array,
  categoriesReady: PropTypes.bool,
};

export default ShopCategoriesKingPork;
