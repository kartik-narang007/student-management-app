const jwt = require("jwt");
const User = require("../models/User");

const authenticationToken = (req, res) => {
    const token = req.headers["authorization"];

    if (!token) return res.sendStatus(403);

    jwt.verifyToken(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.stats(403).json({ message: "Access Denied" });
        }
    };
};

module.exports = { authenticationToken, authorizeRoles };
