const GunSkinService = require('../service/GunSkinService');


const GetGunSkinController = async (req, res) => {
    try {
        const gunskin = await GunSkinService.GetGunSkinService();
        return res.status(200).json({ success: true, notification: 'Thành công', data: gunskin });
    } catch (error) {
        res.status(500).json({ success: false, notification: 'Lỗi server' });
    }
}
const GetGunSkinByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const gunskin = await GunSkinService.GetGunSkinByIdService(id);
        if(!gunskin){
            return res.status(404).json({ success: false, notification: 'Không tìm thấy skin', id: id });
        }
        return res.status(200).json({ success: true, notification: 'Thành công', data: gunskin });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, notification: 'Lỗi server' });
    }
}
const CreateGunSkinController = async (req, res) => {
    try {
        const {name, color, price} = req.body;
        const gunskin = await GunSkinService.CreateGunSkinService(name, color, price);
        return res.status(200).json({ success: 0, notification: 'Thành công', data: gunskin });
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            return res.status(400).json({ error: 1, notification: 'Skin này đã tồn tại' });
        }
        return res.status(500).json({ error: 0, notification: 'Lỗi server' });
    }
}
const UpdateGunSkinController = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, color, price} = req.body;
        const gunskin = await GunSkinService.UpdateGunSkinService(id, name, color, price);
        if (!gunskin) {
            return res.status(400).json({ error: 1, notification: 'Không tìm thấy skin', id: id });
        }
        return res.status(200).json({ success: 0, notification: 'Update thành công', data: gunskin });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 0, notification: 'Lỗi server' });
    }
}
const DeleteGunSkinController = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.query.status;
        const gunskin = await GunSkinService.DeleteGunSkinService(id, status);
        if (!gunskin) {
            return res.status(400).json({ error: 1, notification: 'Không tìm thấy skin', id: id });
        }
        console.log(status);
        if (status == 0) {
            return res.status(200).json({ success: 1, notification: 'Khôi phục thành công', data: gunskin });
        }
        return res.status(200).json({ success: 0, notification: 'Xóa thành công', data: gunskin });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 0, notification: 'Lỗi server' });
    }
}
const DiscountGunSkinController = async (req, res) => {
    try {
        const ids = req.body.ids;
        const percent = req.body.percent;
        const gunskin = await GunSkinService.DiscountGunSkinService(ids, percent);
        if (!gunskin) {
            return res.status(400).json({ error: 1, notification: 'Không tìm thấy skin', id: id });
        }
        return res.status(200).json({ success: 0, notification: 'Sửa lại giảm giá thành công', data: gunskin });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 0, notification: 'Lỗi server' });
    }
}
module.exports = { GetGunSkinController,
     GetGunSkinByIdController, 
     CreateGunSkinController, 
     UpdateGunSkinController,
      DeleteGunSkinController,
      DiscountGunSkinController};