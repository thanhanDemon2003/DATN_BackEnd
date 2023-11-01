const PlayerService = require("../service/PlayerService");


const LoginFacebookController = async (req, res, next) => {
  try {
    const tokenFB = req.body.token;
    const name = req.body.name
    if(!tokenFB){
      return res.status(400).json({ error: 1, notification: "ID fb trống" });
    }
    const login = await PlayerService.LoginFacebookService(tokenFB,name);
    if (!login) {
      return res
        .status(400)
        .json({ error: 0, notification: "Thiếu trường dữ liệu", id_fb:tokenFB, name: name});
    }
    if (!tokenFB) {
      return res.status(400).json({ error: 1, notification: "Không có token" });
    }
    if (login.status == 1) {
      return res
        .status(400)
        .json({ error: 0, notification: "Tài khoản này đã bị khóa" });
    }
    return res
      .status(200)
      .json({ success: 2, notification: "Đăng nhập thành công", data: login });
  } catch (error) {
    res.status(500).json({ error: 2, notification: "Lỗi server" });
  }
};



const LoginPayToFacebook = async (req, res, next) => {
  try {
    const tokenFB = req.query.token;
    if(!tokenFB){
      return res.status(400).json({ error: 1, notification: "ID fb trống" });
    }
    const login = await PlayerService.LoginFacebookPayment(tokenFB);
    if (!login) {
      return res
        .status(400)
        .json({ success: false, notification: "Bạn không có tài khoản, vui lòng tạo tài khoản trong game" });
    }
    if (login.status == 1) {
      return res
        .status(400)
        .json({ success: false, notification: "Tài khoản này đã bị khóa" });
    }
    return res
      .status(200)
      .json({ success: true, notification: "Đăng nhập thành công", data:{id:login._id, id_fb: login.fb_id, name: login.name } });
  } catch (error) {
    res.status(500).json({ error: 2, notification: "Lỗi server" });
  }
};
const SavePositionController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const positionX = req.query.x;
    const positionY = req.query.y;
    const positionZ = req.query.z;
    await PlayerService.SavePosition(id, positionX, positionY, positionZ);
    return res.status(200).json({
      success: true,
      notification: "Lưu vị trí thành công",
      id,
      position: { x: positionX, y: positionY, z: positionZ },
    });
  } catch (error) {
    res.status(500).json({ success: false, notification: "Lỗi " });
    console.log(error);
  }
};
const banPlayerController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const status = req.query.status;
    const player = await PlayerService.banPlayerService(id, status);
    if (!player) {
      return res
        .status(400)
        .json({ error: 1, notification: "Không tìm thấy người chơi", id: id });
    }
    if (status == 0) {
      return res
        .status(200)
        .json({
          success: 0,
          notification: "Player đã được mở khóa",
          data: player,
        });
    }
    return res
      .status(200)
      .json({ success: 1, notification: "Player đã bị khóa", data: player });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 0, notification: "Lỗi server" });
  }
};
const wardrobeController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const wardrobe = await PlayerService.wardrobe(id);
    if (!wardrobe) {
      return res
        .status(400)
        .json({ error: 1, notification: "Không tìm thấy người chơi", id: id });
    }
    return res
      .status(200)
      .json({ success: 1, notification: "Thành công", data: wardrobe });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 0, notification: "Lỗi server" });
  }
};
const getAllPlayers = async (req, res, next) => {
  try {
    const players = await PlayerService.getAllPlayers();
    return res
      .status(200)
      .json({ success: 1, notification: "Thành công", data: players });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 1, notification: "Lỗi server" });
  }
};
const getPlayerControllers = async (req, res, next) => {
  try {
    const id = req.params.id;
    const player = await PlayerService.getPlayer(id);
    if (!player) {
      return res
        .status(400)
        .json({ error: 1, notification: "Không tìm thấy người chơi", id: id });
    }
    return res
      .status(200)
      .json({ success: 1, notification: "Thành công", data: player });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 1, notification: "Lỗi server" });
  }
};
const updatePlayerControllers = async (req, res, next) => {
  try {
    const id = req.params.id;
    const positionX = req.query.x;
    const positionY = req.query.y;
    const positionZ = req.query.z;
    const balance = req.query.balance;
    const player = await PlayerService.updatePlayer(
      id,
      positionX,
      positionY,
      positionZ,
      balance
    );
    if (!player) {
      return res
        .status(400)
        .json({ error: 1, notification: "Không tìm thấy người chơi", id: id });
    }
    return res
      .status(200)
      .json({ success: 1, notification: "Thành công", data: player });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 1, notification: "Lỗi server" });
  }
};
module.exports = {
  LoginFacebookController,
  SavePositionController,
  banPlayerController,
  wardrobeController,
  getAllPlayers,
  getPlayerControllers,
  updatePlayerControllers,
  LoginPayToFacebook
};
