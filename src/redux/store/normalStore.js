import { configureStore , combineReducers } from '@reduxjs/toolkit';


import cartReducer from "../slices/cart-slice";
import customerReducer from '../slices/customer-slice'
import orderReducer from '../slices/order-slice'
import shopReducer from "../slices/shop-slice"
import blogReducer from "../slices/blog-slice";


export const rootReducer = combineReducers({
    cart: cartReducer,
    customer: customerReducer,
    order: orderReducer,
    shop: shopReducer,
    blog: blogReducer,

});

export function createSSRStore(preloadedState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}