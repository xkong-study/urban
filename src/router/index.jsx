import App from '../App'
import Login from '../pages/Login'
import Register from '../pages/Register'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React, {useEffect, useRef, useState} from 'react';
import Map from "../pages/GoogleMap_";
import Lists from '../pages/Lists'
import Edit from '../pages/Edit'
import Means from '../pages/Means'
import ListTable from '../pages/ListTable'
import Boardnew from "../pages/Boardnew";
import Comment from "../pages/Comment";
import Demo from "../pages/Demo";

const BaseRouter=()=>(
    <Router>
    <Routes>
        <Route  path="/" element={<App/>}>
            <Route  path="/GoogleMap_" element={<Map/>}/>
            <Route  path="/lists" element={<Lists/>}/>
            <Route  path="/means" element={<Means/>}/>
            <Route  path="/edit" element={<Edit/>}/>
            <Route  path="/ListTable" element={<ListTable/>}/>
            <Route  path="/demo" element={<Demo/>}/>
            <Route  path="/Boardnew" element={<Boardnew/>}/>
            <Route  path="/Comment" element={<Comment/>}/>
        </Route>
        <Route  path="/login" element={<Login/>}/>
        <Route  path="/Register" element={<Register/>}/>
    </Routes>
</Router>
)
export default BaseRouter
