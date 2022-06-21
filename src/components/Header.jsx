import React, {useState}from 'react'
import login from "../assets/login.png";
import login1 from "../assets/login1.png";
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import defaultPicture from "../assets/defaultPicture.png";
import {Link} from 'react-router-dom';
export default function Header(){
        const [avatar]=useState(defaultPicture);
        const [username]=useState("游客");
        const menu = (
            <Menu>
                <Menu.Item key={1}>
                        修改资料
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item key={2}>
                    <Link to='/login'> 退出登录 </Link>
                </Menu.Item>
            </Menu>
        );
        return (
                <header style={{height:'90px'}}>
                    <img src={login} style={{width:'120px',height:'70px',left:'-30px'}} alt="" className="logo"/>
                    <img src={login1} style={{width:'300px',height:'70px',marginLeft:'-790px'}} alt="" className="logo"/>
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
