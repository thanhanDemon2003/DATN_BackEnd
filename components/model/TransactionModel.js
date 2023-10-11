const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const schema = new Schema({
    id: { type: ObjectId},
    id_Player: { type: String },
    id_GunSkin: { type: String },
    nameSkin: { type: String },
    Date: { type: Date, default: Date.now },
    price: { type: String},
});

module.exports = mongoose.models.transactions || mongoose.model('transactions', schema);
