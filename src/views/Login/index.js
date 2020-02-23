import { Form, Icon, Input, Button, Checkbox,Card,Spin,Radio  } from 'antd';
import React, { Component } from 'react'
import './index.less'
import { connect } from 'react-redux'
import { getallnotifiication } from '../../actions/user'
import { Redirect } from 'react-router-dom';

const mapState = state =>{
  const {
    isLogining,isLogin
  } = state.user
  return {
    isLogining,isLogin
  }
}

@connect(mapState,{getallnotifiication})
@Form.create()
class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        console.log(this.props)
        this.props.getallnotifiication(values)
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      this.props.isLogin?<Redirect to='/admin' />:
      <Spin spinning={this.props.isLogining}>
    <Card title='管理员登录' className='login-card'>
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '用户名必须' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '密码必须' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('root', {
            rules: [{ required: true, message: '身份必选' }],
          })(
            <Radio.Group>
              <Radio value='admin'>管理员</Radio>
              <Radio value='plain'>普通用户</Radio>
          </Radio.Group>,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>记住我</Checkbox>)}
          <Button type="primary" htmlType="submit" className="login-form-button" disabled={this.props.isLogining}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </Card>
    </Spin>
    );
  }
}

export default Login