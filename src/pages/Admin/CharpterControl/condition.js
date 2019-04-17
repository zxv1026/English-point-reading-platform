import React, { Component } from "react";
import { Form,Input,Button } from "antd";
import { connect } from 'react-redux';
import { charpterFindList } from "../../../redux/charpter_redux";

const FormItem = Form.Item;

@connect(
    state => ({

    }),
    {charpterFindList}
)
class Condition extends Component{

    reset(){
        this.props.form.resetFields();
    }
    handleSubmit(){
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                this.props.charpterFindList(values);
                // this.props.hide()
            }
        })
    }
    render(){
        const record = {}
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };
        return(
            <div className='conditions'>
                <Form {...formItemLayout} className="login-form">
                    {/* <FormItem
                        label="PartID"
                    >
                        {getFieldDecorator('partid',{
                            initialValue: record.partid,
                            rules: [{
                                pattern: new RegExp(/^[0-9]\d*$/, "g"),
                                message: '请输入PartID，只能输入非负整数'
                            }]
                        })(
                            <Input allowClear/>
                        )}
                    </FormItem>
                    <FormItem
                        label="CharpterID"
                    >
                        {getFieldDecorator('charpterid',{
                            initialValue: record.charpterid,
                            rules: [{
                                pattern: new RegExp(/^[0-9]\d*$/, "g"),
                                message: '请输入PartID，只能输入非负整数'
                            }]
                        })(
                            <Input allowClear/>
                        )}
                    </FormItem> */}
                    <FormItem
                        label="Part名"
                    >
                        {getFieldDecorator('partname',{
                            initialValue: record.partname,
                            rules: [{
                                message: '请输入Part名称'
                            }]
                        })(
                            <Input allowClear/>
                        )}
                    </FormItem>
                    <FormItem
                        label="Charpter名"
                    >
                        {getFieldDecorator('name',{
                            initialValue: record.name,
                            rules: [{
                                message: '请输入Charpter名称'
                            }]
                        })(
                            <Input allowClear/>
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