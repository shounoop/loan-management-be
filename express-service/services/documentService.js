const { resolve } = require("bluebird")
const db = require("../models")

let createDocument = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkObject = checkRequiredFields(data)
            if (checkObject.isValid === false) {
                resolve({
                    EC: 1,
                    EM: `Missing parameter: ${checkObject.element}`
                })
            } else {
                await db.Document.create({
                    loan_product_name: data.loan_product_name,
                    interest_rate: data.interest_rate,
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
let getAllDocument = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Document.findAll({
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
let getDocumentById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let data = await db.Document.findOne({
                    where: {
                        document_id: id
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
let editDocument = (data) => {
    return new Promise(async (resolve, reject) => {

        try {
            let checkObject = checkRequiredFields(data)
            if (checkObject.isValid === false) {
                resolve({
                    EC: 1,
                    EM: `Missing parameter: ${checkObject.element}`
                })
            } else {
                let check = await db.Document.findOne({
                    where: { document_id: data.document_idid },
                    raw: false,
                })
                if (check) {
                    check.loan_product_name = data.loan_product_name;
                    check.interest_rate = data.interest_rate;
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
                        EM: 'Document is not found!'
                    })
                }

            }
        } catch (e) {
            reject(e)
        }
    })
}
let deleteDocument = (inputId) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let check = await db.Document.findOne({
                    where: { document_id: inputId },
                })
                if (check) {
                    await db.Document.destroy({
                        where: { document_id: inputId }
                    })
                    resolve({
                        EC: 0,
                        EM: 'Delete successfully'
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: 'Document is not found!'
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
    let arrFields = ['loan_product_id', 'document_type']
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
    createDocument, getAllDocument, getDocumentById, editDocument,
    deleteDocument,
}