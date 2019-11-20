var express = require("express");
const router = express.Router();
var db = require("../database.js");


router.get("/", (req, res, next) => {
  var sql = `select user.User_ID from user where User_Email = '${req.query.User_Email}' and User_Password = '${req.query.User_Password}'`;
  console.log(sql)
  var params = [];
  db.all(sql, params, (err, rows) => {
    console.log(err)
    if (err) {
      res.status(400).json({ success:false, message: err.message });
      return;
    }
    if(rows.length===0){
      res.status(400).json({ success:false, message: 'Incorrect email or password' });
      return;
    }
    res.json({
      success: true,
      data: rows[0].User_ID
    });
  });
}); 
export default router;


