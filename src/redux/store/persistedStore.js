import { configureStore, combineReducers } from "@reduxjs/toolkit";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

import cartReducer from "../slices/cart-slice";
import customerReducer from '../slices/customer-slice'
import orderReducer from '../slices/order-slice'
import shopReducer from "../slices/shop-slice"
import blogReducer from "../slices/blog-slice";

import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "KP",
    version: 1.0,
    storage,
    blacklist: [ 'order', 'shop', 'blog',  'customer'], // will not be persisted
    whitelist: [
        'cart',
        // 'user',
        // 'navigation'
    ] // only navigation will be persisted
};

export const rootReducer = combineReducers({
    cart: cartReducer,
    customer: customerReducer,
    order: orderReducer,
    shop: shopReducer,
    blog: blogReducer,

});
const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});



export const persistor = persistStore(store);

