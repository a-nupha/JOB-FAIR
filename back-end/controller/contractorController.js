const express = require("express");
const mysql = require("mysql");
const db = require("../config/db")
const functions = require('../functions')
const connection = db.connection;

exports.insertContractor = async function (req) {
    return new Promise(function (resolve, reject) {
        let contractor = {
            ct_idcard: req.idcard,
            ct_name: req.name,
            ct_surname: req.surname,
            ct_phone_no: req.phone_no,
            ct_addr_hno: req.addr_hno,
            ct_addr_txt: req.addr_txt,
            ct_addr_province: req.addr_province,
            ct_addr_subdistrict: req.addr_subdistrict,
            ct_addr_district: req.addr_district,
            ct_addr_zipcode: req.addr_zipcode,
            ct_email: req.email,
            ct_birthdate: req.birthdate,
            ct_profile_title: req.profile_title,
            ct_certificate_list: req.certificate_list,
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
            let sql = `INSERT INTO contractor_info 
                ( ${columnstring} )
                  VALUES
                ( ${valuesstring} )`;

            connection.query(sql, ary_result, function (err, data) {
                if (err) {
                    reject({ success: false, data: err })
                } else {
                    resolve({ success: true, data: data })
                }
            });
        } catch (e) {
            resolve({ success: false, data: {} })
        }
    })
}