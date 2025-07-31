

export const getIsDiscountApplied = (product, now)=>{
    return (product?.discount_start_time||now) < now && now < (product?.discount_end_time||now)
}



export const getPriceRange = (product, now)=>{
    // console.log(product)
    var _originalMinimumPrice=0
    var _originalMaximumPrice=0
    var _discountMinimumPrice=0
    var _discountMaximumPrice=0
    var _discountMinimumPercent=0
    var _discountMaximumPercent=0
    var originalPrices = []
    var discountPrices = []

    if(product.type=='variant'){
        originalPrices = (product?.variant_products||[]).map(variant_product=>variant_product?.price||0)
    }else if(product.type=='compose'){
        originalPrices = (product?.compose_bases||[]).map(compose_base=>compose_base?.price||0)
    }


    _originalMinimumPrice = Math.min(...originalPrices)
    _originalMaximumPrice = Math.max(...originalPrices)


    if(getIsDiscountApplied(product, now)){

        if(product.type=='variant'){
            discountPrices = (product?.variant_products||[]).map(variant_product=>variant_product?.discount_price||0)
        }else if (product.type=='compose'){
            discountPrices = (product?.compose_bases||[]).map(compose_base=>compose_base?.discount_price||0)
        }
        _discountMinimumPrice = Math.min(...discountPrices)
        _discountMaximumPrice = Math.max(...discountPrices)
    }



    _discountMaximumPercent = parseInt(((_originalMaximumPrice - _discountMaximumPrice)/(_originalMaximumPrice||1))*100)
    _discountMinimumPercent = parseInt(((_originalMinimumPrice - _discountMinimumPrice)/(_originalMinimumPrice||1))*100)


    return {
        originalMinimumPrice:_originalMinimumPrice, 
        originalMaximumPrice:_originalMaximumPrice, 
        discountMinimumPrice:_discountMinimumPrice, 
        discountMaximumPrice:_discountMaximumPrice,
        discountMaximumPercent:_discountMaximumPercent,
        discountMinimumPercent:_discountMinimumPercent,
    }
}





export const isStockSufficient = (targetProduct, requireQty, productCartQty)=>{

    var inventoryControl = false
    var requireQtySufficient = false
    var inventorySufficient = false

    var avaliableForAddToCart = 0
    var inventory = 0

    if (['single', 'variant', null, undefined].includes(targetProduct?.type)){
        if(targetProduct?.stock ){
            inventoryControl = targetProduct.stock?.inventory_control
            requireQtySufficient = (!inventoryControl) || (targetProduct?.stock?.inventory||0) >= ((requireQty + productCartQty||0) * targetProduct?.bundle||1)
            inventorySufficient = (!inventoryControl) || (targetProduct?.stock?.inventory||0) > 0
            avaliableForAddToCart= (targetProduct?.stock?.inventory||0) - ((productCartQty||0) * targetProduct?.bundle||1)
            inventory = targetProduct?.stock?.inventory||0
        }else {
            inventoryControl = targetProduct?.inventory_control
            requireQtySufficient = (!inventoryControl) || (targetProduct?.inventory||0) >= ((requireQty + productCartQty||0) * targetProduct?.bundle||1)
            inventorySufficient = (!inventoryControl) || (targetProduct?.inventory||0) > 0
            avaliableForAddToCart= (targetProduct?.inventory||0) - ((productCartQty||0) * targetProduct?.bundle||1)
            inventory = targetProduct?.inventory
        }
    }
    else if(['assorted'].includes(targetProduct?.type)){
        var _requireQtySufficient = true
        var _inventorySufficient = true

        const avaliableForAddToCarts = []
        const inventories = []
        (targetProduct?.assorted_products||[]).foreach(assorted_product=>{
            requireQtySufficient = _requireQtySufficient && ((!assorted_product.stock?.inventory_control) || (assorted_product?.stock?.inventory||0) >= ((requireQty + productCartQty||0) * targetProduct.bundle))
            _requireQtySufficient = requireQtySufficient
            inventorySufficient = _inventorySufficient && ((!assorted_product.stock?.inventory_control) || (assorted_product?.stock?.inventory||0) > 0)
            _inventorySufficient = inventorySufficient
            avaliableForAddToCarts.push((assorted_product?.stock?.inventory||0) - ((productCartQty||0) * assorted_product.bundle))
            inventories.push(assorted_product?.stock?.inventory)
        })

        avaliableForAddToCart = Math?.min(...avaliableForAddToCarts)||0
        inventory = Math?.min(...inventories)||0
    }
    else if(targetProduct?.type=='compose'){
        //do nothing
        requireQtySufficient=true //
    }


    return {inventoryControl, requireQtySufficient, inventorySufficient, avaliableForAddToCart, inventory}


}


