var cfg = require("./config");
var jwt = require("jwt-simple");

module.exports = {
  generateToken(payload) {
    return jwt.encode(payload, cfg.jwtSecret);
  },
};
