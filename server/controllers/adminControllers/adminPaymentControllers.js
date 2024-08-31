const mongoose = require("mongoose");

const FeeReceive = require("../../models/FeeReceive");
const SalaryPayment = require("../../models/SalaryPayment");
const Teacher = require("../../models/Teacher");
const Student = require("../../models/Student");
const moment = require("moment");

exports.createSalaryPayment = async (req, res) => {
    const { teacher, amount, date } = req.body;
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        // Create the SalaryPayment record
        const salaryPayment = new SalaryPayment({
            teacher,
            amount,
            date,
        });
        await salaryPayment.save({ session });

        // Calculate the total salary paid including the new payment
        const teacherDoc = await Teacher.findById(teacher)
            .populate("salaryPayments")
            .exec();

        if (!teacherDoc) {
            throw new Error("Teacher not found");
        }

        // Calculate the new total salary paid
        const totalSalaryPaid = teacherDoc.salaryPayments.reduce(
            (acc, payment) => acc + payment.amount,
            0
        ) + amount; // Add the new payment amount

        // Update the Teacher document
        await Teacher.findByIdAndUpdate(
            teacher,
            {
                $push: { salaryPayments: salaryPayment._id },
                $set: { totalSalaryPaid: totalSalaryPaid }, // Update total salary paid
            },
            { new: true, session }
        );

        await session.commitTransaction();
        session.endSession();

        res.status(201).json(salaryPayment);
    } catch (err) {
        console.log(err);
        await session.abortTransaction();
        session.endSession();
        res.status(400).json({ error: err.message });
    }
};


exports.createFeeReceive = async (req, res) => {
    const { student, amountReceived, receiptDate } = req.body;
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        // Create the FeeReceive record
        const feeReceive = new FeeReceive({
            student,
            amount: amountReceived,
            date: receiptDate,
        });
        await feeReceive.save({ session });

        // Fetch the student's existing feeReceives to calculate the total
        const studentDoc = await Student.findById(student)
            .populate("feeReceives")
            .session(session);

        // Calculate the total fee paid including the new payment
        const totalFeePaid =
            studentDoc.feeReceives.reduce((sum, fee) => sum + fee.amount, 0) +
            amountReceived;

        // Update the Student document with the new totalFeePaid
        studentDoc.feeReceives.push(feeReceive._id);
        studentDoc.totalFeePaid = totalFeePaid;
        await studentDoc.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ feeReceive, student: studentDoc });
    } catch (err) {
        console.log(err);
        await session.abortTransaction();
        session.endSession();
        res.status(400).json({ error: err.message });
    }
};

exports.getExpenseData = async (req, res) => {
    const { interval } = req.query;

    try {
        // Get all data
        let feeReceives = await FeeReceive.find({}).exec();
        let salaryPayments = await SalaryPayment.find({}).exec();

        // Data structure to hold the formatted results
        const data = {
            feeReceives: {},
            salaryPayments: {},
        };

        if (interval === "yearly") {
            feeReceives.forEach((item) => {
                const year = moment(item.date).format("YYYY");
                if (!data.feeReceives[year]) data.feeReceives[year] = 0;
                data.feeReceives[year] += item.amount;
            });

            salaryPayments.forEach((item) => {
                const year = moment(item.date).format("YYYY");
                if (!data.salaryPayments[year]) data.salaryPayments[year] = 0;
                data.salaryPayments[year] += item.amount;
            });
        } else {
            feeReceives.forEach((item) => {
                const month = moment(item.date).format("YYYY-MM");
                if (!data.feeReceives[month]) data.feeReceives[month] = 0;
                data.feeReceives[month] += item.amount;
            });

            salaryPayments.forEach((item) => {
                const month = moment(item.date).format("YYYY-MM");
                if (!data.salaryPayments[month]) data.salaryPayments[month] = 0;
                data.salaryPayments[month] += item.amount;
            });
        }

        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch expense data" });
    }
};
