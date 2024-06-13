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

const getTotalCustomer = async (req, res, next) => {
  const totalCustomer = await customerDaos.getTotalCustomer();
  res.status(200).json({
    message: "Successfully get total customer!",
    metadata: totalCustomer
  })
}

const getTotalCustomerByDate = async (req, res, next) => {
  const totalCustomerDaily = await customerDaos.getTotalCustomerByDate(req.params.date);
  res.status(200).json({
    message: "Successfully get total customer by date!",
    metadata: totalCustomerDaily
  })
}

const getTotalCustomerByYear = async (req, res, next) => {
  const totalCustomerByYear = await customerDaos.getTotalCustomerByYear(req.params.year);
  res.status(200).json({
    message: "Successfully get total customer by year!",
    metadata: totalCustomerByYear
  })
}

const getTotalCustomerOfOneMonthInOneYear = async (req, res, next) => {
  const totalCustomerMonthly = await customerDaos.getTotalCustomerOfOneMonthInOneYear(req.params.month, req.params.year);
  res.status(200).json({
    message: "Successfully get total customer of one month in one year!",
    metadata: totalCustomerMonthly
  })
}

const getCustomerById = async (req, res, next) => {
  const foundCustomer = await customerDaos.getCustomerById(Number.parseInt(req.params.customerId));
  res.status(200).json({
    message: "Successfully get one customer!",
    metadata: foundCustomer
  })
}

const findCustomers = async (req, res, next) => {
  const foundCustomers = await customerService.findCustomers(req.query);
  res.status(200).json({
    message: "Successfully found customers!",
    metadata: foundCustomers
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
  getTotalCustomer,
  getTotalCustomerByDate,
  getTotalCustomerByYear,
  getTotalCustomerOfOneMonthInOneYear,
  createNewCustomer,
  updateCustomer,
  deleteOneCustomer,
  findCustomers,
}