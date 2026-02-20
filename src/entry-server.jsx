import React from 'react';
import { renderToString } from 'react-dom/server';
import AppSSR from './AppSSR.jsx';
import WebpageHead from '@/components/webpage/WebpageHead'
import WebpageBody from '@/components/webpage/WebpageBody'


// import {customer_retrieve_wepage} from '@/api/webpage.js'
import {node_server_retrieve_wepage} from '@/api_internal/webpage.js'

import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import { store, persistor } from '@/redux/store/persistedStore';
import { createSSRStore } from '@/redux/store/normalStore';
export function render(url, context = {}) {
  const html = renderToString(<AppSSR url={url} {...context} />);
  return { html, context };
}

export async function getWebpageHtml(host, webpage_name, object_uuid, now, context={}){
    
    const store = createSSRStore();
    console.log('準備 請求 internal api')
    const res = await node_server_retrieve_wepage({'domain':host, webpage_name, object_uuid})
    console.log('完成 請求 internal api')
    const websiteUUID = res.data?.uuid;
    const body =  renderToString(<Provider store={store}>
                          <WebpageBody website={res.data} webpage={res.data.webpage} object={res.data?.object} now={now} mode='prod'/>
                    </Provider>);
    const head = renderToString(<WebpageHead website={res.data} webpage={res.data.webpage} mode='prod'/>);
    const reduxState = store.getState();
    return { head, body, context, reduxState, websiteUUID };
}