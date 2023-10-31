var express = require('express');
var router = express.Router();
const UserCpanelController = require('../components/controller/UserCpanelController');

router.post('/loginCpanel', UserCpanelController.loginCpanel);


var request = require('request')
// var countryCode = '+61',
//     mobileNumber = '422123456',
//     message = 'Hello from Blower.io';

router.post('/send-sms', (req, res) => {

    // Lấy dữ liệu từ body
    const {to, message} = req.body;
    
    // Gọi API gửi SMS 
    request.post({
      url:"https://ae322f8e-72ca-4686-b35d-8171671f5444:RfLH0WUZcsYeFmv0SnnbjA@api.blower.io/messages" ,
      form: {
        to,
        message   
      }
    }, (err, httpRes, body) => {
      if (err) {
      console.log(err, httpRes, body)
        return res.status(500).send('Lỗi gửi tin nhắn', err, httpRes, body);
      }
      console.log(err, httpRes, body)
      res.send('Tin nhắn đã được gửi');  
    });
  
  });
module.exports = router;
