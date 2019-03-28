const express = require('express');
const Router = express.Router();
const Detail = require('./models/detail');

Router.get('/list',function (req, res) {
    // CharPart.remove({},function (err,doc) {})
    Detail.find({}, function (err, doc) {
        return res.json({code: 0, data:doc,msg: 'true'})
    })
})

Router.post('/remove', function (req, res) {
    const {_id} = req.body
    console.log(req.body);
    Detail.findByIdAndRemove(_id, function (err, doc) {
        return res.json({code:1})
    })
})

Router.post('/update', function (req, res) {
    // console.log(req.body)
    const body = req.body
    const {_id} = req.body
    Detail.findByIdAndUpdate(_id, body, function (err, doc) {
        return res.json({code:0, data: body, msg: 'true'})
    })
})

Router.post('/create', function (req, res) {
    console.log(req.body)
    const { id, charpterid, name, created } = req.body;
    Detail.findOne({id},function (err, doc) {
        if(doc) {
            return res.json({msg: 'DetailID已经存在，请换一个'})
        }
        Detail.create({id, charpterid, name, created },function (e, d) {
            if(e) {
                return res.json({msg: '后端出错'})
            }
            return res.json({code:0})
        })
    })
})

module.exports = Router