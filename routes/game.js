var express = require('express');
var router = express.Router();
const PlayerController = require('../components/controller/PlayerController');
const GunSkinController = require('../components/controller/GunSkinController');
const TransactionController = require('../components/controller/TransactionController');
//player
router.post('/Login', PlayerController.LoginFacebookController);
router.post('/saveposition/:id', PlayerController.SavePositionController);
router.put('/lockPlayer/:id', PlayerController.banPlayerController);


//gunskin
router.get('/getallgunskin', GunSkinController.GetGunSkinController);
router.get('/getgunskin/:id', GunSkinController.GetGunSkinByIdController);
router.post('/gunskin', GunSkinController.CreateGunSkinController);
router.put('/updategunskin/:id', GunSkinController.UpdateGunSkinController);
router.put('/deletegunskin/:id', GunSkinController.DeleteGunSkinController);
router.put('/discountgunskin', GunSkinController.DiscountGunSkinController);

//transaction
router.post('/buygunskin', TransactionController.buyGunSkinController);
router.get('/getalltransaction', TransactionController.getAllTransactionController);

module.exports = router;
