const MongoClient = require('mongodb').MongoClient;

let db;

module.exports = {
  connectToDB(callback) {
    MongoClient.connect(require('../conf').DB_URL, (err, connection) => {
      db = connection;
      return callback(err);
    });
  },

  getDb() {
    return db;
  },
};
