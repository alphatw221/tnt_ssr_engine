import { type } from "os"


export const getCustomizeDeliveryOptions = (settings, cartProductTags)=>{
    

    if(settings?.customize_delivery_enable!=true) return []

    var _options=[]
    _options = (settings?.customize_delivery_options||[]).filter(deliveryOption=>{

            (deliveryOption?.exclude_product_tags||[]).forEach(tag=>{
                if(cartProductTags?.[tag])return false
            })
            return true
    })

    return _options
}

export const getPickupOptions = (settings, cartProductTags)=>{
    
    if(settings?.self_pickup_enable!=true) return []

    var _options=[]
    _options = (settings?.pickup_options||[]).filter(pickupOption=>{

        (pickupOption?.exclude_product_tags||[]).forEach(tag=>{
            if(cartProductTags?.[tag])return false
        })
        return true
    })

    return _options
}

export const getShippingPriceRangeOptions = (settings, cartProductTags, exchangeRates)=>{
    
    const deliveryOptions = getCustomizeDeliveryOptions(settings, cartProductTags)
    const pickupOptions = getPickupOptions(settings, cartProductTags)

    const prices = [];
    (deliveryOptions||[]).forEach(deliveryOption=>{  
        const _shipping_fee_rate = exchangeRates?.[deliveryOption?.shipping_fee_currency]||1
        const _shipping_fee = (deliveryOption?.shipping_fee||0)/_shipping_fee_rate
        prices.push(_shipping_fee)
      })
    if((pickupOptions||[]).length){prices.push(0)}

    const shippingPriceMax = Math.max(...prices)
    const shippingPriceMin = Math.min(...prices)
    

    return {shippingPriceMax, shippingPriceMin, pickupOptions, deliveryOptions}
}


export const getPaymentOptions = (settings)=>{
    


    var _options=[]

    if(settings?.ecpay_enable){
        _options.push('信用卡')
    }
    if(settings?.bank_transfer_enable){
        _options.push('銀行轉帳')
    }
   

    return _options
}

