'use strict'
const express = require('express');
const router = express.Router();

router.use('/customers', require('./customer'));
router.use('/payments', require('./payment'));
router.use('/loan-products', require('./loanProduct'));

module.exports = router;