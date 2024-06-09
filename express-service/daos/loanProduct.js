'use strict'
const db = require('../models/index');
const loanProductModel = db['LoanProduct'];

const getLoanProductById = async (loanProductId) => {
  const foundLoanProduct = await loanProductModel.findByPk(loanProductId);
  if (foundLoanProduct == null) {
    throw new Error("No loan product found!");
  }
  return foundLoanProduct.toJSON();
}
 
const getTotalLoanProduct = async() => {
  const totalLoanProduct = await loanProductModel.count();
  return totalLoanProduct;
}

const getTotalLoanProductByYear = async (queryYear) => {
  const [results, metadata] = await db.sequelize.query('SELECT MONTH(createdAt) AS month, COUNT(*) AS total_loan_product FROM loanproduct WHERE YEAR(createdAt)=? GROUP BY MONTH(createdAt)', {
    replacements: [queryYear]
  });
  return results
}

const getTotalLoanProductOfOneMonthOfOneYear = async (queryYear, queryMonth) => {
  const [results, metadata] = await db.sequelize.query('SELECT COUNT(*) AS total_loan_product FROM loanproduct WHERE MONTH(createdAt)=? AND YEAR(createdAt)=?', {
    replacements: [queryMonth, queryYear]
  });
  return results
}

module.exports = {
  getLoanProductById,
  getTotalLoanProduct,
  getTotalLoanProductByYear,
  getTotalLoanProductOfOneMonthOfOneYear,
}