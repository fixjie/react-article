import React, { Component } from 'react'
import { Button,Card,List,Avatar,Badge,Spin } from 'antd'
import { connect } from 'react-redux'
import { markNotificationAsReadById,markNotificationAsReadByAll } from '../../actions/notifications'

const mapState = state =>{
  const {
    list = [],
    isLoading
  } = state.notifications
  return {
    list,isLoading
  }
}

@connect(mapState,{markNotificationAsReadById,markNotificationAsReadByAll})
class Notifications extends Component {
    render() {
        return (
            <>
            <Spin spinning={this.props.isLoading}>
                <Card title="通知中心" extra={<Button onClick={this.props.markNotificationAsReadByAll.bind(this)} disabled={this.props.list.every(istem => istem.hasRead === true)}>全部标记为已读</Button>} bordered={false}>
                <List
                    itemLayout="horizontal"
                    dataSource={this.props.list}
                    renderItem={item => (
                    <List.Item extra={item.hasRead ? null : <Button onClick={this.props.markNotificationAsReadById.bind(this,item.id)}>标记为已读</Button>}>
                        <List.Item.Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={<Badge dot={!item.hasRead}>{item.title}</Badge>}
                        description={item.desc}
                        />
                    </List.Item>
                    )}
                />
                </Card>
              </Spin>
            </>
        )
    }
}

export default Notifications
