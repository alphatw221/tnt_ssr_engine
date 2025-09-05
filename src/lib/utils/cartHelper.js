import Cookies from "js-cookie"
import { customer_update_cart_product, customer_delete_cart_product, customer_clear_cart_product } from "../../api/cart"
import cogoToast from 'cogo-toast';
import { 
    guestUpdateCartProductQuantity, 
    deleteCartProduct,
    deleteCartAddonProduct,
    deleteAllCartProduct } from "@/redux/slices/cart-slice";

import { setCustomerCartProduct, customerDeleteCartProduct , setCustomerCartProducts} from "@/redux/slices/customer-slice"
import {getProductPrice} from "@/lib/utils/productHelper"

import {getLogisticServiceInfo} from '@/lib/utils/logisticHelper'
// const _getTargetProduct = (cartProduct)=>{

//     // if(cartProduct?.variant_product){
//     //     return cartProduct.variant_product
//     // }
//     // return cartProduct.product

//     if(['variant'].includes(cartProduct?.product?.type)){
//         return cartProduct?.variant_product
//     }

//     return cartProduct.product
// }

// export const getProductPrice = (cartProduct, targetProduct, applyDiscount)=>{    //deplicated
    
//     // const targetProduct = getTargetProduct(cartProduct)

//     if(cartProduct?.product?.type=='compose'){
//         if(applyDiscount){
//             return cartProduct?.compose_base?.discount_price||0
//         }else{
//             return cartProduct?.compose_base?.price||0
//         }
//     }else{
//         if(applyDiscount){
//             return targetProduct?.discount_price||0
//         }else{
//             return targetProduct?.price||0
//         }
//     }

// }


export const getCartProductName = (cartProduct)=>{

    const name = cartProduct?.product?.name||''
    let variant = ''
    let compose_base = ''

    if(['single', 'assorted'].includes(cartProduct?.product?.type)){
        //do nothing
    }
    else if(['variant'].includes(cartProduct?.product?.type)){
        if(cartProduct?.variant_product?.type1 && cartProduct?.variant_product?.value1 ){
            variant += `-${cartProduct?.variant_product?.type1}:${cartProduct?.variant_product?.value1}`
        }
        if(cartProduct?.variant_product?.type2 && cartProduct?.variant_product?.value2 ){
            variant += `-${cartProduct?.variant_product?.type2}:${cartProduct?.variant_product?.value2}`
        }
    }
    else if(['compose'].includes(cartProduct?.product?.type)){
        compose_base=`-任選${cartProduct?.compose_base?.base}件`
    }

    // return name + variant + compose_base
    return [name, variant, compose_base]
}

export const isComposeValid = (cartProduct) =>{

    let count = 0;
    (cartProduct?.cart_compose_products||[]).forEach(cartComposeProduct=>{
        count+=(cartComposeProduct?.quantity||0)
    })
    const _composeValid = (cartProduct?.compose_base?.base||0)*(cartProduct?.quantity||1)==count
    return {composeValid:_composeValid}
}


const __getIsSingleProductStockSufficient = (product, quantity)=>{
    var __inventoryControl = false
    var __inventorySufficient = false
    var __inventory = 0

    __inventoryControl = cartProduct?.product.stock?.inventory_control
    __inventorySufficient = (!_inventoryControl) || ((product?.stock?.inventory||0) > 0 && ((product?.stock?.inventory||0) > quantity ))
    __inventory = product?.stock?.inventory||0

    return {__inventoryControl, __inventorySufficient, __inventory}
}


