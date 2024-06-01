import express from 'express'
import loanTypeController from '../controllers/loanTypeController'
let router = express.Router();
let initWebRouters = (app) => {

    //LoanType
    router.get('/create-loan-type', loanTypeController.createLoanType)

    return app.use("/", router)
}

module.exports = initWebRouters;