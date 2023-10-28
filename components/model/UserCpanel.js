const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const schema = new Schema({
    id: { type: ObjectId },
    email: {
        type: String,
        require: true,
        unique: true
    },
    username: { type: String, unique: true },
    password: { type: String },
    role: { type: Number, default: 2 },
    date: { type: Date, default: Date.now() }
});
module.exports = mongoose.models.users || mongoose.model('users', schema);
