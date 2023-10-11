const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const schema = new Schema({
    id: { type: ObjectId },
    name: { type: String },
    fb_id: {
        type: String,
        require: true,
        unique: true
    },
    positionX: { type: String, default: "0" },
    positionY: { type: String, default: "0" },
    positionZ: { type: String, default: "0" },
    wardrobe: [{ 
        gunskinId: { type: String }, 
        nameSkin: { type: String }
    }],
    balance: { type: String, default: "0" },
    status: { type: Number, default: 0 }
});
module.exports = mongoose.models.players || mongoose.model('players', schema);
