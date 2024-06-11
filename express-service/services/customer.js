'use strict'
const paymentDaos = require('../daos/payment');
const customerDaos = require('../daos/customer');
const { NoDataFoundError } = require('../errors/customError');

const deleteOneCustomer = async (customerId) => {
  const foundCustomer = await customerDaos.getCustomerById(customerId);
  if (foundCustomer == {}) {
    throw new NoDataFoundError("No customer found!", 10);
  }
  const deletePaymentResults = await paymentDaos.deletePaymentsByCustomerId(customerId);
  const deleteCustomerResult = await customerDaos.deleteOneCustomer(customerId);
  return {
    deletePaymentResults,
    deleteCustomerResult
  }
}

module.exports = {
  deleteOneCustomer
}