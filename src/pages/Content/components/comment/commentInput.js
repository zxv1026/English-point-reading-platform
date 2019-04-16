import React, { Component } from 'react';
import { Input, Button,Form } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';

const { TextArea } = Input;

@connect(
    state => ({
        userID: state.user._id,
        detailID: state.detail._id,
    }),
    {}
)
class commentInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: ''
        }
    }
    handleChange(value) {
        let { comment } = this.state;
        comment = value;
        this.setState({comment});
    }
    handleSubmit() {
        if (this.props.onSubmit) {
            const { comment } = this.state;
            const { userID, detailID } = this.props;
            const data = {
                userID: userID,
                detailID: detailID,
                comment: comment,
                created: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            }
            this.props.onSubmit(data)
        }
        this.setState({ comment: '' })
    }
    render(){
        console.log(this.props.onSubmit)
        return(
            <div>
                <Form>
                    <Form.Item>
                        <div>评论内容：</div>
                    </Form.Item>
                    < Form.Item>
                        <TextArea
                            placeholder="请输入评论内容" 
                            autosize={{ minRows: 4}}
                            value={this.state.comment}
                            onChange={(e) => {
                                this.handleChange(e.target.value)
                            }}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button style={{float: 'right'}} type="primary" onClick={()=>this.handleSubmit()}>发布</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default commentInput;