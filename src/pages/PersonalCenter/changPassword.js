import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom';
import { Icon,Layout,Form,Button,Alert,Input } from 'antd';
import Header from '../../components/Header';
import './index.less';
import { connect } from 'react-redux';
import { changepassword,empty } from "../../redux/user_redux";

const { Content } = Layout;
const FormItem = Form.Item;

@connect(
    state => state.user,
    {changepassword,empty }
)
class ChangPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            oldpassword: '',
            password: '',
            repeatpassword: '',
        }
        this.handleChanePassword = this.handleChanePassword.bind(this)
    }
    componentDidMount(){
        this.props.empty()
    }
    changeOldPassword = (value) => {
        let { oldpassword } = this.state;
        oldpassword = value;
        this.setState({oldpassword});
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
    handleChanePassword(id) {
        this.props.changepassword(id,this.state);
    }
    render() {
        const {id,path} = this.props.location.state;
        const { msg,changeTo } = this.props;
        return (
            <div>
                <Header/>
                <Link to={{
                    pathname: path
                }}>
                    <Icon type="caret-left"/>
                    Back
                </Link>
                <Layout className="full-layout changepassword">
                    <Content>
                        <Form  className="login-form">
                            {changeTo?<Redirect to='/'/>:null}
                            {msg?<Alert className="err-msg" message={msg} type="error" showIcon />:null}
                            <FormItem
                                label="请输入之前的密码"
                            >
                                <Input.Password
                                    size="large"
                                    prefix={<Icon type="lock" />}
                                    type = "password"
                                    placeholder="请输入之前的密码"
                                    onChange={(e) => {
                                        this.changeOldPassword(e.target.value)
                                    }}
                                />
                            </FormItem>
                            <FormItem
                                label="请输入修改的密码"
                            >
                                <Input.Password
                                    size="large"
                                    prefix={<Icon type="lock" />}
                                    type="password"
                                    placeholder="请输入修改的密码"
                                    onChange={(e) => {
                                        this.changePassword(e.target.value)
                                    }}
                                />
                            </FormItem>
                            <FormItem
                                label="确认修改的密码"
                            >
                                <Input.Password
                                    size="large"
                                    prefix={<Icon type="lock" />}
                                    type="password"
                                    placeholder="确认修改的密码"
                                    onChange={(e) => {
                                        this.changeRepeatPassword(e.target.value)
                                    }}
                                />
                            </FormItem>
                            <FormItem>
                                <Button
                                    size="large"
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                    onClick={()=>this.handleChanePassword(id)}
                                >
                                    修改
                                </Button>
                            </FormItem>
                        </Form>
                    </Content>
                </Layout>
            </div>
        )
    }
}

export default ChangPassword;