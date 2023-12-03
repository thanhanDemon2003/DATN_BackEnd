const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {

  const token = req.header('Authorization');
  const secretKey = 'cPanelSecretKeyGame';
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(200).json({error: 4, msg: 'Token đã hết hạn' });
  }
}

const checkRole = (req, res, next) => {
  if (req.user.role == 1) {
    next();
  } else {
    res.status(200).json({error: 5, msg: 'Bạn không có quyền truy cập vào dữ liệu này'});
  }
}
module.exports = {
  checkRole,
  authenticateJWT

}