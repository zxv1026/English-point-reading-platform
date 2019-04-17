const express = require('express');
const Router = express.Router();
const Detail = require('./models/detail');
const Content = require('./models/content');
const Charpter = require('./models/charpter');
const Part = require('./models/part');

//根据检索的内容查询
Router.post('/findlist',function(req,res) {
    const {name,partname,charptername,mp3,chinese,english} = req.body
    //通过使用RegExp，来构建正则表达式对象，来模糊查询
    const reg = new RegExp(name,'i')//
    const part = new RegExp(partname,'i')
    const charpter = new RegExp(charptername,'i')
    const ch = new RegExp(chinese,'i')
    const en = new RegExp(english,'i')
    if(mp3 && chinese && english){
        Content.find({$and:[{'chinese': {$regex: ch}},{'english': {$regex: en}}]})
            .populate({
                path: 'detailID',
                populate:({
                    path:'charpterID',
                    populate: { path: 'partID' }
                })
            })
            .exec(function (err,content) {
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
                                        for(let y in content){
                                            for(let x in doc){
                                                for(let i in c){
                                                    for(let j in d){
                                                        if(content[y].detailID.name===doc[x].name&&doc[x].charpterID.name===c[i].name&&c[i].partID.name===d[j].name){
                                                            data.push(content[y])
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        return res.json({code: 0,data:data})
                                    })
                            })
                    })
            })
    }else if(!mp3 && chinese && english){
        Content.find({$and:[{'chinese': {$regex: ch}},{'english': {$regex: en}}]})
            .populate({
                path: 'detailID',
                populate:({
                    path:'charpterID',
                    populate: { path: 'partID' }
                })
            })
            .exec(function (err,content) {
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
                                        for(let y in content){
                                            for(let x in doc){
                                                for(let i in c){
                                                    for(let j in d){
                                                        if(content[y].detailID.name===doc[x].name&&doc[x].charpterID.name===c[i].name&&c[i].partID.name===d[j].name){
                                                            data.push(content[y])
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        return res.json({code: 0,data:data})
                                    })
                            })
                    })
            })
    }else if(mp3 && !chinese && english) {
        Content.find({$and:[{'english': {$regex: en}}]})
            .populate({
                path: 'detailID',
                populate:({
                    path:'charpterID',
                    populate: { path: 'partID' }
                })
            })
            .exec(function (err,content) {
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
                                        for(let y in content){
                                            for(let x in doc){
                                                for(let i in c){
                                                    for(let j in d){
                                                        if(content[y].detailID.name===doc[x].name&&doc[x].charpterID.name===c[i].name&&c[i].partID.name===d[j].name){
                                                            data.push(content[y])
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        return res.json({code: 0,data:data})
                                    })
                            })
                    })
            })
    }else if(mp3 && chinese && !english){
        Content.find({$and:[{'chinese': {$regex: ch}}]})
            .populate({
                path: 'detailID',
                populate:({
                    path:'charpterID',
                    populate: { path: 'partID' }
                })
            })
            .exec(function (err,content) {
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
                                        for(let y in content){
                                            for(let x in doc){
                                                for(let i in c){
                                                    for(let j in d){
                                                        if(content[y].detailID.name===doc[x].name&&doc[x].charpterID.name===c[i].name&&c[i].partID.name===d[j].name){
                                                            data.push(content[y])
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        return res.json({code: 0,data:data})
                                    })
                            })
                    })
            })
    }else if(!mp3 && !chinese && english){
        Content.find({$and:[{'english': {$regex: en}}]})
            .populate({
                path: 'detailID',
                populate:({
                    path:'charpterID',
                    populate: { path: 'partID' }
                })
            })
            .exec(function (err,content) {
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
                                        for(let y in content){
                                            for(let x in doc){
                                                for(let i in c){
                                                    for(let j in d){
                                                        if(content[y].detailID.name===doc[x].name&&doc[x].charpterID.name===c[i].name&&c[i].partID.name===d[j].name){
                                                            data.push(content[y])
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        return res.json({code: 0,data:data})
                                    })
                            })
                    })
            })
    }else if(!mp3 && chinese && !english){
        Content.find({$and:[{'chinese': {$regex: ch}}]})
            .populate({
                path: 'detailID',
                populate:({
                    path:'charpterID',
                    populate: { path: 'partID' }
                })
            })
            .exec(function (err,content) {
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
                                        for(let y in content){
                                            for(let x in doc){
                                                for(let i in c){
                                                    for(let j in d){
                                                        if(content[y].detailID.name===doc[x].name&&doc[x].charpterID.name===c[i].name&&c[i].partID.name===d[j].name){
                                                            data.push(content[y])
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        return res.json({code: 0,data:data})
                                    })
                            })
                    })
            })
    }else if(mp3 && !chinese && !english){
        Content.find({})
            .populate({
                path: 'detailID',
                populate:({
                    path:'charpterID',
                    populate: { path: 'partID' }
                })
            })
            .exec(function (err,content) {
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
                                        for(let y in content){
                                            for(let x in doc){
                                                for(let i in c){
                                                    for(let j in d){
                                                        if(content[y].detailID.name===doc[x].name&&doc[x].charpterID.name===c[i].name&&c[i].partID.name===d[j].name){
                                                            data.push(content[y])
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        return res.json({code: 0,data:data})
                                    })
                            })
                    })
            })
    }else if(!mp3 && !chinese && !english){
        Content.find({})
            .populate({
                path: 'detailID',
                populate:({
                    path:'charpterID',
                    populate: { path: 'partID' }
                })
            })
            .exec(function (err,content) {
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
                                        for(let y in content){
                                            for(let x in doc){
                                                for(let i in c){
                                                    for(let j in d){
                                                        if(content[y].detailID.name===doc[x].name&&doc[x].charpterID.name===c[i].name&&c[i].partID.name===d[j].name){
                                                            data.push(content[y])
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        return res.json({code: 0,data:data})
                                    })
                            })
                    })
            })
    }
})

