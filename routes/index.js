var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.get('/login', function (req, res, next) {
  res.render('login');
});
router.get('/', function (req, res, next) {
  res.render('index');
});
router.get('/players', function (req, res, next) {
  res.render('players');
});
router.get('/gunskins', function (req, res, next) {
  res.render('gunskins');
});
router.get('/transactions', function (req, res, next) {
  res.render('transactions');
});
router.get('/payments', function (req, res, next) {
  res.render('payments');
});
router.get('/donates', function (req, res, next) {
  res.render('donates');
});
router.get('/users', function (req, res, next) {
  res.render('users');
});
router.get('/transactions/transactionsplayer', function (req, res, next) {
  res.render('transactionPlayer');
});
module.exports = router;
