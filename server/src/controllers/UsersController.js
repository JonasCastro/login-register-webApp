const UsersDao = require("../models/usersDAO")();
const bcrypt = require("bcryptjs");

module.exports = {
  async index(request, response, next) {
    new UsersDao(request.connection)
      .list()
      .then((result) => response.json(result))
      .catch(next);
  },

  async store(request, response, next) {
    const { name, email, password } = request.body;
    try {
      const usersDao = new UsersDao(request.connection);
      var user = await usersDao.findBy(`email = '${email}'`);
      if (user.length) {
        return response.status(400).json({ error: "User already exists" });
      }
      const result = await usersDao.add(
        name,
        email,
        await bcrypt.hash(password, 8)
      );
      return response.json(result);
    } catch (error) {
      next(error);
    }
  },
  async update(request, response, next) {
    const { name } = request.body;
    const id = request.params.id;

    try {
      const usersDao = new UsersDao(request.connection);
      var user = await usersDao.findBy(`id = ${id}`);
      if (!user.length) {
        return response.status(400).json({ error: "User not found" });
      } else {
        const result = await usersDao.update(id, name);
        return response.json(result);
      }
    } catch (error) {
      next(error);
    }
  },
  async delete(request, response) {
    const id = request.params.id;
    try {
      const usersDao = new UsersDao(request.connection);
      var user = await usersDao.findBy(`id = ${id}`);
      if (!user.length) {
        return response.status(400).json({ error: "User not found" });
      } else {
        const result = await usersDao.delete(id);
        return response.json(result);
      }
    } catch (error) {
      next(error);
    }
  },
};
