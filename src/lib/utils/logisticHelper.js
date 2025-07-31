import { getToFixedNumber } from "@/lib/utils/toFixedHelper";

export const getLogisticServiceInfo = (logisticService, exchangeRates, subtotal)=>{
    var optionFee = ''
    var optionName = ''
    var optionAddress = null
    var optionFreeShipping = false
    var shippingFeeAfterConvertCurrency = 0
    
    if(['self_pickup'].includes(logisticService?.provider)){
        optionName = logisticService?.option_name||logisticService?.self_pickup_location
        optionFreeShipping = true
        optionAddress = logisticService?.self_pickup_address
    }else if(['customize_deliver'].includes(logisticService?.provider)){
        optionName = logisticService?.option_name||logisticService?.customize_deliver_option_name
        const rate = exchangeRates?.[logisticService?.customize_deliver_shipping_fee_currency]||1
        const shipping_fee = logisticService?.customize_deliver_shipping_fee/rate
        const additional_shipping_fee = logisticService?.customize_deliver_additional_shipping_fee/rate

        shippingFeeAfterConvertCurrency = shipping_fee + additional_shipping_fee
        optionFee = `${logisticService?.customize_deliver_shipping_fee_currency_sign}${getToFixedNumber(shippingFeeAfterConvertCurrency, logisticService?.customize_deliver_shipping_fee_currency)}`

        if(
            ![0,'',null, undefined].includes(logisticService?.customize_deliver_free_shipping_on_orders_above) &&
            subtotal>=logisticService?.customize_deliver_free_shipping_on_orders_above
        ){
            if(![0,'',null, undefined].includes(logisticService?.customize_deliver_additional_shipping_fee)){
                optionFreeShipping = false
                shippingFeeAfterConvertCurrency = additional_shipping_fee
                optionFee = `(免基本運費 額外運費：${logisticService?.customize_deliver_shipping_fee_currency_sign}${getToFixedNumber(shippingFeeAfterConvertCurrency, logisticService?.customize_deliver_shipping_fee_currency)})`
            }else{
                optionFreeShipping = true
                optionFee = `(免運)`
                shippingFeeAfterConvertCurrency = 0
            }
            
        }

    }if(['ecpay'].includes(logisticService?.provider)){
        optionName=logisticService?.option_name||'綠界'
    }
    return {optionFee, optionName, optionFreeShipping, optionAddress, shippingFeeAfterConvertCurrency}
}