const UsersDao = require("../models/usersDAO")();
var jwt = require("../service/jwt");
const bcrypt = require("bcryptjs");

module.exports = {
  async create(request, response, next) {
    const { name, email, password } = request.body;
    try {
      const usersDao = new UsersDao(request.connection);
      var user = await usersDao.findBy(`email = '${email}'`);

      if (!user.length) {
        return response.status(400).json({ error: "User not found" });
      }
      if (!(await bcrypt.compare(password, user[0].password))) {
        return response.status(400).json({ error: "Invalid password" });
      }
      var payload = { id: user[0].id };
      var token = jwt.generateToken(payload);

      response.json({ user: user[0], token });
    } catch (error) {
      next(error);
    }
  },
};
