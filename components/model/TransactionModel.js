const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const schema = new Schema({
    id: { type: ObjectId},
    id_Player: { type: String },
    namePlayer: { type: String },
    id_GunSkin: { type: String },
    nameSkin: { type: String },
    category: { type: String },
    price: { type: Number},
    Date: { type: Date, default: Date.now },
});

module.exports = mongoose.models.transactions || mongoose.model('transactions', schema);
