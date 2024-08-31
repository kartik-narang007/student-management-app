const mongoose = require("mongoose");

const feeReceiveSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

const FeeReceive = mongoose.model("FeeReceive", feeReceiveSchema); // Register the model
module.exports = FeeReceive;
