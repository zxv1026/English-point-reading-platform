const express = require('express');
const Router = express.Router();
const Detail = require('./models/detail');
const Content = require('./models/content');

Router.get('/list',function (req, res) {
    // Content.remove({},function (err,doc) {})
    Content.find({}, function (err, doc) {
        return res.json({code: 0, data:doc,msg: 'true'})
    })
})
//获取与前端传过来的detailid相同的的content信息
Router.post('/listone',function (req, res) {
    const {id} = req.body
    Content.find({'detailid': id}, null,{sort: {'contentid': 1}},function (err, doc) {
        return res.json({code: 0, data:doc,msg: 'true'})
    })
})

Router.post('/remove', function (req, res) {
    const {_id} = req.body
    console.log(req.body);
    Content.findByIdAndRemove(_id, function (err, doc) {
        return res.json({code:1})
    })
})

Router.post('/update', function (req, res) {
    // console.log(req.body)
    const body = req.body
    const {_id} = req.body
    Content.findByIdAndUpdate(_id, body, function (err, doc) {
        return res.json({code:0, data: body, msg: 'true'})
    })
})

Router.post('/create', function (req, res) {
    console.log(req.body)
    const { contentid, detailid, chinese, english, offset, duration, created } = req.body;
    Detail.findOne({'detailid': detailid},function (err,doc) {
        if(doc){
            Content.findOne({contentid},function (err, doc) {
                if(doc) {
                    return res.json({msg: 'ContentID已经存在，请换一个'})
                }
                Content.create({contentid, detailid,chinese, english,offset, duration, created },function (e, d) {
                    if(e) {
                        return res.json({msg: '后端出错'})
                    }
                    return res.json({code:0})
                })
            })
        }else{
            return res.json({msg: 'DetailID不存在'})
        }
    })
})

module.exports = Router