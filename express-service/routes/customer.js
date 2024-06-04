'use strict'
const express = require('express');
const customerController = require('../controllers/customer');
const asyncHandler = require('../middlewares/asyncHandler');
const router = express.Router();

router.get('/all', asyncHandler(customerController.getAllCustomers));
router.get('/:customerId', asyncHandler(customerController.getCustomerById));
router.post('/', asyncHandler(customerController.createNewCustomer));
router.post('/:customerId', asyncHandler(customerController.updateCustomer));

module.exports = router;