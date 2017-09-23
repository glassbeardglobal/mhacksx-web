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

exports.new = (title, content, end, callback) => {
  mongoUtil
    .getDb()
    .collection(collectionName)
    .insertOne({
      title,
      content,
      end,
      upv: 0,
      dv: 0,
      children: []
    }, (err, result) => {
      callback(err, result);
    });
};

// takes objectID of original object
// If ca is null we are branching off the end
exports.splitUpdate = (origID, title, root, ca, cb, callback) => {
  const col = mongoUtil.getDb().collection(collectionName);

  exports.new(title, cb, true, (err, res) => {
    if (err) return callback(err);

    if (ca) {
      exports.get(origID, (err, origDoc) => {
        if (err) return callback(err);
        if (origDoc == null) return callback(new Error("Not Found"));

        col.insertOne({
          title,
          content: ca,
          end: origDoc.children.length == 0,
          upv: 0,
          dv: 0,
          children: origDoc.children
        }, (err, result) => {
          if (err) return callback(err);

          col.updateOne({ _id: ObjectID(origID) }, {
            $set: {
              content: root,
              children: [res.insertedId, result.insertedId]
            }
          }, (err, updateres) => {
            if (err) return callback(err);
            callback(null, {
              originalChild: res.insertedId,
              branchedChild: result.insertedId
            });
          });
        });
      });
    } else {
      col.updateOne({ _id: ObjectID(origID) }, {
        $push: { children: res.insertedId }
      }, (err, res) => {
        if (err) return next(err);

        callback(null, {
          success: true,
          insertedId: res.insertedId
        });
      });
    }
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
