import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form,Input,Button,Popover,Layout,Alert } from 'antd';
import { connect } from 'react-redux';
import { register,empty } from "../../redux/user_redux";
import './index.less';
import logoImg from '../../assets/images/logo.svg';
import moment from 'moment';
const { Content } = Layout;
const FormItem = Form.Item;

@connect(
    state => state.user,
    {register,empty}
)
class Register extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            repeatpassword: '',
            type: 'user',
            avatar: 'lion',
            created: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        }
        this.handleRegister = this.handleRegister.bind(this)
    }
    componentDidMount(){
        this.props.empty();
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
    changeRepeatPassword = (value) => {
        let { repeatpassword } = this.state;
        repeatpassword = value;
        this.setState({repeatpassword});
    }
    handleRegister(){
        this.props.register(this.state);
    }
    render() {
        const { msg, redirectTo } = this.props;
        const link = this.props.location.link;
        return (
            <Layout className="full-layout register-page login-page">
                {link&&redirectTo?<Redirect to={link}/>:null}
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
                                placeholder="用户名"
                                onChange={(e) => {
                                    this.changeUsername(e.target.value)
                                }}
                            />
                        </FormItem>
                        <FormItem >
                            <Popover
                                content={
                                    <div style={{ padding: '4px 0' }}>
                                    <div style={{ marginTop: 10 }}>
                                        请至少输入 6 个字符。请不要使用容易被猜到的密码。
                                    </div>
                                    </div>
                                }
                                overlayStyle={{ width: 240 }}
                                placement="right"
                            >
                                <Input.Password
                                    size="large"
                                    type="password"
                                    placeholder="密码"
                                    onChange={(e) => {
                                        this.changePassword(e.target.value)
                                    }}
                                />
                            </Popover>
                        </FormItem>
                        <FormItem>
                            <Input.Password
                                size="large"
                                type="password"
                                placeholder="确认密码"
                                onChange={(e) => {
                                    this.changeRepeatPassword(e.target.value)
                                }}
                            />
                        </FormItem>
                        <FormItem>
                            <Button
                                size="large"
                                className="register-form-button"
                                type="primary"
                                onClick={this.handleRegister}
                            >
                                注册
                            </Button>
                            <Link className="fr" to={{pathname:"/login",link:link}}>
                                使用已有账户登录
                            </Link>
                        </FormItem>
                    </Form>
                </Content>
            </Layout>
        );
    }
}

export default Register;
