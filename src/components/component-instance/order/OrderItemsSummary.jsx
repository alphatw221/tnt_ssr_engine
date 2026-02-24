import clsx from "clsx";
import style from './OrderItemsSummary.module.scss'

import React, { Fragment, useState} from "react";

import { getToFixedNumber } from "@/lib/utils/toFixedHelper";

const OrderItemsSummary = ({order, routingTable})=>{
    

    const [showOrderItems , setShowOrderItems] = useState(false)

    return (<Fragment>


            <div className={clsx(style['訂單明細框'], '訂單明細框')}>
                <div className={clsx(style['訂單明細標題框'], '訂單明細標題框')} onClick={()=>{setShowOrderItems(!showOrderItems)}}>
                    <h3 className={clsx(style['訂單明細標題'], '訂單明細標題')} onClick={()=>{setShowOrderItems(!showOrderItems)}}>訂單明細</h3>
                </div>

                <table className={clsx(style['訂單商品-表格'], '訂單商品-表格', showOrderItems?`${style['顯示']} 顯示`:'')}>
                    <thead className={clsx(style['表格-頭段'], '表格-頭段')}>
                    <tr className={clsx(style['表格-列'], '表格-列')}>
                        <th className={clsx(style['表格-欄位名稱'], '表格-欄位名稱')}>圖片</th>
                        <th className={clsx(style['表格-欄位名稱'], '表格-欄位名稱')}>名稱</th>
                        <th className={clsx(style['表格-欄位名稱'], '表格-欄位名稱')}>單價</th>
                        <th className={clsx(style['表格-欄位名稱'], '表格-欄位名稱')}>數量</th>
                        <th className={clsx(style['表格-欄位名稱'], '表格-欄位名稱')}>小計</th>
                    </tr>
                    </thead>
                    <tbody className={clsx(style['表格-身體'], '表格-身體')}>
                    {
                        (order?.order_products||[]).map((order_product, key)=>{
                            return ( 
                            <Fragment key={key}>
                                <tr className={clsx(style['單訂單商品框'], '單訂單商品框')} key={key}>
                                    <td className={clsx(style['訂單商品-圖片框'], "訂單商品-圖片框")}>
                                        <a href={`/${routingTable?.['product_route']}/${order_product?.product?.uuid}`}>
                                            <img
                                                className={clsx(style['訂單商品-圖片'], "訂單商品-圖片")}
                                                src={order_product?.image}
                                                alt=""
                                            />
                                        </a>
                                    </td>
                                    <td className={clsx(style['訂單商品-名稱框'], "訂單商品-名稱框")}>
                                        <a href={`/${routingTable?.['product_route']}/${order_product?.product?.uuid}`}>
                                            <h4 className={clsx(style['訂單商品-名稱'], "訂單商品-名稱")}>
                                                {`${order_product?.name||''}`}
                                            </h4>
                                            <h5 className={clsx(style['訂單商品-變體名稱'], "訂單商品-變體名稱")}>{`${order_product?.type1?`-${order_product?.type1}:${order_product?.value1}`:''}${order_product?.type2?`-${order_product?.type2}:${order_product?.value2}`:''}`}</h5>
                                            <h5 className={clsx(style['訂單商品-任搭名稱'], "訂單商品-任搭名稱")}>{`${order_product?.compose_base?`-任搭${order_product?.compose_base}件`:''}`}</h5>
                                        </a>
                                    </td>
                                    <td className={clsx(style['訂單商品-價錢框'], "訂單商品-價錢框")}>
                                        <span className={clsx('訂單商品價錢',style['訂單商品價錢'])}>
                                            {`${order_product?.currency_sign||'$'}${getToFixedNumber(Number(order_product?.price||0), order_product?.currency||'TWD')}`}
                                        </span>
                                    </td>
                                    <td className={clsx(style['訂單商品-數量框'], "訂單商品-數量框")}>
                                            <span className={clsx('訂單商品數量',style['訂單商品數量'])}>
                                                {`${order_product?.quantity||1}件`}
                                            </span>
                                    </td>
                                   
                                    <td className={clsx(style['訂單商品-小計框'], "訂單商品-小計框")}>
                                        <span className={clsx('訂單商品小計',style['訂單商品小計'])}>
                                            {`${order_product?.currency_sign||'$'}${getToFixedNumber(Number(order_product?.subtotal||0), order_product?.currency||'TWD')}`}
                                        </span>
                                    </td>
                                </tr>

                                {
                                    (order_product?.order_compose_products||[]).length>0 &&
                                    (order_product?.order_compose_products||[]).map((order_compose_product, key)=>{
                                        return (
                                            <tr className={clsx(style['單任搭商品框'], "單任搭商品框")} key={key}>
                                                <td></td>
                                                <td className={clsx(style['單任搭商品-圖片框'], "單任搭商品-圖片框")}>
                                                    <img
                                                        className={clsx(style['單任搭商品-圖片'], "單任搭商品-圖片")}
                                                        src={order_compose_product?.image}
                                                        alt=""
                                                    />
                                                </td>
                                                <td className={clsx(style['單任搭商品-名稱框'], "單任搭商品-名稱框")}>
                                                    <span className={clsx('單任搭商品-名稱',style['單任搭商品-名稱'])}>
                                                        {`${order_compose_product?.name}`}
                                                    </span>
                                                </td>
                                                <td className={clsx(style['單任搭商品-數量框'], "單任搭商品-數量框")}>
                                                    <span className={clsx('單任搭商品-數量',style['單任搭商品-數量'])}>
                                                        {`${order_compose_product?.quantity}`}
                                                    </span>
                                                </td>
                                                <td></td>
                                            </tr>
                                        )
                                    })
                                
                                }
                            </Fragment>)})
                    }
                    </tbody>
                </table>
            </div>

            <div className={clsx(style['訂單總結框'], '訂單總結框')}>
                
                <div className={clsx(style['訂單總結標題框'], '訂單總結標題框')}>
                    <h3 className={clsx(style['訂單總結標題'], '訂單總結標題')}>訂單總結</h3>
                </div>

                <div className={clsx(style['小計框'], '小計框')}>
                    <label className={clsx(style['小計-標籤'], '小計-標籤')}>小計 </label>
                    <span className={clsx(style['小計'], '小計')}>
                    {order?.base_currency_sign||'$'}{getToFixedNumber(Number(order?.subtotal||0), order?.base_currency||'TWD')}</span>
                </div>
                <div className={clsx(style['使用紅利框'], '使用紅利框')}>
                    <label className={clsx(style['使用紅利-標籤'], '使用紅利-標籤')}>使用紅利</label>
                    <span>
                        {Number(Number(order?.apply_points||0)?.toFixed(0)).toLocaleString()}
                    </span>
                </div>
                <div className={clsx(style['紅利折抵框'], '紅利折抵框')}>
                    <label className={clsx(style['紅利折抵-標籤'], '紅利折抵-標籤')}>紅利折抵</label>
                    <span>{order?.base_currency_sign||'$'}{getToFixedNumber(Number(order?.apply_points_discount||0), order?.base_currency||'TWD')}</span>
                </div>
                <div className={clsx(style['運費框'], '運費框')}>
                    <label className={clsx(style['運費-標籤'], '運費-標籤')}>運費 </label>
                    <span>{order?.base_currency_sign||'$'}{getToFixedNumber(Number(order?.shipping_fee||0), order?.base_currency||'TWD')}</span>
                </div>
                <div className={clsx(style['稅金框'], '稅金框')}>
                    <label className={clsx(style['稅金-標籤'], '稅金-標籤')}>稅金 </label>
                    <span>{order?.base_currency_sign||'$'}{getToFixedNumber(Number(order?.tax||0), order?.base_currency||'TWD')}</span>
                </div>
                <div className={clsx(style['合計框'], '合計框')}>
                    <label className={clsx(style['合計-標籤'], '合計-標籤')}>合計 </label>
                    <span>{order?.base_currency_sign||'$'}{getToFixedNumber(Number(order?.total||0), order?.base_currency||'TWD')}</span>
                </div>


            </div>
    </Fragment>)
}

export default OrderItemsSummary;


