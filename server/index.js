require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;
const URL = process.env.URL;

const authRoutes = require("./routes/authRoutes");
const publicRoutes = require("./routes/publicRoutes");
const adminUserRoutes = require("./routes/adminRoutes/adminUserRoutes");
const adminStudentRoutes = require("./routes/adminRoutes/adminStudentRoutes");
const adminTeacherRoutes = require("./routes/adminRoutes/adminTeacherRoutes");
const adminClassRoutes = require("./routes/adminRoutes/adminClassRoutes");
const adminPaymentRoutes = require("./routes/adminRoutes/adminPaymentRoutes");
const studentRoutes = require("./routes/studentRoutes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes/teacherRoutes");

const allowedOrigins = [
    URL,
    'http://localhost:3000'
];

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminUserRoutes);
app.use("/api/admin", adminStudentRoutes);
app.use("/api/admin", adminTeacherRoutes);
app.use("/api/admin", adminClassRoutes);
app.use("/api/admin", adminPaymentRoutes);

app.use("/api/student", studentRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api", publicRoutes);

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
