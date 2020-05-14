class UsersDao {
  constructor(connection) {
    this._connection = connection;
  }

  list() {
    return new Promise((resolve, reject) =>
      this._connection.query("SELECT * FROM users", (err, result) => {
        if (err) return reject(err);
        resolve(result);
      })
    );
  }

  findBy(param) {
    return new Promise((resolve, reject) =>
      this._connection.query(
        `SELECT * FROM users WHERE ${param}`,
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      )
    );
  }

  add(name, email, password) {
    return new Promise((resolve, reject) =>
      this._connection.query(
        `INSERT INTO users (name, email, password) VALUES ( '${name}', '${email}', '${password}' )`,
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      )
    );
  }
  update(id, name) {
    return new Promise((resolve, reject) =>
      this._connection.query(
        `UPDATE users SET name = '${name}' WHERE id = '${id}'`,
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      )
    );
  }
  delete(id) {
    return new Promise((resolve, reject) =>
      this._connection.query(
        `DELETE FROM users WHERE id = '${id}'`,
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      )
    );
  }
  // other persistence methods
}

module.exports = () => {
  return UsersDao;
};
