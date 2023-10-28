const UserCpanelService = require("../service/UserCpanelService");
const jwt = require("jsonwebtoken");
const requestIp = require("request-ip");

const secretKey = "cPanelSecretKeyGame";

const createAdminUser = async (req, res, next) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, notification: "Email không được để trống" });
    }
    const exists = await UserCpanelService.isEmailExists(email);
    if (exists) {
      return res
        .status(400)
        .json({ success: false, notification: "Email đã tồn tại" });
    }
    await UserCpanelService.createAdminUser({ email });
    return res
      .status(200)
      .json({ success: true, notification: "Tạo tài khoản thành công" });
  } catch (error) {}
};
const loginCpanel = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({
          success: false,
          notification: "Tài khoản hoặc mật khẩu không được để trống",
        });
    }
    const user = await UserCpanelService.loginCpanelService({
      username,
      password,
    });
    if (!user) {
      return res
        .status(400)
        .json({
          success: false,
          notification: "Tài khoản hoặc mật khẩu không đúng",
        });
    }
    if (user.role == 0) {
      return res
        .status(400)
        .json({ success: false, notification: "Bạn không có quyền truy cập" });
    }
    const clientIp = requestIp.getClientIp(req);
    const token = await generateJWT(user);
    return res
      .status(200)
      .json({
        success: true,
        notification: "Đăng nhập thành công",
        data: user,
        token: token,
        clientIp: clientIp,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, notification: "lỗi server" });
  }
};

const generateJWT = async (user) => {
  const payload = {
    user: user.username,
    role: user.role,
  };
  console.log(payload);

  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

  return token;
};
const resetPassword = async (req, res, next) => {
  try {
    const { email } = req.query;
    const user = await UserCpanelService.isEmailExists(email);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, notification: "Email không tồn tại" });
    }
    const username = user.username;
    const resetPass = await UserCpanelService.resetPassword(email, username);

    return res
      .status(200)
      .json({
        success: true,
        notification: "Mật khẩu đã được gửi lại vào email",
        data: resetPass,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, notification: "lỗi server" });
  }
};
const changePasswordController = async (req, res, next) => {
  try {
    const { username, password, newPassword } = req.body;
    console.log(username, password, newPassword);
    const user = await UserCpanelService.changePassword(
      username,
      password,
      newPassword
    );
    if (!newPassword || !password) {
      return res
        .status(400)
        .json({ success: false, notification: "Không được để trống" });
    }
    if (password === newPassword) {
      return res
        .status(400)
        .json({
          success: false,
          notification: "Mật khẩu mới không được trùng với mật khẩu cũ",
        });
    }
    if (newPassword.length < 8) {
      return res
        .status(400)
        .json({
          success: false,
          notification: "Mật khẩu mới phải ít nhất 8 ký tự",
        });
    }
    if (!user) {
      return res
        .status(400)
        .json({ success: false, notification: "Mật khẩu cũ không đúng" });
    }
    return res
      .status(200)
      .json({ success: true, notification: "Đổi mật khẩu thành công" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ success: false, notification: "lỗi server" });
  }
};
const banUserController = async (req, res) => {
  try {
    const { email, role } = req.query;
    const user = await UserCpanelService.banUserService(email, role);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, notification: "Email không tồn tại" });
    }
    if (role === 1) {
      return res
        .status(400)
        .json({
          success: false,
          notification: "Admin chỉ tồn tại 1 tài khoản",
        });
    }
    return res
      .status(200)
      .json({ success: true, notification: "Thay đổi quyền thành công" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, notification: "lỗi server" });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await UserCpanelService.getAllUsers();
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, notification: "lỗi server" });
  }
};

module.exports = {
  createAdminUser,
  loginCpanel,
  resetPassword,
  changePasswordController,
  banUserController,
  getAllUsers,
};
