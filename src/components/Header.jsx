import React, {useState}from 'react';
import login from "../assets/login.png";
import login1 from "../assets/login1.png";
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import defaultPicture from "../assets/defaultPicture.png";
import {Link, useLocation, useParams} from 'react-router-dom';
export default function Header(){
        const [avatar]=useState(defaultPicture);
        const location = useLocation();
        console.log('useLocation', location.search.split('=')[1]);
        const username=location.search.split('=')[1];
        const menu = (
            <Menu>
                <Menu.Item key={1}>
                    modify data
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item key={2}>
                    <Link to='/login'> sign out </Link>
                </Menu.Item>
            </Menu>
        );
        return (
                <header style={{height:'90px'}}>
                    <img style={{width:'950px',height:'70px',marginLeft:'-140px'}} alt="" className="logo"/>
                    <div className="right">
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            <img src={avatar} style={{width:'70px',height:'70px'}} className="avatar" alt=""/>
                           <span> {username} </span><DownOutlined />
                        </a>
                    </Dropdown>
                    </div>
                </header>
        )
}
