// const { createSlice } = require('@reduxjs/toolkit');
import { createSlice } from "@reduxjs/toolkit";
const blogSlice = createSlice({
    name: 'blog',
    initialState: {
        blogPosts: null,
        blogPostTotalRecords:0,

        categories:null,
        categoryTotalRecords:0,

        blogPost:null,
    },
    reducers: {
        setBlogPosts(state, action) {
            state.blogPosts = action?.payload?.blogPosts||[];
            state.blogPostTotalRecords = action?.payload?.totalRecords||0;
        },
        setCategories(state, action) {
            state.categories = action?.payload?.categories||[];
            state.categoryTotalRecords = action?.payload?.totalRecords||0;
        },
        setBlogPost(state, action){
            state.blogPost = action?.payload
        }
    },
});

export const { setBlogPosts, setCategories, setBlogPost } = blogSlice.actions;
export default blogSlice.reducer;
