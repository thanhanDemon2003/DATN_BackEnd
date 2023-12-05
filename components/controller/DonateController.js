const donateService = require("../service/DonateService");

const UpDonate = async (req, res, next) => {
  try {
    const { name, amount, method, Date } = req.body;
    if (!name || !amount || !method || !Date) {
      return res
        .status(400)
        .json({ succsess: false, notification: "Thiếu dữ liệu", data: null });
    }
    const data = await donateService.UpDonate(name, amount, method, Date);
    return res
      .status(200)
      .json({ succsess: true, notification: "Thành công", data: data });
  } catch (err) {
    return res
      .status(500)
      .json({ succsess: false, notification: "Lỗi server", data: err });
  }
};
const GetAllDonate = async (req, res, next) => {
  try {
    const data = await donateService.GetAllDonate();
    return res
      .status(200)
      .json({ succsess: true, notification: "Thành công", data: data });
  } catch (err) {
    return res
      .status(500)
      .json({ succsess: false, notification: "Lỗi server", data: err });
  }
};
const updateDonate = async (req, res, next) => {
  try {
    const { name, amount, method } = req.body;
    const { id } = req.params;
    if (!id || !name || !amount || !method) {
      return res
        .status(400)
        .json({ succsess: false, notification: "Thiếu dữ liệu", data: null });
    }
    console.log(id, name, amount, method);
    const data = await donateService.updateDonate(id, name, amount, method);
    return res
      .status(200)
      .json({ succsess: true, notification: "Thành công", data: data });
  } catch (err) {
    return res
      .status(500)
      .json({ succsess: false, notification: "Lỗi server", data: err });
  }
};
const deleteDonate = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res
        .status(400)
        .json({ succsess: false, notification: "Thiếu dữ liệu", data: null });
    }
    const data = await donateService.deleteDonate(id);
    return res
      .status(200)
      .json({ succsess: true, notification: "Thành công", data: data });
  } catch (err) {
    return res
      .status(500)
      .json({ succsess: false, notification: "Lỗi server", data: err });
  }
};
const tongDonateController = async (req, res, next) => {
  try {
    const data = await donateService.tongDonate();
    return res
      .status(200)
      .json({ succsess: true, notification: "Thành công", data: data });
  } catch (err) {
    return res
      .status(500)
      .json({ succsess: false, notification: "Lỗi server", data: err });
  }
}

module.exports = {
  UpDonate,
  GetAllDonate,
  deleteDonate,
  updateDonate,
  tongDonateController
};
