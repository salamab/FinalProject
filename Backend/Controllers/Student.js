var express = require("express");
const router = express.Router();
var db = require("../database.js");

// Below all the crud that are related in the student table
/** rereive all students
 *
 */

router.get("/", (req, res, next) => {
  var sql = "select * from Student";
  var params = [];
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

/** retreive one student by id
 *
 */

router.get("/:id", (req, res, next) => {
  var sql = "select * from Student where Student_ID = ?";
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

/**Create New student
 *
 */
router.post("/", (req, res, next) => {
  var errors = [];
  if (!req.body.Student_Certification) {
    errors.push("No password specified");
  }
  if (!req.body.User_ID) {
    errors.push("No email specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  var data = {
    Student_Certification: req.body.Student_Certification,
    User_ID: req.body.User_ID
  };
  var sql = "INSERT INTO Student (Student_Certification, User_ID) VALUES (?,?)";
  var params = [data.Student_Certification, data.User_ID];
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

/** Update a Student
 *
 */
router.patch("/:id", (req, res, next) => {
  var data = {
    Student_Certification: req.body.Student_Certification,
    User_ID: req.body.User_ID
  };
  console.log(data);
  db.run(
    `UPDATE Student set 
             Student_Certification = COALESCE(?,Student_Certification),
             User_ID = COALESCE(?,User_ID)
            WHERE Student_ID = ?`,
    [data.Student_Certification, data.User_ID, req.params.id],
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
/** delete one Student by id
 *
 */
router.delete("/:id", (req, res, next) => {
  console.log("here");
  db.run("DELETE FROM Student WHERE User_ID = ?", req.params.id, function(
    err,
    result
  ) {
    if (err) {
      res.status(400).json({ error: res.message });
      return;
    }
    res.json({ message: "deleted", changes: this.changes });
  });
});
export default router;
