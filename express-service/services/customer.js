'use strict'
const paymentDaos = require('../daos/payment');
const customerDaos = require('../daos/customer');
const { NoDataFoundError, MissingFieldError } = require('../errors/customError');
const checkRequiredFields = require('../utils/checkRequiredFields');

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

const createNewCustomer = async (customerInfo) => {
  const requiredFields = ['full_name', 'date_of_birth', 'gender', 'identity_number', 'address', 'phone_number', 'email', 'occupation', 'customer_status'];
  const checkRequiredFieldsResult = checkRequiredFields(customerInfo, requiredFields);
  if (!checkRequiredFieldsResult.isValid) {
    throw new MissingFieldError(`Missing field ${checkRequiredFieldsResult.element} in creating new customer!`, 404);
  }
  const currentDate = new Date();
  customerInfo['createdAt'] = currentDate;
  const newCustomer = await customerDaos.createCustomer(customerInfo);
  return newCustomer
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
  createNewCustomer,
  deleteOneCustomer
}