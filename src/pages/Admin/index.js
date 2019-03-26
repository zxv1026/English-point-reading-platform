import React, { Component } from 'react';
import {  BrowserRouter, Route, Redirect, Switch, Link, Router,NavLink } from 'react-router-dom';
import UserControl from './UserControl/index';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import logo from '../../assets/images/logo.svg';
import './index.less';
const { Header, Content, Footer, Sider } = Layout;

class AdminHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
            mode: 'inline',
        }
    }
   
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <Sider
                        trigger={null}
                        collapsible
                        collapsed={this.state.collapsed}
                    >
                        <div className="logo">
                            <Link to='/'><img src={logo} alt="logo"/></Link>
                            英语点读平台
                        </div>
                        <Menu theme="dark" >
                            <Menu.Item key="1">
                                <Link to='/admin'>
                                    <Icon type="user" />
                                    <span className="nav-text">用户管理</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to='/admin/C'>
                                    <Icon type="video-camera" />
                                    <span className="nav-text">管理</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="upload" />
                                <span className="nav-text">管理</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ color:'white', padding: 0 }}>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                                style={{cursor: 'pointer'}}
                            />
                        </Header>
                        <Content style={{ margin: '0 16px' }}>
                            <div style={{ padding: 24, background: '#fff', minHeight: 780 }}>
                                <Switch>
                                    <Route exact path="/admin" component={UserControl}/>
                                </Switch>
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            英语点读后台管理 ©2019 Created by 31501315_zxv
                        </Footer>
                    </Layout>
                </Layout>
            </BrowserRouter>
        );
    }
}

export default AdminHome;