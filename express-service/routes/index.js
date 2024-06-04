import express from 'express'
import loanTypeController from '../controllers/loanTypeController'
import loanProductController from '../controllers/loanProductController'
let router = express.Router();
let initWebRouters = (app) => {

    //LoanType
    router.get('/api/create-loan-type', loanTypeController.createLoanType)
    router.get('/api/get-all-loan-type', loanTypeController.getAllLoanType)
    router.get('/api/get-loan-type-by-id', loanTypeController.getLoanTypeById)
    router.put('/api/edit-loan-type', loanTypeController.editLoanType)
    router.delete('/api/delete-loan-type', loanTypeController.deleteLoanType)

    //LoanProduct
    router.get('/api/create-loan-product', loanProductController.createLoanProduct)
    router.get('/api/get-all-loan-product', loanProductController.getAllLoanProduct)
    router.get('/api/get-loan-product-by-id', loanProductController.getLoanProductById)
    router.put('/api/edit-loan-product', loanProductController.editLoanProduct)
    router.delete('/api/delete-loan-product', loanProductController.deleteLoanProduct)
    return app.use("/", router)
}

module.exports = initWebRouters;