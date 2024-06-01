const { resolve } = require("bluebird")
const db = require("../models")

let createLoanType = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.loan_type_name || !data.loan_type_desc) {
                resolve({
                    EC: 1,
                    EM: 'Missing parameter'
                })
            } else {
                await db.LoanType.create({
                    loan_type_name: data.loan_type_name,
                    loan_type_desc: data.loan_type_desc,
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

module.exports = {
    createLoanType,
}