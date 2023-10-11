const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const schema = new Schema({
    id: { type: ObjectId},
    name: { type: String },
    color: {
        type: String,
        require: true,
    },
    price: { type: String},
    percent : { type: Number, default: 0},
    status  : { type: Number, default: 0}
});
module.exports = mongoose.models.gunskins || mongoose.model('gunskins', schema);
