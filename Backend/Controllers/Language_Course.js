var express = require("express");
const router = express.Router();
var db = require("../database.js");

// Below all the crud that are related in the Language_Course table

/** rereive all Language_Courses
 *
 */
router.get("/", (req, res, next) => {
  var sql = "select * from Language_Course";
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
/** retreive one Language_Course by id
 *
 */

router.get("/:id", (req, res, next) => {
  var sql = "select * from Language_Course where Language_Course_ID = ?";
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

/**Create New Language_Course
 *
 */
router.post("/", (req, res, next) => {
  var errors = [];
  if (!req.body.Hour_Price) {
    errors.push("No password specified");
  }
  if (!req.body.Languages_ID) {
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
    Hour_Price: req.body.Hour_Price,
    Languages_ID: req.body.Languages_ID,
    User_ID: req.body.User_ID
  };
  var sql =
    "INSERT INTO Language_Course (Hour_Price, Languages_ID, User_ID) VALUES (?,?,?)";
  var params = [data.Hour_Price, data.Languages_ID, data.User_ID];
  console.log(params);
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

/** Update a Language_Course
 *
 */
router.patch("/:id", (req, res, next) => {
  var data = {
    Hour_Price: req.body.Hour_Price,
    Languages_ID: req.body.Languages_ID,
    User_ID: req.body.User_ID
  };
  console.log(data);
  db.run(
    `UPDATE Language_Course set 
             Hour_Price = COALESCE(?,Hour_Price),
             Languages_ID = COALESCE(?,Languages_ID),
             User_ID = COALESCE(?,User_ID)
            WHERE Languages_ID = ?`,
    [data.Hour_Price, data.Languages_ID, data.User_ID, req.params.id],
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
/** delete one Course by id
 *
 */
router.delete("/:id", (req, res, next) => {
  console.log("here");
  db.run(
    "DELETE FROM Language_Course WHERE Language_Course_ID = ?",
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
