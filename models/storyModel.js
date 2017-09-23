const ObjectID = require('mongodb').ObjectID;

const mongoUtil = require('../helpers/mongoUtil.js');

const collectionName = '';

exports.all = (callback) => {
  mongoUtil.getDb().collection(collectionName).find().toArray((err, result) => {
    callback(err, result);
  });
};

exports.get = (id, callback) => {
  mongoUtil.getDb().collection(collectionName).findOne({ _id: ObjectID(id) }, (err, result) => {
    callback(err, result);
  });
};

exports.new = (name, desc, rating, callback) => {
  mongoUtil.getDb().collection(collectionName).insertOne({ name, desc, rating }, (err, result) => {
    callback(err, result);
  });
};

exports.update = (id, newName, newDesc, newRating, callback) => {
  mongoUtil.getDb().collection(collectionName).updateOne({ _id: ObjectID(id) }, {
    name: newName,
    desc: newDesc,
    rating: newRating,
  }, (err) => {
    callback(err);
  });
};

exports.delete = (id, callback) => {
  mongoUtil.getDb().collection(collectionName).deleteOne({ _id: ObjectID(id) }, (err) => {
    callback(err);
  });
};