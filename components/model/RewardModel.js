const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const schema = new Schema({
    id: { type: ObjectId },
    id_Player: { type: String },
    namePlayer: { type: String },
    playingTime: { type: String },
    gameMode: { type: Number },
    dotcoin: { type: Number },
    Date: { type: Date },
});
module.exports = mongoose.models.rewards || mongoose.model('rewards', schema);