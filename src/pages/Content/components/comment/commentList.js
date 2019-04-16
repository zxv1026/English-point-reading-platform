import React, { Component } from 'react';
import { Icon, List, Button,Avatar,Popconfirm } from "antd";
import { connect } from 'react-redux';
import moment from 'moment';

@connect(
    state => ({
        commentlist: state.comment.list,
        userID: state.user._id,
        usertype: state.user.type,
        detailcommentnum: state.detail.commentnum,
    }),
    {}
)
class CommentList extends Component{
    delectComment(id) {
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(id)
        }
    }
    render(){
        console.log(this.props.commentlist);
        const { commentlist,userID,usertype,detailcommentnum } = this.props;
        return (
            <div style={{marginTop:30}}>
                <div>
                    <h4>{detailcommentnum+'条评论'}</h4>
                </div>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        pageSize: 15,
                    }}
                    dataSource={commentlist}
                    renderItem={item => (
                        <List.Item 
                            key={"comment_"+item._id}
                            extra={userID===item.userID._id || usertype==='admin'?
                                <Popconfirm
                                    title="确定删除吗?"
                                    icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                                    cancelText="取消"
                                    okText="确认"
                                    onConfirm={() => {
                                        this.delectComment(item._id);
                                    }}
                                >
                                    <Button style={{float: 'right'}} className='button' type="danger">删除</Button>
                                </Popconfirm>:null}
                        >
                            <List.Item.Meta
                                avatar={<Avatar size='large' src={require(`../../../../assets/images/user/${item.userID.avatar}.jpg`)} />}
                                title={
                                    <div>
                                        <span>{item.userID.username}</span>
                                        <p style={{fontSize:12,color:'#969696'}}>{'评论时间：'+moment(item.created).format('YYYY-MM-DD HH:mm:ss')}</p>
                                    </div>}
                            />
                            <p style={{color: '#000000'}}>{item.comment}</p>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

export default CommentList;