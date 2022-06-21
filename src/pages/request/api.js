import request from './request'

// 注册
export const RegisterApi = (params) => request.post('/register', params)
//登录
export const LoginApi = (params) => request.post('/login', params)
//获取文章列表
export const ArticleListApi = (params) => request.get('/write')

export const CommentListApi = (params) => request.get('/All')

export const ArticleAddApi = (params) => request.post('/add', params)

// 查看文章
export const ArticleSearchApi = (params) => request.get(`/findAll/${params.id}`)

// 添加文章
export const AddTextApi=(params)=>request.get('/addWrite', params)

// 删除文章
export const DeleteTextApi=(params)=>request.get('/deleteWrite', params)

// 查看文章
export const FindTextApi=(params)=>request.get('/findWrite', params)

// 修改文章
export const UpdateTextApi=(params)=>request.get('/updateWrite', params)

// 重新编辑文章
export const ArticleUpdateApi = (params) => request.get('/modify', params)

export const AddUserDataApi = (params) => request.get('/add', params)

//模糊搜索
export const FindUserDataApi = (params) => request.get('/findAll', params)

//评论
export const GetCommentDataApi = (params) => request.get('/info',params)

//增加评论
export const AddCommentDataApi = (params) => request.get('/addInfo', params)

//增加赞
export const AddLikeDataApi = (params) => request.get('/addLikes', params)

//增加踩
export const AddDislikeDataApi = (params) => request.get('/disLikes', params)

export const DeleteUserDataApi = (params) => request.get('/delete', params)
