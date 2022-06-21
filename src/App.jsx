// 引入必要的组件
import React from 'react'
import {Outlet} from 'react-router-dom'
import { Layout } from 'antd';
import Header from './components/Header';
import Aside from './components/Aside';
import Bread from './components/Bread';

export default function App(){
    return (
        <Layout id="app">
            <Header/>
            <div className="container">
              <Aside/>
                    <div className="container_box">
                        <Bread/>
                        <Outlet/>
                    </div>
          </div>
          <footer>欢迎使用该程序</footer>
    </Layout>
    );
}



