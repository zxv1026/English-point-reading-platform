const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true},
    password:{ type: String, required: true},
    type: { type: String, required: true},
    //头像
    avatar:{ type: String },
    created:{ type: Date },
});


module.exports = mongoose.model('User', UserSchema);