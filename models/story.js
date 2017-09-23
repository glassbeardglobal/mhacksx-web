const ObjectID = require('mongodb').ObjectID;

const mongoUtil = require('../helpers/mongoUtil.js');

const collectionName = 'stories';

exports.all = callback => {
  mongoUtil
    .getDb()
    .collection(collectionName)
    .find()
    .toArray((err, result) => {
      callback(err, result);
    });
};

exports.get = (id, callback) => {
  mongoUtil
    .getDb()
    .collection(collectionName)
    .findOne({ _id: ObjectID(id) }, (err, result) => {
      callback(err, result);
    });
};

exports.new = (title, content, callback) => {
  mongoUtil
    .getDb()
    .collection(collectionName)
    .insertOne({
      title,
      content,
      upv: 0,
      dv: 0,
      children: []
    }, (err, result) => {
      callback(err, result);
    });
};

exports.delete = (id, callback) => {
  mongoUtil
    .getDb()
    .collection(collectionName)
    .deleteOne({_id: ObjectID(id)}, err => {
      callback(err);
    });
};

exports.upvote =(id, callback) => {
  mongoUtil
    .getDb()
    .collection(collectionName)
    .update({_id: ObjectID(id)}, {$inc: {upv: 1}}, err => {
      callback(err);
    });
};

exports.downvote =(id, callback) => {
  mongoUtil
    .getDb()
    .collection(collectionName)
    .update({_id: ObjectID(id)}, {$inc: {dv: 1}}, err => {
      callback(err);
    });
};