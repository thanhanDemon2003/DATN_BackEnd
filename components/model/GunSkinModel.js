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
    category: { type: String },
    price: { type: String},
    percent : { type: Number, default: 0},
    status  : { type: Number, default: 1}
});
module.exports = mongoose.models.gunskins || mongoose.model('gunskins', schema);
