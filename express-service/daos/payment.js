'use strict'
const { DatabaseError } = require('../errors/customError');
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
  }).then(data => data).catch(err => {
    throw new DatabaseError("Error in findAll payment", 500)
  });
  return JSON.parse(JSON.stringify(allPayments));
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
  ).then(data => data).catch(err => {
    throw new DatabaseError("Error in findAll payment by customer", 500)
  });
  return JSON.parse(JSON.stringify(allPaymentsByCustomer));
}

const getTotalOfPayment = async () => {
  const totalPayment = await paymentModel.count().then(data => data).catch(err => {
    throw new DatabaseError("Error in count payment", 500)
  });
  return totalPayment;
}

const getTotalOfPaymentByDate = async (queryDate) => {
  const [results, metadata] = await db.sequelize.query('SELECT COUNT(*) AS total_payment_daily FROM payment WHERE DATE(createdAt)=?', {
    replacements: [queryDate]
  }).then(data => data).catch(err => {
    throw new DatabaseError("Error in total payment by date", 500)
  });
  return results[0]['total_payment_daily']
}

const getTotalOfPaymentOfOneMonthInOneYear = async (queryMonth, queryYear) => {
  const [results, metadata] = await db.sequelize.query('SELECT COUNT(*) AS total_payment FROM payment WHERE MONTH(createdAt)=? AND YEAR(createdAt)=?', {
    replacements: [queryMonth, queryYear]
  }).then(data => data).catch(err => {
    throw new DatabaseError("Error in total payment of one month in one year", 500)
  });
  return results[0]['total_payment']
}

const getTotalOfPaymentByYear = async (queryYear) => {
  const [results, metadata] = await db.sequelize.query('SELECT MONTH(createdAt) AS month, COUNT(*) AS total_payment_month FROM payment WHERE YEAR(createdAt)=? GROUP BY MONTH(createdAt)', {
    replacements: [queryYear]
  }).then(data => data).catch(err => {
    throw new DatabaseError("Error in count payment by year", 500)
  });
  return results;
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
    ).then(data => data).catch(err => {
      throw new DatabaseError("Error in find payment by id", 500)
    });
  if (foundPayment == null) {
    return {}
  }
  return JSON.parse(JSON.stringify(foundPayment));
}

const createNewPayment = async (newPaymentData) => {
  const newPayment = await paymentModel.create(newPaymentData).then(data => data).catch(err => {
    throw new DatabaseError("Error in create new payment", 500)
  });
  return JSON.parse(JSON.stringify(newPayment));
}

const updatePayment = async (paymentId, updateData) => {
  const updatedPayment = await paymentModel.update(updateData, { where: { payment_id: paymentId }}).then(data => data).catch(err => {
    throw new DatabaseError("Error in update payment", 500)
  });
  return JSON.parse(JSON.stringify(updatedPayment));

}

const deletePaymentById = async (paymentId) => {
  const deleteResult = await paymentModel.destroy({ where: { payment_id: paymentId }}).then(data => data).catch(err => {
    throw new DatabaseError("Error in delete payment by id", 500)
  });
  return deleteResult
}

const deletePaymentsByCustomerId = async (customerId) => {
  const deleteResults = await paymentModel.destroy({ where: { customer_id: customerId }}).then(data => data).catch(err => {
    throw new DatabaseError("Error in delete payments by customer id", 500)
  });
  return deleteResults
}

// Get total payment of each loan product
const getTotalPaymentOfEachLoanProduct = async (queryYear) => {
  const [results, metadata] = await db.sequelize.query('SELECT loan_product_id, COUNT(*) AS total_payment FROM payment WHERE YEAR(createdAt)=? GROUP BY loan_product_id', {
    replacements: [queryYear]
  }).then(data => data).catch(err => {
    throw new DatabaseError("Error in total payment of each loan product", 500)
  });
  return results
}

// Get total payment of each loan product by month
const getTotalPaymentEachLoanProductByMonth = async (queryYear, queryMonth) => {
  const [results, metadata] = await db.sequelize.query('SELECT loan_product_id, COUNT(*) AS total_payment FROM payment WHERE YEAR(createdAt)=? AND MONTH(createdAt)=? GROUP BY loan_product_id', {
    replacements: [queryYear, queryMonth]
  }).then(data => data).catch(err => {
    throw new DatabaseError("Error in total payment of each loan product by month", 500)
  });
  return results
}
module.exports = {
  getAllPayments,
  getAllPaymentsByCustomer,
  getTotalOfPayment,
  getTotalOfPaymentByDate,
  getTotalOfPaymentByYear,
  getTotalOfPaymentOfOneMonthInOneYear,
  getByPaymentById,
  createNewPayment,
  updatePayment,
  deletePaymentById,
  deletePaymentsByCustomerId,
  getTotalPaymentOfEachLoanProduct,
  getTotalPaymentEachLoanProductByMonth
}