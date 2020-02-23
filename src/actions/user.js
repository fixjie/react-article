import actionTypes from './actionTypes'
import { userLogin } from '../requests';

const startLogining = () =>{
    return {
        type : actionTypes.START_LOGIN
    }
}
const successLogining = () =>{
    return {
        type : actionTypes.SUCCESS_LOGIN
    }
}
export const getallnotifiication = (fromdata)=>{
    //模拟服务端请求
    return dispatch=>{
        dispatch(startLogining())
        userLogin(fromdata).then(resp=>{
            if(resp.code===200){
                if(fromdata.remember){
                    window.localStorage.setItem('authToken',resp.data.authToken)
                    window.localStorage.setItem('username',fromdata.username)
                    window.localStorage.setItem('root',fromdata.root)
                }else{
                    window.sessionStorage.setItem('authToken',resp.data.authToken)
                    window.sessionStorage.setItem('username',fromdata.username)
                    window.sessionStorage.setItem('root',fromdata.root)
                }
                dispatch({
                    type:actionTypes.USER_LOGIN,
                    payload : {
                        data: {
                            ...fromdata,
                            root:resp.data.root,
                            authToken:resp.data.authToken
                        }
                    }
                })
            }
            dispatch(successLogining())
        })
    }
}

export  const logout = () =>{
    return dispatch=>{
        window.localStorage.removeItem('authToken')
        window.sessionStorage.removeItem('authToken')
        window.localStorage.removeItem('username')
        window.sessionStorage.removeItem('username')
        window.localStorage.removeItem('avatar')
        return dispatch({
            type:actionTypes.LOGOUT
        })
    }
}

//保存头像
export const saveAvatar = (url)=>{
    return dispatch=>{
        if(!url){
            return
        }
        dispatch(startLogining())
        window.localStorage.setItem('avatar',url)
        dispatch({
            type:actionTypes.SAVE_AVATAR,
            payload : {
                avatar : url
            }
        })
        dispatch(successLogining())
    }
}
