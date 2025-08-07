
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useRef } from "react";
import clsx from "clsx";
import style from './MyOrders.module.scss'

         
import { useAppSelector, useAppDispatch } from "@/redux/hooks";




// import route_names from "../../route_names";
import { customer_search_order } from "@/api/order";
import Cookies from "js-cookie";

// import Paginator from 'react-hooks-paginator';

import { setCacheKey } from "@/redux/slices/order-slice"
import { getToFixedNumber } from "@/lib/utils/toFixedHelper";




const MyOrders = ({  
    // element,  
    // mode, 
    // actions,
    // routingTable, 
    //  ...props
    routingTable,

    element, 
    elementProps,
    mode,
    ...props
    
    }) => {
    
    const payment_status = {
      'awaiting_payment':'待付款',
      'awaiting_confirm':'待確認',
      'failed':'失敗',
      'expired':'過期',
      'paid':'已付款',
      'awaiting_refund':'待退款',
      'refunded':'已退款',

    }
    const delivery_status = {
      'awaiting_fulfillment':'理貨中',
      'awaiting_shipment':'理貨完畢，待寄出',
      'awaiting_pickup':'待自取',
      'partially_shipped':'部分寄出',
      'shipped':'已寄出',
      'collected':'已收貨',
      'awaiting_return':'待退貨',
      'returned':'已退貨',
    }

    const order_status = {
      'awaiting_payment':'待付款',
      'awaiting_deliver':'處理中',
      'awaiting_receive':'待自取',
      'complete':'完成',
      'cancel':'取消',
      'return_refund':'退貨/退款',
    }

    const order_status_r = {
      '待付款':'awaiting_payment',
      '處理中':'awaiting_deliver',
      '待出貨':'awaiting_deliver',    //deplicated
      '待收貨':'awaiting_receive',    //deplicated
      '待自取':'awaiting_receive',
      '完成':'complete',
      '取消':'cancel',
      '退貨/退款':'return_refund',
    }

    const transformOrderStatus = (_input)=>{
      if(['', null, undefined].includes(_input))return null
      return _input?.split(",")?.map(_status => order_status_r?.[_status]||'')?.join(",");  
      }

    const {cache} = useAppSelector((state) => state.order);


    const [pageSize, setPageLimit] = useState(20);
    const [page, setPage] = useState(cache?.[element?.uuid]?.page||1);
    const [status, setStatus]=useState(cache?.[element?.uuid]?.status||transformOrderStatus(element?.data?.default_order_status)||'')



    const [selectedFilter, setSelectedFilter]=useState(cache?.[element?.uuid]?.selectedFilter||'全部')

    const defaultStatus = ''
    const defaultPage = 1
    const defaultPageSize = 20
    const dispatch = useAppDispatch()
    

    
    
    // const searchOrders = (status, page, page_size)=>{
    //   customer_search_order({
    //     'status':status, 
    //     'page':page, 
    //     'page_size':page_size}).then(res=>{

    //       console.log(res.data)
    //       dispatch(setCacheKey({
    //           'key':element?.uuid,
    //           status,
    //           page,
    //           page_size,
    //           'results':res.data?.results||[],
    //           'count':res.data?.count||0,

    //           'awaiting_payment_count':res?.data?.awaiting_payment_count||0,
    //           'awaiting_deliver_count':res?.data?.awaiting_deliver_count||0,
    //           'awaiting_receive_count':res?.data?.awaiting_receive_count||0,
    //       }))
    //   })
    // }


    useEffect(()=>{

        if(![undefined, null, ''].includes(Cookies.get('customer_access_token')) ||
                 ![undefined, null, ''].includes(Cookies.get('guest_access_token')) ||
                 ![undefined, null, ''].includes(new URLSearchParams(window.location.search).get('guest_uuid'))
        ){


          if(
            !cache?.[element?.uuid]||
            (cache?.[element?.uuid]?.status||defaultStatus)!=status||
            (cache?.[element?.uuid]?.page||defaultPage)!=page||
            (cache?.[element?.uuid]?.pageSize||defaultPageSize)!=pageSize
          ){

            customer_search_order({
              'guest_uuid':new URLSearchParams(window.location.search).get('guest_uuid'),
              'status':status, 
              'page':page, 
              'page_size':pageSize}).then(res=>{

                console.log(res.data)
                dispatch(setCacheKey({
                    'key':element?.uuid,
                    status,
                    page,
                    pageSize,
                    selectedFilter,
                    'results':res.data?.results||[],
                    'count':res.data?.count||0,

                    'awaiting_payment_count':res?.data?.awaiting_payment_count||0,
                    'awaiting_deliver_count':res?.data?.awaiting_deliver_count||0,
                    'awaiting_receive_count':res?.data?.awaiting_receive_count||0,
                }))
            })


          }

            
        }else{
            window.location.href = `/${routingTable?.['customer_login_route']}?redirect=${encodeURIComponent(location.pathname + location.search + location.hash)}`

        }
    },[
      status, page, pageSize, cache, selectedFilter
    ])

  

   

    const logistic_service_providers = {
      'self_pickup':'自取',
      'customize_deliver':'賣家寄送',
      'ecpay':'綠界科技',
    }
    const payment_service_providers = {
      'bank_transfer':'銀行轉帳',
      'ecpay':'綠界科技',
      'cash_on_delivery':'貨到付款'
    }


    return (
          <div 
           {...elementProps}
          >

            <div className={clsx(style['標題框'], '標題框')}>
                <h3 className={clsx(style['標題'], '標題')}>我的訂單</h3>
            </div>
            
            <div className={clsx(style['訂單篩選器框'], '訂單篩選器框')}>
                <div className={clsx(style['單訂單狀態框'], '單訂單狀態框', selectedFilter=='全部'?`${style['選取']} 選取`:'')}>
                  <button className={clsx(style['單訂單狀態-按鈕'], '單訂單狀態-按鈕')} onClick={(e)=>{

                    setSelectedFilter('全部')
                    setStatus(transformOrderStatus(getComputedStyle(e?.target)?.getPropertyValue('--篩選訂單狀態'))||'')
                    setPage(1)


                  }}>
                    <span className={clsx(style['單訂單狀態-文字'], '單訂單狀態-文字')}>全部</span>
                  </button>
                </div>
                <div className={clsx(style['單訂單狀態框'], '單訂單狀態框', selectedFilter=='待付款'?`${style['選取']} 選取`:'')}>
                  <button className={clsx(style['單訂單狀態-按鈕'], '單訂單狀態-按鈕')}onClick={(e)=>{
                    setSelectedFilter('待付款')
                    setStatus(transformOrderStatus(getComputedStyle(e?.target)?.getPropertyValue('--篩選訂單狀態'))||'awaiting_payment')
                    setPage(1)
                 
                  }}>
                    <span className={clsx(style['單訂單狀態-文字'], '單訂單狀態-文字')}>待付款</span>
                    {(cache?.[element?.uuid]?.awaiting_payment_count||0)>0&&<span className={clsx(style['單訂單狀態-數量'], '單訂單狀態-數量')}>{`(${(cache?.[element?.uuid]?.awaiting_payment_count||0)})`}</span>}
                  </button>
                </div>
                <div className={clsx(style['單訂單狀態框'], '單訂單狀態框', selectedFilter=='處理中'?`${style['選取']} 選取`:'')}>
                  <button className={clsx(style['單訂單狀態-按鈕'], '單訂單狀態-按鈕')}onClick={(e)=>{
  
                    setSelectedFilter('處理中')
                    setStatus(transformOrderStatus(getComputedStyle(e?.target)?.getPropertyValue('--篩選訂單狀態'))||'awaiting_deliver')
                    setPage(1)

                 
                  }}>
                    <span className={clsx(style['單訂單狀態-文字'], '單訂單狀態-文字')}>處理中</span>
                    {(cache?.[element?.uuid]?.awaiting_deliver_count||0)>0&&<span className={clsx(style['單訂單狀態-數量'], '單訂單狀態-數量')}>{`(${(cache?.[element?.uuid]?.awaiting_deliver_count||0)})`}</span>}
                  </button>
                </div>
                <div className={clsx(style['單訂單狀態框'], '單訂單狀態框', selectedFilter=='待自取'?`${style['選取']} 選取`:'')}>
                  <button className={clsx(style['單訂單狀態-按鈕'], '單訂單狀態-按鈕')}onClick={(e)=>{

                    setSelectedFilter('待自取')
                    setStatus(transformOrderStatus(getComputedStyle(e?.target)?.getPropertyValue('--篩選訂單狀態'))||'awaiting_receive')
                    setPage(1)
                   
                  }}>
                    <span className={clsx(style['單訂單狀態-文字'], '單訂單狀態-文字')}>待自取</span>
                    {(cache?.[element?.uuid]?.awaiting_receive_count||0)>0&&<span className={clsx(style['單訂單狀態-數量'], '單訂單狀態-數量')}>{`(${(cache?.[element?.uuid]?.awaiting_receive_count||0)})`}</span>}
                  </button>
                </div>
                <div className={clsx(style['單訂單狀態框'], '單訂單狀態框', selectedFilter=='已完成'?`${style['選取']} 選取`:'')}>
                  <button className={clsx(style['單訂單狀態-按鈕'], '單訂單狀態-按鈕')}onClick={(e)=>{
 
                    setSelectedFilter('已完成')
                    setStatus(transformOrderStatus(getComputedStyle(e?.target)?.getPropertyValue('--篩選訂單狀態'))||'complete')
                    setPage(1)
                   
                  }}>
                    <span className={clsx(style['單訂單狀態-文字'], '單訂單狀態-文字')}>已完成</span>
                  </button>
                </div>
                <div className={clsx(style['單訂單狀態框'], '單訂單狀態框', selectedFilter=='取消'?`${style['選取']} 選取`:'')}>
                  <button className={clsx(style['單訂單狀態-按鈕'], '單訂單狀態-按鈕')}onClick={(e)=>{

                    setSelectedFilter('取消')
                    setStatus(transformOrderStatus(getComputedStyle(e?.target)?.getPropertyValue('--篩選訂單狀態'))||'cancel')
                    setPage(1)
             
                  }}>
                    <span className={clsx(style['單訂單狀態-文字'], '單訂單狀態-文字')}>取消</span>
                  </button>
                </div>
                <div className={clsx(style['單訂單狀態框'], '單訂單狀態框', selectedFilter=='退貨/退款'?`${style['選取']} 選取`:'')}>
                  <button className={clsx(style['單訂單狀態-按鈕'], '單訂單狀態-按鈕')}onClick={(e)=>{

                    setSelectedFilter('退貨/退款')
                    setStatus(transformOrderStatus(getComputedStyle(e?.target)?.getPropertyValue('--篩選訂單狀態'))||'return_refund')
                    setPage(1)
             
                  }}>
                    <span className={clsx(style['單訂單狀態-文字'], '單訂單狀態-文字')}>退貨/退款</span>
                  </button>
                </div>
            </div>

            {
              (cache?.[element?.uuid]?.results||[]).length<=0 &&
              <div className={clsx(style['無訂單框'], '無訂單框')}>
                <div className={clsx(style['無訂單-圖標框'], '無訂單-圖標框')}>
                    <i className={clsx(style['無訂單-圖標'], '無訂單-圖標', 'pe-7s-cart')}></i>
                </div>
                <div className={clsx(style['無訂單-文字框'], '無訂單-文字框')}>
                    <span className={clsx(style['無訂單-文字'], '無訂單-文字')}>
                      無歷史訂單
                    </span>
                    {   
                        routingTable?.['shop_route'] &&
                        <a href={`/${routingTable?.['shop_route']}`} className={clsx(style['購物去-超連結'], '購物去-超連結')}>
                            購物去
                        </a>
                    }
                    
                </div>
              </div>
            }

            {
              (cache?.[element?.uuid]?.results||[]).length>0 &&
              <table className={clsx(style['訂單-表格'], '訂單-表格')}>
                <thead className={clsx(style['表格-頭段'], '表格-頭段')}>
                  <tr className={clsx(style['表格-列'], '表格-列')}>
                    <th className={clsx(style['表格-欄位名稱'], '表格-欄位名稱')}>訂單編號</th>
                    <th className={clsx(style['表格-欄位名稱'], '表格-欄位名稱')}>金額</th>
                    {/* <th className={clsx(style['表格-欄位名稱'], '表格-欄位名稱')}>物流狀態</th>
                    <th className={clsx(style['表格-欄位名稱'], '表格-欄位名稱')}>付款狀態</th> */}
                    <th className={clsx(style['表格-欄位名稱'], '表格-欄位名稱')}>訂單狀態</th>
                    <th className={clsx(style['表格-欄位名稱'], '表格-欄位名稱')}>運送方式</th>
                    <th className={clsx(style['表格-欄位名稱'], '表格-欄位名稱')}>付款方式</th>
                    <th className={clsx(style['表格-欄位名稱'], '表格-欄位名稱')}>日期</th>
                    <th className={clsx(style['表格-欄位名稱'], '表格-欄位名稱')}>動作</th>
                  </tr>
                </thead>
                <tbody className={clsx(style['表格-身體'], '表格-身體')}>
                  {
                    (cache?.[element?.uuid]?.results||[]).map((order, key)=>{


                      return (
                        <Fragment key={key}>
                        <tr className={clsx(style['表格-列'], '表格-列', )} key={key}>

                              <td className={clsx(style['表格-訂單編號框'], "表格-訂單編號框")}>
                                  <span className={clsx(style['訂單編號'], "訂單編號")}>{`#${order?.id}`}</span>
                              </td>

                              <td className={clsx(style['表格-訂單金額框'], "表格-訂單金額框")}>
                                  <span className={clsx(style['訂單金額'], "訂單金額")}>{order?.base_currency_sign||'$'}{getToFixedNumber(Number(order?.total||0), order?.base_currency||'TWD')}</span>
                              </td>


                              <td className={clsx(style['表格-訂單狀態框'], "表格-訂單狀態框", `${style?.[order_status?.[order?.status]]} ${order_status?.[order?.status]}`)}>
                                <span className={clsx(style['訂單狀態'], "訂單狀態")}>{order_status?.[order?.status]||''}</span>
                              </td>

                              {/* <td className={clsx(style['表格-付款狀態框'], "表格-付款狀態框")}>
                                <span className={clsx(style['付款狀態'], "付款狀態")}>{payment_status?.[order?.payment_status]||''}</span>
                              </td> */}

                              <td className={clsx(style['表格-訂單運送方式框'], "表格-訂單運送方式框", `${style?.[logistic_service_providers?.[order?.logistic_service_provider]]} ${logistic_service_providers?.[order?.logistic_service_provider]}`)}>
                                <span className={clsx(style['運送方式'], "運送方式")}>{order?.logistic_service_option_name||''}</span>
                              </td>

                              <td className={clsx(style['表格-訂單付款方式框'], "表格-訂單付款方式框", `${style?.[payment_service_providers?.[order?.payment_service_provider]]} ${payment_service_providers?.[order?.payment_service_provider]}`)}>
                                <span className={clsx(style['付款方式'], "付款方式")}>{order?.payment_service_option_name||''}</span>
                              </td>


                              <td className={clsx(style['表格-訂單日期框'], "表格-訂單日期框")}>
                                <span className={clsx(style['訂單日期'], "訂單日期")}>{new Date(order.created_at).toLocaleDateString()}</span>
                              </td>

                              <td className={clsx(style['表格-訂單動作框'], "表格-訂單動作框")}>
                                <a href={`/${routingTable?.['order_route']}/${order?.uuid}?guest_uuid=${new URLSearchParams(window.location.search).get('guest_uuid')}`} className={clsx(style['訂單內容-超連結'], '訂單內容-超連結')}>
                                    訂單內容
                                </a>
                              </td>


                          
                          </tr>


                          {
                            // (order?.order_products||[]).map((order_product, key)=>{
                            //   return ( <tr className={clsx(style['訂單商品'], '訂單商品')} key={key}>
                            //         <td></td>
                            //         <td className={clsx(style['訂單商品-圖片框'], "訂單商品-圖片框")}>
                            //             <a href={`${routingTable?.['product_route']}/${order_product?.product?.uuid}`}>
                            //             <img
                            //                 className={clsx(style['訂單商品-圖片'], "訂單商品-圖片")}
                            //                 src={order_product?.image}
                            //                 alt=""
                            //             />
                            //             </a>
                            //         </td>
                                
                            //         <td className={clsx(style['訂單商品-名稱框'], "訂單商品-名稱框")}>
                            //             <a href={`${routingTable?.['product_route']}/${order_product?.product?.uuid}`}>
                            //                 <h4 className={clsx(style['訂單商品-名稱'], "訂單商品-名稱")}>
                            //                     {`${order_product?.name||''}`}
                            //                 </h4>
                            //             </a>
                            //         </td>


                            //         <td className={clsx(style['訂單商品-數量框'], "訂單商品-數量框")}>
                            //                 <span className={clsx('訂單商品數量',style['訂單商品數量'])}>
                            //                     {`${order_product?.quantity}件`}
                            //                 </span>
                            //         </td>


                            //   </tr>)})
                          }
                          
                        </Fragment>
                      )


                    })
                  }
                </tbody>

                <div className={clsx(style['分頁器框'], "分頁器框")}>
                    {/* <Paginator
                        totalRecords={(cache?.[element?.uuid]?.count||0)}
                        pageLimit={pageSize}
                        pageNeighbours={2}
                        setOffset={()=>{}}
                        currentPage={page}
                        setCurrentPage={(page)=>{
                          setPage(page)
                        }}

                        pagePrevText="«"
                        pageNextText="»"
                    /> */}
                </div>


              </table>
            }

         </div>)
};

MyOrders.propTypes = {
};

export default MyOrders;




