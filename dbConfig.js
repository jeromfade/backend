const { Pool } = require("pg");
let config = require("./config.json");
const pool = new Pool({
  user: config.USER,
  host: config.HOST,
  database: config.DATABASE,
  password: config.PASSWORD,
  port: config.DBPORT,
});


module.exports = pool;
