import PropTypes from "prop-types";
import clsx from "clsx";
// import Tab from "react-bootstrap/Tab";
// import Nav from "react-bootstrap/Nav";
import { useState, useEffect, Fragment, useRef, createRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useAppDispatch } from '../../../../redux/hooks'
// import Button from 'react-bootstrap/Button';
// import CloseButton from 'react-bootstrap/CloseButton';
import style from "./BankTransfer.module.scss"

import { createValidator } from "@/lib/validator"
import { customer_upload_receipt } from "@/api/order";
// import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import {removeCache} from "@/redux/slices/order-slice"

const BankTransfer = ({ orderUUID, paymentServiceUUID, bankName, bankAccount, bankDescription, images,  routingTable}) => {


    const router = useRouter()
    const searchParams = useSearchParams()
    // let { object_id } = useParams();

    const [, forceUpdate] = useState();
    const [uploadData,setUploadData] = useState(
        { payment_service_bank_account_identifier:''}
    )

    const uploadReceiptFormValidator = useRef(createValidator())
    const [receiptImage,setReceiptImage] = useState(null)
    const [previewReceiptImage,setPreviewReceiptImage] = useState(null)

    const fileUploadInput = createRef()

    const dispatch = useAppDispatch()
    
    const handleFileChange = (e) => {
      if (e.target.files) {
  
        setReceiptImage(e.target.files[0]);
  
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = event =>{ setPreviewReceiptImage( event.target.result )};
  
      }
    };
  
    const removeReceiptImage = ()=>{
        fileUploadInput.current.value=""
        setReceiptImage(null)
        setPreviewReceiptImage(null)
    }

    const [awaitSubmitButton, setAwaitSubmitButton] = useState(false)


    const uploadReceipt = ()=>{
        if(!uploadReceiptFormValidator.current.allValid()){
            uploadReceiptFormValidator.current.showMessages()
            forceUpdate(new Date())
            return
          }
        console.log(uploadData)
        
        const formData = new FormData()
        if(receiptImage){
            formData.set('payment_service_bank_transfer_receipt',receiptImage)
        }
        formData.set('payment_service_bank_account_identifier',uploadData.payment_service_bank_account_identifier)
        setAwaitSubmitButton(true)
        customer_upload_receipt({
            'order_uuid':orderUUID,
            'guest_uuid':searchParams.get('guest_uuid'),
            'payment_service_uuid':paymentServiceUUID,
            'data':formData
        }).then(res=>{
            console.log(res.data)
            dispatch(removeCache())
            router.push(`/${routingTable?.['order_route']}/${orderUUID}?guest_uuid=${searchParams.get('guest_uuid')}`)
        }).catch(err=>{
            console.log(err)
            setAwaitSubmitButton(false)
        })
    }



    return (


        <Fragment >


            <div className={clsx(style['銀行資訊框'], '銀行資訊框')}>
                {
                    (images||[]).length>0 &&
                    <div className={clsx(style['銀行圖片框'], '銀行圖片框')}>
                        {
                            (images||[]).map((paymentServiceImage,key)=>{
                                return (
                                    <div className={clsx(style['單銀行圖片框'], '單銀行圖片框')} key={key}>
                                        <img className={clsx(style['單銀行圖片'], '單銀行圖片')} src={paymentServiceImage?.image} />
                                    </div>
                                )
                            })
                        }
                    </div>
                }
                
                <div className={clsx(style['銀行名稱框'], '銀行名稱框')}>
                    <label className={clsx(style['銀行名稱框-標籤'], '銀行名稱框-標籤')}>銀行名稱</label>
                    <span className={clsx(style['銀行名稱'], '銀行名稱')}>{bankName}</span>
                </div>
                <div className={clsx(style['銀行帳號框'], '銀行帳號框')}>
                    <label className={clsx(style['銀行帳號-標籤'], '銀行帳號-標籤')}>銀行帳號</label>
                    <span className={clsx(style['銀行帳號'], '銀行帳號')}>{bankAccount}</span>
                </div>
                <div className={clsx(style['轉帳資訊框'], '轉帳資訊框')}>
                    <label className={clsx(style['轉帳資訊-標籤'], '轉帳資訊-標籤')}>轉帳資訊</label>
                    <p className={clsx("ck-content", style['轉帳資訊'], '轉帳資訊')}
                        dangerouslySetInnerHTML={{ __html: bankDescription }}
                    ></p>
                </div>
            </div>

            <div className={clsx(style['上傳付款證明框'], '上傳付款證明框')}>

                
                <div className={clsx(style['上傳單據框'], '上傳單據框')}>
                    <label className={clsx(style['上傳單據-標籤'], '上傳單據框-標籤')}>上傳單據</label>
                    {previewReceiptImage?

                    <div className={clsx(style['上傳圖片框'], '上傳圖片框')}>
                        <img className={clsx(style['上傳圖片'], '上傳圖片')} src={previewReceiptImage}/>
                        <button className={clsx(style['上傳圖片-移除按鈕'], '上傳圖片-移除按鈕')} onClick={()=>{removeReceiptImage()}}>x</button>
                    </div>
                    
                    :
                    <button className={clsx(style['上傳單據-按鈕'], '上傳單據-按鈕')} onClick={()=>{fileUploadInput.current.click()}}>
                        上傳檔案
                    </button>
                    }
                    
                    <input ref={fileUploadInput} type="file" accept="image/jpeg,image/pen,image/jpg" hidden onChange={handleFileChange}/>
                </div>

                <div className={clsx(style['帳戶識別框'], '帳戶識別框')}>
                    <label className={clsx(style['帳戶識別-標籤'], '帳戶識別-標籤')}>帳號末五碼</label>
                    <input className={clsx(style['帳戶識別-輸入'], '帳戶識別-輸入')} type="text" value={uploadData?.payment_service_bank_account_identifier} onChange={(event)=>{setUploadData({...uploadData, payment_service_bank_account_identifier:event.target.value})}}/>
                    {uploadReceiptFormValidator.current.message("payment_service_bank_account_identifier", uploadData.payment_service_bank_account_identifier, "required")}
                </div>
                

                <div className={clsx(style['送出按鈕框'], '送出按鈕框')}>
                    <button className={clsx(style['送出按鈕'], '送出按鈕', awaitSubmitButton?`${style['等待']} 等待`:'')} disabled={awaitSubmitButton} onClick={()=>{uploadReceipt()}}>送出</button>
                </div>
            </div>
            
        </Fragment>

    )
    }



    BankTransfer.propTypes = {
    // bankOptions:PropTypes.array,
};

export default BankTransfer;
