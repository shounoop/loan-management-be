'use strict'
const customerDaos = require('../daos/customer');
const customerService = require('../services/customer');

const getAllCustomers = async (req, res, next) => {
  const allCustomers = await customerDaos.getAllCustomers();
  res.status(200).json({
    message: "Successfully get all customers",
    metadata: JSON.parse(allCustomers)
  }) 
}

const getCustomerById = async (req, res, next) => {
  const foundCustomer = await customerDaos.getCustomerById(Number.parseInt(req.params.customerId));
  res.status(200).json({
    message: "Successfully get one customer!",
    metadata: foundCustomer
  })
}

const createNewCustomer = async (req, res, next) => {
  const newCustomer = await customerDaos.createCustomer(req.body);
  res.status(200).json({
    message: "Successfully create new customer!",
    metadata: newCustomer
  })
}

const updateCustomer = async (req, res, next) => {
  const updateResult = await customerDaos.updateCustomer(Number.parseInt(req.params.customerId), req.body);
  res.status(200).json({
    message: "Successfully update customer!",
    metadata: updateResult
  })
}

const deleteOneCustomer = async (req, res, next) => {
  const deleteResult = await customerService.deleteOneCustomer(Number.parseInt(req.params.customerId));
  res.status(200).json({
    message: "Successfully delete customer!",
    metadata: deleteResult
  })
}

module.exports = {
  getAllCustomers,
  getCustomerById,
  createNewCustomer,
  updateCustomer,
  deleteOneCustomer,
}