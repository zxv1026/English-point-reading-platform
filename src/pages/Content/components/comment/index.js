import React, { Component } from 'react';
import CommentInput from './commentInput';
import CommentList from './commentList';
import { connect } from 'react-redux';
import { createComment,removeComment,getCommentList } from "../../../../redux/comment_redux";
import { updatenum } from "../../../../redux/detail_redux";
import { updatecharpterlikenum } from "../../../../redux/charpter_redux";
import { updatepartlikenum } from "../../../../redux/part_redux";

@connect(
    state => ({
        detailcommentnum: state.detail.commentnum,
        charptercommentnum: state.charpter.commentnum,
        partcommentnum: state.part.commentnum,
    }),
    {createComment,removeComment,getCommentList,updatenum,updatecharpterlikenum,updatepartlikenum}
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
        const { charpterid,partid,detailID } = this.props;
        this.props.createComment(comment);
        if(comment.comment){
            let detailcommentnum = this.props.detailcommentnum + 1;
            let charptercommentnum = this.props.charptercommentnum + 1;
            let partcommentnum = this.props.partcommentnum + 1;
            const detail = {
                commentnum: detailcommentnum
            }
            const charpter = {
                commentnum: charptercommentnum
            }
            const part = {
                commentnum: partcommentnum
            }
            this.props.updatenum(detailID, detail);
            this.props.updatecharpterlikenum(charpterid, charpter);
            this.props.updatepartlikenum(partid, part);
        }
    }
    handleDeleteComment(commentid) {
        const { charpterid,partid,detailID } = this.props;
        this.props.removeComment(commentid,detailID);
        let detailcommentnum = this.props.detailcommentnum - 1;
        let charptercommentnum = this.props.charptercommentnum - 1;
        let partcommentnum = this.props.partcommentnum - 1;
        const detail = {
            commentnum: detailcommentnum
        }
        const charpter = {
            commentnum: charptercommentnum
        }
        const part = {
            commentnum: partcommentnum
        }
        this.props.updatenum(detailID, detail);
        this.props.updatecharpterlikenum(charpterid, charpter);
        this.props.updatepartlikenum(partid, part);
    }
    render(){
        const { link } = this.props
        return (
            <div>
                <CommentInput onSubmit={this.handleSubmitComment.bind(this)} link={link}/>
                <CommentList onDeleteComment={this.handleDeleteComment.bind(this)}/>
            </div>
        )
    }
}

export default Comment;