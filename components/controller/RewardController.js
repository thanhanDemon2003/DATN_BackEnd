const RewardService = require('../service/RewardService');
const PlayerService = require('../service/PlayerService');

const UpReward = async (req, res, next) => {
    try {
        const { id_Player, playingTime, gameMode, dotcoin } = req.body;
        if (!id_Player|| !playingTime || !gameMode || !dotcoin) {
            return res.status(400).json({ succsess: false, notification: 'Thiếu dữ liệu', data: null });
        }
        const player = await PlayerService.getPlayer(id_Player);
        if (!player) {
            return res.status(400).json({ succsess: false, notification: 'Không tìm thấy người chơi', data: null });
        }
        const namePlayer = player.name;
        const data = await RewardService.UpRewardPlayer(id_Player, namePlayer, playingTime, gameMode, dotcoin);
        return res.status(200).json({ succsess: true, notification: 'Thành công', data: data });
    } catch (err) {
        return res.status(500).json({ succsess: false, notification: 'Lỗi server', data: err });
    }
}
const GetReward = async (req, res, next) => {
    try {
        const id_Player = req.params.id;
        if (!id_Player) {
            return res.status(400).json({ succsess: false, notification: 'Thiếu dữ liệu', data: null });
        }
        const data = await RewardService.GetRewardPlayer(id_Player);
        return res.status(200).json({ succsess: true, notification: 'Thành công', data: data });
    } catch (err) {
        return res.status(500).json({ succsess: false, notification: 'Lỗi server', data: err });
    }
}
const GetAllReward = async (req, res, next) => {
    try {
        const data = await RewardService.GetAllRewardPlayer();
        return res.status(200).json({ succsess: true, notification: 'Thành công', data: data });
    } catch (err) {
        return res.status(500).json({ succsess: false, notification: 'Lỗi server', data: err });
    }
}
module.exports = {
    UpReward,
    GetReward,
    GetAllReward
}