const express = require('express');
const Router = express.Router();
// const mongoose = require('mongoose');
// const Part = mongoose.model('Part');
const Part = require('./models/part');
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
    // console.log("charpter创建")
    // console.log(req.body)
    const { charpterid, partid, name, created } = req.body;
    Charpter.findOne({charpterid},function (err, doc) {
        if(doc) {
            return res.json({msg: 'CharpterID已经存在，请换一个'})
        }
        Part.findOne({partid},function (err,doc) {
            // console.log(charpterid)
            // console.log(doc)
            // console.log(doc.name)
            if(doc){
                console.log(charpterid)
                Charpter.create({charpterid, partid, name, created },function (e, d) {
                    console.log(d)
                    if(e) {
                        return res.json({msg: '后端出错'})
                    }
                    return res.json({code:0})
                })
            }else{
                return res.json({msg: 'PartID不存在'})
            }
        })
    })
})

module.exports = Router