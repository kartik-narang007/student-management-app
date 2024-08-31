const mongoose = require("mongoose");

const salaryPaymentSchema = new mongoose.Schema({
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

const SalaryPayment = mongoose.model("SalaryPayment", salaryPaymentSchema);
module.exports = SalaryPayment;
