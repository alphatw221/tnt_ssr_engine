import { getToFixedNumber } from "@/lib/utils/toFixedHelper";

export const FREE_SHIPPING_WEIGHT_UNIT_LABEL = '公斤'

export const getLogisticServiceInfo = (logisticService, exchangeRates, subtotal)=>{
    var optionFee = ''
    var optionName = ''
    var optionAddress = null
    var optionFreeShipping = false
    var shippingFeeAfterConvertCurrency = 0
    var remainingToFreeShipping = null

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

        }else if(![0,'',null, undefined].includes(logisticService?.customize_deliver_free_shipping_on_orders_above)){
            remainingToFreeShipping = logisticService?.customize_deliver_free_shipping_on_orders_above - subtotal
        }

    }if(['ecpay'].includes(logisticService?.provider)){
        optionName=logisticService?.option_name||'綠界'
    }
    return {optionFee, optionName, optionFreeShipping, optionAddress, shippingFeeAfterConvertCurrency, remainingToFreeShipping}
}

const getShippingGroupTargetProduct = (cartProduct)=>{
    if(['variant'].includes(cartProduct?.product?.type)) return cartProduct?.variant_product
    if(['compose'].includes(cartProduct?.product?.type)) return cartProduct?.compose_base
    return cartProduct?.product
}

export const getShippingGroupFeeInfo = (logisticService, exchangeRates, cartProducts, excludeUUIDs)=>{
    const shippingGroupRules = logisticService?.shipping_group_rules||[]

    var _groupShippingFee = 0
    var _allGroupsFreeShipping = true
    var _hasFallbackItem = shippingGroupRules.length===0

    const groups = {}

    ;(cartProducts||[]).forEach(cartProduct=>{
        if(excludeUUIDs?.[cartProduct?.uuid])return

        const targetProduct = getShippingGroupTargetProduct(cartProduct)
        const shippingGroupId = targetProduct?.shipping_group?.id ?? null
        const rule = shippingGroupId!=null ? shippingGroupRules.find(_rule=>_rule?.shipping_group?.id===shippingGroupId) : null

        if(!rule){
            _hasFallbackItem = true
            return
        }

        if(!groups[shippingGroupId])groups[shippingGroupId] = {rule, items:[]}
        groups[shippingGroupId].items.push({
            free_shipping_weight: parseFloat(targetProduct?.free_shipping_weight||0),
            quantity: cartProduct?.quantity||0,
        })
    })

    const _breakdown = []

    Object.values(groups).forEach(({rule, items})=>{
        const rate = exchangeRates?.[rule?.base_fee_currency]||1
        const baseFee = parseFloat(rule?.base_fee||0)/rate
        const threshold = parseFloat(rule?.free_shipping_weight_threshold||0)

        var groupFee = 0
        var groupFreeShipping = true
        var remainingToFreeShipping = null

        if(rule?.charge_fee_per_quantity){
            items.forEach(item=>{
                if(item.free_shipping_weight>=threshold)return
                groupFee += baseFee * item.quantity
                groupFreeShipping = false
            })
        }else{
            const totalWeight = items.reduce((sum, item)=>sum + item.free_shipping_weight*item.quantity, 0)
            if(totalWeight<threshold){
                groupFee = baseFee
                groupFreeShipping = false
                remainingToFreeShipping = threshold - totalWeight
            }
        }

        _groupShippingFee += groupFee
        _allGroupsFreeShipping = _allGroupsFreeShipping && groupFreeShipping

        _breakdown.push({
            shippingGroupId: rule?.shipping_group?.id,
            name: rule?.shipping_group?.name,
            fee: groupFee,
            freeShipping: groupFreeShipping,
            remainingToFreeShipping,
        })
    })

    return {groupShippingFee:_groupShippingFee, allGroupsFreeShipping:_allGroupsFreeShipping, hasFallbackItem:_hasFallbackItem, breakdown:_breakdown}
}