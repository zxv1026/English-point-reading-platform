import React, { Component } from 'react';
import { Modal, Form, Input, InputNumber, Alert, Upload } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;

class contentModal extends Component{
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
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };
        return(
            <span>
                <span onClick={this.showModal}>
                    {children}
                </span>
                <Modal
                    title="编辑Content"
                    visible={this.state.visible}
                    onOk={this.okHandler}
                    onCancel={this.hideModelHandler}
                    okText="确认"
                    cancelText="取消"
                >
                    <Form {...formItemLayout} className="login-form">
                        <FormItem
                            label="ContentID"
                        >
                            {getFieldDecorator('contentid',{
                                initialValue: record.contentid,
                                rules: [{
                                    required: true,
                                    pattern: new RegExp(/^[0-9]\d*$/, "g"),
                                    message: '请输入ContentID，只能输入非负整数'
                                }]
                            })(
                                <Input
                                    size="large"
                                    disabled={disabled}
                                />
                            )}
                        </FormItem>
                        <FormItem
                            label="DetailID"
                        >
                            {getFieldDecorator('detailid',{
                                initialValue: record.detailid,
                                rules: [{
                                    required: true,
                                    pattern: new RegExp(/^[0-9]\d*$/, "g"),
                                    message: '请输入DetailID，只能输入非负整数'
                                }]
                            })(
                                <Input
                                    size="large"
                                />
                            )}
                        </FormItem>
                        <FormItem
                            label="中文句子"
                        >
                            {getFieldDecorator('chinese',{
                                initialValue: record.chinese,
                                rules: [{
                                    required: true,
                                    message: '请输入中文句子'
                                }]
                            })(
                                <Input
                                    size="large"
                                />
                            )}
                        </FormItem>
                        <FormItem
                            label="英文句子"
                        >
                            {getFieldDecorator('english',{
                                initialValue: record.english,
                                rules: [{
                                    required: true,
                                    message: '请输入英文句子'
                                }]
                            })(
                                <Input
                                    size="large"
                                />
                            )}
                        </FormItem>
                        <FormItem
                            label="音频偏移时间"
                        >
                            {getFieldDecorator('offset',{
                                initialValue: record.offset,
                                rules: [{
                                    required: true,
                                    pattern: new RegExp(/^[0-9]\d*$/, "g"),
                                    message: '请输入对于句子的音频的偏移时间（单位：ms），只能输入非负整数'
                                }]
                            })(
                                <Input
                                    size="large"
                                />
                            )}
                        </FormItem>
                        <FormItem
                            label="音频持续时间"
                        >
                            {getFieldDecorator('duration',{
                                initialValue: record.duration,
                                rules: [{
                                    required: true,
                                    pattern: new RegExp(/^[1-9]\d*$/, "g"),
                                    message: '请输入对于句子的音频的持续时间（单位：ms），只能输入正整数'
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

export default Form.create()(contentModal);