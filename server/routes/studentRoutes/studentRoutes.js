const express = require("express");
const router = express.Router();
const {
    authenticationToken,
    authorizeRoles,
} = require("../../middleware/authMiddleware");
const Student = require("../../models/Student");
const Teacher = require("../../models/Teacher");
const {
    getStudentClassDetails, getFeeDetails, getStudentProfile, updateStudentProfile,
} = require("../../controllers/studentControllers");

// Apply authentication middleware
router.use(authenticationToken);
router.use(authorizeRoles("student"));

router.get("/get-class-details/:id", getStudentClassDetails);
router.get("/get-fee-details/:id", getFeeDetails);
router.get("/get-profile/:id", getStudentProfile);
router.put("/update-profile/:id", updateStudentProfile);

module.exports = router;
