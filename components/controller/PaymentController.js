const paymentService = require("../service/PaymentService.js");
const request = require("request");
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
    if (year == null || year == "" || year == undefined || isNaN(year)) {
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
const checkPaymentVietQr = async (req, res, next) => {
  const oderCode = req.params;
  request(
    {
      method: "GET",
      url: `https://api-merchant.payos.vn/v2/payment-requests/${oderCode}`,
      headers: {
        "Content-Type": "application/json",
        "x-client-id": "17ddc9c5-6e52-4668-a2a5-524fd1cadc53",
        "x-api-key": "e92bcdc7-0a36-4137-8e0f-b83cfed05d2f",
      },
    },
    function (error, response, body) {
      if (error) {
        return res.status(500).json({ succses: false, notification: "Lỗi" });
      } else {
        return res
          .status(200)
          .json({ succses: true, notification: "Thành công", data: body });
      }
    }
  );
};
module.exports = {
  GetAllPaymentsController,
  GetPaymentPlayercontroller,
  ThongKePaymentController,
  Top10UseMonthController,
  checkPaymentVietQr
};
