

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
const CreateGunSkinService = async (name, color, price) => {
  try {
    const gunskin = await GunSkinModel.create({ name, color, price });
    return gunskin;
  } catch (error) {
    throw error;
  };
}
const UpdateGunSkinService = async (id, name, color, price) => {
  try {
    const updateGun = await GunSkinModel.findById(id);
    updateGun.name = name || updateGun.name;
    updateGun.color = color || updateGun.color;
    updateGun.price = price || updateGun.price;
    await updateGun.save();
    return updateGun;
  } catch (error) {
    throw error;
  }
}
const DeleteGunSkinService = async (id, status) => {
  try {
    const deleteGunSkin = await GunSkinModel.findByIdAndUpdate(id, status);
    return deleteGunSkin;
  } catch (error) {
    throw error;
  }
}
const DiscountGunSkinService = async (ids, percent) => {
  try {
    const updatePromises = ids.map(id => {
      return GunSkinModel.findByIdAndUpdate(id, {
        percent  
      });
    });
    
    const updatedSkins = await Promise.all(updatePromises);
    
    return updatedSkins;

  } catch (error) {
    throw error;
  }
}

module.exports = {
  GetGunSkinService,
  GetGunSkinByIdService,
  CreateGunSkinService,
  UpdateGunSkinService,
  DeleteGunSkinService,
  DiscountGunSkinService
};