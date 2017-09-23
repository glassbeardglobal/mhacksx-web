const express = require('express');
const story = require('../models/story');

const router = express.Router();

// index
router.get('/', (req, res, next) => {
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
  story.new(req.body.title, req.body.content, (err, result) => {
    if (err) return next(err);
    res.json(result.insertedId);
  });
});

// delete
router.delete('/:id', (req, res, next) => {
  story.delete(req.params.id, (err) => {
    if (err) return next(err);
    res.json({ success: true });
  });
});

module.exports = router;

