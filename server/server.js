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
const CharpterRouter = require('./charpter');
const DetailRouter = require('./detail');
const ContentRouter = require('./content');
// const TagRouter = require('./tag');
const LikeRecordRouter = require('./likerecord');
const app = express();

// app.use(express.static(path.join(__dirname, "../static")))
app.use(bodyParser.json())
app.use('/user',userRouter)
// app.use('/tag', TagRouter)
app.use('/part', PartRouter)
app.use('/charpter', CharpterRouter)
app.use('/detail', DetailRouter)
app.use('/content', ContentRouter)
app.use('/likerecord', LikeRecordRouter)
app.listen(3001, () => {
    console.log('node服务器监听3001端口成功');
})