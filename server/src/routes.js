const express = require("express");

const UsersController = require("./controllers/UsersController");
const SessionController = require("./controllers/SessionController");
const auth = require("./service/auth")();
const routes = express.Router();

routes.post("/session", SessionController.create);
routes.post("/users", UsersController.store);

routes.get("/users", auth.authenticate(), UsersController.index);
routes.put("/users/:id", auth.authenticate(), UsersController.update);
routes.delete("/users/:id", auth.authenticate(), UsersController.delete);

module.exports = routes;
