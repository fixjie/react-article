import React, { Component } from 'react'
import { Layout, Menu, Icon ,Dropdown ,Avatar , Badge } from 'antd';
import { adminRouter } from '../../routes'
import { withRouter } from 'react-router-dom'
import logo from './logoko.png'
import { getallnotifiication } from '../../actions/notifications'
import { logout } from '../../actions/user'

import { connect } from 'react-redux'

import './frame.less'

// const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const menus = adminRouter.filter(router=>router.isNav===true)

const mapState = state =>{
    return {
        notifications : state.notifications.list.filter(item => item.hasRead === false).length,
        username :state.user.username,
        Avatar:state.user.avatar
    }
  }

@connect(mapState,{ getallnotifiication,logout })
@withRouter

class Frame extends Component {
    componentDidMount(){
        this.props.getallnotifiication()
    }
    onDropdownMenu = (e) =>{
        if(e.key==='/login'){
            window.localStorage.removeItem('authToken')
            window.sessionStorage.removeItem('authToken')
            window.localStorage.removeItem('username')
            window.sessionStorage.removeItem('username')
            this.props.logout()
        }
        this.props.history.push(e.key)
    }
    renderMunu = () => {
       return( 
       <Menu style={{marginTop:20}} onClick={this.onDropdownMenu}>
          <Menu.Item key='/admin/Notifications'>
            <Badge dot={this.props.notifications>0?true:false}>通知中心</Badge>
          </Menu.Item>
          <Menu.Item key='/admin/Settings'>
              个人设置
          </Menu.Item>
          <Menu.Item key='/login'>
              退出登录
          </Menu.Item>
        </Menu>)
    }
    render() {
        const jumprouter=({ key })=>{
            this.props.history.push(key);
        }
        return (
            <Layout style={{height: '100%',}}>
                <Header className="header qf-header">
                    <div className='qf-logo'>
                        <img src={logo} alt='XIAJIE' />
                    </div>
                    <div>
                    <Dropdown overlay={this.renderMunu()} trigger={['click']}>
                        <Badge count={this.props.notifications}>
                            <Avatar src={this.props.Avatar} />
                            <span>欢迎您 ! {this.props.username}</span><Icon type="down" />
                        </Badge>
                    </Dropdown>
                    </div>
                </Header>
                <Layout>
                <Sider width={200} style={{ background: '#fff' ,}}>
                    <Menu
                    mode="inline"
                    selectedKeys={this.props.location.pathname}
                    style={{ height: '100%', borderRight: 0 }}
                    >
                        {
                            menus.map(item =>{
                                return <Menu.Item key={item.pathname} onClick={jumprouter}><Icon type={item.icon} />{item.title}</Menu.Item>
                            })
                        }
                    </Menu>
                </Sider>
                    <Layout style={{ padding: '20px'}}>
                        <Content
                        style={{
                            background: '#fff',
                            // padding: 12,
                            margin: 0,
                        }}
                        >
                        {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

export default Frame