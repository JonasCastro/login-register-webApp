const mysql = require("mysql");
require("dotenv").config();

var pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

pool.on("release", () => console.log("pool => connection returned"));

process.on("SIGINT", () =>
  pool.end((err) => {
    if (err) return console.log(err);
    console.log("pool => close");
    process.exit(0);
  })
);

module.exports = pool;
