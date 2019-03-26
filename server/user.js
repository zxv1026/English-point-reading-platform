const express = require('express');
const utils = require('utility');
const Router = express.Router();
// const mongoose = require('mongoose');
// const User = mongoose.model('User');
const User = require('./models/users');

Router.get('/list',function (req, res) {
    // User.remove({},function (err,doc) {})
    User.find({},function (err,doc) {
        return res.json({code: 0, data:doc})
    })
})

Router.post('/remove', function (req, res) {
    const {_id} = req.body
    console.log(req.body);
    User.findByIdAndRemove(_id,function (err, doc) {
        return res.json({code:1})
    })
})

Router.post('/update', function (req, res) {
    // console.log(req.body)
    const body = req.body
    const {id,username} = req.body
    User.findOne({username},function (err, doc) {
        if(doc) {
            console.log(doc)
            return res.json({msg: '用户名已经存在，请换一个'})
        }
        User.findByIdAndUpdate(id,body,function (err, doc) {
            return res.json({code:0, data: body})
        })
    })
})

Router.post('/login', function (req, res) {
    const { username, password } = req.body;
    User.findOne({username,password:md5Pwd(password)},{'password':0},function (err, doc) {
        if(!doc) {
            return res.json({msg:'用户名或密码错误'})
        }
        return res.json({code: 0,data: doc})
    })
})

Router.post('/register',function (req, res) {
    console.log(req.body)
    const { username, password, type, avatar, created } = req.body;
    User.findOne({username},function (err, doc) {
        if(doc) {
            return res.json({msg: '用户名已经存在，请换一个'})
        }
        User.create({username, password: md5Pwd(password), type, avatar, created },function (e, d) {
            if(e) {
                return res.json({msg: '后端出错'})
            }
            return res.json({code:0})
        })
    })
})

Router.get('/info', function (req, res) {
    return  res.json({code:1})
})
//在用户的密码后面加上复杂的字符串并进行加密
function md5Pwd(pwd) {
    const salt = 'ZhengjiangDxCsxy_31501315_@?AFAFA%!&*%@';
    return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router