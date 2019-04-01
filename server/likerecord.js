const express = require('express');
const Router = express.Router();
const LikeRecord = require('./models/likerecord');


Router.post('/one',function (req, res) {
    const {detailID,userID} = req.body
    console.log(detailID)
    console.log(userID)
    LikeRecord.findOne({detailID,userID},function (err, doc) {
        console.log(doc)
        if(doc){
            return res.json({code: 0, data:doc})
        }else{
            return res.json({code: 1})
        }
    })
})

Router.post('/remove', function (req, res) {
    const {_id} = req.body
    console.log(_id);
    LikeRecord.findByIdAndRemove(_id, function (err, doc) {
        return res.json({code:0,success:'取消点赞成功'})
    })
})

Router.post('/create', function (req, res) {
    console.log(req.body)
    const { like,created,userID,detailID } = req.body;
    const LikeRecordMoadl = new LikeRecord({like,created,userID,detailID})
    LikeRecordMoadl.save(function (e, d) {
        if(e) {
            return res.json({msg: '后端出错'})
        }
        console.log(d)
        return res.json({code:0,data:d,success:'点赞成功'})
    })
})

module.exports = Router