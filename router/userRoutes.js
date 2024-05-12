const express = require('express');
const router = express.Router();

let userController=require('../controller/userController');
router.post('/view-profile',userController.userProfile);

module.exports = router