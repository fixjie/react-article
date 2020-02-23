import axios from 'axios'
import { message } from 'antd'

const isDev =process.env.NODE_ENV==='development'

const service=axios.create({
    baseURL:isDev?'http://rap2api.taobao.org/app/mock/244346':'http://rap2api.taobao.org/app/mock/244346',
    withCredentials:true,
    // headers:{'AuthToken':'admin'}
})

service.interceptors.request.use((config)=>{
    config.data=Object.assign({},config.data,{
        AuthToken : 'admin',
        // AuthToken : window.localStorage.getItem('AuthToken')
    })
    return config
})

service.interceptors.response.use((resp)=>{
    if(resp.data.code===200){
        return resp.data
    }else{
        //处理请求错误
        message.error(resp.data.errMsg);
    }
})

//用户登录
export const userLogin=(data)=>{
    return service.post('/api/user/login',{'AuthToken':'admin',...data})
}

//获取文章列表
export const getArticelist=(data)=>{
    return service.post('/api/acticelist',{'AuthToken':'admin',...data})
}

//通过id删除文章
export const delArtices=(data)=>{
    return service.post('/api/actice/del',{'AuthToken':'admin',...data})
}

//通过id获取文章内容
export const getArtice=(data)=>{
    return service.post('/api/actice/get',{'AuthToken':'admin',...data})
}

//获取文章阅读量
export const getArticeAmout=(data)=>{
    return service.post('/api/actice/Amout',{'AuthToken':'admin',...data})
}

//获取全部通知
export const getNotificatioinAll=(data)=>{
    return service.post('/api/notificatioin/getall',{'AuthToken':'admin',...data})
}

