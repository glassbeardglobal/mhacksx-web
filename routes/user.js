const express = require('express');
const user = require('../models/user');
const story = require('../models/story');

const router = express.Router();

// index
router.get('/', (req, res, next) => {
  user.all((err, value) => {
    if (err) return next(err);
    res.json(value);
  });
});

// show
router.get('/:id', (req, res, next) => {
  user.get(req.params.id, (err, value) => {
    if (err) return next(err);
    res.json(value);
  });
});

// new
router.post('/', (req, res, next) => {
  user.new(req.body.username, (err, result) => {
    if (err) return next(err);
    res.json({
      success: true,
      id: result.insertedId
    });
  });
});

// login
router.post('/login', (req, res, next) => {
  user.login(req.body.username, (err, value) => {
    if (err) return next(err);
    res.json(value);
  });
});

// delete
router.delete('/:id', (req, res, next) => {
  user.delete(req.params.id, err => {
    if (err) return next(err);
    res.json({ success: true });
  });
});

// upvote
router.post('/upvote', (req, res, next) => {
  story.upvote(req.body.storyId, err => {
    if (err) return next(err);
    user.upvote(req.body.userId, req.body.storyId, err => {
      if (err) return next(err);
      res.json({ success: true });
    });
  });
});

// downvote
router.post('/downvote', (req, res, next) => {
  story.downvote(req.body.storyId, err => {
    if (err) return next(err);
    user.downvote(req.body.userId, req.body.storyId, err => {
      if (err) return next(err);
      res.json({ success: true });
    });
  });
});

module.exports = router;
