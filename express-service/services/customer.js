'use strict'
const paymentDaos = require('../daos/payment');
const customerDaos = require('../daos/customer');
const { NoDataFoundError } = require('../errors/customError');

const findCustomers = async (searchQueries) => {
  const { fullName, identity } = searchQueries;
  if (!fullName && !identity) {
    return []
  }
  
  if (fullName && identity) {
    const foundCustomers = await customerDaos.findCustomersByNameAndByIdNumber(fullName, identity);
    return foundCustomers;
  } else if (fullName) {
    const foundCustomers = await customerDaos.findCustomersByName(fullName);
    return foundCustomers;
  } else if (identity) {
    const foundCustomers = await customerDaos.findCustomersByIdNumber(identity);
    return foundCustomers;
  }
}

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
  findCustomers,
  deleteOneCustomer
}