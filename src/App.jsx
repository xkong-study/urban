// 引入必要的组件
/* jshint esversion: 6 */
import React from 'react';
import {Outlet} from 'react-router-dom';
import { Layout } from 'antd';
import Header from './components/Header';
import Aside from './components/Aside';
import store from "./store";
import { Provider } from "react-redux";
export default function App(){
    console.log('app......store.....',store,store.getState());
    return (
        <Provider store={store}>
        <Layout id="app">
            <Header/>
            <div className="container">
              <Aside/>
                    <div className="container_box">
                        <Outlet/>
                    </div>
          </div>
          <footer>Welcome to this project</footer>
    </Layout>
       </Provider>
    );
}