const _getIsSingleProductInventorySufficient = (product, quantity)=>{
    var _inventoryControl = false
    var _inventorySufficient = false
    var _inventory = 0

    if(product?.stock){
        const {__inventoryControl, __inventorySufficient, __inventory} = __getIsSingleProductStockSufficient(product, quantity)
        _inventoryControl, _inventorySufficient, _inventory = __inventoryControl, __inventorySufficient, __inventory
    }else {
        _inventoryControl = product?.inventory_control
        _inventorySufficient = (!_inventoryControl) || ((product?.inventory||0) > 0 && ((product?.inventory||0) > quantity ))
        _inventory = product?.inventory||0
    }
    return {_inventoryControl, _inventorySufficient, _inventory}
}
export const isInventorySufficient = (cartProduct)=>{

    var inventoryControl = false
    var inventorySufficient = true
    var inventory = 0



    if (['single', 'variant'].includes(cartProduct?.product?.type)){
        const {_inventoryControl, _inventorySufficient, _inventory} = _getIsSingleProductInventorySufficient(cartProduct?.product, (cartProduct?.quantity * cartProduct?.product?.bundle||1))
        inventoryControl, inventorySufficient, inventory = _inventoryControl, _inventorySufficient, _inventory
    }
    else if(['assorted'].includes(cartProduct?.product?.type)){
        const inventories = [];
        (cartProduct?.product?.assorted_products||[])?.forEach((assorted_product)=>{
            const {__inventoryControl, __inventorySufficient, __inventory} = __getIsSingleProductStockSufficient(assorted_product, cartProduct?.quantity * (assorted_product?.bundle||1))
            inventoryControl = inventoryControl || __inventoryControl
            inventorySufficient = inventorySufficient&&__inventorySufficient
            if(__inventoryControl)inventories.push(__inventory)
        })
        inventory = Math?.min(...inventories)||0
    }
    else if([ 'compose'].includes(cartProduct?.product?.type)){
        const inventories = [];
        (cartProduct?.cart_compose_products||[])?.forEach((cart_compose_product)=>{
            const {_inventoryControl, _inventorySufficient, _inventory} = _getIsSingleProductInventorySufficient(cart_compose_product?.source_product, (cart_compose_product?.quantity * cart_compose_product?.source_product?.bundle||1))
            inventoryControl = inventoryControl || _inventoryControl
            inventorySufficient = inventorySufficient&&_inventorySufficient
            if(_inventoryControl)inventories.push(_inventory)
        })
        inventory = Math?.min(...inventories)||0
    }

    return {inventoryControl, inventorySufficient, inventory}


}

// export const isDiscountApplied = (product, now)=>{
//     return (product?.discount_start_time||now) < now && now < (product?.discount_end_time||now)

// }

export const isApplyPointsValid = (customer, applyPoints)=>{
    if(applyPoints<0)return false
    if((customer?.points||0)<0)return false
    if (applyPoints > (customer?.points||0)) return false
    return true
    if(0<=applyPoints && applyPoints<=customer?.points||0) return true
    return false
}

const getApplyPointsDiscount = (bonusPointPolicy, applyPoints, baseCurrency)=>{
    if(['TWD', 'VMD'].includes(baseCurrency)) return Math.max(Math.floor((applyPoints||0) * (bonusPointPolicy?.apply_points_convert_rate||1)), 0)
    return Math.max((applyPoints||0) * (bonusPointPolicy?.apply_points_convert_rate||1), 0)
}

export const getCartSummarize = ({
    cartProducts, 
    exchangeRates, 
    now, 
    excludeUUIDs, 
    checkoutData, 
    logisticServices, 
    customer, 
    bonusPointPolicy,
    baseCurrency,
}
   


) => {



    var _subtotal = 0
    var _items = 0
    var _tax = 0
    var _shipping_fee = 0
    var _free_shipping = false

    var _apply_points_valid = isApplyPointsValid(customer, checkoutData?.apply_points||0)
    
    var _apply_points_discount = getApplyPointsDiscount(bonusPointPolicy, checkoutData?.apply_points||0, baseCurrency)


    var _final_exclude_uuids = {...excludeUUIDs}
    var _contain_product_tags = new Set([])
    if(cartProducts){

   
        cartProducts.forEach(cartProduct => {

            const {inventoryControl, inventorySufficient, inventory} = isInventorySufficient(cartProduct)
            const {composeValid} = isComposeValid(cartProduct)
            const {isDiscountApplied, originalTotalPrice, discountTotalPrice} = getProductPrice(now, cartProduct?.product, cartProduct?.quantity, cartProduct?.variant_product, cartProduct?.compose_base)

            const rate = exchangeRates?.[cartProduct.product?.currency]||1

            if(composeValid && inventorySufficient && !excludeUUIDs?.[cartProduct?.uuid]){
                _items+=cartProduct.quantity
                const _price = (isDiscountApplied?discountTotalPrice:originalTotalPrice)/rate
                _subtotal+=_price;
                if(cartProduct?.product?.taxable)_tax+=(_price * ((cartProduct.product?.tax_rate||0)/1000) );
                
                (cartProduct?.product?.tags||[]).forEach(tag=>{
                    _contain_product_tags.add(tag)
                })
            }else{
                _final_exclude_uuids[cartProduct?.uuid] = true;
            }



            // (cartProduct?.cart_addon_products||[]).forEach(cartAddonProduct=>{




            //     const targetProduct = cartAddonProduct.source_product

            //     const sufficientStock = isStockSufficient(cartAddonProduct.quantity, targetProduct)

            //     const applyDiscount = isDiscountApplied(targetProduct, now)
    
            //     const rate = exchangeRates?.[cartProduct.product?.currency]||1
    
            //     if(sufficientStock && !cartProduct._unselect){
            //         _items+=cartAddonProduct.quantity
            //         const _price = (getProductPrice(cartProduct, targetProduct, applyDiscount) * cartAddonProduct.quantity )/rate
            //         _subtotal+=_price
            //         if(targetProduct?.taxable)_tax+=(_price * ((targetProduct?.tax_rate||0)/1000) )

            //     }


            // })


        });

    }
    const logisticService = (logisticServices||[]).find(_logisticService=>_logisticService?.uuid==checkoutData?.logistic_service_uuid)
    const {optionFreeShipping, shippingFeeAfterConvertCurrency} = getLogisticServiceInfo(logisticService, exchangeRates, _subtotal)
    _free_shipping = optionFreeShipping
    _shipping_fee = shippingFeeAfterConvertCurrency


    const _total = _subtotal + _tax + _shipping_fee - _apply_points_discount;

    return {
        contain_product_tags:_contain_product_tags,
        final_exclude_uuids:_final_exclude_uuids, 
        items:_items, 
        subtotal:_subtotal, 
        tax:_tax, 
        free_shipping:_free_shipping, 
        shipping_fee:_shipping_fee, 
        apply_points_valid:_apply_points_valid,
        apply_points_discount:_apply_points_discount,
        total:_total}


}



