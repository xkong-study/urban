import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./demo/Demo.js";
import { Calendar } from 'antd';
function onPanelChange(value, mode) {
    console.log(value.format('YYYY-MM-DD'), mode);
}
ReactDOM.render(<App><Calendar onPanelChange={onPanelChange} /></App>, document.getElementById("root"));



