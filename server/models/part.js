const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PartSchema = new Schema({
    id:{ type: Number, required: true },
    name:{ type: String, required: true },
    created:{ type: Date },
});


module.exports = mongoose.model('Part', PartSchema);