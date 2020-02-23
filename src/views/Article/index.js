import React, { Component } from 'react'
import {Card,Button,Table,Modal,message } from 'antd'
import { getArticelist,delArtices } from '../../requests'
import moment from 'moment'
import XLSX from 'xlsx'

// const ButtonGroup = Button.Group;
const { confirm } = Modal;

export default class Article extends Component {
    constructor(){
        super()
        this.state={
            columns : [
                {
                  title: '作者',
                  dataIndex: 'author',
                  key: 'author',
                  render: text => {return <span>{text}</span>},
                },
                {
                  title: '标题',
                  dataIndex: 'title',
                  key: 'title',
                },
                {
                  title: '阅读数',
                  dataIndex: 'amount',
                  key: 'amount',
                },
                {
                  title: '发布时间',
                  key: 'createAt',
                  dataIndex: 'createAt',
                  render: createAt => (
                    <span>{moment(createAt).format('YYYY/MM/DD HH:mm:ss')}</span>
                  ),
                },
                {
                  title: '操作',
                  key: 'action',
                  dataIndex: 'action',
                  render: (text, record ,index) => {
                    return(
                            <>
                                <Button type='primary' size='small' onClick={this.EditArtice.bind(this,record.id,record.title)}>编辑</Button>
                                <span> </span>
                                <Button type='danger' size='small' onClick={this.delArtice.bind(this,record.id)}>删除</Button>
                            </>
                        )
                    },
                }
            ],
            dataSource : [],
            total:0,
            isLoading:true,
            page:1,
            pageSize:20
        }
    }
    getlist = () =>{
        getArticelist({offset:(this.state.page-1)*this.state.pageSize,limited:this.state.pageSize})
        .then(resp=>{
                this.setState({
                    dataSource:resp.data.list,
                    total:resp.total,
                })
        }).catch(err=>{
            //处理错误
        }).finally(()=>{
            this.setState({
                isLoading:false
            })
        })
    }
    onPageChange = (page,pageSize) =>{
        this.setState({
            page:page,
            pageSize:pageSize
        },()=>{
            this.getlist()
        })
    }
    onShowSizeChange= (current,size) =>{
        // console.log(current,size)
        this.setState({
            page:1,
            pageSize:size
        },()=>{
            this.getlist()
        })
    }
    toExcel = () =>{
        const cols=['作者','标题','阅读数','发布时间'];
        const tabledata=[cols];
        this.state.dataSource.map(table=>{
            tabledata.push([table.author,table.title,table.amount,moment(table.createAt).format('YYYY/MM/DD HH:mm:ss')]);
            return null
        });
        // return console.log(tabledata)
        const ws = XLSX.utils.aoa_to_sheet(tabledata);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
		/* generate XLSX file and send to client */
		XLSX.writeFile(wb, "sheetjs.xlsx")
    }
    //删除文章
    delArtice = (id) =>{
        let that=this;
        confirm({
            title: '删除文章?',
            content: '是否删除该文章,删除后无法恢复',
            onOk() {
              return new Promise((resolve, reject) => {
                // setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                delArtices({id:id}).then(resp=>{
                    if(resp.code===200){
                        // message.success(resp.errMsg);
                        resolve(resp.errMsg)
                        that.getlist();
                        // setTimeout(resolve, 1000);
                    }else{
                        reject(resp.errMsg)
                    }
                })
              }).then((suc) => {
                message.error(suc)
              }).catch((err) => {
                  message.error(err)
                });
            },
            onCancel() {},
          });
    }
    EditArtice = (id,title) =>{
        this.props.history.push({
            pathname:`/admin/Article/Edit/${id}`,
            state:{
                title : title
            }
        })
    }
    componentDidMount(){
        this.getlist();
    }
    componentWillUnMount = () => {
        //在组件销毁时，取消setState操作
        // clearTimeout(timer)
        this.setState = (state, callback) => {
            return
        }
    }
    render() {
        return (
            <>
                <Card title="文章列表" extra={<Button onClick={this.toExcel}>导出excel</Button>} bordered={false}>
                <Table
                    rowKey='id'
                    loading={this.state.isLoading}
                    columns={this.state.columns}
                    dataSource={this.state.dataSource}
                    pagination={{
                        total:this.state.total,
                        current:this.state.page,
                        // hideOnSinglePage:true,
                        showQuickJumper:true,
                        showSizeChanger:true,
                        pageSizeOptions : ['10','20','50','100'],
                        onShowSizeChange:this.onShowSizeChange,
                        onChange:this.onPageChange
                    }}
                />
                </Card>
            </>
        )
    }
}
