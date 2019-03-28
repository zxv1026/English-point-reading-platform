import React, { Component } from 'react';
import { Modal, Form, Input , Alert } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;

class usersModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            disabled: true,
        }
    }
    componentWillMount(){
        const { create } = this.props;
        if(create){
            this.setState({
                disabled: false,
            })
        }
    }
    showModal = (e) => {
        if (e) e.stopPropagation();
        this.setState({
            visible: true,
        });
    }
    okHandler = () => {
        const { onOk, create } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // values.comfirm = undefined;
                if (typeof onOk === "function") {
                    if(create){
                        values.created = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
                        values.repeatpassword = values.password;
                    }
                    onOk(values);
                    console.log(values)
                    console.log(typeof onOk)
                }
                this.hideModelHandler();
            }
        })
    }

    hideModelHandler = (e) => {
        // console.log(e);
        this.setState({
            visible: false,
        });
    }
    render(){
        let {children,record} = this.props;
        const { getFieldDecorator } = this.props.form;
        const { disabled } = this.state;
        if (!record) {
            record = {}
        }
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 },
        };
        return(
            <span>
                <span onClick={this.showModal}>
                    {children}
                </span>
                <Modal
                    title="编辑用户"
                    visible={this.state.visible}
                    onOk={this.okHandler}
                    onCancel={this.hideModelHandler}
                    okText="确认"
                    cancelText="取消"
                >
                    <Form {...formItemLayout} className="login-form">
                        <FormItem
                            label="用户名"
                        >
                            {getFieldDecorator('username',{
                                initialValue: record.username,
                                rules: [{
                                    required: true,
                                    message: '请输入用户名'
                                }]
                            })(
                                <Input
                                    size="large"
                                    disabled={disabled}
                                />
                            )}
                        </FormItem>
                        <FormItem
                            label="类别"
                        >
                            {getFieldDecorator('type',{
                                initialValue: record.type,
                                rules: [{
                                    required: true,
                                    message: '请输入类别'
                                }]
                            })(
                                <Input
                                    size="large"
                                />
                            )}
                        </FormItem>
                        <FormItem
                            label="密码"
                        >
                            {getFieldDecorator('password',{
                                initialValue: record.password,
                                rules: [{
                                    required: true,
                                    message: '请输入密码'
                                }]
                            })(
                                <Input.Password
                                    size="large"
                                />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </span>
        )
    }
}

export default Form.create()(usersModal);