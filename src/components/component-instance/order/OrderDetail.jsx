
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import clsx from "clsx";

import style from "./OrderDetail.module.scss"


// import { useParams, useSearchParams } from "next/navigation";

import { customer_retrieve_order } from "@/api/order";
import Cookies from "js-cookie";

import OrderItemsSummary from "./OrderItemsSummary"
import PaymentInfo from "./payment-info/PaymentInfo"
// import { useParams, useSearchParams } from "react-router-dom";

const OrderDetail = ({  
    // node,  mode, actions, update, routingTable, ...props
    // routingTable,
    // element, 
    // elementProps,
    // mode,
    // ...props
    guestUUID, 
    objectUUID,

    routingTable,
    element, 
    elementProps,
    mode,
    ...props

}) => {

    // const params = useParams()
    // let { pathname } = useLocation();
    // let { object_id } = useParams();
    // const searchParams = useSearchParams()
    // const searchParams = new URLSearchParams(window.location.search);



    const [order, setOrder] = useState(null)
    useEffect(()=>{
        
        if(![undefined, null, ''].includes(Cookies.get('customer_access_token')) ||
         ![undefined, null, ''].includes(Cookies.get('guest_access_token')) ||
         ![undefined, null, ''].includes(guestUUID)
        ){
            if(order==null && objectUUID){
                customer_retrieve_order({'order_uuid':objectUUID, 'guest_uuid':guestUUID}).then(res=>{
                  console.log(res.data)
                  setOrder(res.data)
                }).catch(err=>{
                    window.location.href = `/${routingTable?.['customer_login_route']}?redirect=${encodeURIComponent(location.pathname + location.search + location.hash)}`
                })
              }
        }else{
            window.location.href = `/${routingTable?.['customer_login_route']}?redirect=${encodeURIComponent(location.pathname + location.search + location.hash)}`
        }
    },[objectUUID])
    //TODO SSR. 把window.__ssr__ object_id 抓出來
    const order_status = {
        'awaiting_payment':'待付款',
        'awaiting_deliver':'處理中',
        'awaiting_receive':'待自取',
        'complete':'完成',
        'cancel':'取消',
        'return_refund':'退貨/退款',
      }
    
    // const logistic_service_providers = {
    //     'self_pickup':'自取',
    //     'customize_deliver':'賣家寄送',
    //     'ecpay':'綠界科技',
    // }
    // const payment_service_providers = {
    //     'bank_transfer':'銀行轉帳',
    //     'ecpay':'綠界科技',
    //     'cash_on_delivery':'貨到付款'
    // }

    const delivery_statuses = {
        'awaiting_fulfillment':'理貨中',
        'awaiting_shipment':'待出貨',
        'awaiting_pickup':'待自取',
        'partially_shipped':'部分出貨',
        'shipped':'已出貨',
        'collected':'已收貨',
        'awaiting_return':'待退貨',
        'returned':'已退貨',
    }
    const payment_statuses = {
        'awaiting_payment':'未付款',
        'awaiting_confirm':'確認中',
        'failed':'失敗',
        'expired':'過期',
        'paid':'付款完成',
        'awaiting_refund':'等待退款',
        'refunded':'退款完成',
        'cash_on_delivery':'貨到付款',
    }




    return (
        
        <div 
            {...elementProps}
          >


            <div className={clsx(style['標題框'], '標題框')}>
                <h3 className={clsx(style['標題'], '標題')}>訂單內容</h3>
            </div>

            <div className={clsx(style['訂單編號框'], '訂單編號框')}>
                <label className={clsx(style['訂單編號-標籤'], '訂單編號-標籤')} >訂單編號 </label>
                <span className={clsx(style['訂單編號'], '訂單編號')}>{`#${order?.id||''}`}</span>
            </div>
            
            <div className={clsx(style['訂單時間框'], '訂單時間框')}>
                <label className={clsx(style['訂單時間-標籤'], '訂單時間-標籤')} >訂單時間 </label>
                <span className={clsx(style['訂單時間'], '訂單時間')}>{order?.created_at?`${new Date(order?.created_at).toLocaleString()}`:''}</span>
            </div>

            <div className={clsx(style['訂單狀態框'], '訂單狀態框')}>
                <label className={clsx(style['訂單狀態-標籤'], '訂單狀態-標籤')}>訂單狀態 </label>
                <span className={clsx(style['訂單狀態'], '訂單狀態', `${order_status?.[order?.status]}`)}>{order_status?.[order?.status]}</span>

                {(order?.status=='awaiting_payment') && !order?.payment_service_provider &&
                <a className={clsx(style['付款-超連結'], '付款-超連結')} href={`/${routingTable?.['order_payment_route']}/${order?.uuid}?guest_uuid=${guestUUID}`}> 去付款</a>}

            </div>
            

                
            <div className={clsx(style['運送資訊框'], '運送資訊框')}>
                <div className={clsx(style['運送資訊標題框'], '運送資訊標題框')}>
                    <h3 className={clsx(style['運送資訊標題'], '運送資訊標題')}>運送資訊</h3>
                </div>
                
                
                <div className={clsx(style['運送方式框'], '運送方式框')}>
                    <label className={clsx(style['運送方式-標籤'], '運送方式-標籤')}>運送方式:</label>
                    <span className={clsx(style['運送方式'], "運送方式")}>{order?.logistic_service_option_name||''}</span>
                </div>
                
                <div className={clsx(style['運送狀態框'], '運送狀態框')}>
                    <label className={clsx(style['運送狀態-標籤'], '運送狀態-標籤')}>運送狀態:</label>
                    <span className={clsx(style['運送狀態'], "運送狀態", `${delivery_statuses?.[order?.delivery_status]}`)}>{delivery_statuses?.[order?.delivery_status]||''}</span>
                </div>

                <div className={clsx(style['收貨人姓名框'], '收貨人姓名框')}>
                    <label className={clsx(style['收貨人姓名-標籤'], '收貨人姓名-標籤')}>收貨人姓名:</label>
                    <span className={clsx(style['收貨人姓名'], '收貨人姓名')}>{order?.shipping_name||''}</span>
                </div>

                {
                // <div className={clsx(style['收貨人名字框'], '收貨人名字框')}>
                //     <label className={clsx(style['收貨人名字-標籤'], '收貨人名字-標籤')}>名字</label>
                //     <span className={clsx(style['收貨人名字'], '收貨人名字')}>{order?.shipping_first_name||''}</span>
                // </div>
                // <div className={clsx(style['收貨人姓氏框'], '收貨人姓氏框')}>
                //     <label className={clsx(style['收貨人姓氏-標籤'], '收貨人姓氏-標籤')}>姓氏</label>
                //     <span className={clsx(style['收貨人姓氏'], '收貨人姓氏')}>{order?.shipping_last_name||''}</span>

                // </div>
                }
                <div className={clsx(style['收貨人電話框'], '收貨人電話框')}>
                    <label className={clsx(style['收貨人電話-標籤'], '收貨人電話-標籤')}>電話:</label>
                    <span className={clsx(style['收貨人電話'], '收貨人電話')}>{order?.shipping_cellphone||''}</span>

                </div>
                <div className={clsx(style['收貨人信箱框'], '收貨人信箱框')}>
                    <label className={clsx(style['收貨人信箱-標籤'], '收貨人信箱-標籤')}>Email:</label>
                    <span className={clsx(style['收貨人信箱'], '收貨人信箱')}>{order?.shipping_email||''}</span>
                </div>
                {
                    order?.shipping_postcode&&
                    <div className={clsx(style['收貨人郵遞區號框'], '收貨人郵遞區號框')}>
                        <label className={clsx(style['收貨人郵遞區號-標籤'], '收貨人郵遞區號-標籤')}>郵遞區號:</label>
                        <span className={clsx(style['收貨人郵遞區號'], '收貨人郵遞區號')}>{order?.shipping_postcode||''}</span>
                    </div>
                }
                {
                    order?.shipping_region&&
                    <div className={clsx(style['收貨人地區框'], '收貨人地區框')}>
                        <label className={clsx(style['收貨人地區-標籤'], '收貨人地區-標籤')}>地區:</label>
                        <span className={clsx(style['收貨人地區'], '收貨人地區')}>{order?.shipping_region||''}</span>
                    </div>
                }
                {
                    order?.shipping_state&&
                    <div className={clsx(style['收貨人州框'], '收貨人州框')}>
                        <label className={clsx(style['收貨人州-標籤'], '收貨人州-標籤')}>州:</label>
                        <span className={clsx(style['收貨人州'], '收貨人州')}>{order?.shipping_state||''}</span>
                    </div>
                }
                {
                    order?.shipping_city&&
                    <div className={clsx(style['收貨人城市框'], '收貨人城市框')}>
                        <label className={clsx(style['收貨人城市-標籤'], '收貨人城市-標籤')}>城市:</label>
                        <span className={clsx(style['收貨人城市'], '收貨人城市')}>{order?.shipping_city||''}</span>
                    </div>
                }
                {
                    order?.shipping_address_1&&
                    <div className={clsx(style['收貨人地址1框'], '收貨人地址1框')}>
                        <label className={clsx(style['收貨人地址1-標籤'], '收貨人地址1-標籤')}>收貨地址1:</label>
                        <span className={clsx(style['收貨人地址1'], '收貨人地址1')}>{order?.shipping_address_1||''}</span>
                    </div>
                }
                {
                    order?.shipping_address_2&&
                    <div className={clsx(style['收貨人地址2框'], '收貨人地址2框')}>
                        <label className={clsx(style['收貨人地址2-標籤'], '收貨人地址2-標籤')}>收貨地址2:</label>
                        <span className={clsx(style['收貨人地址2'], '收貨人地址2')}>{order?.shipping_address_2||''}</span>
                    </div>    
                }
                {
                    order?.customer_remark&&
                    <div className={clsx(style['附註框'], '附註框')}>
                        <label className={clsx(style['附註-標籤'], '附註-標籤')}>附註:</label>
                        <span className={clsx(style['附註'], '附註')}>{order?.customer_remark||''}</span>
                    </div>
                }
              
            </div>
            
            <div className={clsx(style['付款資訊框'], '付款資訊框')}>
                <div className={clsx(style['付款資訊標題框'], '付款資訊標題框')}>
                    <h3 className={clsx(style['付款資訊標題'], '付款資訊標題')}>付款資訊</h3>
                </div>

                <div className={clsx(style['付款狀態框'], '付款狀態框')}>
                    <label className={clsx(style['付款狀態-標籤'], '付款狀態-標籤')}>付款狀態:</label>
                    <span className={clsx(style['付款狀態'], "付款狀態", `${payment_statuses?.[order?.payment_status]}`)}>{payment_statuses?.[order?.payment_status]||''}</span>
                </div>

                <div className={clsx(style['付款方式框'], '付款方式框')}>
                    <label className={clsx(style['付款方式-標籤'], '付款方式-標籤')}>付款方式:</label>
                    <span className={clsx(style['付款方式'], "付款方式")}>{order?.payment_service_option_name||''}</span>
                </div>

                <PaymentInfo order={order} />

                <div className={clsx(style['付款時間框'], '付款時間框')}>
                    <label className={clsx(style['付款時間-標籤'], '付款時間-標籤')}>付款時間:</label>
                    <span className={clsx(style['付款時間'], "付款時間")}>{order?.paid_at?new Date(order?.paid_at).toLocaleTimeString():''}</span>
                </div>

            </div>

            <OrderItemsSummary order={order} routingTable={routingTable}/>
{/* 
            <div className={clsx(style['訂單商品框'], '訂單商品框')}>
                <div className={clsx(style['訂單商品標題框'], '訂單商品標題框')}>
                    <h3 className={clsx(style['訂單商品標題'], '訂單商品標題')}>訂單商品</h3>
                </div>

                <table className={clsx(style['訂單商品-表格'], '訂單商品-表格')}>
                    <thead className={clsx(style['表格-頭段'], '表格-頭段')}>
                    <tr className={clsx(style['表格-列'], '表格-列')}>
                        <th className={clsx(style['表格-欄位名稱'], '表格-欄位名稱')}>圖片</th>
                        <th className={clsx(style['表格-欄位名稱'], '表格-欄位名稱')}>名稱</th>
                        <th className={clsx(style['表格-欄位名稱'], '表格-欄位名稱')}>價錢</th>
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
                                        <a href={`${routingTable?.['product_route']}/${order_product?.product?.uuid}`}>
                                            <img
                                                className={clsx(style['訂單商品-圖片'], "訂單商品-圖片")}
                                                src={order_product?.image}
                                                alt=""
                                            />
                                        </a>
                                    </td>
                                    <td className={clsx(style['訂單商品-名稱框'], "訂單商品-名稱框")}>
                                        <a href={`${routingTable?.['product_route']}/${order_product?.product?.uuid}`}>
                                            <h4 className={clsx(style['訂單商品-名稱'], "訂單商品-名稱")}>
                                                {`${order_product?.name||''}${order_product?.type1?`-${order_product?.type1}:${order_product?.value1}`:''}${order_product?.type2?`-${order_product?.type2}:${order_product?.value2}`:''}${order_product?.compose_base?`-任搭${order_product?.compose_base}件`:''}`}
                                            </h4>
                                        </a>
                                    </td>
                                    <td className={clsx(style['訂單商品-價錢框'], "訂單商品-價錢框")}>
                                        <span className={clsx('訂單商品價錢',style['訂單商品價錢'])}>
                                            {`${order_product?.currency_sign||'$'}${order_product?.price||0}`}
                                        </span>
                                    </td>
                                    <td className={clsx(style['訂單商品-數量框'], "訂單商品-數量框")}>
                                            <span className={clsx('訂單商品數量',style['訂單商品數量'])}>
                                                {`${order_product?.quantity||1}件`}
                                            </span>
                                    </td>
                                   
                                    <td className={clsx(style['訂單商品-小計框'], "訂單商品-小計框")}>
                                        <span className={clsx('訂單商品小計',style['訂單商品小計'])}>
                                            {`${order_product?.subtotal||0}`}
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

                <div className={clsx(style['小計框'], '小計框')}>
                    <label className={clsx(style['小計-標籤'], '小計-標籤')}>小計 </label>
                    <span className={clsx(style['小計'], '小計')}>{order?.subtotal||0}</span>
                </div>
                <div className={clsx(style['使用紅利框'], '使用紅利框')}>
                    <label className={clsx(style['使用紅利-標籤'], '使用紅利-標籤')}>使用紅利</label>
                    <span>{order?.apply_points||0}</span>
                </div>
                <div className={clsx(style['紅利折抵框'], '紅利折抵框')}>
                    <label className={clsx(style['紅利折抵-標籤'], '紅利折抵-標籤')}>紅利折抵</label>
                    <span>{(order?.apply_points_discount)}</span>
                </div>
                <div className={clsx(style['運費框'], '運費框')}>
                    <label className={clsx(style['運費-標籤'], '運費-標籤')}>運費 </label>
                    <span>{order?.shipping_fee||0}</span>
                </div>
                <div className={clsx(style['稅金框'], '稅金框')}>
                    <label className={clsx(style['稅金-標籤'], '稅金-標籤')}>稅金 </label>
                    <span>{order?.tax||0}</span>
                </div>
                <div className={clsx(style['合計框'], '合計框')}>
                    <label className={clsx(style['合計-標籤'], '合計-標籤')}>合計 </label>
                    <span>{order?.total||0}</span>
                </div>


            </div> */}
        </div>)
};

OrderDetail.propTypes = {
};

export default OrderDetail;




