var express = require('express');
var router = express.Router();
const UserCpanelController = require('../components/controller/UserCpanelController');

router.post('/loginCpanel', UserCpanelController.loginCpanel);

module.exports = router;
