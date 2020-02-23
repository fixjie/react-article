import {
    Article,
    ArticleEdit,
    Dashboard,
    Login,
    NotFound,
    Settings,
    Notifications,
    NoAuth,
} from '../views'

export const mainRouter = [
    {
        pathname:'/login',
        component:Login
    },{
        pathname:'/404',
        component:NotFound
    },
]

export const adminRouter =[
    {
        pathname:'/admin/Dashboard',
        component:Dashboard,
        title:'仪表盘',
        isNav:true,
        icon:'dashboard',
        roles:['admin','plain'],
    },{
        pathname:'/admin/Article',
        component:Article,
        exact : true,
        title:'文章管理',
        isNav:true,
        icon:'unordered-list',
        roles:['admin','plain'],
    },{
        pathname:'/admin/Notifications',
        component:Notifications,
        exact : true,
        title:'通知中心',
        isNav:false,
        roles:['admin','plain'],
    },{
        pathname:'/admin/Article/Edit/:id',
        component:ArticleEdit,
        title:'文章编辑',
        isNav:false,
        roles:['admin'],
    },{
        pathname:'/admin/Settings',
        component:Settings,
        title:'设置',
        isNav:true,
        icon:'setting',
        roles:['admin'],
    },{
        pathname:'/admin/NoAuth',
        component:NoAuth,
        isNav:false,
        roles:['admin','plain'],
    },
]