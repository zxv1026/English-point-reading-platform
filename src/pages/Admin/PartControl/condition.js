import React, { Component } from "react";
import { Form,Input,Button } from "antd";
import { connect } from 'react-redux';
import { partFindList } from "../../../redux/part_redux";

const FormItem = Form.Item;

@connect(
    state => state.part,
    {partFindList}
)
class Condition extends Component{

    reset(){
        this.props.form.resetFields();
    }
    handleSubmit(){
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                this.props.partFindList(values);
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
                        label="PartID"
                    >
                        {getFieldDecorator('partid',{
                            initialValue: record.partid,
                            rules: [{
                                pattern: new RegExp(/^[0-9]\d*$/, "g"),
                                message: 'PartID，只能输入非负整数'
                            }]
                        })(
                            <Input  placeholder='请输入想要查找的PartID'  allowClear/>
                        )}
                    </FormItem>
                    <FormItem
                        label="Part名"
                    >
                        {getFieldDecorator('name',{
                            initialValue: record.name,
                        })(
                            <Input placeholder='请输入想要查找的章节名称' allowClear/>
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