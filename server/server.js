const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const path = require('path');
mongoose.connect('mongodb://localhost/english', { useFindAndModify: false , useNewUrlParser:true},function (err) {
    if (err) {
        console.log('数据库连接失败');
    } else {
        console.log('数据库连接成功');
    }
});

const userRouter = require('./user');
const PartRouter = require('./part');
const app = express();

// app.use(express.static(path.join(__dirname, "../static")))
app.use(bodyParser.json())
app.use('/user',userRouter)
app.use('/part', PartRouter)
app.listen(3001, () => {
    console.log('node服务器监听3001端口成功');
})