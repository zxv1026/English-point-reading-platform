import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Tabs,Icon,Row,Col,Button } from 'antd';
import Header from '../../components/Header';
import Information from './components/information'
import { connect } from 'react-redux';
import logoImg from '../../assets/images/logo.svg';
import moment from 'moment';

const TabPane = Tabs.TabPane;

@connect(
    state => ({
       username: state.user.username,
       avatar: state.user.avatar,
    }),
)
class PersonalCenter extends Component {
    
    constructor(props){
        super(props)
        this.state = {
        }
    }
    render() {
        const { avatar,username } = this.props
        console.log(this.props)
        if(username){
            console.log('aaa')
        }else{
            console.log('bbb')
        }
        console.log(username)
        return (
            <div>
                {username?
                <div>
                    <Header/>
                    <Tabs>
                        <TabPane tab={<span><Icon type="user" />基本信息</span>} key="1">
                            <Information/>
                        </TabPane>
                        <TabPane tab={<span><Icon type="heart" />收藏的话题</span>} key="2">
                            收藏的话题todo
                        </TabPane>
                    </Tabs>
                </div>:<Redirect to='/'/>}
            </div>
        );
    }
}

export default PersonalCenter;
