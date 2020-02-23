import React, { Component } from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import { Frame } from './components'
import { connect } from 'react-redux'

import { adminRouter } from './routes'

const mapState = state =>({
    isLogin : state.user.isLogin,
    root :state.user.root
})
@connect(mapState)
class App extends Component {
    render() {
        return (
            this.props.isLogin?
            <Frame>
                <Switch>
                    {
                        adminRouter.map(router=>{
                            return <Route 
                            exact={router.exact}
                            key={router.pathname}
                            path={router.pathname}
                            render={(routerprops)=>{
                                const root=router.roles.includes(this.props.root)
                                return root? <router.component {...routerprops} />:<Redirect to='/admin/NoAuth' />
                            }} />
                        })
                    }
                    <Redirect to={adminRouter[0].pathname} from='/admin' exact />
                    <Redirect to='./404'/>
                </Switch>
            </Frame>:
            <Redirect to='/login'/>
        )
    }
}

export default App