// 引入必要的组件
import React from 'react'
import {Outlet} from 'react-router-dom'
class App extends React.Component {
  render() {
    return (
        <div className="App">
        <Outlet/>
        </div>
    );
  }
}

export default App;


