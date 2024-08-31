const express = require("express");
const router = express.Router();
const { authenticationToken, authorizeRoles } = require("../../middleware/authMiddleware");
const User = require("../../models/User");
const { adminOverview, approveUser, deactivateUser, getAdminProfile, updateAdminProfile } = require("../../controllers/adminControllers/adminUserControllers");


router.use(authenticationToken);
router.use(authorizeRoles('admin')); 


router.get("/overview", adminOverview);
router.get("/get-profile/:id", getAdminProfile);
router.put("/update-profile/:id", updateAdminProfile);
module.exports = router;
