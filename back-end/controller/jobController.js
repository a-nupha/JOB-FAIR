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
    // if (verifyToken.success && verifyToken.data.role == 'client') {
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

exports.insertInterestJob = async function (req, res) {
  const verifyToken = functions.authenticateToken(functions.getTokenfromBearer(req.header('authorization')));
  if (verifyToken.success && verifyToken.data.role == 'contractor') {
    try {
      const request = req.body;
      let jobInterest = {
        contractor_id: verifyToken.data.userid,
        job_id: request.job_id,
      }
      db.query = util.promisify(db.query);
      db.commit = util.promisify(db.commit);
      db.rollback = util.promisify(db.rollback);
      db.beginTransaction = util.promisify(db.beginTransaction);
      await db.beginTransaction();
      const insertJobInterestResponse = await db.query('INSERT INTO contractor_interest_job SET ?', jobInterest)
      const interestResponseId = insertJobInterestResponse.insertId
      console.log("interestResponseId --> ", interestResponseId)
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

exports.updateAproveInterestJob = async function (req, res) {
  const verifyToken = functions.authenticateToken(functions.getTokenfromBearer(req.header('authorization')));
  // if (verifyToken.success && verifyToken.data.role == 'client') {
  if (verifyToken.success && verifyToken.data.role == 'contractor') {
    try {
      const request = req.body;
      db.query = util.promisify(db.query);
      db.commit = util.promisify(db.commit);
      db.rollback = util.promisify(db.rollback);
      db.beginTransaction = util.promisify(db.beginTransaction);
      await db.beginTransaction();
      const updateContractInterestJob = await db.query(`UPDATE contractor_interest_job SET cj_approve = 1 where contractor_id = ${request.contractor_id} AND job_id = ${request.job_id}`)
      console.log("updateContractInterestJob --> ", updateContractInterestJob)
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

exports.getJobFromContractor = async function (req, res) {
  const verifyToken = functions.authenticateToken(functions.getTokenfromBearer(req.header('authorization')));
  if (verifyToken.success && verifyToken.data.role == 'contractor') {
    try {
      let jobsId = [];
      const jobs = await db.query('SELECT * FROM jobs ORDER BY create_date DESC')
      for (const j of jobs) {
        jobsId.push(j.job_id);
        let imageListAry = [];
        let imagePaymentList = [];
        if (fs.existsSync(`./assets/uploads/job-${j.job_id}`)) {
          const length = fs.readdirSync(`./assets/uploads/job-${j.job_id}/image-list`).length
          for (let i = 1; i <= length; i++) {
            const imgUrl = `${req.protocol}://${req.get('host')}/api/photos/${j.job_id}/job-img-${i}`
            imageListAry.push(imgUrl);
          }
        }
        j['imageList'] = imageListAry;
        if (fs.existsSync(`./assets/uploads/job-${j.job_id}/payment`)) {
          const length = fs.readdirSync(`./assets/uploads/job-${j.job_id}/payment`).length
          for (let i = 1; i <= length; i++) {
            const imgUrl = `${req.protocol}://${req.get('host')}/api/payment/photos/${j.job_id}/payment-img-${i}`
            imagePaymentList.push(imgUrl);
          }
        }
        j['paymentimageList'] = imagePaymentList;
      }

      let valueTimeSlot = `(${jobsId.join(',')})`
      const timeSlotes = await db.query(`SELECT * FROM job_time_slot where job_id in ${valueTimeSlot}`)
      for (const j of jobs) {
        j['timeSlot'] = timeSlotes.filter(x => x.job_id == j.job_id)
      }
      res.status(200).json({ result: true, data: jobs });
    } catch (err) {
      res.status(500).json({ result: false, message: err });
    }
  } else {
    res.status(401).json({
      success: false,
      message: "Unauthorization"
    })
  }
}

exports.getJobForClientWithInterestContractor = async function (req, res) {
  const verifyToken = functions.authenticateToken(functions.getTokenfromBearer(req.header('authorization')));
  // if (verifyToken.success && verifyToken.data.role == 'client') {
  if (verifyToken.success && verifyToken.data.role == 'contractor') {
    try {
      let jobsId = [];
      const jobs = await db.query(`SELECT * FROM jobs where client_owner_id = ${verifyToken.data.userid} ORDER BY create_date DESC`)
      for (const j of jobs) {
        jobsId.push(j.job_id);
        let imageListAry = [];
        let imagePaymentList = [];
        if (fs.existsSync(`./assets/uploads/job-${j.job_id}`)) {
          const length = fs.readdirSync(`./assets/uploads/job-${j.job_id}/image-list`).length
          for (let i = 1; i <= length; i++) {
            const imgUrl = `${req.protocol}://${req.get('host')}/api/photos/${j.job_id}/job-img-${i}`
            imageListAry.push(imgUrl);
          }
        }
        j['imageList'] = imageListAry;
        if (fs.existsSync(`./assets/uploads/job-${j.job_id}/payment`)) {
          const length = fs.readdirSync(`./assets/uploads/job-${j.job_id}/payment`).length
          for (let i = 1; i <= length; i++) {
            const imgUrl = `${req.protocol}://${req.get('host')}/api/payment/photos/${j.job_id}/payment-img-${i}`
            imagePaymentList.push(imgUrl);
          }
        }
        j['paymentimageList'] = imagePaymentList;
      }
      let valuesInterest = `(${jobsId.join(',')})`
      const interestesjob = jobsId.length > 0 ? await db.query(`SELECT * FROM contractor_interest_job where job_id in ${valuesInterest}`) : []

      for (const j of jobs) {
        j['contract_interest'] = interestesjob.filter(x => x.job_id == j.job_id)
      }
      res.status(200).json({ result: true, data: jobs });
    } catch (err) {
      res.status(500).json({ result: false, message: err });
    }
  } else {
    res.status(401).json({
      success: false,
      message: "Unauthorization"
    })
  }
}

exports.getJobListInterestContractor = async function (req, res) {
  const verifyToken = functions.authenticateToken(functions.getTokenfromBearer(req.header('authorization')));
  // if (verifyToken.success && verifyToken.data.role == 'client') {
  if (verifyToken.success && verifyToken.data.role == 'contractor') {
    try {
      let jobsId = [];
      const jobs = await db.query(`select * from jobs j inner join contractor_interest_job cj on j.job_id = cj.job_id where cj.contractor_id = ${verifyToken.data.userid} order by j.create_date desc;`)
      for (const j of jobs) {
        jobsId.push(j.job_id);
        let imageListAry = [];
        let imagePaymentList = [];
        if (fs.existsSync(`./assets/uploads/job-${j.job_id}`)) {
          const length = fs.readdirSync(`./assets/uploads/job-${j.job_id}/image-list`).length
          for (let i = 1; i <= length; i++) {
            const imgUrl = `${req.protocol}://${req.get('host')}/api/photos/${j.job_id}/job-img-${i}`
            imageListAry.push(imgUrl);
          }
        }
        j['imageList'] = imageListAry;
        if (fs.existsSync(`./assets/uploads/job-${j.job_id}/payment`)) {
          const length = fs.readdirSync(`./assets/uploads/job-${j.job_id}/payment`).length
          for (let i = 1; i <= length; i++) {
            const imgUrl = `${req.protocol}://${req.get('host')}/api/payment/photos/${j.job_id}/payment-img-${i}`
            imagePaymentList.push(imgUrl);
          }
        }
        j['paymentimageList'] = imagePaymentList;
      }

      let valueTimeSlot = `(${jobsId.join(',')})`
      const timeSlotes = jobsId.length > 0 ? await db.query(`SELECT * FROM job_time_slot where job_id in ${valueTimeSlot}`) : []
      for (const j of jobs) {
        j['timeSlot'] = timeSlotes.filter(x => x.job_id == j.job_id)
      }
      res.status(200).json({ result: true, data: jobs });
    }
    catch (err) {
      res.status(500).json({ result: false, message: err });
    }
  } else {
    res.status(401).json({
      success: false,
      message: "Unauthorization"
    })
  }
}

exports.getJobIsApproved = async function (req, res) {
  const verifyToken = functions.authenticateToken(functions.getTokenfromBearer(req.header('authorization')));
  // if (verifyToken.success && verifyToken.data.role == 'client') {
  if (verifyToken.success && verifyToken.data.role == 'contractor') {
    try {
      let jobsId = [];
      const jobs = await db.query(`select * from jobs j inner join contractor_interest_job cj on j.job_id = cj.job_id where cj.contractor_id = ${verifyToken.data.userid} AND cj.cj_approve = 1 order by j.create_date desc;`)
      for (const j of jobs) {
        jobsId.push(j.job_id);
        let imageListAry = [];
        let imagePaymentList = [];
        if (fs.existsSync(`./assets/uploads/job-${j.job_id}`)) {
          const length = fs.readdirSync(`./assets/uploads/job-${j.job_id}/image-list`).length
          for (let i = 1; i <= length; i++) {
            const imgUrl = `${req.protocol}://${req.get('host')}/api/photos/${j.job_id}/job-img-${i}`
            imageListAry.push(imgUrl);
          }
        }
        j['imageList'] = imageListAry;
        if (fs.existsSync(`./assets/uploads/job-${j.job_id}/payment`)) {
          const length = fs.readdirSync(`./assets/uploads/job-${j.job_id}/payment`).length
          for (let i = 1; i <= length; i++) {
            const imgUrl = `${req.protocol}://${req.get('host')}/api/payment/photos/${j.job_id}/payment-img-${i}`
            imagePaymentList.push(imgUrl);
          }
        }
        j['paymentimageList'] = imagePaymentList;
      }

      let valueTimeSlot = `(${jobsId.join(',')})`
      const timeSlotes = jobsId.length > 0 ? await db.query(`SELECT * FROM job_time_slot where job_id in ${valueTimeSlot}`) : []
      for (const j of jobs) {
        j['timeSlot'] = timeSlotes.filter(x => x.job_id == j.job_id)
      }
      res.status(200).json({ result: true, data: jobs });
    }
    catch (err) {
      res.status(500).json({ result: false, message: err });
    }
  } else {
    res.status(401).json({
      success: false,
      message: "Unauthorization"
    })
  }
}

exports.getJobFromClient = async function (req, res) {
  const verifyToken = functions.authenticateToken(functions.getTokenfromBearer(req.header('authorization')));
  if (verifyToken.success && verifyToken.data.role == 'contractor') {
  // if (verifyToken.success && verifyToken.data.role == 'client') {
    try {
      let jobsId = [];
      const jobs = await db.query(`SELECT * FROM jobs where client_owner_id = ${verifyToken.data.userid} ORDER BY create_date DESC`)
      for (const j of jobs) {
        jobsId.push(j.job_id);
        let imageListAry = [];
        let imagePaymentList = [];
        if (fs.existsSync(`./assets/uploads/job-${j.job_id}`)) {
          const length = fs.readdirSync(`./assets/uploads/job-${j.job_id}/image-list`).length
          for (let i = 1; i <= length; i++) {
            const imgUrl = `${req.protocol}://${req.get('host')}/api/photos/${j.job_id}/job-img-${i}`
            imageListAry.push(imgUrl);
          }
        }
        j['imageList'] = imageListAry;

        if (fs.existsSync(`./assets/uploads/job-${j.job_id}/payment`)) {
          const length = fs.readdirSync(`./assets/uploads/job-${j.job_id}/payment`).length
          for (let i = 1; i <= length; i++) {
            const imgUrl = `${req.protocol}://${req.get('host')}/api/payment/photos/${j.job_id}/payment-img-${i}`
            imagePaymentList.push(imgUrl);
          }
        }
        j['paymentimageList'] = imagePaymentList;
      }

      let valueTimeSlot = `(${jobsId.join(',')})`
      const timeSlotes = await db.query(`SELECT * FROM job_time_slot where job_id in ${valueTimeSlot}`)
      for (const j of jobs) {
        j['timeSlot'] = timeSlotes.filter(x => x.job_id == j.job_id)
      }
      res.status(200).json({ result: true, data: jobs });
    } catch (err) {
      res.status(500).json({ result: false, message: err });
    }
  } else {
    res.status(401).json({
      success: false,
      message: "Unauthorization"
    })
  }
}