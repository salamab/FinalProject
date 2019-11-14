var express = require("express");
const router = express.Router();
var db = require("../database.js");




router.get("/", (req, res, next) => {
    var sql = "select User_Firstname,User_Lastname,Hour_Price,User_Email from user inner JOIN Language_Course on user.User_ID = Language_Course.User_ID inner JOIN Course_Rating on Course_Rating.Language_Course_ID = Language_Course.Language_Course_ID";
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