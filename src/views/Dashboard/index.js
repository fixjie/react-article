import React, { Component,createRef } from 'react'
import { Card,Row,Col } from 'antd'
import echarts from 'echarts'
import { getArticeAmout } from '../../requests'

import './index.less'

export default class Dashboard extends Component {
    constructor(){
        super()
        this.articeAmount=createRef()
    }
    
    getAmout =() =>{
        
        getArticeAmout().then(resp=>{
            const option = {
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: resp.data.amout.map(item => item.month),
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: resp.data.amout.map(item => item.value),
                    type: 'line',
                    areaStyle: {}
                }]
            };
            this.myChart.setOption(option);
            this.setState({
                isLoading:false
            })
        })
    } 
   
    componentDidMount(){
        this.myChart = echarts.init(this.articeAmount.current);
        this.getAmout()
        // this.initechart()
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
            {/* <Card title='概览' bordered={false}>
                <Row gutter={[20,20]}>
                    <Col className="gutter-row" xs={24} sm={24} md={8} lg={8}>
                        <div className="gutter-box" style={{backgroundColor:'#1E88E5'}}></div>
                    </Col>
                    <Col className="gutter-row" xs={24} sm={24} md={8} lg={8}>
                        <div className="gutter-box" style={{backgroundColor:'#512DA8'}}></div>
                    </Col>
                    <Col className="gutter-row" xs={24} sm={24} md={8} lg={8}>
                        <div className="gutter-box" style={{backgroundColor:'#1DE9B6'}}></div>
                    </Col>
                </Row>
            </Card> */}
            <Card title='概览' bordered={false}>
                <div ref={this.articeAmount} style={{height : '400px'}}></div>
            </Card>
            </>
        )
    }
}
