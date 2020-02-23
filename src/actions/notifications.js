import actionTypes from './actionTypes'
import { getNotificatioinAll } from '../requests';

const startMarkAsRead = () =>{
    return {
        type : actionTypes.START_MARK_AS_READ
    }
}
const successtMarkAsRead = () =>{
    return {
        type : actionTypes.SUCCESS_MARK_AS_READ
    }
}
export const markNotificationAsReadById=(id)=>{
    //模拟服务端请求
    return dispatch=>{
        dispatch(startMarkAsRead())
        setTimeout(()=>{
            dispatch({
                type:actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID,
                payload:{
                    id
                }
            })
            dispatch(successtMarkAsRead())
        },1000)
    }
}
export const markNotificationAsReadByAll=()=>{
    //模拟服务端请求
    return dispatch=>{
        dispatch(startMarkAsRead())
        setTimeout(()=>{
            dispatch({
                type:actionTypes.MARK_NOTIFICATION_AS_READ_BY_All
            })
            dispatch(successtMarkAsRead())
        },1000)
    }
}

export const getallnotifiication = ()=>{
    //模拟服务端请求
    return dispatch=>{
        dispatch(startMarkAsRead())
        getNotificatioinAll().then(resp=>{
            dispatch({
                type:actionTypes.GET_ALL_NOTIFICATION,
                payload : {
                    list:resp.data.list
                }
            })
            dispatch(successtMarkAsRead())
        })
    }
}