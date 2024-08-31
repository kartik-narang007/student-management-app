const Class = require("../models/Class");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

exports.getTeacherSalaryDetails = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id)
            .populate("salaryPayments")
            .exec();

        if (!teacher) {
            return res.status(404).json({ error: "Teacher not found" });
        }

        const totalSalaryPaid = teacher.salaryPayments.reduce(
            (acc, payment) => acc + payment.amount,
            0
        );

        res.json({
            salaryDetails: teacher.salaryPayments,
            totalSalaryPaid,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getClassDetails = async (req, res) => {
    try {
        const { id: teacherId } = req.params;

        const teacher = await Teacher.findById(teacherId).select("classes");

        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        const classIds = teacher.classes.map((cls) => cls._id);

        const classes = await Class.find({ _id: { $in: classIds } }).select(
            "name students"
        );

        const studentIds = classes.flatMap((classItem) => classItem.students);

        const students = await Student.find({
            _id: { $in: studentIds },
        }).select("fullName gender parentName");

        const classData = classes.map((classItem) => {
            const studentsInClass = students.filter((student) =>
                classItem.students.includes(student._id)
            );
            const maleStudents = studentsInClass.filter(
                (student) => student.gender === "Male"
            ).length;
            const femaleStudents = studentsInClass.filter(
                (student) => student.gender === "Female"
            ).length;
            const otherStudents = studentsInClass.filter(
                (student) => !["Male", "Female"].includes(student.gender)
            ).length;

            return {
                classId: classItem._id,
                name: classItem.name,
                totalStudents: studentsInClass.length,
                maleStudents,
                femaleStudents,
                otherStudents,
                studentsList: studentsInClass.map((student) => ({
                    name: student.fullName,
                    parentName: student.parentName,
                    gender: student.gender,
                })),
            };
        });

        res.json({ classes: classData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTeacherProfile = async (req, res) => {
    try {
        const { id: teacherId } = req.params;

        const teacher = await Teacher.findById(teacherId)
            .select(
                "fullName email mobileNumber address dateOfBirth gender totalSalaryPaid classes"
            )
            .lean();

        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        const totalClasses = teacher.classes.length;

        const teacherData = {
            fullName: teacher.fullName,
            email: teacher.email,
            mobileNumber: teacher.mobileNumber,
            address: teacher.address,
            dateOfBirth: teacher.dateOfBirth,
            gender: teacher.gender,
            totalSalaryPaid: teacher.totalSalaryPaid,
            totalClasses,
        };

        res.json({ teacher: teacherData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTeacherProfile = async (req, res) => {
    try {
        const teacherId = req.params.id;
        const updateData = req.body;

        const updatedTeacher = await Teacher.findByIdAndUpdate(
            teacherId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedTeacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        res.status(200).json({ teacher: updatedTeacher });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
