// connection-middleware.js

module.exports = (pool) => (req, res, next) => {
  pool.getConnection((err, connection) => {
    if (err) return next(err);
    console.log("pool => connected");
    // added the connection to the request
    req.connection = connection;
    // passes the request the next middleware
    next();
    // returns the connection to the pool at the end of the response
    res.on("finish", () => req.connection.release());
  });
};
