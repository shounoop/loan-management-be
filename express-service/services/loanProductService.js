const { resolve } = require("bluebird");
const paymentDaos = require('../daos/payment');
const loanProductDaos = require('../daos/loanProduct');
const db = require("../models");
const { includes } = require("lodash");

let createLoanProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkObject = checkRequiredFields(data)
            if (checkObject.isValid === false) {
                resolve({
                    EC: 1,
                    EM: `Missing parameter: ${checkObject.element}`
                })
            } else {
                await db.LoanProduct.create({
                    loan_product_name: data.loan_product_name,
                    loan_method_id: data.loan_method_id,
                    loan_type_id: data.loan_type_id,
                    minimum_amount: data.minimum_amount,
                    maximum_amount: data.maximum_amount,
                    minimum_term: data.minimum_term,
                    maximum_term: data.maximum_term,
                    repayment_schedule: data.repayment_schedule,
                    eligibility_criteria: data.eligibility_criteria,
                    product_description: data.product_description,
                    additional_notes: data.additional_notes,
                    late_fee: data.late_fee,
                    status: data.status,
                })
                resolve({
                    EC: 0,
                    EM: 'Created successfully'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let getAllLoanProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.LoanProduct.findAll({
                include: [
                    {
                        model: db.LoanType, as: 'ProductType', attributes: ['loan_type_name', 'loan_type_desc',
                            'interest_rate', 'late_interest_fee', 'prepay_interest_fee']

                    },
                    {
                        model: db.LoanMethod, as: 'ProductMethod', attributes: ['loan_method_name', 'loan_method_desc']

                    },
                ]
            });
            resolve({
                EC: 0,
                EM: 'OK',
                data: data
            })
        } catch (e) {
            reject(e)
        }
    })
}
let getLoanProductById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let data = await db.LoanProduct.findOne({
                    where: {
                        loan_product_id: id
                    },
                    include: [
                        {
                            model: db.LoanType, as: 'ProductType'

                        },
                        {
                            model: db.LoanMethod, as: 'ProductMethod'

                        },
                    ],
                    plain: true,
                })
                resolve({
                    EM: 'Ok',
                    EC: 0,
                    data: data
                })

            }
        } catch (e) {
            reject(e)
        }
    })
}
let editLoanProduct = (data) => {
    return new Promise(async (resolve, reject) => {

        try {
            let checkObject = checkRequiredFields(data)
            if (checkObject.isValid === false) {
                resolve({
                    EC: 1,
                    EM: `Missing parameter: ${checkObject.element}`
                })
            } else {
                let check = await db.LoanProduct.findOne({
                    where: { loan_product_id: data.loan_product_id },
                    raw: false,
                })
                if (check) {
                    check.loan_product_name = data.loan_product_name;
                    check.loan_method_id = data.loan_method_id;
                    check.loan_type_id = data.loan_type_id;
                    check.minimum_amount = data.minimum_amount;
                    check.maximum_amount = data.maximum_amount;
                    check.minimum_term = data.minimum_term;
                    check.maximum_term = data.maximum_term;
                    check.repayment_schedule = data.repayment_schedule;
                    check.eligibility_criteria = data.eligibility_criteria;
                    check.product_description = data.product_description;
                    check.additional_notes = data.additional_notes;
                    check.late_fee = data.late_fee;
                    check.status = data.status;
                    check.save();
                    resolve({
                        EC: 0,
                        EM: 'Edit successfully'
                    })
                } else {
                    resolve({
                        EC: 2,
                        EM: 'LoanProduct is not found!'
                    })
                }

            }
        } catch (e) {
            reject(e)
        }
    })
}
let deleteLoanProduct = (inputId) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let check = await db.LoanProduct.findOne({
                    where: { loan_product_id: inputId },
                })
                if (check) {
                    await db.LoanProduct.destroy({
                        where: { loan_product_id: inputId }
                    })
                    resolve({
                        EC: 0,
                        EM: 'Delete successfully'
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: 'LoanProduct is not found!'
                    })
                }

            }
        } catch (e) {
            reject(e)
        }
    })
}
let checkRequiredFields = (data) => {
    let isValid = true
    let element = ''
    let arrFields =
        ['loan_product_name', 'minimum_amount', "maximum_amount",
            'maximum_term', 'minimum_term', "repayment_schedule", "eligibility_criteria",
            'late_fee', 'loan_method_id', 'loan_type_id']
    for (let i = 0; i < arrFields.length; i++) {
        if (!data[arrFields[i]]) {
            isValid = false
            element = arrFields[i]
            break;
        }
    }
    return {
        isValid: isValid,
        element: element
    }
}
const getMostSoldLoanProductByYear = async (queryYear) => {
    const totalPaymentOfEachLoanProduct = await paymentDaos.getTotalPaymentOfEachLoanProduct(queryYear);
    if (totalPaymentOfEachLoanProduct == []) {
        throw new Error("No total payment and loan product id found!");
    }
    const loanProductId = totalPaymentOfEachLoanProduct[0]['loan_product_id'];
    const loanProduct = await loanProductDaos.getLoanProductById(loanProductId);
    return loanProduct
}
const getMostSoldLoanProductByMonthInAYear = async (queryYear, queryMonth) => {
    const totalPaymentOfEachLoanProductByMonth = await paymentDaos.getTotalPaymentEachLoanProductByMonth(queryYear, queryMonth);
    if (totalPaymentOfEachLoanProductByMonth == []) {
        throw new Error("No total payment and loan product id found!");
    }
    const loanProductId = totalPaymentOfEachLoanProductByMonth[0]['loan_product_id'];
    const loanProduct = await loanProductDaos.getLoanProductById(loanProductId);
    return loanProduct
}
const findLoanProductByName = async (queryLoanProductName) => {
    const { loanProductName } = queryLoanProductName
    if (loanProductName) {
        const foundLoanProducts = await loanProductDaos.findLoanProductByName(loanProductName);
        return foundLoanProducts
    } else {
        return []
    }
}
module.exports = {
    createLoanProduct,
    getAllLoanProduct,
    getLoanProductById,
    editLoanProduct,
    deleteLoanProduct,
    getMostSoldLoanProductByYear,
    getMostSoldLoanProductByMonthInAYear,
    findLoanProductByName
}