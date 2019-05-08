const express = require('express');
const Router = express.Router();
const Charpter = require('./models/charpter');
const Detail = require('./models/detail');
const Content = require('./models/content');
const Part = require('./models/part');

//根据检索的内容查询
Router.post('/findlist',function(req,res) {
    const {name,partname,charptername,mp3} = req.body
    //通过使用RegExp，来构建正则表达式对象，来模糊查询
    const reg = new RegExp(name,'i')//
    const part = new RegExp(partname,'i')
    const charpter = new RegExp(charptername,'i')
    if(mp3){
        Detail.find({$or:[{'name': {$regex: reg}}]})
            .where('mp3').in([mp3])
            .populate({
                path:'charpterID',
                populate: { path: 'partID' }
            })
            .sort({'_id': -1})
            .exec(function (err,doc) {
                Charpter.find({$or:[{'name': {$regex: charpter}}]})
                    .populate({
                        path: 'partID',
                    })
                    .sort({'_id': -1})
                    .exec(function (err,c) {
                        Part.find({$or:[{'name': {$regex: part}}]})
                            .sort({'_id': -1})
                            .exec(function (err,d) {
                                let data = []
                                for(let x in doc){
                                    for(let i in c){
                                        if(doc[x].charpterID.name===c[i].name){
                                            for(let j in d){
                                                if(c[i].partID.name===d[j].name){
                                                    data.push(doc[x])
                                                    break;
                                                }
                                            }
                                            break;
                                        }
                                    }
                                }
                                return res.json({code: 0,data:data})
                            })
                    })
            })
    }else{
        Detail.find({$or:[{'name': {$regex: reg}}]})
            .populate({
                path:'charpterID',
                populate: { path: 'partID' }
            })
            .sort({'_id': -1})
            .exec(function (err,doc) {
                Charpter.find({$or:[{'name': {$regex: charpter}}]})
                    .populate({
                        path: 'partID',
                    })
                    .sort({'_id': -1})
                    .exec(function (err,c) {
                        Part.find({$or:[{'name': {$regex: part}}]})
                            .sort({'_id': -1})
                            .exec(function (err,d) {
                                let data = []
                                for(let x in doc){
                                    for(let i in c){
                                        for(let j in d){
                                            if(doc[x].charpterID.name===c[i].name&&c[i].partID.name===d[j].name){
                                                data.push(doc[x])
                                            }
                                        }
                                    }
                                }
                                return res.json({code: 0,data:data})
                            })
                    })
            })
    }
})
//根据输入的内容查询
Router.post('/find',function(req,res) {
    const {find} = req.body
    //通过使用RegExp，来构建正则表达式对象，来模糊查询
    const reg = new RegExp(find,'i')//
    console.log(find)
    Detail.find({$or:[{name: {$regex: reg}}]})
        .populate({
            path:'charpterID',
            populate: { path: 'partID' }
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

//取最新加进去的前4个
Router.get('/findlist',function (req,res) {
    Detail.find({})
        .populate({
            path:'charpterID',
            populate: { path: 'partID' }
        })
        .sort({'_id': -1})
        .limit(4)
        .exec(function (err,doc) {
            // console.log(doc)
            return res.json({code: 0, data:doc})
        })
})
//取点赞数最多的10个
Router.get('/findlikenumlist',function (req,res) {
    Detail.find({})
        .populate({
            path:'charpterID',
            populate: { path: 'partID' }
        })
        .sort({'num': -1})
        .limit(10)
        .exec(function (err,doc) {
            // console.log(doc)
            return res.json({code: 0, data:doc})
        })
})
//取收藏数最多的10个
Router.get('/findcollectnumlist',function (req,res) {
    Detail.find({})
        .populate({
            path:'charpterID',
            populate: { path: 'partID' }
        })
        .sort({'collectnum': -1})
        .limit(10)
        .exec(function (err,doc) {
            // console.log(doc)
            return res.json({code: 0, data:doc})
        })
})

Router.get('/list',function (req, res) {
    // DetailPart.remove({},function (err,doc) {})
    Detail.find({})
        .populate({
            path:'charpterID',
            populate: { path: 'partID' }
        })
        .sort({'_id': -1})
        .exec(function (err, doc) {
            return res.json({code: 0, data:doc})
        })
})
//获取与前端传过来的charpterid相同的的detail信息
Router.post('/listone',function (req, res) {
    console.log('detail listone')
    const {id} = req.body
    Detail.find({'charpterid': id})
        .sort({'detailid': 1})
        .lean()
        .exec(function (err,doc) {
            Content.find({})
                .exec(function (err,d) {
                    let data = [];
                    for(let i in doc){
                        let contentlistone = [];
                        let x=0;
                        data.push(doc[i])
                        for(let j in d){
                            if(d[j].detailid===doc[i].detailid){
                                let substance = {}
                                substance.chinese = d[j].chinese;
                                substance.english = d[j].english;
                                contentlistone[x] = substance ;
                                x++;
                            }
                        }
                        data[i].content = contentlistone;
                    }
                    return res.json({code: 0,data:data})
                })
        })
})

Router.post('/one',function (req, res) {
    const {id} = req.body
    Detail.findOne({'detailid': id})
        .lean()
        .populate({
            path:'charpterID',
            populate: { path: 'partID' }
        })
        .exec(function (err,doc) {
            Detail.find({'charpterid': doc.charpterid})
                .sort({'detailid': 1})
                .exec(function (e,d) {
                    let data = doc;
                    data.alldetaillist = d
                    return res.json({code: 0,data:data})
                })
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

Router.post('/updatemp3', function (req, res) {
    // console.log(req.body)
    const body = req.body
    const {_id} = req.body
    Detail.findByIdAndUpdate(_id, body, function (err, doc) {
        return res.json({code:0, data: body,success:'更新音频成功'})
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
    const { detailid, charpterid, name, mp3, created,num,collectnum,commentnum } = req.body;
    Charpter.findOne({'charpterid': charpterid},function (err, doc) {
        if(doc){
            const charpterID = doc._id;
            Detail.findOne({detailid},function (err, doc) {
                if(doc) {
                    return res.json({msg: '创建Detail失败，DetailID已经存在，请换一个'})
                }
                Detail.create({detailid, charpterid, name, mp3, created,num,collectnum,commentnum,charpterID },function (e, d) {
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