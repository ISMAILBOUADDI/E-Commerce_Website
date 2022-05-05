const router = require('express').Router();
const userCtrl = require('../controller/userCtrl');

router.post('/signup',userCtrl.signup);
router.get('/refreshtoken',userCtrl.refreshToken);
module.exports = router;