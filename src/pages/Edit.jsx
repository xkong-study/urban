import React, {createElement, useEffect, useState} from 'react'
import {PageHeader, Button, Modal, Form, Input, message, Avatar} from 'antd';
import moment from 'moment';
import E from 'wangeditor';
import {AddTextApi, FindTextApi, ArticleSearchApi, UpdateTextApi, CommentListApi} from './request/api'
import { useParams, useNavigate, useLocation } from 'react-router-dom'


export default function Edit() {
    const [arr,setArr]=useState([
        {
            id:'',
            title:'',
            text:''
        }
    ]);
    const [text, setText] = useState();
    let [title, setTitle] = useState();
    const location = useLocation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const params = useParams();
    console.log(location.search.slice(4))
    const htmlRemoveRegex = /(<([^>]+)>)/gi;
    const cleanup = (input) => {
        const div = document.createElement('div');
        div.innerHTML = input;
        return div.innerText;
    };
    useEffect(() => {
        setTitle(title);
    }, [title])

    useEffect(() => {
        setText(text);
    }, [text])
    // 处理请求数据
    useEffect(()=>{
        let params={
            id:location.search.slice(4)
        }
        FindTextApi({params}).then(response => {
            let newArr = JSON.parse(JSON.stringify(response));//深拷贝
            let myarr = []
            newArr.map(item => {
                let obj = {
                    id: item.id,
                    title: item.subtitle,
                    text: item.comment,
                };
                myarr.push(obj);
            });
            setArr(myarr);
            if(myarr!=0) {
                setTitle(myarr[Object.keys(myarr)[0]].title);
                setText(myarr[Object.keys(myarr)[0]].text);
            }
        })
    },[])

    const dealData = (errCode, msg) => {
        setIsModalVisible(false); // 关闭对话框
        if (errCode === 0) {
            message.success(msg)
            setTimeout(() => {
                // 跳回list页面
                navigate('/lists')
            }, 1500)
        } else {
            message.error(msg)
        }
    }
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // 对话框点击了提交
   function handleOk () {
       if(location.search.slice(4)!='') {
           let params = {
               id: location.search.slice(4),
               title: cleanup(title),
               text: cleanup(text),
           }
           console.log(params)
           if (params.id != '' && params.title != '' && params.text != '') {
               UpdateTextApi({params}).then(function (response) {
                   console.log(response);
                   window.location.reload()
               })
                   .catch(function (error) {
                       console.log(error);
                   });
           }
       }
       else{
           let Id=parseInt(Date.now() * Math.random()).toString();
           let params = {
               id: Id.slice(1,3),
               title: title,
               text: text,
           }
           console.log(params)
           AddTextApi({params}).then(function (response) {
               console.log(response);
               window.location.reload()
           })
               .catch(function (error) {
                   console.log(error);
               });
            }
       setIsModalVisible(false);
    };

    // 模拟componentDidMount
    useEffect(() => {
        let editor;
        editor = new E('#div1')
        editor.config.onchange = (newHtml) => {
            setText(newHtml)
        }
        editor.create()
        let params = {
            id: location.search.slice(4),
        }
        // 根据地址栏id做请求
        if (location.search.slice(4)) {
            FindTextApi({params}).then(response => {
                let newArr = JSON.parse(JSON.stringify(response));//深拷贝
                let myarr = []//用来获取自己想要的属性
                newArr.map(item => {
                    let obj = {
                        id: item.id,
                        title: item.subtitle,
                        text: item.comment
                    }
                    myarr.push(obj);
                })
                setArr(myarr)
                if(myarr!=0) {
                    setTitle(myarr[Object.keys(myarr)[0]].title)
                    setText(myarr[Object.keys(myarr)[0]].text)
                    editor.txt.html(myarr[Object.keys(myarr)[0]].text) // 重新设置编辑器内容
                }
            })
        }

        return () => {
            // 组件销毁时销毁编辑器  注：class写法需要在componentWillUnmount中调用
            editor.destroy()
        }
    }, [location.pathname])



    return (
        <div>
            <PageHeader
                ghost={false}
                onBack={params.id ? () => window.history.back() : null}
                title='Comment Store'
                subTitle={"current date：" + moment(new Date()).format("YYYY-MM-DD")}
                extra={<Button key="1" type="primary" onClick={() => setIsModalVisible(true)}>submit</Button>}
            >
            </PageHeader>

            <div id="div1" style={{ padding: '0 20px 20px', background: '#fff' }}></div>
            <Modal zIndex={99999} title="Score this store" visible={isModalVisible} onOk={handleOk.bind(this,title,text)}  onCancel={handleCancel}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 3 }}
                    wrapperCol={{ span: 21 }}
                    autoComplete="off"
                    initialValues={{title,text}}
                >
                    <Input value={cleanup(title)} placeholder="score" onChange={(e) => {setTitle(e.target.value) }} label="标题" />
                    <br />
                    <br />
                    <Input value={cleanup(text)} placeholder="comment" onChange={(e) => {setText(cleanup(e.target.value) )}} label="简介" />
                    <br />
                    <br />
                </Form>
            </Modal>
        </div>
    )
}
