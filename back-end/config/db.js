const mysql = require("mysql");
const util = require("util");

// var db = mysql.createConnection({
//   user: "epiz_30830522",
//   host: "sql209.epizy.com",
//   password: "CY62Evqm8DFxJ",
//   database: "epiz_30830522_job_fair",
// });
// db.query = util.promisify(db.query);
// db.commit = util.promisify(db.commit);
// db.rollback = util.promisify(db.rollback);
// db.beginTransaction = util.promisify(db.beginTransaction);

const db_config = {
  user: "wasun_199",
  host: "db4free.net",
  password: "WAsun@123",
  database: "job_fair",
};

const connection = mysql.createPool(db_config);

function handleDisconnect() {
  connection = mysql.createConnection(dbConfig.db_config);
  connection.connect(function (err) {
    if (err) {
      console.log(' Error when connecting to db:', err);
      setTimeout(handleDisconnect, 1000);
    }
  });
  connection.on('  Database Error', function (err) {
    console.log('db error: ' + err.code, err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

module.exports.connection = connection;
module.exports.db_config = db_config
