var express = require('express');
var router = express.Router();
const UserCpanelController = require('../components/controller/UserCpanelController');

router.post('/loginCpanel', UserCpanelController.loginCpanel);


// var request = require('request')
// // var countryCode = '+61',
// //     mobileNumber = '422123456',
// //     message = 'Hello from Blower.io';

// router.post('/send-sms', (req, res) => {

//     // Lấy dữ liệu từ body
//     const {to, message} = req.body;
    
//    const postData ={
//         to,
//         message
//    }
      
//       const options = {
//         url: 'https://ae322f8e-72ca-4686-b35d-8171671f5444:RfLH0WUZcsYeFmv0SnnbjA@api.blower.io/messages',  // Đây là URL của máy chủ Express.js của bạn
//         form: postData
//       };
      
//       request.post(options, (err, response, body) => {
//         if (err) {
//           console.error('Lỗi gửi yêu cầu:', err);
//           res.json({
//             status: 'error',                                                                                                     
//             message: 'Lỗi gửi yêu cầu'
//           })
//         } else {
//           console.log('Phản hồi từ máy chủ:', body);
//           res.json({
//             status: 'success',
//             message: 'Gửi tin nhắn thành công'
//           })
//         }
//         }
//       )
//     })
module.exports = router;
