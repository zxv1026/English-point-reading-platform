const express = require('express');
const Router = express.Router();
const Comment= require('./models/comment');

//根据话题ID来查找对应话题下的评论
Router.post('/list',function (req, res) {
    const {detailID} = req.body
    console.log(detailID)
    Comment.find({detailID})
        //通过populate关联表
        .populate({
            path:'userID',
        })
        .sort({'_id': -1})//因为mongodb的_id字段里其实已经包含了时间信息，所以可以通过_id来进行时间的排序
        .exec(function (err,doc) {
            console.log(doc)
            return res.json({code: 0, data:doc})
        })
})

Router.post('/remove', function (req, res) {
    const {_id} = req.body
    // console.log(_id);
    Comment.findByIdAndRemove(_id, function (err, doc) {
        return res.json({code:0,success:'删除评论成功'})
    })
})

Router.post('/create', function (req, res) {
    // console.log(req.body)
    const { comment,created,userID,detailID } = req.body;
    const CommentMoadl = new Comment({comment,created,userID,detailID})
    CommentMoadl.save(function (e, d) {
        if(e) {
            return res.json({msg: '后端出错'})
        }
        // console.log(d)
        return res.json({code:0,data:d,success:'评论成功'})
    })
})

module.exports = Router