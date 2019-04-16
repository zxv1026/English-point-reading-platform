const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContentSchema = new Schema({
    contentid:{ type: Number, required: true },
    detailid:{ type: Number, required: true },
    chinese:{ type: String, required: true },
    english:{ type: String, required: true },
    offset:{ type: Number, required: true },
    duration:{ type: Number, required: true },
    detailID: {
        type: Schema.Types.ObjectId,
        ref: 'Detail',
        required: true
    },
    created:{ type: Date },
    icon:{ type: String },
    promptType:{ type: String },
    prompt:{ type: String }
});


module.exports = mongoose.model('Content', ContentSchema);