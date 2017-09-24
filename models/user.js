const ObjectID = require('mongodb').ObjectID;

const mongoUtil = require('../helpers/mongoUtil.js');

const collectionName = 'users';

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

exports.login = (username, callback) => {
  mongoUtil
    .getDb()
    .collection(collectionName)
    .findOne({ username: username }, (err, result) => {
      callback(err, result);
    });
};

exports.new = (username, callback) => {
  mongoUtil
    .getDb()
    .collection(collectionName)
    .insertOne(
      {
        username,
        upvotes: [],
        downvotes: [],
        stories: []
      },
      (err, result) => {
        callback(err, result);
      }
    );
};

exports.delete = (id, callback) => {
  mongoUtil
    .getDb()
    .collection(collectionName)
    .deleteOne({ _id: ObjectID(id) }, err => {
      callback(err);
    });
};

exports.downvote = (userId, storyId, callback) => {
  mongoUtil
    .getDb()
    .collection(collectionName)
    .update(
      { _id: ObjectID(userId) },
      { $push: { downvotes: storyId } },
      err => {
        callback(err);
      }
    );
};

exports.upvote = (userId, storyId, callback) => {
  mongoUtil
    .getDb()
    .collection(collectionName)
    .update({ _id: ObjectID(userId) }, { $push: { upvotes: storyId } }, err => {
      callback(err);
    });
};

exports.author = (userId, storyId, callback) => {
  mongoUtil
    .getDb()
    .collection(collectionName)
    .update({ _id: ObjectID(userId) }, { $push: { stories: storyId } }, err => {
      callback(err);
    });
};
