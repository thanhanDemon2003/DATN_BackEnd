const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const schema = new Schema({
    id: { type: ObjectId },
    name: { type: String },
    amount: { type: String },
    method: { type: String },
    Date: { type: String }
});
module.exports = mongoose.models.donates || mongoose.model('donates', schema);