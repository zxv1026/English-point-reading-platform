const express = require('express');
const Router = express.Router();
const Charpter = require('./models/charpter');

Router.get('/list',function (req, res) {
    // CharPart.remove({},function (err,doc) {})
    Charpter.find({}, function (err, doc) {
        return res.json({code: 0, data:doc,msg: 'true'})
    })
})

Router.post('/remove', function (req, res) {
    const {_id} = req.body
    console.log(req.body);
    Charpter.findByIdAndRemove(_id, function (err, doc) {
        return res.json({code:1})
    })
})

Router.post('/update', function (req, res) {
    // console.log(req.body)
    const body = req.body
    const {_id} = req.body
    Charpter.findByIdAndUpdate(_id, body, function (err, doc) {
        return res.json({code:0, data: body, msg: 'true'})
    })
})

Router.post('/create', function (req, res) {
    console.log(req.body)
    const { id, partid, name, created } = req.body;
    Charpter.findOne({id},function (err, doc) {
        if(doc) {
            return res.json({msg: 'CharPartID已经存在，请换一个'})
        }
        Charpter.create({id, partid, name, created },function (e, d) {
            if(e) {
                return res.json({msg: '后端出错'})
            }
            return res.json({code:0})
        })
    })
})

module.exports = Router