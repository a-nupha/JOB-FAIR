const mysql = require("mysql");
const db = require("../config/db")
const functions = require('../functions')

exports.getJobs = async function (req, res) {
  const verifyToken = functions.authenticateToken(functions.getTokenfromBearer(req.header('authorization')));
  if (verifyToken.success) {
    db.query("SELECT * FROM jobs", (err, result) => {
      if (err) {
        res.status(500).json({ data: err })
      } else {
        res.status(200).json({ data: result })
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Unauthorization"
    })
  }
};