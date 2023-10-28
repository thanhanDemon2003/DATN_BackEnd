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
        if (!gunskin) {
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
        const { name, color, price, category } = req.body;
        const gunskin = await GunSkinService.CreateGunSkinService(name, color, price, category);
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
        const { name, color, price, category } = req.body;
        const gunskin = await GunSkinService.UpdateGunSkinService(id, name, color, price, category);
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
        const percent = 0;
        const gunskin = await GunSkinService.DeleteGunSkinService(id, status, percent);
        console.log(gunskin);
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
        let status = 2;
        if (percent == 0) {
            status = 1;
        }
        if (percent === ""|| percent === null|| percent === undefined) {
            return res.status(400).json({ error: 1, notification: 'Vui lòng nhập giảm giá' });
        }
        if(percent =[a-zA-Z]){
            return res.status(400).json({ error: 1, notification: 'Giảm giá chỉ nhận số' });
        }
        const gunskin = await GunSkinService.DiscountGunSkinService(ids, percent, status);
        if (!gunskin) {
            return res.status(400).json({ error: 1, notification: 'Không tìm thấy skin', id: id });
        }
        return res.status(200).json({ success: 0, notification: 'Sửa lại giảm giá thành công', data: gunskin });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 0, notification: 'Lỗi server' });
    }
}
const getGunSkinSaleController = async (req, res) => {
    try {
        const gunskin = await GunSkinService.getGunSkinSaleService();
        return res.status(200).json({ success: true, notification: 'Thành công', data: gunskin });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, notification: 'Lỗi server' });
    }
}
const getGunSkinNotBuyController = async (req, res) => {
    try {
        const gunskin = await GunSkinService.getGunSkinNotBuyService();
        return res.status(200).json({ success: true, notification: 'Thành công', data: gunskin });
    } catch (error) {
        return res.status(500).json({ success: false, notification: 'Lỗi server' });
    }
}
const getGunSkinBuyController = async (req, res) => {
    try {
        const gunskin = await GunSkinService.getSkinOnSeller();
        return res.status(200).json({ success: true, notification: 'Thành công', data: gunskin });
    } catch (error) {
        return res.status(500).json({ success: false, notification: 'Lỗi server' });
    }
}
module.exports = {
    GetGunSkinController,
    GetGunSkinByIdController,
    CreateGunSkinController,
    UpdateGunSkinController,
    DeleteGunSkinController,
    DiscountGunSkinController,
    getGunSkinSaleController,
    getGunSkinNotBuyController,
    getGunSkinBuyController
};