// import './App.css';
// import {Header} from "./components/Header/Header";
//
// function App() {
//   return (
//    <>
//        <Header/>
//    </>
//   );
// }
//
// export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {RouterProvider} from "react-router-dom";
import {router} from "./routing/router";
import {Provider} from "react-redux";
import {store} from "./redux";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        {/*<ThemeProvider>*/}
        {/*    <div className={'container'}>*/}
        <div className={'wrapper'}>
            <RouterProvider router={router}/>
        </div>
        {/*</ThemeProvider>*/}
    </Provider>
);

