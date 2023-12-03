


const paymentModel = require("../model/PaymentModel.js");

const GetAllPayments = async () => {
    const allPayment = await paymentModel.find().sort({Date: -1});
    return allPayment;
};
const GetPaymentPlayer= async (idPlayer) => {
    const payment = await paymentModel.find({idPlayer: idPlayer});
    return payment;
}
module.exports = {
    GetAllPayments,
    GetPaymentPlayer
}

