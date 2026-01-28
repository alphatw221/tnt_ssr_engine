
import PropTypes from "prop-types";
import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import style from './ResetPasswordForm.module.scss'

import { customer_reset_password } from "../../api/customer"
import { createValidator } from "../../lib/validator"

const ResetPasswordForm = ({
    routingTable,
    element,
    elementProps,
    mode,
    ...props
}) => {

    const [, forceUpdate] = useState();
    const resetPasswordValidator = useRef(createValidator())

    // URL params state
    const [token, setToken] = useState('')
    const [email, setEmail] = useState('')
    const [isValidLink, setIsValidLink] = useState(true)

    // Form state
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [viewPassword, setViewPassword] = useState(false)
    const [viewConfirmPassword, setViewConfirmPassword] = useState(false)

    // Submit state
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' })

    // Parse URL params on mount
    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const tokenParam = urlSearchParams.get('token') || '';
        const emailParam = urlSearchParams.get('email') || '';

        if (!tokenParam || !emailParam) {
            setIsValidLink(false)
            return
        }

        setToken(tokenParam)
        setEmail(emailParam)

    }, []);

    const handleResetPassword = () => {
        if (!resetPasswordValidator?.current?.allValid()) {
            resetPasswordValidator?.current?.showMessages()
            forceUpdate(new Date())
            return
        }

        if (newPassword !== confirmPassword) {
            setSubmitMessage({ type: 'error', text: '密碼不一致' })
            return
        }

        setIsSubmitting(true)
        setSubmitMessage({ type: '', text: '' })

        customer_reset_password({ 'token':token, 'password': newPassword }).then(res => {
            setSubmitMessage({ type: 'success', text: '密碼重設成功！即將跳轉至登入頁面...' })
            setIsSubmitting(false)
            // Redirect to login page after 2 seconds
            setTimeout(() => {
                window.location.href = `/${routingTable?.['customer_login_route'] || 'login'}`
            }, 2000)
        }).catch(err => {
            setSubmitMessage({ type: 'error', text: err?.response?.data?.message || '密碼重設失敗，請稍後再試' })
            setIsSubmitting(false)
        })
    }

    // Invalid link view
    if (!isValidLink) {
        return (
            <div
                {...elementProps}
                className={clsx(style['重設密碼表單'], '重設密碼表單', elementProps?.className)}
            >
                <div className={clsx(style['標題框'], '標題框')}>
                    <h3 className={clsx(style['標題'], '標題')}>重設密碼</h3>
                </div>
                <div className={clsx(style['錯誤訊息框'], '錯誤訊息框')}>
                    <p className={clsx(style['錯誤訊息'], '錯誤訊息')}>
                        無效的重設連結，請重新申請密碼重設。
                    </p>
                    <a
                        className={clsx(style['返回登入連結'], '返回登入連結')}
                        href={`/${routingTable?.['customer_login_route'] || 'login'}`}
                    >
                        返回登入頁面
                    </a>
                </div>
            </div>
        )
    }

    return (
        <form
            {...elementProps}
            className={clsx(style['重設密碼表單'], '重設密碼表單', elementProps?.className)}
        >
            <div className={clsx(style['標題框'], '標題框')}>
                <h3 className={clsx(style['標題'], '標題')}>重設密碼</h3>
            </div>

            {/* Display target email */}
            <div className={clsx(style['帳號顯示框'], '帳號顯示框')}>
                <label className={clsx(style['帳號-標籤'], '帳號-標籤')}>帳號：</label>
                <span className={clsx(style['帳號-顯示'], '帳號-顯示')}>{email}</span>
            </div>

            {/* New Password */}
            <div className={clsx(style['密碼框'], '密碼框')}>
                <label className={clsx(style['密碼-標籤'], '密碼-標籤')}>新密碼：</label>
                <div className={clsx(style['密碼輸入框'], '密碼輸入框')}>
                    <input
                        className={clsx(style['密碼-輸入'], '密碼-輸入')}
                        type={viewPassword ? 'text' : 'password'}
                        name="new-password"
                        placeholder="請輸入新密碼"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        onBlur={() => {
                            resetPasswordValidator.current.showMessageFor("newPassword")
                            forceUpdate(new Date())
                        }}
                    />
                    <button
                        className={clsx(style['顯示密碼-按鈕'], '顯示密碼-按鈕')}
                        type="button"
                        onClick={() => setViewPassword(!viewPassword)}
                    >
                        <i className={clsx(style['顯示密碼-圖標'], '顯示密碼-圖標', viewPassword ? "fa fa-solid fa-eye-slash" : "fa fa-solid fa-eye")} />
                    </button>
                </div>
                {resetPasswordValidator.current.message("newPassword", newPassword, "required|min:8", {messages:{'min':'密碼至少需為8位'}, className:'不合規提示'})}
            </div>

            {/* Confirm Password */}
            <div className={clsx(style['密碼框'], '密碼框')}>
                <label className={clsx(style['密碼-標籤'], '密碼-標籤')}>確認新密碼：</label>
                <div className={clsx(style['密碼輸入框'], '密碼輸入框')}>
                    <input
                        className={clsx(style['密碼-輸入'], '密碼-輸入')}
                        type={viewConfirmPassword ? 'text' : 'password'}
                        name="confirm-password"
                        placeholder="請再次輸入新密碼"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onBlur={() => {
                            resetPasswordValidator.current.showMessageFor("confirmPassword")
                            forceUpdate(new Date())
                        }}
                    />
                    <button
                        className={clsx(style['顯示密碼-按鈕'], '顯示密碼-按鈕')}
                        type="button"
                        onClick={() => setViewConfirmPassword(!viewConfirmPassword)}
                    >
                        <i className={clsx(style['顯示密碼-圖標'], '顯示密碼-圖標', viewConfirmPassword ? "fa fa-solid fa-eye-slash" : "fa fa-solid fa-eye")} />
                    </button>
                </div>
                {resetPasswordValidator.current.message("confirmPassword", confirmPassword, `required|in:${newPassword}`, {messages:{'in':'密碼不相符'}, className:'不合規提示'})}
            </div>

            {/* Message display */}
            {submitMessage.text && (
                <div className={clsx(
                    style['訊息框'],
                    '訊息框',
                    submitMessage.type === 'success' ? style['成功'] : style['錯誤']
                )}>
                    {submitMessage.text}
                </div>
            )}

            {/* Submit button */}
            <div className={clsx(style['送出按鈕框'], '送出按鈕框')}>
                <button
                    className={clsx(style['送出按鈕'], '送出按鈕')}
                    type="button"
                    onClick={handleResetPassword}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? '處理中...' : '重設密碼'}
                </button>
            </div>

            {/* Back to login link */}
            {/* <div className={clsx(style['連結框'], '連結框')}>
                <a
                    className={clsx(style['返回登入連結'], '返回登入連結')}
                    href={`/${routingTable?.['customer_login_route'] || 'login'}`}
                >
                    返回登入頁面
                </a>
            </div> */}
        </form>
    )
};

ResetPasswordForm.propTypes = {
};

export default ResetPasswordForm;
