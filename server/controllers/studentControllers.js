const Class = require("../models/Class");
const FeeReceive = require("../models/FeeReceive");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

exports.getStudentClassDetails = async (req, res) => {
    try {
        const classId = req.params.id;

        const classDetails = await Class.findById(classId)
            .populate({
                path: "students",
                model: "student",
            })
            .populate({
                path: "teachers",
                model: "teacher",
            });

        if (!classDetails) {
            return res.status(404).json({ message: "Class not found" });
        }

        const totalStudents = classDetails.students.length;
        const boysCount = classDetails.students.filter(
            (student) => student.gender === "Male"
        ).length;
        const girlsCount = classDetails.students.filter(
            (student) => student.gender === "Female"
        ).length;
        const otherCount = totalStudents - (boysCount + girlsCount);

        const teacherNames = classDetails.teachers.map(
            (teacher) => teacher.fullName
        );

        const totalFees = classDetails.fees || 0;

        res.json({
            class: {
                name: classDetails.name,
                studentLimit: classDetails.studentLimit,
                year: classDetails.year,
                totalFees,
            },
            totalStudents,
            boysCount,
            girlsCount,
            otherCount,
            teachers: teacherNames,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getFeeDetails = async (req, res) => {
    try {
        const { id: studentId } = req.params;
        const feeDetails = await FeeReceive.find({ student: studentId });

        res.status(200).json(feeDetails);
    } catch (error) {
        res.status(500).json({ message: "Error fetching fee details", error });
    }
};

exports.getStudentProfile = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id)
            .populate("classes", "name")
            .exec();

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateStudentProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const student = await Student.findByIdAndUpdate(id, updatedData, { new: true });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
