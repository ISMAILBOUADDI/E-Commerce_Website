const router = require('express').Router()
const cloudinary = require('cloudinary')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const uploadCtrl = require('../controllers/uploadCtrl')

// Upload image only admin can use
router.post('/upload',auth , authAdmin, uploadCtrl.uploadImages)

// Delete image only admin can use
router.post('/destroy',auth , authAdmin, uploadCtrl.deleteImages)




module.exports = router