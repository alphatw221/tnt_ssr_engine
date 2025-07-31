

import clsx from "clsx";
import style from './LoginForm.module.scss'
     
const LoginFormSEO = ({ routingTable, ...props}) => {
    
    return (
        <form>
            <h1 >顧客登入</h1>

            <div >
                <label >電子郵件：</label>
                <input
                    type="email"
                    name="customer-email"
                    placeholder="電子郵件 Email"
                />
            </div>
            
            <div >
                <label >密碼：</label>
                <input
                    type="password"
                    name="customer-password"
                    placeholder="密碼 Password"
                />
            </div>

            <div >
                <label>記住我</label>
                <input 
                    type="checkbox" />
            </div>

            <div >
                <button  type="button"  >
                    登入 Login
                </button>
                <a  href={`/${routingTable?.['customer_register_route']}`} >註冊</a>
            </div>
            
        </form>

    )
};

LoginFormSEO.propTypes = {
};

export default LoginFormSEO;




