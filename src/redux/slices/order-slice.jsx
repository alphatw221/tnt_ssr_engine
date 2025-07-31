import { v4 as uuidv4 } from 'uuid';
import cogoToast from 'cogo-toast';
// const { createSlice } = require('@reduxjs/toolkit');
import { createSlice} from "@reduxjs/toolkit";
const orderSlice = createSlice({
    name: "order",
    initialState: {
        order: null,

        cache:{}
    },
    reducers: {
        setCacheKey(state, action){
            const {key} = action?.payload
            state.cache[key] = {...action?.payload}
        },
        removeCache(state, action){
            state.cache = {}
        },
        setOrder(state, action){
            state.order = action.payload
        },
       
    },
});

export const { setOrder, setCacheKey, removeCacheKey, removeCache } = orderSlice.actions;
export default orderSlice.reducer;
