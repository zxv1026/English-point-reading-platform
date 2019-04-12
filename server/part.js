const express = require('express');
const Router = express.Router();
const Part = require('./models/part');
const Charpter = require('./models/charpter');


//取点赞数最多的5个
Router.get('/findlikenumlist',function (req,res) {
    Part.find({})
        .sort({'likenum': -1})
        .limit(5)
        .exec(function (err,doc) {
            // console.log(doc)
            return res.json({code: 0, data:doc})
        })
})
//取收藏数最多的5个
Router.get('/findcollectnumlist',function (req,res) {
    Part.find({})
        .sort({'collectnum': -1})
        .limit(5)
        .exec(function (err,doc) {
            // console.log(doc)
            return res.json({code: 0, data:doc})
        })
})

Router.get('/list',function (req, res) {
    // Part.remove({},function (err,doc) {})
    Part.find({},null,{sort: {'partid': 1}},function (err,doc) {
        return res.json({code: 0, data:doc})
    })
})

Router.post('/one',function (req, res) {
    const {id} = req.body
    Part.findOne({'partid': id})
        .exec(function (err,doc) {
            console.log(doc)
            return res.json({code: 0, data:doc})
        })
})

Router.post('/remove', function (req, res) {
    const {_id,partid} = req.body
    console.log(req.body);
    Charpter.findOne({'partid': partid},function (err,doc) {
        if(doc){
            return res.json({msg: '该PartID下还有Charpter内容，不能删除！'})
        }else{
            Part.findByIdAndRemove(_id,function (err, doc) {
                return res.json({code:0,success:'删除part成功'})
            })
        }
    })
})

Router.post('/updatelikenum', function (req, res) {
    // console.log(req.body)
    const body = req.body
    const {partid} = req.body
    Part.findOneAndUpdate({'partid': partid}, body, function (err, doc) {
        return res.json({code:0, data: body})
    })
})

Router.post('/update', function (req, res) {
    // console.log(req.body)
    const body = req.body
    const {_id} = req.body
    Part.findByIdAndUpdate(_id,body,function (err, doc) {
        return res.json({code:0, data: body, success:'更新part成功'})
    })
})

Router.post('/create', function (req, res) {
    console.log(req.body)
    const { partid, name, created,likenum,collectnum } = req.body;
    Part.findOne({partid},function (err, doc) {
        if(doc) {
            return res.json({msg: 'PartID已经存在，请换一个'})
        }
        Part.create({partid, name, created,likenum,collectnum },function (e, d) {
            if(e) {
                return res.json({msg: '后端出错'})
            }
            return res.json({code:0,success:'创建part成功'})
        })
    })
})

module.exports = Router