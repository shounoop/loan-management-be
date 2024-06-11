'use strict'

const { DatabaseError } = require('../errors/customError');
const db = require('../models/index');
const customerModel = db['Customer'];

const getAllCustomers = async () => {
  const allCustomers = await customerModel.findAll().then(data => data).catch(err => {
    throw new DatabaseError("Error in findAll customer", 500)
  });
  return JSON.stringify(allCustomers);
}

const getTotalCustomer = async () => {
  const totalCustomer = await customerModel.count().then(data => data).catch(err => {
    throw new DatabaseError("Error in count customer", 500)
  });
  return totalCustomer;
}

const getTotalCustomerByDate = async (queryDate) => {
  const [results, metadata] = await db.sequelize.query('SELECT COUNT(*) AS total_customer FROM customer WHERE DATE(createdAt)=?', {
    replacements: [queryDate]
  }).then(data => data)
  .catch((err) => {
    throw new DatabaseError("Error in count customer by date", 500)
  })
  return results[0]['total_customer']
}

const getTotalCustomerByYear = async (queryYear) => {
  const [results, metadata] = await db.sequelize.query('SELECT MONTH(createdAt) AS month, COUNT(*) AS total_customer FROM customer WHERE YEAR(createdAt)=? GROUP BY MONTH(createdAt)', {
    replacements: [queryYear]
  }).then(data => data)
  .catch((err) => {
    throw new DatabaseError("Error in count customer by year", 500)
  })
  return results
}

const getTotalCustomerOfOneMonthInOneYear = async (queryMonth, queryYear) => {
  const [results, metadata] = await db.sequelize.query('SELECT COUNT(*) AS total_customer FROM customer WHERE MONTH(createdAt)=? AND YEAR(createdAt)=?', {
    replacements: [queryMonth, queryYear]
  }).then(data => data)
  .catch((err) => {
    throw new DatabaseError("Error in count customer of one month in one year", 500)
  })
  return results[0]['total_customer']
}

const getCustomerById = async (customerId) => {
  const foundCustomer = await customerModel.findByPk(customerId).then(data => data)
  .catch((err) => {
    throw new DatabaseError("Error in get customer by id", 500)
  });
  if (foundCustomer == null) {
    return {}
  } else {
    return foundCustomer.toJSON();
  }
}

const createCustomer = async (customerInfo) => {
  const newCustomer = await customerModel.create(customerInfo).then(data => data)
  .catch((err) => {
    throw new DatabaseError("Error in create customer", 500)
  });
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
  }).then(data => data)
  .catch((err) => {
    throw new DatabaseError("Error in update customer", 500)
  });
  return updateResult[0];
}

const deleteOneCustomer = async (customerId) => {
  const deleteResult = await customerModel.destroy({ where: { customer_id: customerId } }).then(data => data)
  .catch((err) => {
    console.log(err)
    throw new DatabaseError("Error in delete customer", 500)
  });
  return deleteResult;

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