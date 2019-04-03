const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharpterSchema = new Schema({
    charpterid:{ type: Number, required: true },
    partid:{ type: Number, required: true },
    name:{ type: String, required: true },
    likenum:{ type:Number, required: true },
    collectnum:{ type: Number, required: true },
    created:{ type: Date },
});


module.exports = mongoose.model('Charpter', CharpterSchema);