const PlayerModel = require('../model/PlayerModel');

const LoginFacebookService = async (fb_id) => {
  try {
    const tokenFB = await PlayerModel.findOne({ fb_id });
    if (!tokenFB) {
      await PlayerModel.create({
        fb_id,
      });
    }
    return tokenFB;
  } catch (error) {
    throw error;
  };
}
const SavePosition = async (id, positionX, positionY, positionZ) => {
  try {
    const position = await PlayerModel.findOneAndUpdate({ id, positionX, positionY, positionZ });
    return position;
  } catch (error) {
    throw error;
  };
}
const getPlayer = async (id) => {
  try {
    const player = await PlayerModel.findById(id);
    return player;
  } catch (error) {
    throw error;
  }
}
const updateGunSkin = async (id, balance, skinId, nameSkin) => {
  try {
    const player = await PlayerModel.findById(id);
    player.balance = balance || balance;
    const gun = {
      gunskinId: skinId,
      nameSkin: nameSkin
    }
    player.wardrobe.push(gun);
    await player.save();
    return player;
  } catch (error) {
    throw error;
  }
}
const banPlayerService = async (id, status) => {
  try {
    const player = await PlayerModel.findByIdAndUpdate(id,{status});
    return player;
  } catch (error) {
    
  }
}

module.exports = { LoginFacebookService, SavePosition, getPlayer, updateGunSkin, banPlayerService };