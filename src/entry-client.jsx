// import React, {useEffect} from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
// import AppCSR from './AppCSR.jsx';
// import AppSSR from './AppSSR.jsx'


import {customer_retrieve_wepage} from '@/api/webpage.js'
import WebpageBody from '@/components/webpage/WebpageBody'


import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import { store, persistor } from '@/redux/store/persistedStore';
import { createSSRStore} from '@/redux/store/normalStore'
const container = document.getElementById('app');

// const isSSR = container.hasChildNodes();


const isSSR = Array.from(container.childNodes).some(node => {
    return node.nodeType !== Node.COMMENT_NODE &&
           (node.nodeType !== Node.TEXT_NODE || node.textContent.trim() !== "");
  });
const props = window.__INITIAL_PROPS__ || {};

// console.log(isSSR)

const csrBootstrap = async ()=>{
  const { default: AppCSR } = await import('./AppCSR.jsx');
  createRoot(container).render(<AppCSR {...props} />);
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
  customer_retrieve_wepage({webpage_name:window.__SSR_PARAMS__?.webpageName||'', object_uuid:window.__SSR_PARAMS__?.objectUUID||''}).then(res=>{
    hydrateRoot(container,  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
      <WebpageBody website={res.data} webpage={res.data.webpage} object={res.data?.object} now={new Date(window.__SSR_PARAMS__?.now)} mode='prod'/>
      {/* </PersistGate> */}
  </Provider>);
  })
  //TODO 取得pageName objectUUID
  // const res = await customer_retrieve_wepage({webpage_name:window.__SSR_PARAMS__?.webpageName||'', object_uuid:window.__SSR_PARAMS__?.objectUUID||''})
  // const store = createSSRStore();
  // hydrateRoot(container,  <Provider store={store}>
  //   {/* <PersistGate loading={null} persistor={persistor}> */}
  //     <WebpageBody website={res.data} webpage={res.data.webpage} mode='prod'/>
  //     {/* </PersistGate> */}
  // </Provider>);
  
} else {  //csr




  console.log('csr')
  csrBootstrap();
}


