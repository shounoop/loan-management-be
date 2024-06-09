'use strict'
const paymentDaos = require('../daos/payment');
const userDaos = require('../daos/customer');

const getAllPayments = async () => {
  const allPayments = await paymentDaos.getAllPayments();
  const paymentDatas = allPayments.map((payment) => {
    const paymentData = {}
    paymentData['payment_id'] = payment.payment_id
    paymentData['payment_date'] = payment.payment_date
    paymentData['amount_paid'] = payment.amount_paid
    paymentData['remaining_balance'] = payment.remaining_balance
    paymentData['customer_name'] = payment.Customer.full_name
    paymentData['loan_product_name'] = payment.LoanProduct.loan_product_name
    return paymentData
  })
  return paymentDatas;
}

const getAllPaymentsByCustomer = async (customerId) => {
  const allPaymentsByCustomer = await paymentDaos.getAllPaymentsByCustomer(customerId);
  const paymentDatas = allPaymentsByCustomer.map((payment) => {
    const paymentData = {}
    paymentData['payment_id'] = payment.payment_id
    paymentData['payment_date'] = payment.payment_date
    paymentData['amount_paid'] = payment.amount_paid
    paymentData['remaining_balance'] = payment.remaining_balance
    paymentData['customer_name'] = payment.Customer.full_name
    paymentData['loan_product_name'] = payment.LoanProduct.loan_product_name
    return paymentData
  })
  return paymentDatas;
}

const getPaymentById = async (paymentId) => {
  const foundPayment = await paymentDaos.getByPaymentById(paymentId)
  const paymentData = {}
  paymentData['payment_id'] = foundPayment.payment_id
  paymentData['payment_date'] = foundPayment.payment_date
  paymentData['amount_paid'] = foundPayment.amount_paid
  paymentData['remaining_balance'] = foundPayment.remaining_balance
  paymentData['customer_id'] = foundPayment.Customer.customer_id
  paymentData['customer_name'] = foundPayment.Customer.full_name
  paymentData['loan_product_id'] = foundPayment.LoanProduct.loan_product_id
  paymentData['loan_product_name'] = foundPayment.LoanProduct.loan_product_name

  return paymentData
}

const createNewPayment = async (newPaymentData) => {
  console.log(newPaymentData)
  const { loan_product_id, customer_id } = newPaymentData

  // 1. Check if loan product exist in DB

  // 2. Check if customer exist in DB
  const foundCustomer = await userDaos.getCustomerById(customer_id);

  const newPayment = await paymentDaos.createNewPayment(newPaymentData);
  return newPayment
}

module.exports = {
  getAllPayments,
  getAllPaymentsByCustomer,
  getPaymentById,
  createNewPayment
}