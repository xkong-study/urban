import React from "react";
import "./index.less";
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
            </div>
        );
    }
}