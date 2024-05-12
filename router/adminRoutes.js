const express = require("express");
const router = express.Router();
let adminController = require("../controller/adminController");
let { checkAuth } = require("../middleware/checkAuth");

router.get("/user-list", checkAuth, adminController.userList);
router.post("/user-create",checkAuth,adminController.userCreate);
router.post("/user-remove",checkAuth,adminController.removeUser);

module.exports = router;
