const Class = require("../../models/Class");
const Teacher = require("../../models/Teacher");

exports.fetchClasses = async (req, res) => {
    try {
        const classes = await Class.find();
        res.json(classes);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.createClass = async (req, res) => {
    try {
        const { className, year, studentLimit, studentFees } = req.body;
        const existingClass = await Class.findOne({ className });

        if (existingClass) {
            return res.status(400).json({ message: "Class name must be unique" });
        }

        const newClass = new Class({
            name: className,
            year,
            studentLimit,
            fees: studentFees,
        });

        await newClass.save();
        res.status(201).json({ class: newClass });
    } catch (error) {
        res.status(500).json({ message: "Failed to create class." });
    }
};

exports.deleteClass = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedClass = await Class.findByIdAndDelete(id);

        if (!deletedClass) {
            return res.status(404).json({ message: "Class not found" });
        }

        res.status(200).json({ message: "Class deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete class." });
    }
};

exports.bulkAssignmentsUpdate = async (req, res) => {
    try {
        const { assignments } = req.body;

        await Class.updateMany({}, { $set: { teachers: [] } });
        await Teacher.updateMany({}, { $set: { classes: [] } });

        for (const assignment of assignments) {
            const classItem = await Class.findById(assignment.classId);
            const teacher = await Teacher.findById(assignment.teacherId);

            if (classItem && teacher) {
                classItem.teachers.push(teacher._id);
                await classItem.save();

                teacher.classes.push(classItem._id);
                await teacher.save();
            }
        }

        res.status(200).send({ message: 'Assignments updated successfully!' });
    } catch (error) {
        res.status(500).send({ error: 'Error updating assignments.' });
    }
};
