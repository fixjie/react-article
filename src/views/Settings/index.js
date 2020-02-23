import React, { Component } from 'react'
import { Card,Upload,Icon,message,Button, Spin ,Row } from 'antd'
import axios from 'axios'
import { saveAvatar } from '../../actions/user'
import { connect } from 'react-redux'
  
function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

const mapState = state =>{
    const {
        avatar
      } = state.user
      return {
        avatar
      }
  }
  
  @connect(mapState,{saveAvatar})
class Settings extends Component {
    state = {
        isUploading : false,
        avatar : this.props.avatar||'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    }

    handUpload = ({file}) =>{
        let fromdata= new FormData()
        fromdata.append('Token','4dfe149d01f1167118fc5e6958ec094753ecd4f9:05a2Gm1vvTEPuPx99W_njJwFDc4=:eyJkZWFkbGluZSI6MTU4MTkyNDk1NSwiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNzA5ODc5IiwiYWlkIjoiMTY2NDE5NCIsImZyb20iOiJmaWxlIn0=');
        fromdata.append('file',file)
        this.setState({ isUploading: true });
        axios.post('http://up.imgapi.com/',fromdata).then(resp=>{
            if(resp.status===200){
                this.setState({
                    avatar : resp.data.linkurl,
                    isUploading: false,
                })
            }
        }).catch(err=>{
            this.setState({
                isUploading: false,
            })
        })
    }
    render() {
        // const token = '4dfe149d01f1167118fc5e6958ec094753ecd4f9:05a2Gm1vvTEPuPx99W_njJwFDc4=:eyJkZWFkbGluZSI6MTU4MTkyNDk1NSwiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNzA5ODc5IiwiYWlkIjoiMTY2NDE5NCIsImZyb20iOiJmaWxlIn0='
        const uploadButton = (
            <div>
              <Icon type={this.state.isUploading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
          );
        return (
            <>
                <Card title='个人设置' bordered={false}>
                    <Row type="flex" justify="center">
                        <Spin spinning={this.state.isUploading}>
                        <Upload
                            name="avatar"
                            method="post"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="http://up.imgapi.com/"
                            beforeUpload={beforeUpload}
                            accept='image/*'
                            // data={{'Token': token}}
                            // headers={{'Token': token}}
                            customRequest={this.handUpload}
                        >
                            {this.state.avatar ? <img src={this.state.avatar} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                        </Spin>
                    </Row>
                    <Row type="flex" justify="center">
                    <Button onClick={this.props.saveAvatar.bind(this,this.state.avatar)} type='primary' disabled={this.state.isUploading}>保存头像</Button>
                    </Row>
                </Card>
            </>
        )
    }
}

export default Settings