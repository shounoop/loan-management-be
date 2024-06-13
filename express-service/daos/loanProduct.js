'use strict'
const { DatabaseError } = require('../errors/customError');
const db = require('../models/index');
const loanProductModel = db['LoanProduct'];

const getLoanProductById = async (loanProductId) => {
  const foundLoanProduct = await loanProductModel.findByPk(loanProductId).then(data => data).catch(err => {
    throw new DatabaseError("Error in find loan product by id", 500)
  });
  if (foundLoanProduct == null) {
    return {}
  }
  return foundLoanProduct.toJSON();
}

const getTotalLoanProduct = async() => {
  const totalLoanProduct = await loanProductModel.count().then(data => data).catch(err => {
    throw new DatabaseError("Error in count loan product", 500)
  });
  return totalLoanProduct;
}

const getTotalLoanProductByYear = async (queryYear) => {
  const [results, metadata] = await db.sequelize.query('SELECT MONTH(createdAt) AS month, COUNT(*) AS total_loan_product FROM loanproduct WHERE YEAR(createdAt)=? GROUP BY MONTH(createdAt)', {
    replacements: [queryYear]
  }).then(data => data).catch(err => {
    throw new DatabaseError("Error in count loan product by year", 500)
  });
  return results
}

const getTotalLoanProductOfOneMonthOfOneYear = async (queryYear, queryMonth) => {
  const [results, metadata] = await db.sequelize.query('SELECT COUNT(*) AS total_loan_product FROM loanproduct WHERE MONTH(createdAt)=? AND YEAR(createdAt)=?', {
    replacements: [queryMonth, queryYear]
  }).then(data => data).catch(err => {
    throw new DatabaseError("Error in count loan product of one month in one year", 500)
  });
  return results
}

module.exports = {
  getLoanProductById,
  getTotalLoanProduct,
  getTotalLoanProductByYear,
  getTotalLoanProductOfOneMonthOfOneYear,
}