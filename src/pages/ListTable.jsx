import React, {useState, useEffect, useRef} from 'react';
import {Table, Button, Space, Modal, Pagination, Switch} from 'antd';
import './less/ListTable.less';
import {DeleteUserDataApi} from "./request/api";
import {ArticleUpdateApi} from "./request/api";
import{AddUserDataApi} from "./request/api";
import{FindUserDataApi} from "./request/api";
import{CommentListApi} from "./request/api";


import { Input } from 'antd';
import {AudioOutlined, UserOutlined} from "@ant-design/icons";
const { Search } = Input;


//父传子
function MyTitle(props) {
    return (
        <div>
            <a className='table_title' href={"localhost:3000/api/findAll?id=1"} target="_blank">{props.title}</a>
            {/*<p style={{ color: '#999' }}>简介:{props.subTitle}</p>*/}
        </div>
    )
}


export default function ListTable(){
    //列表数组
    let value;
    value = ''
    const [arr,setArr]=useState([
        {   title:'',
            key:'1',
            comment: '',
            score: 90
        }
    ])
    const onSearch = (value: string) => {
        let params={
            name:value
        }
        console.log(params.name)
        if(value==''){
            window.location.reload()
        }
        FindUserDataApi({params}).then(res=> {
            let newArr = JSON.parse(JSON.stringify(res));//深拷贝
            let myarr = []
            newArr.map(item => {
                let obj = {
                    key: item.id,
                    title: <MyTitle title={item.text}/>,
                    comment: item.comment,
                    score: item.score
                }
                myarr.push(obj);
            })
            setArr(myarr)
            console.log(myarr)
        })
            .catch(function (error) {
                console.log(error);
            });
    };
    const [inputValue, setInputValue] = useState('')
    const [inputScore, setInputScore] = useState('')
    const [inputComment, setInputComment] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false);
    const arrRef = useRef(arr);
    const handleCancel = () => {
        setIsModalVisible(false);
    };
//请求文章列表
    useEffect(()=>{
        CommentListApi().then(res=> {
            let newArr = JSON.parse(JSON.stringify(res));//深拷贝
            let myarr = []//用来获取自己想要的属性
            newArr.map(item => {
                console.log(item.id)
                let obj = {
                    key: item.id,
                    title: <MyTitle title={item.text}/>,
                    comment: item.comment,
                    score: item.score
                }
                myarr.push(obj);
            })
            setArr(myarr)
            console.log(myarr)
        })
    },[])

    function DeleteUserData(arr) {
        console.log(arr)
        let params={
            id:arr,
        }
        DeleteUserDataApi({params}).then(function (response) {
            console.log(response);
            setTimeout(()=>
            window.location.reload(),1000
            )
        })
            .catch(function (error) {
                console.log(error);
            });
    }
    useEffect(() => {
        setInputValue(inputValue);
    }, [inputValue])
    useEffect(() => {
        setInputScore(inputScore);
    }, [inputScore])
    useEffect(() => {
        setInputComment(inputComment);
    }, [inputComment])

    const showModal = (arr) => {
        setIsModalVisible(true);
        arrRef.current = arr;
        console.log(arrRef.current)
    }
    function handleOk(arr) {
        setIsModalVisible(false);
        console.log(arrRef.current)
        let params = {
            id: arrRef.current+1,
            name: inputValue,
            comment: inputComment,
            score: inputScore
        }
        console.log(params)
        if (params.name != '' && params.comment != '' && params.score != '') {
            ArticleUpdateApi({params}).then(function (response) {
                console.log(response);
                window.location.reload()
                console.log(arr)
            })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
    function AddUserData(arr){
        setIsModalVisible(true);
        let params = {
            id: arrRef.current,
            name: inputValue,
            comment: inputComment,
            score: inputScore
        }
        console.log(params)
        if (params.name != '' && params.comment != '' && params.score != '') {
            AddUserDataApi({params}).then(function (response) {
                console.log(response);
                window.location.reload()
                console.log(arr)
            })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

//每一列内容 //text.key就是id
    const columns = [
        {
            title: 'store name',
            dataIndex: 'title',
            key: 'title',
            width:'30%',
            fontSize:'15px',
            render: text => <div>{text}</div>
        },
        {
            title: 'score',
            dataIndex: 'score',
            key: 'score',
            width:'20%',
            fontSize:'15px',
            render: text => <div>{text}</div>
        },
        {
            title: 'comment',
            dataIndex: 'comment',
            key: 'comment',
            width:'20%',
            fontSize:'15px',
            render: text => <div>{text}</div>
        },
        {
            title: 'Action',
            key: 'action',
            fontSize:'15px',
            render: text => {
                return(
                <div style={{backgroundColor:'white'}}>
                <Space size="middle">
                    <Button style={{width:'50px'}} type="primary" onClick={showModal.bind(this,text.key) }><p style={{fontSize:'13px',marginLeft:'-6px'}}>edit</p></Button>
                    <Modal title="edit" visible={isModalVisible} onOk={handleOk.bind(this,text.key,inputValue,inputScore,inputComment)} onCancel={handleCancel}>
                        <Input value={inputValue} placeholder="store name" onChange={(e) => {setInputValue(e.target.value) }} prefix={<UserOutlined />} />
                        <br />
                        <br />
                        <Input value={inputScore} placeholder="score" onChange={(e) => {setInputScore(e.target.value) }} prefix={<UserOutlined />} />
                        <br />
                        <br />
                        <Input value={inputComment} placeholder="comment" onChange={(e) => {setInputComment(e.target.value) }} prefix={<UserOutlined />} />
                        <br />
                        <br />
                    </Modal>
                    <Button type="primary" style={{width:'50px'}} onClick={showModal}><p style={{fontSize:'13px',marginLeft:'-6px'}}>add</p></Button>
                    <Button type="danger" style={{width:'50px'}} onClick={DeleteUserData.bind(this,text.key)}><p style={{fontSize:'13px',marginLeft:'-6px'}}>delete</p></Button>
                    <Modal  title="edit add" visible={isModalVisible} onOk={AddUserData.bind(this,text.key,inputValue,inputScore,inputComment)} onCancel={handleCancel}>
                        <Input value={inputValue} placeholder="store name" onChange={(e) => {setInputValue(e.target.value) }} prefix={<UserOutlined />} />
                        <br />
                        <br />
                        <Input value={inputScore} placeholder="score" onChange={(e) => {setInputScore(e.target.value) }} prefix={<UserOutlined />} />
                        <br />
                        <br />
                        <Input value={inputComment} placeholder="comment" onChange={(e) => {setInputComment(e.target.value) }} prefix={<UserOutlined />} />
                        <br />
                        <br />
                    </Modal>
                </Space>
                </div>
                )
            },
        },
    ];

    return(
        <div style={{width:'1100px',height:'600px',marginLeft:'50px'}}>
        <p style={{marginLeft:'5px',fontWeight:'bold',marginTop:'10px',color:'#303131'}}>search store:</p><Search style={{width:'330px',marginLeft:'80px',marginBottom:'5px',marginTop:'-42px'}}placeholder="input search text" onSearch={onSearch} enterButton />
        <div className='list_table' style={{ padding: '20px',height:'480px',marginTop:'-10px'}} pagination={{pageSize:6}}>
            <Table columns={columns} dataSource={arr} />
        </div>
        </div>
    )
}


