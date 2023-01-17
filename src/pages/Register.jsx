/* jshint esversion: 6 */
import React from 'react';
import login from "../assets/login.png";
import {Button, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {Link,useNavigate} from "react-router-dom";
import {RegisterApi} from './request/api';

export default function Register(){
    const navigate=useNavigate();
    const onFinish = (values) => {
        console.log('Success:', values);
        setTimeout(()=>navigate('/login'),1500);
        RegisterApi({
            username:values.username,
            password:values.password
        }).then(res=>{
          console.log(res);
          setTimeout(()=>navigate('/login'),1500);
        });
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
                        placeholder="Please input your username!"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined/>} placeholder="Please input your username!"/>
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
                        <Input.Password prefix={<LockOutlined/>} placeholder="Please input your password!"/>
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="confirm password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined/>} placeholder="please enter password again"/>
                    </Form.Item>
                    <Form.Item>
                        <Link to='/login'>After registration, return to the login page</Link>
                    </Form.Item>
                    <Button type="primary" htmlType="submit" block>Sign up now</Button>
                </Form>
            </div>
        </div>
    )

}
