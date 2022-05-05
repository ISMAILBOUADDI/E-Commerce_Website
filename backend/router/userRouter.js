const router = require('express').Router();
const userCtrl = require('../controller/userCtrl');

router.post('/signup',userCtrl.signup);
router.post('/refreshtoken',userCtrl.refreshToken);
module.exports = router;