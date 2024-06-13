const { resolve } = require("bluebird")
const db = require("../models")

let createLoanType = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkObject = checkRequiredFields(data)
            if (checkObject.isValid === false) {
                resolve({
                    EC: 1,
                    EM: `Missing parameter: ${checkObject.element}`
                })
            } else {
                await db.LoanType.create({
                    loan_type_name: data.loan_type_name,
                    loan_type_desc: data.loan_type_desc,
                    interest_rate: data.interest_rate,
                    late_interest_fee: data.late_interest_fee,
                    prepay_interest_fee: data.prepay_interest_fee,
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
let getAllLoanType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.LoanType.findAll({
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
let getLoanTypeById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let data = await db.LoanType.findOne({
                    where: {
                        loan_type_id: id
                    },
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
let editLoanType = (data) => {
    return new Promise(async (resolve, reject) => {

        try {
            let checkObject = checkRequiredFields(data)
            if (checkObject.isValid === false) {
                resolve({
                    EC: 1,
                    EM: `Missing parameter: ${checkObject.element}`
                })
            } else {
                let check = await db.LoanType.findOne({
                    where: { loan_type_id: data.loan_type_id },
                    raw: false,
                })
                if (check) {
                    check.loan_type_name = data.loan_type_name;
                    check.loan_type_desc = data.loan_type_desc;
                    check.interest_rate = data.interest_rate;
                    check.late_interest_fee = data.late_interest_fee;
                    check.prepay_interest_fee = data.prepay_interest_fee;
                    check.save()
                    resolve({
                        EC: 0,
                        EM: 'Edit successfully'
                    })
                } else {
                    resolve({
                        EC: 2,
                        EM: 'LoanType is not found!'
                    })
                }

            }
        } catch (e) {
            reject(e)
        }
    })
}
let deleteLoanType = (inputId) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let check = await db.LoanType.findOne({
                    where: { loan_type_id: inputId },
                })
                if (check) {
                    await db.LoanType.destroy({
                        where: { loan_type_id: inputId }
                    })
                    resolve({
                        EC: 0,
                        EM: 'Delete successfully'
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: 'LoanType is not found!'
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
        ['loan_type_name', 'loan_type_desc',
            'interest_rate', 'late_interest_fee', 'prepay_interest_fee']
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
    createLoanType, getAllLoanType, getLoanTypeById, editLoanType,
    deleteLoanType,
}