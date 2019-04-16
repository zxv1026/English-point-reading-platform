const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    detailID: {
        type: Schema.Types.ObjectId,
        ref: 'Detail',
        required: true
    },
    comment:{ type: String ,required: true},
    created:{ type: Date },
});


module.exports = mongoose.model('Comment', CommentSchema);