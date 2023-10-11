const PlayerService = require('../service/PlayerService');


const LoginFacebookController = async (req, res, next) => {
    try {
        const tokenFB = req.query.token;
        const login = await PlayerService.LoginFacebookService(tokenFB);
        if (!login) {
            return res.status(200).json({ success: 1, notification: 'Tạo tài khoản thành công' });
        }
        if(!tokenFB){
            return res.status(400).json({ error: 1, notification: 'Không có token' });
        }
        console.log(login.status);
        if(login.status == 1){
            return res.status(400).json({ error: 0, notification: 'Tài khoản này đã bị khóa' });
        }
        return res.status(200).json({ success: 2, notification: 'Đăng nhập thành công', data:login });
    } catch (error) {
        res.status(500).json({ error: 2, notification: 'Lỗi server' });
    }
}
const SavePositionController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const positionX = req.query.x;
        const positionY = req.query.y;
        const positionZ = req.query.z;
        await PlayerService.SavePosition(id, positionX, positionY, positionZ);
        return res.status(200).json({
            success: true, notification: 'Lưu vị trí thành công', id,
            position: { x: positionX, y: positionY, z: positionZ }

        });
    } catch (error) {
        res.status(500).json({ success: false, notification: 'Lỗi ' });
        console.log(error);
    }
}
const banPlayerController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const status = req.query.status;
        const player = await PlayerService.banPlayerService(id, status);
        if(!player){
            return res.status(400).json({ error: 1, notification: 'Không tìm thấy người chơi', id: id });
        }
        if(status == 0){
            return res.status(200).json({ success: 0, notification: 'Player đã được mở khóa', data: player });
        }
        return res.status(200).json({ success: 1, notification: 'Player đã bị khóa', data: player });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 0, notification: 'Lỗi server' });
    }
}


module.exports = { LoginFacebookController, SavePositionController, banPlayerController };