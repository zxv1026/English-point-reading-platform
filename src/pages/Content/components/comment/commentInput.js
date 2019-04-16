import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
            comment: '',
        }
    }
    handleChange(value) {
        let { comment } = this.state;
        comment = value;
        this.setState({comment});
    }
    handleSubmit() {
        const { comment } = this.state;
        const { userID, detailID } = this.props;
        if (this.props.onSubmit) {
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
        const { userID,link } = this.props;
        return(
            <div>
                {userID?
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
                    </Form>:<Form className='form'>
                            <div style={{marginTop:20}}>
                                <Link to={{
                                    pathname: '/login',
                                    link: link,
                                }}>
                                    <Button type='primary'>登录</Button>
                                </Link>
                                <span>  后发表评论</span>
                            </div>
                    </Form>}
            </div>
        )
    }
}

export default commentInput;