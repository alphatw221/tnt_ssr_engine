import SimpleReactValidator from "simple-react-validator";

export function createValidator(){

    return new SimpleReactValidator({
        element: (message, className) => <div className={className}>{message}</div>,
        messages:{
            required:'此欄位必填',
            email:'請輸入電子郵件',
            phone:'請輸入聯絡電話',
            in:'不相符合',
            default:'資料無效'
        }
    })
}