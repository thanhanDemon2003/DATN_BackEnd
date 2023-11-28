


const paymentModel = require("../model/PaymentModel.js");

const GetAllPayments = async () => {
    const allPayment = await paymentModel.find();
    return allPayment;
};
const GetPaymentPlayer= async (idPlayer) => {
    const payment = await paymentModel.findOne({idPlayer: idPlayer});
    return payment;
}
module.exports = {
    GetAllPayments,
    GetPaymentPlayer
}

