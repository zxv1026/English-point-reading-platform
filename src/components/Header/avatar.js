import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Icon,Dropdown } from 'antd';
import { connect } from 'react-redux';
import { logout } from '../../redux/user_redux'

@connect(
    state=>state.user,
    { logout }
)
class Avatar extends Component {
    render() {
        const { avatar,type } = this.props
        return (
            <div>
                <Dropdown
                    overlay={
                        <Menu>
                            <Menu.Item>
                                <Link>
                                    <Icon type="user" /> 个人中心
                                </Link>
                            </Menu.Item>
                            {type==='admin'?
                                <Menu.Item>
                                    <Link to='/admin'>
                                        <Icon type="login" /> 进入后台管理
                                    </Link>
                                </Menu.Item>: null}
                            <Menu.Item>
                                <span onClick={this.props.logout}>
                                    <Icon type="logout" /> 退出登录
                                </span>
                            </Menu.Item>
                        </Menu>
                    }
                    placement="bottomCenter"
                >
                    <span style={{ cursor: "pointer", fontSize: 18 }}>
                    <img className='img' alt='用户头像' src={require(`../../assets/images/user/${avatar}.jpg`)}/>
                    </span>
                </Dropdown>
            </div>
        )
    }
}

export default Avatar;