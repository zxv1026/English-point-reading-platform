const express = require('express');
const Router = express.Router();
const Part = require('./models/part');
const Charpter = require('./models/charpter');

//根据检索的内容查询
Router.post('/findlist',function(req,res) {
    const {name,partid} = req.body
    //通过使用RegExp，来构建正则表达式对象，来模糊查询
    const reg = new RegExp(name,'i')//
    if(partid){
        Part.find({$or:[{'name': {$regex: reg}}]})
            .where('partid').in([partid])
            .sort({'_id': -1})
            .exec(function (err,doc) {
                console.log(doc)
                if(err){
                    return res.json({msg: '后端出错'})
                }
                return res.json({code: 0,data:doc})
            })
    }else{
        Part.find({$or:[{'name': {$regex: reg}}]})
            .sort({'_id': -1})
            .exec(function (err,doc) {
                console.log(doc)
                if(err){
                    return res.json({msg: '后端出错'})
                }
                return res.json({code: 0,data:doc})
            })
    }
})

//根据输入的内容查询
Router.post('/find',function(req,res) {
    const {find} = req.body
    //通过使用RegExp，来构建正则表达式对象，来模糊查询
    const reg = new RegExp(find,'i')//
    console.log(find)
    Part.find({$or:[{name: {$regex: reg}}]})
        .sort({'_id': -1})
        .exec(function (err,doc) {
            console.log(doc)
            if(err){
                return res.json({msg: '后端出错'})
            }
            return res.json({code: 0,data:doc})
        })
})
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
    Part.find({})
        .sort({'partid': 1})
        .lean()
        .exec(function (err,doc) {
            Charpter.find({})
                .exec(function (err,d) {
                    let data = [];
                    for(let i in doc){
                        let charpterlistone = [];
                        let x=0;
                        data.push(doc[i])
                        for(let j in d){
                            if(d[j].partid===doc[i].partid){
                                charpterlistone[x] = d[j].name;
                                x++;
                            }
                        }
                        data[i].charpter = charpterlistone;
                    }
                    return res.json({code: 0,data:data})
                })
        })
})

Router.post('/one',function (req, res) {
    const {id} = req.body
    Part.findOne({'partid': id})
        .exec(function (err,doc) {
            // console.log(doc)
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
    const { partid, name, created,likenum,collectnum,commentnum } = req.body;
    Part.findOne({partid},function (err, doc) {
        if(doc) {
            return res.json({msg: 'PartID已经存在，请换一个'})
        }
        Part.create({partid, name, created,likenum,collectnum,commentnum },function (e, d) {
            if(e) {
                return res.json({msg: '后端出错'})
            }
            return res.json({code:0,success:'创建part成功'})
        })
    })
})

module.exports = Router