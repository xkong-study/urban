/* jshint esversion: 6 */
// store初始化仓库数据
const initState = {
    isLogin:'',
    menuList:[]
}
// reducer纯函数，用于操作中央仓库的数据
export const reducer = (state=initState,action)=>{
    const {type,data} = action
    switch(type){
        case 'SET_LOGIN_STATUS':
        	// 在不改变原有的state基础上，返回一个新的state
            return {
                ...state,
                isLogin:data
            }
        case 'SET_MENU_LIST':
            return {
                ...state,
                menuList:data
            }
        default:
            return initState
    }
}
