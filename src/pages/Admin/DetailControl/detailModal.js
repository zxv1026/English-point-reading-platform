import React, { Component } from 'react';
import { Modal, Form, Input , Alert, Upload } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;

class detailModal extends Component{
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
            labelCol: { span: 5 },
            wrapperCol: { span: 18 },
        };
        return(
            <span>
                <span onClick={this.showModal}>
                    {children}
                </span>
                <Modal
                    title="编辑Detail"
                    visible={this.state.visible}
                    onOk={this.okHandler}
                    onCancel={this.hideModelHandler}
                    okText="确认"
                    cancelText="取消"
                >
                    <Form {...formItemLayout} className="login-form">
                        <FormItem
                            label="DetailID"
                        >
                            {getFieldDecorator('id',{
                                initialValue: record.id,
                                rules: [{
                                    required: true,
                                    message: '请输入DetailID'
                                }]
                            })(
                                <Input
                                    size="large"
                                    disabled={disabled}
                                />
                            )}
                        </FormItem>
                        <FormItem
                            label="CharpterID"
                        >
                            {getFieldDecorator('charpterid',{
                                initialValue: record.charpterid,
                                rules: [{
                                    required: true,
                                    message: '请输入CharpterID'
                                }]
                            })(
                                <Input
                                    size="large"
                                />
                            )}
                        </FormItem>
                        <FormItem
                            label="Detail名"
                        >
                            {getFieldDecorator('name',{
                                initialValue: record.name,
                                rules: [{
                                    required: true,
                                    message: '请输入Detail名称'
                                }]
                            })(
                                <Input
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

export default Form.create()(detailModal);