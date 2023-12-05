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
const ThongKePaymentController = async (req, res) => {
  try {
    let year = req.query.year;
    console.log(year);
    if (year == null|| year =="" || year == undefined|| isNaN(year)) {
      console.log("vào if");
      year = new Date().getFullYear();
    }
    const thongKe = await paymentService.ThongKePayment(year);
    return res
      .status(200)
      .json({ succses: true, notification: "Thành công", thongKe: thongKe });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ succses: false, notification: "Lỗi" });
  }
};
const Top10UseMonthController = async (req, res) => {
  try {
    const top10 = await paymentService.Top10UseMonth();
    return res
      .status(200)
      .json({ succses: true, notification: "Thành công", top10: top10 });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ succses: false, notification: "Lỗi" });
  }
};
module.exports = {
  GetAllPaymentsController,
  GetPaymentPlayercontroller,
  ThongKePaymentController,
  Top10UseMonthController,
};
