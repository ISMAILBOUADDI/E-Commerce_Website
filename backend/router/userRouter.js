const router = require('express').Router();
const userCtrl = require('../controller/userCtrl');

router.post('/signup',userCtrl.signup);
module.exports = router;