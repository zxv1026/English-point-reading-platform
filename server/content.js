const express = require('express');
const Router = express.Router();
const Detail = require('./models/detail');
const Content = require('./models/content');

Router.get('/list',function (req, res) {
    // Content.remove({},function (err,doc) {})
    Content.find({}).populate('detailID').exec(function (err,doc) {
        console.log(doc)
        return res.json({code: 0, data:doc})
    })
})
//获取与前端传过来的detailid相同的的content信息
Router.post('/listone',function (req, res) {
    const {id} = req.body
    Content.find({'detailid': id}, null,{sort: {'contentid': 1}},function (err, doc) {
        return res.json({code: 0, data:doc})
    })
})

Router.post('/remove', function (req, res) {
    const {_id} = req.body
    console.log(req.body);
    Content.findByIdAndRemove(_id, function (err, doc) {
        return res.json({code:0,success:'删除content成功'})
    })
})

Router.post('/update', function (req, res) {
    // console.log(req.body)
    const body = req.body
    const {_id,detailid} = req.body
    Detail.findOne({'detailid': detailid}, function (err, doc) {
        if(doc){
            body.detailID = doc._id;
            Content.findByIdAndUpdate(_id, body, function (err, doc) {
                console.log(body)
                return res.json({code:0, data: body,success:'更新content成功'})
            })
        }else{
            return res.json({msg: '更新content失败，DetailID不存在'})
        }
    })
})

Router.post('/create', function (req, res) {
    console.log(req.body)
    const { contentid, detailid, chinese, english, offset, duration, created } = req.body;
    Detail.findOne({'detailid': detailid},function (err,doc) {
        if(doc){
            const detailID = doc._id;
            console.log(detailID)
            Content.findOne({contentid},function (err, doc) {
                if(doc) {
                    return res.json({msg: '创建content失败，ContentID已经存在，请换一个'})
                }
                Content.create({contentid, detailid,chinese, english,offset, duration, created,detailID },function (e, d) {
                    if(e) {
                        return res.json({msg: '后端出错'})
                    }
                    return res.json({code:0,success:'创建content成功'})
                })
            })
        }else{
            return res.json({msg: '创建content失败，DetailID不存在'})
        }
    })
})

module.exports = Router