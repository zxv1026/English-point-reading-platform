import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row,Col,Button } from 'antd';
import { Rowstyled } from './style';
import { connect } from 'react-redux';

@connect(
    state => ({
        userid: state.user._id,
        username: state.user.username,
        avatar: state.user.avatar,
    }),
)
class Information extends Component {
    
    constructor(props){
        super(props)
        this.state = {
        }
    }
    render() {
        const { avatar,username,userid } = this.props
        return (
            <div>
                <Row type="flex" justify="center" style={{ marginTop:10,marginBottom:20 }}>
                    <Col span={4} push={2}>
                        <div>
                            <span>个人头像：</span>
                            <img className='img' alt='本人头像' src={require(`../../../../assets/images/user/${avatar}.jpg`)}/>
                        </div>
                    </Col>
                    <Col span={4} push={3}>
                        <div style={{ marginTop:10,marginBottom:20 }}>
                            <Link to={{
                                pathname:'/personalcenter/avatarchoose',
                                state:{
                                    path: '/personalcenter',
                                    id: userid,
                                    avatar: avatar
                                }
                            }}><Button className='button' type="primary">修改头像</Button></Link>
                        </div>
                    </Col>
                    <Col span={4} push={3}>
                        <div style={{ marginTop:10,marginBottom:20 }}>
                            <Link to={{
                                pathname:'/personalcenter/changepassword',
                                state:{
                                    path: '/personalcenter',
                                    id: userid,
                                }
                            }}>
                                <Button type="primary">修改密码</Button>
                            </Link>
                        </div>
                    </Col>
                </Row>
                <Row type="flex" justify="center" style={{ marginTop:10,marginBottom:20 }}>
                    <Col span={4} pull={2}>
                        <div style={{ marginTop:10,marginBottom:20 }}>
                            <span style={{marginRight:25}}>用户名：</span>
                            <span>{username}</span>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Information;
