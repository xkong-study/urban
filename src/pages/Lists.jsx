/* jshint esversion: 6 */
import React from 'react';
import {List, Button, Skeleton} from 'antd';
import {useEffect, useState} from 'react';
import {ArticleListApi, DeleteTextApi} from "./request/api";
import {useNavigate} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
function MyTitle(props) {
    return (
        <div>
            <a className='table_title' href={"https://jsonplaceholder.typicode.com/posts/"+props.id} >{props.title}</a>
            <p style={{ color: '#999' }}>comment:{props.comment}</p>
            <p style={{ color: '#999' }}>score:{props.score}</p>
        </div>
    )
}

export default function Lists(){
    const isLogin = useSelector(state => state.isLogin)
    console.log(isLogin)
    const navigate = useNavigate()
    const [arr,setArr]=useState([
        {
            id:'',
            title:'',
            text:'',
        }
    ])
    function Delete(item) {
        let params={
            id:item.id
        }
        console.log(params)
        DeleteTextApi({params}).then(function (response) {
            console.log(response);
            window.location.reload()
        })
            .catch(function (error) {
                console.log(error);
            });
    }
    let params = {
        search: isLogin,
    }
    useEffect(()=>{
        ArticleListApi({params}).then(res=> {
            let newArr=JSON.parse(JSON.stringify(res));//深拷贝
            let myarr=[]//用来获取自己想要的属性
            newArr.map(item=>{
                if(item.id != null) {
                    let obj = {
                        id: item.id,
                        title: <MyTitle title={item.text} comment={item.comment} score={item.score}/>,
                    }
                    myarr.push(obj);
                }
            })
            console.log(myarr)
            setArr(myarr)
        })
    },[])

    return(
        <div className='list_table' style={{ paddingLeft: '50px',height:'580px',marginLeft:'40px',width:'1100px',paddingRight:'50px',marginTop:'4px'}}>
        <List
            itemLayout="horizontal"
            dataSource={arr}
            renderItem={item => (
                <List.Item
                    actions={[
                        <Button type='primary' onClick={()=>navigate('/edit?id='+item.id)}>edit</Button>,
                        <Button type='danger' onClick={Delete.bind(this,item)}>delete</Button>,
                    ]}
                >
                    <Skeleton loading={false}>
                        <List.Item.Meta
                            title={<a href="!#">{item.title}</a>}
                            description={item.text}
                        />
                    </Skeleton>
                </List.Item>
            )}
          />
        </div>
    )
}


