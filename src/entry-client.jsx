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


if (isSSR) {
  console.log('is ssr')

  //TODO 取得pageName objectUUID
  const res = await customer_retrieve_wepage({page_name:'undefined', object_uuid:'undefined'})
  const store = createSSRStore();
  hydrateRoot(container,  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
      <WebpageBody website={res.data} webpage={res.data.webpage} mode='prod'/>
      {/* </PersistGate> */}
  </Provider>);
  
} else {  //csr
  console.log('csr')
  const { default: AppCSR } = await import('./AppCSR.jsx');
  createRoot(container).render(<AppCSR {...props} />);
}


