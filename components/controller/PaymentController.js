const paymentService = require("../service/PaymentService.js");

const GetAllPaymentsController = async (req, res, next) => {
  try {
    const payment = await paymentService.GetAllPayments();
    return res
      .status(200)
      .json({ succses: true, notification: "Thành công", payment: payment });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ succses: false, notification: "lỗi " });
  }
};

const GetPaymentPlayercontroller = async (req, res, next) => {
  try {
    const idPlayer = req.query.idPlayer;
    const payment = await paymentService.GetPaymentPlayer(idPlayer);
    return res
      .status(200)
      .json({ succses: true, notification: "Thành công  ", payment: payment });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ succses: false, notification: "Lỗi" });
  }
};
module.exports = {
  GetAllPaymentsController,
  GetPaymentPlayercontroller,
};
