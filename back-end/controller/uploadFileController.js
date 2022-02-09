const mysql = require("mysql");
const db = require("../config/db")
const functions = require('../functions')
const fs = require('fs');
const { copyFileSync } = require("fs");
const util = require("util");
const moment = require('moment')

exports.getphoto = async function (req, res) {
    const verifyToken = functions.authenticateToken(functions.getTokenfromBearer(req.header('authorization')));
    // if (verifyToken.success) {
    if (true) {
        const jobid = req.params.jobid;
        const name = req.params.name;
        const contents = fs.readFileSync(`./assets/uploads/job-${jobid}/image-list/${name}.jpg`, { encoding: 'base64' });
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.end(contents, 'Base64');
    } else {
        res.status(401).json({
            success: false,
            message: "Unauthorization"
        })
    }
};

exports.getpaymentphoto = async function (req, res) {
    const verifyToken = functions.authenticateToken(functions.getTokenfromBearer(req.header('authorization')));
    // if (verifyToken.success) {
    if (true) {
        const jobid = req.params.jobid;
        const name = req.params.name;
        const contents = fs.readFileSync(`./assets/uploads/job-${jobid}/payment/${name}.jpg`, { encoding: 'base64' });
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.end(contents, 'Base64');
    } else {
        res.status(401).json({
            success: false,
            message: "Unauthorization"
        })
    }
};


exports.uploadPaymentImage = async function (req, res) {
    const verifyToken = functions.authenticateToken(functions.getTokenfromBearer(req.header('authorization')));
    const imageList = req.files.files;
    if (verifyToken.success) {
        const request = req.body
        const checkTypeofAry = Array.isArray(imageList);
        const jobId = request.job_id
        if (!fs.existsSync(`./assets/uploads/job-${jobId}/payment`)) {
            let indexImg = 1;
            if (checkTypeofAry) {
                for (const f of imageList) {
                    f.mv(`./assets/uploads/job-${jobId}/payment/payment-img-${indexImg}.jpg`);
                    indexImg++
                }
            } else {
                imageList.mv(`./assets/uploads/job-${jobId}/payment/payment-img-${indexImg}.jpg`);
            }
            res.status(200).json({ result: true })
        } else {
            res.status(400).json({ result: false, message: "Image is already have !" })
        }
    } else {
        res.status(401).json({
            success: false,
            message: "Unauthorization"
        })
    }
};

