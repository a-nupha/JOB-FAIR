const express = require("express");
const mysql = require("mysql");
const db = require("../config/db")
const functions = require('../functions')
const util = require("util");

exports.insertClient = async function (req, res) {
    return new Promise(function (resolve, reject) {
        let contractor = {
            ci_idcard: req.idcard,
            ci_name: req.name,
            ci_surname: req.surname,
            ci_phone_no: req.phone_no,
            ci_addr_hno: req.addr_hno,
            ci_addr_txt: req.addr_txt,
            ci_addr_province: req.addr_province,
            ci_addr_subdistrict: req.addr_subdistrict,
            ci_addr_district: req.addr_district,
            ci_addr_zipcode: req.addr_zipcode,
            ci_email: req.email,
            ci_birthdate: req.birthdate,
            user_id: req.userId,
            update_by: req.userId,
        }
        let response = {};
        let index = 1;
        let ary_result = []
        let columnstring = ``;
        let valuesstring = ``;
        for (const c in contractor) {
            let str_column = index == 1 ? `${c}` : `,${c}`
            let str_value = index == 1 ? `?` : `,?`
            columnstring += str_column
            valuesstring += str_value
            ary_result.push(contractor[`${c}`]);
            index++
        }

        try {
            let sql = `INSERT INTO client_info 
                ( ${columnstring} )
                  VALUES
                ( ${valuesstring} )`;

            db.query(sql, ary_result, function (err, data) {
                if (err) {
                    reject({ success: false, data: err });
                } else {
                    resolve({ success: true, data: data })
                }
            });
        } catch (e) {
            reject({ success: false, data: {} })
        }
    })
}
exports.approveUser = async function (req, res) {
    const verifyToken = functions.authenticateToken(functions.getTokenfromBearer(req.header('authorization')));
    if (verifyToken.success && verifyToken.data.role == "admin") {
        const request = req.body
        try {
            db.query = util.promisify(db.query);
            db.commit = util.promisify(db.commit);
            db.rollback = util.promisify(db.rollback);
            db.beginTransaction = util.promisify(db.beginTransaction);
            await db.beginTransaction();
            const sqlUpdateContract = `update contractor_info set ct_approve_status = 1,ci_status = 1 where user_id = ${request.userId}`
            const sqlUpdateClient = `update client_info set ci_approve_status = 1, ci_status = 1 where user_id = ${request.userId}`
            const updateContractor = await db.query(sqlUpdateContract);
            const updateClient = await db.query(sqlUpdateClient);
            await db.commit();
            if (updateContractor.affectedRows != 0 || updateClient.affectedRows != 0) {
                res.status(200).send({ result: true, message: 'Approve successfully ! .' });
            } else {
                res.status(400).send({ result: false, message: 'Not Found UserId ! .' });
            }
        } catch (err) {
            await db.rollback();
            db.end();
            res.status(400).send({ result: false, message: err });
        }
    } else {
        res.status(401).json({
            success: false,
            message: "Unauthorization"
        })
    }
}
