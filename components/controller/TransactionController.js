
const TransactionService = require('../service/TransactionService');
const PlayerService = require('../service/PlayerService');
const GunSkinService = require('../service/GunSkinService');

const buyGunSkinController = async (req, res) => {
    try {
        const { id_Player, id_GunSkin } = req.query;
        const player = await PlayerService.getPlayer(id_Player);
        const gunskin = await GunSkinService.GetGunSkinByIdService(id_GunSkin);
        const gunSkinOwned = player.wardrobe.find(gun => gun.gunskinId == id_GunSkin);
        if (gunSkinOwned) {
            return res.status(400).json({error: 1, notification: "Bạn đã sở hữu skin này" });
        }
        balance = Number(player.balance);
        price = Number(gunskin.price);
        if (balance >= price) {
            const newBalance = player.balance - gunskin.price + (gunskin.price * gunskin.percent / 100);
            const gunskinPrice = gunskin.price - (gunskin.price * gunskin.percent / 100);
            const transaction = await TransactionService.buyGunSkin(id_Player, id_GunSkin, gunskin.name, gunskinPrice);
            const updatePlayer = await PlayerService.updateGunSkin(id_Player, newBalance, id_GunSkin, gunskin.name);
            res.status(200).json({success: 0, notification: "Bạn đã mua skin thành công", transaction, updatePlayer });
        } else {
            res.status(400).json({error: 2, notification: "Bạn không có đủ tiền" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:0, notification: "Lỗi vui lòng xem log" });
    }
}
const getAllTransactionController = async (req, res) => {
    try {
        const transactions = await TransactionService.getAllTransaction();
        res.status(200).json({success: true, data: transactions });
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, notification: "Lỗi vui lòng xem log" });
    }
}
module.exports = { buyGunSkinController, getAllTransactionController  };