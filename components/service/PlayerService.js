const PlayerModel = require("../model/PlayerModel");

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
  }
};
const SavePosition = async (id, positionX, positionY, positionZ) => {
  try {
    const position = await PlayerModel.findOneAndUpdate({
      id,
      positionX,
      positionY,
      positionZ,
    });
    return position;
  } catch (error) {
    throw error;
  }
};
const getPlayer = async (id) => {
  try {
    const player = await PlayerModel.findById(id);
    return player;
  } catch (error) {
    throw error;
  }
};
const updateGunSkin = async (id, balance, skinId, nameSkin, color, category) => {
  try {
    const player = await PlayerModel.findById(id);
    player.balance = balance || balance;
    const gun = {
      gunskinId: skinId,
      nameSkin: nameSkin,
      color: color,
      category: category,
    };
    player.wardrobe.push(gun);
    await player.save();
    return player;
  } catch (error) {
    throw error;
  }
};
const banPlayerService = async (id, status) => {
  try {
    const player = await PlayerModel.findByIdAndUpdate(id, { status });
    return player;
  } catch (error) {}
};
const wardrobe = async (id) => {
  const player = await PlayerModel.findById(id);
  return player.wardrobe;
};
const getAllPlayers = async () => {
  try {
    const players = await PlayerModel.find();
    return players;
  } catch (error) {
    throw error;
  }
};
const updatePlayer = async (id, positionX, positionY, positionZ, balance) => {
  const player = await PlayerModel.findById(id);
  player.positionX = positionX || player.positionX;
  player.positionY = positionY || player.positionY;
  player.positionZ = positionZ || player.positionZ;
  player.balance = balance || player.balance;
  await player.save();
  return player;
};
module.exports = {
  LoginFacebookService,
  SavePosition,
  getPlayer,
  updateGunSkin,
  banPlayerService,
  wardrobe,
  getAllPlayers,
  updatePlayer,
};
