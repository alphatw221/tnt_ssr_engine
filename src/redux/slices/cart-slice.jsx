import { v4 as uuidv4 } from 'uuid';
import cogoToast from 'cogo-toast';
// const { createSlice } = require('@reduxjs/toolkit');
import { createSlice } from "@reduxjs/toolkit";


import { customer_update_cart_product } from '../../api/cart';
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],   //flone
        cartProducts:[]
    },
    reducers: {
        setCartProducts(state, action){
            state.cartProducts = action.payload
            //這邊不要加localStorage
        },
        deleteCartProduct(state, action){

            localStorage.setItem('cart_products', JSON.stringify(state.cartProducts.filter(cartProduct=>cartProduct?.uuid!=action.payload)))
            return {
                ...state,
                cartProducts: state.cartProducts.filter(cartProduct=>cartProduct?.uuid!=action.payload)
            }
        },
        deleteCartAddonProduct(state, action){
            const {cartProductIndex, cartAddonProductIndex } = action.payload

            console.log(cartProductIndex)
            console.log(cartAddonProductIndex)
            // (state.cartProducts?.[cartProductIndex]?.cart_addon_products||[]).splice(cartAddonProductIndex, 1)


            state.cartProducts = state.cartProducts.map((cartProduct, _cartProductIndex)=>{
                if(_cartProductIndex==cartProductIndex){
                    return { 
                        ...cartProduct,
                        cart_addon_products:(cartProduct?.cart_addon_products||[]).filter((cartAddonProduct, _cartAddonProductIndex)=>_cartAddonProductIndex!=cartAddonProductIndex)
                    }
                    
                }else{
                    return cartProduct
                }
            })

        },
        deleteAllCartProduct(state, action){
            localStorage.setItem('cart_products', JSON.stringify([]))
            return {...state, cartProducts:[]}
        },

       
        guestUpdateCartProductQuantity(state, action){
            const {product, variant_product, quantity, compose_base, compose_products_data, update_compose, addon_source_product, cart_addon_product_quantity} = action.payload



            if((state?.cartProducts||[])?.some(cartProduct=>
                (
                    cartProduct?.product?.uuid==product.uuid
                    &&
                    (cartProduct?.variant_product?.uuid||null)==(variant_product?.uuid||null)
                    &&
                    (cartProduct?.compose_base?.uuid||null)==(compose_base?.uuid||null)

                ))){

                const res =  state.cartProducts.map(cartProduct=>{
                    if( 
                        cartProduct?.product?.uuid==product.uuid
                        &&
                        (cartProduct?.variant_product?.uuid||null)==(variant_product?.uuid||null)
                        &&
                        (cartProduct?.compose_base?.uuid||null)==(compose_base?.uuid||null)
                    ){


                        // Compose
                        let cartComposeProducts
                        if(update_compose){
                            cartComposeProducts = []
                        }else{
                            cartComposeProducts = JSON.parse(JSON.stringify(cartProduct?.cart_compose_products||[]))
                        }
                        Object.entries(compose_products_data||{}).forEach(([compose_product_uuid, _quantity])=>{
                            if(!_quantity)return

                            const compose_product = product.compose_products.find(compose_product=>compose_product.uuid==compose_product_uuid)
                            const cart_compose_product = cartComposeProducts.find(cart_compose_product=>cart_compose_product?.source_product?.uuid==compose_product?.source_product?.uuid)
                            
                            if(cart_compose_product){
                                cart_compose_product.quantity+=_quantity
                            }else{
                                cartComposeProducts.push({'id':uuidv4(), 'uuid':uuidv4(), 'quantity':_quantity, 'source_product':JSON.parse(JSON.stringify(compose_product?.source_product))})
                            }
                        })
                        

                        // Addon
                        let cartAddonProducts = JSON.parse(JSON.stringify(cartProduct?.cart_addon_products||[]))
                        const cartAddonProduct = (cartAddonProducts||[]).find((_cartAddonProduct)=>_cartAddonProduct?.source_product?.uuid==addon_source_product?.uuid)
                        if(cartAddonProduct){
                            cartAddonProduct.quantity+=cart_addon_product_quantity||0
                        }else if(addon_source_product){
                            cartAddonProducts = [...cartAddonProducts, {source_product:addon_source_product, quantity:cart_addon_product_quantity}]
                        }
                        cartAddonProducts = (cartAddonProducts||[]).map((_cartAddonProduct)=>{ return {..._cartAddonProduct, quantity:Math.min((_cartAddonProduct?.quantity||0), cartProduct.quantity+quantity) } })


                        
                        return {
                            ...cartProduct, 
                            quantity:(update_compose?quantity:cartProduct.quantity+quantity), 
                            compose_base:compose_base, 
                            cart_compose_products:cartComposeProducts, 
                            cart_addon_products:cartAddonProducts,
                        
                        }

                    }else{
                        return cartProduct
                    }
                })
                
                state.cartProducts = res
                localStorage.setItem('cart_products', JSON.stringify(res))
    
            }else{
                const cart_compose_products = []

                Object.entries(compose_products_data||{}).forEach(([compose_product_uuid, _quantity])=>{
                    if(!_quantity)return
                    const compose_product = product.compose_products.find(compose_product=>compose_product.uuid==compose_product_uuid)
                    if(compose_product ){
                        cart_compose_products.push({'uuid':uuidv4(), 'quantity':_quantity, 'source_product':JSON.parse(JSON.stringify(compose_product?.source_product))})
                    }
                })

                const cartProduct = { 'uuid':uuidv4(), 'product':product, 'variant_product': variant_product, 'quantity' : quantity ,'compose_base':compose_base, 'cart_compose_products':cart_compose_products}
                const res = [...(state?.cartProducts||[]),cartProduct]
                state.cartProducts = res
                localStorage.setItem('cart_products', JSON.stringify(res))
            }




        },




        //-----------------------------flone-----------------------------------
        addToCart(state, action) {
            const product = action.payload;
            if(!product.variation){
                const cartItem = state.cartItems.find(item => item.id === product.id);
                if(!cartItem){
                    state.cartItems.push({
                        ...product,
                        quantity: product.quantity ? product.quantity : 1,
                        cartItemId: uuidv4()
                    });
                } else {
                    state.cartItems = state.cartItems.map(item => {
                        if(item.cartItemId === cartItem.cartItemId){
                            return {
                                ...item,
                                quantity: product.quantity ? item.quantity + product.quantity : item.quantity + 1
                            }
                        }
                        return item;
                    })
                }

            } else {
                const cartItem = state.cartItems.find(
                    item =>
                        item.id === product.id &&
                        product.selectedProductColor &&
                        product.selectedProductColor === item.selectedProductColor &&
                        product.selectedProductSize &&
                        product.selectedProductSize === item.selectedProductSize &&
                        (product.cartItemId ? product.cartItemId === item.cartItemId : true)
                );
                if(!cartItem){
                    state.cartItems.push({
                        ...product,
                        quantity: product.quantity ? product.quantity : 1,
                        cartItemId: uuidv4()
                    });
                } else if (cartItem !== undefined && (cartItem.selectedProductColor !== product.selectedProductColor || cartItem.selectedProductSize !== product.selectedProductSize)) {
                    state.cartItems = [
                        ...state.cartItems,
                        {
                            ...product,
                            quantity: product.quantity ? product.quantity : 1,
                            cartItemId: uuidv4()
                        }
                    ]
                } else {
                    state.cartItems = state.cartItems.map(item => {
                        if(item.cartItemId === cartItem.cartItemId){
                            return {
                                ...item,
                                quantity: product.quantity ? item.quantity + product.quantity : item.quantity + 1,
                                selectedProductColor: product.selectedProductColor,
                                selectedProductSize: product.selectedProductSize
                            }
                        }
                        return item;
                    });
                }
            }

            cogoToast.success("Added To Cart", {position: "bottom-left"});
        },
        deleteFromCart(state, action) {
            state.cartItems = state.cartItems.filter(item => item.cartItemId !== action.payload);
            cogoToast.error("Removed From Cart", {position: "bottom-left"});
        },
        decreaseQuantity(state, action){
            const product = action.payload;
            if (product.quantity === 1) {
                state.cartItems = state.cartItems.filter(item => item.cartItemId !== product.cartItemId);
                cogoToast.error("Removed From Cart", {position: "bottom-left"});
            } else {
                state.cartItems = state.cartItems.map(item =>
                    item.cartItemId === product.cartItemId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
                cogoToast.warn("Item Decremented From Cart", {position: "bottom-left"});
            }
        },
        deleteAllFromCart(state){
            state.cartItems = []
        }
    },
});

export const { 
    setCartProducts, 
    deleteCartProduct, 
    deleteCartAddonProduct, 
    deleteAllCartProduct, 
    guestUpdateCartProductQuantity, 
    addToCart, 
    deleteFromCart, 
    decreaseQuantity, 
    deleteAllFromCart } = cartSlice.actions;

export default cartSlice.reducer;
