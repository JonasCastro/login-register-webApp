const express = require("express");
const cors = require("cors");
const routes = require("./routes");
var db = require("./database/connection");
var auth = require("./service/auth")();
const app = express();
const connectionMiddleware = require("./middleware/connection-middleware");
app.use(auth.initialize());

// enabling the middleware connection
app.use(connectionMiddleware(db));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(routes);

//error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.toString() });
});

module.exports = app;
