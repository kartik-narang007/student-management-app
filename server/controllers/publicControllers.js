const Class = require("../models/Class");

exports.fetchClassNames = async (req, res) => {
    try {
        const classes = await Class.find().select("name studentLimit students");

       const classList =  classes.map((cls) => {
            return {
                _id: cls._id,
                name:cls.name,
                studentLimit: cls.studentLimit,
                enrolledStudents: cls?.students?.length,
            };
        });


        res.json(classList);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
