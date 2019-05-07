import React, { Component } from 'react';
import { Modal, Form, Input,Select } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const { Option } = Select;

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
                        values.likenum = 0;
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
                        <FormItem
                            label="Icon"
                        >
                            {getFieldDecorator('icon',{
                                initialValue: record.icon,
                                rules: [{
                                    message: '请选择icon'
                                }]
                            })(
                                <Select>
                                    <Option value='dad'><img className='img icon' alt='icon' src={require(`../../../assets/images/content/dad.jpg`)}/></Option>
                                    <Option value='gril_cry'><img className='img icon' alt='icon' src={require(`../../../assets/images/content/gril_cry.jpg`)}/></Option>
                                    <Option value='gril'><img className='img icon' alt='icon' src={require(`../../../assets/images/content/gril.jpg`)}/></Option>
                                    <Option value='mom'><img className='img icon' alt='icon' src={require(`../../../assets/images/content/mom.jpg`)}/></Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            label="提示类别"
                        >
                            {getFieldDecorator('promptType',{
                                initialValue: record.promptType,
                                rules: [{
                                    message: '请选择提示类别'
                                }]
                            })(
                                <Select>
                                    <Option value='important'>重要</Option>
                                    <Option value='commonly'>一般</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            label="提示内容"
                        >
                            {getFieldDecorator('prompt',{
                                initialValue: record.prompt,
                                rules: [{
                                    message: '请输入提示内容'
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