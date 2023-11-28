const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const schema = new Schema({
  id: { type: ObjectId },
  transitionID: { type: String },
  buyerName: { type: String },
  amountPayment: { type: Number },
  orderCodePayment: { type: Number },
  methodPayment: { type: String },
  dotCoint: { type: Number },
  statusPayment: { type: String },
  idPlayer: { type: String },
  description: { type: String },
  Date: { type: Date, default: Date.now() },
});
module.exports = mongoose.models.payments || mongoose.model("payments", schema);
