"use client"

import {  useAppDispatch } from "@/redux/hooks";
import { setCategories } from "../../redux/slices/blog-slice"

const BlogSideBarPreLoader = ({ categories, totalRecords}) => {

    const dispatch = useAppDispatch();
    dispatch(setCategories({'categories':categories, 'totalRecords':totalRecords}))

    return null

};

BlogSideBarPreLoader.propTypes = {
};

export default BlogSideBarPreLoader;




