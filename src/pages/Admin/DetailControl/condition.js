import React, { Component } from "react";
import { Form,Input,Button,Select } from "antd";
import { connect } from 'react-redux';
import { detailFindList } from "../../../redux/detail_redux";
import { AudioMapper } from "../../../utils/audio";

const FormItem = Form.Item;
const { Option } = Select;

@connect(
    state => ({

    }),
    {detailFindList}
)
class Condition extends Component{

    reset(){
        this.props.form.resetFields();
    }
    handleSubmit(){
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                this.props.detailFindList(values);
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
                    <FormItem
                        label="章节名"
                    >
                        {getFieldDecorator('partname',{
                            initialValue: record.partname,
                        })(
                            <Input placeholder='请输入想要查找的章节名称' allowClear/>
                        )}
                    </FormItem>
                    <FormItem
                        label="Charpter名"
                    >
                        {getFieldDecorator('charptername',{
                            initialValue: record.charptername,
                        })(
                            <Input placeholder='请输入想要查找的Charpter名称' allowClear/>
                        )}
                    </FormItem>
                    <FormItem
                        label="话题名"
                    >
                        {getFieldDecorator('name',{
                            initialValue: record.name,
                        })(
                            <Input placeholder='请输入想要查找的话题名称' allowClear/>
                        )}
                    </FormItem>
                    <FormItem
                        label="音频"
                    >
                        {getFieldDecorator('mp3',{
                            initialValue: record.mp3,
                        })(
                            <Select placeholder='请选择想要查找的信息的音频' allowClear>
                                {Object.keys(AudioMapper).map(key => {
                                    return <Option
                                    key={key}
                                    value={AudioMapper[key].name}
                                    >
                                        {AudioMapper[key].name}
                                    </Option>
                                })}
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