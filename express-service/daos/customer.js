'use strict'

const db = require('../models/index');
const customerModel = db['Customer']

const getAllCustomers = async () => {
  const allCustomers = await customerModel.findAll();
  if (allCustomers == []) {
    throw new Error("Customer Not Found!");
  } else {
    return JSON.stringify(allCustomers);
  }
}

const getCustomerById = async (customerId) => {
  const foundCustomer = await customerModel.findByPk(customerId);
  if (foundCustomer == null) {
    throw new Error("Customer Not Found!");
  } else {
    return foundCustomer.toJSON();
  }
}

const createCustomer = async (customerInfo) => {
  const newCustomer = await customerModel.create(customerInfo);
  if (newCustomer == null) {
    throw new Error("Can't create new customer!");
  } else {
    return newCustomer.toJSON();
  }
}

const updateCustomer = async (customerId, updateData) => {
  const updateResult = await customerModel.update(
    updateData, 
    { where: {
      customer_id: customerId
    } 
  });
  if (updateResult[0] != 1) {
    throw new Error("Can't update customer data!");
  } else {
    return updateResult[0];
  }
}

const deleteOneCustomer = async (customerId) => {
  const deleteResult = await customerModel.destroy({ where: { id: customerId } });
  if (deleteResult !== 0) {
    throw new Error("Can't delete customer!");
  } else {
    return deleteResult;
  }
}

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteOneCustomer
}