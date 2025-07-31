"use client"
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import clsx from "clsx";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";


import { useParams } from 'next/navigation';

import BlogPostNotFound from "../../KPpages/other/BlogPostNotFound"

import { customer_retrieve_blog_post } from "../../api/blog_post";

import { setBlogPost } from "../../redux/slices/blog-slice";
import BlogPostDetailKingPork from "../blog/BlogPostDetailKingPork"
const BlogPostDetail = ({  
    component,  mode, actions, update}) => {


    let { object_id } = useParams();
  
    const [width, setWidth] = useState('')
    const websiteEditorState = useAppSelector((state) => state.website_editor);
    const blog = useAppSelector((state) => state.blog);
    const [isHover, setIsHover] = useState(false)



    const dispatch = useAppDispatch()


    useEffect(()=>{
            if(websiteEditorState.sideMenuActive){
                setWidth('80vw')
            }else{
                setWidth('100vw')
            }

    },[websiteEditorState.sideMenuActive, setWidth])





    const retrieveBlogPost = ()=>{

        var _blog_post_id
        customer_retrieve_blog_post(_blog_post_id=object_id).then(res=>{
            // setProducts(res?.data?.results||[])
            // setTotalRecords(res?.data?.count||0)
            console.log(res)
            dispatch(setBlogPost(res?.data))



        })
    }

    useEffect(()=>{
        if(mode=='edit'){
            retrieveBlogPost()
        }else if (mode==='prod' && !blog.blogPost){
            retrieveBlogPost()
        }
    },[mode])


    if(!blog.blogPost){
        return (
            <div style={{width:width,maxWidth:(component?.max_width||'')+(component?.max_width?component?.max_width_unit:'')}}>
                <BlogPostNotFound />
            </div>
        )
    }
    return (
        
        <div style={{width:width,maxWidth:(component?.max_width||'')+(component?.max_width?component?.max_width_unit:'')}}>
            <BlogPostDetailKingPork blogPost={blog.blogPost} component={component} />

        </div>)
};

BlogPostDetail.propTypes = {
    component: PropTypes.object,
    mode: PropTypes.string,
    actions: PropTypes.object,
    update: PropTypes.func
};

export default BlogPostDetail;




