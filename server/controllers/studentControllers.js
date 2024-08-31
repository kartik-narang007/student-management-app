const Class = require("../models/Class");
const FeeReceive = require("../models/FeeReceive");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

exports.getStudentClassDetails = async (req, res) => {
    try {
        console.log("Entered in controller");
        const classId = req.params.id;

        // Fetch class details, including students and teachers
        const classDetails = await Class.findById(classId)
            .populate({
                path: "students", // Path to the students field in the Class model
                model: "student", // Model to populate the students field
            })
            .populate({
                path: "teachers", // Path to the teachers field in the Class model
                model: "teacher", // Model to populate the teachers field
            });

        // Check if classDetails is null (class not found)
        if (!classDetails) {
            return res.status(404).json({ message: "Class not found" });
        }

        console.log(classDetails);

        // Calculate student statistics
        const totalStudents = classDetails.students.length;
        const boysCount = classDetails.students.filter(
            (student) => student.gender === "Male"
        ).length;
        const girlsCount = classDetails.students.filter(
            (student) => student.gender === "Female"
        ).length;
        const otherCount = totalStudents - (boysCount + girlsCount);

        // Extract only the teacher names
        const teacherNames = classDetails.teachers.map(
            (teacher) => teacher.fullName
        );

        // Calculate total fees (assuming `fees` is a field in the Class schema)
        const totalFees = classDetails.fees || 0; // Use default value if fees are not set

        // Send the response with class details and additional statistics
        res.json({
            class: {
                name: classDetails.name,
                studentLimit: classDetails.studentLimit,
                year: classDetails.year,
                totalFees, // Include total fees in the response
            },
            totalStudents,
            boysCount,
            girlsCount,
            otherCount, // Include otherCount in the response
            teachers: teacherNames, // Include only teacher names
        });
    } catch (error) {
        console.error("Error fetching class details:", error);
        res.status(500).json({ error: error.message });
    }
};


exports.getFeeDetails = async (req, res) => {
    try {
        console.log(req.params);
        const { id: studentId } = req.params;
        console.log(studentId);
        const feeDetails = await FeeReceive.find({ student: studentId });

        console.log(feeDetails);

        res.status(200).json(feeDetails);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching fee details", error });
    }
};

exports.getStudentProfile = 
    async (req, res) => {
        
        try {
            const student = await Student.findById(req.params.id)
                .populate("classes", "name") // Populate class names
                .exec();

                console.log(student)
            if (!student) {
                return res.status(404).json({ message: "Student not found" });
            }
            res.json(student);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

exports.updateStudentProfile = async(req,res)=>{
    try {
        const { id } = req.params;
        const updatedData = req.body;
        
        // Find and update student profile
        const student = await Student.findByIdAndUpdate(id, updatedData, { new: true });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}