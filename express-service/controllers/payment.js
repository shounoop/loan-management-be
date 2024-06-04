'use strict'
const paymentDaos = require('../daos/payment');
const paymentService = require('../services/payment');

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

const updatePayment = async(req, res, next) => {
  const updateResult = await paymentDaos.updatePayment(Number.parseInt(req.params.paymentId), req.body);
  res.status(200).json({
    message: "Successfully update payment",
    metadata: updateResult
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
  getPaymentById,
  createNewPayment,
  updatePayment,
  deletePaymentById
}