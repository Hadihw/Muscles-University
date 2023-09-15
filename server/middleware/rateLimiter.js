const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 5,
	message: "You've made too many login attempts in a short period. Please wait for 15 minutes before trying again."
});

module.exports = { loginLimiter };