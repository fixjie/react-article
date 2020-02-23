import React, { Component,createRef } from 'react'
import { Card,Button,Form,Input,DatePicker, message } from 'antd'
import { getArtice } from '../../requests'
import Editor from 'wangeditor'
import './edit.less'
import moment from 'moment'

@Form.create()
class Edit extends Component {
    constructor(){
        super()
        this.state = {
            isLoading:true,
        }
        this.editorRef=createRef()
    }
    componentDidMount(){
        this.getart(this.props.match.params.id)
        this.initeditor()
    }
    initeditor = ()=>{
        this.editor=new Editor(this.editorRef.current)
        this.editor.customConfig.onchange =  (html) => {
            // html 即变化之后的内容
            this.props.form.setFieldsValue({
                content : html
            })
        }
        this.editor.create()
    }
    getart = (id) =>{
        getArtice({id}).then(resp=>{
            this.props.form.setFieldsValue({
                title:resp.title,
                author:resp.author,
                amount:resp.amount,
                createAt:moment(resp.createAt),
                content:resp.content,
            })
            this.editor.txt.html(resp.content)
            this.setState({
                isLoading:false
            })
        })
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                // console.log('时间',moment(values.createAt).valueOf())
                message.success('修改成功!')
                this.getart(this.props.match.params.id);
            }
        });
    }
    onChangeTime = (value, dateString) =>{
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }
    onOkTime = (value) =>{
        console.log('onOk: ', value);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <>
            <Card title={this.state.title} extra={<Button onClick={this.props.history.goBack}>取消</Button>} bordered={false}>
                <Form 
                    onSubmit={this.handleSubmit}
                    layout='horizontal'
                    labelCol={{
                        span:6
                    }}
                    wrapperCol={{
                        span:14
                    }}
                >
                    <Form.Item label='标题'>
                        {getFieldDecorator('title',{
                            rules : [
                            {
                                required:true,
                                message:'文章标题必填'
                            },{
                                min:4,
                                message:'标题长度必须大于4位'
                            },
                        ]
                        })(<Input placeholder=" 文章标题" />)}  
                    </Form.Item>
                    <Form.Item label='作者'>
                        {getFieldDecorator('author',{
                            rules : [
                            {
                                required:true,
                                message:'文章作者必填'
                            }
                        ]
                        })(<Input placeholder=" 文章作者" />)}  
                    </Form.Item>
                    <Form.Item label='阅读量'>
                        {getFieldDecorator('amount',{
                            rules : [
                            {
                                required:true,
                                message:'文章阅读量必填'
                            }
                        ]
                        })(<Input placeholder=" 文章阅读量" />)}
                    </Form.Item>
                    <Form.Item label='创建时间'>
                        {getFieldDecorator('createAt',{
                            rules : [
                            {
                                required:true,
                                message:'请选择文章创建时间'
                            }
                        ]
                        })(<DatePicker showTime placeholder="选择时间" onChange={this.onChangeTime} onOk={this.onOkTime} />)}
                    </Form.Item>
                    <Form.Item label='内容'>
                        {getFieldDecorator('content',{
                            rules : [
                            {
                                required:true,
                                message:'内容必填'
                            }
                        ]
                        })(<div className='qf-editor' ref={this.editorRef}></div>)}
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 6 }}>
                        <Button type="primary" htmlType="submit" loading={this.state.isLoading}>保存修改</Button>
                    </Form.Item>
                </Form>
            </Card>
            </>
        )
    }
}

export default Edit