const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContentSchema = new Schema({
    id:{ type: Number, required: true },
    detailid:{ type: Number, required: true },
    chinese:{ type: String, required: true },
    english:{ type: String, required: true },
    offset:{ type: Number, required: true },
    duration:{ type: Number, required: true },
    created:{ type: Date },
});


module.exports = mongoose.model('Content', ContentSchema);