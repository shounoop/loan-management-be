const { resolve } = require("bluebird")
const db = require("../models")

let createLoanMethod = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.loan_method_name || !data.loan_method_desc) {
                resolve({
                    EC: 1,
                    EM: 'Missing parameter 1'
                })
            } else {
                await db.LoanMethod.create({
                    loan_method_name: data.loan_method_name,
                    loan_method_desc: data.loan_method_desc,
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
let getAllLoanMethod = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.LoanMethod.findAll({
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
let getLoanMethodById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let data = await db.LoanMethod.findOne({
                    where: {
                        loan_method_id: id
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
let editLoanMethod = (data) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!data.loan_method_name || !data.loan_method_desc || !data.loan_method_id) {
                resolve({
                    EC: 1,
                    EM: 'Missing parameter'
                })
            } else {
                let check = await db.LoanMethod.findOne({
                    where: { loan_method_id: data.loan_method_id },
                    raw: false,
                })
                if (check) {
                    check.loan_method_name = data.loan_method_name;
                    check.loan_method_desc = data.loan_method_desc;
                    check.save()
                    resolve({
                        EC: 0,
                        EM: 'Edit successfully'
                    })
                } else {
                    resolve({
                        EC: 2,
                        EM: 'LoanMethod is not found!'
                    })
                }

            }
        } catch (e) {
            reject(e)
        }
    })
}
let deleteLoanMethod = (inputId) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let check = await db.LoanMethod.findOne({
                    where: { loan_method_id: inputId },
                })
                if (check) {
                    await db.LoanMethod.destroy({
                        where: { loan_method_id: inputId }
                    })
                    resolve({
                        EC: 0,
                        EM: 'Delete successfully'
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: 'LoanMethod is not found!'
                    })
                }

            }
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    createLoanMethod, getAllLoanMethod, getLoanMethodById, editLoanMethod,
    deleteLoanMethod,
}