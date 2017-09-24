const express = require('express');
const story = require('../models/story');
const user = require('../models/user');

const router = express.Router();

// index
router.get('/', (req, res, next) => {
  story.roots((err, value) => {
    if (err) return next(err);
    res.json(value);
  });
});

router.get('/all', (req, res, next) => {
  story.all((err, value) => {
    if (err) return next(err);
    res.json(value);
  });
});

// show
router.get('/:id', (req, res, next) => {
  story.get(req.params.id, (err, value) => {
    if (err) return next(err);
    res.json(value);
  });
});

// new
router.post('/', (req, res, next) => {
  story.new(
    req.body.title,
    req.body.content,
    true,
    req.body.author,
    (err, result) => {
      if (err) return next(err);
      user.author(req.body.author, result.insertedId, err => {
        if (err) return next(err);
        res.json({
          success: true,
          id: result.insertedId
        });
      });
    }
  );
});

// split
router.post('/branch', (req, res, next) => {
  const origID = req.body.rootID;
  const root = req.body.rootText;
  const origChild = req.body.originalChild;
  const branched = req.body.branchedChild;

  story.splitUpdate(
    origID,
    req.body.title,
    root,
    origChild,
    branched,
    (err, record) => {
      if (err) return next(err);
      res.json({
        success: true,
        record
      });
    }
  );
});

router.post('/branches', (req, res, next) => {
  story.getBranches(req.body.childIds, (err, data) => {
    if (err) return next(err);
    res.json({ success: true, data });
  });
});

// delete
router.delete('/:id', (req, res, next) => {
  story.delete(req.params.id, err => {
    if (err) return next(err);
    res.json({ success: true });
  });
});

// upvote
router.post('/:id/upv', (req, res, next) => {
  story.upvote(req.params.id, err => {
    if (err) return next(err);
    res.json({ success: true });
  });
});

// downvote
router.post('/:id/dv', (req, res, next) => {
  story.downvote(req.params.id, err => {
    if (err) return next(err);
    res.json({ success: true });
  });
});

module.exports = router;
