var express = require('express');
var router = express.Router();
const PlayerController = require('../components/controller/PlayerController');
const GunSkinController = require('../components/controller/GunSkinController');
const TransactionController = require('../components/controller/TransactionController');
//player
router.post('/Login', PlayerController.LoginFacebookController);
router.post('/saveposition/:id', PlayerController.SavePositionController);
router.get('/wardrobeplayer/:id', PlayerController.wardrobeController);
router.post('/loginpayment', PlayerController.LoginPayToFacebook)
//gunskin
router.get('/getgunskin/:id', GunSkinController.GetGunSkinByIdController);
router.get('/getallgunskin', GunSkinController.GetGunSkinController);
router.get('/getgunskinbuy', GunSkinController.getGunSkinBuyController);
router.get('/getgunskinsale', GunSkinController.getGunSkinSaleController);
router.get('/getgunskinnotbuy', GunSkinController.getGunSkinNotBuyController);
//transaction
router.post('/buygunskin', TransactionController.buyGunSkinController);
router.get('/gettransactionplayer/:id', TransactionController.getTransactionPlayerController);
module.exports = router;
