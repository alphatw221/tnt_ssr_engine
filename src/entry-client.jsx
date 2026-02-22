import { createRoot, hydrateRoot } from 'react-dom/client';

import {customer_retrieve_wepage} from '@/api/webpage.js'
import WebpageBody from '@/components/webpage/WebpageBody'
import HydrationComplete from '@/components/HydrationComplete'
import { Provider } from 'react-redux';
import StoreSettingsPreloader from "@/components/website/StoreSettingsPreloader";
import { createSSRStore} from '@/redux/store/normalStore'
import { store as csr_store } from '@/redux/store'

const container = document.getElementById('app');

const isSSR = Array.from(container.childNodes).some(node => {
    return node.nodeType !== Node.COMMENT_NODE &&
           (node.nodeType !== Node.TEXT_NODE || node.textContent.trim() !== "");
  });
const props = window.__INITIAL_PROPS__ || {};


const csrBootstrap = async ()=>{
  const { default: AppCSR } = await import('./AppCSR.jsx');
  createRoot(container).render(
      <AppCSR {...props} />)
}

if (isSSR) {
  console.log('is ssr')

  // 攔截 style 插入
  const originalInsert = document.head.appendChild;
  document.head.appendChild = function (el) {
    console.log('head append child')
    console.log(el)
    if (el.tagName === 'STYLE') {
      // 🚀 插到 head 最前面
      document.head.insertBefore(el, document.head.firstChild);
      return el;
    }
    return originalInsert.call(document.head, el);
  };

  const store = createSSRStore();
  window.__APP_REDUX_STORE__ = store;
  customer_retrieve_wepage({webpage_name:window.__SSR_PARAMS__?.webpageName||'', object_uuid:window.__SSR_PARAMS__?.objectUUID||''}).then(res=>{
    hydrateRoot(container,  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
      <StoreSettingsPreloader bonus_point_policy={res.data?.bonus_point_policy} e_commerce_settings={res.data?.e_commerce_settings}/>
      <WebpageBody website={res.data} webpage={res.data.webpage} object={res.data?.object} now={new Date(window.__SSR_PARAMS__?.now)} mode='prod'/>
      <HydrationComplete />
      {/* </PersistGate> */}
  </Provider>);
  })

} else {  //csr

  console.log('csr')
  window.__APP_REDUX_STORE__ = csr_store;
  csrBootstrap();
}


