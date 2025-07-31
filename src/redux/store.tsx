
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

// import storage from "redux-persist/lib/storage";
// import productReducer from './slices/product-slice';
// import currencyReducer from "./slices/currency-slice";
import cartReducer from "./slices/cart-slice";
// import compareReducer from "./slices/compare-slice";
// import wishlistReducer from "./slices/wishlist-slice";
import eStoreReducer from "./slices/estore-slice";
// import componentTemplateReducer from "./slices/component-templates-slice";
import websiteEditorReducer from './slices/website-editor-slice';
import customerReducer from './slices/customer-slice'
import orderReducer from './slices/order-slice'
import shopReducer from "./slices/shop-slice"

import storage from "redux-persist/lib/storage";
import blogReducer from "./slices/blog-slice";
import editorMemoryReducer from './slices/editor-memory-slice';

import userReducer from "./slices/user-slice"

const persistConfig = {
    key: "KP",
    version: 1.0,
    storage,
    blacklist: ['estore', 'component_templates', 'website_editor', 'order', 'shop', 'blog', 'editor_memory', 'customer'], // will not be persisted
    whitelist: [
        'cart'
        // 'user',
        // 'navigation'
    ] // only navigation will be persisted
};

export const rootReducer = combineReducers({
    // product: productReducer,
    // currency: currencyReducer,
    cart: cartReducer,
    // compare: compareReducer,
    // wishlist: wishlistReducer,
    estore: eStoreReducer,
    // component_templates: componentTemplateReducer,
    website_editor: websiteEditorReducer,
    customer: customerReducer,
    order: orderReducer,
    shop: shopReducer,
    blog: blogReducer,
    editor_memory:editorMemoryReducer,
    user:userReducer

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



// export const store = configureStore({
//     reducer:{
//         // product: productReducer,
//         // currency: currencyReducer,
//         cart: cartReducer,
//         // compare: compareReducer,
//         // wishlist: wishlistReducer,
//         estore: eStoreReducer,
//         // component_templates: componentTemplateReducer,
//         website_editor: websiteEditorReducer,
//         customer: customerReducer,
//         order: orderReducer,
//         shop: shopReducer,
    
//     },
//   devTools: process.env.NODE_ENV !== "production",
// });

export const persistor = persistStore(store);



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;










// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import {
//     persistStore,
//     persistReducer,
//     FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import productReducer from './slices/product-slice';
// import currencyReducer from "./slices/currency-slice";
// import cartReducer from "./slices/cart-slice";
// import compareReducer from "./slices/compare-slice";
// import wishlistReducer from "./slices/wishlist-slice";
// import eStoreReducer from "./slices/estore-slice";
// import componentTemplateReducer from "./slices/component-templates-slice";
// import websiteEditorReducer from './slices/website-editor-slice';
// import customerReducer from './slices/customer-slice'
// import orderReducer from './slices/order-slice'

// const persistConfig = {
//     key: "flone",
//     version: 1.1,
//     storage,
//     blacklist: ['estore', 'component_templates', 'website_editor', 'order'] // will not be persisted
//     //whitelist: ['navigation'] // only navigation will be persisted
// };

// export const rootReducer = combineReducers({
//     product: productReducer,
//     currency: currencyReducer,
//     cart: cartReducer,
//     compare: compareReducer,
//     wishlist: wishlistReducer,
//     estore: eStoreReducer,
//     component_templates: componentTemplateReducer,
//     website_editor: websiteEditorReducer,
//     customer: customerReducer,
//     order: orderReducer

// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: {
//                 ignoredActions: [
//                     FLUSH,
//                     REHYDRATE,
//                     PAUSE,
//                     PERSIST,
//                     PURGE,
//                     REGISTER,
//                 ],
//             },
//         }),
// });

// export const persistor = persistStore(store);