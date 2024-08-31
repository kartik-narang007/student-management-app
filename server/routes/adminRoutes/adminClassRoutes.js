const express = require("express");
const router = express.Router();
const Class = require("../../models/Class");
const {
    authenticationToken,
    authorizeRoles,
} = require("../../middleware/authMiddleware");
const {
    createClass, fetchClasses, deleteClass, bulkAssignmentUpdate, bulkAssignmentsUpdate,
} = require("../../controllers/adminControllers/adminClassControllers");

router.use(authenticationToken);
router.use(authorizeRoles("admin"));

router.post("/create-class", createClass);
router.post("/bulk-assignments-update", bulkAssignmentsUpdate);
router.get("/fetch-classes", fetchClasses);
router.delete("/delete-class/:id", deleteClass);

module.exports = router;