Router.get('/list',function (req, res) {
    // Content.remove({},function (err,doc) {})
    Content.find({})
        .populate({
            path: 'detailID',
            populate:({
                path:'charpterID',
                populate: { path: 'partID' }
            })
        })
        .exec(function (err,doc) {
            // console.log(doc)
            return res.json({code: 0, data:doc})
        })
})
//获取与前端传过来的detailid相同的的content信息
Router.post('/listone',function (req, res) {
    const {id} = req.body
    Content.find({'detailid': id}, null,{sort: {'contentid': 1}},function (err, doc) {
        return res.json({code: 0, data:doc})
    })
})

Router.post('/remove', function (req, res) {
    const {_id} = req.body
    console.log(req.body);
    Content.findByIdAndRemove(_id, function (err, doc) {
        return res.json({code:0,success:'删除content成功'})
    })
})

Router.post('/update', function (req, res) {
    // console.log(req.body)
    const body = req.body
    const {_id,detailid} = req.body
    Detail.findOne({'detailid': detailid}, function (err, doc) {
        if(doc){
            body.detailID = doc._id;
            Content.findByIdAndUpdate(_id, body, function (err, doc) {
                console.log(body)
                return res.json({code:0, data: body,success:'更新content成功'})
            })
        }else{
            return res.json({msg: '更新content失败，DetailID不存在'})
        }
    })
})

Router.post('/create', function (req, res) {
    console.log(req.body)
    const { contentid, detailid, chinese, english, offset, duration, created,promptType,prompt} = req.body;
    Detail.findOne({'detailid': detailid},function (err,doc) {
        if(doc){
            const detailID = doc._id;
            console.log(detailID)
            Content.findOne({contentid},function (err, doc) {
                if(doc) {
                    return res.json({msg: '创建content失败，ContentID已经存在，请换一个'})
                }
                Content.create({contentid, detailid,chinese, english,offset, duration, created,detailID,promptType,prompt},function (e, d) {
                    if(e) {
                        return res.json({msg: '后端出错'})
                    }
                    return res.json({code:0,success:'创建content成功'})
                })
            })
        }else{
            return res.json({msg: '创建content失败，DetailID不存在'})
        }
    })
})

module.exports = Router