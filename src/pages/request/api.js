import request from './request'

export const RegisterApi = (params) => request.post('/register', params)

export const AddDislikeDataApi = (params) => request.get('/disLikes', params)

export const LoginApi = (params) => request.get('/addInfo', params)

export const CommentListApi = (params) => request.get('/All', params)

export const ArticleAddApi = (params) => request.post('/add', params)

export const AddTextApi=(params)=>request.get('/addWrite', params)

export const AddCommentDataApi = (params) => request.get('/addInfo', params)

export const AddUserDataApi = (params) => request.get('/add', params)

export const FindUserDataApi = (params) => request.get('/findAll',params)

export const AddLikeDataApi = (params) => request.get('/addLikes', params)

export const ArticleListApi = (params) => request.get('/write',params)

export const ArticleUpdateApi = (params) => request.get('/modify', params)

export const DeleteTextApi=(params)=>request.get('/deleteWrite', params)

export const DeleteUserDataApi = (params) => request.get('/delete', params)

export const FindTextApi=(params)=>request.get('/findWrite', params)

export const GetCommentDataApi = (params) => request.get('/info',params)

export const UpdateTextApi=(params)=>request.get('/updateWrite', params)
