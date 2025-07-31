// const { createSlice } = require('@reduxjs/toolkit');
import { createSlice } from "@reduxjs/toolkit";
const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        products: [],
        productTotalRecords:0,

        categories:[],
        categoryTotalRecords:0,

        product:null,

        productReviews:[],
        ProductReviewTotalRecords:0,

        cache:{}

    },
    reducers: {
        setCacheKey(state, action){
            const {key} = action?.payload
            state.cache[key] = {...action?.payload}
        },
        setProducts(state, action) {
            state.products = action?.payload?.products||[];
            state.productTotalRecords = action?.payload?.totalRecords||0;
        },
        setCategories(state, action) {
            state.categories = action?.payload?.categories||[];
            state.categoryTotalRecords = action?.payload?.totalRecords||0;
        },
        setProduct(state, action){
            state.product = action?.payload;
        },
        setProductReveiws(state, action){
            state.productReviews = action?.payload.productReviews||[];
            state.ProductReviewTotalRecords = action?.payload?.totalRecords||0;

        }
    },
});

export const { setProducts, setCategories, setProduct, setProductReveiws, setCacheKey } = shopSlice.actions;
export default shopSlice.reducer;
