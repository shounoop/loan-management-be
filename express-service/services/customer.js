'use strict'
const paymentDaos = require('../daos/payment');
const customerDaos = require('../daos/customer');

const deleteOneCustomer = async (customerId) => {
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