import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import "./less/login.less";
import login from "../assets/login.png";
import { UserOutlined ,LockOutlined} from '@ant-design/icons';
import {Link,useNavigate} from 'react-router-dom';
import {LoginApi} from './request/api';

export default function Login(){
    const navigate=useNavigate();
    const onFinish = (values) => {
        console.log('Success:', values);
        setTimeout(()=> navigate('/'),1500);
        LoginApi({
            username:values.username,
            password:values.password
        }).then(res=>{console.log(res)});
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return(
        <div className="login">
            <div className="login_box">
                <div className="picture">
                <img src={login} alt=""/>
                </div>
            <Form
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
            <Form.Item
                label="用户名"
                name="username"
                placeholder="请输入用户名"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined/>} placeholder="请输入用户名"/>
            </Form.Item>

            <Form.Item
                label="用户密码"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password prefix={<LockOutlined/>} placeholder="请输入密码"/>
            </Form.Item>

            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>
                <Form.Item>
                    <Link to='/register'>还没账号，立即注册</Link>
                </Form.Item>
                <Button type="primary" htmlType="submit" block>登录</Button>
             </Form>
            </div>
        </div>
    )

}