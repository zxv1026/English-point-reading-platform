const express = require('express');
const Router = express.Router();
const Charpter = require('./models/charpter');
const Detail = require('./models/detail');
const Content = require('./models/content');

Router.get('/list',function (req, res) {
    // DetailPart.remove({},function (err,doc) {})
    Detail.find({}, function (err, doc) {
        return res.json({code: 0, data:doc})
    })
})
//获取与前端传过来的charpterid相同的的detail信息
Router.post('/listone',function (req, res) {
    console.log('detail listone')
    const {id} = req.body
    Detail.find({'charpterid': id}, null,{sort: {'detailid': 1}},function (err, doc) {
        return res.json({code: 0, data:doc})
    })
})

Router.post('/one',function (req, res) {
    const {id} = req.body
    Detail.findOne({'detailid': id})
        .populate({
            path:'charpterID',
            populate: { path: 'partID' }
        })
        .exec(function (err,doc) {
            console.log(doc)
            return res.json({code: 0, data:doc})
        })
})

Router.post('/remove', function (req, res) {
    const {_id,detailid} = req.body
    console.log(req.body);
    Content.findOne({'detailid': detailid}, function (err,doc) {
        if(doc){
            return res.json({msg: '该DetailID下还有Content内容，不能删除！'})
        }else{
            Detail.findByIdAndRemove(_id, function (err, doc) {
                return res.json({code:0,success:'删除detail成功'})
            })
        }
    })
})

Router.post('/updatenum', function (req, res) {
    // console.log(req.body)
    const body = req.body
    const {_id} = req.body
    Detail.findByIdAndUpdate(_id, body, function (err, doc) {
        return res.json({code:0, data: body})
    })
})

Router.post('/update', function (req, res) {
    // console.log(req.body)
    const body = req.body
    const {_id,charpterid} = req.body
    Charpter.findOne({'charpterid': charpterid},function (err,doc) {
        if(doc){
            Detail.findByIdAndUpdate(_id, body, function (err, doc) {
                return res.json({code:0, data: body,success:'创建Detail成功'})
            })
        }else{
            return res.json({msg: '更新Detail失败，CharpterID不存在'})
        }
    })
})

Router.post('/create', function (req, res) {
    console.log(req.body)
    const { detailid, charpterid, name, mp3, created,num,collectnum } = req.body;
    Charpter.findOne({'charpterid': charpterid},function (err, doc) {
        if(doc){
            const charpterID = doc._id;
            Detail.findOne({detailid},function (err, doc) {
                if(doc) {
                    return res.json({msg: '创建Detail失败，DetailID已经存在，请换一个'})
                }
                Detail.create({detailid, charpterid, name, mp3, created,num,collectnum,charpterID },function (e, d) {
                    if(e) {
                        return res.json({msg: '后端出错'})
                    }
                    return res.json({code:0,success:'创建Detail成功'})
                })
            })
        }else{
            return res.json({msg: '创建Detail失败，CharpterID不存在'})
        }
    })
})

module.exports = Router