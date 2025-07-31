
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useRef } from "react";
import clsx from "clsx";
import style from './MyAccountButton.module.scss'

// import {dragItems, dragItemTypes} from '../../lib/dragItems'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHouse, faGear, faBars } from '@fortawesome/free-solid-svg-icons'

// import { useSelector, useDispatch } from "react-redux";            
import { useAppSelector, useAppDispatch} from "@/redux/hooks";



// import route_names from "../../route_names";
import Cookies from "js-cookie";
import {useClickOutsideEvent} from '@/lib/utils/clickOutside.js'
// import { rwdHelper, RWDPropHandler} from "../../lib/utils/rwdHelper"
// import { getRWDStyles} from "@/lib/utils/rwdHelper"

// import  Link  from 'next/link';
import { setCustomer } from '@/redux/slices/customer-slice'
// import {  useRouter } from 'next/navigation';

const MyAccountButton = ({  
    // node,  mode, actions, update, routingTable, children, ...props
    routingTable,
    element, 
    elementProps,
    mode,
    ...props
}) => {
    
    // const websiteEditorState = useAppSelector((state) => state.website_editor);



    const dispatch = useAppDispatch();
    // const router = useRouter()
    
    const customer  = useAppSelector((state) => state.customer);


    const logout = e =>{
        Cookies.remove('customer_access_token')
        dispatch(setCustomer({uuid:null}))
        // location.reload()
        // router.push('/')
        window.location.href = ''
    }
    const dropDown = useRef(null);
    const [showDropDown, setShowDropDown] = useState(false)

    useClickOutsideEvent(useEffect, dropDown,()=>{
        setShowDropDown(false)
    },showDropDown)

    
    // const [hoverIdentityBlock, setHoverIdentityBlock] = useState(false)
    // const [hoverMyOrders, setHoverMyOrders] = useState(false)
    // const [hoverLogout, setHoverLogout] = useState(false)

    // const [hoverLoginButton, setHoverLoginButton] = useState(false)
    // const [hoverRegisterButton, setHoverRegisterButton] = useState(false)



    // const [buttonFontSize, setButtonFontSize] = useState('')
    // const [width, setWidth] = useState('')
    // const [lineHeight, setLineHeight] = useState('')

    // useEffect(()=>{
        

    //     rwdHelper(
    //         websiteEditorState.windowWidth, 
    //         websiteEditorState.sideMenuActive, 
    //         [
    //             new RWDPropHandler(node?.data, 'rwd_width', 'width_unit', setWidth),
    //             new RWDPropHandler(node?.data, 'button_rwd_font_size', 'px', setButtonFontSize),
    //             new RWDPropHandler(node?.data, 'rwd_line_height', 'px', setLineHeight),

    //         ]
    //     )

    // },[ websiteEditorState.windowWidth, websiteEditorState.sideMenuActive, setButtonFontSize, setWidth, setLineHeight, node?.data])

    return (
            <div 
              {...elementProps}
            >

                {
                    [null, undefined, ''].includes(customer?.uuid)
                    ?
                    <div className={clsx(style['超連結框'], '超連結框')}>
                            <a className={clsx(style['登入連結'], '登入連結')} href={`/${routingTable?.['customer_login_route']}`} >登入</a>
                            <span className={clsx(style['分隔線'], '分隔線')}>|</span>
                            <a className={clsx(style['註冊連結'], '註冊連結')} href={`/${routingTable?.['customer_register_route']}`} >註冊</a>
                    </div>
                    :
                    <Fragment>
                        <div className={clsx(style['帳戶按鈕框'], '帳戶按鈕框')}>
                            <button className={clsx(style['帳戶按鈕'], '帳戶按鈕')} onClick={()=>{setShowDropDown(true)}}>
                                <label className={clsx(style['帳戶-標籤'], '帳戶-標籤')}>帳戶：</label>
                                <span className={clsx(style['帳戶-名稱'], '帳戶-名稱')}>{customer?.first_name||''}{' '}{customer?.last_name||''}</span>
                            </button>
                        </div>
                        <div className={clsx(style['我的帳戶-下拉'], '我的帳戶-下拉', showDropDown?style['顯示']:'', showDropDown?'顯示':'')}
                            ref={dropDown}
                        >

                            <div className={clsx(style['紅利點數框'], '紅利點數框')}>
                                <label className={clsx(style['紅利點數-標籤'], '紅利點數-標籤')} >紅利點數：</label>
                                <span className={clsx(style['紅利點數'], '紅利點數')} >{customer?.points||0}</span>
                            </div>

                            <div className={clsx(style['我的訂單框'], '我的訂單框')}>
                                <a href={`/${routingTable?.['my_orders_route']}`} >我的訂單</a>
                            </div>

                            <div className={clsx(style['登出按鈕框'], '登出按鈕框')}>
                                <button className={clsx(style['登出按鈕'], '登出按鈕')} onClick={e => logout(e)}>登出</button>
                            </div>

                        </div>
                    </Fragment>

                }
            </div>
        )
};

MyAccountButton.propTypes = {
};

export default MyAccountButton;




