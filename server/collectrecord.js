const express = require('express');
const Router = express.Router();
const CollectRecord= require('./models/collectrecord');

//根据用户ID来查找用户收藏的话题
Router.post('/list',function (req, res) {
    const {userID} = req.body
    console.log(userID)
    CollectRecord.find({userID})
        .populate({
            path:'detailID',
            populate: {
                path: 'charpterID',
                populate: {
                    path: 'partID'
                }
            }
        })
        .sort({'_id': -1})//因为mongodb的_id字段里其实已经包含了时间信息，所以可以通过_id来进行时间的排序
        .exec(function (err,doc) {
            console.log(doc)
            return res.json({code: 0, data:doc})
        })
})

Router.post('/one',function (req, res) {
    const {detailID,userID} = req.body
    console.log(detailID)
    console.log(userID)
    CollectRecord.findOne({detailID,userID},function (err, doc) {
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
    CollectRecord.findByIdAndRemove(_id, function (err, doc) {
        return res.json({code:0,success:'取消收藏成功'})
    })
})

Router.post('/create', function (req, res) {
    console.log(req.body)
    const { collect,created,userID,detailID } = req.body;
    const CollectRecordMoadl = new CollectRecord({collect,created,userID,detailID})
    CollectRecordMoadl.save(function (e, d) {
        if(e) {
            return res.json({msg: '后端出错'})
        }
        console.log(d)
        return res.json({code:0,data:d,success:'收藏成功'})
    })
})

module.exports = Router