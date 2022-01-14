const mysql = require("mysql");
const util = require("util");

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_jobfair_dev",
});

db.query = util.promisify(db.query);
db.commit = util.promisify(db.commit);
db.rollback = util.promisify(db.rollback);
db.beginTransaction = util.promisify(db.beginTransaction);


module.exports = db;
