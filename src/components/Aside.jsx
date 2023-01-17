import React, { useEffect, useState } from 'react';
import styles from '../pages/less/antd_m.less';
import { Menu } from 'antd';
import {useNavigate, useLocation} from 'react-router-dom';
import { ReadOutlined, EditOutlined, DatabaseOutlined } from '@ant-design/icons';

export default function Aside() {
    const navigate = useNavigate();
    const location = useLocation();
    const [defaultKey, setDefaultKey] = useState('');

    // 一般加个空数组就是为了模仿componentDidMounted
    useEffect(()=>{
        let path = location.pathname;
        let key = path.split('/')[1];
        setDefaultKey(key);
    }, [location.pathname]);

    const handleClick = e => {
        navigate('/'+e.key);
        setDefaultKey(e.key);
    };

        return (
            <div className={styles}>
            <Menu
                onClick={handleClick}
                style={{ width: '220px' ,height:'100%',minHeight:'700px',marginTop:'-2px',backgroundImage: `url("https://i.postimg.cc/bwM7d6dR/1.jpg")` }}
                selectedKeys={[defaultKey]}
                mode="inline"
            >
                <Menu.Item key="GoogleMap_" style={{color:"white"}}><ReadOutlined /> Search nearest store</Menu.Item>
                <Menu.Item key="lists" style={{color:"whiteSmoke"}}><ReadOutlined /> Review the store</Menu.Item>
                <Menu.Item key="ListTable" style={{color:"whiteSmoke"}}><ReadOutlined /> Search stores comment</Menu.Item>
                <Menu.Item key="edit" style={{color:"white"}}><EditOutlined /> Comment store</Menu.Item>
                <Menu.Item key="means" style={{color:"white"}}><DatabaseOutlined /> 热门影评广场</Menu.Item>
                <Menu.Item key="Demo" style={{color:"white"}}><DatabaseOutlined /> 电影专场</Menu.Item>
            </Menu>
            </div>
        )
}
