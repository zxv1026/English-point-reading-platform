const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DetailSchema = new Schema({
    detailid:{ type: Number, required: true },
    charpterid:{ type: Number, required: true },
    name:{ type: String, required: true },
    mp3:{ type: String, required: true },
    num:{ type: Number, required: true },
    collectnum:{ type: Number, required: true },
    commentnum:{ type: Number,required: true },
    charpterID: {
        type: Schema.Types.ObjectId,
        ref: 'Charpter',
        required: true
    },
    created:{ type: Date },
});


module.exports = mongoose.model('Detail', DetailSchema);