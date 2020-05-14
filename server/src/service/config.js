// config.js
require("dotenv").config();
module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  jwtSession: { session: false },
};
