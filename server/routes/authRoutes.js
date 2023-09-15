const express = require("express");
const authC = require("../controllers/authController");
const { loginLimiter } = require("../middleware/rateLimiter");

const router = express.Router();

router.post("/register", authC.registerUser);
router.post('/login', loginLimiter, authC.login);
router.post('/refresh-token', authC.refreshToken);
router.post('/logout', authC.logout);
router.get("/checkAuth", authC.checkAuth);

module.exports = router;