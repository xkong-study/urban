import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import React, {createElement, useEffect, useState} from 'react';
import {Avatar, Comment, Tooltip, Button, Form, Input, List, Skeleton, Divider, Card} from 'antd';
import moment from 'moment';
import {AddCommentDataApi, AddLikeDataApi, GetCommentDataApi,AddDislikeDataApi} from "./request/api";
import InfiniteScroll from 'react-infinite-scroll-component';
import TextArea from "antd/es/input/TextArea";
import Meta from "antd/es/card/Meta";


export default function Means() {
    const [action, setAction] = useState(null);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [show, setShow] = useState(true);

    useEffect(()=>{
    setShow(show)
        },[show])
    console.log(show)
    const like = (item) => {
        let params={
            id:item.id,
            likes:item.likes+1
        }
        console.log(params)
        AddLikeDataApi({params}).then(response => {
            console.log(response);
            window.location.reload()
            setLikes(likes + 1);
            setDislikes(0);
            setAction('liked');
        })
    }
    console.log(likes)

    const dislike = (item) => {
        let params={
            id:item.id,
            dislikes:item.dislikes+1
        }
        console.log(params)
        AddDislikeDataApi({params}).then(response => {
            console.log(response);
            window.location.reload()
            setLikes(0);
            setDislikes(1);
            setAction('liked');
        })
    }
    const[arr,setArr]=useState([
        {
            actions:[
                <Tooltip key="comment-basic-like" title="Like">
                <span onClick={like}>
               {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
               <span className="comment-action">{likes}</span>
                </span>
                </Tooltip>,
                <Tooltip key="comment-basic-dislike" title="Dislike">
                <span onClick={dislike}>
                {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
                <span className="comment-action">{dislikes}</span>
                </span>
                </Tooltip>,
                <span key="comment-basic-reply-to">Reply to</span>,
            ],
            author: 'Han Solo',
            avatar: 'https://joeschmoe.io/api/v1/random',
            comments: (
                <p>
                    We supply a series of design principles, practical patterns and high quality design
                    resources (Sketch and Axure), to help people create their product prototypes beautifully and
                    efficiently.
                </p>
            ),
            datetime: (
                <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment().subtract(1, 'days').fromNow()}</span>
                </Tooltip>
            ),
        },
        {
            actions: [
                <Tooltip key="comment-basic-like" title="Like">
                <span onClick={like}>
                {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                <span className="comment-action">{likes}</span>
                </span>
                </Tooltip>,
                <Tooltip key="comment-basic-dislike" title="Dislike">
                <span onClick={dislike}>
                {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
                <span className="comment-action">{dislikes}</span>
                </span>
                </Tooltip>,
                <span key="comment-list-reply-to-0">Reply to</span>
            ],
            author: 'Han Solo',
            avatar: 'https://joeschmoe.io/api/v1/random',
            comments: (
                <p>
                    We supply a series of design principles, practical patterns and high quality design
                    resources (Sketch and Axure), to help people create their product prototypes beautifully and
                    efficiently.
                </p>
            ),
            datetime: (
                <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment().subtract(2, 'days').fromNow()}</span>
                </Tooltip>
            ),
        },
    ]);

    const open = (item) => (
        <Input style={item.id!=''?{display:'true'}:{display:'none'}} placeholder="Basic usage" />,
        console.log(item.id)
    );

    const CommentList = ({ comments }) => (
        <List
            dataSource={comments}
            header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
            itemLayout="horizontal"
            renderItem={(props) => <Comment {...props} />}
        />
    );

    const Editor = ({ onChange, onSubmit, submitting, value }) => (
        <>
            <Form.Item>
                <TextArea rows={4} onChange={onChange} value={value} />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                    Add Comment
                </Button>
            </Form.Item>
        </>
    );

    const [comments, setComments] = useState([]);
    const [author, setAuthor] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');

    const handleSubmit = () => {
       let params={
           id:arr.length+2,
           author:'我',
           comments:comments,
           value:value
       }
        AddCommentDataApi({params}).then(response=>{
            console.log(response);
            window.location.reload()
        })
            .catch(function (error) {
            console.log(error);
        })
    };

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    useEffect(()=>{
        GetCommentDataApi().then(response=> {
            let newArr = JSON.parse(JSON.stringify(response));//深拷贝
            let myarr = []//用来获取自己想要的属性
            newArr.map(item => {
                let obj = {
                    id: item.id,
                    avatar: 'https://joeschmoe.io/api/v1/random',
                    actions: [
                        <Tooltip key="comment-basic-like" title="Like">
                        <span onClick={like.bind(this,item)}>
                        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                        <span className="comment-action">{item.likes}</span>
                        </span>
                        </Tooltip>,
                        <Tooltip key="comment-basic-dislike" title="Dislike">
                        <span onClick={dislike.bind(this,item)}>
                        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
                        <span className="comment-action">{item.dislikes}</span>
                        </span>
                        </Tooltip>,
                        <span key="comment-basic-reply-to">Reply to</span>,
                    ],
                    author: item.author,
                    comments: item.comments,
                    value: item.value,
                    datetime: (
                        <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                            <span>{moment().subtract(2, 'days').fromNow()}</span>
                        </Tooltip>
                    ),
                }
                myarr.push(obj);
            })
            setArr(myarr)
            console.log(myarr)
        })
    },[])

   return(
       <div  id="scrollableDiv"
             style={{
                 height: 600,
                 overflow: 'auto',
                 padding: '0 16px',
                 border: '1px solid rgba(140, 140, 140, 0.35)',
             }}
       >
           <InfiniteScroll
               dataLength={arr.length}
               hasMore={arr.length < 50}
               endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
               scrollableTarget="scrollableDiv"
           >
               <Card
                   hoverable
                   style={{
                       width: 400,
                       height:400,
                       marginLeft:'400px'
                   }}
                   cover={<img style={{width:'200px',height:'300px',marginLeft:'100px'}} alt="example" src="https://image11.m1905.cn/uploadfile/2014/0411/thumb_1_150_203_20140411110232916137.jpg" />}
               >
                   <Button style={{borderStyle:'none',marginLeft:'110px'}} href='/means'><Meta title="《伯爵夫人》" description="伏地魔情牵妇人" /></Button>
               </Card>
       <List
           className="comment-list"
           header={`${arr.length} replies`}
           itemLayout="horizontal"
           dataSource={arr}
           renderItem={(item) => (
               <li>
                   <Comment
                       actions={item.actions}
                       author={item.author}
                       avatar={item.avatar}
                       content={item.value}
                       datetime={item.datetime}
                   />
               </li>
           )}
       />
       </InfiniteScroll>

           {comments.length > 0 && <CommentList comments={comments} />}
           <Comment
               avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
               content={
                   <Editor
                       onChange={handleChange}
                       onSubmit={handleSubmit}
                       submitting={submitting}
                       value={value}
                   />
               }
           />
       </div>
    );
}
