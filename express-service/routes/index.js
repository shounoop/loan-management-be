'use strict'
const express = require('express');
const router = express.Router();

router.use('/customer', require('./customer'));
router.use('/payment', require('./payment'));

module.exports = router;