const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const util = require("util");

const db = require("../config/db");


router
  .route("/booking?")
  .get((req, res) => {
    db.query("SELECT * FROM booking_data", function (err, result, fields) {
      if (err) throw err;
      res.json(result);
    });
  })
  .post((req, res) => {
    try {
      let insertResult = {
        result: true,
        message: "",
      };
      (async () => {
        try {
          const customerData = {
            CUS_NAME: req.body.CUSTOMER_DATA.CUS_NAME,
            CUS_LASTNAME: req.body.CUSTOMER_DATA.CUS_LASTNAME,
            CUS_BIRTHDATE: req.body.CUSTOMER_DATA.CUS_BIRTHDATE,
            CUS_IDCARD: req.body.CUSTOMER_DATA.CUS_IDCARD,
            CUS_PASSPORT: req.body.CUSTOMER_DATA.CUS_PASSPORT,
            CUS_SEX: req.body.CUSTOMER_DATA.CUS_SEX,
            CUS_TEL: req.body.CUSTOMER_DATA.CUS_TEL,
            CUS_EMAIL: req.body.CUSTOMER_DATA.CUS_EMAIL,
            ADDR_DESC: req.body.CUSTOMER_DATA.ADDR_DESC,
            ADDR_PROVINCE: req.body.CUSTOMER_DATA.ADDR_PROVINCE,
            ADDR_DISTRICT: req.body.CUSTOMER_DATA.ADDR_DISTRICT,
            ADDR_SUBDISTRICT: req.body.CUSTOMER_DATA.ADDR_SUBDISTRICT,
            ADDR_ZIPCODE: req.body.CUSTOMER_DATA.ADDR_ZIPCODE,
          };
          db.query = util.promisify(db.query);
          db.commit = util.promisify(db.commit);
          db.rollback = util.promisify(db.rollback);
          db.beginTransaction = util.promisify(db.beginTransaction);
          await db.beginTransaction();
          const insertCusResponse = await db.query(
            "INSERT INTO customer_data SET ?",
            customerData
          );
          var bookingData = {
            CUS_ID: insertCusResponse.insertId,
            TESTING_MEDTHOD_ID: req.body.BOOKING_DATA.TESTING_MEDTHOD_ID,
            BOOKING_TIME_SLOT_ID: req.body.BOOKING_DATA.BOOKING_TIME_SLOT_ID,
            BOOKING_DATE: req.body.BOOKING_DATA.BOOKING_DATE,
            BOOKING_STATUS: req.body.BOOKING_DATA.BOOKING_STATUS,
            PAYMENT_METHOD: req.body.BOOKING_DATA.PAYMENT_METHOD,
            TOTAL_AMOUNT: req.body.BOOKING_DATA.TOTAL_AMOUNT,
            ALLOW_CONSENT: req.body.BOOKING_DATA.ALLOW_CONSENT,
            TESTING_RESULT: req.body.BOOKING_DATA.TESTING_RESULT,
            TESTING_STATUS: req.body.BOOKING_DATA.TESTING_STATUS,
            UPDATE_OWNER: req.body.BOOKING_DATA.UPDATE_OWNER,
            BOOKING_LOCATION: req.body.BOOKING_DATA.BOOKING_LOCATION,
            CONSENT_TEXT: req.body.BOOKING_DATA.CONSENT_TEXT,
            VACCINATED: req.body.BOOKING_DATA.VACCINATED,
            DRIVETHRU: req.body.BOOKING_DATA.DRIVETHRU,
            RISK_TEXT: req.body.BOOKING_DATA.RISK_TEXT
          }

          const insertBookResponse = await db.query(
            "INSERT INTO booking_data SET ?",
            bookingData
          );
          const BookingId = insertBookResponse.insertId;
          console.log("insertBookResponse :", insertBookResponse);
          let bookingNotiData = [];
          req.body.BOOKING_NOTI_DATA.forEach(noti => {
            bookingNotiData.push(
              [noti.NOTI_TITLE, noti.NOTI_ID, noti.NOTI_PRICE, BookingId])
          });

          console.log("before insert noti", bookingNotiData)
          const insertBookNotiResponse = await db.query(
            "INSERT INTO booking_notification (NOTI_TITLE,NOTI_ID,NOTI_PRICE,BOOKING_ID) VALUES ?",
            [bookingNotiData]
          )

          await db.commit();
        } catch (err) {
          await db.rollback();
          console.log("errrrr", err);
          res.status(500);
          insertResult = { result: false, message: err };
        } finally {
          res.json(insertResult);
        }
      })();


    } catch (err) {
      db.end();
      console.log("err", err);
      res.status(500);
      res.json({ result: false, message: err });
    }
  })





router.route("/bookingavaliableslot?")
  .get((req, res) => {
    console.log("req", req.query)
    const date = req.query.date;
    console.log(date);
    db.query(`select *,BT_PER_HRS-TOTAL AS WAITING_TOTAL from (SELECT  bs.*,COUNT(bd.BOOKING_TIME_SLOT_ID) AS TOTAL
  FROM booking_time_slot as bs 
  LEFT JOIN (select * from booking_data WHERE BOOKING_DATE=?) as bd 
  ON bs.BT_ID = bd.BOOKING_TIME_SLOT_ID 
  GROUP BY bs.BT_ID)as tb where BT_PER_HRS>TOTAL;`, date, function (err, result, fields) {
      if (err) throw err;
      res.json(result);
    });

  })
  .post((req, res) => {
    console.log(req.body)
    res.json({ data: req.body })
  });



module.exports = router;
