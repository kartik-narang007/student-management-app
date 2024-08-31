const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticationToken = async (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) return res.sendStatus(403);

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        try {
            const foundUser = await User.findById(user.id);

            if (!foundUser || !foundUser.isApproved) {
                return res
                    .status(403)
                    .json({ message: "Access Denied: User not approved" });
            }

            req.user = foundUser;
            next();
        } catch (dbErr) {
            return res
                .status(500)
                .json({ message: "Database error", error: dbErr.message });
        }
    });
};

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access Denied" });
        }
        next();
    };
};

module.exports = { authenticationToken, authorizeRoles };
