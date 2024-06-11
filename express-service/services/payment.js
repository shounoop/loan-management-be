'use strict'
const paymentDaos = require('../daos/payment');
const userDaos = require('../daos/customer');
const loanDaos = require('../daos/loanProduct');
const checkRequiredFields = require('../utils/checkRequiredFields');
const { MissingFieldError, NoDataFoundError } = require('../errors/customError');

const getAllPayments = async () => {
  const allPayments = await paymentDaos.getAllPayments();
  const paymentDatas = allPayments.map((payment) => {
    const paymentData = {}
    paymentData['payment_id'] = payment.payment_id
    paymentData['payment_date'] = payment.payment_date
    paymentData['amount_paid'] = payment.amount_paid
    paymentData['remaining_balance'] = payment.remaining_balance
    paymentData['createdAt'] = payment.createdAt
    paymentData['updatedAt'] = payment.updatedAt
    paymentData['customer_name'] = payment.Customer.full_name
    paymentData['loan_product_name'] = payment.LoanProduct.loan_product_name
    return paymentData
  })
  return paymentDatas;
}

const getAllPaymentsByCustomer = async (customerId) => {
  const allPaymentsByCustomer = await paymentDaos.getAllPaymentsByCustomer(customerId);
  if (allPaymentsByCustomer.length == 0) {
    return []
  }
  const paymentDatas = allPaymentsByCustomer.map((payment) => {
    const paymentData = {}
    paymentData['payment_id'] = payment.payment_id
    paymentData['payment_date'] = payment.payment_date
    paymentData['amount_paid'] = payment.amount_paid
    paymentData['remaining_balance'] = payment.remaining_balance
    paymentData['createdAt'] = payment.createdAt
    paymentData['updatedAt'] = payment.updatedAt
    paymentData['customer_name'] = payment.Customer.full_name
    paymentData['loan_product_name'] = payment.LoanProduct.loan_product_name
    return paymentData
  })
  return paymentDatas;
}

const getPaymentById = async (paymentId) => {
  const foundPayment = await paymentDaos.getByPaymentById(paymentId)
  if (Object.keys(foundPayment).length == 0) {
    return {}
  }
  const paymentData = {}
  paymentData['payment_id'] = foundPayment.payment_id
  paymentData['payment_date'] = foundPayment.payment_date
  paymentData['amount_paid'] = foundPayment.amount_paid
  paymentData['remaining_balance'] = foundPayment.remaining_balance
  paymentData['customer_id'] = foundPayment.Customer.customer_id
  paymentData['customer_name'] = foundPayment.Customer.full_name
  paymentData['createdAt'] = payment.createdAt
  paymentData['updatedAt'] = payment.updatedAt
  paymentData['loan_product_id'] = foundPayment.LoanProduct.loan_product_id
  paymentData['loan_product_name'] = foundPayment.LoanProduct.loan_product_name

  return paymentData
}

const createNewPayment = async (newPaymentData) => {
  const requiredFields = ['loan_product_id', 'customer_id', 'payment_date', 'amount_paid', 'remaining_balance', 'createdAt']
  const checkRequiredFieldsResult = checkRequiredFields(newPaymentData, requiredFields)

  if (!checkRequiredFieldsResult.isValid) {
    throw new MissingFieldError(`Missing field ${checkRequiredFieldsResult.element} in creating new payment`, 404);
  }
  
  const { loan_product_id, customer_id } = newPaymentData

  // 1. Check if loan product exist in DB
  const foundLoanProduct = await loanDaos.getLoanProductById(loan_product_id);
  if (Object.keys(foundLoanProduct).length == 0) {
    throw new NoDataFoundError(`No loan product with id ${loan_product_id}`);
  }

  // 2. Check if customer exist in DB
  const foundCustomer = await userDaos.getCustomerById(customer_id);
  if (Object.keys(foundCustomer).length == 0) {
    throw new NoDataFoundError(`No customer with id ${customer_id}`);
  }

  // 3. Crete new payment
  const newPayment = await paymentDaos.createNewPayment(newPaymentData);
  return newPayment
}

module.exports = {
  getAllPayments,
  getAllPaymentsByCustomer,
  getPaymentById,
  createNewPayment
}