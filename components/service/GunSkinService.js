

const mongoose = require('mongoose');
const GunSkinModel = require('../model/GunSkinModel');


const GetGunSkinService = async () => {
  try {
    const gunskin = await GunSkinModel.find();
    return gunskin;
  } catch (error) {
    throw error;
  };
}
const GetGunSkinByIdService = async (id) => {
  try {
    const gunskin = await GunSkinModel.findById(id);
    return gunskin;
  } catch (error) {
    throw error;
  };
}
const getSkinOnSeller = async () => {
  try {
    const gunskin = await GunSkinModel.find({ status: 1 });
    return gunskin;
  } catch (error) {
    throw error;
  };
}
const CreateGunSkinService = async (name, color, price, category) => {
  try {
    const gunskin = await GunSkinModel.create({ name, color, price, category });
    return gunskin;
  } catch (error) {
    throw error;
  };
}
const UpdateGunSkinService = async (id, name, color, price, category) => {
  try {
    const updateGun = await GunSkinModel.findById(id);
    updateGun.name = name || updateGun.name;
    updateGun.color = color || updateGun.color;
    updateGun.price = price || updateGun.price;
    updateGun.category = category || updateGun.category;
    await updateGun.save();
    return updateGun;
  } catch (error) {
    throw error;
  }
}
const DeleteGunSkinService = async (id, status, percent) => {
  try {
    const deleteGunSkin = await GunSkinModel.findById(id);
    console.log(id, status);
    deleteGunSkin.status = status || deleteGunSkin.status;
    deleteGunSkin.percent = percent || deleteGunSkin.percent;
    await deleteGunSkin.save();
    return deleteGunSkin;
  } catch (error) {
    throw error;
  }
}
const DiscountGunSkinService = async (ids, percent, status) => {
  try {
    const updatePromises = ids.map(id => {
      return GunSkinModel.findByIdAndUpdate(id, {
        percent,  
        status: status
      });
    });
    const updatedSkins = await Promise.all(updatePromises);
    return updatedSkins;

  } catch (error) {
    throw error;
  }
}
const getGunSkinSaleService = async () => {
  try {
    const gunskin = await GunSkinModel.find({ status: 2 });
    return gunskin;
  } catch (error) {
    throw error;
  };
}
  const getGunSkinNotBuyService = async () => {
    try {
      const gunskin = await GunSkinModel.find({ status: 0 });
      return gunskin;
    } catch (error) {
      throw error;
    };
}
module.exports = {
  GetGunSkinService,
  GetGunSkinByIdService,
  CreateGunSkinService,
  UpdateGunSkinService,
  DeleteGunSkinService,
  DiscountGunSkinService,
  getGunSkinSaleService,
  getGunSkinNotBuyService,
  getSkinOnSeller
};