export const updateCartProduct = ( product, variant_product, quantity, dispatch, compose_base, compose_products_data, update_compose, addon_source_product, cart_addon_product_quantity)=>{

    // console.log(product)
    // console.log(variant_product)
    // console.log(quantity)
    // console.log(addon_source_product)
    // console.log(cart_addon_product_quantity)
    if([null, undefined, ''].includes(Cookies.get('customer_access_token'))){
        return new Promise((resolve, reject)=>{
            // console.log(addon_source_product)
            // console.log(cart_addon_product_quantity)

            dispatch(guestUpdateCartProductQuantity({
                'product':product, 
                'variant_product':variant_product, 
                'quantity':quantity, 
                'compose_base':compose_base, 
                'compose_products_data':compose_products_data, 
                'update_compose':update_compose,
                'addon_source_product':addon_source_product,
                'cart_addon_product_quantity':cart_addon_product_quantity,
            
            }))
            // cogoToast.success("已加入購物車 Added To Cart", {position: "top-right"});
            resolve()
        })



    }else{
        return customer_update_cart_product({
                'product_uuid':product?.uuid||null, 
                'variant_uuid':variant_product?.uuid||null, 
                'adjust_quantity':quantity||0, 
                'compose_base_uuid':compose_base?.uuid||'',  
                'compose_products_data':compose_products_data||{}, 
                'update_compose':update_compose, 
        
                'addon_source_product_uuid':addon_source_product?.uuid||'',
                'cart_addon_product_adjust_quantity':cart_addon_product_quantity||0
            }).then(res=>{
            dispatch(setCustomerCartProduct(res.data))
            // cogoToast.success("已加入購物車 Added To Cart", {position: "top-right"});
        })
    }
}

export const deleteCartProductV1 = (cart_product_uuid, dispatch)=>{
    if([null, undefined, ''].includes(Cookies.get('customer_access_token'))){
        return new Promise((resolve, reject)=>{
            dispatch(deleteCartProduct(cart_product_uuid))
            cogoToast.error("已移除商品 Removed From Cart", {position: "top-right"});
            resolve()

        })
    }else{
        return customer_delete_cart_product(cart_product_uuid).then(res=>{
            dispatch(customerDeleteCartProduct(cart_product_uuid))
            cogoToast.error("已移除商品 Removed From Cart", {position: "top-right"});
          })
    }
}

export const deleteCartAddonProductV1 = (cartProductIndex, cartAddonProductIndex, cartAddonProduct, dispatch)=>{
    if([null, undefined, ''].includes(Cookies.get('customer_access_token'))){

        return new Promise((resolve, reject)=>{
            dispatch(deleteCartAddonProduct({cartProductIndex, cartAddonProductIndex}))
            cogoToast.error("已移除商品 Removed From Cart", {position: "top-right"});
            resolve()

        })
        

    }else{
        
        // return customer_delete_cart_product(product.id).then(res=>{
        //     dispatch(deleteCartProduct(cartProductIndex))
        //     cogoToast.error("已移除商品 Removed From Cart", {position: "top-right"});
        //   })
    }
}


export const deleteAllCartProductV1 = (dispatch)=>{
    if([null, undefined, ''].includes(Cookies.get('customer_access_token'))){
        return new Promise((resolve, reject)=>{
            dispatch(deleteAllCartProduct())
            cogoToast.error("購物車已清空 Cart cleared", {position: "top-right"});
            resolve()

        })
    }else{
        return customer_clear_cart_product().then(res=>{
            dispatch(setCustomerCartProducts([]))
            cogoToast.error("購物車已清空 Cart cleared", {position: "top-right"});
          })

    }
}