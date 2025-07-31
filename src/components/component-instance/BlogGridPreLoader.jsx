"use client"

import {  useAppDispatch } from "@/redux/hooks";
import { setBlogPosts } from "../../redux/slices/blog-slice"
const BlogGridPreLoader = ({ blogPosts, totalRecords}) => {

    const dispatch = useAppDispatch();
    dispatch(setBlogPosts({'blogPosts':blogPosts, 'totalRecords':totalRecords}))

    return null

};

BlogGridPreLoader.propTypes = {
};

export default BlogGridPreLoader; 




