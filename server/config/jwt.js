const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config({ path: '../.env' });

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY;

module.exports = { JWT_SECRET_KEY, JWT_REFRESH_SECRET_KEY, jwt };