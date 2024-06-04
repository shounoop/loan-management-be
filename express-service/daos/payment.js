'use strict'

const db = require('../models/index');
const paymentModel = db['Payment'];
const customerModel = db['Customer'];
const loanProduct = db['LoanProduct'];

const getAllPayments = async () => {
  const allPayments = await paymentModel.findAll({
    include: [
      {
        model: loanProduct
      },
      {
        model: customerModel
      }
    ]
  });
  if (allPayments == []) {
    throw new Error("Payments not found!");
  } else {
    return JSON.parse(JSON.stringify(allPayments));
  }
}

const getAllPaymentsByCustomer = async (customerId) => {
  const allPaymentsByCustomer = await paymentModel.findAll(
    { where: { customer_Id: customerId },
      include: [
        {
          model: loanProduct
        },
        {
          model: customerModel
        }
      ]
    }
  );
  if (allPaymentsByCustomer == []) {
    throw new Error("Payments not found!");
  } else {
    return JSON.parse(JSON.stringify(allPaymentsByCustomer));
  }
}

const getByPaymentById = async (paymentId) => {
  const foundPayment = await paymentModel.findByPk(
      paymentId, 
      {
        include: [
          {
            model: loanProduct
          },
          {
            model: customerModel
          }
        ]
      }
    );
  if (foundPayment == null) {
    throw new Error("Payment not found!");
  } else {
    return JSON.parse(JSON.stringify(foundPayment));
  }
}

const createNewPayment = async (newPaymentData) => {
  const newPayment = await paymentModel.create(newPaymentData);
  if (newPayment == null) {
    throw new Error("Can't create new payment");
  } else {
    return JSON.parse(JSON.stringify(newPayment));
  }
}

const updatePayment = async (paymentId, updateData) => {
  const updatedPayment = await paymentModel.update(updateData, { where: { payment_id: paymentId }});
  if (updatePayment[0] != 1) {
    throw new Error("Can't update payment");
  } else {
    return JSON.parse(JSON.stringify(updatedPayment));
  }
}

const deletePaymentById = async (paymentId) => {
  const deleteResult = await paymentModel.destroy({ where: { payment_id: paymentId }});
  if (deleteResult == 0) {
    throw new Error("Can't delete payment");
  } else {
    return deleteResult
  }
}

const deletePaymentsByCustomerId = async (customerId) => {
  const deleteResults = await paymentModel.destroy({ where: { customer_id: customerId }});
  if (deleteResults == 0) {
    throw new Error("Can't delete customer payments");
  } else {
    return deleteResults
  }
}

module.exports = {
  getAllPayments,
  getAllPaymentsByCustomer,
  getByPaymentById,
  createNewPayment,
  updatePayment,
  deletePaymentById,
  deletePaymentsByCustomerId
}