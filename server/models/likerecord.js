const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeRecordSchema = new Schema({
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
    like:{ type: String ,required: true},
    created:{ type: Date },
});


module.exports = mongoose.model('LikeRecord', LikeRecordSchema);