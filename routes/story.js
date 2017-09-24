const express = require('express');
const story = require('../models/story');
const user = require('../models/user');
const request = require('request');

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

router.post('/:id/genre', (req, res, next) => {
    var headers = {
    'Authorization':       'P8xrDUr+hnqzZaKFLpvmQwoEH3HMLAWjem2XmcybAn/ddsn+hgNtCJaNo2P71GAJ/C5jodH1Llw3JE/FucFRgw==',
    'Content-Length':     2000,
    'Content-Type':     'application/json'
  }

  let jsonObj = json({"Inputs": {
    "input1": {
      "ColumnNames": [
        "Content",
        "Genre"
      ],
      "Values": [
        [
          req.body.content,
          "value"
        ],
        [
          req.body.content,
          "value"
        ]
      ]
    }
  },
  "GlobalParameters": {}
});
  // Configure the request
  var options = {
      url: 'https://ussouthcentral.services.azureml.net/workspaces/07f529c050d34615b97e2fead40581c4/services/665874ec67264931bd01acd5f28a8b28/execute?api-version=2.0&details=true',
      method: 'POST',
      headers: headers,
      form: {json}
  }

// Start the request
  request(options, function (error, resp, body) {
      if (!error && response.statusCode == 200) {
          let jsonObj = json.parse(resp.body);
          story.genre(req.params.id, jsonObj.Results.output1.value.Values[0][16], err => {
      if (err) return next(err);
      res.json({ success: true });
    });
      }
  });
});

module.exports = router;
