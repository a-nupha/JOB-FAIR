const mysql = require("mysql");
const util = require("util");
const db_config = {
  user: "wasun_199",
  host: "db4free.net",
  password: "WAsun@123",
  database: "job_fair",
};

const db = mysql.createConnection(db_config);

db.query = util.promisify(db.query);
db.commit = util.promisify(db.commit);
db.rollback = util.promisify(db.rollback);
db.beginTransaction = util.promisify(db.beginTransaction);


module.exports = db;
