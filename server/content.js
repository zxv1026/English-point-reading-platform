const express = require('express');
const Router = express.Router();
const Content = require('./models/content');

Router.get('/list',function (req, res) {
    // Content.remove({},function (err,doc) {})
    Content.find({}, function (err, doc) {
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
    const { id, detailid, chinese, english, offset, duration, created } = req.body;
    Content.findOne({id},function (err, doc) {
        if(doc) {
            return res.json({msg: 'ContentID已经存在，请换一个'})
        }
        Content.create({id, detailid,chinese, english,offset, duration, created },function (e, d) {
            if(e) {
                return res.json({msg: '后端出错'})
            }
            return res.json({code:0})
        })
    })
})

module.exports = Router