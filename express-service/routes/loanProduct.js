'use strict'
const express = require('express');
const loanProductController = require('../controllers/loanProductController');
const asyncHandler = require('../middlewares/asyncHandler');
const router = express.Router();

// Get total of loan product of a specific month of a specific year 
router.get('/total/year/:year/month/:month', asyncHandler(loanProductController.getTotalLoanProductOfOneMonthOfOneYear));
// Get total of loan product of a specific year
router.get('/total/year/:year', asyncHandler(loanProductController.getTotalLoanProductByYear));
// Get total of loan product that is existing in DB
router.get('/total', asyncHandler(loanProductController.getTotalLoanProduct));
// Get the most sold loan product of a specific month of a specific year
router.get('/most-sold/year/:year/month/:month', asyncHandler(loanProductController.getMostSoldLoanProductByMonthInAYear));
// Get the most sold loan product of a specific year
router.get('/most-sold/year/:year', asyncHandler(loanProductController.getMostSoldLoanProductByYear));
// Search loan product by name
router.get('/search', asyncHandler(loanProductController.findLoanProductByName));

module.exports = router;