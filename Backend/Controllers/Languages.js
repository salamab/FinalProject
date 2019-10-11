var express = require("express");
const router = express.Router();
var db = require("../database.js");

// Below all the crud that are related in the Languages table

/** rereive all Languages
 *
 */
router.get("/", (req, res, next) => {
  var sql = "select * from Languages";
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
/** retreive one laguage by id
 *
 */

router.get("/:id", (req, res, next) => {
  var sql = "select * from Languages where Languages_ID = ?";
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

/**Create New laguage
 *
 */
router.post("/", (req, res, next) => {
  var errors = [];
  if (!req.body.Languages_Name) {
    errors.push("No password specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  var data = {
    Languages_Name: req.body.Languages_Name
  };
  var sql = "INSERT INTO Languages (Languages_Name) VALUES (?)";
  var params = [data.Languages_Name];
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

/** Update a language
 *
 */
router.patch("/:id", (req, res, next) => {
  var data = {
    Languages_Name: req.body.Languages_Name
  };
  console.log(data);
  db.run(
    `UPDATE Languages set 
             Languages_Name = COALESCE(?,Languages_Name)
            WHERE Languages_ID = ?`,
    [data.Languages_Name, req.params.id],
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
/** delete one Language by id
 *
 */
router.delete("/:id", (req, res, next) => {
  console.log("here");
  db.run(
    "DELETE FROM Languages WHERE Languages_ID = ?",
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
