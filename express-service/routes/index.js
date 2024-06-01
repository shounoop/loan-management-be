import express from 'express'
import loanTypeController from '../controllers/loanTypeController'
let router = express.Router();
let initWebRouters = (app) => {

    //LoanType
    router.get('/api/create-loan-type', loanTypeController.createLoanType)
    router.get('/api/get-all-loan-type', loanTypeController.getAllLoanType)
    router.get('/api/get-loan-type-by-id', loanTypeController.getLoanTypeById)
    router.put('/api/edit-loan-type', loanTypeController.editLoanType)
    router.delete('/api/delete-loan-type', loanTypeController.deleteLoanType)
    return app.use("/", router)
}

module.exports = initWebRouters;