
const dotenv = require('dotenv');
const db = require("./config/db")
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

module.exports.checkIsDupicateUser = async function (request) {
    return new Promise(function (resolve, reject) {
        try {
            let sql = `select * from (SELECT user_name as t FROM user UNION 
                SELECT ct_idcard as t FROM contractor_info UNION 
                SELECT ci_idcard as t FROM client_info ) as g 
                where g.t = '${request.username}' OR g.t = '${request.idcard}'`

            db.query(sql, function (err, res) {
                if (err) {
                    reject({ result: false, data: err })
                } else {
                    if (res.length > 0) {
                        resolve({ result: true, data: res })
                    } else {
                        resolve({ result: false, data: res })
                    }
                }
            });
        } catch (e) {
            resolve({ result: false, data: {} })
        }
    })

}