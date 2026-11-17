

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





// 取得實際扣庫存的對象：規格商品(variant)用所選規格，其餘用商品本身
// bundle 也跟著這個對象走（variant 上的 bundle，沒有 variant 則用母商品的 bundle）
export const getStockTarget = (product, variantProduct)=>{
    if(product?.type=='variant' && variantProduct) return variantProduct
    return product
}

// 庫存資料的識別鍵：stock 是共用的資料表，不同商品（一般商品、規格、組合商品的子商品）可能指向同一筆 stock
// 以 stock.uuid 識別；沒有 stock 時庫存欄位在品項本身，改用品項的 uuid
export const getStockKey = (item)=>{
    if(item?.stock?.uuid) return `stock:${item.stock.uuid}`
    if(item?.stock) return item?.uuid ? `item:${item.uuid}` : null
    return item?.uuid ? `item:${item.uuid}` : null
}

// 讀取單一品項的庫存設定（優先讀 stock，沒有則讀品項本身的欄位）
const readStock = (item, occupiedUnits)=>{
    const source = item?.stock || item
    const key = getStockKey(item)
    return {
        inventoryControl: !!source?.inventory_control,
        inventory: Number(source?.inventory)||0,
        bundle: Number(item?.bundle)||1,
        occupied: (key && Number(occupiedUnits?.[key])) || 0,
    }
}

// targetProduct: 扣庫存的對象（請用 getStockTarget 取得）
// requireQty: 本次要新增的數量
// productCartQty: 已選取 / 購物車中此品項已有的數量（以商品件數計）
// occupiedUnits: 其他地方已佔用的庫存量 { [stockKey]: 庫存單位 }，由 getCartStockUsage 取得
export const isStockSufficient = (targetProduct, requireQty, productCartQty, occupiedUnits={})=>{

    var inventoryControl = false
    var requireQtySufficient = false
    var inventorySufficient = false

    var avaliableForAddToCart = 0
    var inventory = 0
    var inventoryQty = 0 // 以商品件數計的庫存（已除以 bundle）

    const cartQty = Number(productCartQty)||0
    const totalQty = (Number(requireQty)||0) + cartQty

    // 每一筆庫存：庫存 >= 其他已佔用 + 這次需要的數量 × bundle
    const isEnough = (stock, qty)=>stock.inventory >= stock.occupied + qty * stock.bundle
    const available = (stock)=>stock.inventory - stock.occupied - cartQty * stock.bundle

    if (['single', 'variant', null, undefined].includes(targetProduct?.type)){
        const stock = readStock(targetProduct, occupiedUnits)
        inventoryControl = stock.inventoryControl
        requireQtySufficient = (!inventoryControl) || isEnough(stock, totalQty)
        inventorySufficient = (!inventoryControl) || stock.inventory >= stock.bundle
        avaliableForAddToCart = available(stock)
        inventory = stock.inventory
        inventoryQty = Math.floor(stock.inventory / stock.bundle)
    }
    else if(['assorted'].includes(targetProduct?.type)){
        // 只看有啟用庫存控管的子商品，每個子商品依自己的 stock 與 bundle 計算
        const controlled = (targetProduct?.assorted_products||[]).map(item=>readStock(item, occupiedUnits)).filter(stock=>stock.inventoryControl)

        inventoryControl = controlled.length > 0
        requireQtySufficient = controlled.every(stock=>isEnough(stock, totalQty))
        inventorySufficient = controlled.every(stock=>stock.inventory >= stock.bundle)
        avaliableForAddToCart = controlled.length ? Math.min(...controlled.map(available)) : 0
        inventory = controlled.length ? Math.min(...controlled.map(stock=>stock.inventory)) : 0
        inventoryQty = controlled.length ? Math.min(...controlled.map(stock=>Math.floor(stock.inventory / stock.bundle))) : 0
    }
    else if(targetProduct?.type=='compose'){
        // 任搭商品的庫存由各搭配子商品檢查
        requireQtySufficient = true
        inventorySufficient = true
    }


    return {inventoryControl, requireQtySufficient, inventorySufficient, avaliableForAddToCart, inventory, inventoryQty}


}

// 將「某品項 × 數量」所需的庫存單位累加到 usage 上
// 組合商品(assorted)依各子商品的 stock 與 bundle 拆開計算
const addStockUsage = (usage, target, qty)=>{
    const quantity = Number(qty)||0
    if(!target || !quantity) return
    const items = target?.type=='assorted' ? (target?.assorted_products||[]) : [target]
    items.forEach(item=>{
        const key = getStockKey(item)
        if(key) usage[key] = (usage[key]||0) + quantity * (Number(item?.bundle)||1)
    })
}

// 購物車中已佔用的庫存量 { [stockKey]: 庫存單位 }
// 會計入：一般 / 規格 / 組合商品，以及所有任搭商品內選取的搭配商品
// excludeCartProductUuid: 要排除的購物車商品（例如正在編輯內容的任搭商品）
export const getCartStockUsage = (cartProducts, excludeCartProductUuid=null)=>{
    const usage = {}
    ;(cartProducts||[]).forEach(cartProduct=>{
        if(excludeCartProductUuid && cartProduct?.uuid==excludeCartProductUuid) return
        if(cartProduct?.product?.type=='compose'){
            (cartProduct?.cart_compose_products||[]).forEach(cartComposeProduct=>{
                addStockUsage(usage, getStockTarget(cartComposeProduct?.source_product), cartComposeProduct?.quantity)
            })
        }
        else {
            addStockUsage(usage, getStockTarget(cartProduct?.product, cartProduct?.variant_product), cartProduct?.quantity)
        }
    })
    return usage
}

// 購物車商品的庫存檢查（購物車 / 購物車按鈕 / 結帳共用）
// additionalQty: 要再增加的數量，0 表示檢查目前數量是否足夠
// cartProducts: 傳入時以整台購物車在各 stock 的佔用量判斷（用於 +1 按鈕）；不傳則只看此列自己的數量
export const isCartProductStockSufficient = (cartProduct, additionalQty=0, cartProducts=null)=>{
    const product = cartProduct?.product

    if(product?.type=='compose'){
        const results = (cartProduct?.cart_compose_products||[]).map(cartComposeProduct=>
            isStockSufficient(cartComposeProduct?.source_product, 0, cartComposeProduct?.quantity||0)
        )
        const controlled = results.filter(result=>result.inventoryControl)
        return {
            inventoryControl: controlled.length > 0,
            requireQtySufficient: (Number(additionalQty)||0) <= 0 && results.every(result=>result.requireQtySufficient),
            inventorySufficient: results.every(result=>result.inventorySufficient),
            avaliableForAddToCart: controlled.length ? Math.min(...controlled.map(result=>result.avaliableForAddToCart)) : 0,
            inventory: controlled.length ? Math.min(...controlled.map(result=>result.inventory)) : 0,
            inventoryQty: controlled.length ? Math.min(...controlled.map(result=>result.inventoryQty)) : 0,
        }
    }

    const stockTarget = getStockTarget(product, cartProduct?.variant_product)
    if(cartProducts){
        // 整台購物車的佔用量已包含此列，所以此列數量傳 0
        return isStockSufficient(stockTarget, additionalQty, 0, getCartStockUsage(cartProducts))
    }
    return isStockSufficient(stockTarget, additionalQty, cartProduct?.quantity||0)
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