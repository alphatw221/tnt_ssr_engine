
import { store } from "./store";
import { Provider } from "react-redux";

import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

// import * as ReactDOM from 'react-dom';

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>
     <DndProvider backend={HTML5Backend}>

              {children}
      </DndProvider>
  </Provider>;
}







// import { PersistGate } from "redux-persist/integration/react";
// import { persistor } from "./store";

// export function PersistProvider({ children }: { children: React.ReactNode }){

//     // return (<DndProvider backend={HTML5Backend}>

//     //         {children}
//     //       </DndProvider>)
//     return (
//         <PersistGate loading={null} persistor={persistor}>
//             <DndProvider backend={HTML5Backend}>

//               {children}
//             </DndProvider>
//         </PersistGate>
//     );
//     // persistor.subscribe(() => {
//     //   /* Hydrate React components when persistor has synced with redux store */
//     //   const { bootstrapped } = persistor.getState();

//     //   if (bootstrapped) {

//     //       ReactDOM.hydrate(<MyEntireApp />,document.getElementById("appOrWhatever"));
//     //   }
//     // });


//     // return <Fragment>{children}</Fragment>;
    
// };

// export function myDndProvider({ children }: { children: React.ReactNode }){
//   return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
// };

