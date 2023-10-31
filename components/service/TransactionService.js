const TransactionModel = require("../model/TransactionModel");
const _ = require("lodash");

const buyGunSkin = async (id_Player, id_GunSkin, nameSkin, price, category) => {
  try {
    const transaction = await TransactionModel.create({
      id_Player,
      id_GunSkin,
      nameSkin,
      price,
      category
    });
    return transaction;
  } catch (error) {
    throw error;
  }
};
const getAllTransaction = async () => {
  try {
    const transactions = await TransactionModel.find();
    return transactions;
  } catch (error) {
    throw error;
  }
};
const getTransactionPlayer = async (id_Player) => {
  try {
    const transactions = await TransactionModel.find({ id_Player: id_Player });
    return transactions;
  } catch (error) {
    throw error;
  }
};
const getAllTransactionPlayer = async () => {
  const transactions = await TransactionModel.find({});

  const grouped = _.groupBy(transactions, "id_Player");

  const result = Object.keys(grouped).map((id_Player) => {
    const giaoDichMuaSung = grouped[id_Player];
    return {
      id_Player,
      giaoDich: giaoDichMuaSung.sort((a, b) => b.ngayMua - a.ngayMua),
    };
  });
    return result;
};


module.exports = {
  buyGunSkin,
  getAllTransaction,
  getTransactionPlayer,
  getAllTransactionPlayer,
};
