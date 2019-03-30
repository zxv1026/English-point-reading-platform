const express = require('express');
const Router = express.Router();
const Part = require('./models/part');

Router.get('/list',function (req, res) {
    // Part.remove({},function (err,doc) {})
    Part.find({},null,{sort: {'partid': 1}},function (err,doc) {
        return res.json({code: 0, data:doc,msg: 'true'})
    })
})

Router.post('/remove', function (req, res) {
    const {_id} = req.body
    console.log(req.body);
    Part.findByIdAndRemove(_id,function (err, doc) {
        return res.json({code:1})
    })
})

Router.post('/update', function (req, res) {
    // console.log(req.body)
    const body = req.body
    const {_id} = req.body
    Part.findByIdAndUpdate(_id,body,function (err, doc) {
        return res.json({code:0, data: body, msg: 'true'})
    })
})

Router.post('/create', function (req, res) {
    console.log(req.body)
    const { partid, name, created } = req.body;
    Part.findOne({partid},function (err, doc) {
        if(doc) {
            return res.json({msg: 'PartID已经存在，请换一个'})
        }
        Part.create({partid, name, created },function (e, d) {
            if(e) {
                return res.json({msg: '后端出错'})
            }
            return res.json({code:0})
        })
    })
})

module.exports = Router