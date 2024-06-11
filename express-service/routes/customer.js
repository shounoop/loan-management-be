'use strict'
const express = require('express');
const customerController = require('../controllers/customer');
const asyncHandler = require('../middlewares/asyncHandler');
const router = express.Router();

// Get all customer
router.get('/all', asyncHandler(customerController.getAllCustomers));
// Get total customer of a specific month in a specific year
router.get('/total/year/:year/month/:month', asyncHandler(customerController.getTotalCustomerOfOneMonthInOneYear));
// Get total customer by year
router.get('/total/year/:year', asyncHandler(customerController.getTotalCustomerByYear));
// Get total customer by a date
router.get('/total/:date', asyncHandler(customerController.getTotalCustomerByDate));
// Get total customer
router.get('/total', asyncHandler(customerController.getTotalCustomer));
// Get a specific customer
router.get('/:customerId', asyncHandler(customerController.getCustomerById));
// Create a new customer
router.post('/', asyncHandler(customerController.createNewCustomer));
// Update a customer
router.post('/:customerId', asyncHandler(customerController.updateCustomer));
// Delete a customer
router.delete('/:customerId', asyncHandler(customerController.deleteOneCustomer));

module.exports = router;