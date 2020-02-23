import React from 'react'
import {render} from 'react-dom'
import { HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
// BrowserRouter or HashRouter
import App from './App'
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd'

import { mainRouter } from './routes'

import { Provider } from 'react-redux'

import store from './store'

import './index.less'
render(
    <Provider store={store}>
        <ConfigProvider locale={zhCN}>
            <Router>
                <Switch>
                    <Route path='/admin' component={App} />
                    }} />
                    {
                        mainRouter.map(router=>{
                            return <Route key={router.pathname} path={router.pathname} component={router.component} />
                        })
                    }
                    <Redirect to='/admin' from='/' exact />
                    <Redirect to='/404'/>
                </Switch>
            </Router>
        </ConfigProvider>
    </Provider>,
    document.querySelector("#root")
)