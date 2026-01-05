// import { v4 as uuidv4 } from 'uuid';
// const { createSlice } = require('@reduxjs/toolkit');
import { createSlice} from "@reduxjs/toolkit";
const customerSlice = createSlice({
    name: "customer",
    initialState: {
        uuid:null,
        email:null,
        first_name:null,
        last_name:null,
        cart_products:[],
        points:0,

    },
    reducers: {
        setCustomer(state, action){
            return {
                ...state,
                ...action.payload,
            }
        },
        setCustomerCartProducts(state, action){
            const res = {
                ...state,
                cart_products:action.payload,
            }
            localStorage.setItem("customer", JSON.stringify(res))
            return res
        },
        setCustomerCartProduct(state, action){
            const res = {
                ...state,
                cart_products:
                    state?.cart_products?.map(_cart_product=>_cart_product.uuid)?.includes(action.payload?.uuid)
                    ?
                
                        state?.cart_products?.map(
                        _cart_product=>
                            _cart_product?.uuid==action.payload?.uuid
                        ?
                            action.payload
                        :
                            _cart_product)
                    :
                        [...state?.cart_products, action.payload]
            }
            localStorage.setItem("customer", JSON.stringify(res))
            return res
        },
        customerDeleteCartProduct(state, action){
            const res = {
                ...state,
                cart_products: state.cart_products.filter(cart_product=>cart_product?.uuid!=action.payload)
            }
            localStorage.setItem("customer", JSON.stringify(res))
            return res
        }
    },
});

export const { setCustomer, setCustomerCartProducts, customerDeleteCartProduct, setCustomerCartProduct } = customerSlice.actions;
export default customerSlice.reducer;
