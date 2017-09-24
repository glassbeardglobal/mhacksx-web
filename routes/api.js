const express = require('express');

const router = express.Router();

router.use('/story', require('./story'));
router.use('/user', require('./user'));

module.exports = router;
