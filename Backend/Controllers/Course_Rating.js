var express = require("express");
const router = express.Router();
var db = require("../database.js");

// Below all the crud that are related in the Appointment table

/** rereive all Courses that affected by the Rating
 *
 */
router.get("/", (req, res, next) => {
  var sql = "select * from Course_Rating";
  var params = [];
  //   console.log(params);
  console.log("params");
  db.all(sql, params, (err, rows) => {
    console.log("rows", rows);
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
/** retreive one Course_Rating by id
 *
 */

router.get("/:id", (req, res, next) => {
  var sql = "select * from Course_Rating where Course_Rating_ID = ?";
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

/**Create New Course_Rating
 *
 */
router.post("/", (req, res, next) => {
  var errors = [];
  if (!req.body.Comment) {
    errors.push("No password specified");
  }
  if (!req.body.Rating) {
    errors.push("No password specified");
  }
  if (!req.body.Language_Course_ID) {
    errors.push("No password specified");
  }
  if (!req.body.User_ID) {
    errors.push("No password specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  var data = {
    Comment: req.body.Comment,
    Rating: req.body.Rating,
    Language_Course_ID: req.body.Language_Course_ID,
    User_ID: req.body.User_ID
  };
  console.log(data);
  var sql =
    "INSERT INTO Course_Rating (Comment, Rating, Language_Course_ID, User_ID) VALUES (?,?,?,?)";
  var params = [
    data.Comment,
    data.Rating,
    data.Language_Course_ID,
    data.User_ID
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

/** Update a course Rating
 *
 */
router.patch("/:id", (req, res, next) => {
  var data = {
    Comment: req.body.Comment,
    Rating: req.body.Rating,
    Language_Course_ID: req.body.Language_Course_ID,
    User_ID: req.body.User_ID
  };
  console.log(data);
  db.run(
    `UPDATE Course_Rating set 
                Comment = COALESCE(?,Comment),
                Rating = COALESCE(?,Rating),
                Language_Course_ID = COALESCE(?,Language_Course_ID),
                User_ID = COALESCE(?,User_ID)
              WHERE Course_Rating_ID = ?`,
    [
      data.Comment,
      data.Rating,
      data.Language_Course_ID,
      data.User_ID,
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
/** delete one Course_Rating by id
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
