import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { login } from "../../redux/user_redux";
import { Form, Layout, Button, Icon, Input, Alert, Checkbox, Spin } from 'antd';
import logoImg from '../../assets/images/logo.svg';
import './index.less';
const { Content } = Layout;
const FormItem = Form.Item;

@connect(
    state=>state.user,
    { login }
)
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
        }
        this.handleLogin = this.handleLogin.bind(this)
    }
    changeUsername = (value) => {
        let { username } = this.state;
        username = value;
        this.setState({username});
    }
    changePassword = (value) => {
        let { password } = this.state;
        password = value;
        this.setState({password});
    }
    handleLogin(){
        this.props.login(this.state);
    }
    render() {
        const path = this.props.location.pathname;
        const { msg, redirectTo } = this.props;
        return (
            <Layout className="full-layout login-page">
                {redirectTo?<Redirect to="/"/>:null}
                {console.log(path)}
                <Content>
                    <Form  className="login-form">
                        <div className="user-img">
                            <Link to='/'><img src={logoImg} alt="logo" /></Link>
                            <b>英语</b>
                            <span>点读平台</span>
                        </div>
                        {msg?<Alert className="err-msg" message={msg} type="error" showIcon />:null}
                        <FormItem>
                            <Input
                                size="large"
                                prefix={<Icon type="user" />}
                                placeholder="用户名"
                                onChange={(e) => {
                                    this.changeUsername(e.target.value)
                                }}
                            />
                        </FormItem>
                        <FormItem>
                            <Input.Password
                                size="large"
                                prefix={<Icon type="lock" />}
                                type="password"
                                placeholder="密码"
                                onChange={(e) => {
                                    this.changePassword(e.target.value)
                                }}
                            />
                        </FormItem>
                        <FormItem>
                            {/* <Checkbox>记住我</Checkbox> */}
                            {/* <Link className="login-form-forgot" to="#">
                                忘记密码
                            </Link> */}
                            <Button
                                size="large"
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                onClick={this.handleLogin}
                            >
                                登录
                            </Button>
                            <div className="new-user">
                                新用户？<Link to="/register">现在注册</Link>
                            </div>
                        </FormItem>
                    </Form>
                </Content>
            </Layout>
        );
    }
}

export default Login;
