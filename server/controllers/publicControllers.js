const Class = require("../models/Class");

exports.fetchClassNames = async (req, res) => {
    try {
        const classes = await Class.find().select("name"); // Select only the 'name' field
        res.json(classes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};
