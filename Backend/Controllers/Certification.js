var express = require("express");
const router = express.Router();
var db = require("../database.js");

// Below all the crud that are related in the Certification table

/** rereive all Certifications
 *
 */
router.get("/", (req, res, next) => {
  var sql = "select * from Certification";
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
/** retreive one Certification by id
 *
 */

router.get("/:id", (req, res, next) => {
  var sql = "select * from Certification where Certification_ID = ?";
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

/**Create New Certification
 *
 */
router.post("/", (req, res, next) => {
  var errors = [];
  //   if (!req.body.Certification_ID) {
  //     errors.push("No Certification_ID specified");
  //   }
  if (!req.body.Certification_Name) {
    errors.push("No Certification specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  var data = {
    // Certification_ID: req.body.Certification_ID,
    Certification_Name: req.body.Certification_Name
  };
  //   console.log(data);
  var sql = "INSERT INTO Certification (Certification_Name) VALUES (?)";
  var params = [data.Certification_Name];

  //   console.log(params);
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

/** Update a Certification
 *
 */
router.patch("/:id", (req, res, next) => {
  var data = {
    Certification_Name: req.body.Certification_Name
  };
  console.log(data);
  db.run(
    `UPDATE Certification set 
             Certification_Name = COALESCE(?,Certification_Name)
            WHERE Certification_ID = ?`,
    [data.Certification_Name, req.params.id],
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
/** delete one Certification by id
 *
 */
router.delete("/:id", (req, res, next) => {
  console.log("here");
  db.run(
    "DELETE FROM Certification WHERE Certification_ID = ?",
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
