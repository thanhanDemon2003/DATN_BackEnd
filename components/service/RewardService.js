const rewardModel = require("../model/RewardModel");
const playerModel = require("../model/PlayerModel");

const UpRewardPlayer = async (
  id_Player,
  namePlayer,
  playingTime,
  gameMode,
  dotcoin
) => {
  const data = await rewardModel.create({
    id_Player,
    namePlayer,
    playingTime,
    gameMode,
    dotcoin,
    Date: Date.now(),
  });
  return data;
};
const GetRewardPlayer = async (id_Player) => {
    const data = await rewardModel.find({ id_Player });
    return data;
}
const GetAllRewardPlayer = async () => {
    const data = await rewardModel.find();
    return data;
}
module.exports = {
    UpRewardPlayer,
    GetRewardPlayer,
    GetAllRewardPlayer
}