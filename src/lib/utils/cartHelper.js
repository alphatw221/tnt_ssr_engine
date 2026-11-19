import Cookies from "js-cookie"
import { customer_update_cart_product, customer_delete_cart_product, customer_clear_cart_product } from "../../api/cart"
import cogoToast from 'cogo-toast';
import { 
    guestUpdateCartProductQuantity, 
    deleteCartProduct,
    deleteCartAddonProduct,
    deleteAllCartProduct } from "@/redux/slices/cart-slice";

import { setCustomerCartProduct, customerDeleteCartProduct , setCustomerCartProducts} from "@/redux/slices/customer-slice"
import {getProductPrice, isCartProductStockSufficient} from "@/lib/utils/productHelper"

import {getLogisticServiceInfo, getShippingGroupFeeInfo} from '@/lib/utils/logisticHelper'
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


// 購物車商品目前數量的庫存是否足夠（規格商品以所選 variant 的庫存與 bundle 計算）
export const isInventorySufficient = (cartProduct)=>{
    const {inventoryControl, requireQtySufficient, inventory} = isCartProductStockSufficient(cartProduct, 0)
    return {inventoryControl, inventorySufficient: requireQtySufficient, inventory}
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
    const {groupShippingFee, allGroupsFreeShipping, hasFallbackItem, breakdown} = getShippingGroupFeeInfo(logisticService, exchangeRates, cartProducts, _final_exclude_uuids)

    _shipping_fee = groupShippingFee
    _free_shipping = allGroupsFreeShipping
    var _shipping_fee_breakdown = [...breakdown]

    if(hasFallbackItem){
        const {optionName, optionFreeShipping, shippingFeeAfterConvertCurrency, remainingToFreeShipping} = getLogisticServiceInfo(logisticService, exchangeRates, _subtotal)
        _shipping_fee += shippingFeeAfterConvertCurrency
        _free_shipping = _free_shipping && optionFreeShipping
        _shipping_fee_breakdown.push({
            shippingGroupId: null,
            name: optionName||'其他商品',
            fee: shippingFeeAfterConvertCurrency,
            freeShipping: optionFreeShipping,
            remainingToFreeShipping,
        })
    }


    const _total = _subtotal + _tax + _shipping_fee - _apply_points_discount;

    return {
        contain_product_tags:_contain_product_tags,
        final_exclude_uuids:_final_exclude_uuids, 
        items:_items, 
        subtotal:_subtotal, 
        tax:_tax, 
        free_shipping:_free_shipping,
        shipping_fee:_shipping_fee,
        shipping_fee_breakdown:_shipping_fee_breakdown,
        apply_points_valid:_apply_points_valid,
        apply_points_discount:_apply_points_discount,
        total:_total}


}



// cart_product_uuid: 編輯既有任搭內容時(update_compose)指定要更新的購物車商品，避免同商品同組數的其他列被一起覆蓋
export const updateCartProduct = ( product, variant_product, quantity, dispatch, compose_base, compose_products_data, update_compose, addon_source_product, cart_addon_product_quantity, cart_product_uuid=null)=>{

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
                'cart_product_uuid':cart_product_uuid,
            
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

export const getCartProductsCount = (targetCartProducts)=>{

    var count = 0;
    (targetCartProducts||[]).forEach(targetCartProduct=>{
        count+=(targetCartProduct?.quantity||0)
    })
    return count
}