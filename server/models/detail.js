const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DetailSchema = new Schema({
    detailid:{ type: Number, required: true },
    charpterid:{ type: Number, required: true },
    name:{ type: String, required: true },
    created:{ type: Date },
});


module.exports = mongoose.model('Detail', DetailSchema);