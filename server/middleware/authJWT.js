const {jwt} = require("../config/jwt");

function authJWT(req, res, next) {
	const token = req.cookies.accessToken;
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
			if (err) {
				return res.status(403).json({ message: "Forbidden" });
			}
			req.user = user;
			next();
		});
	} else {
		res.status(401).json({ message: "Unauthorized" });
	}
}

module.exports = authJWT;