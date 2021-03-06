var express = require("express");
const router = express.Router();
var db = require("../database.js");

// Below all the crud that are related in the Certification table

/** rereive all User_Certification
 *
 */
router.get("/", (req, res, next) => {
  var sql = "select * from User_Certification";
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

/** retreive one User_Certification by id
 *
 */

router.get("/:id", (req, res, next) => {
  var sql =
    "select * from User_Certification where User_ID OR Certification_ID = ?";
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

/**Create New User_Certification
 *
 */
router.post("/:User_ID", (req, res, next) => {
  console.log("here");
  var errors = [];
  var data = {
    User_ID: req.params.User_ID,
    Certification_ID: req.body
  };
  console.log(data);
  try {
    data.Certification_ID.map(async item => {
      var sql =
        "INSERT INTO User_Certification (User_ID, Certification_ID) VALUES (?,?)";
      var params = [data.User_ID, item];
      await db.run(sql, params, function(err, result) {
        if (err) {
          console.log(err);
          return;
        }
      });
    });
    res.json({
      message: "success"
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

/** Update a User_Certification by id
 *
 */
router.patch("/:id", (req, res, next) => {
  var data = {
    User_ID: req.body.User_ID,
    Certification_ID: req.body.Certification_ID
  };
  console.log(data);
  db.run(
    `UPDATE User_Certification set
             User_ID = COALESCE(?,User_ID),
             Certification_ID = COALESCE(?,Certification_ID)
            WHERE Certification_ID = ? OR User_ID = ?`,
    [data.User_ID, data.Certification_ID, req.params.id],
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
    "DELETE FROM Certification WHERE User_ID OR Certification_ID = ?",
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
