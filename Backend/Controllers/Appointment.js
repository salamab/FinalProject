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
  var errors = [];
  if (!req.body.Appointment_Date) {
    errors.push("No password specified");
  }
  if (!req.body.Status) {
    errors.push("No password specified");
  }
  if (!req.body.Student_ID) {
    errors.push("No password specified");
  }
  if (!req.body.Language_Course_ID) {
    errors.push("No password specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  var data = {
    Appointment_Date: req.body.Appointment_Date,
    Status: req.body.Status,
    Student_ID: req.body.Student_ID,
    Language_Course_ID: req.body.Language_Course_ID
  };
  console.log(data);
  var sql =
    "INSERT INTO Appointment (Appointment_Date, Status, Student_ID, Language_Course_ID) VALUES (?,?,?,?)";
  var params = [
    data.Appointment_Date,
    data.Status,
    data.Student_ID,
    data.Language_Course_ID
  ];
  db.run(sql, params, function(err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data,
      id: this.lastID
    });
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
