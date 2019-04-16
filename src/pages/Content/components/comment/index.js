import React, { Component } from 'react';
import CommentInput from './commentInput';
import CommentList from './commentList';
import { connect } from 'react-redux';
import { createComment,removeComment,getCommentList } from "../../../../redux/comment_redux";
import { message } from 'antd';

@connect(
    state => ({
        detailID: state.detail._id
    }),
    {createComment,removeComment,getCommentList}
)
class Comment extends Component{
    constructor() {
        super()
        this.state = {
            
        }
    }
    // componentDidMount(){
    //     const { detailID } = this.props
    //     const data = {
    //         detailID: detailID
    //     }
    //     console.log(data)
    //     this.props.getCommentList(data);
    // }
    componentDidUpdate(){
        const { detailID } = this.props;
        const data = {
            detailID: detailID
        }
        this.props.getCommentList(data);
    }
    handleSubmitComment(comment) {
        if (!comment.comment) return message('请输入评论内容')
        this.props.createComment(comment);
    }
    handleDeleteComment(commentid) {
        this.props.removeComment(commentid,this.props.detailID);
    }
    render(){
        return (
            <div>
                <CommentInput onSubmit={this.handleSubmitComment.bind(this)} />
                <CommentList onDeleteComment={this.handleDeleteComment.bind(this)}/>
            </div>
        )
    }
}

export default Comment;