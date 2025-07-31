export const getToFixedNumber = (number, currency)=>{
    // console.log(typeof number)
    if(['TWD', 'VMD'].includes(currency)){
        return Number(number?.toFixed(0)).toLocaleString()
    }
    return Number(number?.toFixed(2)).toLocaleString()
}