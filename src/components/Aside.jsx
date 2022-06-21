import React, { useEffect, useState } from 'react'
import { Menu } from 'antd';
import {useNavigate, useLocation} from 'react-router-dom'
import { ReadOutlined, EditOutlined, DatabaseOutlined } from '@ant-design/icons';
export default function Aside() {
    const navigate = useNavigate()
    const location = useLocation()
    const [defaultKey, setDefaultKey] = useState('')

    // 一般加个空数组就是为了模仿componentDidMounted
    useEffect(()=>{
        let path = location.pathname;
        let key = path.split('/')[1];
        setDefaultKey(key)
    }, [location.pathname])

    const handleClick = e => {
        navigate('/'+e.key)
        setDefaultKey(e.key)
    };

        return (
            <Menu
                onClick={handleClick}
                style={{ width: 180 ,height:'700px',marginTop:'-2px'}}
                selectedKeys={[defaultKey]}
                mode="inline"
                className='aside'
            >
                <Menu.Item key="lists"><ReadOutlined /> 创作电影简介集</Menu.Item>
                <Menu.Item key="ListTable"><ReadOutlined /> 创作电影评论</Menu.Item>
                <Menu.Item key="edit"><EditOutlined /> 电影简介编辑</Menu.Item>
                <Menu.Item key="means"><DatabaseOutlined /> 热门影评广场</Menu.Item>
                <Menu.Item key="Demo"><DatabaseOutlined /> 电影专场</Menu.Item>
            </Menu>
        )
}
