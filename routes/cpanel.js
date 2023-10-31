var express = require('express');
var router = express.Router();
const UserCpanelController = require('../components/controller/UserCpanelController');
const PlayerController = require('../components/controller/PlayerController');
const GunSkinController = require('../components/controller/GunSkinController');
const TransactionController = require('../components/controller/TransactionController');
const validate = require('../validate/Jwt');
/* GET home page. */


// user
router.post('/createAdminUser', validate.checkRole, UserCpanelController.createAdminUser);
router.post('/resetPassword', validate.checkRole, UserCpanelController.resetPassword)
router.post('/changePassword', validate.checkRole, UserCpanelController.changePasswordController);
router.post('/banUser', validate.checkRole, UserCpanelController.banUserController);
router.get('/getAllUsers', validate.checkRole, UserCpanelController.getAllUsers);
router.put('/updateplayer/:id', PlayerController.updatePlayerControllers);

// player
router.get('/getAllPlayers', PlayerController.getAllPlayers);
router.put('/lockPlayer/:id', PlayerController.banPlayerController);
router.get('/getPlayer/:id', PlayerController.getPlayerControllers);
router.put('/giveSkin', TransactionController.giveGunSkinController);

//skin 
router.get('/getallgunskin', GunSkinController.GetGunSkinController);
router.get('/getgunskin/:id', GunSkinController.GetGunSkinByIdController);
router.post('/gunskin', GunSkinController.CreateGunSkinController);
router.put('/updategunskin/:id', GunSkinController.UpdateGunSkinController);
router.put('/deletegunskin/:id', GunSkinController.DeleteGunSkinController);
router.put('/discountgunskin', GunSkinController.DiscountGunSkinController);
router.get('/getgunskinsale', GunSkinController.getGunSkinSaleController);
router.get('/getgunskinnotbuy', GunSkinController.getGunSkinNotBuyController);
router.get('/getgunskinbuy', GunSkinController.getGunSkinBuyController);

//transaction
router.get('/getalltransaction', TransactionController.getAllTransactionController);
router.get('/gettransactionplayer/:id', TransactionController.getTransactionPlayerController);
router.get('/getalltransactionplayer', TransactionController.getAllTransactionPlayersController);

module.exports = router;