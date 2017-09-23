const express = require('express');

const router = express.Router();

router.use('/story', require('./story'));

module.exports = router;

