// Create express app
var express = require("express");
var path = require('path')
var app = express();
var db = require("./database.js");
// var md5 = require("md5")
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './public'))); // <-- location of public dir
import UserRoutes from "./Controllers/User";
import StudentRoutes from "./Controllers/Student";
import LanguagesRoutes from "./Controllers/Languages";
import AppointmentRoutes from "./Controllers/Appointment";
import LanguageCourseRoutes from "./Controllers/Language_Course";
import CertificationRoutes from "./Controllers/Certification";
import UserCertificationRoutes from "./Controllers/User_Certification";
import CourseRatingRoutes from "./Controllers/Course_Rating";
import LoginRoutes from "./Controllers/authentication"
// Server port
var HTTP_PORT = 8000;
// Start server
app.listen(HTTP_PORT, () => {
  console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});
// Root endpoint
app.get("/", (req, res, next) => {
  res.json({ message: "Ok" });
});
app.use("/api/users", UserRoutes);
app.use("/api/students", StudentRoutes);
app.use("/api/languages", LanguagesRoutes);
app.use("/api/appointment", AppointmentRoutes);
app.use("/api/languageCourse", LanguageCourseRoutes);
app.use("/api/certification", CertificationRoutes);
app.use("/api/userCertification", UserCertificationRoutes);
app.use("/api/login", LoginRoutes);
app.use("/api/courseRating", CourseRatingRoutes);
// Default response for any other request
app.use(function(req, res) {
  res.status(404);
});
