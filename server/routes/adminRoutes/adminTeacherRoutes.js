const express = require("express");
const router = express.Router();
const {
    authenticationToken,
    authorizeRoles,
} = require("../../middleware/authMiddleware");
const {
    getTeacherAnalytics,
    fetchAllTeachers,
    deleteTeacher,
    updateTeacher,
} = require("../../controllers/adminControllers/adminTeacherControllers");

router.use(authenticationToken);
router.use(authorizeRoles("admin"));

router.get("/teachers-analytics", getTeacherAnalytics);
router.get("/fetch-teachers", fetchAllTeachers);
router.put("/update-teacher/:id", updateTeacher);
router.delete("/delete-teacher/:id", deleteTeacher);

module.exports = router;
