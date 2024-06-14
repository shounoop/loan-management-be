'use strict'
const paymentDaos = require('../daos/payment');
const paymentService = require('../services/payment');
const loanProductService = require('../services/loanProductService')
const countingPaymentService = require('../services/CountingPaymentService')
const getAllPayments = async (req, res, next) => {
  const allPayments = await paymentService.getAllPayments();
  res.status(200).json({
    message: "Successfully get all payments!",
    metadata: allPayments
  })
}

const getPaymentOfCustomer = async (req, res, next) => {
  const allPaymentsOfCustomer = await paymentService.getAllPaymentsByCustomer(Number.parseInt(req.params.customerId));
  res.status(200).json({
    message: "Successfully get all payments of one customer!",
    metadata: allPaymentsOfCustomer
  })
}

const getTotalOfPayment = async (req, res, next) => {
  const totalPayment = await paymentDaos.getTotalOfPayment();
  res.status(200).json({
    message: "Successfully get total of payment",
    metadata: totalPayment
  })
}

const getTotalOfPaymentByDate = async (req, res, next) => {
  const totalPaymentDaily = await paymentDaos.getTotalOfPaymentByDate(req.params.date);
  res.status(200).json({
    message: "Successfully get total of payment daily",
    metadata: totalPaymentDaily
  })
}

const getTotalOfPaymentByYear = async (req, res, next) => {
  const totalPaymentMonthly = await paymentDaos.getTotalOfPaymentByYear(req.params.year);
  res.status(200).json({
    message: "Successfully get total of payment monthly",
    metadata: totalPaymentMonthly
  })
}

const getTotalOfPaymentOfOneMonthInOneYear = async (req, res, next) => {
  const totalPaymentMonthly = await paymentDaos.getTotalOfPaymentOfOneMonthInOneYear(req.params.month, req.params.year);
  res.status(200).json({
    message: "Successfully get total of payment by month",
    metadata: totalPaymentMonthly
  })
}

const getPaymentById = async (req, res, next) => {
  const paymentDetail = await paymentService.getPaymentById(Number.parseInt(req.params.paymentId));
  res.status(200).json({
    message: "Successfully get payment detail!",
    metadata: paymentDetail
  })
}

const createNewPayment = async (req, res, next) => {
  const newPayment = await paymentService.createNewPayment(req.body);
  res.status(200).json({
    message: "Successfully create new payment!",
    metadata: newPayment
  })
}

const updatePayment = async (req, res, next) => {
  const updateResult = await paymentDaos.updatePayment(Number.parseInt(req.params.paymentId), req.body);
  res.status(200).json({
    message: "Successfully update payment",
    metadata: updateResult[0]
  })
}

const deletePaymentById = async (req, res, next) => {
  const deleteResult = await paymentDaos.deletePaymentById(Number.parseInt(req.params.paymentId));
  res.status(200).json({
    message: "Successfully delete payment",
    metadata: deleteResult
  })
}
module.exports = {
  getAllPayments,
  getPaymentOfCustomer,
  getTotalOfPayment,
  getTotalOfPaymentByDate,
  getTotalOfPaymentByYear,
  getTotalOfPaymentOfOneMonthInOneYear,
  getPaymentById,
  createNewPayment,
  updatePayment,
  deletePaymentById,
}