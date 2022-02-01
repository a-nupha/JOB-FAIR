const express = require("express");
const app = express();
const mysql = require("mysql");
const db = require("../config/db")
const crypto = require('crypto');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const functions = require('../functions')
const contractorController = require('../controller/contractorController')
const clientController = require('../controller/clientController');
const { copyFileSync } = require("fs");
const util = require("util");

// const connection = db.connection;
const config = dotenv.config();
const algorithm = process.env.ALGORITHM;
const key = process.env.SECRET_KEY;

exports.insertUsers = async function (req, res) {
  const request = req.body
  try {
    let password = request.user_pwd;
    let cipher = crypto.createCipher(algorithm, key);
    let encrypted = cipher.update(password, 'utf8', 'hex') + cipher.final('hex');
    let user = {
      user_name: request.user_name,
      user_pwd: encrypted,
      user_role: request.user_role
    }

    const checkIsDupicate = await functions.checkIsDupicateUser({
      username: request.user_name,
      idcard: request.idcard,
    })

    if (checkIsDupicate.result) {
      res.status(400).send({
        success: false,
        data: {},
        message: "Username or Card ID is dupicate!"
      });
      return;
    }

    let insertUser = null
    let sql = `INSERT INTO user ( user_name, user_pwd, user_role ) VALUES ( ?, ?, ? )`;

    db.query = util.promisify(db.query);
    db.commit = util.promisify(db.commit);
    db.rollback = util.promisify(db.rollback);
    db.beginTransaction = util.promisify(db.beginTransaction);
    await db.beginTransaction();
    const userRole = request.user_type == 1 ? "admin" : request.user_type == 2 ? "contractor" : "client"
    const insertUserResponse = await db.query(sql, [user.user_name, user.user_pwd, userRole]);

    request['userId'] = insertUserResponse.insertId;
    console.log("request --> ", request)
    if (request.user_type == 2) {
      insertUser = await contractorController.insertContractor(request)
    } else if (request.user_type == 3) {
      insertUser = await clientController.insertClient(request)
    } else if (request.user_type == 1) {
      insertUser = { success: true, data: {} }
    }

    console.log("insertUser --> ", insertUser)
    if (insertUser.success) {
      res.status(200).send({ result: true, message: 'insert successfully !.' });
    } else {
      res.status(400).send({ result: false, message: 'insert unsuccessfully !.' });
    }
    await db.commit();

  } catch (err) {
    await db.rollback();
    db.end();
    console.log("err --> ", err);
    res.status(500);
    res.json({ result: false, message: err });
  }
};

exports.logIn = async function (req, res) {
  const request = req.body;
  db.query(`SELECT u.* FROM user u 
            left join contractor_info ct on u.user_id = ct.user_id
            left join client_info ci on u.user_id = ci.user_id
            where u.user_name = '${request.username}' AND (ct.ci_status = 1 || ci.ci_status = 1)`, (err, result) => {
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