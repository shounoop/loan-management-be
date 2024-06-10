const { resolve } = require("bluebird");
const db = require("../models");

let createLoanProductDetail = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkObject = checkRequiredFields(data)
            if (checkObject.isValid === false) {
                resolve({
                    EC: 1,
                    EM: `Missing parameter: ${checkObject.element}`
                })
            } else {
                await db.LoanProductDetail.create({
                    loan_product_id: data.loan_product_id,
                    loan_method_id: data.loan_method_id,
                    loan_type_id: data.loan_type_id,
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
let getAllLoanProductDetail = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.LoanProductDetail.findAll({
                include: [
                    {
                        model: db.LoanType, as: 'Type', attributes: ['loan_type_name', 'loan_type_desc']

                    },
                    {
                        model: db.LoanProduct, as: 'Product', attributes: ['loan_product_name', 'interest_rate', 'minimum_amount', "maximum_amount",
                            'maximum_term', 'minimum_term', "repayment_schedule", "eligibility_criteria", 'late_fee']
                    },
                    {
                        model: db.LoanMethod, as: 'Method', attributes: ['loan_method_name', 'loan_method_desc']
                    }
                ],
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
let getLoanProductDetailById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let data = await db.LoanProductDetail.findOne({
                    where: {
                        loan_product_detail_id: id
                    },
                    include: [
                        { model: db.LoanType, as: 'Type', attributes: ['loan_type_name', 'loan_type_desc'] },
                        {
                            model: db.LoanProduct, as: 'Product', attributes: ['loan_product_name', 'interest_rate', 'minimum_amount', "maximum_amount",
                                'maximum_term', 'minimum_term', "repayment_schedule", "eligibility_criteria", 'late_fee']
                        },
                        { model: db.LoanMethod, as: 'Method', attributes: ['loan_method_name', 'loan_method_desc'] }
                    ],
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
let editLoanProductDetail = (data) => {
    return new Promise(async (resolve, reject) => {
        if (!data.loan_product_detail_id) {
            resolve({
                EC: 1,
                EM: `Missing parameter: loan_product_detail_id`
            })
        }
        try {
            let checkObject = checkRequiredFields(data)
            if (checkObject.isValid === false) {

                resolve({
                    EC: 1,
                    EM: `Missing parameter: ${checkObject.element}`
                })

            } else {
                let check = await db.LoanProductDetail.findOne({
                    where: { loan_product_detail_id: data.loan_product_detail_id },
                    raw: false,
                })
                if (check) {
                    check.loan_product_id = data.loan_product_id,
                        check.loan_method_id = data.loan_method_id,
                        check.loan_type_id = data.loan_type_id,
                        check.save();
                    resolve({
                        EC: 0,
                        EM: 'Edit successfully'
                    })
                } else {
                    resolve({
                        EC: 2,
                        EM: 'LoanProductDetail is not found!'
                    })
                }

            }
        } catch (e) {
            reject(e)
        }
    })
}
let deleteLoanProductDetail = (inputId) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let check = await db.LoanProductDetail.findOne({
                    where: { loan_product_detail_id: inputId },
                })
                if (check) {
                    await db.LoanProductDetail.destroy({
                        where: { loan_product_detail_id: inputId }
                    })
                    resolve({
                        EC: 0,
                        EM: 'Delete successfully'
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: 'LoanProductDetail is not found!'
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
        ['loan_product_id', 'loan_method_id', 'loan_type_id']
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

module.exports = {
    createLoanProductDetail,
    getAllLoanProductDetail,
    getLoanProductDetailById,
    editLoanProductDetail,
    deleteLoanProductDetail,

}