// export const getDiscountPrice = (product, quantityCount, variantProduct, composeBase)=>{
//     if(['single', 'assorted'].includes(product?.type)) return (quantityCount||1) * (product?.discount_price||0)
//     else if(['variant'].includes(product?.type)) return (quantityCount||1) * (variantProduct?.discount_price||0)
//     else if(['compose'].includes(product?.type)) return (quantityCount||1) * (composeBase?.discount_price||0)
// }
// export const getOriginalPrice = (product, quantityCount, variantProduct, composeBase)=>{
//     if(['single', 'assorted'].includes(product?.type)) return (quantityCount||1) * (product?.price||0)
//     else if(['variant'].includes(product?.type)) return (quantityCount||1) * (variantProduct?.price||0)
//     else if(['compose'].includes(product?.type)) return (quantityCount||1) * (composeBase?.price||0)
// }

export const getProductPrice = (now, product, quantityCount, variantProduct, composeBase)=>{
    
    var isDiscountApplied=getIsDiscountApplied(product, now)


    var originalSinglePrice=0
    var discountSinglePrice=0

    var originalTotalPrice=0
    var discountTotalPrice=0

    var _discountPrices = []
    var _prices = []
    var _discountPercents = []

    var originalMinimumPrice=0
    var originalMaximumPrice=0
    var discountMinimumPrice=0
    var discountMaximumPrice=0
    var discountMinimumPercent=0
    var discountMaximumPercent=0

    if(['single', 'assorted'].includes(product?.type)){
        originalSinglePrice = parseFloat(product?.price||0)
        discountSinglePrice = parseFloat(product?.discount_price||0)

        originalTotalPrice = (quantityCount||1) * originalSinglePrice
        discountTotalPrice = (quantityCount||1) * discountSinglePrice

    } 
    else if(['variant'].includes(product?.type)){
        originalSinglePrice = parseFloat(variantProduct?.price||0)
        discountSinglePrice = parseFloat(variantProduct?.discount_price||0)

        _discountPrices = (product?.variant_products||[]).map(_p=>_p?.discount_price||0)
        _prices = (product?.variant_products||[]).map(_p=>_p?.price||0)
        _discountPercents = (product?.variant_products||[]).map(_p=>((_p?.price||0) - (_p?.discount_price||0))/(_p?.price||999999999999999)*100)
    } 
    else if(['compose'].includes(product?.type)){

        originalSinglePrice = parseFloat(composeBase?.price||0);
        discountSinglePrice = parseFloat(composeBase?.discount_price||0);


        _discountPrices = (product?.compose_bases||[]).map(_p=>_p?.discount_price||0)
        _prices = (product?.compose_bases||[]).map(_p=>_p?.price||0)
        _discountPercents = (product?.compose_bases||[]).map(_p=>((_p?.price||0) - (_p?.discount_price||0))/(_p?.price||999999999999999)*100)

    } 

    originalTotalPrice = (quantityCount||1) * originalSinglePrice
    discountTotalPrice = (quantityCount||1) * discountSinglePrice

    if(['variant', 'compose'].includes(product?.type)){
        originalMinimumPrice = _prices?.length>0?Math.min(..._prices):0
        originalMaximumPrice = _prices?.length>0?Math.max(..._prices):0
        discountMinimumPrice = _discountPrices?.length>0?Math.min(..._discountPrices):0
        discountMaximumPrice = _discountPrices?.length>0?Math.max(..._discountPrices):0
        discountMinimumPercent = _discountPercents?.length>0?Math.min(..._discountPercents):0
        discountMaximumPercent = _discountPercents?.length>0?Math.max(..._discountPercents):0
    }
    return {isDiscountApplied, 

        originalSinglePrice,
        discountSinglePrice,

        originalTotalPrice,
        discountTotalPrice,


        originalMinimumPrice,
        originalMaximumPrice,
        discountMinimumPrice,
        discountMaximumPrice,
        discountMinimumPercent,
        discountMaximumPercent,
    

    }


}