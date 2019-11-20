var express = require("express");
const router = express.Router();
var db = require("../database.js");

// Below all the crud that are related in the Appointment table

/** rereive all Appointments
 *
 */
router.get("/", (req, res, next) => {
  var sql = "select * from Appointment";
  var params = [];
  console.log(params);
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows
    });
  });
});
/** retreive one Appointment by id
 *
 */

router.get("/:id", (req, res, next) => {
  var sql = "select * from Appointment where Appointment_ID = ?";
  var params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row
    });
  });
});

/**Create New Appointment
 *
 */
router.post("/", (req, res, next) => {
  console.log("i am here", req.body)
  var errors = [];
  if (!req.body.date) {
    errors.push("No Appointment_Date specified");
  }
  if (!req.body.user_id) {
    errors.push("No Student_ID specified");
  }
  if (!req.body.language_course_id) {
    errors.push("No Language_Course_ID specified");
  }
  if (!req.body.startTime) {
    errors.push("No startTime specified");
  }
  if (!req.body.endTime) {
    errors.push("No endTime specified");
  }
  if (errors.length) {
    console.log("ooops")
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  var data = {
    Appointment_Date: req.body.date,
    Student_ID: req.body.user_id,
    Language_Course_ID: req.body.language_course_id,
    startTime: req.body.startTime,
    endTime: req.body.endTime
  };
  console.log(data);
  var sql =
    "INSERT INTO Appointment (Appointment_Date, User_ID, Language_Course_ID,startTime, endTime) VALUES (?,?,?,?,?)";
  var params = [
    data.Appointment_Date,
    data.Student_ID,
    data.Language_Course_ID,
    data.startTime,
    data.endTime
  ];
  db.run(sql, params, function(err, result) {
    if (err) {
      console.log(err)
      res.status(400).json({ error: err.message });
      return;
    }
    else{
      console.log(this.lastID)
    res.json({
      message: "success",
      data: data,
      id: this.lastID
    });
  }
  });
});

/** Update an Appointment
 *
 */
router.patch("/:id", (req, res, next) => {
  var data = {
    Appointment_Date: req.body.Appointment_Date,
    Status: req.body.Status,
    Student_ID: req.body.Student_ID,
    Language_Course_ID: req.body.Language_Course_ID
  };
  console.log(data);
  db.run(
    `UPDATE Languages set 
                Appointment_Date = COALESCE(?,Appointment_Date),
                Status = COALESCE(?,Status),
                Student_ID = COALESCE(?,Student_ID),
                Language_Course_ID = COALESCE(?,Language_Course_ID),
              WHERE Languages_ID = ?`,
    [
      data.Appointment_Date,
      data.Status,
      data.Student_ID,
      data.Language_Course_ID,
      req.params.id
    ],
    function(err, result) {
      if (err) {
        console.log(err);
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({
        message: "success",
        data: data,
        changes: this.changes
      });
    }
  );
});
/** delete one Appointment by id
 *
 */
router.delete("/:id", (req, res, next) => {
  console.log("here");
  db.run(
    "DELETE FROM Appointment WHERE Appointment_ID = ?",
    req.params.id,
    function(err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({ message: "deleted", changes: this.changes });
    }
  );
});
export default router;
