const express = require("express");
const app = express();
const cors = require("cors");
const http = require('http');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

// get config vars
const config = dotenv.config();

// access config var
const SECRET_KEY = process.env.TOKEN_SECRET;

module.exports.generateAccessToken = function (req) {
    const token = jwt.sign(req, process.env.TOKEN_SECRET, { expiresIn: "240m" });
    return token;
}
module.exports.authenticateToken = (token, res, next) => {
    let result = null;
    jwt.verify(token, process.env.TOKEN_SECRET, (err, res) => {
        if (err) {
            result = {
                success: false,
                data: err
            }
        } else {
            result = {
                success: true,
                data: res
            }
        }
    })
    return result
}
module.exports.validateToken = async (token, res, next) => {
    let result = null;
    jwt.verify(token, process.env.TOKEN_SECRET, (err, res) => {
        if (err) {
            result = {
                success: false,
                message: err
            }
        } else {
            result = {
                success: true,
                message: {}
            }
        }
    })
    return result
}
module.exports.getTokenfromBearer = (authorization) => {
    const authHeader = authorization
    const token = authHeader && authHeader.split(' ')[1]
    return token
}

