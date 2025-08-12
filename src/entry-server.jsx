import React from 'react';
import { renderToString } from 'react-dom/server';
import AppSSR from './AppSSR.jsx';
import WebpageHead from '@/components/webpage/WebpageHead'
import WebpageBody from '@/components/webpage/WebpageBody'


import {customer_retrieve_wepage} from '@/api/webpage.js'


import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import { store, persistor } from '@/redux/store/persistedStore';
import { createSSRStore } from '@/redux/store/normalStore';
export function render(url, context = {}) {
  const html = renderToString(<AppSSR url={url} {...context} />);
  return { html, context };
}

export async function getWebpageHtml(webpage_name, object_uuid, context={}){
    
  const store = createSSRStore();

    const res = await customer_retrieve_wepage({webpage_name, object_uuid})

    const websiteUUID = res.data?.uuid;
    const body =  renderToString(<Provider store={store}>
                          <WebpageBody website={res.data} webpage={res.data.webpage} mode='prod'/>
                    </Provider>);
    const head = renderToString(<WebpageHead website={res.data} webpage={res.data.webpage} mode='prod'/>);
    const reduxState = store.getState();
    return { head, body, context, reduxState, websiteUUID };
}