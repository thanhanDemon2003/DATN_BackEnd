const PlayerModel = require("../model/PlayerModel");
const request = require("request");

const LoginFacebookService = async (tokenFB) => {
  try {
    const fb = await FBService(tokenFB);
    const fb_id = fb.id;
    const name = fb.name;
    const checkFbId = await PlayerModel.findOne({ fb_id });
    if (checkFbId && checkFbId.status == 0 && checkFbId.tokenFB !== tokenFB) {
        checkFbId.tokenFB = tokenFB || checkFbId.tokenFB;
        await checkFbId.save();
    }
    if (!fb_id) {
      throw "Không có id";
    }
    if (!checkFbId) {
      await PlayerModel.create({
        fb_id,
        tokenFB,
        name,
      });
    }
    return checkFbId;
  } catch (error) {
    throw error;
  }
};
// const FBService = async (tokenFB) => {
//   request.get(`https://graph.facebook.com/v18.0/me?fields=id,name&access_token=${tokenFB}`, function (err, res, body) {
//       console.log("aaaa>>>>>>>>>");
//       let data = JSON.parse(body)
//       console.log("fbservice >>>>>>",data.id);
//       return data;
//   });
// }
const FBService = async (tokenFB) => {

  return new Promise((resolve, reject) => {

    request.get(`https://graph.facebook.com/v18.0/me?fields=id,name&access_token=${tokenFB}`, function(err, res, body) {

      if(err) return reject(err);

      try {
        let data = JSON.parse(body);
        resolve(data);  
      } catch(err) {
        reject(err);
      }

    });

  });

}

const LoginFacebookPayment = async (tokenFB) => {
    const fb = await FBService(tokenFB);
    const fb_id = fb.id;
    const checkFB = await PlayerModel.findOne({ fb_id });


    return checkFB;

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
  LoginFacebookPayment
};
