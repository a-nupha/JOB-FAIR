const express = require("express");
const app = express();
const mysql = require("mysql");
const db = require("../config/db")
const crypto = require('crypto');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const functions = require('../functions')
const config = dotenv.config();
const algorithm = process.env.ALGORITHM;
const key = process.env.SECRET_KEY;

exports.getUsers = async function (req, res) {
  const verifyToken = functions.authenticateToken(functions.getTokenfromBearer(req.header('authorization')));
  if (verifyToken.success) {
    db.query("SELECT * FROM user", (err, result) => {
      if (err) {
        res.status(500).json(err)
      } else {
        res.status(200).json(result)
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Unauthorization"
    })
  }
};