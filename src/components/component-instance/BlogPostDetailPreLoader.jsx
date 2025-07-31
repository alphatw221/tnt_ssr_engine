"use client"

import {  useAppDispatch } from "@/redux/hooks";

import { setBlogPost } from "../../redux/slices/blog-slice"
const BlogPostDetailPreLoader = ({ blogPost}) => {
    console.log(blogPost)
    const dispatch = useAppDispatch();
    dispatch(setBlogPost(blogPost))


    return null

};

BlogPostDetailPreLoader.propTypes = {
};

export default BlogPostDetailPreLoader;




