const mysql = require("mysql");
const util = require("util");

var db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "12345678",
  database: "jobfair",
});

db.query = util.promisify(db.query);
db.commit = util.promisify(db.commit);
db.rollback = util.promisify(db.rollback);
db.beginTransaction = util.promisify(db.beginTransaction);


module.exports = db;
