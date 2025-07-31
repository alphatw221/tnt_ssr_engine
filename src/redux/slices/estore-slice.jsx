

// const { createSlice } = require('@reduxjs/toolkit');
import { createSlice} from "@reduxjs/toolkit";
const eStoreSlice = createSlice({
    name: 'estore',
    initialState: {
        // store:null,   //not nessary anymore
        // baseCurrency:null,
        // exchangeRates:null,
        // paymentSettings:[],
        // deliverySettings:[],
        // websiteSearchParams:{},
        // searchParamsUpdatedAt:null,

        // data:{},
        // payment_services:[],
        // logistic_services:[],
        // invoice_services:[],
    },
    reducers: {
        setEStore(state, action){
            return {
                ...state,
                ...action.payload,
                // baseCurrency:action.payload?.base_currency,
                // exchangeRates:action.payload?.exchange_rates,
                // paymentSettings:action.payload?.payment_settings,
                // deliverySettings:action.payload?.delivery_settings,
            }
        },

        // setBaseCurrency(state, action){  //deplicated
        //     state.baseCurrency = action.payload
        // },
        // setExchangeRates(state, action){//deplicated
        //     state.exchangeRates = action.payload
        // },
        // setWebsiteSearchParams(state, action){//deplicated
        //     state.websiteSearchParams = action.payload
        // },
        // setSearchParamsUpdatedAt(state, action){//deplicated
        //     state.searchParamsUpdatedAt = action.payload
        // }
    },
});

export const { setEStore, 
    // setBaseCurrency, setExchangeRates, setWebsiteSearchParams, setSearchParamsUpdatedAt 
} = eStoreSlice.actions;
export default eStoreSlice.reducer;
