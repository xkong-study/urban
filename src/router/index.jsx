import App from '../App'
import List from '../pages/List'
import Edit from '../pages/Edit'
import Means from '../pages/Means'
import Login from '../pages/Login'
import Register from '../pages/Register'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React from "react";

const BaseRouter=()=>(
    <Router>
    <Routes>
        <Route  path="/" element={<App/>}>
            <Route  path="/list" element={<List/>}/>
            <Route  path="/means" element={<Means/>}/>
            <Route  path="/edit" element={<Edit/>}/>
        </Route>
        <Route  path="/login" element={<Login/>}/>
        <Route  path="/register" element={<Register/>}/>
    </Routes>
</Router>
)
export default BaseRouter