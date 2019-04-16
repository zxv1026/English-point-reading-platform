const express = require('express');
const Router = express.Router();
// const mongoose = require('mongoose');
// const Part = mongoose.model('Part');
const Part = require('./models/part');
const Charpter = require('./models/charpter');
const Detail = require('./models/detail')

//根据输入的内容查询
Router.post('/find',function(req,res) {
    const {find} = req.body
    //通过使用RegExp，来构建正则表达式对象，来模糊查询
    const reg = new RegExp(find,'i')//
    console.log(find)
    Charpter.find({$or:[{name: {$regex: reg}}]})
        .populate({
            path:'partID',
        })
        .sort({'_id': -1})
        .exec(function (err,doc) {
            console.log(doc)
            if(err){
                return res.json({msg: '后端出错'})
            }
            return res.json({code: 0,data:doc})
        })
})
//取点赞数最多的10个
Router.get('/findlikenumlist',function (req,res) {
    Charpter.find({})
        .populate({
            path:'ppartID',
        })
        .sort({'likenum': -1})
        .limit(10)
        .exec(function (err,doc) {
            // console.log(doc)
            return res.json({code: 0, data:doc})
        })
})
//取收藏数最多的10个
Router.get('/findcollectnumlist',function (req,res) {
    Charpter.find({})
        .populate({
            path:'partID',
        })
        .sort({'collectnum': -1})
        .limit(10)
        .exec(function (err,doc) {
            // console.log(doc)
            return res.json({code: 0, data:doc})
        })
})

//获取全部charpter信息
Router.get('/list',function (req, res) {
    // Charpter.remove({},function (err,doc) {})
    Charpter.find({})
        .populate({
            path: 'partID',
        })
        .sort({'_id': 1})
        .exec(function (err, doc) {
            return res.json({code: 0,data: doc})
        })
})

Router.post('/one',function (req, res) {
    const {id} = req.body
    Charpter.findOne({'charpterid': id})
        .exec(function (err,doc) {
            console.log(doc)
            return res.json({code: 0, data:doc})
        })
})

//获取与前端传过来的partid相同的的charpter信息
Router.post('/listone',function (req, res) {
    const {id} = req.body
    Charpter.find({'partid': id},null,{sort: {'charpterid': 1}},function (err, doc) {
        return res.json({code: 0, data:doc})
    })
})

Router.post('/remove', function (req, res) {
    const {_id,charpterid} = req.body
    console.log(req.body);
    Detail.findOne({'charpterid': charpterid},function (err,doc) {
        if(doc){
            return res.json({msg: '该CharpterID下还有Detail内容，不能删除！'})
        }else{
            Charpter.findByIdAndRemove(_id, function (err, doc) {
                return res.json({code:0,success:'删除charpter成功'})
            })
        }
    })
})

Router.post('/updatelikenum', function (req, res) {
    // console.log(req.body)
    const body = req.body
    const {charpterid} = req.body
    console.log('更新chapter点赞数')
    console.log(body)
    Charpter.findOneAndUpdate({'charpterid': charpterid}, body, function (err, doc) {
        return res.json({code:0, data: body})
    })
})

Router.post('/update', function (req, res) {
    // console.log(req.body)
    const body = req.body
    const {_id,partid} = req.body
    Part.findOne({'partid': partid},function (err, doc) {
        if(doc){
            Charpter.findByIdAndUpdate(_id, body, function (err, doc) {
                return res.json({code:0, data: body, success:'更新charpter成功'})
            })
        }else{
            return res.json({msg: '更新charpter失败，PartID不存在'})
        }
    })
})

Router.post('/create', function (req, res) {
    // console.log("charpter创建")
    // console.log(req.body)
    const { charpterid, partid, name, created, likenum, collectnum,commentnum } = req.body;
    Part.findOne({'partid': partid},function (err,doc) {
        // console.log(charpterid)
        // console.log(doc)
        // console.log(doc.name)
        if(doc){
            const partID = doc._id;
            Charpter.findOne({charpterid},function (err, doc) {
                if(doc) {
                    return res.json({msg: '创建charpter失败，CharpterID已经存在，请换一个'})
                }
                Charpter.create({charpterid, partid, name, created, likenum, collectnum,commentnum,partID },function (e, d) {
                    console.log(d)
                    if(e) {
                        return res.json({msg: '后端出错'})
                    }
                    return res.json({code:0,success:'创建charpter成功'})
                })
            })
        }else{
            return res.json({msg: '创建charpter失败，PartID不存在'})
        }
    })
})

module.exports = Router