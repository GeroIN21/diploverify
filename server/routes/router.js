const express = require('express');
const diplomas = require('./diplomas');
const index = require('./index');

const router = express.Router();

router.use('/', index);
router.use('/diplomas', diplomas);

module.exports = router;