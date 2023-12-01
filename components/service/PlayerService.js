const PlayerModel = require("../model/PlayerModel");
const request = require("request");



const defaultGun = [
  {
    gunskinId: "none",
    nameSkin: "SMGDefault",
    color: "SMGDefault",
    category: "Primary",
  },
  {
    gunskinId: "none",
    nameSkin: "PistolDefault",
    color: "PistolDefault",
    category: "Secondary",
  },
];

const LoginFacebookService = async (tokenFB, name) => {
  try {
    const user = await PlayerModel.findOne({ fb_id: tokenFB });
    if (!user && name) {
      const newUser = new PlayerModel({
        fb_id: tokenFB,
        name: name,
        wardrobe: defaultGun,
      });
      await newUser.save();
      return newUser;
    }
    return user;
  } catch (error) {
    throw error;
  }
};
const LoginDiscordService = async (id_discord, name) => {
  try {
    const user = await PlayerModel.findOne({ id_discord: id_discord });
    if (!user && name) {
      const newUser = new PlayerModel({
        id_discord: id_discord,
        name: name,
        wardrobe: defaultGun,
      });
      await newUser.save();
      return newUser;
    }
    return user;
  } catch (error) {
    throw error;
  }
};
const LinkAddLoginServiceDiscord = async (id, id_discord) => {
  const user = await PlayerModel.findById({ _id: id });
    user.id_discord = id_discord;
    await user.save();
  return user;
};
const LinkAddLoginServiceGG = async (id, fb_id) => {
  const user = await PlayerModel.findById({ _id: id });
    user.fb_id = fb_id;
    await user.save();
  return user;
};
// const FBService = async (tokenFB) => {
//   request.get(`https://graph.facebook.com/v18.0/me?fields=id,name&access_token=${tokenFB}`, function (err, res, body) {
//       console.log("aaaa>>>>>>>>>");
//       let data = JSON.parse(body)
//       console.log("fbservice >>>>>>",data.id);
//       return data;
//   });
// }
// const FBService = async (tokenFB) => {

//   return new Promise((resolve, reject) => {

//     request.get(`https://graph.facebook.com/v18.0/me?fields=id,name&access_token=${tokenFB}`, function(err, res, body) {

//       if(err) return reject(err);

//       try {
//         let data = JSON.parse(body);
//         resolve(data);
//       } catch(err) {
//         reject(err);
//       }

//     });

//   });

// }

const LoginFacebookPayment = async (tokenFB) => {
  const user = await PlayerModel.findOne({ fb_id: tokenFB });
  return user;
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
    const player = await PlayerModel.findById(id);
    return player;
};
const updateGunSkin = async (
  id,
  balance,
  skinId,
  nameSkin,
  color,
  category
) => {
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
  LoginFacebookPayment,
  LoginDiscordService,
  LinkAddLoginServiceGG,
  LinkAddLoginServiceDiscord
};
