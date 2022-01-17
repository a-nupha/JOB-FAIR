const mysql = require("mysql");
const db = require("../config/db")
const connection = db.connection;

exports.getJobs = async function (req, res) {
  connection.query("SELECT * FROM jobs", (err, result) => {
    if (err) {
      res.status(500).json(err)
    } else {
      res.status(200).json(result)
    }
  });
};