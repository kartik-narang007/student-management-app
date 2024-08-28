const express = require("express");
const { userRegister, userLogin, forgotPassword, resetPassword } = require("../controllers/authControllers");
const router = express.Router();

router.post("/user-register", userRegister);
router.post("/user-login", userLogin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
