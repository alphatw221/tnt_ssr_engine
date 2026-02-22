import { store } from '@/redux/store';
import './index.jsx';

// 將真實的 store 掛到 window，供 widget 讀取
window.__APP_REDUX_STORE__ = store;

window.CheckoutWidget01.mount(
  document.getElementById('widget-root'),
  {
    routingTable: {
      order_payment_route: 'payment',
      product_route: 'products',
      shop_route: 'shop',
      customer_login_route: 'login',
      customer_register_route: 'register',
    },
    now: new Date().toISOString(),
  }
);
