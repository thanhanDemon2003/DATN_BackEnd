const UserCpanel = require('../model/UserCpanel');

const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');


const isEmailExists = async (email) => {
  const user = await UserCpanel.findOne({ email });
  return user;
}

const generateRandomPassword = () => {
  return Math.random().toString(36).slice(-8);
}
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'iamdemon.dev@gmail.com',
    pass: 'naoxvujkcvkfyill',
  }
});
const sendPasswordToEmail = async (email, username, password) => {
  const templateEmail = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Thông Tin Đăng Nhập</title>
    <style>
      .container {
  max-width: 600px;
  margin: auto;
  border: 1px solid #ddd;
  padding: 20px;
}

h1 {
  text-align: center;
}

p {
  line-height: 1.5;
}

.logo {
  float: right;
  width: 100px;
  position: asolute;
}
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Chào mừng đến với</h1>
      <h1>Dot Studio!</h1>
      <p>
        Xin chào, <span style="color:red; font-weight: bold;">${email}</span> bạn đã được mời làm Biên Tập Viên của game Dark
        Disquite. Chúng tôi rất vui mừng khi mời bạn tham gia <span style="color: cadetblue; font-weight: bold;">Dot Studio </span> của
        chúng tôi.
      </p>

      <p>Đây là một số thông tin dành cho bạn:
        <ul>
          <li>
            Tên tài khoản: <span style="color: blue; font-weight: bold;">${username}</span>
          </li>
          <li>
            Mật khẩu: <span style="color: blue; font-weight: bold;">${password}</span>
          </li>
        </ul>
      </p>

      <p>
        Bạn có thể đăng nhập vào tài khoản bằng tài khoản mật khẩu chúng tôi đã cấp ở trên và 
        bạn có thể đổi mật khẩu khi vô trang admin
      </p>
      <p>
        Bạn có thể tham gia xem dữ liệu trang Admin của chúng tôi qua trang:
        <a href="https://darkdisquitegame.andemongame.tech/login">Trang Admin</a> và nếu bạn có thắc mắc gì hãy liên hệ với tôi qua mail
        <a href="mailto:iamdemon.dev@gmail.com"><span style="color:navy; font-weight: bold;">iamdemon.dev@gmail.com</span></a>, tôi sẽ giải đáp thắc mắc của bạn.
      </p>
      <p>
        Chúng tôi rất hân hạnh khi được mời bạn tham gia Studio của chúng tôi.
      </p>

      <p>Cuối cùng, chúng tôi chúc bạn có một ngày vui vẻ.</p>
      <p>
        Trân trọng,<br />
        Đội ngũ sáng tạo game <span style="color: cadetblue; font-weight: bold;">Dot Studio </span><br />
        Đại diện: <span style="color: chocolate; font-weight: bold;">Nguyễn Thành An</span>
    </p>
    <img class="logo" src="">

    </div>
  </body>
</html>
`
  const info = {
    from: 'dot team<iamdemon.dev@gmail.com>',
    to: email,
    subject: 'Tạo tài khoản mới',
    html: templateEmail
    // `Tài khoản của bạn là: ${username}
    //     Mật khẩu của bạn là: ${password}
    //     Bạn có thể truy cập đường link này để đăng nhập: http://localhost:3000/login`
  };
  await transporter.sendMail(info);
}
const sendResetPasswordToEmail = async (email, username, password) => {
  const info = {
    from: 'dot team<iamdemon.dev@gmail.com>',
    to: email,
    subject: 'Cấp lại mật khẩu',
    html: `${username} đã yêu cầu cấp lại mật khẩu
        Mật khẩu mới của bạn là: ${password}
        Bạn có thể truy cập đường link này để đăng nhập: https://darkdisquitegame.andemongame.tech/login`
  };
  await transporter.sendMail(info);
}

const resetPassword = async (email, username) => {
  const password = generateRandomPassword();
  await sendResetPasswordToEmail(email, username, password);
  const hashedPassword = await bcrypt.hash(password, 12);
  const resetPass = await UserCpanel.findOneAndUpdate({ email },
    { password: hashedPassword });
  return resetPass;
}
const createAdminUser = async ({ email }) => {
  const username = email.split('@')[0];
  const password = generateRandomPassword();
  await sendPasswordToEmail(email, username, password);
  const hashedPassword = await bcrypt.hash(password, 12);
  const createUser = await UserCpanel.create({
    email,
    username,
    password: hashedPassword
  });

  return createUser;
}
const loginCpanelService = async ({ username, password }) => {

  const user = await UserCpanel.findOne({ username });
  if (!user) {
    return null;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return null;
  }

  return user;

}
const changePassword = async (username, password, newPassword) => {
  const user = await UserCpanel.findOne({ username });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return !user;
  }
  const hashedPassword = await bcrypt.hash(newPassword, 12);
  user.password = hashedPassword || user.password;
  await user.save();
  return user;
}
const banUserService = async (email, role) => {
  const user = await UserCpanel.findOne({ email });
  user.role = role || user.role;
  await user.save();
  return user;
}
const getAllUsers = async () => {
  const users = await UserCpanel.find();
  return users;
}
module.exports = {
  isEmailExists,
  generateRandomPassword,
  sendPasswordToEmail,
  createAdminUser,
  loginCpanelService,
  sendResetPasswordToEmail,
  resetPassword,
  changePassword,
  banUserService,
  getAllUsers
}