const express = require('express');
const utils = require('utility');
const Router = express.Router();
// const path = require('path');
// const multer = require('multer');
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.resolve('../src/data/user'));
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// })
// const upload = multer({storage: storage});

// const mongoose = require('mongoose');
// const User = mongoose.model('User');
const User = require('./models/users');

// Router.post('/updateavtar', upload.single('avatar'), (req, res, next)=> {
//     res.send({
//         err: null,
//         filePath: 'user/' + path.basename(req.file.path)
//     })
// })

Router.get('/list',function (req, res) {
    // User.remove({},function (err,doc) {})
    User.find({},function (err,doc) {
        return res.json({code: 0, data:doc,msg: 'true'})
    })
})

Router.post('/remove', function (req, res) {
    const {_id} = req.body
    console.log(req.body);
    User.findByIdAndRemove(_id,function (err, doc) {
        return res.json({code:0,success:'删除user成功'})
    })
})

Router.post('/update', function (req, res) {
    // console.log(req.body)
    const body = req.body
    const {id} = req.body
    User.findByIdAndUpdate(id,body,function (err, doc) {
        return res.json({code:0, data: body, success:'更新user成功'})
    })
})

Router.post('/login', function (req, res) {
    const { username, password } = req.body;
    User.findOne({username,password:md5Pwd(password)},{'password':0},function (err, doc) {
        if(!doc) {
            return res.json({msg:'用户名或密码错误'})
        }
        return res.json({code: 0,data: doc, success:'登录成功'})
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
            return res.json({code:0,success:'用户注册成功'})
        })
    })
})

//在用户的密码后面加上复杂的字符串并进行加密
function md5Pwd(pwd) {
    const salt = 'ZhengjiangDxCsxy_31501315_@?AFAFA%!&*%@';
    return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router