const express = require("express");
const router = express.Router();
const {
    authenticationToken,
    authorizeRoles,
} = require("../../middleware/authMiddleware");
const {
    getTeacherSalaryDetails, getClassDetails, getTeacherProfile, updateTeacherProfile,
} = require("../../controllers/teacherControllers");

// Apply authentication middleware
router.use(authenticationToken);
router.use(authorizeRoles("teacher"));

router.get("/get-profile/:id", getTeacherProfile);
router.put("/update-profile/:id", updateTeacherProfile);
router.get("/get-salary-details/:id", getTeacherSalaryDetails);
router.get("/get-class-details/:id", getClassDetails);

module.exports = router;
