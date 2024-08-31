const express = require("express");
const router = express.Router();
const {
    authenticationToken,
    authorizeRoles,
} = require("../../middleware/authMiddleware");
const {
    createFeeReceive,
    createSalaryPayment,
    getExpenseData,
} = require("../../controllers/adminControllers/adminPaymentControllers");

router.use(authenticationToken);
router.use(authorizeRoles("admin"));

router.post("/fee-receive", createFeeReceive);
router.post("/salary-payment", createSalaryPayment);
router.get("/expense-analytics", getExpenseData);

module.exports = router;
