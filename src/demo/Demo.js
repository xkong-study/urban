import React from "react";
import "./index.less";
import { Button } from 'antd';
import 'antd/dist/antd.css'
import { Calendar } from 'antd';
export default class Demo extends React.Component {
    state = {
        count: 0
    };
    handleAdd = () => {
        this.setState({
            count: this.state.count + 1
        });
    };
    render() {
        return (
            <div className="content">
                <p>react项目</p>
                <button onClick={this.handleAdd}>点击一下</button>
                <p>{this.state.count}</p>
                <Button type="primary">按钮组件</Button>
                <Calendar onPanelChange={onPanelChange} />

            </div>
        );
    }
}
function onPanelChange(value, mode) {
    console.log(value.format('YYYY-MM-DD'), mode);
}