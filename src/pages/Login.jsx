/* jshint esversion: 6 */
import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import "./less/login.less";
import login from "../assets/login.png";
import { UserOutlined ,LockOutlined} from '@ant-design/icons';
import {Link,useNavigate} from 'react-router-dom';
import axios from "axios";
import Header from "../components/Header";

export default function Login(){
    const navigate=useNavigate();
    const onFinish = (values) => {
        setTimeout(()=> navigate('/GoogleMap_?name='+values.username),1500);
        axios.get('/api/addInfo', {
            params: {
                id: '1',
                username: values.username,
                password: values.password
            }
        });
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return(
        <div className="login">
            <div className="login_box">
                <div className="picture">
                <img style={{width:'400px',height:'200px',marginLeft:'-50px'}} src={login} alt=""/>
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
                label="username"
                name="username"
                placeholder="Please input your username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined/>} placeholder="Please input your username"/>
            </Form.Item>

            <Form.Item
                label="password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password prefix={<LockOutlined/>} placeholder="Please input password"/>
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
                    <Link to='/register'>No account yet, register now</Link>
                </Form.Item>
                <Button type="primary" htmlType="submit"  block>login</Button>
             </Form>
            </div>
        </div>
    )

}
