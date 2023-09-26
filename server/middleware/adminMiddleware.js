const adminMiddleware = (req, res, next) => {
    // Check if user is authenticated and is an admin
    console.log(req.user);
    if (req.user && req.user.userRole === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Access Denied: Admins only" });
    }
};

module.exports = {
    adminMiddleware
};