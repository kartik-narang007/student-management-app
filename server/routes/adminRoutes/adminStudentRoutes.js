const express = require("express");
const router = express.Router();
const {
    authenticationToken,
    authorizeRoles,
} = require("../../middleware/authMiddleware");
const {
    getStudentsAnalytics,
    fetchAllStudents,
    deleteStudent,
    changeStudentClass,
    updateStudent,
    getStudentAndClasses,
} = require("../../controllers/adminControllers/adminStudentControllers");

router.use(authenticationToken);
router.use(authorizeRoles("admin"));

router.get("/students-analytics", getStudentsAnalytics);
router.get("/fetch-students", fetchAllStudents);
router.get("/get-students-and-classes", getStudentAndClasses);
router.delete("/delete-student/:id", deleteStudent);
router.put("/update-student/:id", updateStudent);

module.exports = router;
