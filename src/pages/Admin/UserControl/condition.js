import React, { Component } from "react";
import { Form,Input,Button,Select } from "antd";
import { connect } from 'react-redux';
import { userFindList } from "../../../redux/user_redux";

const FormItem = Form.Item;
const { Option } = Select;

@connect(
    state => ({

    }),
    {userFindList}
)
class Condition extends Component{

    reset(){
        this.props.form.resetFields();
    }
    handleSubmit(){
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                this.props.userFindList(values);
                // this.props.hide()
            }
        })
    }
    render(){
        const record = {}
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 },
        };
        return(
            <div className='conditions'>
                <Form {...formItemLayout} className="login-form">
                    <FormItem
                        label="用户名"
                    >
                        {getFieldDecorator('username',{
                            initialValue: record.username,
                            rules: [{
                                message: '请输入用户名'
                            }]
                        })(
                            <Input allowClear/>
                        )}
                    </FormItem>
                    <FormItem
                        label="类别"
                    >
                        {getFieldDecorator('type',{
                            initialValue: record.type,
                            rules: [{
                                message: '请选择类别'
                            }]
                        })(
                            <Select allowClear='true'>
                                <Option value='user'>user</Option>
                                <Option value='admin'>admin</Option>
                            </Select>
                        )}
                    </FormItem>
                </Form>
                <div className="clearfix">
                    <Button
                        onClick={()=>this.reset()}
                        style={{ float: "right", width: 100 }}
                        htmlType="submit"
                    >
                        重置
                    </Button>
                    <Button
                        onClick={()=>this.handleSubmit()}
                        style={{ float: "right", width: 100, marginRight: 20 }}
                        type="primary"
                        htmlType="submit"
                    >
                        提交
                    </Button>
                </div>
            </div>
        )
    }
}

export default Form.create()(Condition);