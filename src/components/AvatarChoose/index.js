import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Icon, Button, Row, Col, message } from "antd";
import Header from '../Header';
import { connect } from 'react-redux';
import { update } from "../../redux/user_redux";
import './index.less'

@connect(
    state => state.user,
    { update }
)
class AvatarChoose extends Component{
    constructor(props) {
        super(props);
        this.state = {
            avatar: '',
        }
    }
    updateavatar(id){
        let avatar = this.state;
        if(!avatar){
            avatar = this.props.location.state.avatar
            this.setState({
                avatar
            })
        }
        this.props.update(id,this.state);
        console.log(this.props)
    }
    selectAvatar(v) {
        this.setState({
            avatar: v
        })
    }
    render() {
        const avatarList = 'admin,boy,dog,dragon,girl,lion,rabbit,woman,zz,c,d,g,m,n,p'
                            .split(',')
                            .map(v =>({
                                avatar: require(`../../assets/images/user/${v}.jpg`),
                                text: v 
                            }))
        const {id,path,pagenumber} = this.props.location.state;
        const { msg } = this.props;
        console.log(path)
        return (
            <div style={path==='/personalcenter'? {paddingTop:56} : null }>
                {msg==="true"?message.success("保存用户头像成功",5): null}
                {path==='/personalcenter'?<Header/>:null}
                <Link to={{
                    pathname: path,
                    pagenumber: pagenumber
                }}>
                    <Icon type="caret-left"/>
                    Back
                </Link>
                <Row type="flex" justify="space-between">
                    <Col span={4}>
                        <div style={{ marginTop:10,marginBottom:20 }}>
                            <span>个人头像：</span>
                            {this.state.avatar
                                ?<img className='img' alt='本人头像' src={require(`../../assets/images/user/${this.state.avatar}.jpg`)}/>
                                :<img className='img' alt='本人头像' src={require(`../../assets/images/user/${this.props.location.state.avatar}.jpg`)}/>
                            }
                        </div>
                    </Col>
                    <Col span={4} push={2}>
                        <div style={{ marginTop:10,marginBottom:20 }}>
                            <Button type="primary" onClick={() => this.updateavatar(id)}>保存头像</Button>
                        </div>
                    </Col>
                </Row>
                <div style={{marginTop: 10}}>
                    {avatarList.map((list) => (
                        <img key={list.avatar} alt="头像" src={list.avatar} style={{height:100,width:100, marginRight:45, marginLeft:45,marginTop: 20}}
                            onClick={
                                () => this.selectAvatar(list.text)
                            }
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default AvatarChoose;