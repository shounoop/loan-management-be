'use strict'

const db = require('../models/index');
const customerModel = db['Customer'];

const getAllCustomers = async () => {
  const allCustomers = await customerModel.findAll();
  if (allCustomers == []) {
    throw new Error("Customer Not Found!");
  } else {
    return JSON.stringify(allCustomers);
  }
}

const getTotalCustomer = async () => {
  const totalCustomer = await customerModel.count();
  return totalCustomer;
}

const getTotalCustomerByDate = async (queryDate) => {
  const [results, metadata] = await db.sequelize.query('SELECT COUNT(*) AS total_customer FROM customer WHERE DATE(createdAt)=?', {
    replacements: [queryDate]
  })
  return results[0]['total_customer']
}

const getTotalCustomerByYear = async (queryYear) => {
  const [results, metadata] = await db.sequelize.query('SELECT MONTH(createdAt) AS month, COUNT(*) AS total_customer FROM customer WHERE YEAR(createdAt)=? GROUP BY MONTH(createdAt)', {
    replacements: [queryYear]
  })
  return results
}

const getTotalCustomerOfOneMonthInOneYear = async (queryMonth, queryYear) => {
  const [results, metadata] = await db.sequelize.query('SELECT COUNT(*) AS total_customer FROM customer WHERE MONTH(createdAt)=? AND YEAR(createdAt)=?', {
    replacements: [queryMonth, queryYear]
  })
  return results[0]['total_customer']
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
  const newCustomer = await customerModel.create(customerInfo).then(data => data).catch(err => {
    throw new Error(err)
  })
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
  getTotalCustomer,
  getTotalCustomerByDate,
  getTotalCustomerByYear,
  getTotalCustomerOfOneMonthInOneYear,
  createCustomer,
  updateCustomer,
  deleteOneCustomer
}