const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollectRecordSchema = new Schema({
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
    collect:{ type: String ,required: true},
    created:{ type: Date },
});


module.exports = mongoose.model('CollectRecord', CollectRecordSchema);