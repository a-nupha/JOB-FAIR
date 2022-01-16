const mysql = require("mysql");
const util = require("util");

var db = mysql.createConnection({
  user: "epiz_30830522",
  host: "sql209.epizy.com",
  password: "CY62Evqm8DFxJ",
  database: "epiz_30830522_job_fair",
});

db.query = util.promisify(db.query);
db.commit = util.promisify(db.commit);
db.rollback = util.promisify(db.rollback);
db.beginTransaction = util.promisify(db.beginTransaction);

module.exports = db;

module.exports.db_config = {
  user: "epiz_30830522",
  host: "sql209.epizy.com",
  password: "CY62Evqm8DFxJ",
  database: "epiz_30830522_job_fair",
};
