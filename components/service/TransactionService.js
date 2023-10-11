const TransactionModel = require('../model/TransactionModel');


const buyGunSkin = async (id_Player, id_GunSkin,nameSkin, price) => {
    try {
        const transaction = await TransactionModel.create({ id_Player, id_GunSkin,nameSkin, price });
        return transaction;
    } catch (error) {
        throw error;
    };
}
const getAllTransaction = async () => {
    try {
        const transactions = await TransactionModel.find();
        return transactions;
    } catch (error) {
        throw error;
    };
}
module.exports = { buyGunSkin, getAllTransaction };