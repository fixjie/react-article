import actionTypes from '../actions/actionTypes'

const isl =window.localStorage.getItem('authToken')?true:false||window.sessionStorage.getItem('authToken')?true:false;
const userdata = {
    id:'',
    username:window.localStorage.getItem('username')||window.sessionStorage.getItem('username'),
    password:'',
    isLogin : isl,
    root:window.localStorage.getItem('root')||window.sessionStorage.getItem('root'),
    isLogining:false,
    roles : [],
    avatar : window.localStorage.getItem('avatar')||'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
}

export default ( state=userdata,action ) =>{
    switch(action.type){
        case actionTypes.START_LOGIN:
            return {
                ...state,
                isLogining : true,
            }
            case actionTypes.SUCCESS_LOGIN:
            return {
                ...state,
                isLogining : false,
            }
        case actionTypes.USER_LOGIN:
            return {
                ...state,
                username:action.payload.data.username,
                // password:action.payload.data.password,
                root:action.payload.data.root,
                isLogin:true,
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                username:'',
                isLogin:false,
                isLogining:false,
                avatar:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
            }
        case actionTypes.SAVE_AVATAR:
            return {
                ...state,
                avatar:action.payload.avatar
            }
            
        default:
            return state
    }
}