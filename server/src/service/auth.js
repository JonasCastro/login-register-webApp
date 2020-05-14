// auth.js
var passport = require("passport");
var passportJWT = require("passport-jwt");
var cfg = require("./config.js");
const UsersDao = require("../models/usersDAO")();
var db = require("../database/connection");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var params = {
  secretOrKey: cfg.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

module.exports = function () {
  var strategy = new Strategy(params, async function (payload, done) {
    const usersDao = new UsersDao(db);
    var user = await usersDao.findBy(`id = ${payload.id}`);

    if (user.length) {
      return done(null, { id: user.id });
    } else {
      return done(new Error("User not found"), null);
    }
  });
  passport.use(strategy);
  return {
    initialize: function () {
      return passport.initialize();
    },
    authenticate: function () {
      return passport.authenticate("jwt", cfg.jwtSession);
    },
  };
};
