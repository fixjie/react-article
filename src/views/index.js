// import Article from './Article'
// import ArticleEdit from './Article/Edit'
// import Dashboard from './Dashboard'
// import Login from './Login'
// import NotFound from './NotFound'
// import Settings from './Settings'

import Loadable from 'react-loadable'
// import Loadable from './Loadable' //自定义的Loadable
import {Loading} from '../components'
//下面是懒加载
const Article = Loadable({
    loader: () => import('./Article'),
    loading: Loading,
});
const ArticleEdit = Loadable({
    loader: () => import('./Article/Edit'),
    loading: Loading,
});
const Dashboard = Loadable({
    loader: () => import('./Dashboard'),
    loading: Loading,
});
const Login = Loadable({
    loader: () => import('./Login'),
    loading: Loading,
});
const NotFound = Loadable({
    loader: () => import('./NotFound'),
    loading: Loading,
});
const Settings = Loadable({
    loader: () => import('./Settings'),
    loading: Loading,
});
const Notifications = Loadable({
    loader: () => import('./Notifications'),
    loading: Loading,
});

const NoAuth = Loadable({
    loader: () => import('./NoAuth'),
    loading: Loading,
});

export {
    Article,
    ArticleEdit,
    Dashboard,
    Login,
    NotFound,
    Settings,
    Notifications,
    NoAuth,
}