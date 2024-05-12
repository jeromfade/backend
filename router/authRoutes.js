const express = require('express');
const router = express.Router();

let authController=require('../controller/authController');
router.post('/login',authController.login);

module.exports = router