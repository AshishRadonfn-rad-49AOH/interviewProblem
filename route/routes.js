const express = require('express');
const router = express.Router();
const userController = require("../controller/userController")


router.post('/create', userController.create)

//export router
module.exports = router;