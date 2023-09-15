const express = require("express");
const googleAuthC = require("../controllers/googleAuthController");

const router = express.Router();

router.post('/googleRegister', googleAuthC.googleRegister);
router.post('/googleLogin', googleAuthC.googleLogin);

module.exports = router;