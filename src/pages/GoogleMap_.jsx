/* jshint esversion: 6 */

import React, {useEffect, useRef, useState} from 'react';
import {GoogleMap, useJsApiLoader} from '@react-google-maps/api';
import {CommentListApi} from './request/api';
import firebase from "firebase/compat";
import axios from "axios";
import {Card, Input} from "antd";
import {useLocation} from "react-router-dom";
import {Pagination} from 'antd';
import {CircularProgress} from "@material-ui/core";
import OutlinedCard from "../components/OutlinedCard";
import Recommend_Card from "../components/recoomendation_card";
import {useSelector,useDispatch} from 'react-redux';
const {Search} = Input;

export default function GoogleMap_() {
    const firebaseConfig = {
        apiKey: "AIzaSyDSR-cgFYuYuXoDo4jvjxL0FbTfEN4me2c",
        authDomain: "urban-computing-cb07c.firebaseapp.com",
        databaseURL: "https://urban-computing-cb07c-default-rtdb.firebaseio.com",
        projectId: "urban-computing-cb07c",
        storageBucket: "urban-computing-cb07c.appspot.com",
        messagingSenderId: "293478437107",
        appId: "1:293478437107:web:4cd5199b68f68eac542786",
        measurementId: "G-3Z5DD1SJYQ"
    };
    const [count, setCount] = React.useState({lat: 53.49332, lng: -6.3});
    const location = useLocation();
    console.log('useLocation', location.search.split('=')[1]);
    React.useEffect(() => {
        firebase.initializeApp(firebaseConfig);
        firebase.database().ref('/').on('value', (snap) => {
            let obj = snap.val();
            if (obj !== null) {
                for (var key in obj) {
                    if (key.split(',')[2] > '26 17:35:00' && key.split(':')[3] === location.search.split('=')[1]) {
                        setCount(obj[key]);
                        console.log(obj[key]);
                    }
                }
            }
        });
    }, []);

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDSR-cgFYuYuXoDo4jvjxL0FbTfEN4me2c"
    });

    const [myArr, setMyArr] = React.useState([]);
    var next = false;

    var arr = ['https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&sensor=false&key=AIzaSyDSR-cgFYuYuXoDo4jvjxL0FbTfEN4me2c&photoreference=AW30NDywXmQLH2c7Afhe7MNhWZYI5Pwgpmc8xq98ELiD7BFlOO8M4gg8lr5waz4o_P7DCc-EX4qZ1a_nhfoh7fk4BnCmw07EpxmwRFRbjQODr6tT-0lDi5mffnlmXr36Zt3FH0TvVKovw7UnUh6-hFqwqgZ2Fif7JpK2esQAotXEbLZZYeAL', 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&sensor=false&key=AIzaSyDSR-cgFYuYuXoDo4jvjxL0FbTfEN4me2c&photoreference=AW30NDwetw3eNnHwGEHmkPD-V87me7vCdEUx1YlrsxDHhewdctnDqtaMpEDlRQpWoXkW3733oF_0EyNKsg29r_WRswv2Sclv-e4Xi1tl4M8SVoKfokZ40SyB2TAWh5Djw61WPh5MYRAiB54dW-rpDg01aTJxQ6uX3tvYBEYZNoOmpz8rj6OF', 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=AW30NDwk2StB98bZAFFeBy2Ve8ObueIhSrzvRT18JSrLf5ZLoAf68o6EeB-eW1Jy023XjBne0tIINF92gaIsvATifYn7Zpd2Z4nE8i1ReYVFdkOi_hqosqPUd3DlsR5gzUOr64VdIiaAhFMg8X5HmeITzVWrQ606Q59AV3Llfp4c3ubVwv6_&sensor=false&key=AIzaSyDSR-cgFYuYuXoDo4jvjxL0FbTfEN4me2c', 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=AW30NDw9Gt5uIgVeUIM_MNeFH7R2J8j7L6n6WtgWwEulD_4UvyWp9cIp-4QPeJdLzXtQQtE3JVIXfVbjlvm5oUNn189UkSIiOoN3Ck4I5U61KWtmRg-VM71GzcdUZWfJUEMxzehix23g_Y3VMKWTSogy9WidIqyMLeaCjChB7aD4P5fnRbtX&sensor=false&key=AIzaSyDSR-cgFYuYuXoDo4jvjxL0FbTfEN4me2c'];
    const dispatch = useDispatch();
    function QueryData(value) {
        search = value;
        dispatch({type:'SET_LOGIN_STATUS',data:value});
        CommentListApi({}).then(response => {
            const result = response;
            console.log(result);
            for (let key in result) {
                if ((result[key].search === search)) {
                    next = true;
                    return updatePosition();
                }
            }
        });
        setTimeout(() => {
            console.log(next);
            if (!next) {
                axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
                    params: {
                        key: 'AIzaSyDSR-cgFYuYuXoDo4jvjxL0FbTfEN4me2c',
                        types: value,
                        location: '53.49332,-6.31718',
                        radius: '1000000'
                    },
                }).then(function (response) {
                    const result = response.data.results;
                    console.log(result);
                    for (let key in result) {
                        let title = result[key].geometry.location;
                        if (title !== null) {
                            let lat1 = [Object.values(title)[0], count.lat];
                            let lng1 = [Object.values(title)[1], count.lng];
                            var R = 6378137;
                            let dLat1 = (lat1[1] - lat1[0]) * Math.PI / 180;
                            let dLng1 = (lng1[1] - lng1[0]) * Math.PI / 180;
                            let a1 = Math.sin(dLat1 / 2) * Math.sin(dLat1 / 2) + Math.cos(lat1[0] * Math.PI / 180) * Math.cos(lat1[1] * Math.PI / 180) * Math.sin(dLng1 / 2) * Math.sin(dLng1 / 2);
                            let c1 = 2 * Math.atan2(Math.sqrt(a1), Math.sqrt(1 - a1));
                            let d1 = R * c1;
                            if (result[key].photos !== null) {
                                NameArray.push([result[key].name, (d1 / 1000).toPrecision(3) + "km",Object.values(result[key].photos[0])[2]]);
                            }
                            console.log(Object.values(result[key].photos[0])[2]);
                            axios.get('/api/add', {
                                params: {
                                    search: value,
                                    title: result[key].geometry.location,
                                    text: result[key].name,
                                    picture: Object.values(result[key].photos[0])[2],
                                }
                            });
                        }
                    }
                    console.log(NameArray);
                }).catch(function (error) {
                    console.log(error);
                });
            }
        }, 1000);
    }
    const [counter, setCounter] = useState(1);
    const [hidden, setHidden] = useState(true);
    let idm = 0;
    function updatePosition() {
        if (counter !== 0) {
            NameArray = [];
        }
        idm += 1;
        var mapOptions = {
            zoom: 17,
            center: {lat: 53.49332, lng: -6.31718}
        };
        let map1 = new window.google.maps.Map(document.getElementById("test"), mapOptions);
        const marker2 = new window.google.maps.Marker({
            position: count,
        });
        marker2.setMap(map1);
        if (idm > 1) {
            CommentListApi({}).then(response => {
                const result = response;
                for (let key in result) {
                    console.log(result[key]);
                    if (result[key].title!== "" && result[key].picture !== null && (result[key].search === search)) {
                        var lat = [parseFloat(result[key].title.replace(/\"/g, "").split(',')[0].split(':')[1]), count.lat];
                        var lng = [parseFloat(result[key].title.replace(/\"/g, "").split(',')[1].split(':')[1].replace(/\}/g, "")), count.lng];
                        var R = 6378137;
                        var dLat = (lat[1] - lat[0]) * Math.PI / 180;
                        var dLng = (lng[1] - lng[0]) * Math.PI / 180;
                        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat[0] * Math.PI / 180) * Math.cos(lat[1] * Math.PI / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
                        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                        var d = R * c;
                        if (d < 1000000) {
                            const marker1 = new window.google.maps.Marker({
                                position: {
                                    lat: parseFloat(result[key].title.replace(/\"/g, "").split(',')[0].split(':')[1]),
                                    lng: parseFloat(result[key].title.replace(/\"/g, "").split(',')[1].split(':')[1].replace(/\}/g, ""))
                                },
                            });
                            marker1.setMap(map1);
                            console.log(marker1);
                            if (result[key].picture !== []) {
                                NameArray.push([result[key].text, (d / 1000).toPrecision(3) + "km", result[key].picture]);
                            }
                            let myLatlng = new window.google.maps.LatLng(parseFloat(result[key].title.replace(/\"/g, "").split(',')[0].split(':')[1]), parseFloat(result[key].title.replace(/\"/g, "").split(',')[1].split(':')[1].replace(/\}/g, "")));
                            map1.setCenter(myLatlng);
                        }
                    }
                }
                console.log(NameArray);
                setNameArray(NameArray);
            }
            ).catch(function (error) {
                console.log(error);
            });
        }
    }

    setTimeout(() => {
        console.log(counter);
        setFlag(false);
        setHidden(false);
        console.log(flag);
        if (counter === 0 && document.getElementById("test")!=="") {
            updatePosition();
        }
    }, 1000);
    const [flag,setFlag] = useState(true);
    let [search,setSearch] = useState(null);
    const [state, setState] = useState([0, 2]);
    const handleValue = value => {
        console.log(value);
        if (value <= 1) {
            setState([0, 2]);
        } else {
            setState([(value - 1) * 2, (value - 1) * 2 + 2]);
        }
    };
    let [NameArray, setNameArray] = React.useState([]);
    return (
        <div>
            {flag ? <div style={{height: '600px', width: '400px',marginTop:'200px',marginLeft:'160px'}}><CircularProgress /></div> : null}
            <div id="test" style={{height: '680px', width: '400px',marginTop: '-5px'}}></div>
            {/*目前需要双击实现*/}
            <Search id="pop" style={{width: '330px', marginLeft: '500px', marginTop: '-685px'}}
                    placeholder="Search nearest store" onSearch={QueryData}></Search>
            <div style={{width:"430px",marginLeft:"500px",marginTop:"-680px"}}>
                {!hidden ? <OutlinedCard props={count}/> :null}
                {search? <Recommend_Card props={search}/> :null}
            </div>
            <div style={{marginLeft: '-170px', marginTop: '0px'}}>
                {NameArray.slice(state[0], state[1]).map((item) => (
                        <Card
                            style={{
                                width: '430px',
                                height: '220px',
                                marginLeft: '669px',
                                backgroundColor: 'white'
                            }}
                >
                <p id="dom" style={{marginLeft: '10px'}}>{item[0]}</p>
                <p style={{marginLeft: '270px'}}>distance:{item[1]}</p>
                <img
                    src={item[2] == null ? arr[0] : 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=120&sensor=false&key=AIzaSyDSR-cgFYuYuXoDo4jvjxL0FbTfEN4me2c&photoreference=' + item[2]}
                    style={{marginLeft: '10px', width: '120px', height: '120px',marginTop: '-30px'}}/>
                </Card>
                ))
                }
            </div>
            <div>
                {
                    NameArray.length != 0 ?
                        <Pagination style={{marginLeft: "510px", marginTop: "20px"}} defaultCurrent={1}
                                    total={Math.ceil(NameArray.length / 2) * 10}
                                    onChange={handleValue}/> : null
                }
            </div>
            <script async defer
                    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDSR-cgFYuYuXoDo4jvjxL0FbTfEN4me2c&callback=initMap&language=zh-TW">
            </script>
        </div>
    );
}

