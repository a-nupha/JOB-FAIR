const express = require("express");
const app = express();
const mysql = require("mysql");
const db = require("../config/db")
const crypto = require('crypto');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const functions = require('../functions')
const contractorController = require('../controller/contractorController')
const clientController = require('../controller/clientController')

const connection = db.connection;
const config = dotenv.config();
const algorithm = process.env.ALGORITHM;
const key = process.env.SECRET_KEY;

exports.insertUsers = async function (req, res) {
  const request = req.body
  let password = request.user_pwd;
  let cipher = crypto.createCipher(algorithm, key);
  let encrypted = cipher.update(password, 'utf8', 'hex') + cipher.final('hex');
  let user = {
    // user_id: 5,
    user_name: request.user_name,
    user_pwd: encrypted,
    user_role: request.user_role
  }

  let sql = `INSERT INTO user 
            ( user_name, user_pwd, user_role )
              VALUES
            ( ?, ?, ? )`;

  connection.query(sql, [user.user_name, user.user_pwd, user.user_role], async function (err, data) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      let insertUser = null
      const userId = data.insertId
      request['userId'] = userId;
      if (request.user_type == 2) {
        insertUser = await contractorController.insertContractor(request)
      } else if (request.user_type == 3) {
        insertUser = await clientController.insertClient(request)
      }

      if (insertUser.success) {
        res.status(200).send(insertUser);
      } else {
        res.status(400).send({});
      }
    }
  });
};

exports.logIn = async function (req, res) {
  const request = req.body;
  connection.query(`SELECT * FROM user u WHERE u.user_name = '${request.username}'`, (err, result) => {
    if (err) {
      res.status(500).json(err)
    } else {
      if (result.length > 0) {
        const password = result[0].user_pwd
        let decipher = crypto.createDecipher(algorithm, key);
        let decrypted = decipher.update(password, 'hex', 'utf8') + decipher.final('utf8');
        if (request.password == decrypted) {
          const user = result[0]
          let verifyToken = {
            userid: user.user_id,
            username: user.user_name,
            role: user.user_role
          }
          const token = functions.generateAccessToken(verifyToken);
          res.status(200).json({
            status: true,
            data: result[0],
            token: token,
            message: "Success"
          })
        } else {
          res.status(400).json({
            status: false,
            data: {},
            message: "Password incurrect !"
          })
        }
      } else {
        res.status(400).json({
          status: false,
          data: {},
          message: "Not found username !"
        })
      }
    }
  });
}

module.exports.insertUsers;