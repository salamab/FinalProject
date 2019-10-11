var express = require("express");
const router = express.Router();
var db = require("../database.js");

/** retreive all users
 *
 */

router.get("/", (req, res, next) => {
  var sql = "select * from user";
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

/** retreive one user by id
 *
 */
router.get("/:id", (req, res, next) => {
  var sql = "select * from user where User_ID = ?";
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

/**Create New user
 *
 */
router.post("/", (req, res, next) => {
  var errors = [];
  if (!req.body.User_Firstname) {
    errors.push("No password specified");
  }
  if (!req.body.User_Lastname) {
    errors.push("No email specified");
  }
  if (!req.body.User_Email) {
    errors.push("No email specified");
  }
  if (!req.body.User_Password) {
    errors.push("No email specified");
  }
  if (!req.body.User_Address) {
    errors.push("No email specified");
  }
  if (!req.body.User_Phone) {
    errors.push("No email specified");
  }
  if (!req.body.Role) {
    errors.push("No email specified");
  }
  if (!req.body.Certification_ID) {
    errors.push("No email specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  var data = {
    User_Firstname: req.body.User_Firstname,
    User_Lastname: req.body.User_Lastname,
    User_Email: req.body.User_Email,
    User_Password: req.body.User_Password,
    User_Address: req.body.User_Address,
    User_Phone: req.body.User_Phone,
    Role: req.body.Role,
    Certification_ID: req.body.Certification_ID
  };
  var sql =
    "INSERT INTO user (User_Firstname, User_Lastname, User_Email, User_Password, User_Address, User_Phone, Role, Certification_ID) VALUES (?,?,?,?,?,?,?,?)";
  var params = [
    data.User_Firstname,
    data.User_Lastname,
    data.User_Email,
    data.User_Password,
    data.User_Address,
    data.User_Phone,
    data.Role,
    data.Certification_ID
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

/** Update a user
 *
 */
router.patch("/:id", (req, res, next) => {
  var data = {
    User_Firstname: req.body.User_Firstname,
    User_Lastname: req.body.User_Lastname,
    User_Email: req.body.User_Email,
    User_Password: req.body.User_Password,
    User_Address: req.body.User_Address,
    User_Phone: req.body.User_Phone,
    Role: req.body.Role,
    Certification_ID: req.body.Certification_ID
  };
  console.log(data);
  db.run(
    `UPDATE user set 
           User_Firstname = COALESCE(?,User_Firstname),
           User_Lastname = COALESCE(?,User_Lastname),
           User_Email = COALESCE(?,User_Email), 
           User_Password = COALESCE(?,User_Password),
           User_Address = COALESCE(?,User_Address),
           User_Phone = COALESCE(?,User_Phone),
           Role = COALESCE(?,Role),
           Certification_ID = COALESCE(?,Certification_ID)
           WHERE Certification_ID = ?`,
    [
      data.User_Firstname,
      data.User_Lastname,
      data.User_Email,
      data.User_Password,
      data.User_Address,
      data.User_Phone,
      data.Role,
      data.Certification_ID,
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

/** delete one uder by id
 *
 */
router.delete("/:id", (req, res, next) => {
  console.log("here");
  db.run("DELETE FROM user WHERE User_ID = ?", req.params.id, function(
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
