import React, { Component } from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import Avatar from '../../components/Header/avatar';
import AvatarChoose from '../../components/AvatarChoose';
import AudioChoose from '../../components/AudioChoose';
import UserControl from './UserControl/index';
import TagControl from './TagControl';
import PartControl from './PartControl/index';
import CharpterControl from './CharpterControl/index';
import DetailControl from './DetailControl';
import ContentControl from './ContentControl';
import { Layout, Menu, Icon } from 'antd';
import logo from '../../assets/images/logo.svg';
import './index.less';
import { connect } from 'react-redux';

const { Header, Content, Footer, Sider } = Layout;

@connect(
  state => ({
      username: state.user.username,
      type: state.user.type,
      logout: state.user.logout,
  }),
  {  }
)
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
        const { type,logout  } = this.props
        return (
            <div>
            {type==='admin'?
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
                        {/* <Menu.Item key="2">
                            <Link to='/admin/tag'>
                                <Icon type="tag" />
                                <span className="nav-text">标签管理</span>
                            </Link>
                        </Menu.Item> */}
                        <Menu.Item key="3">
                            <Link to='/admin/part'>
                                <Icon type="book" />
                                <span className="nav-text">Part管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to='/admin/charpter'>
                                <Icon type="book" />
                                <span className="nav-text">Charpter管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Link to='/admin/detail'>
                                <Icon type="book" />
                                <span className="nav-text">Detail管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Link to='/admin/content'>
                                <Icon type="book" />
                                <span className="nav-text">Content管理</span>
                            </Link>
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
                        <span style={{ float: "right", marginRight: 30 }}>
                            {this.props.username?<Avatar/>:null}
                        </span>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 780 }}>
                            <Switch>
                                <Route exact path='/admin' component={UserControl}/>
                                <Route exact path='/admin/avatarchoose' component={AvatarChoose}/>
                                <Route exact path='/admin/audiochoose' component={AudioChoose}/>
                                <Route exact path='/admin/part' component={PartControl}/>
                                <Route exact path='/admin/charpter' component={CharpterControl}/>
                                <Route exact path='/admin/detail' component={DetailControl}/>
                                <Route exact path='/admin/content' component={ContentControl}/>
                                <Route exact path='/admin/tag' component={TagControl}/>
                            </Switch>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        英语点读后台管理 ©2019 Created by 31501315_zxv
                    </Footer>
                </Layout>
            </Layout>:<div style={{textAlign:'center',marginTop:100}}>
                <h4>你不是管理员无法进入后台管理</h4>
                <Link className="close-content" to={{
                    pathname: '/'
                }}>
                    <Icon type="caret-left"/>返回首页
                </Link>
            </div>}
            {logout ? <Redirect to='/'/>:null}
            </div>
        );
    }
}

export default AdminHome;