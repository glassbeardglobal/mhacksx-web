const MongoClient = require('mongodb').MongoClient;

let db;

module.exports = {

  connectToServer(callback) {
    MongoClient.connect(process.env.DB_URL, (err, connection) => {
      db = connection;
      return callback(err);
    });
  },

  getDb() {
    return db;
  },
};