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

Router.post('/changepassword', function (req, res) {
    const {id} = req.body
    const pas = md5Pwd(req.body.oldpassword)
    const password = md5Pwd(req.body.password)
    User.findById(id,function (err, doc) {
        console.log(pas)
        console.log(password)
        console.log(doc.password)
        const body = {
            password: password
        }
        console.log(body)
        if(pas === doc.password){
            User.findByIdAndUpdate(id, body, function (err, doc) {
                console.log(body)
                return res.json({code:0, data: body, success:'修改密码成功'})
            })
        }else{
            return res.json({msg:'密码错误'})
        }
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
        res.cookie('userid', doc._id)
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
        const userModel = new User({username,type,password:md5Pwd(password),avatar, created})
        userModel.save(function (e,d) {
            if(e) {
                return res.json({msg: '后端出错'})
            }
            res.cookie('userid', d._id)
            return res.json({code:0,data:d,success:'用户注册成功'})
        })
    })
})

Router.get('/info',function(req, res){
    const {userid} = req.cookies
    //用户没有cookie
	if (!userid) {
		return res.json({code:1})
    }
    //有cookie，把数据库中的数据保持到redux的store中
	User.findOne({_id:userid}, function(err,doc){
		if (err) {
			return res.json({code:1, msg:'后端出错了'})
		}
		if (doc) {
			return res.json({code:0,data:doc})
		}
	})
	
})

Router.get('/logout',function (req, res) {
    res.cookie("userid", "", { expires: new Date(0)});
    return res.json({code:0, success:'退出成功'});
})

//在用户的密码后面加上复杂的字符串并进行加密
function md5Pwd(pwd) {
    const salt = 'ZhengjiangDxCsxy_31501315_@?AFAFA%!&*%@';
    return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router