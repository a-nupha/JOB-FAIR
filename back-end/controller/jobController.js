const mysql = require("mysql");
const db = require("../config/db")
const functions = require('../functions')
const fs = require('fs');
const { copyFileSync } = require("fs");
const util = require("util");
const moment = require('moment')

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

exports.listbyclient = async function (req, res) {
  const verifyToken = functions.authenticateToken(functions.getTokenfromBearer(req.header('authorization')));
  if (verifyToken.success) {

  } else {
    res.status(401).json({
      success: false,
      message: "Unauthorization"
    })
  }
}
exports.listbycontractor = async function (req, res) {
  const verifyToken = functions.authenticateToken(functions.getTokenfromBearer(req.header('authorization')));
  if (verifyToken.success) {

  } else {
    res.status(401).json({
      success: false,
      message: "Unauthorization"
    })
  }
}
exports.createJob = async function (req, res) {
  const verifyToken = functions.authenticateToken(functions.getTokenfromBearer(req.header('authorization')));
  const imageList = req.files.imageList;
  if (verifyToken.success && verifyToken.data.role == 'contractor') {
    const request = req.body
    const timeSlote = JSON.parse(request.timeSlot)
    // const typeJob = JSON.parse(request.typeJob)
    const checkTypeofAry = Array.isArray(imageList);
    const jobstartdate = `${timeSlote[0].startDate.split("-")[2]}-${timeSlote[0].startDate.split("-")[1]}-${timeSlote[0].startDate.split("-")[0]}`
    const jobenddate = `${timeSlote[timeSlote.length - 1].endDate.split("-")[2]}-${timeSlote[timeSlote.length - 1].endDate.split("-")[1]}-${timeSlote[timeSlote.length - 1].endDate.split("-")[0]}`

    try {
      let job = {
        job_name: request.jobTitle,
        job_desc: request.jobDetail,
        is_active: 1,
        job_address: request.jobAddress,
        job_type_list: request.typeJob,
        job_start_date: new Date(jobstartdate),
        job_end_date: new Date(jobenddate),
        client_owner_id: verifyToken.data.userid,
        remark: request.remark || ""
      }

      db.query = util.promisify(db.query);
      db.commit = util.promisify(db.commit);
      db.rollback = util.promisify(db.rollback);
      db.beginTransaction = util.promisify(db.beginTransaction);
      await db.beginTransaction();
      const insertJobResponse = await db.query('INSERT INTO jobs SET ?', job)
      const jobId = insertJobResponse.insertId
      let insertTimeSlot = [];
      for (const t of timeSlote) {
        let timeSlot = {
          ts_start_date: `${timeSlote[0].startDate.split("-")[2]}-${timeSlote[0].startDate.split("-")[1]}-${timeSlote[0].startDate.split("-")[0]}`,
          ts_end_date: `${timeSlote[0].endDate.split("-")[2]}-${timeSlote[0].endDate.split("-")[1]}-${timeSlote[0].endDate.split("-")[0]}`,
          job_id: jobId,
        }
        insertTimeSlot.push(timeSlot);
      }
      for (const t of insertTimeSlot) {
        await db.query('INSERT INTO job_time_slot SET ?', t)
      }

      if (!fs.existsSync(`./assets/uploads/job-${jobId}`)) {
        let files = req.files.imageList;
        let indexImg = 1;
        if (checkTypeofAry) {
          for (const f of files) {
            f.mv(`./assets/uploads/job-${jobId}/image-list/job-img-${indexImg}.jpg`);
            indexImg++
          }
        } else {
          files.mv(`./assets/uploads/job-${jobId}/image-list/job-img-${indexImg}.jpg`);
        }
      }
      await db.commit();
      res.status(200).json({ result: true })
    }
    catch (error) {
      await db.rollback();
      db.end();
      console.log("error --> ", error)
      res.status(500).json({ result: false, message: error });
    }
  } else {
    res.status(401).json({
      success: false,
      message: "Unauthorization"
    })
  }
}